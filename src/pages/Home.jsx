import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Coffee, Heart, Users, ArrowRight, Star, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Send } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const { scrollY } = useScroll();

  // SEO Meta Tags
  useEffect(() => {
    // Set page title
    document.title = "Premium Artisan Coffee & Café in Brooklyn | Café Botanica";
    
    // Set meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Award-winning specialty coffee and café in Brooklyn, NY. Expert baristas craft premium cappuccinos, americanos & espresso drinks. Organic beans, cozy atmosphere. Visit us at 44 Brooklyn Street.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Award-winning specialty coffee and café in Brooklyn, NY. Expert baristas craft premium cappuccinos, americanos & espresso drinks. Organic beans, cozy atmosphere. Visit us at 44 Brooklyn Street.";
      document.head.appendChild(meta);
    }

    // Open Graph tags
    const ogTags = [
      { property: "og:title", content: "Premium Artisan Coffee & Café in Brooklyn | Café Botanica" },
      { property: "og:description", content: "Award-winning specialty coffee with organic beans. Expert baristas, cozy atmosphere. Visit our Brooklyn café today." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: window.location.href },
      { property: "og:image", content: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=630&fit=crop" },
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Premium Artisan Coffee & Café in Brooklyn | Café Botanica" },
      { name: "twitter:description", content: "Award-winning specialty coffee with organic beans. Expert baristas, cozy atmosphere." },
    ];

    twitterTags.forEach(tag => {
      let element = document.querySelector(`meta[name="${tag.name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', tag.name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    return () => {
      // Cleanup not needed for meta tags
    };
  }, []);
  
  // Professional parallax effects
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.3]);
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section with offset
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const headerHeight = 80;

    const smoothScrollTo = (targetId, event) => {
      event?.preventDefault();
      
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      if (prefersReducedMotion) {
        window.scrollTo(0, targetPosition);
      } else {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }

      history.pushState(null, null, `#${targetId}`);

      setTimeout(() => {
        const heading = targetElement.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus();
          heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
        }
      }, prefersReducedMotion ? 0 : 800);
    };

    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"], [data-scroll]');
      if (target) {
        const href = target.getAttribute('href') || target.getAttribute('data-scroll');
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          smoothScrollTo(targetId, e);
        }
      }
    };

    document.addEventListener('click', handleClick);

    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          smoothScrollTo(targetId);
        }
      }, 100);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ['home', 'about', 'menu', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const products = [
    {
      name: "Cappuccino",
      description: "Rich espresso with velvety steamed milk and foam",
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=600&fit=crop",
      price: "$4.50"
    },
    {
      name: "Americano",
      description: "Bold espresso diluted with hot water for a smooth taste",
      image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&h=600&fit=crop",
      price: "$3.50"
    },
    {
      name: "Espresso",
      description: "Pure concentrated coffee shot with intense flavor",
      image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=600&h=600&fit=crop",
      price: "$3.00"
    }
  ];

  const stats = [
    { icon: Coffee, value: "50+", label: "Coffee Blends" },
    { icon: Users, value: "200+", label: "Daily Customers" },
    { icon: Heart, value: "15", label: "Years Experience" }
  ];

  const faqs = [
    {
      question: "What are your opening hours?",
      answer: "We're open Monday to Friday from 7:00 AM to 8:00 PM, and weekends from 8:00 AM to 9:00 PM. Come visit us anytime during these hours for freshly brewed coffee."
    },
    {
      question: "Do you offer vegan and dairy-free options?",
      answer: "Yes! We offer a variety of plant-based milk alternatives including oat milk, almond milk, soy milk, and coconut milk at no extra charge. Our menu includes several vegan pastries and snacks."
    },
    {
      question: "Can I book the café for private events?",
      answer: "Absolutely! Our café is available for private bookings, corporate meetings, and special occasions. Contact us at info@cafebotanica.com or call +1 (234) 567-890 to discuss your event needs."
    },
    {
      question: "Do you sell coffee beans to take home?",
      answer: "Yes, we sell our premium coffee beans in-store. Choose from over 50 different blends, including our signature Botanica's Blend. All beans are freshly roasted and available in various package sizes."
    }
  ];

  // Professional animation variants with custom easing
  const professionalEase = [0.43, 0.13, 0.23, 0.96];
  const smoothEase = [0.6, -0.05, 0.01, 0.99];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: professionalEase
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        ease: professionalEase
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        ease: professionalEase
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: smoothEase
      }
    }
  };

  const slideUp = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: professionalEase
      }
    }
  };

  const revealMask = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      transition: {
        duration: 1.2,
        ease: professionalEase
      }
    }
  };

  const navItems = ['Home', 'About', 'Menu', 'Contact'];

  // Structured Data JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CafeOrCoffeeShop",
        "@id": "https://cafebotanica.com/#restaurant",
        "name": "Café Botanica",
        "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=630&fit=crop",
        "description": "Award-winning specialty coffee and café in Brooklyn, NY. Expert baristas craft premium cappuccinos, americanos & espresso drinks using organic beans.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "44 Brooklyn Street",
          "addressLocality": "New York",
          "addressRegion": "NY",
          "postalCode": "10004",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.7128",
          "longitude": "-74.0060"
        },
        "url": window.location.href,
        "telephone": "+12345678900",
        "email": "info@cafebotanica.com",
        "priceRange": "$$",
        "servesCuisine": "Coffee, Beverages, Light Snacks",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "07:00",
            "closes": "20:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday", "Sunday"],
            "opens": "08:00",
            "closes": "21:00"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/cafebotanica",
          "https://www.facebook.com/cafebotanica",
          "https://www.twitter.com/cafebotanica"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "247"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        "@type": "Menu",
        "hasMenuItem": products.map(product => ({
          "@type": "MenuItem",
          "name": product.name,
          "description": product.description,
          "offers": {
            "@type": "Offer",
            "price": product.price.replace('$', ''),
            "priceCurrency": "USD"
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: professionalEase }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled 
            ? 'bg-[#1a0f0a]/95 backdrop-blur-lg shadow-2xl py-3' 
            : 'bg-[#1a0f0a]/90 backdrop-blur-md border-b border-[#3a2a20]/50 py-4'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_691080fb72e1ce389b714ca8/1d4f2e03f_36cf4a4e-9116-41e0-b73a-da89e83283f5.png" 
                alt="Café Botanica - Premium Artisan Coffee in Brooklyn" 
                className={`w-auto transition-all duration-700 ease-out ${scrolled ? 'h-16' : 'h-20'}`}
              />
            </motion.div>
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <motion.a 
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i + 0.3, duration: 0.6, ease: professionalEase }}
                    whileHover={{ y: -3, color: "#e5c494" }}
                    className={`transition-all duration-300 font-medium relative group ${
                      isActive ? 'text-[#e5c494]' : 'text-[#d4af79] hover:text-[#e5c494]'
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item}
                    <motion.span 
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#e5c494] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </motion.a>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(212, 175, 121, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-[#d4af79] hover:bg-[#c49d66] text-[#1a0f0a] font-semibold transition-all duration-300 shadow-lg" aria-label="Order coffee now">
                Order Now
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen bg-[#1a0f0a] overflow-hidden pt-20">
        {/* Parallax Background */}
        <motion.div 
          style={{ 
            opacity: heroOpacity, 
            scale: heroScale,
            y: heroY
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f0a]/60 to-[#1a0f0a] z-10" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1920&h=1080&fit=crop"
            alt="Fresh coffee splash with aromatic steam - premium specialty coffee at Café Botanica Brooklyn"
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 z-[5]" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#d4af79] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-48">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
              >
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: professionalEase }}
                >
                  Discover The
                </motion.span>
                <br />
                <motion.span 
                  className="text-[#d4af79] inline-block"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: professionalEase }}
                >
                  Art Of Perfect
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: professionalEase }}
                >
                  Coffee
                </motion.span>
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-[#e5c494] mb-8 leading-relaxed max-w-2xl"
              >
                Experience coffee crafted with passion and precision. Every cup tells a story of quality beans, expert roasting, and dedication to the perfect brew.
              </motion.p>
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 60px rgba(212, 175, 121, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    data-scroll="#menu"
                    className="bg-[#d4af79] hover:bg-[#c49d66] text-[#1a0f0a] font-semibold px-8 py-6 text-lg shadow-2xl"
                    aria-label="Explore our coffee menu"
                  >
                    Explore Menu
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    variant="outline" 
                    data-scroll="#contact"
                    className="border-2 border-[#d4af79] text-[#d4af79] hover:bg-[#d4af79] hover:text-[#1a0f0a] px-8 py-6 text-lg backdrop-blur-sm"
                    aria-label="Find our café location"
                  >
                    Find Our Cafe
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats with enhanced animations */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-3 gap-8 mt-24 max-w-2xl"
            role="list"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                variants={scaleIn}
                whileHover={{ y: -15, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-center relative group"
                role="listitem"
              >
                <motion.div
                  className="absolute inset-0 bg-[#d4af79]/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />
                <motion.div
                  whileHover={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <stat.icon className="w-8 h-8 text-[#d4af79] mx-auto mb-3" aria-hidden="true" />
                </motion.div>
                <motion.div 
                  className="text-4xl font-bold text-white mb-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.8 + index * 0.15, 
                    type: "spring", 
                    stiffness: 200,
                    damping: 15
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-[#e5c494] text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <a href="#about" aria-label="Scroll to about section" className="block">
            <div className="w-6 h-10 border-2 border-[#d4af79] rounded-full flex items-start justify-center p-2">
              <motion.div 
                animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="w-1 h-3 bg-[#d4af79] rounded-full"
              />
            </div>
          </a>
        </motion.div>
      </section>

      {/* Coffee Heaven Section */}
      <article id="about" className="py-24 bg-[#f5e6d3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
            >
              <div className="relative">
                <motion.div 
                  className="absolute -top-6 -left-6 w-full h-full border-2 border-[#d4af79] rounded-lg"
                  initial={{ opacity: 0, x: -30, y: -30, rotate: -5 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8, ease: professionalEase }}
                  aria-hidden="true"
                />
                
                <motion.div
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: professionalEase }}
                  className="relative z-10 overflow-hidden rounded-lg shadow-2xl"
                >
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1000&fit=crop"
                    alt="Professional barista expertly crafting latte art with espresso machine at Café Botanica"
                    className="w-full h-[600px] object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
                  className="absolute -bottom-4 -right-4 z-20 bg-[#1a0f0a] text-[#d4af79] px-6 py-4 rounded-full shadow-xl"
                  aria-label="15 years of experience"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-xs">Years</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.h2 
                variants={fadeInRight}
                className="text-5xl md:text-6xl font-bold text-[#1a0f0a] mb-6"
              >
                Coffee Heaven
              </motion.h2>
              <motion.div
                variants={fadeInRight}
                className="w-20 h-1 bg-[#d4af79] mb-8"
                aria-hidden="true"
              />
              <motion.p 
                variants={fadeInRight}
                className="text-lg text-[#3a2a20] mb-6 leading-relaxed"
              >
                Step into our world where every cup is crafted with love. We source the finest beans from sustainable farms and roast them to perfection. Our baristas are artists, creating not just beverages but experiences that warm your soul.
              </motion.p>
              <motion.p 
                variants={fadeInRight}
                className="text-lg text-[#3a2a20] mb-8 leading-relaxed"
              >
                From the first sip to the last, we promise a journey through rich flavors and aromatic bliss that will make Café Botanica your favorite escape.
              </motion.p>
              <motion.div
                variants={fadeInRight}
              >
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button className="bg-[#1a0f0a] hover:bg-[#2a1a10] text-[#d4af79] font-semibold px-8 py-6 group shadow-lg" aria-label="Learn more about our story">
                    Learn Our Story
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </motion.span>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </article>

      {/* Botanica's Blend Section */}
      <article className="py-24 bg-[#FAFAF9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="order-2 md:order-1"
            >
              <motion.h2 
                variants={fadeInLeft}
                className="text-5xl md:text-6xl font-bold text-[#1a0f0a] mb-6"
              >
                Botanica's Blend
              </motion.h2>
              <motion.div
                variants={fadeInLeft}
                className="w-20 h-1 bg-[#d4af79] mb-8"
                aria-hidden="true"
              />
              <motion.p 
                variants={fadeInLeft}
                className="text-lg text-[#3a2a20] mb-6 leading-relaxed"
              >
                Our signature blend combines the finest Arabica beans from Ethiopia and Colombia. Carefully roasted to bring out notes of dark chocolate, caramel, and a hint of citrus.
              </motion.p>
              <motion.p 
                variants={fadeInLeft}
                className="text-lg text-[#3a2a20] mb-8 leading-relaxed"
              >
                This exclusive blend represents years of perfecting the art of coffee roasting. It's bold yet smooth, complex yet balanced - the perfect cup for any time of day.
              </motion.p>
              <motion.div
                variants={fadeInLeft}
              >
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button className="bg-[#1a0f0a] hover:bg-[#2a1a10] text-[#d4af79] font-semibold px-8 py-6 shadow-lg" aria-label="Try Botanica's Blend now">
                    Try It Now
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              className="order-1 md:order-2"
            >
              <div className="relative">
                <motion.div 
                  className="absolute -top-6 -right-6 w-full h-full border-2 border-[#d4af79] rounded-lg"
                  initial={{ opacity: 0, x: 30, y: -30, rotate: 5 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8, ease: professionalEase }}
                  aria-hidden="true"
                />
                <motion.div
                  initial={{ clipPath: 'inset(0 0 0 100%)' }}
                  whileInView={{ clipPath: 'inset(0 0 0 0%)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: professionalEase }}
                  className="relative z-10 overflow-hidden rounded-lg shadow-2xl"
                >
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=1000&fit=crop"
                    alt="Beautiful latte art in a ceramic cup showcasing Botanica's signature blend"
                    className="w-full h-[600px] object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </article>

      {/* Best Selling Items */}
      <section id="menu" className="py-24 bg-[#e5d4c1] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold text-[#1a0f0a] mb-4"
            >
              Best Selling Items
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="w-20 h-1 bg-[#d4af79] mx-auto mb-6"
              aria-hidden="true"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-[#3a2a20] max-w-3xl mx-auto"
            >
              Our most loved coffee creations, handcrafted by expert baristas using premium beans and traditional techniques
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            role="list"
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                role="listitem"
              >
                <Card className="overflow-hidden bg-[#FAFAF9] border-2 border-[#d4af79] hover:shadow-2xl transition-all duration-500 group">
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={product.image}
                      alt={`${product.name} - ${product.description}`}
                      className="w-full h-80 object-cover"
                      whileHover={{ scale: 1.2, rotate: 2 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/80 via-[#1a0f0a]/40 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      aria-hidden="true"
                    />
                    
                    <motion.div
                      className="absolute top-4 right-4 bg-[#d4af79] text-[#1a0f0a] px-4 py-2 rounded-full font-bold shadow-lg"
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                      aria-label={`Price: ${product.price}`}
                    >
                      {product.price}
                    </motion.div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-[#1a0f0a] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#3a2a20] mb-4">{product.description}</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="w-full bg-[#1a0f0a] hover:bg-[#2a1a10] text-[#d4af79] font-semibold shadow-lg" aria-label={`Order ${product.name}`}>
                        Order Now
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            role="navigation"
            aria-label="Menu carousel navigation"
          >
            <motion.div 
              whileHover={{ scale: 1.15, x: -5, backgroundColor: "#1a0f0a" }} 
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button variant="outline" size="icon" className="border-2 border-[#1a0f0a] text-[#1a0f0a] hover:text-[#d4af79]" aria-label="Previous menu items">
                <ArrowRight className="rotate-180 w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.15, x: 5, backgroundColor: "#1a0f0a" }} 
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button variant="outline" size="icon" className="border-2 border-[#1a0f0a] text-[#1a0f0a] hover:text-[#d4af79]" aria-label="Next menu items">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#FAFAF9] overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold text-[#1a0f0a] mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="w-20 h-1 bg-[#d4af79] mx-auto mb-6"
              aria-hidden="true"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-[#3a2a20]"
            >
              Everything you need to know about visiting Café Botanica
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#d4af79]/20 hover:border-[#d4af79] transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-[#1a0f0a] mb-4">
                  {faq.question}
                </h3>
                <p className="text-lg text-[#3a2a20] leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#1a0f0a] overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#d4af79] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4af79] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: professionalEase }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-1 bg-[#d4af79] mx-auto"
              aria-hidden="true"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: professionalEase }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="bg-white border-none shadow-2xl relative overflow-hidden">
                <motion.div
                  className="absolute top-8 left-8 text-[#d4af79] opacity-20 text-8xl font-serif"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  aria-hidden="true"
                >
                  "
                </motion.div>

                <CardContent className="p-12 text-center relative z-10">
                  <motion.div 
                    className="flex justify-center mb-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    role="img"
                    aria-label="5 star rating"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        variants={scaleIn}
                        whileHover={{ scale: 1.4, rotate: 360, y: -5 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Star className="w-6 h-6 fill-[#d4af79] text-[#d4af79]" aria-hidden="true" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-xl text-[#1a0f0a] mb-8 leading-relaxed italic"
                  >
                    "I love Café Botanica! The coffee is always fresh, flavorful, and expertly brewed. The atmosphere is cozy and inviting, making it the perfect spot to relax or catch up with friends. The staff is friendly and knowledgeable. I highly recommend Café Botanica for any Coffee lover, Cheers."
                  </motion.p>
                  <motion.div 
                    className="flex items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <motion.img 
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                      alt="Michael Chen - satisfied customer"
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#d4af79] shadow-lg"
                    />
                    <div className="text-left">
                      <div className="font-bold text-[#1a0f0a]">Michael Chen</div>
                      <div className="text-sm text-[#3a2a20]">Coffee Enthusiast</div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex justify-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            role="navigation"
            aria-label="Testimonial carousel navigation"
          >
            <motion.div 
              whileHover={{ scale: 1.2, x: -5 }} 
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button variant="outline" size="icon" className="border-2 border-[#d4af79] text-[#d4af79] hover:bg-[#d4af79] hover:text-[#1a0f0a]" aria-label="Previous testimonial">
                <ArrowRight className="rotate-180 w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.2, x: 5 }} 
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button variant="outline" size="icon" className="border-2 border-[#d4af79] text-[#d4af79] hover:bg-[#d4af79] hover:text-[#1a0f0a]" aria-label="Next testimonial">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-[#f5e6d3] overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold text-[#1a0f0a] mb-4"
            >
              Stay Up To Date On<br />All News And Offers
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="w-20 h-1 bg-[#d4af79] mx-auto mb-6"
              aria-hidden="true"
            />
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-[#3a2a20] mb-8"
            >
              Be the first to know about new blends, seasonal specials, and exclusive events at Café Botanica
            </motion.p>
            <motion.form 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <motion.div
                className="flex-1"
                whileFocus={{ scale: 1.02 }}
              >
                <Input 
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 px-6 border-2 border-[#1a0f0a] bg-white text-lg focus:border-[#d4af79] transition-all"
                  required
                  aria-label="Email address for newsletter"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(26, 15, 10, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button type="submit" className="h-14 px-8 bg-[#1a0f0a] hover:bg-[#2a1a10] text-[#d4af79] font-semibold text-lg shadow-xl" aria-label="Subscribe to newsletter">
                  Subscribe
                  <Send className="ml-2 w-5 h-5" aria-hidden="true" />
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1a0f0a] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af79] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="grid md:grid-cols-4 gap-12 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_691080fb72e1ce389b714ca8/1d4f2e03f_36cf4a4e-9116-41e0-b73a-da89e83283f5.png" 
                alt="Café Botanica logo" 
                className="h-24 w-auto mb-6"
              />
              <p className="text-[#e5c494] leading-relaxed">
                Every Sizzle, Just Blend.<br />
                Discover Organic With Different.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-bold text-[#d4af79] mb-4">Contact Us</h3>
              <address className="space-y-3 not-italic">
                <motion.a 
                  href="mailto:info@cafebotanica.com" 
                  className="flex items-center gap-3 text-[#e5c494] hover:text-[#d4af79] transition-colors group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  info@cafebotanica.com
                </motion.a>
                <motion.a 
                  href="tel:+1234567890" 
                  className="flex items-center gap-3 text-[#e5c494] hover:text-[#d4af79] transition-colors group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                  +1 (234) 567-890
                </motion.a>
              </address>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-bold text-[#d4af79] mb-4">Location</h3>
              <address className="flex items-start gap-3 text-[#e5c494] not-italic">
                <MapPin className="w-5 h-5 mt-1" aria-hidden="true" />
                <div>
                  44 Brooklyn Street<br />
                  New York, NY 10004<br />
                  United States
                </div>
              </address>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-bold text-[#d4af79] mb-4">Follow Us</h3>
              <div className="flex gap-4" role="list">
                {[
                  { Icon: Instagram, label: "Instagram", url: "https://www.instagram.com/cafebotanica" },
                  { Icon: Facebook, label: "Facebook", url: "https://www.facebook.com/cafebotanica" },
                  { Icon: Twitter, label: "Twitter", url: "https://www.twitter.com/cafebotanica" }
                ].map(({ Icon, label, url }, i) => (
                  <motion.a 
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#d4af79] flex items-center justify-center text-[#1a0f0a] hover:bg-[#e5c494] transition-colors"
                    whileHover={{ scale: 1.3, rotate: 360, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    aria-label={`Follow us on ${label}`}
                    role="listitem"
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="border-t border-[#3a2a20] pt-8 text-center text-[#e5c494]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p>&copy; 2024 Café Botanica. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>

      {/* Floating Disclaimer */}
      {showDisclaimer && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ 
            duration: 0.8, 
            delay: 2,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
          role="complementary"
          aria-label="Sample website disclaimer"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-gradient-to-br from-[#1a0f0a] to-[#2a1a10] text-white rounded-2xl shadow-2xl border-2 border-[#d4af79] overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af79] opacity-10 rounded-bl-full" aria-hidden="true" />
            
            <div className="relative p-6">
              <motion.button
                onClick={() => setShowDisclaimer(false)}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-3 right-3 text-[#d4af79] hover:text-[#e5c494] transition-colors"
                aria-label="Close disclaimer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.3, type: "spring", stiffness: 200 }}
                  className="inline-block bg-[#d4af79] text-[#1a0f0a] px-3 py-1 rounded-full text-xs font-bold mb-3"
                >
                  SAMPLE WEBSITE
                </motion.div>
                <p className="text-sm text-[#e5c494] leading-relaxed mb-3">
                  This stunning website was crafted by{" "}
                  <motion.a
                    href="https://reiyustudio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="text-[#d4af79] font-bold hover:text-[#e5c494] transition-colors underline decoration-[#d4af79] underline-offset-2"
                  >
                    reiyustudio.com
                  </motion.a>
                </p>
                <p className="text-sm text-white font-semibold mb-4">
                  Want your very own professional website?
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between bg-[#d4af79]/10 rounded-lg p-3 border border-[#d4af79]/30"
                >
                  <span className="text-sm text-[#e5c494]">One-time Payment</span>
                  <span className="text-xl font-bold text-[#d4af79]">$499</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between bg-[#d4af79]/10 rounded-lg p-3 border border-[#d4af79]/30"
                >
                  <span className="text-sm text-[#e5c494]">Monthly Plan</span>
                  <span className="text-xl font-bold text-[#d4af79]">$39<span className="text-sm">/mo</span></span>
                </motion.div>
              </div>

              <motion.a
                href="https://reiyustudio.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(212, 175, 121, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="block w-full bg-[#d4af79] hover:bg-[#c49d66] text-[#1a0f0a] text-center font-bold py-3 rounded-lg transition-colors shadow-lg"
                aria-label="Get free website preview from Reiyu Studio"
              >
                Get Free Preview
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  aria-hidden="true"
                >
                  →
                </motion.span>
              </motion.a>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
              className="h-1 bg-gradient-to-r from-[#d4af79] via-[#e5c494] to-[#d4af79]"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}