import DarkVeil from './DarkVeil.tsx';
import CarViewer from './CarViewer'

type Props = {
  onViewVehicles?: () => void;
};

export default function Hero({ onViewVehicles }: Props) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden">
      {/* DarkVeil en fond absolu plein écran */}
      <div className="absolute inset-0 z-0">
        <DarkVeil />
      </div>

      {/* Contenu relatif au-dessus */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Contenu gauche */}
        <div className="flex flex-col justify-center">
          {/* Sous-titre */}
          <p className="text-white/60 text-sm tracking-wide mb-6 font-light">
            Créé par des passionnés, pour des passionnés.
          </p>

          {/* Titre principal */}
          <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            L'automobile
            <br />
            de prestige
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-white">sur-mesure</span>
              <span className="absolute -inset-3 border-2 border-violet-400 rounded-full"></span>
            </span>
            {' '}by <span className="text-violet-400">Vroom-Vroom</span>
          </h1>

          {/* Ligne de séparation */}
          <div className="my-8 w-16 h-0.5 bg-linear-to-r from-violet-500 to-transparent"></div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={onViewVehicles}
              className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              Voir nos véhicules
            </button>
            <button className="px-8 py-3 border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-300">
              En savoir plus
            </button>
          </div>

          {/* Footer links */}
          <div className="flex gap-8 pt-8 border-t border-white/10">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Vroom-Vroom<br/><span className="text-xs">SOCIETY CLUB</span>
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Vroom-Vroom<br/><span className="text-xs">SPA AUTOMOBILE</span>
            </a>
          </div>
        </div>

        {/* Droite - Zone pour modèle 3D */}
        <div className="flex items-center justify-center h-96 lg:h-full">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Viewer Three.js */}
            <div className="absolute inset-0 rounded-lg border border-violet-500/20 overflow-hidden">
              <CarViewer modelUrl="/models/mycar/bugatti-divo/source/2019_bugatti_divo_110_ans.glb" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
