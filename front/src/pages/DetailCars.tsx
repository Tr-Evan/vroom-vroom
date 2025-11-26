// front/src/pages/CarDetails.tsx

import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CarViewer from '../components/CarViewer';
import { useEffect, useState } from 'react';

// Typage local pour l'UI (simple et compatible avec l'existant)
interface CarUI {
  id: number;
  make: string;
  model: string;
  year: number;
  perf?: string;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  category: string;
  views?: number;
}

// Composant utilitaire pour les lignes de la fiche technique (thème sombre)
const SpecItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between border-b border-white/5 py-3">
    <span className="text-gray-300">{label}</span>
    <span className="font-medium text-white">{value}</span>
  </div>
);

const CarDetails = () => {
  const { carId } = useParams<{ carId: string }>();

  const [car, setCar] = useState<CarUI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!carId) return;

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        // On suppose que l'API expose /announcements/:id comme dans la liste
        const res = await fetch(`http://localhost:3000/announcements/${carId}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error('Véhicule introuvable');
          throw new Error('Erreur réseau');
        }

        const data = await res.json();

        // Mapping pragmatique — rend le shape compatible avec l'UI existante
        const year = data.date ? new Date(data.date).getFullYear() : (data.car?.created_at ? new Date(data.car.created_at).getFullYear() : 2025);

        const mapped: CarUI = {
          id: data.id,
          make: data.car?.marque || data.car?.make || 'Inconnu',
          model: data.car?.model || 'Modèle',
          year,
          perf: data.car?.perf || '',
          views: data.stats?.views || 0,
          image: data.imageUrl || data.car?.image || '',
          price: data.price || Math.floor(Math.random() * (150000 - 30000) + 30000),
          mileage: data.car?.mileage || Math.floor(Math.random() * 50000) + 1000,
          fuel: data.car?.fuel || ['Essence', 'Hybride', 'Électrique'][Math.floor(Math.random() * 3)],
          transmission: data.car?.transmission || 'Automatique',
          category: data.car?.category || ['Sportive', 'SUV', 'Berline', 'GT'][Math.floor(Math.random() * 4)],
        };

        setCar(mapped);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('Erreur fetch détail:', err);
        setError(msg || 'Impossible de charger la fiche véhicule.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [carId]);

  // Gestion du chargement
  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  // Erreur ou non trouvé
  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{error ? 'Erreur' : 'Véhicule non trouvé'}</h1>
          <p className="text-gray-500 mb-8">{error ?? "L'identifiant de la voiture est invalide ou la voiture n'existe plus."}</p>
          <Link 
            to="/stock"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  // Description fictive basée sur les données
  const description = `
    Découvrez l'exceptionnelle ${car.make} ${car.model}. 
    Ce véhicule, immatriculé en ${car.year}, est une véritable pépite d'ingénierie et de design. 
    Avec seulement ${car.mileage.toLocaleString()} km au compteur, il est prêt pour de nouvelles aventures. 
    Son moteur ${car.fuel.toLowerCase()} et sa transmission ${car.transmission.toLowerCase()} offrent une expérience de conduite inégalée, que ce soit pour vos trajets quotidiens ou pour des escapades plus longues. 
    Ne manquez pas cette opportunité unique de posséder ce modèle de catégorie ${car.category}.
  `;

  // Chemin du modèle 3D pour la Bugatti (ID 6)
  const bugattiModelPath = '/models/mycar/bugatti-divo/source/2019_bugatti_divo_110_ans.glb';
  const isBugatti = car.id === 6;

  return (
    <div className="min-h-screen bg-black font-sans">
      <Navbar />

      <div className="container mx-auto px-4 pt-28">
        
        {/* Header et Bouton Retour */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center gap-6">
          <Link
            to="/stock"
            className="cursor-pointer self-start px-5 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Retour
          </Link>

          <div>
            <h1 className="text-4xl font-extrabold text-white">{car.make} {car.model}</h1>
            <p className="text-xl text-gray-300 mt-2">{car.category} • {car.year}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Colonne Principale (Image/Viewer & Description/Fiche Technique) */}
          <main className="w-full lg:w-2/3">
            
            {/* Zone d'Image ou Viewer 3D (carte sombre) */}
            <div className="bg-zinc-900/80 rounded-2xl shadow-xl border border-white/5 overflow-hidden mb-8">
              {isBugatti ? (
                // Utilisation du CarViewer pour le modèle 3D
                <div className="relative h-[480px]">
                    <CarViewer modelUrl={bugattiModelPath} autoRotate={true} />
                    <div className="absolute bottom-4 left-4 bg-gray-900/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                        Vue 3D Interactive
                    </div>
                </div>
              ) : (
                // Image classique pour les autres voitures
                <img 
                  src={car.image} 
                  alt={`${car.make} ${car.model}`} 
                  className="w-full object-cover max-h-[480px] h-auto"
                />
              )}
            </div>

            {/* Section Description (sombre) */}
            <div className="bg-zinc-900/80 p-6 rounded-2xl shadow-sm border border-white/5 mb-8 text-gray-200">
              <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/5 pb-2">Description du véhicule</h2>
              <p className="text-gray-300 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Section Fiche Technique (sombre) */}
            <div className="bg-zinc-900/80 p-6 rounded-2xl shadow-sm border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/5 pb-2">Fiche Technique</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <div>
                  <SpecItem label="Marque" value={car.make} />
                  <SpecItem label="Modèle" value={car.model} />
                  <SpecItem label="Année de mise en circulation" value={car.year} />
                  <SpecItem label="Catégorie" value={car.category} />
                </div>
                <div>
                  <SpecItem label="Kilométrage" value={`${car.mileage.toLocaleString()} km`} />
                  <SpecItem label="Carburant" value={car.fuel} />
                  <SpecItem label="Transmission" value={car.transmission} />
                  <SpecItem label="Couleur Extérieure" value="Gris Métallisé" /> 
                </div>
              </div>

            </div>

          </main>
          
          {/* Colonne Prix et Actions (Aside) */}
          <aside className="w-full lg:w-1/3 h-fit sticky top-4">
      
              {/* Carte de Prix (sombre) */}
              <div className="bg-zinc-900/80 p-6 rounded-2xl shadow-xl border border-white/5 mb-6 text-gray-200">
                <p className="text-2xl font-semibold text-gray-300 mb-2">Prix de vente</p>
                <span className="text-5xl font-extrabold text-blue-500">
                  {car.price.toLocaleString()} €
                </span>
                <p className="text-sm text-gray-400 mt-2">TVA incluse, hors frais d'immatriculation.</p>
              
                <button className="w-full mt-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition transform hover:scale-[1.01]">
                  Contacter le vendeur
                </button>
                <button className="w-full mt-3 py-3 bg-white/5 text-blue-500 border border-white/5 font-medium rounded-lg hover:bg-white/10 transition">
                  Demander un essai
                </button>
              </div>

            {/* Section Sécurité et Garantie */}
            <div className="bg-zinc-900/80 p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-bold text-white mb-3">Sécurité & Garantie</h3>
                <ul className="space-y-3 text-sm text-white">
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Contrôle technique 100 points
                    </li>
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Garantie 12 mois incluse
                    </li>
                    <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Historique d'entretien certifié
                    </li>
                </ul>
            </div>
            
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;