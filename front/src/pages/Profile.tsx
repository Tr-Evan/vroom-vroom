import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CreateAnnouncementModal from '../components/CreateAnnouncementModal';
import EditAnnouncementModal from '../components/EditAnnouncementModal';

// Interface locale pour typer les données reçues de l'API
interface AnnouncementFromDB {
  id: number;
  date: string;
  imageUrl: string;
  car: {
    id: number;
    marque: string;
    model: string;
    perf: string;
    user_id: number;
  };
  stats: {
    views: number;
  };
}

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myAnnouncements, setMyAnnouncements] = useState<AnnouncementFromDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAd, setEditingAd] = useState<AnnouncementFromDB | null>(null);

  const CURRENT_USER_ID = 1; 

  // Récupération des annonces au chargement de la page
  useEffect(() => {
    const fetchMyAds = async () => {
      try {
        const response = await fetch('http://localhost:3000/announcements');
        if (response.ok) {
          const data: AnnouncementFromDB[] = await response.json();
          
          // FILTRE : On ne garde que les annonces où user_id === 1
          // On vérifie aussi que "ad.car" existe pour éviter les crashs si une annonce est orpheline
          const userAds = data.filter(ad => ad.car && ad.car.user_id === CURRENT_USER_ID);
          
          setMyAnnouncements(userAds);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des annonces :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAds();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce définitivement ?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/announcements/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Mise à jour locale de la liste pour éviter de recharger la page
        setMyAnnouncements((prev) => prev.filter((ad) => ad.id !== id));
      } else {
        alert("Erreur lors de la suppression de l'annonce.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Impossible de contacter le serveur.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-12 max-w-5xl">
        
        {/* Bouton Retour */}
        <Link 
            to="/"
            className="mb-8 px-4 py-2 inline-flex rounded-full border border-white/20 text-white hover:bg-white/10 transition items-center gap-2 text-sm"
        >
            ← Retour à l'accueil
        </Link>

        {/* --- CARTE PROFIL (Code existant) --- */}
        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden mb-12">
          {/* Déco background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 p-1 shadow-2xl shadow-violet-500/20">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full border-4 border-black"
              />
            </div>
            {/* Infos */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">Jean Dupont</h1>
              <p className="text-violet-400 font-medium mb-4">Membre Society Club • VIP</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6 text-sm text-gray-400">
                <span className="bg-black/40 px-3 py-1 rounded-lg border border-white/5">User ID: {CURRENT_USER_ID}</span>
                <span className="bg-black/40 px-3 py-1 rounded-lg border border-white/5">
                   {myAnnouncements.length} Annonce(s) active(s)
                </span>
              </div>

              <div className="flex gap-3 justify-center md:justify-start mt-4">
                <button className="px-6 py-2 bg-white text-black font-bold rounded-full cursor-pointer hover:bg-gray-200 transition">
                  Éditer profil
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2 bg-violet-600 text-white font-bold rounded-full cursor-pointer hover:bg-violet-500 transition flex items-center gap-2 shadow-lg shadow-violet-500/20"
                >
                  <span>+</span> Vendre un véhicule
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION MES ANNONCES (Nouveau) --- */}
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white pl-3 border-l-4 border-violet-500">
                    Mes Annonces en ligne
                </h2>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-violet-500 mx-auto"></div>
                </div>
            ) : myAnnouncements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myAnnouncements.map((ad) => (
                        <div key={ad.id} className="bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden group relative hover:border-violet-500/30 transition-all duration-300">
                            
                            {/* Image */}
                            <div className="h-48 overflow-hidden relative">
                                <img 
                                    src={ad.imageUrl || "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800"} 
                                    alt={ad.car.model} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold border border-white/10">
                                    {ad.car.perf}
                                </div>
                            </div>

                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {/* Bouton Modifier */}
                                <button onClick={() => setEditingAd(ad)} className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-violet-600 text-white transition border border-white/10 shadow-lg cursor-pointer" title="Modifier">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                </button>
                                {/* Bouton Supprimer */}
                                <button onClick={() => handleDelete(ad.id)} className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-red-600 text-white transition border border-white/10 shadow-lg cursor-pointer" title="Supprimer">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>

                            {/* Contenu */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-white mb-1">{ad.car.marque} {ad.car.model}</h3>
                                <p className="text-xs text-gray-500 mb-4">Mise en ligne le {new Date(ad.date).toLocaleDateString()}</p>
                                
                                <div className="flex justify-between items-center pt-3 border-t border-white/5">
                                    <span className="text-sm text-gray-400 flex items-center gap-1">
                                        👁️ {ad.stats?.views || 0} vues
                                    </span>
                                    <span className="text-xs text-violet-400 font-bold uppercase tracking-wider">En vente</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-gray-500 bg-white/5 p-12 rounded-2xl text-center border border-white/5 flex flex-col items-center justify-center gap-4">
                    <p>Vous n'avez pas encore publié d'annonce.</p>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="text-violet-400 hover:text-white transition font-medium underline cursor-pointer"
                    >
                        Créer ma première annonce maintenant
                    </button>
                </div>
            )}
        </div>
      </div>
      {/* Modal de création */}
      <CreateAnnouncementModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Modal de mofification */}
      <EditAnnouncementModal 
        isOpen={!!editingAd} 
        onClose={() => setEditingAd(null)} 
        announcement={editingAd} 
      />
    </div>
  );
};

export default Profile;