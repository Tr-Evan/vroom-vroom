import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { cars } from '../data/cars';

// 1. On définit ce que le composant a le droit de recevoir
type ListCarsProps = {
  onBack: () => void;
};

// 2. On ajoute les props dans la définition de la fonction
const ListCars = ({ onBack }: ListCarsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [maxPrice, setMaxPrice] = useState(100000);

  // Filtrage simple des données
  const filteredCars = cars.filter((car) => {
    const matchText = (car.make + ' ' + car.model).toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'Tout' || car.category === selectedCategory;
    const matchPrice = car.price <= maxPrice;
    return matchText && matchCategory && matchPrice;
  });

  const categories = ['Tout', ...new Set(cars.map(c => c.category))];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        
        {/* Header de la page avec Bouton Retour */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
          {/* 3. Le bouton retour */}
          <button 
            onClick={onBack}
            className="self-start px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition flex items-center gap-2 shadow-sm"
          >
            ← Retour
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">Véhicules d'occasion</h1>
            <p className="text-gray-500 mt-1">Trouvez la voiture de vos rêves parmi notre sélection certifiée.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR FILTRES (Gauche) */}
          <aside className="w-full lg:w-1/4 h-fit bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Filtres</h2>
            
            {/* Recherche */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
              <input 
                type="text" 
                placeholder="Ex: Peugeot 208..." 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Catégorie */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Prix Max */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                 <label className="text-sm font-medium text-gray-700">Budget Max</label>
                 <span className="text-sm text-indigo-600 font-bold">{maxPrice.toLocaleString()} €</span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="100000" 
                step="1000"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>

            <button 
              className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
              onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tout');
                  setMaxPrice(100000);
              }}
            >
              Réinitialiser les filtres
            </button>
          </aside>

          {/* GRILLE VÉHICULES (Droite) */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-4">
               <span className="text-gray-500 text-sm">{filteredCars.length} véhicules trouvés</span>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                    
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={car.image} 
                        alt={`${car.make} ${car.model}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800 shadow-sm">
                        {car.year}
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{car.make} {car.model}</h3>
                          <p className="text-sm text-gray-500">{car.category}</p>
                        </div>
                      </div>

                      {/* Specs Tags */}
                      <div className="flex flex-wrap gap-2 my-3 text-xs text-gray-600">
                        <span className="bg-gray-100 px-2 py-1 rounded flex items-center">
                           <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                           {car.mileage.toLocaleString()} km
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded flex items-center">
                           <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                           {car.fuel}
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                           {car.transmission}
                        </span>
                      </div>

                      <div className="border-t border-gray-100 pt-3 mt-2 flex items-center justify-between">
                        <span className="text-xl font-bold text-indigo-600">
                            {car.price.toLocaleString()} €
                        </span>
                        <button className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition">
                            Voir détails &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-lg">Aucun véhicule ne correspond à vos critères.</p>
                  <button 
                    onClick={() => {setSearchTerm(''); setMaxPrice(100000);}}
                    className="mt-4 text-indigo-600 font-medium hover:underline"
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