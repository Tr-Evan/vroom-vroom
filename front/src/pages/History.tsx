import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function History() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <main className="container mx-auto px-4 pt-36 pb-20">

        {/* Header */}
        <header className="text-center mb-12 h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Notre Histoire</h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Depuis notre création, nous magnifions les véhicules d'exception en offrant un service complet — du stockage à la mise en valeur et à la revente.</p>
          <p className="text-gray-500 mt-2 italic">Passion. Savoir-faire. Confiance.</p>
        </header>

        {/* Sections alternées */}
        <section className="h-[60vh] grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-20">
          <div className="order-2 lg:order-1 px-4">
            <h2 className="text-2xl font-bold mb-3">Nos débuts</h2>
            <p className="text-gray-300 max-w-2xl">Fondée par une équipe de passionnés, Vroom-Vroom a commencé dans un petit atelier où chaque détail comptait. Rapidement, notre exigence de qualité nous a permis de gagner la confiance des collectionneurs et des amateurs de belles mécaniques.</p>
          </div>
          <div className="order-1 lg:order-2 w-full h-full flex items-center justify-center">
            <img src="https://zupimages.net/up/25/48/p9a2.jpeg" alt="Atelier" className="w-full h-full object-cover rounded-2xl border border-white/10" />
          </div>
        </section>

        <section className="h-[60vh] grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-20">
          <div className="w-full h-full">
            <img src="https://zupimages.net/up/25/48/4oun.jpg" alt="Showroom" className="w-full h-full object-cover rounded-2xl border border-white/10" />
          </div>
          <div className="pt-4">
            <h2 className="text-2xl font-bold mb-3">Un showroom dédié</h2>
            <p className="text-gray-300">Nous avons conçu un espace d'exposition où chaque véhicule peut être apprécié comme une œuvre d'art. L'éclairage, le sol et la scénographie sont pensés pour révéler les lignes et les matériaux.</p>
          </div>
        </section>

        <section className="h-[60vh] grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-20">
          <div className="pt-4 order-2 lg:order-1">
            <h2 className="text-2xl font-bold mb-3">Nos services</h2>
            <p className="text-gray-300">Dépôt-vente, estimation, shooting photo, detailing — nous couvrons tout le cycle pour vendre ou sublimer votre véhicule. Notre équipe met en place un plan personnalisé pour chaque client.</p>
          </div>
          <div className="order-1 lg:order-2 w-full h-full">
            <img src="https://zupimages.net/up/25/48/gtdk.jpg" alt="Services" className="w-full h-full object-cover rounded-2xl border border-white/10" />
          </div>
        </section>

        <section className="h-[60vh] grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-24">
          <div className="w-full h-full">
            <img src="https://zupimages.net/up/25/48/ifoz.jpg" alt="Equipe" className="w-full h-full object-cover rounded-2xl border border-white/10" />
          </div>
          <div className="pt-4">
            <h2 className="text-2xl font-bold mb-3">Notre équipe</h2>
            <p className="text-gray-300">Composée d'experts en mécanique, photographie et vente, notre équipe travaille chaque jour pour offrir un service premium et transparent. Nous privilégions la proximité et l'écoute.</p>
          </div>
        </section>

        <div className="text-center mt-6">
          <p className="text-gray-400 mb-4">Envie d'en savoir plus ou de confier votre véhicule ?</p>
          <Link to="/services" className="inline-block px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition">Découvrir nos services</Link>
        </div>
      </main>
    </div>
  )
}
