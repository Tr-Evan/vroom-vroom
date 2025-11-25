import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ListCars from './ListCars'
import DetailCars from './DetailCars'

function Home() {
  const [showVehicles, setShowVehicles] = useState(false)
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null)

  const handleViewVehicles = () => setShowVehicles(true)

  const handleSelectCar = (id: number) => {
    setSelectedCarId(id)
    // ensure list view state so back button logic remains consistent
    setShowVehicles(true)
  }

  if (selectedCarId !== null) {
    return <DetailCars carId={selectedCarId} onBack={() => setSelectedCarId(null)} />
  }

  if (showVehicles) {
    return <ListCars onBack={() => setShowVehicles(false)} onSelectCar={handleSelectCar} />
  }

  return (
    <div className="w-full bg-black min-h-screen text-white">
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home