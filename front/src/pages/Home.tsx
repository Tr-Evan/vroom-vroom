import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

function Home() {
  return (
    <div className="w-full bg-black min-h-screen text-white">
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home