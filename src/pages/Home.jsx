

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronDown,
  Play,
  TrendingUp,
  Users,
  Trophy,
  Star,
} from "lucide-react";
import {
  Section,
  SectionHeading,
  StatCard,
  staggerContainer,
  staggerItem,
  PageWrapper,
} from "../components/ui";
import PlayerCard from "../components/cards/PlayerCard";
import { players } from "../data/players";
import { news } from "../data/news";
import { pastMatches } from "../data/matches";

const heroStats = [
  { value: "106", label: "T20Is Played", icon: "🏏" },
  { value: "3", label: "World Cups", icon: "🏆" },
  { value: "#3", label: "ICC Ranking", icon: "⭐" },
  { value: "15", label: "Players", icon: "👥" },
];

const newsTicker = [
  "🏏 Pakistan beat Australia by 17 runs in 3rd T20I",
  "⭐ Babar Azam returns to #1 T20I batting ranking",
  "🔥 Shaheen Afridi takes 5-wicket haul",
  "📅 Pakistan vs England series announced for May 2025",
  "🏆 Pakistan qualify for T20 World Cup 2026",
];

export default function Home() {
  const [tickerText] = useState(newsTicker.join("   •   "));
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const featuredPlayers = players.slice(0, 6);
  const featuredNews = news.slice(0, 3);

  return (
    <PageWrapper>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image with parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1920&q=80"
            alt="Cricket Stadium"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark/40" />
          <div className="absolute inset-0 stadium-lights" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-[1400px] mx-auto px-6 pt-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-pak-gold" />
              <span className="font-heading text-pak-gold text-sm tracking-[5px] uppercase">
                Pakistan National Team
              </span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display font-black text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}>
              THE
              <br />
              <span className="gradient-text">GREEN</span>
              <br />
              WARRIORS
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/50 font-body text-lg mt-6 max-w-md leading-relaxed">
              Pakistan T20 Cricket — Where passion meets excellence. Follow
              every match, every milestone.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/squad"
                className="flex items-center gap-2 px-8 py-4 bg-pak-green text-white font-display font-black
                  text-lg tracking-widest uppercase hover:bg-pak-green-light transition-all duration-300
                  hover:shadow-[0_0_30px_rgba(0,107,60,0.5)]">
                <Users size={20} />
                Meet The Squad
              </Link>
              <Link
                to="/fixtures"
                className="flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-display font-black
                  text-lg tracking-widest uppercase hover:border-pak-gold hover:text-pak-gold transition-all duration-300">
                <Play size={20} />
                View Fixtures
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/30">
          <ChevronDown size={28} />
        </motion.div>

        {/* Pakistan flag stripe */}
        <div
          className="absolute right-0 top-0 bottom-0 w-2 z-10"
          style={{
            background:
              "linear-gradient(180deg, transparent, #006B3C, transparent)",
          }}
        />
      </section>

      {/* NEWS TICKER */}
      <div className="relative bg-pak-green/10 border-y border-pak-green/20 py-3 overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 bg-pak-gold px-4 py-1 font-heading font-700 text-bg-dark text-xs tracking-wider uppercase z-10">
            Latest
          </div>
          <div className="overflow-hidden flex-1">
            <div className="animate-ticker whitespace-nowrap font-heading text-white/60 text-sm tracking-wider">
              {tickerText + "   •   " + tickerText}
            </div>
          </div>
        </div>
      </div>

      {/* HERO STATS */}
      <Section className="bg-bg-dark">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}>
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* FEATURED PLAYERS */}
      <Section>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading
              label="The Team"
              title="Featured Players"
              subtitle="Pakistan's finest cricketers on the world stage."
            />
            <Link
              to="/squad"
              className="hidden md:flex items-center gap-2 font-heading text-pak-gold text-sm tracking-widest uppercase hover:text-white transition-colors">
              Full Squad →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlayers.map((player, i) => (
              <PlayerCard key={player.id} player={player} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* LATEST RESULTS */}
      <Section className="bg-bg-darker">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading label="Recent Action" title="Latest Results" />
            <Link
              to="/results"
              className="hidden md:flex items-center gap-2 font-heading text-pak-gold text-sm tracking-widest uppercase hover:text-white transition-colors">
              All Results →
            </Link>
          </div>
          <div className="space-y-3">
            {pastMatches.slice(0, 5).map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass border p-5 flex items-center gap-6 
                  ${match.result === "win" ? "border-pak-green/30 hover:border-pak-green/50" : "border-red-500/20 hover:border-red-500/30"}
                  transition-all duration-300`}>
                <div
                  className={`w-14 h-14 flex-shrink-0 flex items-center justify-center font-display font-black text-lg
                  ${match.result === "win" ? "bg-pak-green/20 text-pak-green-light" : "bg-red-500/20 text-red-400"}`}>
                  {match.result === "win" ? "W" : "L"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl">{match.opponentFlag}</span>
                    <span className="font-display font-black text-white text-xl uppercase">
                      vs {match.opponent}
                    </span>
                  </div>
                  <div className="text-white/40 text-xs font-heading tracking-wider">
                    {match.venue} •{" "}
                    {new Date(match.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-display font-black text-white text-lg">
                    {match.score?.pak}{" "}
                    <span className="text-white/30 font-body font-normal text-sm">
                      vs
                    </span>{" "}
                    {match.score?.opp}
                  </div>
                  <div className="text-white/40 text-xs font-heading">
                    Won by {match.margin}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* NEWS GRID */}
      <Section>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading label="Updates" title="Latest News" />
            <Link
              to="/news"
              className="hidden md:flex items-center gap-2 font-heading text-pak-gold text-sm tracking-widest uppercase hover:text-white transition-colors">
              All News →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredNews.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group glass border border-pak-green/20 hover:border-pak-gold/30 overflow-hidden
                  transition-all duration-400 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-pak-green/80 text-white font-heading text-xs px-2 py-1 tracking-wider uppercase">
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-700 text-white text-lg leading-snug group-hover:text-pak-gold transition-colors line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm font-body leading-relaxed line-clamp-2">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-pak-green/10">
                    <span className="text-white/30 text-xs font-heading tracking-wider">
                      {item.readTime}
                    </span>
                    <span className="text-pak-gold text-xs font-heading tracking-wider">
                      Read More →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CALL TO ACTION BANNER */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=80"
            alt="Stadium"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-pak-green-dark/90" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}>
            <div className="text-6xl mb-6">🇵🇰</div>
            <h2 className="font-display font-black text-white text-6xl md:text-7xl uppercase leading-none mb-6">
              Dil Dil Pakistan
            </h2>
            <p className="text-white/60 font-body text-lg mb-10 max-w-md mx-auto">
              Join millions of fans supporting Pakistan cricket. Follow every
              match, every victory.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/fanzone"
                className="px-10 py-4 bg-pak-gold text-bg-dark font-display font-black text-xl tracking-widest uppercase
                  hover:bg-pak-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                Join Fan Zone
              </Link>
              <Link
                to="/squad"
                className="px-10 py-4 border-2 border-white text-white font-display font-black text-xl tracking-widest uppercase
                  hover:bg-white/10 transition-all duration-300">
                View Squad
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
