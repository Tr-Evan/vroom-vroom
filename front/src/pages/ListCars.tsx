import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { cars } from '../data/cars';

// Typage des props pour le bouton retour
type ListCarsProps = {
  onBack: () => void;
  onSelectCar?: (id: number) => void;
};

const ListCars = ({ onBack, onSelectCar }: ListCarsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [maxPrice, setMaxPrice] = useState(1000000);

  // Filtrage
  const filteredCars = cars.filter((car) => {
    const matchText = (car.make + ' ' + car.model).toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'Tout' || car.category === selectedCategory;
    const matchPrice = car.price <= maxPrice;
    return matchText && matchCategory && matchPrice;
  });

  const categories = ['Tout', ...new Set(cars.map(c => c.category))];

  return (
    // Fond noir et texte blanc
    <div className="min-h-screen bg-black text-white font-sans selection:bg-violet-500 selection:text-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-28">
        
        {/* Header avec bouton Retour */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center gap-6">
          <button 
            onClick={onBack}
            className="cursor-pointer self-start px-5 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Retour
          </button>

          <div>
            <h1 className="text-3xl font-bold text-white">Nos Véhicules</h1>
            <p className="text-gray-400 mt-1">L'excellence automobile à votre portée.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR FILTRES (Dark) */}
          <aside className="w-full lg:w-1/4 h-fit bg-zinc-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 sticky top-4">
            <h2 className="text-xl font-semibold mb-6 text-violet-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
              Filtres
            </h2>
            
            {/* Recherche */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Recherche</label>
              <input 
                type="text" 
                placeholder="Ex: Bugatti, Tesla..." 
                className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Catégorie */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Catégorie</label>
              <select 
                className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-violet-500 cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-zinc-900 text-white">{cat}</option>
                ))}
              </select>
            </div>

            {/* Prix Max */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                 <label className="text-sm font-medium text-gray-400">Budget Max</label>
                 <span className="text-sm text-violet-400 font-bold">{maxPrice.toLocaleString()} €</span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="1000000" 
                step="5000"
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>

            <button 
              className="w-full py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 border border-white/5 transition font-medium text-sm cursor-pointer"
              onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tout');
                  setMaxPrice(1000000);
              }}
            >
              Réinitialiser
            </button>
          </aside>

          {/* GRILLE VÉHICULES (Droite) */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-4 px-1">
               <span className="text-gray-500 text-sm">{filteredCars.length} véhicules disponibles</span>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <div key={car.id} className="bg-zinc-900 rounded-2xl border border-white/5 overflow-hidden hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] transition-all duration-300 group">
                    
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={car.image} 
                        alt={`${car.make} ${car.model}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-white/10 shadow-lg">
                        {car.year}
                      </div>
                      {/* Badge Catégorie */}
                      <div className="absolute bottom-3 left-3 bg-violet-600/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white shadow-lg">
                        {car.category}
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
                           <svg className="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                           {car.mileage.toLocaleString()} km
                        </span>
                        <span className="bg-white/5 px-3 py-1.5 rounded-lg text-xs text-gray-300 flex items-center gap-1.5 border border-white/5">
                           <svg className="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                           {car.fuel}
                        </span>
                        <span className="bg-white/5 px-3 py-1.5 rounded-lg text-xs text-gray-300 border border-white/5">
                           {car.transmission}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-xl font-bold text-white">
                            {car.price.toLocaleString()} <span className="text-violet-400">€</span>
                        </span>
                        <button
                          onClick={() => onSelectCar && onSelectCar(car.id)}
                          className="cursor-pointer px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-violet-400 hover:text-white transition-all duration-300"
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
                  <button 
                    onClick={() => {setSearchTerm(''); setMaxPrice(1000000);}}
                    className="cursor-pointer mt-4 text-violet-400 font-medium hover:text-violet-300 hover:underline transition"
                  >
                      Voir tous les véhicules
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCars;