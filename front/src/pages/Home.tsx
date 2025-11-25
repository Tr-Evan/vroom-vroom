import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ListCars from './ListCars'

function Home() {
  const [showVehicles, setShowVehicles] = useState(false)

  const handleViewVehicles = () => {
    setShowVehicles(true)
  }

  if (showVehicles) {
    return <ListCars onBack={() => setShowVehicles(false)} />
  }

  return (
    <div className="w-full bg-black min-h-screen text-white">
      <Navbar />
      <Hero onViewVehicles={handleViewVehicles} />
    </div>
  )
}

export default Home