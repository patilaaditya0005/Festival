/*polishing the frontend 
*/
"use client";
import Link from "next/link";
/* updating the existing feature with new code */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  Heart,
  Menu,
  Music2,
  Search,
  Sparkles,
  X,
} from "lucide-react";

type Festival = {
  id: number;
  name: string;
  subtitle: string;
  date: string;
  month: string;
  category: string;
  location: string;
  duration: string;
  description: string;
  image: string;
  color: string;
  tag: string;
};

const festivals: Festival[] = [
  {
    id: 1,
    name: "Diwali",
    subtitle: "The Festival of Lights",
    date: "November 8",
    month: "November",
    category: "Tradition",
    location: "Across India",
    duration: "5 days",
    description:
      "A celebration of light over darkness, good over evil, and hope over despair. Homes glow with diyas, streets sparkle, and families come together.",
    image:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1200&q=85",
    color: "#e7a84b",
    tag: "MOST CELEBRATED",
  },
  {
    id: 2,
    name: "Holi",
    subtitle: "The Festival of Colors",
    date: "March 4",
    month: "March",
    category: "Culture",
    location: "Across India",
    duration: "2 days",
    description:
      "A vibrant celebration of spring, friendship, and new beginnings. Colors fill the air as communities come together in joy.",
    image:
      "https://images.unsplash.com/photo-1612534847738-b3af9bc31f0c?auto=format&fit=crop&w=1200&q=85",
    color: "#f17d65",
    tag: "COLOR & JOY",
  },
  {
    id: 3,
    name: "Ganesh Chaturthi",
    subtitle: "The Arrival of Bappa",
    date: "September 14",
    month: "September",
    category: "Devotion",
    location: "Maharashtra",
    duration: "10 days",
    description:
      "Welcoming Lord Ganesha with devotion, music, grand pandals, and heartfelt celebrations that bring entire neighborhoods together.",
    image:
      "https://images.unsplash.com/photo-1567591414240-e1c7f859cdd3?auto=format&fit=crop&w=1200&q=85",
    color: "#e99b42",
    tag: "COMMUNITY SPIRIT",
  },
  {
    id: 4,
    name: "Navratri",
    subtitle: "Nine Nights of Celebration",
    date: "October 11",
    month: "October",
    category: "Culture",
    location: "Gujarat & Across India",
    duration: "9 nights",
    description:
      "Nine nights dedicated to devotion, dance, and divine feminine energy. Garba and Dandiya bring people together after sunset.",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85",
    color: "#d97c55",
    tag: "DANCE & DEVOTION",
  },
  {
    id: 5,
    name: "Onam",
    subtitle: "A Harvest of Happiness",
    date: "August 26",
    month: "August",
    category: "Tradition",
    location: "Kerala",
    duration: "10 days",
    description:
      "Kerala's beautiful harvest festival filled with floral carpets, traditional feasts, boat races, and the legendary homecoming of King Mahabali.",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=85",
    color: "#76a783",
    tag: "HARVEST FESTIVAL",
  },
  {
    id: 6,
    name: "Pongal",
    subtitle: "Celebrating the Harvest",
    date: "January 14",
    month: "January",
    category: "Tradition",
    location: "Tamil Nadu",
    duration: "4 days",
    description:
      "A heartfelt thanksgiving to the Sun, nature, and farmers. Families prepare sweet Pongal and decorate their homes with kolam.",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=85",
    color: "#d9a14c",
    tag: "HARVEST & GRATITUDE",
  },
];

const categories = ["All", "Tradition", "Culture", "Devotion"];

const stories = [
  {
    number: "01",
    category: "CULTURE",
    title: "Why every Indian festival tells a story",
    text: "Discover the traditions, legends, and values that make every celebration meaningful.",
    image:
      "https://images.unsplash.com/photo-1604608672516-8a4f5c7d9b0e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "02",
    category: "FOOD",
    title: "A feast of flavors and memories",
    text: "From modaks to mithai, explore the food that makes celebrations unforgettable.",
    image:
      "https://images.unsplash.com/photo-1605197161470-5d9a5c8d1d5c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "03",
    category: "TRADITIONS",
    title: "The beauty of rituals passed down",
    text: "The little customs that connect generations and keep our heritage alive.",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbabl?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [month, setMonth] = useState("All months");
  const [saved, setSaved] = useState<number[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [selectedFestival, setSelectedFestival] =
    useState<Festival | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("festora-saved");
      if (stored) setSaved(JSON.parse(stored));
    } catch {
      setSaved([]);
    }
  }, []);

  const toggleSaved = (id: number) => {
    setSaved((previous) => {
      const updated = previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id];

      localStorage.setItem("festora-saved", JSON.stringify(updated));
      return updated;
    });
  };

  const filteredFestivals = useMemo(() => {
    return festivals.filter((festival) => {
      const matchesSearch =
        festival.name.toLowerCase().includes(search.toLowerCase()) ||
        festival.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        festival.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || festival.category === category;

      const matchesMonth =
        month === "All months" || festival.month === month;

      const matchesSaved = !showSaved || saved.includes(festival.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMonth &&
        matchesSaved
      );
    });
  }, [search, category, month, showSaved, saved]);

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newsletterEmail.trim()) return;

    setSubscribed(true);
    setNewsletterEmail("");
  };

  const closeMobileMenu = () => setMobileMenu(false);

  return (
    <main className="festora">
      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#home" className="brand" onClick={closeMobileMenu}>
          <span className="brand-icon">
            <Sparkles size={19} />
          </span>
          FESTORA<span className="brand-dot">.</span>
        </a>

        <div className={`nav-links ${mobileMenu ? "nav-open" : ""}`}>
          <a href="#festivals" onClick={closeMobileMenu}>
            Festivals
          </a>
          <a href="#stories" onClick={closeMobileMenu}>
            Stories
          </a>
          <a href="#culture" onClick={closeMobileMenu}>
            Culture
          </a>
          <Link href="/calendar" onClick={closeMobileMenu}>
            Calendar
          </Link>
          <a href="#about" onClick={closeMobileMenu}>
            About
          </a>
        </div>

        <div className="nav-actions">
          <button
            className={`saved-nav ${showSaved ? "active" : ""}`}
            onClick={() => {
              setShowSaved(!showSaved);
              document.getElementById("festivals")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <Bookmark size={16} />
            <span>Saved</span>
            {saved.length > 0 && (
              <span className="saved-count">{saved.length}</span>
            )}
          </button>

          <a href="#festivals" className="nav-cta">
            Explore <ArrowUpRight size={16} />
          </a>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-background" />

        <div className="hero-content">
          <div className="eyebrow hero-eyebrow">
            <span className="eyebrow-line" />
            INDIA, IN ALL ITS COLORS
            <span className="eyebrow-line" />
          </div>

          <h1>
            Every festival.
            <br />
            <span>Every feeling.</span>
          </h1>

          <p className="hero-description">
            Discover the celebrations, stories, and traditions
            <br className="desktop-break" />
            that bring India together.
          </p>

          <div className="hero-buttons">
            <a href="#festivals" className="button-primary">
              Explore festivals <ArrowRight size={17} />
            </a>
            <a href="#stories" className="button-secondary">
              Discover our stories
            </a>
          </div>

          <div className="hero-bottom">
            <div className="hero-note">
              <span className="hero-note-dot" />
              A JOURNEY THROUGH INDIAN CULTURE
            </div>

            <a href="#festivals" className="scroll-indicator">
              SCROLL TO EXPLORE <ArrowDownRight size={17} />
            </a>
          </div>
        </div>

        <div className="hero-floating-card">
          <div className="floating-icon">
            <CalendarDays size={20} />
          </div>
          <div>
            <p>YOUR FESTIVAL COMPANION</p>
            <strong>Celebrate every moment.</strong>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="ticker-content" key={index}>
              <span>DIWALI</span>
              <Sparkles />
              <span>HOLI</span>
              <Sparkles />
              <span>GANESH CHATURTHI</span>
              <Sparkles />
              <span>NAVRATRI</span>
              <Sparkles />
              <span>ONAM</span>
              <Sparkles />
              <span>PONGAL</span>
              <Sparkles />
            </div>
          ))}
        </div>
      </div>

      {/* FESTIVAL DISCOVERY */}
      <section className="section festivals-section" id="festivals">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" /> THE FESTIVAL COLLECTION
            </div>
            <h2>
              Find your next
              <br />
              <span>celebration.</span>
            </h2>
          </div>

          <p className="section-description">
            From ancient traditions to vibrant celebrations,
            <br className="desktop-break" />
            find the moments that make India extraordinary.
          </p>
        </div>

        <div className="festival-controls">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search festivals, places..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X size={15} />
              </button>
            )}
          </div>

          <div className="filter-group">
            {categories.map((item) => (
              <button
                key={item}
                className={`filter-chip ${category === item ? "selected" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="month-select">
            <CalendarDays size={16} />
            <select
              value={month}
              onChange={(event) => setMonth(event.target.value)}
              aria-label="Filter by month"
            >
              <option>All months</option>
              {[
                "January",
                "March",
                "August",
                "September",
                "October",
                "November",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown size={15} />
          </div>
        </div>

        {showSaved && (
          <div className="saved-banner">
            <Bookmark size={17} />
            <span>
              Showing your saved festivals ({saved.length})
            </span>
            <button onClick={() => setShowSaved(false)}>
              View all festivals <X size={14} />
            </button>
          </div>
        )}

        <div className="festival-grid">
          {filteredFestivals.map((festival, index) => (
            <article
              className={`festival-card ${index === 0 ? "featured-card" : ""}`}
              key={festival.id}
            >
              <div className="festival-image-wrap">
                <img
                  src={festival.image}
                  alt={festival.name}
                  className="festival-image"
                />

                <span className="festival-tag">{festival.tag}</span>

                <button
                  className={`save-button ${
                    saved.includes(festival.id) ? "is-saved" : ""
                  }`}
                  onClick={() => toggleSaved(festival.id)}
                  aria-label={
                    saved.includes(festival.id)
                      ? "Remove from saved"
                      : "Save festival"
                  }
                >
                  <Heart
                    size={18}
                    fill={saved.includes(festival.id) ? "currentColor" : "none"}
                  />
                </button>

                <div className="festival-date">
                  <span>{festival.month.slice(0, 3).toUpperCase()}</span>
                  <strong>{festival.date.split(" ")[1]}</strong>
                </div>
              </div>

              <div className="festival-card-content">
                <div className="festival-card-top">
                  <span className="festival-category">
                    {festival.category}
                  </span>
                  <span className="festival-duration">
                    <Clock3 size={13} />
                    {festival.duration}
                  </span>
                </div>

                <h3>{festival.name}</h3>
                <p className="festival-subtitle">{festival.subtitle}</p>

                <div className="festival-card-bottom">
                  <span className="festival-location">
                    <Compass size={14} />
                    {festival.location}
                  </span>

                  <button
                    className="card-arrow"
                    onClick={() => setSelectedFestival(festival)}
                    aria-label={`View ${festival.name}`}
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredFestivals.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <Search size={24} />
            </div>
            <h3>No festivals found</h3>
            <p>Try a different search or clear your filters.</p>
            <button
              className="button-primary"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setMonth("All months");
                setShowSaved(false);
              }}
            >
              Reset filters
            </button>
          </div>
        )}

        <div className="festival-footer">
          <p>
            Showing <strong>{filteredFestivals.length}</strong> of{" "}
            <strong>{festivals.length}</strong> festivals
          </p>
          <span>Dates are illustrative and may vary by year.</span>
        </div>
      </section>

      {/* CULTURE */}
      <section className="culture-section" id="culture">
        <div className="culture-inner">
          <div className="culture-image">
            <img
              src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1400&q=85"
              alt="Traditional Indian celebration"
            />
            <div className="culture-image-label">
              <span>INDIA</span>
              <span>∞</span>
              <span>CELEBRATIONS</span>
            </div>
          </div>

          <div className="culture-content">
            <div className="eyebrow">
              <span className="eyebrow-line" /> MORE THAN A FESTIVAL
            </div>

            <h2>
              A culture that
              <br />
              <span>celebrates life.</span>
            </h2>

            <p>
              Every celebration carries a piece of our identity.
              Every ritual holds a story. Every gathering creates
              a memory that lasts a lifetime.
            </p>

            <p>
              FESTORA brings these moments closer, helping you
              discover the meaning, beauty, and traditions behind
              India's incredible festivals.
            </p>

            <a href="#stories" className="text-link">
              Explore our stories <ArrowRight size={17} />
            </a>

            <div className="culture-stats">
              <div>
                <strong>100+</strong>
                <span>Traditions to discover</span>
              </div>
              <div>
                <strong>28</strong>
                <span>States, endless cultures</span>
              </div>
              <div>
                <strong>1</strong>
                <span>Incredible India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="section stories-section" id="stories">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" /> STORIES THAT MATTER
            </div>
            <h2>
              Beyond the
              <br />
              <span>celebration.</span>
            </h2>
          </div>

          <a href="#about" className="text-link stories-link">
            Discover FESTORA <ArrowRight size={17} />
          </a>
        </div>

        <div className="stories-grid">
          {stories.map((story) => (
            <article className="story-card" key={story.number}>
              <div className="story-image-wrap">
                <img src={story.image} alt={story.title} />
                <span className="story-number">{story.number}</span>
                <span className="story-category">{story.category}</span>
              </div>

              <div className="story-content">
                <h3>{story.title}</h3>
                <p>{story.text}</p>
                <a href="#about" className="story-read-link">
                  Read the story <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MUSIC */}
      <section className="music-section">
        <div className="music-decoration music-decoration-one" />
        <div className="music-decoration music-decoration-two" />

        <div className="music-content">
          <div className="eyebrow music-eyebrow">
            <Music2 size={15} /> THE SOUND OF CELEBRATION
          </div>

          <h2>
            Feel the rhythm
            <br />
            <span>of India.</span>
          </h2>

          <p>
            From the beats of Dhol to the melodies of folk music,
            every festival has its own soundtrack.
          </p>

          <a href="#festivals" className="button-light">
            Explore celebrations <ArrowRight size={17} />
          </a>
        </div>

        <div className="music-visual">
          <div className="music-circle music-circle-large">
            <div className="music-circle music-circle-middle">
              <div className="music-circle music-circle-small">
                <Music2 size={40} />
              </div>
            </div>
          </div>

          <div className="music-floating music-floating-top">
            <span>♪</span> Folk
          </div>
          <div className="music-floating music-floating-bottom">
            <span>♫</span> Celebration
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section" id="about">
        <div className="newsletter-inner">
          <div className="newsletter-icon">
            <Sparkles size={23} />
          </div>

          <div className="newsletter-text">
            <div className="eyebrow">
              <span className="eyebrow-line" /> STAY IN THE CELEBRATION
            </div>
            <h2>
              Never miss a <span>festive moment.</span>
            </h2>
            <p>
              Get festival dates, cultural stories, and inspiration
              delivered to your inbox.
            </p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className="subscribe-success">
                <Check size={18} />
                You're on the list!
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(event) =>
                    setNewsletterEmail(event.target.value)
                  }
                  required
                />
                <button type="submit" aria-label="Subscribe">
                  Join us <ArrowRight size={17} />
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand-area">
            <a href="#home" className="brand footer-brand">
              <span className="brand-icon">
                <Sparkles size={19} />
              </span>
              FESTORA<span className="brand-dot">.</span>
            </a>
            <p>
              Celebrating the colors, culture,
              <br />
              and spirit of India.
            </p>
          </div>

          <div className="footer-column">
            <h4>EXPLORE</h4>
            <a href="#festivals">Festivals</a>
            <a href="#stories">Stories</a>
            <a href="#culture">Culture</a>
          </div>

          <div className="footer-column">
            <h4>DISCOVER</h4>
            <Link href="/calendar">Festival calendar</Link>
            <a href="#culture">Traditions</a>
            <a href="#stories">Food & stories</a>
          </div>

          <div className="footer-column">
            <h4>FESTORA</h4>
            <a href="#about">Our story</a>
            <a href="#about">Newsletter</a>
            <a href="#home">Back to top ↑</a>
            
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 FESTORA. Made with love for India.</span>
          <span>CELEBRATE CULTURE. CELEBRATE LIFE.</span>
        </div>
      </footer>

      {/* FESTIVAL DETAIL MODAL */}
      {selectedFestival && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedFestival(null)}
        >
          <div
            className="festival-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedFestival(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="modal-image">
              <img
                src={selectedFestival.image}
                alt={selectedFestival.name}
              />
              <span className="modal-image-tag">
                {selectedFestival.tag}
              </span>
            </div>

            <div className="modal-content">
              <div className="eyebrow">
                <span className="eyebrow-line" />{" "}
                {selectedFestival.category.toUpperCase()}
              </div>

              <h2>{selectedFestival.name}</h2>
              <h3>{selectedFestival.subtitle}</h3>

              <p>{selectedFestival.description}</p>

              <div className="modal-details">
                <div>
                  <CalendarDays size={18} />
                  <span>
                    <small>DATE</small>
                    <strong>{selectedFestival.date}</strong>
                  </span>
                </div>
                <div>
                  <Compass size={18} />
                  <span>
                    <small>LOCATION</small>
                    <strong>{selectedFestival.location}</strong>
                  </span>
                </div>
                <div>
                  <Clock3 size={18} />
                  <span>
                    <small>DURATION</small>
                    <strong>{selectedFestival.duration}</strong>
                  </span>
                </div>
              </div>

              <button
                className="button-primary modal-save"
                onClick={() => toggleSaved(selectedFestival.id)}
              >
                <Heart
                  size={17}
                  fill={
                    saved.includes(selectedFestival.id)
                      ? "currentColor"
                      : "none"
                  }
                />
                {saved.includes(selectedFestival.id)
                  ? "Remove from saved"
                  : "Save this festival"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BACK TO TOP */}
      <a href="#home" className="back-to-top" aria-label="Back to top">
        <ChevronLeft size={19} />
      </a>
    </main>
  );
}