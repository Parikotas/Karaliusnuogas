import { useState, useRef, useEffect, FormEvent } from "react";
import { MessageSquare, Send, Sparkles, X, Phone, Utensils, Zap, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";
import { RESTAURANT_INFO } from "../data";

export default function AIWaiter() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: "Sveikas, kaimyne! Esu Karolis – tavo asmeninis skrandžio reikalų tvarkytojas restorane „Karalius Nuogas“! 👑🍗\n\nŠiandien jaučiuosi ypač draugiškai nusiteikęs, tad klausk bet ko: ką šiandien gaminam pietums? Kurie šonkauliai geriausi ir kodėl dingo mūsų nuogumas? Žodžiu, padarysiu taip, kad išvažiuosi su gražiausia šypsena ir pilniausiu pilvu Panevėžyje!",
      timestamp: new Date(),
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Trigger bubble notification to invite customer to talk
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMsg.trim() || isLoading) return;

    const userText = inputMsg;
    setInputMsg("");
    setShowNotification(false);

    const newUserMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newUserMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Tinklo ryšio sutrikimas");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-assistant`,
          role: "assistant",
          content: data.text || "Ot velnias, kažkas pastrigo, bet skonis išlieka tobulas! Užsuk pas mus!",
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-error`,
          role: "assistant",
          content: "Kaimyne, kažkas nutiko su mano elektroniniu ryšiu, matyt per didelis keptų burokėlių aromatas viską blokuoja! 🧄 Bet tiesiog paskambink mums telefonu " + RESTAURANT_INFO.phone + " arba atvaryk į Ramygalos g. 49 – pavalgydinsim be gailesčio!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMsg(question);
    // Submit in next frame so state propagates
    setTimeout(() => {
      const btn = document.getElementById("chat-submit-btn");
      if (btn) btn.click();
    }, 50);
  };

  const sampleQuestions = [
    "Patark, ką pasiimti pavalgyti sočiausiai? 🥩",
    "Kokie šiandien dienos pietūs? 🍲",
    "Ar tiesa, kad jūsų porcijos milžiniškos? 🍔",
    "Kokios kainos ir kur tiksliai esate? 📍",
  ];

  return (
    <div id="ai-waiter-root" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Dynamic Bubble notification invitation to boost conversion rates */}
      {showNotification && !isOpen && (
        <div
          id="ai-waiter-notification"
          className="bg-[#0f0f11] text-white border border-[#F27D26]/40 p-4 rounded-2xl shadow-2xl mb-3 max-w-xs animate-in slide-in-from-bottom-6 fade-in duration-300 relative"
        >
          <button
            onClick={() => setShowNotification(false)}
            className="absolute top-2 right-2 text-zinc-500 hover:text-white"
            title="Uždaryti"
          >
            <X className="h-3 w-3" />
          </button>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F27D26] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F27D26]"></span>
            </span>
            <span className="font-display font-extrabold text-[#F27D26] text-xs uppercase tracking-wider">Padavėjas Karolis</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            „Sveikas! Nori sužinoti, kuo šiandien kvepia mūsų pečius Ramygalos gatvėje? Klausk manęs!“
          </p>
          <div className="mt-2 flex gap-1">
            <button
              onClick={() => {
                setIsOpen(true);
                setShowNotification(false);
              }}
              className="text-[10px] font-bold font-display uppercase tracking-widest bg-[#F27D26] text-black px-2.5 py-1 rounded-md hover:bg-white transition-all w-full text-center"
            >
              Pradėti pokalbį
            </button>
          </div>
        </div>
      )}

      {/* Floating Messenger Trigger Button */}
      <button
        id="ai-waiter-trigger-btn"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowNotification(false);
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
          isOpen
            ? "bg-zinc-900 border border-[#F27D26] text-[#F27D26] rotate-90"
            : "bg-gradient-to-r from-[#F27D26] to-[#e05300] text-black hover:scale-110 active:scale-95 glow-orange"
        }`}
        aria-label="Kalbėtis su padavėju Karoliu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Interactive Chat Window */}
      {isOpen && (
        <div
          id="ai-waiter-chatbox"
          className="absolute bottom-16 right-0 w-[92vw] sm:w-[420px] h-[550px] bg-[#0d0d0f] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-300 z-50"
        >
          {/* Header */}
          <div className="bg-[#121215] px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F27D26] to-yellow-500 flex items-center justify-center text-black font-display font-extrabold text-sm shadow-inner relative">
                <span>K</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#121215] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <h4 className="font-display font-bold text-sm text-white">Padavėjas Karolis</h4>
                  <span className="bg-[#F27D26]/10 text-[#F27D26] text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-sm tracking-wider">Restorano Gidas</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">Atsako akimirksniu • Panevėžys</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-zinc-400 hover:text-white rounded-lg transition"
              title="Sumažinti"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Stats bar inside chat */}
          <div className="bg-[#121215]/50 px-4 py-2 border-b border-white/5 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-[#F27D26]" /> Didelės porcijos</span>
            <span className="text-zinc-600">|</span>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3 text-green-500" /> +37064697888</span>
            <span className="text-zinc-600">|</span>
            <span className="text-yellow-500 font-bold">4.9 ★★★★★</span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0b]/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#F27D26] to-[#e05300] text-black font-semibold rounded-tr-none"
                      : "bg-[#161619] border border-white/5 text-zinc-200 rounded-tl-none font-sans"
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-[9px] text-zinc-600 font-mono mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 bg-[#161619] border border-white/5 rounded-2xl rounded-tl-none px-4 py-3.5 max-w-[80vw] w-fit">
                <div className="flex space-x-1.5 items-center">
                  <div className="w-2.5 h-2.5 bg-[#F27D26] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2.5 h-2.5 bg-[#F27D26]/75 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2.5 h-2.5 bg-[#F27D26]/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
                <span className="text-xs text-zinc-400 font-mono ml-2 pl-1 italic">Karolis jau pjausto kumpį...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2.5 bg-[#121215]/40 border-t border-white/5">
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest px-2 mb-1.5 flex items-center gap-1">
              <HelpCircle className="h-3 w-3 text-zinc-500" /> Paspausk greitam atsakymui:
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar py-1">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q.replace(/[🥩🍲🍔📍]/g, "").trim())}
                  className="text-xs bg-zinc-900 text-zinc-300 border border-white/5 rounded-lg px-2.5 py-1.5 hover:border-[#F27D26] hover:text-white transition-all text-left whitespace-nowrap cursor-pointer transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#121215] border-t border-white/5 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Parašyk Karoliui... (pvz. koks dienos kepsnys?)"
              className="flex-1 bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F27D26] text-sans font-medium"
              disabled={isLoading}
            />
            <button
              id="chat-submit-btn"
              type="submit"
              className="bg-[#F27D26] hover:bg-white text-black p-3 rounded-xl transition duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center"
              disabled={isLoading || !inputMsg.trim()}
              title="Siųsti"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
