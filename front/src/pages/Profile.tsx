import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CreateAnnouncementModal from '../components/CreateAnnouncementModal'; 

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-12 max-w-4xl">
        
        {/* Bouton Retour */}
        <Link  to="/" className="mb-8 px-4 py-2 inline-flex rounded-full border border-white/20 text-white hover:bg-white/10 transition items-center gap-2 text-sm">
            ← Retour à l'accueil
        </Link>

        {/* Carte Profil */}
        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          
          {/* Décoration d'arrière-plan */}
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
              
              {/* Infos perso (statistiques factices pour l'exemple) */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6 text-sm text-gray-400">
                <span className="bg-black/40 px-3 py-1 rounded-lg border border-white/5">User ID: 1</span>
                <span className="bg-black/40 px-3 py-1 rounded-lg border border-white/5">3 Annonces actives</span>
              </div>

              <div className="flex gap-3 justify-center md:justify-start mt-4">
                <button className="px-6 py-2 bg-white text-black font-bold rounded-full cursor-pointer hover:bg-gray-200 transition">
                  Éditer profil
                </button>
                
                {/* NOUVEAU BOUTON : Ajouter une annonce */}
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
      </div>

      {/* Composant Modal (affiché si isModalOpen est true) */}
      <CreateAnnouncementModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
};

export default Profile;