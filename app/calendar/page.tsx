
"use client";

import { useMemo, useState } from "react";
import "./calendar.css";

type Festival = {
  name: string;
  date: string;
  category: string;
  region: string;
  description: string;
  emoji: string;
};

const festivals: Festival[] = [
  {
    name: "Diwali",
    date: "2026-11-08",
    category: "Religious",
    region: "Pan India",
    description: "Festival of lights, celebrated with diyas, rangoli, sweets and family gatherings.",
    emoji: "🪔",
  },
  {
    name: "Govardhan Puja",
    date: "2026-11-09",
    category: "Religious",
    region: "North India",
    description: "A celebration of devotion, gratitude and the Govardhan hill legend.",
    emoji: "🙏",
  },
  {
    name: "Bhai Dooj",
    date: "2026-11-11",
    category: "Family",
    region: "Pan India",
    description: "A celebration of the bond between brothers and sisters.",
    emoji: "❤️",
  },
  {
    name: "Chhath Puja",
    date: "2026-11-15",
    category: "Religious",
    region: "Bihar, Jharkhand, UP",
    description: "Devotees offer prayers to the Sun God and thank nature for its blessings.",
    emoji: "🌅",
  },
  {
    name: "Guru Nanak Jayanti",
    date: "2026-11-24",
    category: "Religious",
    region: "Punjab, Pan India",
    description: "Celebrates the birth of Guru Nanak Dev Ji with prayers and community service.",
    emoji: "✨",
  },
  {
    name: "Christmas",
    date: "2026-12-25",
    category: "Cultural",
    region: "Pan India",
    description: "Celebration of Christmas with lights, gifts, music and gatherings.",
    emoji: "🎄",
  },
  {
    name: "Makar Sankranti",
    date: "2027-01-14",
    category: "Harvest",
    region: "Pan India",
    description: "A harvest festival celebrated with kite flying, sweets and seasonal traditions.",
    emoji: "🪁",
  },
  {
    name: "Pongal",
    date: "2027-01-15",
    category: "Harvest",
    region: "Tamil Nadu",
    description: "A Tamil harvest festival expressing gratitude to the Sun and nature.",
    emoji: "🌾",
  },
  {
    name: "Maha Shivratri",
    date: "2027-03-06",
    category: "Religious",
    region: "Pan India",
    description: "A sacred night dedicated to Lord Shiva, observed with prayers and devotion.",
    emoji: "🔱",
  },
  {
    name: "Holi",
    date: "2027-03-22",
    category: "Cultural",
    region: "Pan India",
    description: "Festival of colours celebrating joy, spring and the triumph of good over evil.",
    emoji: "🎨",
  },
  {
    name: "Gudi Padwa",
    date: "2027-04-07",
    category: "Cultural",
    region: "Maharashtra",
    description: "The Marathi New Year, celebrated with Gudis, festive food and new beginnings.",
    emoji: "🚩",
  },
  {
    name: "Ram Navami",
    date: "2027-04-15",
    category: "Religious",
    region: "Pan India",
    description: "Celebrates the birth of Lord Rama through prayers and festivities.",
    emoji: "🏹",
  },
  {
    name: "Raksha Bandhan",
    date: "2027-08-17",
    category: "Family",
    region: "Pan India",
    description: "A celebration of the bond between siblings.",
    emoji: "🧵",
  },
  {
    name: "Janmashtami",
    date: "2027-08-25",
    category: "Religious",
    region: "Pan India",
    description: "Celebrates the birth of Lord Krishna with devotional songs and celebrations.",
    emoji: "🦚",
  },
  {
    name: "Ganesh Chaturthi",
    date: "2027-09-04",
    category: "Religious",
    region: "Maharashtra, Pan India",
    description: "Welcomes Lord Ganesha with decorations, prayers and community celebrations.",
    emoji: "🐘",
  },
  {
    name: "Onam",
    date: "2027-09-12",
    category: "Harvest",
    region: "Kerala",
    description: "Kerala's harvest festival celebrated with Pookalam, Onam Sadya and festivities.",
    emoji: "🌼",
  },
  {
    name: "Dussehra",
    date: "2027-10-09",
    category: "Religious",
    region: "Pan India",
    description: "Celebrates the victory of good over evil.",
    emoji: "🏹",
  },
  {
    name: "Diwali",
    date: "2027-10-29",
    category: "Religious",
    region: "Pan India",
    description: "Festival of lights celebrated with diyas, sweets and family gatherings.",
    emoji: "🪔",
  },
];

const categories = ["All", "Religious", "Cultural", "Harvest", "Family"];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(dateString: string) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function FestivalCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 10, 1));
  const [selectedDate, setSelectedDate] = useState("2026-11-08");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const filteredFestivals = useMemo(() => {
    return festivals.filter((festival) => {
      const matchesCategory =
        category === "All" || festival.category === category;

      const matchesSearch =
        festival.name.toLowerCase().includes(search.toLowerCase()) ||
        festival.region.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const monthFestivals = filteredFestivals.filter((festival) => {
    const date = new Date(`${festival.date}T12:00:00`);
    return date.getFullYear() === year && date.getMonth() === month;
  });

  const selectedFestivals = filteredFestivals.filter(
    (festival) => festival.date === selectedDate
  );

  const upcomingFestivals = filteredFestivals
    .filter((festival) => festival.date >= dateKey(new Date()))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function changeMonth(offset: number) {
    setCurrentMonth(new Date(year, month + offset, 1));
  }

  function goToToday() {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(dateKey(today));
  }

  return (
    <main className="fest-calendar-page">
      <section className="calendar-hero">
        <div className="calendar-hero-content">
          <span className="calendar-eyebrow">FESTORA • CELEBRATE INDIA</span>
          <h1>Festival Calendar</h1>
          <p>
            Discover India’s vibrant festivals, traditions and celebrations
            throughout the year.
          </p>
        </div>

        <div className="calendar-hero-decoration">✦</div>
      </section>

      <section className="calendar-toolbar">
        <div className="calendar-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search festivals or regions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="calendar-filters">
          {categories.map((item) => (
            <button
              key={item}
              className={`calendar-filter ${category === item ? "active" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="calendar-main-grid">
        <div className="calendar-panel">
          <div className="calendar-heading">
            <div>
              <span className="calendar-small-label">EXPLORE BY DATE</span>
              <h2>
                {monthNames[month]} {year}
              </h2>
            </div>

            <div className="calendar-navigation">
              <button onClick={() => changeMonth(-1)} aria-label="Previous month">
                ←
              </button>
              <button onClick={goToToday} className="today-button">
                Today
              </button>
              <button onClick={() => changeMonth(1)} aria-label="Next month">
                →
              </button>
            </div>
          </div>

          <div className="calendar-weekdays">
            {weekdays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="calendar-grid">
            {calendarCells.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="calendar-empty" />;
              }

              const cellDate = new Date(year, month, day);
              const cellKey = dateKey(cellDate);
              const dayFestivals = monthFestivals.filter(
                (festival) => festival.date === cellKey
              );

              const isSelected = selectedDate === cellKey;
              const isToday = dateKey(new Date()) === cellKey;

              return (
                <button
                  key={cellKey}
                  className={[
                    "calendar-day",
                    isSelected ? "selected" : "",
                    isToday ? "is-today" : "",
                    dayFestivals.length ? "has-festival" : "",
                  ].join(" ")}
                  onClick={() => setSelectedDate(cellKey)}
                >
                  <span className="calendar-day-number">{day}</span>

                  {dayFestivals.length > 0 && (
                    <span className="calendar-day-festival">
                      {dayFestivals[0].emoji}{" "}
                      <span>{dayFestivals[0].name}</span>
                    </span>
                  )}

                  {dayFestivals.length > 1 && (
                    <span className="calendar-more">
                      +{dayFestivals.length - 1} more
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="calendar-legend">
            <span className="legend-dot" />
            Festival day
            <span className="legend-selected" />
            Selected date
          </div>
        </div>

        <aside className="calendar-sidebar">
          <div className="selected-date-card">
            <span className="calendar-small-label">SELECTED DATE</span>
            <h3>
              {new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
                "en-IN",
                { weekday: "long" }
              )}
            </h3>
            <p>
              {new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
                "en-IN",
                { day: "numeric", month: "long", year: "numeric" }
              )}
            </p>
          </div>

          <div className="calendar-events-card">
            <div className="calendar-card-heading">
              <h3>Festivals on this day</h3>
              <span>{selectedFestivals.length}</span>
            </div>

            {selectedFestivals.length === 0 ? (
              <div className="calendar-no-events">
                <span>🌿</span>
                <p>No festival listed for this date.</p>
                <small>Select another date to explore.</small>
              </div>
            ) : (
              selectedFestivals.map((festival) => (
                <article className="calendar-event" key={festival.name}>
                  <div className="calendar-event-emoji">{festival.emoji}</div>
                  <div>
                    <h4>{festival.name}</h4>
                    <span>{festival.category} · {festival.region}</span>
                    <p>{festival.description}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </aside>
      </section>

      <section className="upcoming-section">
        <div className="upcoming-header">
          <div>
            <span className="calendar-small-label">SAVE THE DATE</span>
            <h2>Upcoming Festivals</h2>
          </div>
          <p>Mark your calendar for India’s upcoming celebrations.</p>
        </div>

        {upcomingFestivals.length === 0 ? (
          <p className="calendar-no-results">
            No upcoming festivals found. Try changing the filters.
          </p>
        ) : (
          <div className="upcoming-festival-grid">
            {upcomingFestivals.map((festival) => (
              <button
                className="upcoming-festival-card"
                key={festival.name + festival.date}
                onClick={() => {
                  const date = new Date(`${festival.date}T12:00:00`);
                  setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
                  setSelectedDate(festival.date);
                }}
              >
                <div className="upcoming-festival-emoji">{festival.emoji}</div>
                <div className="upcoming-festival-info">
                  <span>{formatDate(festival.date)}</span>
                  <h3>{festival.name}</h3>
                  <p>{festival.region}</p>
                </div>
                <span className="upcoming-arrow">↗</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <p className="calendar-disclaimer">
        Festival dates are indicative and may vary by region, local Panchang
        or moon sighting. Please verify dates locally before planning rituals.
      </p>
    </main>
  );
}

