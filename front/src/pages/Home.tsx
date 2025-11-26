import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Showroom from '../components/Showroom'

function Home() {
  return (
    <div className="w-full bg-black min-h-screen text-white">
      <Navbar />
      <Hero />
      <Showroom />
    </div>
  )
}

export default Home