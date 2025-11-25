import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListCars from './pages/ListCars';
import DetailCars from './pages/DetailCars';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock" element={<ListCars />} />
        <Route path="/stock/:carId" element={<DetailCars />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;