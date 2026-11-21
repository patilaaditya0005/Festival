
"use client";

import { useEffect, useMemo, useState } from "react";

type Festival = {
  id: number;
  name: string;
  category: string;
  region: string;
  season: string;
  description: string;
  traditions: string[];
  color: string;
  emoji: string;
};

type View =
  | "home"
  | "festivals"
  | "calendar"
  | "login"
  | "signup"
  | "dashboard"
  | "admin";

const festivals: Festival[] = [
  {
    id: 1,
    name: "Diwali",
    category: "Light",
    region: "All India",
    season: "October – November",
    description:
      "The festival of lights celebrates the victory of light over darkness and good over evil. Homes are decorated with lamps, rangoli and lights.",
    traditions: ["Lighting diyas", "Rangoli", "Family gatherings", "Sweets and gifts"],
    color: "orange",
    emoji: "🪔",
  },
  {
    id: 2,
    name: "Holi",
    category: "Cultural",
    region: "North India",
    season: "February – March",
    description:
      "Holi welcomes spring with colours, music and joyful gatherings. It celebrates love, togetherness and the triumph of good.",
    traditions: ["Playing with colours", "Holika Dahan", "Music and dance", "Gujiya"],
    color: "pink",
    emoji: "🎨",
  },
  {
    id: 3,
    name: "Ganesh Chaturthi",
    category: "Religious",
    region: "Maharashtra",
    season: "August – September",
    description:
      "A celebration honouring Lord Ganesha, known for community celebrations, beautifully decorated pandals and devotional music.",
    traditions: ["Ganesh sthapana", "Aarti", "Modak", "Visarjan"],
    color: "yellow",
    emoji: "🐘",
  },
  {
    id: 4,
    name: "Navratri",
    category: "Cultural",
    region: "Gujarat and All India",
    season: "September – October",
    description:
      "Nine nights dedicated to the divine feminine, celebrated through devotion, traditional outfits, Garba and Dandiya.",
    traditions: ["Garba", "Dandiya", "Fasting", "Durga Puja"],
    color: "purple",
    emoji: "💃",
  },
  {
    id: 5,
    name: "Onam",
    category: "Harvest",
    region: "Kerala",
    season: "August – September",
    description:
      "Kerala's harvest festival celebrates the legendary King Mahabali with floral decorations, traditional feasts and cultural events.",
    traditions: ["Pookalam", "Onam Sadya", "Vallam Kali", "Pulikali"],
    color: "green",
    emoji: "🌼",
  },
  {
    id: 6,
    name: "Pongal",
    category: "Harvest",
    region: "Tamil Nadu",
    season: "January",
    description:
      "A multi-day harvest festival thanking the Sun, nature and cattle for their role in agriculture and everyday life.",
    traditions: ["Pongal dish", "Kolam", "Mattu Pongal", "Family celebrations"],
    color: "green",
    emoji: "🌾",
  },
  {
    id: 7,
    name: "Durga Puja",
    category: "Religious",
    region: "West Bengal",
    season: "September – October",
    description:
      "A major celebration honouring Goddess Durga, known for artistic pandals, cultural programmes and community gatherings.",
    traditions: ["Pandal hopping", "Pushpanjali", "Dhak", "Sindoor Khela"],
    color: "red",
    emoji: "🙏",
  },
  {
    id: 8,
    name: "Baisakhi",
    category: "Harvest",
    region: "Punjab",
    season: "April",
    description:
      "A harvest celebration in Punjab that also holds great significance in Sikh history and is marked by music and community events.",
    traditions: ["Bhangra", "Giddha", "Gurudwara visits", "Community meals"],
    color: "yellow",
    emoji: "🌻",
  },
  {
    id: 9,
    name: "Janmashtami",
    category: "Religious",
    region: "All India",
    season: "August",
    description:
      "Celebrates the birth of Lord Krishna through devotional songs, prayers, decorations and cultural performances.",
    traditions: ["Midnight prayers", "Bhajans", "Dahi Handi", "Jhanki"],
    color: "blue",
    emoji: "🦚",
  },
  {
    id: 10,
    name: "Makar Sankranti",
    category: "Harvest",
    region: "All India",
    season: "January",
    description:
      "A harvest festival marking the Sun's transition into Capricorn, celebrated in different ways across India.",
    traditions: ["Kite flying", "Til-gul", "Bonfires", "Traditional food"],
    color: "orange",
    emoji: "🪁",
  },
  {
    id: 11,
    name: "Raksha Bandhan",
    category: "Cultural",
    region: "All India",
    season: "July – August",
    description:
      "A celebration of the bond between siblings, marked by the tying of a rakhi and exchanging wishes and gifts.",
    traditions: ["Rakhi tying", "Family gatherings", "Sweets", "Gifts"],
    color: "pink",
    emoji: "🎀",
  },
  {
    id: 12,
    name: "Christmas",
    category: "Cultural",
    region: "All India",
    season: "December",
    description:
      "Celebrates the birth of Jesus Christ with prayers, carols, decorated trees and gatherings with family and friends.",
    traditions: ["Christmas tree", "Carols", "Midnight mass", "Gift exchange"],
    color: "green",
    emoji: "🎄",
  },
];

const categories = ["All", "Religious", "Cultural", "Harvest", "Light"];

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [selected, setSelected] = useState<Festival | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("festora-favorites");
      if (saved) setFavorites(JSON.parse(saved));
    } catch {
      setFavorites([]);
    }
  }, []);

  function toggleFavorite(id: number) {
    setFavorites((current) => {
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      localStorage.setItem("festora-favorites", JSON.stringify(updated));
      return updated;
    });
  }

  function navigate(next: View) {
    setView(next);
    setSelected(null);
    setMobileMenu(false);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const filteredFestivals = useMemo(() => {
    return festivals.filter((festival) => {
      const matchesSearch =
        festival.name.toLowerCase().includes(search.toLowerCase()) ||
        festival.region.toLowerCase().includes(search.toLowerCase()) ||
        festival.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || festival.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const favoriteFestivals = festivals.filter((festival) =>
    favorites.includes(festival.id)
  );

  function showDetails(festival: Festival) {
    setSelected(festival);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function AuthScreen() {
    return (
      <section className="auth-section">
        <div className="auth-card">
          <div className="auth-symbol">✳</div>
          <p className="eyebrow">WELCOME TO FESTORA</p>
          <h1>{authMode === "login" ? "Welcome back." : "Join the celebration."}</h1>
          <p className="auth-description">
            {authMode === "login"
              ? "Sign in to keep your favourite celebrations close."
              : "Create your account and explore India's celebrations."}
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setNotice(
                "Authentication is not connected yet. Your account will work after backend integration."
              );
            }}
          >
            {authMode === "signup" && (
              <label>
                Full name
                <input type="text" placeholder="Your name" required />
              </label>
            )}

            <label>
              Email address
              <input type="email" placeholder="you@example.com" required />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                minLength={6}
                required
              />
            </label>

            <button className="primary-button full-button" type="submit">
              {authMode === "login" ? "Sign in" : "Create account"} →
            </button>
          </form>

          {notice && <p className="notice">{notice}</p>}

          <p className="auth-switch">
            {authMode === "login" ? "New to Festora?" : "Already have an account?"}
            <button
              className="text-button"
              onClick={() => {
                setAuthMode(authMode === "login" ? "signup" : "login");
                setNotice("");
              }}
            >
              {authMode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
          <button className="back-link" onClick={() => navigate("home")}>
            ← Back to home
          </button>
        </div>
      </section>
    );
  }

  function FestivalCard({ festival }: { festival: Festival }) {
    const isFavorite = favorites.includes(festival.id);

    return (
      <article className="festival-card">
        <div className={`festival-art ${festival.color}`}>
          <span className="festival-emoji">{festival.emoji}</span>
          <button
            className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
            aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
            onClick={() => toggleFavorite(festival.id)}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
          <span className="art-label">{festival.category}</span>
        </div>
        <div className="festival-card-content">
          <p className="card-region">{festival.region}</p>
          <h3>{festival.name}</h3>
          <p className="card-description">{festival.description}</p>
          <div className="card-bottom">
            <span>◷ {festival.season}</span>
            <button className="arrow-button" onClick={() => showDetails(festival)}>
              Explore ↗
            </button>
          </div>
        </div>
      </article>
    );
  }

  function FestivalGrid({ items }: { items: Festival[] }) {
    if (items.length === 0) {
      return (
        <div className="empty-state">
          <span>🔎</span>
          <h3>No festivals found</h3>
          <p>Try another search or category.</p>
        </div>
      );
    }

    return (
      <div className="festival-grid">
        {items.map((festival) => (
          <FestivalCard key={festival.id} festival={festival} />
        ))}
      </div>
    );
  }

  function HomeScreen() {
    return (
      <>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">A JOURNEY THROUGH INDIA</p>
            <h1>
              Every festival
              <br />
              has a <em>story.</em>
            </h1>
            <p className="hero-description">
              Discover the colours, traditions and stories behind India's
              incredible celebrations. One culture, a million ways to celebrate.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => navigate("festivals")}>
                Explore festivals <span>↗</span>
              </button>
              <button className="secondary-button" onClick={() => navigate("calendar")}>
                View calendar
              </button>
            </div>
            <div className="hero-note">
              <span className="note-line" />
              <span>CELEBRATE CULTURE. DISCOVER STORIES.</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-circle hero-circle-one" />
            <div className="hero-circle hero-circle-two" />
            <div className="hero-art-card">
              <span className="hero-art-top">INDIA · CULTURE · CELEBRATION</span>
              <div className="hero-art-emoji">🪔</div>
              <span className="hero-art-bottom">LIGHT · JOY · TOGETHERNESS</span>
            </div>
            <span className="floating-word floating-one">Tradition</span>
            <span className="floating-word floating-two">Togetherness</span>
            <span className="floating-star">✳</span>
          </div>
        </section>

        <section className="intro-strip">
          <p>MORE THAN A DATE ON THE CALENDAR.</p>
          <p>IT'S A FEELING. IT'S A TRADITION. IT'S INDIA.</p>
        </section>

        <section className="section section-padding">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE CELEBRATIONS</p>
              <h2>Find your <em>festival.</em></h2>
              <p className="section-description">
                From colourful streets to quiet rituals, discover celebrations
                that bring people together.
              </p>
            </div>
            <button className="outline-button" onClick={() => navigate("festivals")}>
              View all festivals ↗
            </button>
          </div>
          <FestivalGrid items={festivals.slice(0, 3)} />
        </section>

        <section className="story-section">
          <div className="story-visual">
            <div className="story-visual-inner">
              <span>✳</span>
              <strong>ONE COUNTRY.</strong>
              <strong>COUNTLESS STORIES.</strong>
              <small>THE SPIRIT OF INDIA</small>
            </div>
          </div>
          <div className="story-copy">
            <p className="eyebrow">THE FESTORA STORY</p>
            <h2>Culture is meant to be <em>shared.</em></h2>
            <p>
              Every region has its own rhythm. Every celebration carries a
              memory. Festora brings these stories together in one place so
              you can discover, understand and celebrate India's cultural
              richness.
            </p>
            <button className="text-arrow" onClick={() => navigate("festivals")}>
              Discover the celebrations ↗
            </button>
          </div>
        </section>

        <section className="quote-section">
          <span className="quote-mark">“</span>
          <p>
            Different traditions. Different stories.
            <br />
            One beautiful way of coming together.
          </p>
          <span className="quote-caption">THE FESTORA PHILOSOPHY</span>
        </section>

        <section className="section section-padding">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PLAN AHEAD</p>
              <h2>Your year, full of <em>celebrations.</em></h2>
              <p className="section-description">
                Explore festivals by season and discover what's coming up.
                Exact dates can vary by regional calendar.
              </p>
            </div>
            <button className="outline-button" onClick={() => navigate("calendar")}>
              Explore calendar ↗
            </button>
          </div>
          <div className="season-grid">
            {[
              ["01", "Winter", "January – February", "🌾"],
              ["02", "Spring", "March – April", "🎨"],
              ["03", "Monsoon", "July – September", "🌼"],
              ["04", "Autumn", "October – December", "🪔"],
            ].map(([number, name, months, emoji]) => (
              <button
                className="season-card"
                key={number}
                onClick={() => navigate("calendar")}
              >
                <span className="season-number">{number}</span>
                <span className="season-emoji">{emoji}</span>
                <strong>{name}</strong>
                <small>{months}</small>
                <span className="season-arrow">↗</span>
              </button>
            ))}
          </div>
        </section>

        <section className="join-section">
          <p className="eyebrow">BE PART OF THE CELEBRATION</p>
          <h2>Keep culture close.</h2>
          <p>Save the festivals you love and build your own celebration list.</p>
          <button className="primary-button" onClick={() => navigate("signup")}>
            Join Festora <span>↗</span>
          </button>
        </section>
      </>
    );
  }

  function FestivalsScreen() {
    return (
      <section className="page-section">
        <div className="page-heading">
          <p className="eyebrow">EXPLORE INDIA</p>
          <h1>Every festival has a <em>story.</em></h1>
          <p>Find celebrations by name, region or category.</p>
        </div>

        <div className="filter-panel">
          <div className="search-box">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search festivals or regions..."
            />
          </div>
          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-button ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <p className="results-count">
          SHOWING {filteredFestivals.length} CELEBRATIONS
        </p>
        <FestivalGrid items={filteredFestivals} />
      </section>
    );
  }

  function CalendarScreen() {
    const seasons = [
      {
        title: "January – March",
        subtitle: "Winter into spring",
        items: festivals.filter((f) =>
          ["January", "February", "March"].some((month) =>
            f.season.includes(month)
          )
        ),
      },
      {
        title: "April – June",
        subtitle: "The summer celebrations",
        items: festivals.filter((f) => f.season.includes("April")),
      },
      {
        title: "July – September",
        subtitle: "Monsoon celebrations",
        items: festivals.filter((f) =>
          ["July", "August", "September"].some((month) =>
            f.season.includes(month)
          )
        ),
      },
      {
        title: "October – December",
        subtitle: "The festive season",
        items: festivals.filter((f) =>
          ["October", "November", "December"].some((month) =>
            f.season.includes(month)
          )
        ),
      },
    ];

    return (
      <section className="page-section">
        <div className="page-heading">
          <p className="eyebrow">PLAN YOUR CELEBRATIONS</p>
          <h1>The festival <em>calendar.</em></h1>
          <p>
            Explore India's celebrations throughout the year, grouped by season.
          </p>
        </div>

        <div className="calendar-note">
          <span>ⓘ</span>
          Festival dates may change according to regional Panchang, lunar
          calculations and local traditions. Confirm exact dates locally before
          planning travel or events.
        </div>

        <div className="calendar-list">
          {seasons.map((season) => (
            <div className="calendar-season" key={season.title}>
              <div className="calendar-season-heading">
                <div>
                  <h2>{season.title}</h2>
                  <p>{season.subtitle}</p>
                </div>
                <span>{String(season.items.length).padStart(2, "0")} FESTIVALS</span>
              </div>

              {season.items.length === 0 ? (
                <p className="no-season-items">
                  No festival entries in this season yet.
                </p>
              ) : (
                season.items.map((festival) => (
                  <button
                    className="calendar-item"
                    key={festival.id}
                    onClick={() => showDetails(festival)}
                  >
                    <span className="calendar-item-emoji">{festival.emoji}</span>
                    <span className="calendar-item-name">
                      <strong>{festival.name}</strong>
                      <small>{festival.region}</small>
                    </span>
                    <span className="calendar-item-season">{festival.season}</span>
                    <span className="calendar-item-arrow">↗</span>
                  </button>
                ))
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  function DashboardScreen() {
    return (
      <section className="page-section">
        <div className="page-heading">
          <p className="eyebrow">YOUR FESTORA</p>
          <h1>Your celebration <em>space.</em></h1>
          <p>Your saved festivals are stored locally in this browser.</p>
        </div>

        <div className="dashboard-summary">
          <div>
            <span>♡</span>
            <strong>{favorites.length}</strong>
            <small>Saved festivals</small>
          </div>
          <div>
            <span>✳</span>
            <strong>{festivals.length}</strong>
            <small>Explore festivals</small>
          </div>
        </div>

        <div className="section-heading dashboard-heading">
          <div>
            <p className="eyebrow">YOUR COLLECTION</p>
            <h2>Saved <em>festivals.</em></h2>
          </div>
          <button className="outline-button" onClick={() => navigate("festivals")}>
            Discover more ↗
          </button>
        </div>

        <FestivalGrid items={favoriteFestivals} />

        <div className="backend-note">
          <strong>Account features coming with backend integration</strong>
          <p>
            Secure login, cloud-synced favourites and personal profile data
            will be connected after the database and authentication setup.
          </p>
        </div>
      </section>
    );
  }

  function AdminScreen() {
    return (
      <section className="page-section">
        <div className="page-heading">
          <p className="eyebrow">FESTORA MANAGEMENT</p>
          <h1>Admin <em>dashboard.</em></h1>
          <p>Frontend preview of the festival management area.</p>
        </div>

        <div className="admin-warning">
          <strong>Backend not connected</strong>
          <p>
            This is a visual preview only. Admin access, permissions, publishing
            and database changes must be secured on the server before deployment.
          </p>
        </div>

        <div className="dashboard-summary">
          <div><span>✳</span><strong>{festivals.length}</strong><small>Festival entries</small></div>
          <div><span>♡</span><strong>{favorites.length}</strong><small>Local favourites</small></div>
          <div><span>◷</span><strong>—</strong><small>Published events</small></div>
        </div>

        <div className="admin-table-wrap">
          <div className="admin-table-heading">
            <h2>Festival entries</h2>
            <span>PREVIEW DATA</span>
          </div>
          {festivals.map((festival) => (
            <div className="admin-row" key={festival.id}>
              <span>{festival.emoji}</span>
              <strong>{festival.name}</strong>
              <small>{festival.region}</small>
              <span className="status-label">Sample content</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function DetailScreen() {
    if (!selected) return null;

    return (
      <section className="detail-section">
        <button className="back-link" onClick={() => navigate("festivals")}>
          ← Back to festivals
        </button>

        <div className={`detail-art ${selected.color}`}>
          <span>{selected.emoji}</span>
          <small>DISCOVER THE CELEBRATION</small>
        </div>

        <div className="detail-content">
          <p className="eyebrow">{selected.category} · {selected.region}</p>
          <h1>{selected.name}</h1>
          <p className="detail-season">◷ {selected.season}</p>
          <p className="detail-description">{selected.description}</p>

          <h2>Traditions and highlights</h2>
          <div className="tradition-list">
            {selected.traditions.map((tradition) => (
              <span key={tradition}>✳ {tradition}</span>
            ))}
          </div>

          <button
            className="primary-button"
            onClick={() => toggleFavorite(selected.id)}
          >
            {favorites.includes(selected.id) ? "♥ Saved to favourites" : "♡ Save festival"}
          </button>

          <p className="detail-disclaimer">
            Festival timing and customs may vary by region. Check local sources
            for exact dates and event details.
          </p>
        </div>
      </section>
    );
  }

  return (
    <main>
      <header className="site-header">
        <button className="brand" onClick={() => navigate("home")}>
          <span className="brand-mark">✳</span>
          <span>FESTORA<small>EVERY FESTIVAL HAS A STORY</small></span>
        </button>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
        >
          {mobileMenu ? "✕" : "☰"}
        </button>

        <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
          <button className={view === "home" ? "nav-active" : ""} onClick={() => navigate("home")}>Home</button>
          <button className={view === "festivals" ? "nav-active" : ""} onClick={() => navigate("festivals")}>Festivals</button>
          <button className={view === "calendar" ? "nav-active" : ""} onClick={() => navigate("calendar")}>Calendar</button>
          <button className={view === "dashboard" ? "nav-active" : ""} onClick={() => navigate("dashboard")}>My Space</button>
        </nav>

        <div className="header-actions">
          <button className="login-button" onClick={() => { setAuthMode("login"); navigate("login"); }}>
            Log in
          </button>
          <button className="header-cta" onClick={() => { setAuthMode("signup"); navigate("signup"); }}>
            Get started ↗
          </button>
        </div>
      </header>

      {selected ? (
        <DetailScreen />
      ) : view === "home" ? (
        <HomeScreen />
      ) : view === "festivals" ? (
        <FestivalsScreen />
      ) : view === "calendar" ? (
        <CalendarScreen />
      ) : view === "login" || view === "signup" ? (
        <AuthScreen />
      ) : view === "dashboard" ? (
        <DashboardScreen />
      ) : (
        <AdminScreen />
      )}

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <button className="brand footer-logo" onClick={() => navigate("home")}>
              <span className="brand-mark">✳</span>
              <span>FESTORA<small>EVERY FESTIVAL HAS A STORY</small></span>
            </button>
            <p>Celebrating the stories, traditions and colours of India.</p>
          </div>

          <div className="footer-column">
            <strong>EXPLORE</strong>
            <button onClick={() => navigate("festivals")}>Festivals</button>
            <button onClick={() => navigate("calendar")}>Calendar</button>
            <button onClick={() => navigate("dashboard")}>My Space</button>
          </div>

          <div className="footer-column">
            <strong>ACCOUNT</strong>
            <button onClick={() => { setAuthMode("login"); navigate("login"); }}>Log in</button>
            <button onClick={() => { setAuthMode("signup"); navigate("signup"); }}>Sign up</button>
            <button onClick={() => navigate("admin")}>Admin preview</button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© FESTORA. Made with culture and care.</span>
          <span>INDIA · CULTURE · CELEBRATION</span>
        </div>
      </footer>
    </main>
  );
}
