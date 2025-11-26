import React, { useState, useEffect } from 'react';

// On reprend le même type que dans Profile pour être cohérent
type AnnouncementData = {
  id: number;
  date: string;
  imageUrl: string;
  car: {
    id: number;
    marque: string;
    model: string;
    perf: string;
  };
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  announcement: AnnouncementData | null;
};

export default function EditAnnouncementModal({ isOpen, onClose, announcement }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    marque: '',
    model: '',
    perf: '',
    imageUrl: '',
    date: '',
  });

  // Remplir le formulaire quand on ouvre le modal avec une annonce
  useEffect(() => {
    if (announcement) {
      setFormData({
        marque: announcement.car.marque,
        model: announcement.car.model,
        perf: announcement.car.perf,
        imageUrl: announcement.imageUrl,
        // On formate la date pour l'input type="date" (YYYY-MM-DD)
        date: new Date(announcement.date).toISOString().split('T')[0],
      });
    }
  }, [announcement]);

  if (!isOpen || !announcement) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Mise à jour de la VOITURE (PUT /cars/:id)
      const carRes = await fetch(`http://localhost:3000/cars/${announcement.car.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marque: formData.marque,
          model: formData.model,
          perf: formData.perf,
        }),
      });

      if (!carRes.ok) throw new Error("Erreur lors de la modification du véhicule");

      // 2. Mise à jour de l'ANNONCE (PUT /announcements/:id)
      const announcementRes = await fetch(`http://localhost:3000/announcements/${announcement.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formData.date,
          imageUrl: formData.imageUrl, 
        }),
      });

      if (!announcementRes.ok) throw new Error("Erreur lors de la modification de l'annonce");

      onClose();
      alert('Annonce modifiée avec succès !');
      window.location.reload(); // Rafraîchir la page pour voir les changements

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-violet-400">✎</span> Modifier l'annonce
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
                name="marque" required 
                value={formData.marque} onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Modèle</label>
              <input 
                name="model" required 
                value={formData.model} onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Performance</label>
            <input 
              name="perf" required 
              value={formData.perf} onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">URL Image</label>
            <input 
              name="imageUrl" required 
              value={formData.imageUrl} onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Date</label>
            <input 
              type="date" name="date" required 
              value={formData.date} onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-violet-500 outline-none"
            />
          </div>

          <div className="flex gap-3 mt-8 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition font-medium">Annuler</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-white text-black font-bold hover:bg-violet-400 hover:text-white transition">
              {loading ? 'Sauvegarde...' : 'Enregistrer'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}