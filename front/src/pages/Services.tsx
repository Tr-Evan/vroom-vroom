import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const SERVICES = [
  {
    id: 'depot',
    title: 'Dépôt-Vente',
    subtitle: 'Vendez votre voiture en toute confiance',
    image: 'https://zupimages.net/up/25/48/mt2e.jpeg'
  },
  {
    id: 'estimation',
    title: 'Estimation & inspection',
    subtitle: 'Inspection complète et estimation précise de votre véhicule',
    image: 'https://zupimages.net/up/25/48/ccue.jpg'
  },
  {
    id: 'shooting',
    title: 'Shooting Photo & Vidéo',
    subtitle: 'On met en valeur votre véhicule pour une vente rapide',
    image: 'https://zupimages.net/up/25/48/mcgd.jpg'
  },
  {
    id: 'detailing',
    title: 'Detailing & Entretien',
    subtitle: 'Nettoyage intérieur et extérieur haut de gamme',
    image: 'https://zupimages.net/up/25/48/p324.jpg'
  },
  {
    id: 'parcours',
    title: 'Parcours d\'achat personnalisé',
    subtitle: 'Parcours d\'achat personnalisé',
    image: 'https://zupimages.net/up/25/48/y8rx.jpg'
  }
]

export default function Services() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-16">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold">Nos Services</h1>
          <p className="text-gray-400 mt-2">Toutes nos prestations pour entretenir, revendre ou sublimer votre véhicule.</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
          {/* Large card top-left */}
          <article className="relative rounded-2xl overflow-hidden bg-gray-900 col-span-1 lg:col-span-2 h-64 md:h-80 flex items-end">
            <img src={SERVICES[0].image} alt={SERVICES[0].title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 p-8 bg-gradient-to-t from-black/70 to-transparent w-full">
              <h2 className="text-3xl font-bold">{SERVICES[0].title}</h2>
              <p className="text-gray-300 mt-2 max-w-xl">{SERVICES[0].subtitle}</p>
              <Link to={`/services/${SERVICES[0].id}`} className="inline-block mt-4 text-sm text-blue-500 font-medium hover:underline">En savoir plus →</Link>
            </div>
          </article>

          {/* Top-right single */}
          <article className="relative rounded-2xl overflow-hidden bg-gray-900 h-64 md:h-80">
            <img src={SERVICES[1].image} alt={SERVICES[1].title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 p-6 bg-gradient-to-t from-black/60 to-transparent h-full flex flex-col justify-end">
              <h3 className="text-2xl font-bold">{SERVICES[1].title}</h3>
                <p className="text-gray-300 mt-2 max-w-xl">{SERVICES[0].subtitle}</p>
                <Link to={`/services/${SERVICES[1].id}`} className="mt-3 text-sm text-blue-500 font-medium">En savoir plus →</Link>
            </div>
          </article>

          {/* Second row - three cards */}
          {SERVICES.slice(2).map((s) => (
            <article key={s.id} className="relative rounded-2xl overflow-hidden bg-gray-900 h-56 flex items-end">
              <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="relative z-10 p-6 bg-gradient-to-t from-black/60 to-transparent w-full">
                <h4 className="text-2xl font-bold">{s.title}</h4>
                <p className="text-gray-300 text-sm mt-1">{s.subtitle}</p>
                <Link to={`/services/${s.id}`} className="mt-3 inline-block text-sm text-blue-500 font-medium">En savoir plus →</Link>
              </div>
            </article>
          ))}

        </section>
      </main>
    </div>
  )
}
