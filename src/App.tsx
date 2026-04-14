import { motion } from "motion/react";
import { ArrowRight, Instagram, Linkedin, Mail, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const BRANDS = [
  {
    name: "WEDAY",
    category: "Accessories & Lifestyle",
    description: "Smoking accessories embodying a modern smoking lifestyle",
    image: "https://getweeday.com/cdn/shop/files/smiling-friends-weeday-spoon-pipe-baby-pink_1080x.jpg?v=1722249423",
    color: "bg-lagom-yellow",
    link: "https://getweday.com/"
  },
  {
    name: "NAUMOO",
    category: "Home & Lifestyle",
    description: "Minimalist home essentials",
    image: "https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/f/AmazonStores/ATVPDKIKX0DER/80f9b0e29d574bef70f74c9395978b1f.w3001.h601._CR0%2C0%2C3001%2C600_SX3000_.jpg",
    color: "bg-lagom-red",
    link: "https://www.etsy.com/shop/NAUMOO"
  },
  {
    name: "UPCOMING",
    category: "Lifestyle",
    description: "A new brand redefining the maximalist lifestyle",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    color: "bg-lagom-sky",
    link: "#"
  },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-white border-b-4 border-lagom-ink">
      <div className="text-3xl font-black tracking-tighter">LAGOM</div>
      
      <div className="hidden md:flex space-x-8 text-xs uppercase tracking-widest font-black">
        <a href="#brands" className="hover:text-lagom-red transition-colors">Portfolio</a>
        <a href="#philosophy" className="hover:text-lagom-green transition-colors">Philosophy</a>
        <a href="#careers" className="hover:text-lagom-sky transition-colors">Careers</a>
        <a href="#location" className="hover:text-lagom-red transition-colors">Location</a>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden brutal-btn p-2">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-lagom-yellow flex flex-col items-center justify-center space-y-6 text-3xl md:text-4xl font-black uppercase tracking-tighter border-4 md:border-8 border-lagom-ink z-40"
        >
          <a href="#brands" onClick={() => setIsOpen(false)}>Portfolio</a>
          <a href="#philosophy" onClick={() => setIsOpen(false)}>Philosophy</a>
          <a href="#careers" onClick={() => setIsOpen(false)}>Careers</a>
          <a href="#location" onClick={() => setIsOpen(false)}>Location</a>
          <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 brutal-btn p-4">
            <X size={32} />
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const DotArtBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    // Using a vibrant landscape image as a base for the dot art
    img.src = "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop";
    img.crossOrigin = "anonymous";

    const render = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      
      if (width === 0 || height === 0) return;
      
      canvas.width = width;
      canvas.height = height;

      if (img.complete) {
        const scale = Math.max(width / img.width, height / img.height);
        const x = (width / 2) - (img.width / 2) * scale;
        const y = (height / 2) - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        const dotSize = 8;
        const spacing = 10;

        for (let py = 0; py < height; py += spacing) {
          for (let px = 0; px < width; px += spacing) {
            const index = (py * width + px) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.beginPath();
            ctx.arc(px, py, dotSize / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    img.onload = render;
    window.addEventListener('resize', render);
    
    return () => window.removeEventListener('resize', render);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-lagom-sky/10 mix-blend-multiply" />
    </div>
  );
};

const DotArtImage = ({ src, alt }: { src: string, alt: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";

    const render = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      
      if (width === 0 || height === 0) return;
      
      canvas.width = width;
      canvas.height = height;

      if (img.complete) {
        const scale = Math.max(width / img.width, height / img.height);
        const x = (width / 2) - (img.width / 2) * scale;
        const y = (height / 2) - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        const dotSize = 6;
        const spacing = 8;

        for (let py = 0; py < height; py += spacing) {
          for (let px = 0; px < width; px += spacing) {
            const index = (py * width + px) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const a = data[index + 3];
            
            if (a > 0) {
              ctx.fillStyle = `rgb(${r},${g},${b})`;
              ctx.beginPath();
              ctx.arc(px, py, dotSize / 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
    };

    img.onload = render;
    window.addEventListener('resize', render);
    
    return () => window.removeEventListener('resize', render);
  }, [src]);

  return (
    <div ref={containerRef} className="w-full aspect-square border-4 border-lagom-ink overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 overflow-hidden">
      <DotArtBackground />

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 bg-white/95 backdrop-blur-md border-4 md:border-8 border-lagom-ink p-8 md:p-24 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] w-full max-w-[90vw] md:max-w-none"
      >
        <h1 className="text-[14vw] md:text-[12vw] leading-none mb-6 font-digital whitespace-nowrap">
          LAGOM
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm md:text-xl uppercase tracking-widest font-black bg-lagom-yellow inline-block px-4 py-2 border-4 border-lagom-ink"
        >
          A modern approach to brands
        </motion.p>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 z-10"
      >
        <div className="brutal-btn p-4 rounded-full">
          <ChevronDown size={32} />
        </div>
      </motion.div>
    </section>
  );
};

const Brands = () => {
  return (
    <section id="brands" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="bg-dots-green text-white border-4 md:border-8 border-lagom-ink p-6 md:p-12 mb-12 md:mb-24 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl mb-4 font-digital whitespace-nowrap">PORTFOLIO</h2>
        <p className="max-w-md text-sm md:text-lg uppercase tracking-widest font-bold">
  
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {BRANDS.map((brand, idx) => (
          <motion.div 
            key={brand.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="brutal-card p-6 flex flex-col"
          >
            <div className={`aspect-square border-4 border-lagom-ink overflow-hidden mb-6 relative ${brand.color}`}>
              <img 
                src={brand.image} 
                alt={brand.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity ${brand.name === "UPCOMING" ? "blur-md" : ""}`}
              />
              {brand.name === "UPCOMING" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white border-4 border-lagom-ink px-4 py-2 font-digital text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    UPCOMING
                  </span>
                </div>
              )}
            </div>
            <div className="flex-grow">
              <span className="text-xs uppercase tracking-widest font-black text-lagom-red mb-2 block">
                {brand.category}
              </span>
              <h3 className="text-4xl mb-4">{brand.name}</h3>
              <p className="text-sm font-bold opacity-80 leading-tight mb-8">
                {brand.description}
              </p>
            </div>
            <a 
              href={brand.link} 
              target={brand.link.startsWith('http') ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`brutal-btn w-full py-4 flex items-center justify-center space-x-2 ${brand.name === "UPCOMING" ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={(e) => brand.name === "UPCOMING" && e.preventDefault()}
            >
              <span>EXPLORE</span>
              <ArrowRight size={20} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-20 md:py-32 px-4 md:px-6 bg-lagom-yellow border-y-4 md:border-y-8 border-lagom-ink">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="brutal-card p-4 rotate-0 md:rotate-2">
            <DotArtImage 
              src="https://getweeday.com/cdn/shop/files/yellow-bubbler-bong-beach-summer-vibe_1080x.jpg?v=1750446486" 
              alt="Philosophy"
            />
          </div>
          
          <div className="bg-white border-4 md:border-8 border-lagom-ink p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rotate-0 md:-rotate-1">
            <span className="text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] mb-6 block font-black text-lagom-green">THE LAGOM WAY</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl mb-8 font-digital">The BALANCE</h2>
            <div className="space-y-6 text-sm md:text-lg font-bold leading-tight">
              <p>
              Our philosophy is simple: Maximize the aesthetic, never compromise the function.
              </p>
              <p>
                We bridge the gap between the wild world of art and the practical needs of the modern consumer. By balancing expressive maximalism with commercial viability, we create accessories that look like a dream and work like a charm.
              </p>
    
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Careers = () => {
  const jobs = [
    { 
      title: "Content & Partnerships Assistant", 
      location: "DTLA", 
      type: "Full-time Onsite", 
      color: "bg-lagom-sky",
      link: "https://www.linkedin.com/jobs/view/4385664632/" 
    },
    { 
      title: "Social Media Specialist", 
      location: "DTLA", 
      type: "Full-time Onsite", 
      color: "bg-lagom-yellow",
      link: "https://www.linkedin.com/jobs/view/4397668316/" 
    },
  ];

  const benefits = [
    { title: "RETIREMENT PLAN", desc: "SECURE YOUR FUTURE WITH OUR RETIREMENT SAVINGS PLAN." },
    { title: "HEALTH CARE", desc: "COMPREHENSIVE HEALTH INSURANCE INCLUDING DENTAL AND VISION." },
    { title: "EMPLOYEE DISCOUNT", desc: "GENEROUS DISCOUNTS ON ALL LAGOM LIVING BRANDS." },
    { title: "COMMISSION & INCENTIVE", desc: "REWARDING PERFORMANCE WITH COMPETITIVE COMMISSION STRUCTURES." },
  ];

  return (
    <section id="careers" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 md:mb-16 gap-8">
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-digital whitespace-nowrap">CAREERS</h2>
        <div className="brutal-card p-4 bg-lagom-yellow w-full md:max-w-xs">
          <p className="text-xs uppercase tracking-widest font-black">
            Join us in building the next generation of brands.
          </p>
        </div>
      </div>

      <div className="mb-16 md:mb-24">
        <h3 className="text-3xl md:text-5xl mb-8 font-digital">OPEN ROLES</h3>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {jobs.map((job, idx) => (
            <motion.div 
              key={job.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`brutal-card p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center group cursor-pointer gap-6 ${job.color}`}
            >
              <div>
                <h3 className="text-2xl md:text-3xl mb-2">{job.title}</h3>
                <div className="flex space-x-4 text-[10px] uppercase tracking-widest font-black opacity-80">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <a 
                  href={job.link}
                  target={job.link.startsWith('http') ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="brutal-btn w-full md:w-auto px-6 py-3 text-xs font-black uppercase tracking-widest bg-white hover:bg-lagom-ink hover:text-white transition-all inline-block text-center"
                >
                  APPLY NOW
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-3xl md:text-5xl mb-8 font-digital">BENEFITS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="brutal-card p-6 bg-white"
            >
              <h4 className="text-lg md:text-xl mb-4 font-black">{benefit.title}</h4>
              <p className="text-[10px] md:text-xs font-bold opacity-80 leading-tight uppercase">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Location = () => {
  const locations = [
    {
      name: "DTLA",
      address: "DOWNTOWN LOS ANGELES, CA",
      type: "HQ & DESIGN STUDIO",
      color: "bg-lagom-sky",
      image: "https://img.ctykit.com/cdn/ca-dtla/images/tr:w-1800/last-bookstore3.jpg"
    },
    {
      name: "HK / SHENZHEN",
      address: "GREATER BAY AREA",
      type: "OPERATIONS & SUPPLY CHAIN",
      color: "bg-lagom-green",
      image: "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section id="location" className="py-20 md:py-32 px-4 md:px-6 bg-white border-t-4 md:border-t-8 border-lagom-ink">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-8">
          <div className="w-full md:w-auto">
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl mb-8 font-digital whitespace-nowrap">LOCATIONS</h2>
            <p className="text-lg md:text-2xl font-black tracking-tight leading-none max-w-2xl">
              Strategically positioned at the intersection of creativity and global scale.
            </p>
          </div>
          <div className="bg-lagom-yellow border-4 border-lagom-ink p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-0 md:rotate-2 shrink-0">
            <p className="font-black uppercase text-[10px] md:text-xs tracking-widest">GLOBAL FOOTPRINT</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {locations.map((loc, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`brutal-card p-0 ${loc.color} flex flex-col min-h-[400px] md:min-h-[500px] overflow-hidden group`}
            >
              <div className="h-48 md:h-64 border-b-4 border-lagom-ink overflow-hidden relative">
                <img 
                  src={loc.image} 
                  alt={loc.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-white border-2 md:border-4 border-lagom-ink px-3 py-1 md:px-4 md:py-2 font-black text-[10px] tracking-widest uppercase">
                  {loc.type}
                </div>
              </div>

              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between flex-grow">
                <h3 className="text-4xl md:text-6xl lg:text-8xl mb-4">{loc.name}</h3>
                
                <div className="border-t-2 md:border-t-4 border-lagom-ink pt-6 md:pt-8 flex justify-between items-end">
                  <p className="text-sm md:text-xl font-black uppercase tracking-tighter whitespace-normal">
                    {loc.address}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-8 border-t-8 border-lagom-ink bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-4xl font-black tracking-tighter">LAGOM</div>
        
        <div className="flex space-x-8 text-[10px] uppercase tracking-widest font-black">
          <span>&copy; 2026 LAGOM HOLDING CO.</span>
          <a href="#" className="hover:text-lagom-red">Privacy</a>
          <a href="#" className="hover:text-lagom-green">Terms</a>
        </div>
        
        <div className="flex space-x-6">
          <a 
            href="https://www.linkedin.com/company/lagom-living/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="brutal-btn p-2 rounded-full bg-white hover:bg-lagom-sky transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="selection:bg-lagom-yellow selection:text-black">
      <Nav />
      <Hero />
      <Brands />
      <Philosophy />
      <Careers />
      <Location />
      <Footer />
    </main>
  );
}
