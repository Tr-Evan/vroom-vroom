import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

function Home() {
  const handleViewVehicles = () => {
    console.log('View vehicles clicked')
  }

  return (
    <div className="w-full bg-black">
      <Navbar />
      <Hero onViewVehicles={handleViewVehicles} />
    </div>
  )
}

export default Home
