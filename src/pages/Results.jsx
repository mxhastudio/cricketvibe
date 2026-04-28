import { motion } from "framer-motion";
import { PageWrapper, SectionHeading, Badge } from "../components/ui";
import { pastMatches } from "../data/matches";

export default function Results() {
  const wins = pastMatches.filter((m) => m.result === "win").length;
  const losses = pastMatches.filter((m) => m.result === "loss").length;
  const winRate = Math.round((wins / pastMatches.length) * 100);

  return (
    <PageWrapper>
      {/* Hero */}
      <div className="relative h-56 overflow-hidden flex items-end pb-8">
        <div className="absolute inset-0 stadium-lights bg-bg-darker" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-pak-gold" />
            <span className="font-heading text-pak-gold text-sm tracking-[4px] uppercase">
              Match History
            </span>
          </div>
          <h1 className="font-display font-black text-white text-6xl md:text-8xl uppercase leading-none">
            Results
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {[
            {
              label: "Matches Played",
              value: pastMatches.length,
              color: "text-white",
            },
            { label: "Wins", value: wins, color: "text-pak-green-light" },
            { label: "Losses", value: losses, color: "text-red-400" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass border border-pak-green/20 p-6 text-center">
              <div className={`font-display font-black text-5xl ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-white/30 font-heading text-xs tracking-widest uppercase mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Win rate bar */}
        <div className="mb-16 glass border border-pak-green/20 p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="font-heading text-white text-sm tracking-wider uppercase">
              Win Rate
            </span>
            <span className="font-display font-black text-pak-gold text-2xl">
              {winRate}%
            </span>
          </div>
          <div className="h-3 bg-pak-green/10 border border-pak-green/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${winRate}%` }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-pak-green to-pak-green-light"
            />
          </div>
        </div>

        <SectionHeading label="Recent Matches" title="All Results" />

        {/* Match results */}
        <div className="space-y-4">
          {pastMatches.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass border p-6 transition-all duration-300 hover:scale-[1.01]
                ${
                  match.result === "win"
                    ? "border-pak-green/30 hover:border-pak-green/50"
                    : "border-red-500/20 hover:border-red-500/30"
                }`}>
              <div className="flex flex-wrap items-center gap-6">
                {/* Result badge */}
                <div
                  className={`w-16 h-16 flex-shrink-0 flex items-center justify-center font-display font-black text-2xl
                  ${match.result === "win" ? "bg-pak-green/20 text-pak-green-light border border-pak-green/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                  {match.result === "win" ? "W" : "L"}
                </div>

                {/* Teams */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl">🇵🇰</span>
                    <span className="text-white/40 text-xs font-heading tracking-wider mt-1">
                      PAK
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-display font-black text-white/50 text-lg">
                      VS
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl">{match.opponentFlag}</span>
                    <span className="text-white/40 text-xs font-heading tracking-wider mt-1">
                      {match.opponent.slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Scores */}
                <div className="text-center flex-1">
                  <div className="font-display font-black text-white text-2xl">
                    {match.score?.pak}{" "}
                    <span className="text-white/30 text-base font-body font-normal">
                      vs
                    </span>{" "}
                    {match.score?.opp}
                  </div>
                  <div
                    className={`font-heading text-sm mt-1 ${match.result === "win" ? "text-pak-green-light" : "text-red-400"}`}>
                    {match.result === "win"
                      ? `PAK won by ${match.margin}`
                      : `${match.opponent} won by ${match.margin}`}
                  </div>
                </div>

                {/* Details */}
                <div className="text-right flex-shrink-0">
                  <div className="text-white/40 text-sm font-heading">
                    {new Date(match.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="text-white/25 text-xs font-heading mt-1">
                    {match.venue}
                  </div>
                  {match.manOfMatch && (
                    <div className="text-pak-gold text-xs font-heading mt-1">
                      ⭐ {match.manOfMatch}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
