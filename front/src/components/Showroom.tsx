import CarViewer from './CarViewer'

export default function Showroom() {
  return (
    <section className="relative w-full bg-black text-white">
      <div className="w-full flex flex-col items-center justify-center px-4 py-12">

        {/* Header show-room */}
        <div className="w-full max-w-6xl mb-8 text-center px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold">Showroom</h2>
          <p className="text-gray-300 mt-3 max-w-3xl mx-auto">
            Découvrez la voiture mise en valeur dans un environnement façon showroom : éclairage soigné,
            sol réfléchissant et cadre épuré pour mieux apprécier les lignes et les matériaux.
          </p>
          <p className="text-gray-400 mt-2 text-sm">Utilisez la souris pour tourner la voiture, ou laissez-la immobile pour une vue statique.</p>
        </div>

        <div className="w-full h-screen flex items-center justify-center px-4 py-6">
          <div className="relative w-full max-w-6xl h-[75vh] bg-zinc-900/80 rounded-3xl border border-white/6 shadow-2xl overflow-hidden flex items-center justify-center">

          {/* Halo lumineux (effet projecteur) */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full h-full z-10 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-b from-white/25 to-transparent rounded-full blur-[40px] mix-blend-screen" />
          </div>

          {/* CarViewer (3D) */}
          <div className="relative z-30 w-full h-full px-6 py-8 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-transparent">
              <CarViewer modelUrl="/models/mycar/bugatti-divo/source/2019_bugatti_divo_110_ans.glb" autoRotate={false} />
            </div>
          </div>

          {/* Sol / reflet */}
          <div className="absolute bottom-0 left-0 right-0 h-36 z-20 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent" />
          </div>

        </div>
      </div>
      </div>
    </section>
  )
}
