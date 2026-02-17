import React, { useState, useEffect, useRef } from 'react';
import { Upload, Star, Sparkles, Image as ImageIcon, Loader2, Download, RefreshCw, User, Camera, UserPlus, Search, ArrowLeft, ChevronRight, ChevronLeft, Check, Filter, Zap, Wand2, Maximize2, Grid, Trash2, Globe, ChevronDown, Coins, PlusCircle, X, MessageSquareQuote, BrainCircuit } from 'lucide-react';
import './index.css';
const CELEBRITIES = [
  // ACTORS (20)
  { id: 'tom_cruise', name: 'Tom Cruise', cat: 'actor', popular: true, prompt: 'leaning in close for a friendly candid photo, putting an arm around the user’s shoulder, smiling warmly at the camera' },
  { id: 'scarlett_j', name: 'Scarlett Johansson', cat: 'actor', popular: true, prompt: 'standing right next to the user, looking into the camera lens with a spontaneous and friendly smile' },
  { id: 'brad_pitt', name: 'Brad Pitt', cat: 'actor', popular: true, prompt: 'posing like a close friend, shoulder-to-shoulder with the user, casual and relaxed vibe' },
  { id: 'leonardo_d', name: 'Leonardo DiCaprio', cat: 'actor', popular: true, prompt: 'gracefully leaning into the frame, posing for a high-quality party photo with the user' },
  { id: 'margot_r', name: 'Margot Robbie', cat: 'actor', popular: true, prompt: 'taking a cheerful and spontaneous selfie-style post with the user, radiant energy' },
  { id: 'robert_dj', name: 'Robert Downey Jr.', cat: 'actor', prompt: 'giving a charismatic thumbs-up or a cool pose while standing beside the user' },
  { id: 'zendaya', name: 'Zendaya', cat: 'actor', popular: true, prompt: 'posing with high-fashion elegance right next to the user, like a professional event photo' },
  { id: 'cillian_m', name: 'Cillian Murphy', cat: 'actor', prompt: 'standing sharp and still next to the user, maintaining a respectful and cool distance' },
  { id: 'johnny_d', name: 'Johnny Depp', cat: 'actor', prompt: 'leaning in with his artistic style, making a friendly gesture towards the camera next to the user' },
  { id: 'angelina_j', name: 'Angelina Jolie', cat: 'actor', prompt: 'standing with powerful elegance, shoulder-to-shoulder with the user in a dignified pose' },
  { id: 'keanu_r', name: 'Keanu Reeves', cat: 'actor', popular: true, prompt: 'standing in his signature humble way, leaning in slightly to be in the frame with the user' },
  { id: 'ryan_r', name: 'Ryan Reynolds', cat: 'actor', prompt: 'making a funny face or a playful pose right next to the user, full of personality' },
  { id: 'emma_w', name: 'Emma Watson', cat: 'actor', prompt: 'standing with a kind and intelligent smile, leaning in naturally for a group-style photo' },
  { id: 'dwayne_j', name: 'Dwayne Johnson', cat: 'actor', prompt: 'towering over the shoulder with a massive friendly smile, hand on the user’s upper back' },
  { id: 'gal_g', name: 'Gal Gadot', cat: 'actor', prompt: 'radiating hero energy while posing closely and warmly with the user' },
  { id: 'timothee_c', name: 'Timothée Chalamet', cat: 'actor', prompt: 'posing with modern artistic flair, leaning his head slightly towards the user for a cool shot' },
  { id: 'jennifer_l', name: 'Jennifer Lawrence', cat: 'actor', prompt: 'laughing genuinely while posing with her arm linked with the user' },
  { id: 'henry_c', name: 'Henry Cavill', cat: 'actor', prompt: 'standing tall and heroic, posing with a gentlemanly and friendly demeanor beside the user' },
  { id: 'tom_h', name: 'Tom Holland', cat: 'actor', prompt: 'giving an energetic "peace" sign or a friendly wave while posing with the user' },
  { id: 'anne_h', name: 'Anne Hathaway', cat: 'actor', prompt: 'smiling with classic Hollywood charm, leaning in for a sweet memory photo with the user' },
  
  // MUSIC (15)
  { id: 'taylor_s', name: 'Taylor Swift', cat: 'music', popular: true, prompt: 'leaning in for a "best friends" style photo, very expressive and friendly' },
  { id: 'beyonce', name: 'Beyoncé', cat: 'music', popular: true, prompt: 'standing with legendary poise, posing as if at an after-party with the user' },
  { id: 'drake', name: 'Drake', cat: 'music', prompt: 'posing with a "night out" vibe, leaning in with a cool expression next to the user' },
  { id: 'rihanna', name: 'Rihanna', cat: 'music', prompt: 'radiating absolute cool, leaning into the user’s space for a stylish moment' },
  { id: 'the_weeknd', name: 'The Weeknd', cat: 'music', prompt: 'standing with a moody cinematic vibe, right beside the user in the frame' },
  { id: 'billie_e', name: 'Billie Eilish', cat: 'music', prompt: 'leaning in with her signature alternative pose, looking directly at the camera with the user' },
  { id: 'justin_b', name: 'Justin Bieber', cat: 'music', prompt: 'casual streetwear post, arm around the user, looking relaxed' },
  { id: 'adele', name: 'Adele', cat: 'music', prompt: 'laughing warmly and leaning in for a very human and friendly portrait with the user' },
  { id: 'harry_s', name: 'Harry Styles', cat: 'music', prompt: 'posing with flamboyant charisma, leaning in close with a joyful expression' },
  { id: 'dua_l', name: 'Dua Lipa', cat: 'music', prompt: 'posing like a pop star on a night out, standing very close to the user' },
  { id: 'ed_s', name: 'Ed Sheeran', cat: 'music', prompt: 'giving a casual "thumbs up" and smiling in a very down-to-earth way with the user' },
  { id: 'ariana_g', name: 'Ariana Grande', cat: 'music', prompt: 'leaning in with her iconic style, making a small gesture towards the camera with the user' },
  { id: 'kanye_w', name: 'Kanye West', cat: 'music', prompt: 'standing focused and serious, maintaining a strong presence next to the user' },
  { id: 'shakira', name: 'Shakira', cat: 'music', prompt: 'leaning in with high energy and a huge smile, making the photo look dynamic' },
  { id: 'lady_gaga', name: 'Lady Gaga', cat: 'music', prompt: 'posing with artistic theatricality, leaning her shoulder against the user' },

  // SPORTS (10)
  { id: 'ronaldo', name: 'Cristiano Ronaldo', cat: 'sports', popular: true, prompt: 'standing with high confidence, arm around user, posing for a fan photo' },
  { id: 'messi', name: 'Lionel Messi', cat: 'sports', popular: true, prompt: 'smiling humbly and leaning in slightly for a respectful photo with the user' },
  { id: 'lebron_j', name: 'LeBron James', cat: 'sports', prompt: 'towering tall but leaning down to be in the frame, arm over user’s shoulder' },
  { id: 'serena_w', name: 'Serena Williams', cat: 'sports', prompt: 'standing strong and radiant, posing like a champion with the user' },
  { id: 'lewis_h', name: 'Lewis Hamilton', cat: 'sports', prompt: 'stylish and sharp, leaning in for a high-end paddock-style photo' },
  { id: 'mbappe', name: 'Kylian Mbappé', cat: 'sports', prompt: 'smiling broadly with youthful energy, pointing at the camera with the user' },
  { id: 'neymar', name: 'Neymar Jr', cat: 'sports', prompt: 'making a fun hand gesture and leaning in for a playful photo' },
  { id: 'steph_c', name: 'Stephen Curry', cat: 'sports', prompt: 'smiling with a friendly "good vibes" energy, posing naturally with the user' },
  { id: 'roger_f', name: 'Roger Federer', cat: 'sports', prompt: 'posing with class and a gentlemanly smile beside the user' },
  { id: 'tiger_w', name: 'Tiger Woods', cat: 'sports', prompt: 'giving a professional and friendly golf-legend smile beside the user' },

  // VISION & SOCIAL (5)
  { id: 'elon_m', name: 'Elon Musk', cat: 'vision', popular: true, prompt: 'standing with a slight smirk, looking towards the camera in a professional setting with the user' },
  { id: 'mr_beast', name: 'MrBeast', cat: 'youtube', popular: true, prompt: 'smiling with huge energy, maybe a friendly hand gesture, making a high-energy photo' },
  { id: 'kim_k', name: 'Kim Kardashian', cat: 'fashion', prompt: 'perfectly posed, leaning in for a glamorous red-carpet style shot with the user' },
  { id: 'kylie_j', name: 'Kylie Jenner', cat: 'fashion', prompt: 'posing with modern aesthetic, leaning into the frame for a high-fashion look' },
  { id: 'gordon_r', name: 'Gordon Ramsay', cat: 'tv', prompt: 'standing with a sharp look, maybe a slight smile or a professional pose with the user' }
];

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
];

const TRANSLATIONS = {
  en: {
    studioName: "Studio Pro", myGallery: "MY GALLERY", home: "HOME", popularTitle: "Popular Names", allStars: "All Stars", searchPlaceholder: "Search...", categories: { all: 'All', actor: 'Actor', music: 'Music', sports: 'Sports', fashion: 'Fashion', vision: 'Vision', youtube: 'YouTube', tv: 'TV', other: 'Other' },
    enterStudio: "ENTER STUDIO", selected: "SELECTED", studioTitle: "Create", studioSubtitle: "Perfection.", aiActive: "AI STUDIO ACTIVE", currentlySelected: "Currently Selected", uploadLabel: "IMAGE UPLOAD", changeImage: "Change Image", selectFile: "Select File",
    aiPower: "AI POWER", startMagic: "START MAGIC", generating: "GENERATING", steps: ["Analysis", "Alignment", "Lighting", "Retouch"], resultWaiting: "Waiting for result", aiArtist: "AI Making Art...", savedToGallery: "SAVED TO GALLERY", andYou: "& You",
    myArchive: "YOUR ARCHIVE", myGalleryTitle: "Photo", myGallerySubtitle: "Gallery.", savedMemories: "SAVED MEMORIES", noPhotos: "No Photos Yet", startExploring: "START EXPLORING", proTip: "Pro Tip", tipText: "For best results, make sure light hits your face directly.", footerText: "Reality meets art with AI.", processing: "Processing...", noCelebFound: "No celebrity found",
    tokens: "Tokens", buyTokens: "Buy Tokens", refillTokens: "Refill Tokens", tokenCost: "1 Token per generation", lowTokens: "Not enough tokens!", addTokens: "Add", tokenPack: "Token Pack",
    generateStory: "✨ Write Story", analyzeVibe: "✨ Analyze My Vibe", storyLoading: "AI is writing your story...", vibeLoading: "AI is analyzing your energy..."
  },
  tr: {
    studioName: "Studio Pro", myGallery: "GALERİM", home: "ANA SAYFA", popularTitle: "Popüler İsimler", allStars: "Tüm Yıldızlar", searchPlaceholder: "Ara...", categories: { all: 'Hepsi', actor: 'Aktör', music: 'Müzik', sports: 'Spor', fashion: 'Moda', vision: 'Vizyon', youtube: 'YouTube', tv: 'TV', other: 'Diğer' },
    enterStudio: "STÜDYOYA GİR", selected: "SEÇİLEN", studioTitle: "Mükemmelliği", studioSubtitle: "Oluşturun.", aiActive: "AI STUDIO AKTİF", currentlySelected: "Şu An Seçili", uploadLabel: "FOTOĞRAF YÜKLEME", changeImage: "Resmi Değiştir", selectFile: "Dosya Seçin",
    aiPower: "YAPAY ZEKA GÜCÜ", startMagic: "SİHRİ BAŞLAT", generating: "OLUŞTURULUYOR", steps: ["Analiz", "Hizalama", "Işıklandırma", "Rötuş"], resultWaiting: "Sonuç Bekleniyor", aiArtist: "AI Sanat Yapıyor...", savedToGallery: "GALERİYE KAYDEDİLDİ", andYou: "& Sen",
    myArchive: "ARŞİVİNİZ", myGalleryTitle: "Fotoğraf", myGallerySubtitle: "Galerim.", savedMemories: "KAYITLI ANI", noPhotos: "Henüz Hiç Fotoğraf Yok", startExploring: "KEŞFETMEYE BAŞLA", proTip: "Profesyonel İpucu", tipText: "En iyi sonuç için ışığın yüzüne doğrudan geldiğinden emin ol.", footerText: "Gerçekliği sanatla buluşturuyoruz.", processing: "İşleniyor...", noCelebFound: "Aradığın ünlü bulunamadı",
    tokens: "Jeton", buyTokens: "Jeton Al", refillTokens: "Jeton Yükle", tokenCost: "Üretim başına 1 Jeton", lowTokens: "Yetersiz Jeton!", addTokens: "Yükle", tokenPack: "Jeton Paketi",
    generateStory: "✨ Hikaye Yaz", analyzeVibe: "✨ Enerjimi Analiz Et", storyLoading: "AI hikayenizi yazıyor...", vibeLoading: "AI enerjinizi analiz ediyor..."
  }
};

const TOKEN_PACKS = [
  { id: 'small', amount: 5, price: '₺29' },
  { id: 'medium', amount: 20, price: '₺99' },
  { id: 'large', amount: 50, price: '₺199' }
];

const App = () => {
  const [lang, setLang] = useState('en');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [view, setView] = useState('selection'); 
  const [selectedCeleb, setSelectedCeleb] = useState(null);
  const [activeCat, setActiveCat] = useState('all');
  const [userImage, setUserImage] = useState(null);
  const [userImageBase64, setUserImageBase64] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem('user_tokens');
    return saved !== null ? parseInt(saved) : 5; 
  });
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [genStep, setGenStep] = useState(0);

  // Gemini API States
  const [aiStory, setAiStory] = useState("");
  const [isWritingStory, setIsWritingStory] = useState(false);
  const [isAnalyzingVibe, setIsAnalyzingVibe] = useState(false);
  
  const fileInputRef = useRef(null);
  const popularScrollRef = useRef(null);
  const langMenuRef = useRef(null);
  const apiKey = "AIzaSyD93G_QYgwDCe7Zk0Qw71HO9VLTFMvdLK0"; 

  useEffect(() => {
    localStorage.setItem('user_tokens', tokens.toString());
  }, [tokens]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const t = (key) => {
    const keys = key.split('.');
    let result = TRANSLATIONS[lang] || TRANSLATIONS['en'];
    for (const k of keys) {
      if (!result) break;
      result = result[k];
    }
    return result || key;
  };

  const selectCelebrity = (celeb) => {
    setSelectedCeleb(celeb);
    setUserImage(null);
    setUserImageBase64(null);
    setResultImage(null);
    setAiStory("");
    setError(null);
  };

  const deleteFromGallery = (id) => {
    setGallery(prev => prev.filter(item => item.id !== id));
  };

  const handleRefill = (amount) => {
    setTokens(prev => prev + amount);
    setShowTokenModal(false);
  };

  // --- GEMINI API HELPERS ---
  const callGeminiText = async (prompt, systemPrompt, retries = 5, delay = 1000) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });
      if (!response.ok) throw new Error('API Error');
      const result = await response.json();
      return result.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (err) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return callGeminiText(prompt, systemPrompt, retries - 1, delay * 2);
      }
      throw err;
    }
  };

  const generateBackstory = async () => {
    if (!selectedCeleb) return;
    setIsWritingStory(true);
    const systemPrompt = `Sen bir hikaye anlatıcısısın. Kullanıcının seçtiği ünlü (${selectedCeleb.name}) ile nasıl tesadüfen tanıştığına dair 2 cümlelik, esprili ve çok samimi bir mini hikaye yaz. Dil: ${lang === 'tr' ? 'Türkçe' : 'İngilizce'}.`;
    const prompt = `Yapay zeka stüdyosunda ${selectedCeleb.name} ile harika bir fotoğraf çektirdim. Bu tanışmanın hikayesi ne olabilir?`;
    
    try {
      const text = await callGeminiText(prompt, systemPrompt);
      setAiStory(text);
    } catch (err) {
      console.error(err);
    } finally {
      setIsWritingStory(false);
    }
  };

  const analyzeMyVibe = async () => {
    if (!userImageBase64) return;
    setIsAnalyzingVibe(true);
    const celebListStr = CELEBRITIES.map(c => c.name).join(', ');
    const systemPrompt = `You are a style and energy expert. Analyze the user's face, clothes, and lighting from the image. Then suggest exactly ONE celebrity from this list that matches their vibe best: [${celebListStr}]. Respond with ONLY the celebrity's name.`;
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [
              { text: "Analyze my image and tell me which celebrity I should pose with from the provided list." },
              { inlineData: { mimeType: "image/png", data: userImageBase64 } }
            ]
          }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });
      const result = await response.json();
      const suggestedName = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      const celeb = CELEBRITIES.find(c => c.name.toLowerCase().includes(suggestedName?.toLowerCase()));
      if (celeb) {
        setSelectedCeleb(celeb);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingVibe(false);
    }
  };
  // --- END GEMINI API HELPERS ---

  const popularCelebs = CELEBRITIES.filter(c => c.popular);
  const filteredCelebs = CELEBRITIES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCat === 'all' || c.cat === activeCat || (activeCat === 'other' && !['actor', 'music', 'sports', 'fashion', 'vision', 'youtube', 'tv'].includes(c.cat));
    return matchesSearch && matchesCat;
  });

  const scrollPopular = (direction) => {
    if (popularScrollRef.current) {
      const container = popularScrollRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
        setUserImageBase64(reader.result.split(',')[1]);
        setResultImage(null);
        setAiStory("");
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateMorph = async () => {
    if (!userImageBase64 || !selectedCeleb) return;
    if (tokens <= 0) {
      setError(t('lowTokens'));
      setShowTokenModal(true);
      return;
    }

    setIsGenerating(true);
    setGenStep(1);
    setError(null);

    const stepInterval = setInterval(() => setGenStep(prev => (prev < 4 ? prev + 1 : prev)), 3000);

    const prompt = `AUTHENTIC PHOTOGRAPH INTEGRATION TASK. 1. CONTEXT: Meeting ${selectedCeleb.name}. 2. CELEBRITY ACTION: ${selectedCeleb.name} is ${selectedCeleb.prompt}. 3. PRESERVATION: Keep user face/body and original background exactly. 4. TECHNICAL: Match lighting and depth of field. FINAL OUTPUT: High-resolution real photo together.`;

    const payload = {
      contents: [{
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { mimeType: "image/png", data: userImageBase64 } }
        ]
      }],
      generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
    };

    const callApiWithRetry = async (retries = 5, delay = 1000) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('API Error');
        return await response.json();
      } catch (err) {
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return callApiWithRetry(retries - 1, delay * 2);
        }
        throw err;
      }
    };

    try {
      const data = await callApiWithRetry();
      const base64Data = data.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
      
      if (base64Data) {
          const finalUrl = `data:image/png;base64,${base64Data}`;
          setResultImage(finalUrl);
          setTokens(prev => Math.max(0, prev - 1));
          const newEntry = {
            id: Date.now(),
            imageUrl: finalUrl,
            celebName: selectedCeleb.name,
            timestamp: new Date().toLocaleDateString(lang === 'tr' ? 'tr-TR' : lang === 'en' ? 'en-US' : lang, { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
          };
          setGallery(prev => [newEntry, ...prev]);
      } else {
          throw new Error('Could not extract image data');
      }
    } catch (err) {
      setError(t('processing'));
    } finally {
      clearInterval(stepInterval);
      setIsGenerating(false);
      setGenStep(0);
    }
  };

  const CelebCard = ({ celeb, isPopular = false, className = "" }) => (
    <button
      onClick={() => selectCelebrity(celeb)}
      className={`group relative rounded-[2rem] border transition-all duration-500 overflow-hidden text-left flex-shrink-0
        ${selectedCeleb?.id === celeb.id ? 'border-blue-500 bg-blue-500/10 scale-[1.02] ring-4 ring-blue-500/10 shadow-2xl' : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]'} 
        ${isPopular ? 'scroll-snap-align-start' : ''} ${className}`}
    >
      <div className="aspect-[4/5] relative bg-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-110 transition-transform duration-700"><User className="w-16 h-16 text-slate-600" /></div>
        <div className="absolute top-4 left-4 z-20"><span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">{t(`categories.${celeb.cat}`)}</span></div>
        {isPopular && <div className="absolute top-4 right-4 z-20"><div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20"><Star className="w-4 h-4 text-white fill-white" /></div></div>}
      </div>
      <div className="p-5 relative z-20">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-black tracking-tight ${selectedCeleb?.id === celeb.id ? 'text-white' : 'text-slate-300'}`}>{celeb.name}</h3>
          {selectedCeleb?.id === celeb.id ? <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center animate-in zoom-in"><Check className="w-3.5 h-3.5 text-white" /></div> : <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white/10"><ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" /></div>}
        </div>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
         <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/30 rounded-full blur-[120px]" />
         <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/30 rounded-full blur-[120px]" />
      </div>

      {showTokenModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowTokenModal(false)} />
          <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowTokenModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X className="w-6 h-6" /></button>
            <div className="text-center space-y-4 mb-10">
              <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Coins className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-3xl font-black tracking-tight uppercase">{t('refillTokens')}</h2>
              <p className="text-sm text-slate-400 font-bold">{t('tokenCost')}</p>
            </div>
            <div className="space-y-4">
              {TOKEN_PACKS.map(pack => (
                <button 
                  key={pack.id} 
                  onClick={() => handleRefill(pack.amount)}
                  className="w-full flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-blue-600/10 hover:border-blue-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-black">{pack.amount}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-400">{t('tokenPack')}</div>
                  </div>
                  <div className="px-4 py-2 bg-blue-600 rounded-full text-xs font-black">{pack.price}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <header className="border-b border-white/5 bg-black/60 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/20"><Camera className="w-6 h-6 text-white" /></div>
            <div><h1 className="text-xl font-black tracking-tighter leading-none">CELEBADD</h1><span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em]">{t('studioName')}</span></div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-600/10 border border-blue-500/20 rounded-full">
              <Coins className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-black text-blue-400">{tokens}</span>
              <button onClick={() => setShowTokenModal(true)} className="ml-1 text-blue-500 hover:text-white transition-colors">
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>

            <div className="relative" ref={langMenuRef}>
              <button onClick={() => setShowLangMenu(!showLangMenu)} className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-full border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>{LANGUAGES.find(l => l.code === lang)?.name}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[60] py-2 animate-in fade-in slide-in-from-top-2">
                  {LANGUAGES.map((l) => (
                    <button key={l.code} onClick={() => { setLang(l.code); setShowLangMenu(false); }} className={`w-full px-4 py-2.5 text-left text-[11px] font-bold flex items-center gap-3 hover:bg-blue-600/20 transition-colors ${lang === l.code ? 'text-blue-400 bg-blue-600/10' : 'text-slate-400'}`}>
                      <span className="text-lg">{l.flag}</span> {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setView('gallery')} className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-[10px] font-black uppercase tracking-widest ${view === 'gallery' ? 'bg-white text-black border-white' : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'}`}>
              <Grid className="w-4 h-4" /> {t('myGallery')}
            </button>
            {view !== 'selection' && <button onClick={() => setView('selection')} className="group text-[10px] font-black text-slate-400 flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-full border border-white/5 transition-all"><ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" /> {t('home')}</button>}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        {view === 'selection' ? (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <section className="space-y-8 relative group/section">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3"><div className="w-2 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" /><h2 className="text-3xl font-black tracking-tighter uppercase italic">{t('popularTitle')}</h2></div>
                  <div className="flex gap-2">
                    <button onClick={() => scrollPopular('left')} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={() => scrollPopular('right')} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                  </div>
              </div>
              <div ref={popularScrollRef} className="flex overflow-x-auto gap-6 pb-8 custom-scrollbar scroll-smooth -mx-2 px-2 no-scrollbar scroll-snap-x-mandatory">
                {popularCelebs.map(c => <CelebCard key={c.id} celeb={c} isPopular className="w-[220px] sm:w-[260px] scroll-snap-align-start" />)}
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-3"><div className="w-2 h-8 bg-slate-700 rounded-full" /><h2 className="text-3xl font-black tracking-tighter uppercase italic text-slate-300">{t('allStars')}</h2></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.03] p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-sm shadow-2xl">
                {/* Scrollable Categories Container */}
                <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 custom-scrollbar no-scrollbar flex-nowrap w-full md:w-auto">
                  {Object.keys(TRANSLATIONS[lang]?.categories || TRANSLATIONS['en'].categories).map(catKey => (
                    <button 
                      key={catKey} 
                      onClick={() => setActiveCat(catKey)} 
                      className={`whitespace-nowrap flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCat === catKey ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10'}`}
                    >
                      {t(`categories.${catKey}`)}
                    </button>
                  ))}
                </div>
                <div className="relative w-full md:w-80"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" /><input type="text" placeholder={t('searchPlaceholder')} className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-xs focus:outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-800" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">{filteredCelebs.map((celeb) => <CelebCard key={celeb.id} celeb={celeb} />)}</div>
            </section>

            {selectedCeleb && <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 z-50 animate-in slide-in-from-bottom-12 duration-700"><button onClick={() => setView('studio')} className="w-full bg-white text-black py-6 rounded-[2.5rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all group">{t('enterStudio')} <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></button></div>}
          </div>
        ) : view === 'studio' ? (
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="space-y-4"><div className="flex items-center gap-2 text-blue-500 font-black text-xs uppercase tracking-[0.4em]"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />{t('aiActive')}</div><h2 className="text-6xl font-black tracking-tighter leading-none">{t('studioTitle')} <br /> <span className="text-slate-500">{t('studioSubtitle')}</span></h2></div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-3xl flex items-center gap-4 backdrop-blur-md">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-blue-400 font-black tracking-tighter">{selectedCeleb.name.charAt(0)}</div>
                    <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 leading-none">{t('currentlySelected')}</p><p className="text-sm font-black text-white">{selectedCeleb.name}</p></div>
                    <button onClick={() => setView('selection')} className="ml-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><RefreshCw className="w-4 h-4 text-slate-500" /></button>
                </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[3rem] backdrop-blur-xl space-y-8 shadow-2xl relative overflow-hidden">
                    <div className="space-y-4"><label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2"><Upload className="w-3 h-3" /> {t('uploadLabel')}</label>
                        <div onClick={() => !isGenerating && fileInputRef.current.click()} className={`relative group cursor-pointer border-2 border-dashed rounded-[2.5rem] overflow-hidden transition-all duration-700 ${userImage ? 'border-blue-500/30' : 'border-white/10 hover:border-blue-500/50 bg-black/20 aspect-video flex flex-col items-center justify-center'}`}>
                            {userImage ? <img src={userImage} alt="User" className="w-full object-cover max-h-[250px]" /> : <div className="text-center p-8 space-y-4"><Camera className="w-8 h-8 text-slate-600 mx-auto" /><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('selectFile')}</p></div>}
                            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </div>
                        {userImage && !resultImage && (
                          <button 
                            onClick={analyzeMyVibe} 
                            disabled={isAnalyzingVibe}
                            className="w-full mt-2 py-3 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600/30 transition-all text-indigo-400"
                          >
                            {isAnalyzingVibe ? <><Loader2 className="w-4 h-4 animate-spin" /> {t('vibeLoading')}</> : <><BrainCircuit className="w-4 h-4" /> {t('analyzeVibe')}</>}
                          </button>
                        )}
                    </div>
                    
                    {error && error === t('lowTokens') && (
                       <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-black uppercase text-center animate-in slide-in-from-top-2">
                          {error} <button onClick={() => setShowTokenModal(true)} className="underline ml-2">{t('addTokens')}</button>
                       </div>
                    )}

                    <button onClick={generateMorph} disabled={!userImage || isGenerating} className={`w-full py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all ${!userImage || isGenerating ? 'bg-white/5 text-slate-600' : 'bg-white text-black hover:scale-[1.02] shadow-xl'}`}>
                        {isGenerating ? <><Loader2 className="w-6 h-6 animate-spin" /> {t('generating')}</> : <><Zap className="w-5 h-5 fill-current" /> {t('startMagic')}</>}
                    </button>
                    <p className="text-[10px] text-center font-black text-slate-600 uppercase tracking-widest">{t('tokenCost')}</p>
                </div>
                {isGenerating && <div className="bg-blue-600/5 border border-blue-500/10 p-6 rounded-[2rem] space-y-4">{t('steps').map((s, i) => (<div key={i} className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest ${genStep >= i + 1 ? 'text-white' : 'text-slate-700'}`}><div className={`w-4 h-4 rounded-full border flex items-center justify-center ${genStep >= i + 1 ? 'bg-blue-500 border-blue-500' : 'border-slate-800'}`}>{genStep >= i+1 && <Check className="w-2.5 h-2.5" />}</div> {s}</div>))}</div>}
              </div>
              <div className="lg:col-span-3">
                 <div className="relative aspect-[4/5] w-full rounded-[4rem] bg-black border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden ring-1 ring-white/10 group/result">
                    {isGenerating ? <div className="text-center space-y-8 animate-pulse"><Sparkles className="w-16 h-16 text-blue-500 mx-auto animate-bounce" /><p className="text-xl font-black uppercase tracking-tighter">{t('aiArtist')}</p></div> : resultImage ? (
                        <div className="relative h-full w-full group animate-in zoom-in-95 duration-1000">
                            <img src={resultImage} alt="Final" className="w-full h-full object-cover" />
                            <div className="absolute top-8 right-8 flex flex-col gap-3 translate-x-12 opacity-0 group-hover/result:translate-x-0 group-hover/result:opacity-100 transition-all duration-500">
                              <button onClick={() => { const link = document.createElement('a'); link.href = resultImage; link.download = `celebadd.png`; link.click(); }} className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110"><Download className="w-7 h-7" /></button>
                              <button onClick={() => setView('gallery')} className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110"><Grid className="w-6 h-6" /></button>
                              <button onClick={generateBackstory} disabled={isWritingStory} className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110">
                                {isWritingStory ? <Loader2 className="w-6 h-6 animate-spin" /> : <MessageSquareQuote className="w-6 h-6" />}
                              </button>
                            </div>

                            <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-4">
                              {aiStory && (
                                <div className="p-6 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl animate-in fade-in slide-in-from-bottom-4 shadow-2xl">
                                  <p className="text-sm font-medium italic text-slate-100 leading-relaxed">"{aiStory}"</p>
                                </div>
                              )}
                              <div className="p-8 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] flex items-center justify-between shadow-2xl">
                                  <div className="flex items-center gap-5"><div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center"><Sparkles className="w-8 h-8 text-white" /></div><div><p className="text-lg font-black uppercase tracking-tight text-white">{selectedCeleb.name} {t('andYou')}</p><p className="text-[9px] text-white/40 font-black uppercase tracking-[0.3em]">STUDIO PRO PRODUCTION</p></div></div>
                                  <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-[8px] font-black uppercase tracking-widest">{t('savedToGallery')}</div>
                              </div>
                            </div>
                        </div>
                    ) : <div className="text-center p-20 opacity-20"><ImageIcon className="w-20 h-20 text-slate-500 mx-auto mb-4" /><p className="text-xs font-black uppercase tracking-widest">{t('resultWaiting')}</p></div>}
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4"><div className="flex items-center gap-3 text-blue-500 font-black text-xs uppercase tracking-[0.4em]"><Grid className="w-5 h-5" /> {t('myArchive')}</div><h2 className="text-6xl font-black tracking-tighter leading-none">{t('myGalleryTitle')} <br /> <span className="text-slate-500">{t('myGallerySubtitle')}</span></h2></div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{gallery.length} {t('savedMemories')}</p>
            </div>
            {gallery.length === 0 ? (
                <div className="text-center py-40 bg-white/[0.02] border border-dashed border-white/10 rounded-[4rem]"><ImageIcon className="w-20 h-20 text-slate-800 mx-auto mb-6" /><h3 className="text-2xl font-black text-slate-500 uppercase tracking-tighter">{t('noPhotos')}</h3><p className="text-xs text-slate-700 font-bold uppercase tracking-widest mt-2">{t('footerText')}</p><button onClick={() => setView('selection')} className="mt-8 px-10 py-4 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">{t('startExploring')}</button></div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{gallery.map((item) => (<div key={item.id} className="group relative aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900 shadow-2xl transition-all hover:ring-4 hover:ring-blue-500/20"><img src={item.imageUrl} alt="Result" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" /><div className="absolute top-6 right-6 flex flex-col gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"><button onClick={() => { const link = document.createElement('a'); link.href = item.imageUrl; link.download = `snap.png`; link.click(); }} className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:scale-110"><Download className="w-5 h-5" /></button><button onClick={() => deleteFromGallery(item.id)} className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center hover:scale-110"><Trash2 className="w-5 h-5" /></button></div><div className="absolute bottom-8 left-8 right-8"><p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-1">{item.timestamp}</p><h4 className="text-xl font-black text-white uppercase tracking-tighter">{item.celebName}</h4></div></div>))}</div>
            )}
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-white/5 mt-20 bg-black/40 opacity-30">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
           <div><h4 className="text-xl font-black tracking-tighter mb-4 uppercase">CELEBADD {t('studioName')}</h4><p className="text-[10px] font-bold uppercase tracking-widest leading-loose">{t('footerText')}</p></div>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 20px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .scroll-snap-x-mandatory { scroll-snap-type: x mandatory; }
        .scroll-snap-align-start { scroll-snap-align: start; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-in { animation: fade-in 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default App;