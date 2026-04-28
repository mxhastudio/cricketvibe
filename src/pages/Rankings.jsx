import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { PageWrapper, SectionHeading } from "../components/ui";
import { rankings } from "../data/news";

function ChangeIcon({ change }) {
  if (change > 0)
    return <TrendingUp size={14} className="text-pak-green-light" />;
  if (change < 0) return <TrendingDown size={14} className="text-red-400" />;
  return <Minus size={14} className="text-white/30" />;
}

const tabs = [
  { key: "teams", label: "Team Rankings" },
  { key: "batting", label: "Batting" },
  { key: "bowling", label: "Bowling" },
];

export default function Rankings() {
  const [activeTab, setActiveTab] = useState("teams");

  return (
    <PageWrapper>
      <div className="relative h-56 overflow-hidden flex items-end pb-8">
        <div className="absolute inset-0 stadium-lights bg-bg-darker" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-pak-gold" />
            <span className="font-heading text-pak-gold text-sm tracking-[4px] uppercase">
              ICC T20I
            </span>
          </div>
          <h1 className="font-display font-black text-white text-6xl md:text-8xl uppercase leading-none">
            Rankings
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="flex gap-2 mb-10 border-b border-pak-green/20 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2.5 font-heading font-600 text-sm tracking-widest uppercase transition-all duration-300 border
                ${
                  activeTab === tab.key
                    ? "bg-pak-green border-pak-green text-white"
                    : "border-transparent text-white/40 hover:text-white"
                }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="glass border border-pak-green/20 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-pak-green/20 bg-pak-green/5">
            <div className="col-span-1 font-heading text-white/30 text-xs tracking-widest uppercase">
              #
            </div>
            <div className="col-span-6 md:col-span-7 font-heading text-white/30 text-xs tracking-widest uppercase">
              {activeTab === "teams" ? "Team" : "Player"}
            </div>
            <div className="col-span-3 md:col-span-2 font-heading text-white/30 text-xs tracking-widest uppercase text-right">
              Points
            </div>
            <div className="col-span-2 font-heading text-white/30 text-xs tracking-widest uppercase text-right">
              Change
            </div>
          </div>

          {rankings[activeTab].map((item, i) => {
            const isPakistan = item.country === "🇵🇰" || item.flag === "🇵🇰";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-pak-green/10 items-center transition-all duration-200
                  ${isPakistan ? "bg-pak-green/10 border-pak-green/30" : "hover:bg-pak-green/5"}`}>
                <div className="col-span-1">
                  <span
                    className={`font-display font-black text-2xl ${item.rank <= 3 ? "text-pak-gold" : "text-white/30"}`}>
                    {item.rank}
                  </span>
                </div>
                <div className="col-span-6 md:col-span-7 flex items-center gap-3">
                  <span className="text-2xl">{item.flag || item.country}</span>
                  <div>
                    <div
                      className={`font-heading font-600 text-base ${isPakistan ? "text-pak-gold" : "text-white"}`}>
                      {item.team || item.player}
                    </div>
                    {isPakistan && (
                      <div className="text-pak-green-light text-xs font-heading tracking-wider">
                        PAKISTAN 🇵🇰
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-3 md:col-span-2 text-right">
                  <span
                    className={`font-display font-black text-xl ${isPakistan ? "text-pak-gold" : "text-white"}`}>
                    {item.points}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-1">
                  <ChangeIcon change={item.change} />
                  <span
                    className={`font-heading text-sm ${item.change > 0 ? "text-pak-green-light" : item.change < 0 ? "text-red-400" : "text-white/30"}`}>
                    {item.change === 0 ? "-" : Math.abs(item.change)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass border border-pak-gold/30 p-8 text-center">
          <div className="text-6xl mb-4">🇵🇰</div>
          <h3 className="font-display font-black text-white text-4xl uppercase mb-2">
            Pakistan T20I Team
          </h3>
          <div className="font-display font-black text-pak-gold text-6xl mb-2">
            #3
          </div>
          <div className="text-white/40 font-heading text-sm tracking-widest uppercase">
            Current ICC T20I Team Ranking
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
