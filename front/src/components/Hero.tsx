import DarkVeil from './DarkVeil.tsx';
import CarViewer from './CarViewer';
import { useNavigate } from 'react-router-dom';

type Props = {
  onViewVehicles?: () => void;
};

export default function Hero({ onViewVehicles }: Props) {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-32">
      {/* DarkVeil en fond absolu plein écran */}
      <div className="absolute inset-0 z-0">
        <DarkVeil resolutionScale={0.2} />
      </div>

      {/* Contenu relatif au-dessus (large) */}
      <div className="w-full max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
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
            </span>
            {' '}by <span className="text-violet-400">Vroom-Vroom</span>
          </h1>

          {/* Ligne de séparation */}
          <div className="my-8 w-full h-0.5 bg-white"></div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => navigate('/stock')}
              className="cursor-pointer px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              Voir nos véhicules
            </button>
            <button className="px-8 py-3 border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-300">
              En savoir plus
            </button>
          </div>
        </div>

        {/* Droite - Zone pour modèle 3D (espace réservé dans la grille) */}
        <div className="flex items-center justify-center h-96 lg:h-full">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* spacer - le viewer est positionné en absolu pour pouvoir déborder */}
          </div>
        </div>
      </div>

      {/* Viewer absolu au-dessus de tout pour permettre au modèle de déborder
          - z-60 pour être au-dessus de la navbar (qui est z-50) */}
      <div className="pointer-events-auto absolute top-1/2 right-0 transform -translate-y-1/2 z-60 w-[60%] h-screen max-w-[1100px]">
        {/* <CarViewer modelUrl="/models/mycar/bugatti-divo/source/2019_bugatti_divo_110_ans.glb" /> */}
      </div>
    </section>
  );
}
