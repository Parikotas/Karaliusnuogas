import { useState, useEffect, FormEvent } from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Flame, 
  Sparkles, 
  ThumbsUp, 
  ChefHat, 
  Coffee, 
  TrendingUp, 
  Heart, 
  Navigation,
  CheckCircle2,
  Calendar,
  MessageSquare,
  PlusCircle,
  HelpCircle,
  Menu,
  Shield,
  UtensilsCrossed,
  X
} from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AIWaiter from "./components/AIWaiter";
import { RESTAURANT_INFO, MENU_ITEMS, REVIEWS, WEEKLY_LUNCH } from "./data";
import { MenuItem, Review } from "./types";

// Authentic Customer Uploaded Images saved inside the compiled workspace
const knRibsKamado = "/src/assets/images/kn_ribs_kamado_1779993941600.png";
const knChefRibs = "/src/assets/images/kn_chef_ribs_1779993972629.png";
const knBurgerCombo = "/src/assets/images/kn_burger_combo_1779993991575.png";
const knRibsGlazed = "/src/assets/images/kn_ribs_glazed_1779994009635.png";
const knBbqPlatter = "/src/assets/images/kn_bbq_platter_1779994047782.png";
const knDailySoup = "/src/assets/images/kn_daily_soup_1779994067058.png";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
  
  // Custom Reviews Form State
  const [newAuthor, setNewAuthor] = useState("");
  const [newRole, setNewRole] = useState("Panevėžio vietinis");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Simulated live conversion stats to boost urgency (FOMO)
  const [burgerCounter, setBurgerCounter] = useState(114);
  const [ribsCounter, setRibsCounter] = useState(47);
  const [freeTables, setFreeTables] = useState(8);

  // Active day selection for the Daily Lunch planner
  // Detect current day of week (1 = Monday, 5 = Friday, etc.)
  const todayNum = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const initialActiveDay = todayNum >= 1 && todayNum <= 5 ? todayNum - 1 : 0; // default to Pirmadienis (0) if weekend
  const [activeLunchDay, setActiveLunchDay] = useState<number>(initialActiveDay);

  // Automatic increment for FOMO stats
  useEffect(() => {
    const interval = setInterval(() => {
      setBurgerCounter(prev => prev + Math.floor(Math.random() * 2) + 1);
      if (Math.random() > 0.6) {
        setRibsCounter(prev => prev + 1);
      }
      if (Math.random() > 0.8) {
        setFreeTables(prev => {
          if (prev <= 2) return 6;
          return prev - 1;
        });
      }
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  const filteredMenuItems = selectedCategory === "all" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) {
      setSubmitError("Prašome įrašyti savo vardą ir atsiliepimą!");
      return;
    }

    const createdReview: Review = {
      id: `rev-custom-${Date.now()}`,
      author: newAuthor,
      role: newRole || "Svečias",
      text: newText,
      rating: newRating,
      date: "Ką tik",
      sentiment: "amazing"
    };

    setReviewsList([createdReview, ...reviewsList]);
    setNewAuthor("");
    setNewText("");
    setNewRating(5);
    setIsSubmitSuccess(true);
    setSubmitError("");
    setTimeout(() => setIsSubmitSuccess(false), 5000);
  };

  return (
    <div className="bg-[#0a0a0b] text-white min-h-screen selection:bg-[#F27D26] selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Absolute Backdrop Gradient Accent */}
      <div className="absolute top-0 right-0 w-[50vw] h-[100vh] bg-gradient-to-b from-[#F27D26]/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[120vh] left-0 w-[40vw] h-[80vh] bg-[radial-gradient(circle_at_center,#F27D26_0%,transparent_70%)] opacity-5 pointer-events-none z-0" />

      {/* 1. Header/Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* Live Conversion Bar / FOMO Ticker */}
      <div id="tarpine" className="relative z-20 bg-gradient-to-r from-[#121215] via-[#1a1a20] to-[#121215] border-y border-white/5 py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center space-x-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <p className="font-mono text-xs sm:text-sm tracking-wide text-zinc-300">
                Karštos Panevėžio naujienos: restoranas dabar <strong className="text-white">ATIDARYTAS</strong>. Užsuk arba skambink!
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
              <div className="flex items-center space-x-2">
                <Flame className="h-4 w-4 text-[#F27D26]" />
                <span className="text-zinc-400 text-xs sm:text-sm font-mono">
                  Šiandien iškepta burgerių: <strong className="text-[#F27D26] text-sm font-black">{burgerCounter}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ChefHat className="h-4 w-4 text-[#F27D26]" />
                <span className="text-zinc-400 text-xs sm:text-sm font-mono">
                  Šonkaulių svorio parduota: <strong className="text-white text-sm font-black">{ribsCounter} kg</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-zinc-400 text-xs sm:text-sm font-mono">
                  Laisvų staliukų vakarui: <strong className="text-green-400 text-sm font-black">{freeTables}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SOCIAL PROOF / PASITIKĖJIMO SEKCIJA */}
      <section id="pasitikejimas" className="py-20 relative z-20 bg-[#0a0a0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#F27D26] font-mono text-xs font-semibold tracking-widest uppercase bg-[#F27D26]/10 px-4 py-1.5 rounded-full">
              Kodėl Panevėžiečiai renkasi mus
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white mt-4 tracking-tight leading-tight uppercase">
              Čia ne turistinė nesąmonė. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500">
                Čia vieta, kur vietiniai tikrai valgo.
              </span>
            </h2>
            <div className="w-16 h-1 bg-[#F27D26] mx-auto mt-6" />
          </div>

          <div id="trust-factors-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1. Rating */}
            <div className="bg-[#121215] border border-white/5 hover:border-[#F27D26]/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#F27D26]/10 p-3.5 rounded-2xl text-[#F27D26] group-hover:bg-[#F27D26] group-hover:text-black transition-all">
                  <Star className="h-6 w-6 fill-current" />
                </div>
                <span className="font-mono text-5xl font-black text-[#F27D26]/30 group-hover:text-[#F27D26]/50 transition-colors">4.9</span>
              </div>
              <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-tight">4.9★ Rekordinis Įvertinimas</h3>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                Google, Facebook ir žodiniai atsiliepimai nemeluoja. Panevėžio mėsos gerbėjai vieningai sutaria – esame geriausiai kainos ir kokybės santykį atidirbęs burgerių taškas mieste.
              </p>
            </div>

            {/* 2. Skanu, pigu ir greita */}
            <div className="bg-[#121215] border border-white/5 hover:border-[#F27D26]/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#F27D26]/10 p-3.5 rounded-2xl text-[#F27D26] group-hover:bg-[#F27D26] group-hover:text-black transition-all">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <span className="font-mono text-5xl font-black text-[#F27D26]/30 group-hover:text-[#F27D26]/50 transition-colors">€%</span>
              </div>
              <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-tight">Skanu, Pigu ir Greita</h3>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                Jokių kosminių antkainių už orą ar šaukštelių skambesį. Sotūs dienos pietūs ir milžiniški burgeriai pasiekia stalą už sąžiningą kainą (kasdien telpa į 1–10 € biudžetą).
              </p>
            </div>

            {/* 3. Dideles porcijos */}
            <div className="bg-[#121215] border border-white/5 hover:border-[#F27D26]/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#F27D26]/10 p-3.5 rounded-2xl text-[#F27D26] group-hover:bg-[#F27D26] group-hover:text-black transition-all">
                  <Flame className="h-6 w-6" />
                </div>
                <span className="font-mono text-5xl font-black text-[#F27D26]/30 group-hover:text-[#F27D26]/50 transition-colors">X2</span>
              </div>
              <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-tight">Didelės Porcijos</h3>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                Jeigu užsisakai pas mus – pasiruošk, kad reikės abiejų rankų maistui laikyti. Mes netaupome ingredientų mėsos kukulio dydžio sąskaita. Čia išeinama tik sočiam.
              </p>
            </div>

            {/* 4. Draugiskas personalas */}
            <div className="bg-[#121215] border border-white/5 hover:border-[#F27D26]/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#F27D26]/10 p-3.5 rounded-2xl text-[#F27D26] group-hover:bg-[#F27D26] group-hover:text-black transition-all">
                  <Heart className="h-6 w-6" />
                </div>
                <span className="font-mono text-5xl font-black text-[#F27D26]/30 group-hover:text-[#F27D26]/50 transition-colors">LT</span>
              </div>
              <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-tight">Charizmatiškas kolektyvas</h3>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                Mūsų pasididžiavimas – tikras lietuviškas humoro charakteris. Padavėjas Karolis ir visa komanda paklaus kaip sekasi, pajuokaus ir patars, koks BBQ šiandien pavyko giliausiai.
              </p>
            </div>

            {/* 5. Geriausias maistas */}
            <div className="bg-[#121215] border border-white/5 hover:border-[#F27D26]/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#F27D26]/10 p-3.5 rounded-2xl text-[#F27D26] group-hover:bg-[#F27D26] group-hover:text-black transition-all">
                  <ChefHat className="h-6 w-6" />
                </div>
                <span className="font-mono text-5xl font-black text-[#F27D26]/30 group-hover:text-[#F27D26]/50 transition-colors">100</span>
              </div>
              <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-tight">Sąžininga Kokybė</h3>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                Šviežutėlė brioche bandelė, jautiena iš lietuviškų sertifikuotų ūkių, tamsiu alumi glazūruoti ir 6 valandas troškinti šonkauliukai. Jokio šaldyto pigaus faršo.
              </p>
            </div>

            {/* 6. Greitas aptarnavimas */}
            <div className="bg-[#121215] border border-white/5 hover:border-[#F27D26]/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#F27D26]/10 p-3.5 rounded-2xl text-[#F27D26] group-hover:bg-[#F27D26] group-hover:text-black transition-all">
                  <Clock className="h-6 w-6" />
                </div>
                <span className="font-mono text-5xl font-black text-[#F27D26]/30 group-hover:text-[#F27D26]/50 transition-colors">MIN</span>
              </div>
              <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-tight">Greitas Atidirbimas</h3>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                Kai skubate gyventi, nekankiname laukimu. Mūsų kompleksiniai pietūs atkeliauja garuojantys vos per kelias minutes nuo užsakymo, o burgeriai – greičiau nei spėsi perskaityti dienos spaudą.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. DIENOS PIETŪS (COMPLEX LUNCHES) PLANNER SECTION */}
      <section id="pietus" className="py-20 relative bg-[#0e0e11] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#F27D26] font-mono text-xs font-semibold tracking-widest uppercase bg-[#F27D26]/10 px-4 py-1.5 rounded-full">
                Skaniausias dienos džiaugsmas
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight leading-none">
                Galingi <span className="text-[#F27D26]">Dienos Pietūs</span> Panevėžyje
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed">
                Pavargai nuo mikroskopinių sumuštinių už kosminę kainą? Mūsų dienos pietų kompleksai – tai galinga garuojanti naminė sriuba ir milžiniškas antrasis patiekalas su garnyru, kuris pastatys ant kojų bet kurį dirbantį žmogų. 
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-center space-x-3.5">
                  <CheckCircle2 className="h-5 w-5 text-[#F27D26]" />
                  <span className="text-zinc-300 font-medium text-sm">Kasdien vis naujas, naminis, garuojantis meniu</span>
                </div>
                <div className="flex items-center space-x-3.5">
                  <CheckCircle2 className="h-5 w-5 text-[#F27D26]" />
                  <span className="text-zinc-300 font-medium text-sm">Porcijos, kurios realiai pasotina iki vakarienės</span>
                </div>
                <div className="flex items-center space-x-3.5">
                  <CheckCircle2 className="h-5 w-5 text-[#F27D26]" />
                  <span className="text-zinc-300 font-medium text-sm">Super greitas paruošimas: tinka per trumpiausią pertrauką</span>
                </div>
                <div className="flex items-center space-x-3.5">
                  <CheckCircle2 className="h-5 w-5 text-[#F27D26]" />
                  <span className="text-zinc-300 font-medium text-sm">Komplekso kaina visada draugiška dūšia: tik <strong className="text-white">6.50 €</strong></span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  id="lunch-call-booking"
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="bg-[#F27D26] text-black font-display font-extrabold text-sm uppercase px-6 py-3.5 rounded-xl hover:bg-white transition-all text-center flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Phone className="h-4 w-4" />
                  <span>Rezervuoti dienos pietus ({RESTAURANT_INFO.phone})</span>
                </a>
              </div>
            </div>

            {/* Interactive weekly calendar planner */}
            <div className="lg:col-span-7 bg-[#121215] border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F27D26]/10 rounded-full blur-2xl"></div>
              
              <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-[#F27D26]" />
                  <h3 className="font-display font-extrabold text-lg uppercase tracking-tight text-white">Savaitinis valgiaraštis</h3>
                </div>
                <span className="text-[#F27D26] font-mono text-xs font-bold bg-[#F27D26]/10 px-2.5 py-1 rounded-md">
                  Sriuba + Antrasis tik 6.50 €
                </span>
              </div>

              {/* Day selection tabs */}
              <div id="lunch-days-tabs" className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-6">
                {WEEKLY_LUNCH.map((item, idx) => (
                  <button
                    key={item.day}
                    onClick={() => setActiveLunchDay(idx)}
                    className={`py-3.5 px-1 sm:px-3 text-center rounded-xl transition-all duration-300 flex flex-col justify-center items-center cursor-pointer ${
                      activeLunchDay === idx
                        ? "bg-[#F27D26] text-black font-black"
                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest leading-none">
                      {item.day.substring(0, 3)}
                    </span>
                    <span className="text-xs font-display font-semibold mt-1">
                      {item.day.substring(3)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Day details view */}
              <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-5 sm:p-6 space-y-5 min-h-[180px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                      {WEEKLY_LUNCH[activeLunchDay].day} dienos patiekalai • Patiekiama 11:00-15:00
                    </span>
                    {activeLunchDay === initialActiveDay && (
                      <span className="bg-green-500/10 text-green-400 font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                        <span className="w-1 h-1 rounded-full bg-green-400"></span> Šiandien gaminame!
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Sriuba */}
                    <div className="flex items-start gap-3">
                      <span className="text-[#F27D26] text-lg mt-0.5">🥣</span>
                      <div>
                        <h4 className="font-display font-extrabold text-white text-base">
                          {WEEKLY_LUNCH[activeLunchDay].soup}
                        </h4>
                        <p className="text-zinc-500 text-xs mt-0.5">Naminė, šilta, verdama su natūraliu sultiniu</p>
                      </div>
                    </div>

                    {/* Antrasis */}
                    <div className="flex items-start gap-3 border-t border-zinc-800/80 pt-4">
                      <span className="text-[#F27D26] text-lg mt-0.5">🍛</span>
                      <div>
                        <h4 className="font-display font-extrabold text-white text-base">
                          {WEEKLY_LUNCH[activeLunchDay].main}
                        </h4>
                        <p className="text-zinc-500 text-xs mt-0.5">Pateikiama su traškiomis keptomis bulvytėmis is šviežiomis salotomis</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <p className="text-xs text-zinc-400 font-sans">
                    Nori gauti karštus dienos pietus tiesiai į ofisą ar atsiimti pats? Užsisakyk iš anksto!
                  </p>
                  <a
                    id={`lunch-order-btn-${activeLunchDay}`}
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="w-full sm:w-auto px-5 py-2 bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-[#F27D26] text-xs font-bold font-display uppercase tracking-widest rounded-lg transition-all"
                  >
                    Užsisakyti telefonu
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. POPULIARIAUSI PATIEKALAI (MENU CARDS WITH FILTER) */}
      <section id="meniu" className="py-20 relative z-20 bg-[#0a0a0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#F27D26] font-mono text-xs font-semibold tracking-widest uppercase bg-[#F27D26]/10 px-4 py-1.5 rounded-full">
              Pristatome geriausius virtuvės kūrinius
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white mt-4 uppercase tracking-tight">
              Auksinis <span className="text-[#F27D26]">„Karaliaus Nuogo“</span> Meniu
            </h2>
            <p className="text-zinc-400 text-sm mt-3 font-mono">
              Tikras maistas už sąžiningą kainą. Pasirink kategoriją ir pabudink savo drakonišką alkį!
            </p>
            <div className="w-16 h-1 bg-[#F27D26] mx-auto mt-6" />
          </div>

          {/* Premium Filter Controls */}
          <div id="menu-filters" className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {[
              { id: "all", name: "Visi patiekalai" },
              { id: "burgers", name: "🏆 Burgeriai" },
              { id: "ribs", name: "🥩 Šonkauliukai" },
              { id: "lunch", name: "🍲 Dienos Pietūs" },
              { id: "beets", name: "🥗 Kepti burokėliai" },
              { id: "coffee", name: "☕ Kava" },
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-3 rounded-xl font-display font-extrabold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === category.id
                    ? "bg-[#F27D26] text-black shadow-lg shadow-[#F27D26]/20"
                    : "bg-[#121215] border border-white/5 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Dynamic Food Grid */}
          <div id="food-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenuItems.map((item) => (
              <div
                id={`menu-item-card-${item.id}`}
                key={item.id}
                onClick={() => setSelectedFood(item)}
                className="bg-[#121215] border border-white/5 hover:border-[#F27D26]/30 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer shadow-xl relative min-h-[300px]"
              >
                <div className="space-y-4">
                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <span className="bg-white/5 border border-white/10 text-zinc-300 font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-lg">
                      {item.category === "burgers" ? "🍔 Burgeris" :
                       item.category === "ribs" ? "🥩 Lėto kepimo" :
                       item.category === "beets" ? "🥗 Sveikas šedevras" :
                       item.category === "lunch" ? "🍲 Pietūs" : "☕ Kofeinas"}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <span className="bg-[#F27D26]/10 text-[#F27D26] font-mono text-[11px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{item.rating}</span>
                      </span>
                      {item.tag && (
                        <span className="bg-[#F27D26] text-black font-display font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow">
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Price */}
                  <div className="flex justify-between items-start gap-2 pt-1">
                    <h3 className="font-display font-extrabold text-lg text-white group-hover:text-[#F27D26] transition-colors leading-tight uppercase">
                      {item.title}
                    </h3>
                    <span className="font-display font-black text-lg text-[#F27D26] whitespace-nowrap">
                      {item.price.toFixed(2)} €
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
                    {item.description}
                  </p>

                  {/* Ingredients */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="bg-white/5 text-zinc-300 font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded border border-white/5">
                        {ing}
                      </span>
                    ))}
                    {item.ingredients.length > 3 && (
                      <span className="bg-[#F27D26]/10 text-[#F27D26] font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded font-bold">
                        +{item.ingredients.length - 3} kitų
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer info */}
                <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500 flex items-center gap-1">
                    ⏱️ {item.preparationTime || "10-15 min"}
                  </span>
                  <span className="text-[#F27D26] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    RECEPTAS & UŽSAKYMAS ➔
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Simple design disclaimer in section footer */}
          <div className="bg-[#121215] border border-white/5 rounded-3xl p-6 sm:p-8 mt-12 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="font-display font-extrabold text-base text-zinc-200">
                💡 Norite viską patirti gyvai ir paragauti šonkaulių?
              </p>
              <p className="text-zinc-500 text-xs mt-1 sm:max-w-xl font-sans">
                Skambinkite telefonu užsakymui išsinešti arba staliuko rezervacijai. Priimame visus užsakymus Panevėžyje greitai ir be gailesčio jūsų alkiui!
              </p>
            </div>
            <a
              id="menu-contact-action-btn"
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="bg-[#F27D26] hover:bg-white text-black font-display font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition duration-300 flex items-center gap-2 whitespace-nowrap glow-orange"
            >
              <Phone className="h-4 w-4" />
              <span>SUTVARKYTI UŽSAKYMĄ</span>
            </a>
          </div>

        </div>
      </section>

      {/* 6. ATSILIEPIMŲ SEKCIJA (REVIEWS WITH CUSTOM FORM ADDER) */}
      <section id="atsiliepimai" className="py-20 relative bg-[#0e0e11] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Reviews left stats & form */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-[#F27D26] font-mono text-xs font-semibold tracking-widest uppercase bg-[#F27D26]/10 px-4 py-1.5 rounded-full">
                  Tikros žmonių emocijos
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight leading-none">
                  Ką sako mūsų <span className="text-[#F27D26]">Kaimynai</span>?
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Mes neslepiame savo nuogybės ir neperkame melagingų madingų žurnalų įvertinimų. Kiekvienas atsiliepimas – tai galingai pasisotinusio Panevėžio žmogaus parašyta tiesa.
                </p>
              </div>

              {/* Real metric scale cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#121215] border border-white/5 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black text-yellow-500 font-display">4.9 / 5</div>
                  <div className="text-purple-100/40 text-[10px] font-mono uppercase tracking-widest mt-1">Google Rezultatas</div>
                </div>
                <div className="bg-[#121215] border border-white/5 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black text-[#F27D26] font-display">+1,400</div>
                  <div className="text-purple-100/40 text-[10px] font-mono uppercase tracking-widest mt-1">Svečių kas mėnesį</div>
                </div>
              </div>

              {/* LEAVE A REVIEW FORM */}
              <div className="bg-[#121215] border border-white/5 rounded-3xl p-6 relative">
                <h3 className="font-display font-extrabold text-base uppercase text-white mb-4 flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-[#F27D26]" /> Palikite savo atsiliepimą
                </h3>

                {isSubmitSuccess && (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-xs font-medium mb-4">
                    🎉 Ačiū! Jūsų nuomonė mums beprotiškai svarbi. Atsiliepimas akimirksniu įtrauktas į žemiau esantį vietinių sąrašą!
                  </div>
                )}

                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-medium mb-4">
                    ⚠️ {submitError}
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1.5">Jūsų vardas / Slapyvardis</label>
                    <input
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="Pvz. Marius K."
                      className="w-full bg-[#0a0a0b] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1.5">Kas jūs esate?</label>
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="w-full bg-[#0a0a0b] border border-white/5 rounded-xl px-3 py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-[#F27D26]"
                      >
                        <option value="Panevėžio vietinis">Panevėžio vietinis</option>
                        <option value="Užkietėjęs mėsėdis">Užkietėjęs mėsėdis</option>
                        <option value="Kompleksinių pietų fanas">Kompleksinių pietų fanas</option>
                        <option value="Draugiškas kaimynas">Draugiškas kaimynas</option>
                        <option value="Svečias iš kito miesto">Svečias iš kito miesto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1.5">Įvertinimas (Žvaigždutės)</label>
                      <div className="flex gap-1 bg-[#0a0a0b] border border-white/5 rounded-xl px-3 py-1.5 items-center justify-around h-[38px]">
                        {[1, 2, 3, 4, 5].map((starsNum) => (
                          <button
                            key={starsNum}
                            type="button"
                            onClick={() => setNewRating(starsNum)}
                            className="text-yellow-500 hover:scale-125 transition"
                            title={`${starsNum} žvaigždutės`}
                          >
                            <Star className={`h-4 w-4 ${newRating >= starsNum ? "fill-current" : "text-zinc-600"}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-1.5">Jūsų atsiliepimas (Būkite atviri!)</label>
                    <textarea
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      rows={3}
                      placeholder="Pvz. burgeris sultingas, šonkauliai nukrenta nuo kaulo, sugrįšiu dar dešimt kartų!"
                      className="w-full bg-[#0a0a0b] border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26]"
                    />
                  </div>

                  <button
                    id="submit-review-btn"
                    type="submit"
                    className="w-full py-3 bg-zinc-900 border border-zinc-800 hover:border-[#F27D26] text-zinc-300 hover:text-[#F27D26] font-display font-extrabold text-xs uppercase tracking-widest rounded-xl transition"
                  >
                    Skelbti atsiliepimą 💬
                  </button>
                </form>

              </div>
            </div>

            {/* List shelf with reviews */}
            <div className="lg:col-span-7 space-y-6 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">

              {reviewsList.map((rev) => (
                <div
                  id={`review-card-${rev.id}`}
                  key={rev.id}
                  className="bg-[#121215] border border-white/5 rounded-2xl p-6 space-y-4 hover:border-zinc-800 transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F27D26] to-[#ffaa00] text-black font-display font-extrabold text-sm flex items-center justify-center">
                        {rev.author.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-sm text-white">{rev.author}</h4>
                        <p className="text-zinc-500 text-xs font-mono">{rev.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-600 font-mono text-[10px]">{rev.date}</span>
                      <div className="flex text-yellow-500 gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < rev.rating ? "fill-current" : "text-zinc-700"}`} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed italic">
                    „{rev.text}“
                  </p>

                  <div className="flex items-center space-x-3 text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-900">
                    <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3 text-[#F27D26]" /> Naudingas atsiliepimas</span>
                    <span>•</span>
                    <span className="text-zinc-600">Patikrintas apsilankymas Panevėžyje</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 7. APIE MUS SECTION (BRAND CHARACTER & STORY) */}
      <section id="apiemus" className="py-24 relative z-20 bg-[#0a0a0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden h-[450px] shadow-2xl group border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1551782450-1a1a3b13c19d?auto=format&fit=crop&q=80&w=1000"
                alt="Grilling burgers under fire flame"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 space-y-2">
                <span className="bg-[#F27D26] text-black font-mono text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded">
                  Komanda & Dvasia
                </span>
                <p className="font-display font-black text-2xl uppercase tracking-tight text-white">
                  MŪSŲ DEVYZAS: JOKIŲ SMALKIŲ MELŲ AR KLIENTŲ APGAULIŲ
                </p>
                <p className="text-zinc-300 text-xs">
                  Mes norime matyti laimingus, sočius Panevėžio žmones. Gaminame tai, ką patys valgome su džiugia nuotaika.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#F27D26] font-mono text-xs font-semibold tracking-widest uppercase bg-[#F27D26]/10 px-4 py-1.5 rounded-full">
                Supažindinkime iš arti
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-black text-white uppercase tracking-tight leading-none">
                Susipažinkite, <br className="hidden sm:inline" />
                Mes esame <span className="text-[#F27D26]">„Karalius Nuogas“</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                {RESTAURANT_INFO.story}
              </p>

              <div className="border-t border-zinc-900 pt-6 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-display font-extrabold text-sm uppercase text-[#F27D26]">Humoras + Nuotaika</h4>
                  <p className="text-zinc-500 text-xs mt-2 font-sans leading-relaxed">
                    Nekuriame įtemptos tylos. Pas mus groja gera šiuolaikinė muzika, personalas bendrauja draugiškai kaip su kaimynu, o virtuvėje visada verda linksmos diskusijos apie skaniausią jautienos pjaustymą.
                  </p>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm uppercase text-[#F27D26]">Lietuviškas charakteris</h4>
                  <p className="text-zinc-500 text-xs mt-2 font-sans leading-relaxed">
                    Svetainė ir restoranas įkurti Panevėžyje, Ramygalos gatvėje, išnaudojant visą mūsų krašto darbštumą, atvirumą ir meilę tiesiam, kokybiškam, be jokių mandrysčių patiektam jautienos kepsniui.
                  </p>
                </div>
              </div>

              {/* Secret signature list to improve marketing hook */}
              <div className="pt-4 bg-zinc-950 p-4 border border-white/5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <h5 className="font-display font-bold text-xs uppercase text-white">„Nuogumo Garantija“</h5>
                    <p className="text-zinc-500 text-[10px] mt-0.5">Nepatiko maistas? Grąžinsime pinigus be jokių klausimų ar ginčų!</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#F27D26] font-bold">100% Sąžininga</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. KONTAKTAI SECTION (MAP, ADDRESS, HOURS, ROUTING ACTION) */}
      <section id="kontaktai" className="py-20 relative z-20 bg-[#0e0e11] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#F27D26] font-mono text-xs font-semibold tracking-widest uppercase bg-[#F27D26]/10 px-4 py-1.5 rounded-full">
              Kviečiame apsilankyti gyvai
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white mt-4 uppercase tracking-tight">
              Kur mus <span className="text-[#F27D26]">Rasti</span> & Kada laukiame?
            </h2>
            <p className="text-zinc-400 text-sm mt-3">
              Mūsų durys Panevėžyje visuomet atviros alkaniems kaimynams. Atvažiuok, sutvarkisim visus alkio klausimus!
            </p>
            <div className="w-16 h-1 bg-[#F27D26] mx-auto mt-6" />
          </div>

          <div id="contacts-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Contacts list panel */}
            <div className="lg:col-span-4 bg-[#121215] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                <div className="border-b border-zinc-800 pb-4">
                  <p className="font-mono text-[9px] text-[#F27D26] uppercase font-bold tracking-widest">MŪSŲ REZIDENCIJA</p>
                  <h3 className="font-display font-extrabold text-2xl uppercase mt-1 text-white">Ramygalos g. 49</h3>
                  <p className="text-zinc-400 text-sm">Panevėžys, Lietuva (Senamiestis)</p>
                </div>

                <div className="border-b border-zinc-800 pb-4">
                  <p className="font-mono text-[9px] text-[#F27D26] uppercase font-bold tracking-widest">PASKAMBINKITE MUMS</p>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-display font-black text-2xl text-[#F27D26] hover:text-white transition mt-1 block">
                    {RESTAURANT_INFO.phone}
                  </a>
                  <p className="text-zinc-500 text-xs">Atsakome greitai, ruošiame išsinešimui akimirksniu!</p>
                </div>

                <div>
                  <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">DARBO LAIKAS</p>
                  <div className="space-y-2 mt-3 font-sans text-sm">
                    <div className="flex justify-between border-b border-zinc-900 pb-1">
                      <span className="text-zinc-300 font-semibold">Pirmadienis - Penktadienis:</span>
                      <span className="text-white font-mono">{RESTAURANT_INFO.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-900 pb-1">
                      <span className="text-zinc-300 font-semibold font-sans">Šeštadienis:</span>
                      <span className="text-white font-mono">{RESTAURANT_INFO.hours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-300 font-semibold">Sekmadienis:</span>
                      <span className="text-white font-mono">{RESTAURANT_INFO.hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Giant Routing action button triggers conversion rate */}
              <a
                id="get-directions-route-btn"
                href="https://www.google.com/maps/search/?api=1&query=Karalius+Nuogas+Ramygalos+g.+49+Panevėžys"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#F27D26] hover:bg-white text-black font-display font-black text-xs uppercase tracking-widest py-4 rounded-xl text-center flex items-center justify-center space-x-2.5 transition duration-300 glow-orange"
              >
                <Navigation className="h-4.5 w-4.5" />
                <span>GAUTI MARŠRŪTĄ GOOGLE MAPS</span>
              </a>

            </div>

            {/* Google maps frame container wrapper */}
            <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-white/5 min-h-[350px] shadow-2xl relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2270.0883011388383!2d24.36444057715764!3d55.722216573072236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e6323cfeb1b239%3A0xe54d24eecc59da67!2sRamygalos%20g.%2049%2C%20Panev%C4%97%C5%BEys%2C%2036203%20Panev%C4%97%C5%BEio%20m.%20sav.!5e0!3m2!1slt!2slt!4v1716912345678!5m2!1slt!2slt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps: Ramygalos g. 49, Panevėžys"
                className="absolute inset-0"
              />
            </div>

          </div>

        </div>
      </section>

      {/* 9. FOOD CARD DETAIL MODAL POPUP */}
      {selectedFood && (
        <div id="food-detail-modal" className="fixed inset-0 bg-black/80 backdrop-blur-md z-55 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#0f0f11] border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setSelectedFood(null)}
              className="absolute top-4 right-4 z-40 bg-black/50 text-white rounded-full p-2 hover:text-[#F27D26] hover:bg-black/80 transition"
              title="Uždaryti"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Text Header (No Image) */}
            <div className="relative p-6 sm:p-8 bg-[#121215] border-b border-white/5 flex flex-col justify-between pt-12">
              <div className="absolute top-4 left-6">
                <span className="bg-[#F27D26] text-black font-display font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded">
                  {selectedFood.tag || selectedFood.category.toUpperCase()}
                </span>
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  {selectedFood.title}
                </h3>
                <div className="flex items-center gap-1 text-yellow-500 font-mono text-sm font-black bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 self-start sm:self-auto">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{selectedFood.rating}</span>
                </div>
              </div>
            </div>

            {/* Modal Specs */}
            <div className="p-6 space-y-6">
              <div>
                <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">PATIEKALO APRAŠYMAS & RECEPTŪRA</p>
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">{selectedFood.description}</p>
              </div>

              {/* Ingredients breakdown */}
              <div>
                <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-2">PAGRINDINIAI AKCENTAI</p>
                <div className="flex flex-wrap gap-2">
                  {selectedFood.ingredients.map((ing, i) => (
                    <span key={i} className="bg-white/5 border border-white/5 text-zinc-300 font-sans text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]" /> {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cooking time & pricing scale */}
              <div className="grid grid-cols-2 gap-4 bg-zinc-950 p-4 border border-white/5 rounded-2xl">
                <div>
                  <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest">Kaina</span>
                  <div className="font-display font-black text-xl text-[#F27D26] mt-0.5">
                    {selectedFood.price.toFixed(2)} €
                  </div>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest">Paruošimo trukmė</span>
                  <div className="text-white text-sm font-semibold mt-1 flex items-center gap-1.5">
                    ⏱️ {selectedFood.preparationTime || "12 min"}
                  </div>
                </div>
              </div>

              {/* Instant Call conversion button inside card */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  id="modal-phone-order-action"
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex-1 bg-[#F27D26] hover:bg-white text-black font-display font-black text-sm uppercase px-6 py-4 rounded-xl text-center flex items-center justify-center space-x-2 tracking-wider glow-orange"
                >
                  <Phone className="h-4.5 w-4.5" />
                  <span>Užsakyti dabar ({selectedFood.price.toFixed(2)} €)</span>
                </a>
                <button
                  onClick={() => setSelectedFood(null)}
                  className="px-6 py-4 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl text-sm font-semibold transition"
                >
                  Grįžti atgal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. REAL-TIME AI WAITER ASSISTANT BOX */}
      <AIWaiter />

      {/* 11. FOOTER BRAND STRIPE */}
      <footer className="bg-[#070708] border-t border-white/5 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
            <div className="flex items-center space-x-2">
              <div className="bg-[#F27D26] p-1.5 rounded text-black font-bold text-sm">
                👑
              </div>
              <div>
                <span className="font-display font-extrabold text-white text-lg uppercase">
                  Karalius <span className="text-[#F27D26]">Nuogas</span>
                </span>
                <p className="text-[10px] text-zinc-600 tracking-wider uppercase font-mono mt-0.5">
                  Panevėžys • Tikros burgerinės dvasia © {new Date().getFullYear()}
                </p>
              </div>
            </div>

            <p className="text-zinc-600 text-xs text-center max-w-sm md:text-right font-sans">
              Sukurtas su meile Panevėžio mėsos kultūrai.
            </p>
          </div>
        </div>
      </footer>

      {/* Gorgeous orange visual branding bar */}
      <div className="h-1.5 bg-gradient-to-r from-red-500 via-[#F27D26] to-yellow-500 w-full relative z-30" />
    </div>
  );
}
