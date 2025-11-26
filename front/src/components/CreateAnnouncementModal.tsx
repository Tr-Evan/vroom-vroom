import React, { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateAnnouncementModal({ isOpen, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // État du formulaire
  const [formData, setFormData] = useState({
    marque: '',
    model: '',
    perf: '',
    imageUrl: '', // On ajoute l'image car c'est crucial pour le visuel
    date: new Date().toISOString().split('T')[0], // Date du jour par défaut
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Création de la VOITURE
      // Note: Assure-toi que ton User ID est géré (ici on met 1 en dur pour l'exemple, ou tu le récupères du contexte)
      const carRes = await fetch('http://localhost:3000/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marque: formData.marque,
          model: formData.model,
          perf: formData.perf,
          user_id: 1 // À remplacer par l'ID de l'utilisateur connecté plus tard
        }),
      });
      
      if (!carRes.ok) throw new Error("Erreur lors de la création du véhicule");
      const car = await carRes.json();

      // 2. Création des STATS (Requises par l'annonce)
      const statsRes = await fetch('http://localhost:3000/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cars_id: car.id,
          favoris: 0,
          views: 0
        }),
      });

      if (!statsRes.ok) throw new Error("Erreur lors de l'initialisation des stats");
      const stats = await statsRes.json();

      // 3. Création de l'ANNONCE (Le lien final)
      const announcementRes = await fetch('http://localhost:3000/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cars_id: car.id,
          stats_id: stats.id,
          date: formData.date,
          imageUrl: formData.imageUrl, // Assure-toi d'avoir ajouté cette colonne en BDD comme vu précédemment
          famous: false
        }),
      });

      if (!announcementRes.ok) throw new Error("Erreur lors de la publication de l'annonce");

      // Tout est bon !
      onClose();
      alert('Annonce créée avec succès !');
      window.location.reload(); // Pour rafraîchir les données (ou utilise un callback)

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Overlay flou */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Box */}
      <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-lg shadow-2xl shadow-violet-500/10">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-violet-400">+</span> Nouvelle Annonce
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Marque</label>
              <input 
                name="marque" 
                required 
                placeholder="Ex: Porsche"
                value={formData.marque} onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Modèle</label>
              <input 
                name="model" 
                required 
                placeholder="Ex: 911 GT3"
                value={formData.model} onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Performance (ch)</label>
            <input 
              name="perf" 
              required 
              placeholder="Ex: 510ch"
              value={formData.perf} onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">URL de la photo</label>
            <input 
              name="imageUrl" 
              required 
              placeholder="https://..."
              value={formData.imageUrl} onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Utilisez un lien direct vers une image (Unsplash, etc.)</p>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Date de disponibilité</label>
            <input 
              type="date"
              name="date" 
              required 
              value={formData.date} onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
            />
          </div>

          <div className="flex gap-3 mt-8 pt-4 border-t border-white/10">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition font-medium"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-white text-black font-bold hover:bg-violet-400 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Publication...' : 'Publier l\'annonce'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}