import useScrollAnimations from './hooks/useScrollAnimations';
import Hero from './components/Hero';
import Accordion from './components/Accordion';
import RegionOverview from './components/RegionOverview';
import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  ArrowRight,
  Layers,
  Award,
  Clock,
  ShieldCheck,
  Tv,
  Compass,
  Star,
  X,
  Menu,
  ChevronRight
} from 'lucide-react';

// Shared transparent logo used in the navbar and footer.
const BrandLogo = ({ className = "h-12" }) => (
  <img
    src="/images/jan08-logo-transparent.png"
    alt="Jan 08 Celebrations - Events. People. Extraordinary Moments"
    width="1942"
    height="809"
    className={`brand-logo w-auto object-contain shrink-0 ${className}`}
    decoding="async"
  />
);

// Video list inspired by Craftworld Events style showreels & productions
const NAV_ITEMS = [
  { id: 'showcase-video', label: 'Showcase' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services' },
  { id: 'how-we-work', label: 'Process' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'regions', label: 'Regions' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'contact', label: 'Contact' },
];

const FEATURED_SHOWREELS = [
  {
    id: "reel-1",
    title: "Grand Corporate Conclave & Summit",
    category: "Corporate Production",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    duration: "02:14",
    specs: "Curved 4K LED Screen · 32 Ch Line Array · Sync DMX"
  },
  {
    id: "reel-2",
    title: "Mega Celebrity Musical Night & Stage",
    category: "Celebrity & Live Show",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
    duration: "03:40",
    specs: "Beam Array · VIP Tiered Risers · Pyrotechnics"
  },
  {
    id: "reel-3",
    title: "Flagship Automotive Brand Launch",
    category: "Product Launch",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80",
    duration: "01:50",
    specs: "Hydraulic Revolving Turntable · Laser Mapping"
  },
  {
    id: "reel-4",
    title: "Public Cultural Mahotsav & Grand Pandal",
    category: "Outdoor Gathering",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
    duration: "04:15",
    specs: "Weatherproof 15,000 Capacity Pandal · Architectural Wash"
  }
];

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Global Tech Leadership Conclave",
    category: "Corporate",
    city: "Kochi, Kerala",
    year: "2026",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    highlights: "Custom 60ft curved LED wall, sync lighting, 2,500 delegates"
  },
  {
    id: 2,
    title: "Star Nite Celebrity Musical Extravaganza",
    category: "Celebrity and Shows",
    city: "Chennai, Tamil Nadu",
    year: "2025",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    highlights: "Line array acoustic tuning, moving head beams, dual-tier VIP stage"
  },
  {
    id: 3,
    title: "Grand Cultural Heritage Mahotsav",
    category: "Outdoor and Public Events",
    city: "Bengaluru, Karnataka",
    year: "2026",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    highlights: "Waterproof structural pandal for 15,000 attendees with facade illumination"
  },
  {
    id: 4,
    title: "Automotive Flagship SUV Launch",
    category: "Corporate",
    city: "Coimbatore, Tamil Nadu",
    year: "2025",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    highlights: "Hydraulic revolving stage, laser mapping & live broadcast feed"
  },
  {
    id: 5,
    title: "South Indian Film Awards Gala",
    category: "Celebrity and Shows",
    city: "Thiruvananthapuram, Kerala",
    year: "2026",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    highlights: "Red carpet experience, robotic cameras, pyrotechnics show control"
  },
  {
    id: 6,
    title: "Mega Expo & Public Food & Music Fest",
    category: "Outdoor and Public Events",
    city: "Kozhikode, Kerala",
    year: "2025",
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
    highlights: "Architectural pathway illumination, power backup infrastructure & mist coolers"
  }
];

const EVENT_PILLS = [
  "Corporate Conferences & Seminars",
  "Product Launches",
  "Award Nights",
  "Annual Days & Dealer Meets",
  "Celebrity & Cultural Shows",
  "Inaugurations",
  "Brand Activations",
  "Large Public & Private Celebrations"
];

const FAQ_ITEMS = [
  { question: 'How early should we book?', answer: <> For large corporate conferences, product launches or celebrity events, we recommend booking <strong>4–8 weeks ahead</strong> to ensure comprehensive stage fabrication, 3D visual design, and artist technical riders. Smaller corporate sessions and single equipment setups can often be arranged on shorter notice. </> },
  { question: 'Do you provide only equipment, or complete event management?', answer: <> <strong>Both.</strong> You can hire individual modular services such as custom stages, line-array concert audio, intelligent moving-heads, high-pitch LED screens or pandal works—or you can hand us the complete master production from concept ideation to final execution. </> },
  { question: 'Can you work within a fixed budget?', answer: <> <strong>Yes.</strong> We plan around your predefined financial framework and present scalable options at different production tiers. We take pride in transparent quotations with zero hidden surprises. </> },
  { question: 'Do you handle events outside Kerala?', answer: <> <strong>Yes, actively across Tamil Nadu and Karnataka.</strong> Our logistical footprint covers hubs like Chennai, Coimbatore, Madurai, Bengaluru, Mysuru, and Mangaluru. </> },
  { question: 'How do I get a quotation?', answer: <> Simply share your event type, expected date, venue city, and anticipated crowd size through our contact form below or reach us directly on WhatsApp. We will deliver a detailed, itemized technical proposal. </> },
];

const SERVICE_AREAS = [
  { name: "Kochi", state: "Kerala", tag: "Hub / HQ Access" },
  { name: "Thiruvananthapuram", state: "Kerala", tag: "Capital Summits" },
  { name: "Kozhikode", state: "Kerala", tag: "Cultural Shows" },
  { name: "Chennai", state: "Tamil Nadu", tag: "Celebrity Galas" },
  { name: "Coimbatore", state: "Tamil Nadu", tag: "Industrial Expos" },
  { name: "Bengaluru", state: "Karnataka", tag: "Corporate Tech Summits" },
  { name: "Mysuru", state: "Karnataka", tag: "Heritage & Destination" }
];

export default function App() {
  const pageRef = useRef(null);
  useScrollAnimations(pageRef);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuToggleRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [showreelModalOpen, setShowreelModalOpen] = useState(false);

  // Front-Page Featured Video Player State (Craftworld Events style showcase)
  const [activeShowreelIndex, setActiveShowreelIndex] = useState(0);
  const [isFrontVideoPlaying, setIsFrontVideoPlaying] = useState(true);
  const [isFrontVideoMuted, setIsFrontVideoMuted] = useState(true);
  const frontVideoRef = useRef(null);


  // Form submission state
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Corporate Conferences & Seminars',
    eventDate: '',
    venueCity: '',
    expectedCrowd: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Share one passive listener and at most one section measurement per frame.
  useEffect(() => {
    let frame = 0;
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id));
    const updateNavigation = () => {
      frame = 0;
      setNavScrolled(window.scrollY > 40);
      let current = '';
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= 140) current = section.id;
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateNavigation);
    };
    updateNavigation();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)');
    const closeOnDesktop = () => { if (desktop.matches) setMobileMenuOpen(false); };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    desktop.addEventListener('change', closeOnDesktop);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      desktop.removeEventListener('change', closeOnDesktop);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!quoteModalOpen && !showreelModalOpen && !selectedMedia) return;
    const dialog = pageRef.current?.querySelector('[role="dialog"]');
    if (!dialog) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const background = Array.from(pageRef.current.children)
      .filter(element => element !== dialog)
      .map(element => [element, element.inert]);
    background.forEach(([element]) => { element.inert = true; });
    document.body.style.overflow = 'hidden';
    const focusable = () => Array.from(dialog.querySelectorAll(
      'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled)'
    )).filter(element => element.getClientRects().length);
    focusable()[0]?.focus({ preventScroll: true });
    const handleDialogKey = event => {
      if (event.key === 'Escape') {
        setQuoteModalOpen(false);
        setShowreelModalOpen(false);
        setSelectedMedia(null);
      }
      if (event.key !== 'Tab') return;
      const controls = focusable();
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener('keydown', handleDialogKey);
    return () => {
      document.removeEventListener('keydown', handleDialogKey);
      background.forEach(([element, wasInert]) => { element.inert = wasInert; });
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [quoteModalOpen, showreelModalOpen, selectedMedia]);

  const toggleFrontPlayback = () => {
    const video = frontVideoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setIsFrontVideoPlaying(false));
    else video.pause();
  };

  const toggleFrontMute = () => {
    if (frontVideoRef.current) {
      frontVideoRef.current.muted = !isFrontVideoMuted;
      setIsFrontVideoMuted(!isFrontVideoMuted);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuoteFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 900);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    }
  };

  const activeReel = FEATURED_SHOWREELS[activeShowreelIndex];

  const filteredPortfolio = activeCategory === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div ref={pageRef} className="editorial-site w-full min-w-full m-0 p-0 overflow-x-hidden bg-[#07080B] text-neutral-100 font-sans antialiased selection:bg-amber-500 selection:text-black">
      
      <header className={`site-header ${navScrolled || mobileMenuOpen ? 'site-header--solid' : ''}`}>
        <div className="site-container navbar">
          <a href="#" className="navbar-logo" aria-label="Celebrations home"
            onClick={(event) => {
              event.preventDefault();
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
            }}>
            <BrandLogo className="h-10 sm:h-12" />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {NAV_ITEMS.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className="nav-link"
                aria-current={activeSection === id ? 'location' : undefined}
                onClick={(event) => { event.preventDefault(); scrollToSection(id); }}>
                {label}
              </a>
            ))}
          </nav>
          <div className="navbar-actions">
            <button className="navbar-quote" onClick={() => {
              setMobileMenuOpen(false);
              setQuoteModalOpen(true);
            }}>Request a Quote</button>
            <button ref={menuToggleRef} className="menu-toggle"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen(open => !open)}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu--open' : ''}`}
          inert={!mobileMenuOpen} aria-hidden={!mobileMenuOpen}>
          <div className="mobile-menu-inner">
            <nav id="mobile-navigation" className="site-container mobile-nav" aria-label="Mobile navigation">
              {NAV_ITEMS.map(({ id, label }) => (
                <a key={id} href={`#${id}`} className="nav-link"
                  aria-current={activeSection === id ? 'location' : undefined}
                  onClick={(event) => { event.preventDefault(); scrollToSection(id); }}>
                  {label}<ChevronRight size={16} aria-hidden="true" />
                </a>
              ))}
              <a href="tel:+919846000000" className="mobile-call">Call Desk</a>
            </nav>
          </div>
        </div>
      </header>

      <Hero onNavigate={scrollToSection} />

      {/* Front-Page Featured Video Showcase */}
      <section id="showcase-video" className="editorial-section showcase-section">
        <div className="site-container">
          
          {/* Header of Video Centerpiece */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                Live Showreel Production Theatre
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Experience the Scale of <span className="text-amber-300">Jan 08 Productions</span>
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                From high-precision corporate summits in Kochi to celebrity mega-galas in Chennai & Bengaluru.
              </p>
            </div>

            {/* Quick Reel selector tabs */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              {FEATURED_SHOWREELS.map((reel, idx) => (
                <button
                  key={reel.id}
                  onClick={() => setActiveShowreelIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeShowreelIndex === idx
                      ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                  }`}
                >
                  {reel.category}
                </button>
              ))}
            </div>
          </div>

          {/* Primary High-Impact Video Stage Canvas */}
          <div className="showcase-frame group">
            
            {/* Aspect Ratio Container (16:9 Cinema) */}
            <div className="showcase-screen relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
              
              <video
                ref={frontVideoRef}
                src={activeReel.videoUrl}
                onPlay={() => setIsFrontVideoPlaying(true)}
                onPause={() => setIsFrontVideoPlaying(false)}
                autoPlay
                loop
                muted={isFrontVideoMuted}
                playsInline
                poster={activeReel.poster}
                className="w-full h-full object-cover filter brightness-[0.88] contrast-110 transition-transform duration-700 group-hover:scale-[1.01]"
              >
                Your browser does not support HTML5 video.
              </video>

              {/* Ambient Edge Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Floating Large Play/Pause Central Trigger on click */}
              <button
                onClick={toggleFrontPlayback}
                aria-label="Toggle Playback"
                className="absolute inset-0 flex items-center justify-center z-10 focus:outline-none"
              >
                {!isFrontVideoPlaying && (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.8)] transform transition-transform hover:scale-110 animate-bounce">
                    <Play className="w-10 h-10 fill-current ml-1" />
                  </div>
                )}
              </button>

              {/* Top Bar inside Video Player */}
              <div className="video-topbar absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="video-title flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-700 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-amber-300 font-bold uppercase">{activeReel.title}</span>
                  <span className="text-neutral-400 hidden sm:inline">· {activeReel.duration}</span>
                </div>

                <div className="pointer-events-auto flex items-center gap-2">
                  <button
                    onClick={() => setShowreelModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-amber-400 hover:text-black border border-amber-500/40 text-neutral-200 text-xs font-semibold backdrop-blur-md transition-all shadow-lg"
                    title="Open Fullscreen Cinema Mode"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Cinema Mode</span>
                  </button>
                </div>
              </div>

              {/* Bottom Control Strip inside Video Player */}
              <div className="video-controls absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-black/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-3 sm:px-5">
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleFrontPlayback}
                    className="w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center transition-transform hover:scale-105"
                    title={isFrontVideoPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isFrontVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={toggleFrontMute}
                    className="p-2 text-neutral-300 hover:text-amber-400 transition-colors flex items-center gap-2 text-xs"
                    title={isFrontVideoMuted ? "Unmute Sound" : "Mute Sound"}
                  >
                    {isFrontVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    <span className="hidden sm:inline text-xs font-mono">{isFrontVideoMuted ? 'Muted' : 'Audio On'}</span>
                  </button>

                  {/* Audio Equalizer visual simulation */}
                  <div className="hidden lg:flex items-center gap-1 h-4">
                    <span className={`w-1 bg-amber-400 rounded-full transition-all duration-300 ${isFrontVideoPlaying ? 'h-4 animate-pulse' : 'h-1'}`} />
                    <span className={`w-1 bg-amber-400 rounded-full transition-all duration-200 ${isFrontVideoPlaying ? 'h-3 animate-pulse' : 'h-1'}`} />
                    <span className={`w-1 bg-amber-400 rounded-full transition-all duration-500 ${isFrontVideoPlaying ? 'h-5 animate-pulse' : 'h-1'}`} />
                    <span className={`w-1 bg-amber-400 rounded-full transition-all duration-150 ${isFrontVideoPlaying ? 'h-2 animate-pulse' : 'h-1'}`} />
                  </div>
                </div>

                {/* Specs pill */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] sm:text-xs text-neutral-300 font-mono hidden md:inline">
                    <span className="text-amber-400 font-bold">Rig:</span> {activeReel.specs}
                  </span>

                  <button
                    onClick={() => {
                      setQuoteFormData(prev => ({
                        ...prev,
                        eventType: activeReel.category,
                        message: `Enquiring based on featured video showcase: ${activeReel.title}`
                      }));
                      setQuoteModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:brightness-110 transition-all flex items-center gap-1"
                  >
                    <span>Book This Setup</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* Video track selection playlist cards underneath */}
            <div className="grid grid-cols-2 md:grid-cols-4 bg-[#08090D] border-t border-neutral-800 divide-x divide-neutral-800/80">
              {FEATURED_SHOWREELS.map((reel, index) => {
                const isCurrent = activeShowreelIndex === index;
                return (
                  <button
                    key={reel.id}
                    onClick={() => setActiveShowreelIndex(index)}
                    className={`p-4 text-left transition-all relative ${
                      isCurrent
                        ? 'bg-amber-500/10'
                        : 'hover:bg-neutral-900/60'
                    }`}
                  >
                    {isCurrent && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 to-amber-500" />
                    )}
                    <div className="flex items-center justify-between text-[10px] uppercase font-mono text-neutral-400 mb-1">
                      <span>Track 0{index + 1}</span>
                      <span className={isCurrent ? 'text-amber-400 font-bold' : ''}>{reel.duration}</span>
                    </div>
                    <h4 className={`text-xs sm:text-sm font-bold line-clamp-1 ${isCurrent ? 'text-amber-300' : 'text-white'}`}>
                      {reel.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                      {reel.category}
                    </p>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* Intro & Why Choose Us Section */}
      <section className="editorial-section introduction-section">
        <div className="site-container">
          
          {/* Intro Box */}
          <div className="intro-statement">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-5xl">
              <div className="flex items-center gap-3 text-amber-400 text-xs uppercase tracking-[0.25em] font-semibold mb-4">
                <span className="w-8 h-[2px] bg-amber-400 inline-block" />
                <span>Introduction</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Turning Occasions into <span className="text-amber-300">Unforgettable Experiences</span>.
              </h2>
              <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-light mb-6">
                <strong>Jan 08 Celebrations</strong> is an event management company that turns occasions into experiences. We handle corporate summits, product launches, award nights, celebrity shows and large public celebrations, with the stage, sound, light and spectacle to match. One team, one vision, and no detail left to chance.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-4 text-xs tracking-wider uppercase text-neutral-400 font-mono">
                <span className="px-3 py-1 rounded bg-black/60 border border-neutral-800">Stage Fabrications</span>
                <span className="px-3 py-1 rounded bg-black/60 border border-neutral-800">Concert Sound</span>
                <span className="px-3 py-1 rounded bg-black/60 border border-neutral-800">Intelligent Lighting</span>
                <span className="px-3 py-1 rounded bg-black/60 border border-neutral-800">Pandal Engineering</span>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="w-full">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-semibold">Excellence in Execution</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mt-2 mb-4">
                Why Choose Jan 08 Celebrations
              </h2>
              <p className="text-neutral-400 text-base">
                Corporate precision combined with high-octane production capability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              
              {/* Point 1 */}
              <div className="strength-item group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-6 group-hover:scale-110 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">End-to-End Execution</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Concept, design, production and on-ground management under one roof. No outsourcing silos, ensuring cohesive storytelling throughout.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800/80 text-xs font-mono text-amber-400/80">
                  Concept · Design · Live Control
                </div>
              </div>

              {/* Point 2 */}
              <div className="strength-item group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-6 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Corporate & Celebrity Expertise</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    We know the exact protocol, precision, artist hospitality and sheer scale that high-profile events demand from day zero.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800/80 text-xs font-mono text-amber-400/80">
                  Protocol · Security · VVIP Hospitality
                </div>
              </div>

              {/* Point 3 */}
              <div className="strength-item group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-6 group-hover:scale-110 transition-transform">
                    <Tv className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">In-House Production Strength</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Stage, professional audio, lighting, LED walls and grand pandal works with zero scramble between third-party sub-vendors.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800/80 text-xs font-mono text-amber-400/80">
                  Own Inventory · Zero Middlemen
                </div>
              </div>

              {/* Point 4 */}
              <div className="strength-item group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-6 group-hover:scale-110 transition-transform">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Regional Reach Across 3 States</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Fully equipped logistics hubs serving venues across Kerala, Tamil Nadu and Karnataka with agile regional mobilizations.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800/80 text-xs font-mono text-amber-400/80">
                  Kerala · Tamil Nadu · Karnataka
                </div>
              </div>

              {/* Point 5 */}
              <div className="strength-item group flex flex-col justify-between lg:col-span-2">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-6 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">On Time, On Budget, On Brand</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Transparent itemized quotations and disciplined timelines. We eliminate hidden surcharges and promise strict execution deadlines, guaranteeing your brand shines without budget surprises.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-800/80 text-xs font-mono text-amber-400/80">
                  Transparent Quotes · Zero Compromise
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="editorial-section about-section section-light">
        <div className="site-container">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* Story text */}
            <div data-reveal="left" className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-semibold">About Us</span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
                  Our Story
                </h2>
              </div>

              <blockquote className="text-xl sm:text-2xl text-neutral-200 font-serif italic border-l-2 border-amber-400 pl-6 leading-relaxed">
                "Every great event begins with a date, a promise and a crowd waiting to be amazed."
              </blockquote>

              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
                <strong>Jan 08 Celebrations</strong> was built on the belief that an event should be felt, not just attended. What started as a passion for creating memorable occasions has grown into a trusted production partner for corporates, brands and public figures.
              </p>

              {/* Ventured note */}
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-amber-500/20 flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
                <div className="text-xs sm:text-sm text-neutral-300">
                  <strong className="text-amber-300">Jan 08 Celebrations</strong> is a venture of <strong className="text-white">KAS Ventures LLP</strong>, from the prestigious house of <strong className="text-white">KANDAMKULATHY</strong>.
                </div>
              </div>

              {/* Mission & Vision & Values grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="rounded-xl bg-neutral-900/50 p-5 border border-neutral-800">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-2">Our Mission</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    To deliver flawless, high-impact events that strengthen brands, honour milestones and leave audiences with stories to tell.
                  </p>
                </div>

                <div className="rounded-xl bg-neutral-900/50 p-5 border border-neutral-800">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-2">Our Vision</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    To be South India's most trusted name in corporate and celebrity event production.
                  </p>
                </div>

                <div className="rounded-xl bg-neutral-900/50 p-5 border border-neutral-800">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-2">Our Values</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Precision. Creativity. Reliability. Respect for every client's vision.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual showcase card */}
            <div data-reveal="right" className="lg:col-span-5 relative">
              <div className="relative mx-auto rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_20px_50px_rgba(212,175,55,0.2)] group">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
                  alt="Jan 08 Celebrations Production"
                  className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-amber-500/40">
                    <p className="text-xs uppercase tracking-widest text-amber-400 font-bold">From Concept To Stage</p>
                    <p className="text-sm text-neutral-200 mt-1">High-caliber technical setup with in-house show engineering.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="editorial-section services-section">
        <div className="site-container">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-semibold">Our Capabilities</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
              Comprehensive Event Production
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Specialized gear, staging mastery, and technical crews ready for high-stakes environments.
            </p>
          </div>

          {/* 3 Main Service Pillars */}
          <div className="service-grid grid">
            
            {/* Service 1 */}
            <div className="service-card group">
              <div>
                <div className="service-image">
                  <img
                    src="/images/hero-stage.jpg"
                    alt="Stage, Audio, Light & LED Visuals"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-mono uppercase bg-amber-400 text-black px-2.5 py-1 rounded font-bold">
                    Pillar 01
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">
                  Stage, Audio, Light & LED Wall Visuals
                </h3>

                <ul className="space-y-3 text-sm text-neutral-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Custom stage design and fabrication</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Professional sound systems for conferences, concerts & ceremonies</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Intelligent lighting and special effects</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>High-resolution LED walls for visuals, branding and live feeds</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Experienced technical crew and show control</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800">
                <button
                  onClick={() => {
                    setQuoteFormData(p => ({ ...p, eventType: 'Stage & Visuals Setup' }));
                    setQuoteModalOpen(true);
                  }}
                  className="w-full py-2.5 text-xs uppercase tracking-wider font-bold text-amber-400 hover:text-black border border-amber-400/40 hover:bg-amber-400 rounded-xl transition-all"
                >
                  Book Stage & AV Setup
                </button>
              </div>
            </div>

            {/* Service 2 */}
            <div className="service-card group">
              <div>
                <div className="service-image">
                  <img
                    src="https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=700&q=80"
                    alt="Outdoor Lighting"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-mono uppercase bg-amber-400 text-black px-2.5 py-1 rounded font-bold">
                    Pillar 02
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">
                  Outdoor Lighting
                </h3>

                <ul className="space-y-3 text-sm text-neutral-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Architectural and facade lighting</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Pathway, entrance and venue illumination</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Decorative and themed lighting for outdoor celebrations</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Safe, weather-ready installations for large open venues</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Full power generator backup integration</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800">
                <button
                  onClick={() => {
                    setQuoteFormData(p => ({ ...p, eventType: 'Outdoor & Facade Lighting' }));
                    setQuoteModalOpen(true);
                  }}
                  className="w-full py-2.5 text-xs uppercase tracking-wider font-bold text-amber-400 hover:text-black border border-amber-400/40 hover:bg-amber-400 rounded-xl transition-all"
                >
                  Book Outdoor Lighting
                </button>
              </div>
            </div>

            {/* Service 3 */}
            <div className="service-card group">
              <div>
                <div className="service-image">
                  <img
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=700&q=80"
                    alt="Pandal Works"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-mono uppercase bg-amber-400 text-black px-2.5 py-1 rounded font-bold">
                    Pillar 03
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-300 transition-colors">
                  Pandal Works
                </h3>

                <ul className="space-y-3 text-sm text-neutral-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Grand pandals for weddings, public programmes & festivals</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Engineered for political or cultural mega gatherings</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Structural design with certified safety & ventilation planned in</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Themed decor, luxury draping and VIP entrance arches</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Quick setup and dismantling with a clean site handover</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800">
                <button
                  onClick={() => {
                    setQuoteFormData(p => ({ ...p, eventType: 'Pandal Works & Structures' }));
                    setQuoteModalOpen(true);
                  }}
                  className="w-full py-2.5 text-xs uppercase tracking-wider font-bold text-amber-400 hover:text-black border border-amber-400/40 hover:bg-amber-400 rounded-xl transition-all"
                >
                  Book Pandal Works
                </button>
              </div>
            </div>

          </div>

          {/* Event Types Pills Banner */}
          <div className="event-types-banner w-full rounded-2xl bg-neutral-900/40 border border-neutral-800 p-8 text-center">
            <h4 className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-400 mb-6">
              Event Types We Handle
            </h4>
            <div className="flex flex-wrap justify-center gap-3 w-full max-w-6xl mx-auto">
              {EVENT_PILLS.map((eventType, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-full bg-neutral-950 border border-amber-500/20 text-neutral-200 text-xs sm:text-sm hover:border-amber-400 hover:text-amber-300 transition-colors cursor-default"
                >
                  {eventType}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* How We Work Section */}
      <section id="how-we-work" className="editorial-section process-section section-light">
        <div className="site-container">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-semibold">Disciplined Methodology</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
              How We Work
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              A 5-step blueprint that guarantees flawless execution from planning to final teardown.
            </p>
          </div>

          {/* Steps Timeline Grid */}
          <div className="process-timeline grid">
            
            {/* Step 1 */}
            <div className="process-step">
              <div>
                <span className="text-3xl font-extrabold text-amber-400/30 font-mono">01</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">Discover</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We listen deeply to your strategic goals, target audience profile, selected venue nuances, and budgetary scope.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-amber-300">
                Briefing & Feasibility
              </div>
            </div>

            {/* Step 2 */}
            <div className="process-step">
              <div>
                <span className="text-3xl font-extrabold text-amber-400/30 font-mono">02</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">Design</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Creative concept development, 3D stage layout renders, and a comprehensive, itemized technical quotation.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-amber-300">
                Visual Plan & Quote
              </div>
            </div>

            {/* Step 3 */}
            <div className="process-step">
              <div>
                <span className="text-3xl font-extrabold text-amber-400/30 font-mono">03</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">Produce</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  On-site structural build, precision AV calibration, LED mapping, and stringent safety & rehearsal runs.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-amber-300">
                Rigging & Dry-Runs
              </div>
            </div>

            {/* Step 4 */}
            <div className="process-step">
              <div>
                <span className="text-3xl font-extrabold text-amber-400/30 font-mono">04</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">Perform</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Live execution commanded by our dedicated stage directors, audio engineers, and backstage logistics leads.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-amber-300">
                Live Show Control
              </div>
            </div>

            {/* Step 5 */}
            <div className="process-step">
              <div>
                <span className="text-3xl font-extrabold text-amber-400/30 font-mono">05</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">Wrap-up</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Fast teardown, eco-conscious venue clean-up, and prompt post-event analytics and feedback handover.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-amber-300">
                Clean Handover
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="editorial-section portfolio-section">
        <div className="site-container">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-semibold">Visual Proof</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2">
                Portfolio & Events
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base mt-2">
                A glimpse of the stages we've built and the evenings we've lit up.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {['All', 'Corporate', 'Celebrity and Shows', 'Outdoor and Public Events'].map((cat) => (
                <button
                  key={cat}
                  aria-pressed={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                    activeCategory === cat
                      ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="portfolio-grid">
            {filteredPortfolio.map((item) => (
              <button key={item.id} className="portfolio-card group" data-reveal="image"
                onClick={() => setSelectedMedia(item)} aria-label={`Explore ${item.title}`}>
                <div className="portfolio-image">
                  <img src={item.thumbnail} alt={item.title} loading="lazy" />
                  <span className="portfolio-open"><ArrowRight size={20} aria-hidden="true" /></span>
                  <span className="portfolio-location">{item.city} / {item.year}</span>
                  {item.type === 'video' && <span className="portfolio-video"><Play size={12} /> Film</span>}
                </div>
                <div className="portfolio-caption"><span className="eyebrow">{item.category}</span>
                  <h3>{item.title}</h3><p>{item.highlights}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Clients & Trust Strip */}
      <section className="editorial-section partners-section">
        <div className="site-container">
          <div className="partners-header">
            <div><span className="eyebrow">Track Record</span><h2>Clients and <em>Testimonials</em></h2></div>
            <p>Trusted by brands, institutions and personalities across the South.</p>
          </div>

          {/* Client Logos / Trust Badges */}
          <div className="partner-logos grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center w-full">
            {[
              "Kandamkulathy Ayurveda",
              "KAS Ventures",
              "Apex Banking Summit",
              "South Star Entertainments",
              "Carnival Tech Park",
              "Malabar Heritage Council"
            ].map((brand, i) => (
              <div
                key={i}
                className="h-20 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-center p-3 text-center text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-amber-300 hover:border-amber-400/40 transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>

          {/* Testimonial Area */}
          <div className="testimonial-grid">
            <article className="testimonial-card">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-neutral-300 italic text-sm sm:text-base">
              "The synchronization between the LED backdrop, the celebrity cue management, and the crisp sound engineering was world-class. Jan 08 Celebrations made our regional summit an unmatched triumph."
            </p>
            <p className="text-xs text-amber-400 uppercase tracking-widest mt-3 font-semibold">
              — Executive Director, South Tech Conclave [Testimonials Updating]
            </p>
            </article>
            <article className="testimonial-card">
              <span className="testimonial-index">02</span>
              <div className="testimonial-stars" aria-label="Five star testimonial">{[...Array(5)].map((_, i) => <Star key={i} aria-hidden="true" />)}</div>
              <blockquote>“Every element arrived with a clear plan and a calm team behind it. From the technical recce to the final cue, the production felt completely in control.”</blockquote>
              <footer><strong>Marketing Lead</strong><span>KAS Ventures</span></footer>
            </article>
            <article className="testimonial-card">
              <span className="testimonial-index">03</span>
              <div className="testimonial-stars" aria-label="Five star testimonial">{[...Array(5)].map((_, i) => <Star key={i} aria-hidden="true" />)}</div>
              <blockquote>“They transformed a complex outdoor brief into an experience our guests kept talking about. The lighting, stage and audience flow all felt effortless.”</blockquote>
              <footer><strong>Event Chair</strong><span>Carnival Tech Park</span></footer>
            </article>
          </div>

        </div>
      </section>

      {/* Regions Section */}
      <section id="regions" className="editorial-section regions-section">
        <div className="site-container">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-semibold">Strategic Footprint</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
              Service Areas
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg">
              Serving across Kerala, Tamil Nadu and Karnataka with agile logistical hubs and rapid on-ground deployment.
            </p>
          </div>

          <RegionOverview areas={SERVICE_AREAS} />

        </div>
      </section>

      <section id="faqs" className="editorial-section faq-section section-light">
        <div className="site-container faq-layout">
          <div className="faq-heading" data-reveal="up">
            <span className="eyebrow">Answers &amp; Assurance</span>
            <h2>Before the<br />{' '}<em>first curtain.</em></h2>
            <p>Clear information to help you plan your next production with full confidence.</p>
            <button className="text-link" onClick={() => scrollToSection('contact')}>Have another question? <ArrowRight size={16} /></button>
          </div>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="editorial-section contact-section">
        <div className="site-container">
          
          <div className="contact-panel">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 w-full">
              
              {/* Left Column: Direct Info */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-semibold">Get In Touch</span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4 leading-tight">
                    Let's Plan Something <span className="text-amber-300">Unforgettable</span>.
                  </h2>
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                    Tell us about your upcoming summit, concert, celebration or pandal requirement. Our production directors will get back with a clear quotation and structural layout.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <a
                    href="tel:+919846000000"
                    className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-neutral-800 hover:border-amber-400/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 uppercase tracking-wider font-mono">Call Us Directly</div>
                      <div className="text-sm font-bold text-white group-hover:text-amber-300">+91 98460 00000 / Support Desk</div>
                    </div>
                  </a>

                  <a
                    href="mailto:events@jan08celebrations.com"
                    className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-neutral-800 hover:border-amber-400/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 uppercase tracking-wider font-mono">Email Enquiries</div>
                      <div className="text-sm font-bold text-white group-hover:text-amber-300">events@jan08celebrations.com</div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919846000000?text=Hi%20Jan%2008%20Celebrations,%20I%20would%20like%20to%20plan%20an%20event."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-amber-400/30 hover:border-amber-300 transition-all group "
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-amber-300 uppercase tracking-wider font-mono">Instant WhatsApp Chat</div>
                      <div className="text-sm font-bold text-white group-hover:text-amber-300">+91 98460 00000 (24/7 Desk)</div>
                    </div>
                  </a>

                  <div className="p-4 rounded-xl bg-black/40 border border-neutral-800">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-neutral-300 leading-relaxed">
                        <strong className="text-white block mb-0.5">Jan 08 Celebrations</strong>
                        A venture of KAS Ventures LLP, From the house of KANDAMKULATHY.<br />
                        Regional Headquarters: Kochi, Kerala.<br />
                        Branches: Chennai (TN) & Bengaluru (KA).
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Form */}
              <div className="inquiry-form lg:col-span-7">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-amber-400/20 border border-amber-400 text-amber-300 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Enquiry Received Successfully!</h3>
                    <p className="text-neutral-300 text-sm max-w-md mx-auto">
                      Thank you for reaching out to <strong>Jan 08 Celebrations</strong>. Our production director will review your event specifications and contact you with a customized quotation.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setQuoteFormData({
                          name: '',
                          phone: '',
                          email: '',
                          eventType: 'Corporate Conferences & Seminars',
                          eventDate: '',
                          venueCity: '',
                          expectedCrowd: '',
                          message: ''
                        });
                      }}
                      className="mt-4 px-6 py-2.5 rounded-full bg-amber-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-300"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-2">Request an Event Quotation</h3>
                    <p className="text-xs text-neutral-400 mb-6">
                      Share a few event details and our team will prepare a tailored quotation for you.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={quoteFormData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Rahul Menon"
                          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={quoteFormData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={quoteFormData.email}
                          onChange={handleInputChange}
                          placeholder="rahul@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Event Type */}
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                          Event Type *
                        </label>
                        <select
                          name="eventType"
                          value={quoteFormData.eventType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                        >
                          <option>Corporate Conferences & Seminars</option>
                          <option>Product Launches</option>
                          <option>Award Nights & Galas</option>
                          <option>Celebrity & Cultural Shows</option>
                          <option>Stage, Audio & LED Wall Visuals Only</option>
                          <option>Outdoor Architectural Lighting</option>
                          <option>Grand Pandal Works</option>
                          <option>Large Public & Festival Celebrations</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Event Date */}
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                          Event Date (Approx)
                        </label>
                        <input
                          type="date"
                          name="eventDate"
                          value={quoteFormData.eventDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Venue / City */}
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                          Venue / City *
                        </label>
                        <input
                          type="text"
                          required
                          name="venueCity"
                          value={quoteFormData.venueCity}
                          onChange={handleInputChange}
                          placeholder="e.g. Le Meridien, Kochi"
                          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Expected crowd */}
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                        Expected Crowd Size
                      </label>
                      <input
                        type="text"
                        name="expectedCrowd"
                        value={quoteFormData.expectedCrowd}
                        onChange={handleInputChange}
                        placeholder="e.g. 500 delegates / 5,000 concert attendees"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-neutral-300 mb-1.5">
                        Specific Requirements / Message
                      </label>
                      <textarea
                        rows={3}
                        name="message"
                        value={quoteFormData.message}
                        onChange={handleInputChange}
                        placeholder="Provide details about staging, LED wall dimensions, sound requirements or theme..."
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="enquiry-submit w-full text-sm font-bold uppercase tracking-widest text-black group mt-2"
                    >
                      {submitting ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <span>Send Enquiry</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Footer spanning 100% full-width */}
      <footer className="site-footer text-neutral-400 text-xs">
        <div className="site-container">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800 w-full">
            
            {/* Brand column */}
            <div className="lg:col-span-5 space-y-4">
              <BrandLogo className="h-12 sm:h-14" />
              <p className="text-neutral-400 text-xs max-w-sm leading-relaxed mt-4">
                Corporate and celebrity event management across Kerala, Tamil Nadu and Karnataka, from the first idea to the final curtain call.
              </p>
              <div className="pt-2 text-[11px] text-amber-300/80 font-mono">
                A venture of KAS Ventures LLP · From the house of KANDAMKULATHY
              </div>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-white text-xs uppercase tracking-widest font-bold">Quick Navigation</h4>
              <ul className="space-y-2">
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })} className="hover:text-amber-400 transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('showcase-video')} className="hover:text-amber-400 transition-colors">Video Showcase</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-amber-400 transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-amber-400 transition-colors">Services & Staging</button></li>
                <li><button onClick={() => scrollToSection('how-we-work')} className="hover:text-amber-400 transition-colors">Production Process</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-amber-400 transition-colors">Portfolio & Media</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-amber-400 transition-colors">Contact & Enquiries</button></li>
              </ul>
            </div>

            {/* Coverage */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-white text-xs uppercase tracking-widest font-bold">Regional Reach</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Serving Kochi, Thiruvananthapuram, Kozhikode, Coimbatore, Chennai, Bengaluru, and destination venues throughout South India.
              </p>
              <div className="footer-contact">
                <a href="mailto:events@jan08celebrations.com">events@jan08celebrations.com</a>
                <a href="tel:+919846000000">+91 98460 00000</a>
              </div>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-amber-400 font-mono">
                  ISO / Safety Compliant Setup Protocols
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-neutral-400 w-full">
            <div>
              © 2026 <strong>Jan 08 Celebrations</strong> | A venture of KAS Ventures LLP | From the house of KANDAMKULATHY.
            </div>
            <div className="flex items-center gap-6">
              <span className="hover:text-amber-400 cursor-pointer">Serving Kerala, Tamil Nadu & Karnataka</span>
              <span>·</span>
              <span className="hover:text-amber-400 cursor-pointer">Privacy Policy</span>
              <span>·</span>
              <span className="hover:text-amber-400 cursor-pointer">Terms of Service</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Lightbox / Media Modal */}
      {selectedMedia && (
        <div role="dialog" aria-modal="true" aria-label="Project details" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-neutral-900 rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
            <button
              aria-label="Close project details"
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-neutral-700 text-white flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full bg-black">
              {selectedMedia.type === 'video' ? (
                <video
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                  src={selectedMedia.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}
                />
              ) : (
                <img
                  src={selectedMedia.thumbnail}
                  alt={selectedMedia.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-6 bg-[#0E1017]">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">
                {selectedMedia.category} · {selectedMedia.year}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{selectedMedia.title}</h3>
              <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedMedia.city}</span>
              </p>
              <p className="text-sm text-neutral-300 mt-3 pt-3 border-t border-neutral-800">
                {selectedMedia.highlights}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cinema Mode Showreel Modal */}
      {showreelModalOpen && (
        <div role="dialog" aria-modal="true" aria-label="Cinema mode showreel" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-5xl bg-neutral-950 rounded-2xl overflow-hidden border border-amber-400/40 shadow-2xl">
            <div className="flex items-center justify-between p-4 bg-black/80 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
                  Jan 08 Celebrations — Official Grand Showreel
                </span>
              </div>
              <button
                aria-label="Close cinema mode"
                onClick={() => setShowreelModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <video
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
                src={activeReel.videoUrl}
              />
            </div>
            <div className="p-4 bg-neutral-900 flex items-center justify-between text-xs text-neutral-400">
              <span>{activeReel.title} ({activeReel.category})</span>
              <span className="text-amber-400 font-mono">{activeReel.specs}</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Estimate / Quote Modal */}
      {quoteModalOpen && (
        <div role="dialog" aria-modal="true" aria-label="Request an event quotation" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#0E1017] rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              aria-label="Close quotation form"
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-amber-400 text-xs uppercase font-mono tracking-widest">Rapid Estimate</span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-2">Request an Event Quotation</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Our technical director will review your event scale and revert with a transparent proposal.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setQuoteModalOpen(false);
                setFormSubmitted(true);
                scrollToSection('contact');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs uppercase font-mono text-neutral-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh Kumar"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-mono text-neutral-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-mono text-neutral-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-mono text-neutral-300 mb-1">Event Type *</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none">
                    <option>Corporate Conferences & Seminars</option>
                    <option>Product Launches</option>
                    <option>Award Nights & Galas</option>
                    <option>Celebrity & Cultural Shows</option>
                    <option>Stage, Audio & LED Wall Visuals Only</option>
                    <option>Outdoor Architectural Lighting</option>
                    <option>Grand Pandal Works</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-mono text-neutral-300 mb-1">Target City / State</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kochi, Bengaluru, Chennai"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono text-neutral-300 mb-1">Brief Requirements</label>
                <textarea
                  rows={2}
                  placeholder="Expected crowd size, staging dimensions, dates..."
                  className="w-full px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-400 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:brightness-110 transition-all"
              >
                Request Quotation
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
