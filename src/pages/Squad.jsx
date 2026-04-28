import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper, SectionHeading } from "../components/ui";
import PlayerCard from "../components/cards/PlayerCard";
import { players } from "../data/players";

const filters = ["All", "Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"];

export default function Squad() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? players
      : players.filter((p) => p.role === activeFilter);

  return (
    <PageWrapper>
      {/* Hero banner */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1512070679279-8988d32161be?w=1920&q=80"
          alt="Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end pb-8 px-6 max-w-[1400px] mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-px w-8 bg-pak-gold" />
              <span className="font-heading text-pak-gold text-sm tracking-[4px] uppercase">
                Pakistan T20 Team
              </span>
            </div>
            <h1 className="font-display font-black text-white text-6xl md:text-8xl uppercase leading-none">
              THE SQUAD
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-2.5 font-heading font-600 text-sm tracking-widest uppercase transition-all duration-300 border
                ${
                  activeFilter === filter
                    ? "bg-pak-green border-pak-green text-white shadow-[0_0_20px_rgba(0,107,60,0.4)]"
                    : "bg-transparent border-pak-green/30 text-white/50 hover:border-pak-green/60 hover:text-white"
                }`}>
              {filter}
              {filter !== "All" && (
                <span
                  className={`ml-2 text-xs ${activeFilter === filter ? "text-pak-gold" : "text-white/30"}`}>
                  ({players.filter((p) => p.role === filter).length})
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Player count */}
        <p className="text-white/30 font-heading text-sm tracking-widest uppercase mb-8">
          Showing {filtered.length} players
        </p>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((player, i) => (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}>
              <PlayerCard player={player} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
