import { useState, useEffect } from "react";
import { Phone, MapPin, Menu, X, Utensils } from "lucide-react";
import { RESTAURANT_INFO } from "../data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuLinks = [
    { name: "Pradžia", href: "#hero" },
    { name: "Meniu", href: "#meniu" },
    { name: "Dienos Pietūs", href: "#pietus" },
    { name: "Atsiliepimai", href: "#atsiliepimai" },
    { name: "Apie mus", href: "#apiemus" },
    { name: "Kontaktai", href: "#kontaktai" },
  ];

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#hero" className="flex items-center space-x-2.5 group">
            <div className="bg-[#F27D26] p-2 rounded text-black transition-transform duration-300 group-hover:rotate-12">
              <Utensils className="h-5.5 w-5.5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tighter text-white uppercase group-hover:text-[#F27D26] transition-colors leading-none">
                KARALIUS <span className="text-[#F27D26]">NUOGAS</span>
              </span>
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest leading-none mt-0.5 italic">
                {RESTAURANT_INFO.city}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuLinks.map((link) => (
              <a
                id={`nav-link-${link.name.toLowerCase().replace(" ", "-")}`}
                key={link.name}
                href={link.href}
                className="font-display text-sm font-medium text-zinc-300 hover:text-[#F27D26] transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F27D26] after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Call-to-action buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              id="header-call-btn"
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center space-x-2 bg-[#F27D26] text-black font-display font-black uppercase tracking-widest text-sm px-6 py-3.5 hover:bg-white transition-all shadow-lg active:scale-95 cursor-pointer rounded-xl"
            >
              <Phone className="h-4 w-4" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
            <a
              id="header-map-btn"
              href="#kontaktai"
              className="flex items-center space-x-1.5 border border-white/20 px-5 py-3.5 text-zinc-300 hover:text-white hover:bg-white/10 text-xs font-mono transition-all rounded-xl"
            >
              <MapPin className="h-3.5 w-3.5 text-[#F27D26]" />
              <span>Ramygalos g. 49</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <a
              id="mobile-nav-call"
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="p-2.5 rounded-full bg-[#F27D26] text-black hover:bg-white transition-colors"
              title="Skambinti dabar"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg border border-zinc-800 text-zinc-300 hover:text-[#F27D26] hover:border-zinc-700 transition"
              aria-label="Atidaryti meniu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-menu-drawer" className="md:hidden bg-[#0d0d0f]/95 backdrop-blur-xl border-b border-zinc-900 absolute top-full left-0 right-0 py-6 px-4 flex flex-col space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {menuLinks.map((link) => (
              <a
                id={`mobile-nav-link-${link.name.toLowerCase().replace(" ", "-")}`}
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-display text-lg font-medium text-zinc-300 hover:text-[#F27D26] transition-colors py-2 border-b border-zinc-900/50"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <a
              id="mobile-drawer-call-btn"
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center justify-center space-x-2 bg-[#F27D26] text-black py-4 rounded-xl font-display font-black text-sm uppercase tracking-widest cursor-pointer"
            >
              <Phone className="h-5 w-5" />
              <span>Skambinti: {RESTAURANT_INFO.phone}</span>
            </a>
            <a
              id="mobile-drawer-map-btn"
              href="https://www.google.com/maps/search/?api=1&query=Karalius+Nuogas+Ramygalos+g.+49+Panevėžys"
              target="_blank"
              rel="referrer"
              className="flex items-center justify-center space-x-2 border border-white/20 text-zinc-400 py-4 rounded-xl text-xs font-mono"
            >
              <MapPin className="h-4 w-4 text-[#F27D26]" />
              <span>Ramygalos g. 49, Panevėžys</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
