import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListCars from './pages/ListCars';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock" element={<ListCars />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;