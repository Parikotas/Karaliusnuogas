import { motion } from "motion/react";
import { Phone, ArrowDown, Star, Sparkles, Flame } from "lucide-react";
import { RESTAURANT_INFO } from "../data";
const knBbqPlatter = "/src/assets/images/kn_bbq_platter_1779994047782.png";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#0a0a0b]"
    >
      {/* Cinematic Background Image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={knBbqPlatter}
          alt="Cinematic Karalius Nuogas barbecue smoker and grilled ribs"
          className="w-full h-full object-cover object-center translate-y-0 scale-105 opacity-35"
          referrerPolicy="no-referrer"
        />
        {/* Radial and Linear Vignette for flawless readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/85 to-[#0a0a0b]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0a0a0b_90%)]" />
      </div>

      {/* Sophisticated Dark Absolute Background Overlay Graphic - Elegant geometric flow */}
      <div className="absolute inset-y-0 right-0 w-[45vw] opacity-15 pointer-events-none hidden lg:block z-5">
        <svg
          className="w-full h-full text-[#F27D26]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 0 C 65 30, 40 70, 100 100 L 100 0 Z"
            fill="currentColor"
            opacity="0.12"
          />
          <path
            d="M65 -10 C 80 25, 55 65, 110 95"
            stroke="currentColor"
            strokeWidth="0.7px"
            opacity="0.3"
          />
          <path
            d="M80 -20 C 95 20, 70 60, 120 90"
            stroke="currentColor"
            strokeWidth="0.4px"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* Decorative Warm Spotlights */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#F27D26]/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 md:pt-16 pb-20">
        
        {/* Humorous Underdog Badge */}
        <motion.div
          id="hero-underdog-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 backdrop-blur-md px-4.5 py-2 rounded-full mb-8"
        >
          <Flame className="h-4 w-4 text-[#F27D26] animate-pulse" />
          <span className="font-mono text-[11px] text-zinc-300 font-bold tracking-widest uppercase">
            Skaniausi burgeriai Panevėžyje (Vietinių pasirinkimas)
          </span>
          <span className="bg-[#F27D26] text-black font-display font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            4.9★
          </span>
        </motion.div>

        {/* Core Slogan / Title */}
        <motion.h1
          id="hero-main-title"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-tight"
        >
          TIKRAS SKONIS. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-[#F27D26] to-yellow-500">
            DIDELĖS PORCIJOS.
          </span> <br />
          NORMALIOS KAINOS.
        </motion.h1>

        {/* Hungry triggering Subtext */}
        <motion.p
          id="hero-subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 font-sans leading-relaxed"
        >
          Sustabdyk skrandžio murmėjimą. Pas mus gausi tiek mėsos, kad užteks ir tau, ir rytojaus pusryčiams. Jokių miniatiūrinių gurmaniškų eksperimentų – galingi burgeriai nuo <span className="text-white font-bold">6.90 €</span> ir šonkauliukai, kurie patys krenta nuo kaulo.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          id="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            id="hero-menu-cta"
            href="#meniu"
            className="w-full sm:w-auto border border-white/20 px-8 py-4 font-black uppercase tracking-widest text-sm text-zinc-200 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 text-center flex items-center justify-center space-x-2"
          >
            <span>Peržiūrėti meniu</span>
            <Sparkles className="h-4 w-4 text-[#F27D26]" />
          </a>

          <a
            id="hero-call-cta"
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="w-full sm:w-auto bg-[#F27D26] text-black px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white rounded-xl transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 glow-orange"
          >
            <Phone className="h-4.5 w-4.5" />
            <span>Skambinti dabar</span>
          </a>
        </motion.div>

        {/* Business trust factors quicklist */}
        <motion.div
          id="hero-ratings-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/10 max-w-3xl mx-auto grid grid-cols-3 gap-4"
        >
          <div className="text-center">
            <div className="flex justify-center text-[#F27D26] gap-0.5 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Geriausias maistas</p>
            <p className="font-display font-medium text-xs text-zinc-300 mt-1 uppercase tracking-wider">4.9/5 įvertis</p>
          </div>
          <div className="text-center border-x border-white/10">
            <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Skaidri kaina</p>
            <p className="font-display font-medium text-xs text-zinc-300 mt-1 uppercase tracking-wider">1–10 € patiekalai</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Kur rasti</p>
            <p className="font-display font-medium text-xs text-zinc-300 mt-1 uppercase tracking-wider">Ramygalos g. 49</p>
          </div>
        </motion.div>

        {/* Animated scrolling helper */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer animate-ghost"
          onClick={() => {
            document.getElementById("tarpine")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-mono text-[9px] uppercase tracking-widest mb-1.5 text-zinc-400">Riedėti žemyn</span>
          <ArrowDown className="h-4 w-4 text-[#F27D26]" />
        </motion.div>
      </div>
    </section>
  );
}
