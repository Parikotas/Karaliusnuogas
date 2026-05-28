import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST request
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array" });
  }

  // Initialize Gemini Client Lazily & Safely on Vercel
  let ai: GoogleGenAI | null = null;
  try {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build-vercel",
          },
        },
      });
    }
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI client on Vercel serverless function:", err);
  }

  const systemInstruction = `Tu esi patrakęs, šmaikštus ir be galo charizmatiškas restorano „Karalius Nuogas“ (Panevėžys, Ramygalos g. 49) padavėjas ir maisto gidas, vardu Karolis.
Mūsų šūkis: „Tikras skonis. Didelės porcijos. Geros kainos.“
Tavo tikslas – pakoreguoti lankytojo nuotaiką, sukelti drakonišką alkį ir įtikinti jį užsisakyti maistą (burgeriai nuo 6€, šonkauliai, kava, kompleksiniai pietūs ar kepti burokėliai).
Tavo charakterio bruožai:
- Esi Panevėžio patriotas, tikras lietuviško charakterio underdogas. Nuoširdus, šiek tiek ironiškas, su geru humoro jausmu, visiškai ne „sausas“ korporatyvinis robotas.
- Kalbi žemiškai, draugiškai, su lengvu linksmu sarkazmu apie gyvenimą, bet apie karštą sultingą maistą kalbi su dieviška pagarba ir meile ("toks burgeris, kad net ašarą išspausi").
- Rekomenduoji mūsų geriausius patiekalus:
  1. „Karališkas Burgeris“ su plėšyta jautiena / vištiena (sultingas, traškus, milžiniškas).
  2. „Nuogo Karaliaus Šonkauliai“ (patys nukrenta nuo kaulo, su naminiu BBQ padažu, didelė porcija už super kainą).
  3. Kompleksiniai Pietūs (kasdien vis kitokie, sotūs, pigūs – tikriems darbininkams ir ne tik, telpa iki 8-10€ pilnai pavalgyti!).
  4. Kepti burokėliai su ožkos sūriu ir graikiniais riešutais (net tie, kurie nemėgsta burokėlių, dėl šito alpsta).
  5. Šviežiai skrudinta kava, kuri nuima bet kokią pagirių ar vidurdienio mieguistumo nuotaiką.
- Visada pabrėžk, kad mūsų porcijos yra didelės ir kainos geros (pigu, sotu ir kokybiška!).
- Skatink juos skambinti tel. +37064697888 arba atvažiuoti tiesiai į Ramygalos g. 49, Panevėžyje.
- Atsakinėk glaustai (iki 2-3 trumpų pastraipų), skaniai, linksmai ir lietuviškai. Jei vartotojas paklausia kita kalba, atsakyk ta kalba, bet išlaikyk tą patį linksmą mūsų šonkaulių mylėtojo charakterį. Formatuok atsakymus gražiai.`;

  if (!ai) {
    // Elegant fallbacks in serverless without the API Key
    const lastMsg = messages[messages.length - 1]?.content || "";
    let mockReply = "Uoj, kaimyne, atrodo mano skaitmeniniai saugikliai šiek tiek perkaito! Bet žinok viena – mūsų burgeriai Panevėžyje (Ramygalos g. 49) yra tokie karšti, kad joks interneto trukdis jų neatvėsins. Duok mums skambutį tiesiai į +37064697888 ir atvažiuok – gausi šonkaulių, nuo kurių kaulai patys byra!";
    
    const lower = lastMsg.toLowerCase();
    if (lower.includes("sonkaul") || lower.includes("šonkaul") || lower.includes("ribs")) {
      mockReply = "Mano asmeninis patarimas: imk mūsų firminius šonkaulius. Jie lėtai troškinti, glazūruoti karališku BBQ, krenta nuo kaulo vos prilietus. Porcija tokia didelė, kad reikės kaimyno pagalbos įveikti! Skambink +37064697888 ir mes jau kaitiname pečių.";
    } else if (lower.includes("burg") || lower.includes("burb") || lower.includes("mesain")) {
      mockReply = "Ooo, burgerio užsinorėjai? Teisingas pasirinkimas. Sultinga jautiena, minkštutė sviestinė bandelė, gausus karališkas padažas ir čederis, kuris tysta kaip tavo seilė šiuo metu. Atvažiuok į Ramygalos g. 49 ir gausi tikrą šedevrą už teisingą kainą!";
    } else if (lower.includes("piet") || lower.includes("kompleks") || lower.includes("dienos")) {
      mockReply = "Mūsų kompleksiniai pietūs Panevėžyje jau tapo legenda. Tai ne koks nors miniatiūrinis užkandukas, o sotus, garuojantis dubuo sriubos ir rimtas antrasis už juokingai teisingą kainą. Skambink +37064697888 ir sužinok, ką šiandien gero išvirėme!";
    } else if (lower.includes("burok") || lower.includes("kept") || lower.includes("vegan") || lower.includes("vegetar")) {
      mockReply = "Nepatikėsi, bet mūsų kepti burokėliai su kreminiu ožkos sūriu ir ohoho kokiais graikiniais riešutais – tai šedevras. Net užkietėję mėsėdžiai užsisako antrą porciją! Atvažiuok paragauti į Ramygalos g. 49.";
    } else if (lower.includes("kav")) {
      mockReply = "Mūsų kava nuima bet kokį miegą ir pagirias! Stipri, aromatinga, paruošta su meile. Prie jos idealiai tinka ir desertukas. Užsuk pas mus Panevėžyje!";
    }
    return res.status(200).json({ text: mockReply });
  }

  try {
    const contents = messages.map(msg => ({
      role: msg.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 1.0,
      }
    });

    return res.status(200).json({ text: response.text || "Neturiu žodžių, koks skanus mūsų maistas!" });
  } catch (apiError: any) {
    console.error("Gemini API serverless error:", apiError);
    return res.status(500).json({ error: "Gemini API klaida", details: apiError.message });
  }
}
