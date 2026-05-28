import { MenuItem, Review, DayLunch } from "./types";

export const RESTAURANT_INFO = {
  name: "Karalius Nuogas",
  city: "Panevėžys",
  address: "Ramygalos g. 49, Panevėžys",
  phone: "+37064697888",
  rating: 4.9,
  reviewsCount: 1420,
  priceLevel: "1–10 €",
  hours: {
    weekdays: "11:00 - 21:00",
    saturday: "12:00 - 22:00",
    sunday: "12:00 - 20:00",
  },
  slogan: "Tikras skonis. Didelės porcijos. Normalios kainos.",
  story: "Atsibodo perpus mažesni burgeriai už dvigubą kainą ir sterilūs auksiniai šaukštai? „Karalius Nuogas“ gimė Panevėžio širdyje tiems, kurie vertina tikrą, nepadailintą, sąžiningą maistą. Pas mus viskas atvira – jokio melo, jokių paslėptų mokesčių ir jokių vaikiškų porcijų. Čia karalius nuogas, nes jam nereikia puikuotis – jo skonis kalba pats už save!"
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "burger-classic",
    title: "Karališkas Jautienos Burgeris",
    description: "Mūsų flagmanas. Sultingas brandintos jautienos paplotėlis, tystantis dvigubas čederis, naminis dūminis padažas ir traškus marinuotas agurkėlis. Jokių bereikalingų salotų lapų, tiesiai į esmę.",
    category: "burgers",
    price: 7.90,
    tag: "Auksinis Bestselleris",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=1000",
    rating: 4.9,
    ingredients: ["Brandinta jautiena", "Dvigubas Čederio sūris", "Brioche bandelė", "Naminis BBQ ir garstyčių padažas", "Švieži marinuoti agurkėliai"],
    isPopular: true,
    preparationTime: "10-12 min"
  },
  {
    id: "burger-chicken",
    title: "Pasišiaušęs Vištienos Burgeris",
    description: "Traški panko džiūvėsėliuose kepta sultinga vištienos šlaunelių mėsa, šiek tiek aštrus jalapeno majonezas, šviežios traškios morkų ir kopūstų salotos. Švelnus, bet su charakteriu.",
    category: "burgers",
    price: 6.90,
    tag: "Vietinių favoritas",
    image: "https://images.unsplash.com/photo-1627662236973-4f8259fa2441?auto=format&fit=crop&q=80&w=1000",
    rating: 4.8,
    ingredients: ["Crispy panko vištiena", "Šiek tiek aštrus Chipotle padažas", "Coleslaw salotos", "Minkšta sviestinė bandelė"],
    isSpicy: true,
    preparationTime: "12-14 min"
  },
  {
    id: "ribs-classic",
    title: "Nuogo Karaliaus Šonkauliai",
    description: "Šonkauliukai, kurie priverčia pamiršti etiketą ir valgyti rankomis. Lėtai, net 6 valandas troškinti, glazūruoti mūsų slaptu lipniu tamsaus alaus BBQ padažu. Mėsa patvirtintai byra nuo kaulo.",
    category: "ribs",
    price: 9.80,
    tag: "Legenda",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=1000",
    rating: 4.9,
    ingredients: ["Kiaulienos šonkauliai (didelė porcija)", "Lipnus tamsaus alaus BBQ glaistas", "Apkeptos bulvytės su lupena", "Traškūs česnakiniai agurkėliai"],
    isPopular: true,
    preparationTime: "15-20 min"
  },
  {
    id: "beetroot-salad",
    title: "Keptų Burokėlių Šedevras",
    description: "Orkaitėje kepti salstelėję burokėliai su kreminiu ožkos sūriu, karamelizuotais graikiniais riešutais ir šviežiais špinatais. Subtilus balzamiko glajus. Pasirinkimas, kuris nustebins net didžiausią mėsėdį.",
    category: "beets",
    price: 5.50,
    tag: "Netikėtas atradimas",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=1000",
    rating: 4.9,
    ingredients: ["Kepti jauni burokėliai", "Minkštas ožkos sūris", "Graikiniai riešutai", "Špinatų lapeliai", "Naminis balzamiko užpilas"],
    isVegetarian: true,
    preparationTime: "8-10 min"
  },
  {
    id: "lunch-daily",
    title: "Sotūs Kompleksiniai Pietūs",
    description: "Kasdien keičiamas galingas derinys rimtai dirbantiems žmonėms: tiršta naminė sriuba + sotus antrasis patiekalas su bulvytėmis ir salotomis. Pigu, virta su meile ir patiekiama žaibiškai.",
    category: "lunch",
    price: 6.50,
    tag: "Skaniausia mieste",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=1000",
    rating: 4.7,
    ingredients: ["Dienos sriuba (garuojanti, naminė)", "Karštas antrasis patiekalas (keičiasi kasdien)", "Garnyras (bulvytės, šviežios salotos)"],
    isPopular: true,
    preparationTime: "Kompleksai patiekiami per 3 minutes!"
  },
  {
    id: "coffee-espresso",
    title: "Karališka Kava (Double Shot)",
    description: "Šviežiai skrudintų rūšinių pupelių kava, paruošta profesionaliu aparatu. Gelbsti po sunkios nakties arba prieš svarbius dienos darbus. Jokio vandeningo skonio.",
    category: "coffee",
    price: 2.20,
    tag: "Nuima pagirias",
    image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&q=80&w=1000",
    rating: 4.9,
    ingredients: ["Rūšinės 100% Arabika pupelės", "Stiprus dvigubas espresso trauka", "Tobula kreminė puta"],
    preparationTime: "2-3 min"
  },
  {
    id: "coffee-cappuccino",
    title: "Šilkinis Cappuccino su meile",
    description: "Subalansuotas espresso su tobulai plakta, mikrodūbeline karvės pieno puta. Švelni tekstūra, salstelėjęs poskonis be jokio pridėtinio cukraus.",
    category: "coffee",
    price: 2.80,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=1000",
    rating: 4.8,
    ingredients: ["Espresso", "Tobulai sušildytas pienas", "Microfoam aksominė puta"],
    preparationTime: "3 min"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Gytis L.",
    role: "Panevėžietis, tikras mėsos detektorius",
    text: "Užsisakiau šonkaulius ir tiesiog nukritau nuo kėdės. Mėsa pati nukrenta nuo kaulo, padažas limpa prie pirštų, o porcija tokia, kad vos namo nušliaužiau. Čia ne tourist trap, čia Panevėžio auksas. Rekomenduoju visiems draugams!",
    rating: 5,
    date: "Prieš 2 dienas",
    sentiment: "amazing"
  },
  {
    id: "rev-2",
    author: "Sandra K.",
    role: "Kompleksinių pietų fanė",
    text: "Greičiau nei bet kur kitur! Kompleksiniai pietūs čia – išgelbėjimas per pietų pertrauką. Atneša sriubą akimirksniu, antras patiekalas visada šviežias, karštas ir ohoho kokio dydžio už tokią normalią kainą.",
    rating: 5,
    date: "Prieš savaitę",
    sentiment: "loyal"
  },
  {
    id: "rev-3",
    author: "Martynas B.",
    role: "Burgerio profesionalas",
    text: "Pirmą kartą matau vietą, kur burgeris kainuoja teisingus pinigus, bet mėsos paplotėlis yra tikros galingos jautienos, o ne koks suplotas popierius. Sūrio tiek, kad reikėjo servetėlių pakelio. Padavėjas Karolis dar ir pajuokavo, pakėlė nuotaiką visai savaitei!",
    rating: 5,
    date: "Prieš 3 dienas",
    sentiment: "funny"
  },
  {
    id: "rev-4",
    author: "Rasa J.",
    role: "Burokėlių skeptikė",
    text: "Niekada nemėgau burokėlių, kol draugė neįkišo šakutės su tuo jūsų ožkos sūrio ir burokėlių šedevru. Jėzau saldusis, čia kažkas nerealaus. Trašku, saldu, sūru vienu metu. Dabar važiuoju iš kito Panevėžio galo vien dėl šito daikto.",
    rating: 5,
    date: "Vakar",
    sentiment: "amazing"
  },
  {
    id: "rev-5",
    author: "Valdas „Ūkininkas“",
    role: "Nuolatinis svečias",
    text: "Labai paprasta, bet beprotiškai jauki atmosfera. Jokių susireikšminusių snobų, kolektyvas bendrauja paprastai, su jumoru, porcijos vyriškos, o kava stipri kaip tėvo žodis. „Karalius Nuogas“ parodo, kaip turi dirbti tikras, nuoširdus Panevėžio verslas.",
    rating: 5,
    date: "Prieš 4 dienas",
    sentiment: "loyal"
  }
];

export const WEEKLY_LUNCH: DayLunch[] = [
  { day: "Pirmadienis", soup: "Trinta moliūgų sriuba su moliūgų sėklomis", main: "Sultingas paukštienos kepsnys su sūrio kepure, šviežiomis daržovėmis ir keptomis skiltelėmis", price: 6.50 },
  { day: "Antradienis", soup: "Tradiciniai sotūs lietuviški barščiai su grietine", main: "Česnakiniai lietuviški kotletai, puria bulvių koše, marinuoti agurkėliai", price: 6.50 },
  { day: "Trečiadienis", soup: "Aromatinga pievagrybių sriuba", main: "Lėtai keptas sprandinės kepsnys su česnakiniu BBQ padažu, voveraičių padažu ir fri bulvytėmis", price: 6.50 },
  { day: "Ketvirtadienis", soup: "Garsioji galingoji šiurpa su jautienos gabaliukais", main: "Plėšytos kiaulienos troškinys brioche paplotėlyje su gaiviomis morkų-kopūstų salotomis", price: 6.50 },
  { day: "Penktadienis", soup: "Grietiniška žuvienė su krapais", main: "Traški, džiūvėsėliuose kepta balta žuvis su naminiu totorišku padažu ir ryžiais su žirneliais", price: 6.50 }
];
