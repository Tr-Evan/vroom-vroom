export default function Navbar() {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6">
      <div className="max-w-7xl mx-auto px-6 py-4 rounded-full backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-white tracking-wider">
          <span className="text-violet-400">⚙</span> Vroom-Vroom
        </div>

        {/* Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
            Notre Histoire
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
            Stock
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
            Nos Services
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
            Spa Automobile
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
            Society Club
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
