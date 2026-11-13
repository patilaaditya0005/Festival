
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Compass,
  Heart,
  Sparkles,
} from "lucide-react";
import "./festival.css";

type FestivalInfo = {
  name: string;
  subtitle: string;
  date: string;
  location: string;
  duration: string;
  category: string;
  image: string;
  description: string;
  history: string;
  significance: string;
  traditions: string[];
  foods: string[];
  outfits: string[];
  ideas: string[];
  related: string[];
};

const festivalData: Record<string, FestivalInfo> = {
  diwali: {
    name: "Diwali",
    subtitle: "The Festival of Lights",
    date: "Usually October or November",
    location: "Across India",
    duration: "5 days",
    category: "Tradition",
    image:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1800&q=90",
    description:
      "Diwali is one of India's most loved festivals. Homes glow with diyas, colorful rangoli decorates entrances, and families come together to celebrate hope, happiness and new beginnings.",
    history:
      "Diwali has several stories and traditions across India. In many parts of the country, it is associated with Lord Rama's return to Ayodhya after defeating Ravana. Other traditions connect the festival with Goddess Lakshmi and the beginning of a prosperous new year.",
    significance:
      "The festival represents the victory of light over darkness and good over evil. It is also a time for gratitude, family reunions, generosity and fresh beginnings.",
    traditions: [
      "Lighting diyas and decorating homes with lights.",
      "Creating colorful rangoli at entrances.",
      "Performing Lakshmi and Ganesh puja in many households.",
      "Sharing sweets and gifts with family and friends.",
      "Cleaning and decorating homes before the celebration.",
    ],
    foods: ["Kaju Katli", "Ladoo", "Chakli", "Shankarpali", "Gulab Jamun"],
    outfits: [
      "Traditional sarees and festive suits.",
      "Kurtas and Nehru jackets.",
      "Indo-western outfits with festive accessories.",
    ],
    ideas: [
      "Host a diya-decoration evening.",
      "Organize a family rangoli competition.",
      "Prepare homemade sweets together.",
      "Celebrate with an eco-friendly decoration theme.",
    ],
    related: ["Holi", "Ganesh Chaturthi", "Navratri"],
  },

  holi: {
    name: "Holi",
    subtitle: "The Festival of Colors",
    date: "Usually February or March",
    location: "Across India",
    duration: "2 days",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1612534847738-b3af9bc31f0c?auto=format&fit=crop&w=1800&q=90",
    description:
      "Holi welcomes spring with colors, music, laughter and togetherness. It brings friends, families and communities together for one of India's most joyful celebrations.",
    history:
      "Holi is associated with the story of Prahlad and Holika, which symbolizes the victory of devotion and goodness over evil. The festival also has strong associations with the stories of Krishna and Radha.",
    significance:
      "Holi celebrates new beginnings, friendship, forgiveness and the arrival of spring. It encourages people to let go of old disagreements and celebrate together.",
    traditions: [
      "Holika Dahan bonfire on the eve of Holi.",
      "Playing with gulal and colorful powders.",
      "Sharing sweets and festive snacks.",
      "Enjoying music, dance and community gatherings.",
      "Meeting friends and family to exchange greetings.",
    ],
    foods: ["Gujiya", "Thandai", "Malpua", "Dahi Vada", "Puran Poli"],
    outfits: [
      "Comfortable white kurta or cotton clothing.",
      "Colorful scarves and simple accessories.",
      "Easy-to-wash outfits suitable for outdoor celebrations.",
    ],
    ideas: [
      "Organize a natural-colors Holi party.",
      "Arrange a music and dance session.",
      "Host a festive snack-sharing gathering.",
      "Celebrate with skin-friendly and eco-conscious colors.",
    ],
    related: ["Diwali", "Janmashtami", "Navratri"],
  },

  "ganesh-chaturthi": {
    name: "Ganesh Chaturthi",
    subtitle: "The Arrival of Bappa",
    date: "Usually August or September",
    location: "Maharashtra and across India",
    duration: "Usually 10 days",
    category: "Devotion",
    image:
      "https://images.unsplash.com/photo-1567591414240-e1c7f859cdd3?auto=format&fit=crop&w=1800&q=90",
    description:
      "Ganesh Chaturthi celebrates the arrival of Lord Ganesha. Homes and public pandals welcome Bappa with devotion, decorations, music and community celebrations.",
    history:
      "The festival celebrates the birth of Lord Ganesha, the Hindu deity associated with wisdom and the removal of obstacles. Public celebrations became especially prominent in Maharashtra through the efforts of Lokmanya Tilak.",
    significance:
      "Lord Ganesha is worshipped before new beginnings and important activities. The festival represents wisdom, prosperity, unity and the removal of obstacles.",
    traditions: [
      "Welcoming a Ganesha idol into homes and pandals.",
      "Performing daily aarti and prayers.",
      "Decorating pandals with creative themes.",
      "Offering modaks and other traditional foods.",
      "Visarjan ceremonies at the end of the celebration.",
    ],
    foods: ["Ukadiche Modak", "Puran Poli", "Karanji", "Ladoo", "Panchkhadya"],
    outfits: [
      "Traditional kurta-pyjama.",
      "Nauvari saree or festive saree.",
      "Ethnic wear in bright festive colors.",
    ],
    ideas: [
      "Create an eco-friendly Ganesha decoration.",
      "Visit a local community pandal.",
      "Organize a cultural or devotional music evening.",
      "Take part in a community cleanliness activity.",
    ],
    related: ["Diwali", "Navratri", "Gudi Padwa"],
  },

  navratri: {
    name: "Navratri",
    subtitle: "Nine Nights of Celebration",
    date: "Usually September or October",
    location: "Across India, especially Gujarat",
    duration: "9 nights",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1800&q=90",
    description:
      "Navratri fills the nights with devotion, dance and colorful traditions. Across India, people celebrate the divine feminine through prayers, Garba, Dandiya and community gatherings.",
    history:
      "Navratri is a festival dedicated to the divine feminine in Hindu traditions. It is associated with the nine forms of Goddess Durga and the story of her victory over the demon Mahishasura.",
    significance:
      "The nine nights represent the power of the divine feminine and the victory of good over evil. The festival is also a celebration of devotion, discipline and community.",
    traditions: [
      "Worshipping the nine forms of Goddess Durga.",
      "Participating in Garba and Dandiya Raas.",
      "Observing fasts according to family traditions.",
      "Decorating temples and homes.",
      "Wearing traditional outfits during the celebrations.",
    ],
    foods: ["Sabudana Khichdi", "Kuttu Puri", "Makhana Kheer", "Fruit Chaat", "Farali Snacks"],
    outfits: [
      "Colorful Chaniya Choli.",
      "Traditional kediyu with dhoti.",
      "Festive Indo-western outfits with mirror work.",
    ],
    ideas: [
      "Join a local Garba or Dandiya event.",
      "Host a traditional dress-up evening.",
      "Create a playlist of festive folk music.",
      "Explore the nine colors associated with Navratri traditions.",
    ],
    related: ["Diwali", "Ganesh Chaturthi", "Holi"],
  },

  onam: {
    name: "Onam",
    subtitle: "A Harvest of Happiness",
    date: "Usually August or September",
    location: "Kerala",
    duration: "10 days",
    category: "Tradition",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1800&q=90",
    description:
      "Onam is Kerala's beautiful harvest festival. It brings people together through floral decorations, traditional feasts, cultural performances and joyful celebrations.",
    history:
      "Onam is associated with the legend of King Mahabali, whose annual return is welcomed by the people of Kerala. It is also connected with the agricultural harvest season.",
    significance:
      "Onam celebrates prosperity, equality, gratitude and togetherness. It reflects Kerala's cultural heritage and its connection with agriculture and community life.",
    traditions: [
      "Creating beautiful Pookalam floral designs.",
      "Preparing the traditional Onam Sadya feast.",
      "Enjoying Vallam Kali boat races.",
      "Watching traditional performances such as Pulikali.",
      "Wearing traditional Kerala attire.",
    ],
    foods: ["Onam Sadya", "Avial", "Sambar", "Payasam", "Banana Chips"],
    outfits: [
      "Kerala Kasavu saree.",
      "Mundu and traditional shirt.",
      "Simple traditional cream and gold outfits.",
    ],
    ideas: [
      "Create a Pookalam with friends and family.",
      "Prepare a small Onam Sadya at home.",
      "Explore traditional Kerala music and dance.",
      "Organize a cultural food-sharing event.",
    ],
    related: ["Pongal", "Makar Sankranti", "Diwali"],
  },

  pongal: {
    name: "Pongal",
    subtitle: "Celebrating the Harvest",
    date: "Usually January 14–17",
    location: "Tamil Nadu",
    duration: "4 days",
    category: "Tradition",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1800&q=90",
    description:
      "Pongal is a harvest festival celebrated in Tamil Nadu to thank the Sun, nature, cattle and farmers. Families prepare traditional Pongal and decorate their homes with kolam.",
    history:
      "Pongal has roots in Tamil agricultural traditions and is celebrated around the harvest season. The festival reflects gratitude for the crops, sunlight, rain and the animals that support farming.",
    significance:
      "Pongal is a celebration of gratitude to nature and the agricultural community. It recognizes the importance of farmers, livestock and the natural resources that support life.",
    traditions: [
      "Preparing sweet Pongal in a traditional pot.",
      "Decorating entrances with colorful kolam.",
      "Celebrating Bhogi with family traditions.",
      "Honoring cattle during Mattu Pongal.",
      "Visiting relatives and sharing festive meals.",
    ],
    foods: ["Sakkarai Pongal", "Ven Pongal", "Vadai", "Payasam", "Sugarcane"],
    outfits: [
      "Traditional silk sarees.",
      "Veshti and shirt.",
      "Comfortable ethnic clothing for family celebrations.",
    ],
    ideas: [
      "Prepare Pongal together as a family.",
      "Create a colorful kolam design.",
      "Learn about local farming traditions.",
      "Celebrate and appreciate farmers in your community.",
    ],
    related: ["Onam", "Makar Sankranti", "Diwali"],
  },
};

export function generateStaticParams() {
  return Object.keys(festivalData).map((slug) => ({ slug }));
}

export default async function FestivalDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const festival = festivalData[slug];

  if (!festival) notFound();

  const relatedFestivals = festival.related
    .map((name) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    }))
    .filter((item) => festivalData[item.slug]);

  return (
    <main className="festival-detail-page">
      <nav className="detail-navbar">
        <Link href="/" className="detail-brand">
          <Sparkles size={19} />
          FESTORA<span>.</span>
        </Link>

        <div className="detail-nav-links">
          <Link href="/">Home</Link>
          <Link href="/#festivals">Festivals</Link>
          <Link href="/calendar">Calendar</Link>
        </div>

        <Link href="/#festivals" className="detail-back-link">
          <ArrowLeft size={16} /> Explore
        </Link>
      </nav>

      <section
        className="detail-hero"
        style={{ backgroundImage: `url("${festival.image}")` }}
      >
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <span className="detail-eyebrow">
            FESTORA <span>•</span> {festival.category.toUpperCase()}
          </span>
          <h1>{festival.name}</h1>
          <p>{festival.subtitle}</p>
          <div className="detail-hero-meta">
            <span><CalendarDays size={16} /> {festival.date}</span>
            <span><Clock3 size={16} /> {festival.duration}</span>
            <span><Compass size={16} /> {festival.location}</span>
          </div>
        </div>
      </section>

      <section className="detail-intro detail-container">
        <div>
          <span className="detail-section-label">THE CELEBRATION</span>
          <h2>Every festival has a story.</h2>
        </div>
        <p>{festival.description}</p>
      </section>

      <section className="detail-story detail-container">
        <article className="detail-story-card">
          <span className="detail-section-label">01 — THE STORY</span>
          <h2>History & origins</h2>
          <p>{festival.history}</p>
        </article>

        <article className="detail-story-card detail-highlight-card">
          <span className="detail-section-label">02 — THE MEANING</span>
          <h2>Why we celebrate</h2>
          <p>{festival.significance}</p>
        </article>
      </section>

      <section className="detail-traditions detail-container">
        <div className="detail-section-heading">
          <span className="detail-section-label">03 — CULTURE & HERITAGE</span>
          <h2>Traditions that bring us together.</h2>
          <p>Discover the customs and rituals that make this celebration special.</p>
        </div>

        <div className="detail-list-grid">
          {festival.traditions.map((item, index) => (
            <article className="detail-list-card" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-lifestyle detail-container">
        <div className="detail-section-heading">
          <span className="detail-section-label">04 — CELEBRATE IN STYLE</span>
          <h2>Food, fashion & festive vibes.</h2>
        </div>

        <div className="detail-lifestyle-grid">
          <article className="detail-lifestyle-card">
            <span className="detail-icon">🍲</span>
            <h3>Festive food</h3>
            <p>Popular dishes and treats associated with the celebration.</p>
            <ul>
              {festival.foods.map((food) => <li key={food}>{food}</li>)}
            </ul>
          </article>

          <article className="detail-lifestyle-card">
            <span className="detail-icon">✨</span>
            <h3>Outfit inspiration</h3>
            <p>Traditional and contemporary ideas to celebrate in style.</p>
            <ul>
              {festival.outfits.map((outfit) => <li key={outfit}>{outfit}</li>)}
            </ul>
          </article>

          <article className="detail-lifestyle-card">
            <span className="detail-icon">🎉</span>
            <h3>Celebration ideas</h3>
            <p>Simple ways to make your celebration memorable.</p>
            <ul>
              {festival.ideas.map((idea) => <li key={idea}>{idea}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="detail-related detail-container">
        <div className="detail-section-heading">
          <span className="detail-section-label">KEEP DISCOVERING</span>
          <h2>More celebrations to explore.</h2>
        </div>

        <div className="detail-related-grid">
          {relatedFestivals.map((item) => (
            <Link
              href={`/festivals/${item.slug}`}
              className="detail-related-card"
              key={item.slug}
            >
              <span><Heart size={17} /></span>
              <h3>{item.name}</h3>
              <p>Discover its story and traditions</p>
              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      </section>

      <footer className="detail-footer">
        <Link href="/" className="detail-brand">
          <Sparkles size={18} /> FESTORA<span>.</span>
        </Link>
        <p>Celebrate culture. Celebrate life.</p>
        <Link href="/calendar">Explore festival calendar <ArrowRight size={16} /></Link>
      </footer>
    </main>
  );
}
