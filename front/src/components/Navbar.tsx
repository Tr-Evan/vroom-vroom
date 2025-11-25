import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-6 left-0 right-0 z-[999] px-6">
      <div className="max-w-7xl mx-auto px-6 py-4 rounded-full backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl flex items-center justify-between">
        
        {/* Logo -> Retour accueil */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
          <span className="text-violet-400 text-3xl">⚙</span> 
          <span>Vroom-Vroom</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Notre Histoire</Link>
          <Link to="/stock" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Stock</Link>
          <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">Nos Services</a>
        </div>

        {/* Droite : Profil */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/profile')}
            className="group flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/50 transition-all duration-300 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-[1px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                 {/* Icône User */}
                 <svg className="w-4 h-4 text-white group-hover:text-violet-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
              </div>
            </div>
            <span className="hidden lg:block text-sm font-medium text-white group-hover:text-white transition-colors">
              Mon Espace
            </span>
          </button>
        </div>

      </div>
    </nav>
  );
}