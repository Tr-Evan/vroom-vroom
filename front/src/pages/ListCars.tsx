import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

interface AnnouncementFromDB {
  id: number;
  cars_id: number;
  stats_id: number;
  date: string;
  famous: boolean;

  car: {
    id: number;
    model: string;
    marque: string;
    perf: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  };
  
  stats: {
    id: number;
    cars_id: number;
    favoris: number;
    views: number;
  };
  
  created_at: string;
  updated_at: string;
}

interface CarUI {
  id: number;
  make: string;
  model: string;
  year: number;
  perf: string;
  price: number;       // Fake
  mileage: number;     // Fake
  fuel: string;        // Fake
  transmission: string;// Fake
  image: string;       // Fake
  category: string;    // Fake
  views: number;
}

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620592750346-6467be569947?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1627454820574-fb6aa50085a0?q=80&w=800&auto=format&fit=crop"
];

// Typage des props pour le bouton retour
const ListCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [maxPrice, setMaxPrice] = useState(200000);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3000/announcements'); 
        
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }

        const data: AnnouncementFromDB[] = await response.json();

        // Transformation des données
        const formattedCars: CarUI[] = data.map((item, index) => {
            if (!item.car) return null;

            const year = item.date ? new Date(item.date).getFullYear() : 2025;

            return {
                id: item.id,
                make: item.car.marque,
                model: item.car.model,
                perf: item.car.perf,
                year: year,
                views: item.stats?.views || 0,
                
                // Données Fakes (Simulation)
                image: MOCK_IMAGES[index % MOCK_IMAGES.length], 
                price: Math.floor(Math.random() * (150000 - 30000) + 30000), 
                mileage: Math.floor(Math.random() * 50000) + 1000,
                fuel: ["Essence", "Hybride", "Électrique"][Math.floor(Math.random() * 3)],
                transmission: "Automatique",
                category: ["Sportive", "SUV", "Berline", "GT"][Math.floor(Math.random() * 4)]
            };
        }).filter(item => item !== null) as CarUI[];

        setCars(formattedCars);
        setLoading(false);
      } catch (err) {
        console.error("Erreur fetch:", err);
        setError("Impossible de charger les annonces.");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filtrage
  const filteredCars = cars.filter((car) => {
    const matchText = (car.make + ' ' + car.model).toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'Tout' || car.category === selectedCategory;
    const matchPrice = car.price <= maxPrice;
    return matchText && matchCategory && matchPrice;
  });

  const categories = ['Tout', 'Sportive', 'SUV', 'Berline', 'GT'];

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-12">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center gap-6">
          <Link 
            to="/"
            className="self-start px-5 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Retour
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-white">Nos Annonces</h1>
            <p className="text-gray-400 mt-1">
              {filteredCars.length} véhicules de prestige disponibles
            </p>
          </div>
        </div>

        {error ? (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl text-center">
                {error}
            </div>
        ) : (
            <div className="flex flex-col lg:flex-row gap-8">
            
            {/* SIDEBAR FILTRES */}
            <aside className="w-full lg:w-1/4 h-fit bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 sticky top-32">
                <h2 className="text-xl font-semibold mb-6 text-blue-500 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    Filtres
                </h2>
                
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Recherche</label>
                    <input 
                        type="text" 
                        placeholder="Ex: Porsche..." 
                        className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Catégorie</label>
                    <select 
                        className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 cursor-pointer"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-zinc-900 text-white">{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-400">Budget Max</label>
                        <span className="text-sm text-blue-500 font-bold">{maxPrice.toLocaleString()} €</span>
                    </div>
                    <input 
                        type="range" 
                        min="20000" 
                        max="200000" 
                        step="5000"
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </div>
            </aside>

            {/* GRILLE VÉHICULES */}
            <div className="w-full lg:w-3/4">
                {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCars.map((car) => (
                    <div key={car.id} className="bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 group">
                        
                        {/* Image + Badges */}
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src={car.image} 
                                alt={`${car.make} ${car.model}`} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-white/10 shadow-lg">
                                {car.year}
                            </div>
                            {/* Affichage de la puissance réelle */}
                            <div className="absolute bottom-3 right-3 bg-blue-600/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                                {car.perf}
                            </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-5">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-white mb-1">{car.make} <span className="text-gray-400 font-normal">{car.model}</span></h3>
                            </div>

                            {/* Specs Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="bg-white/5 px-3 py-1.5 rounded-lg text-xs text-gray-300 flex items-center gap-1.5 border border-white/5">
                                {car.mileage.toLocaleString()} km
                                </span>
                                <span className="bg-white/5 px-3 py-1.5 rounded-lg text-xs text-gray-300 flex items-center gap-1.5 border border-white/5">
                                {car.fuel}
                                </span>
                                {/* Nombre de vues (Bonus) */}
                                <span className="bg-white/5 px-3 py-1.5 rounded-lg text-xs text-gray-300 flex items-center gap-1 border border-white/5">
                                   👁️ {car.views}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <span className="text-xl font-bold text-white">
                                    {car.price.toLocaleString()} <span className="text-blue-500">€</span>
                                </span>
                                <button
                                  onClick={() => navigate(`/stock/${car.id}`)}
                                  className="cursor-pointer px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
                                >
                                    Voir détails
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-white/5">
                    <p className="text-gray-400 text-lg">Aucun bolide ne correspond à ces critères.</p>
                </div>
                )}
            </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ListCars;