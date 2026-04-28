import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Share2, Twitter, Instagram } from "lucide-react";
import { PageWrapper, SectionHeading, Badge } from "../components/ui";

const jerseys = [
  {
    id: 1,
    name: "Home Jersey 2024",
    color: "#006B3C",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    label: "Green",
  },
  {
    id: 2,
    name: "Away Jersey 2024",
    color: "#FFFFFF",
    image:
      "https://images.unsplash.com/photo-1508185159346-bb1c5e93ebb4?w=400&q=80",
    label: "White",
  },
  {
    id: 3,
    name: "Special Edition",
    color: "#D4AF37",
    image:
      "https://images.unsplash.com/photo-1593037955898-a27c7b2a7c56?w=400&q=80",
    label: "Gold",
  },
];

const polls = [
  {
    id: 1,
    question: "Who is Pakistan's best T20I batsman in 2024?",
    options: [
      { label: "Babar Azam", votes: 4821, percent: 52 },
      { label: "Mohammad Rizwan", votes: 2940, percent: 32 },
      { label: "Fakhar Zaman", votes: 924, percent: 10 },
      { label: "Saim Ayub", votes: 555, percent: 6 },
    ],
    totalVotes: 9240,
  },
  {
    id: 2,
    question: "Pakistan's best bowler for T20 World Cup 2026?",
    options: [
      { label: "Shaheen Afridi", votes: 5200, percent: 47 },
      { label: "Naseem Shah", votes: 3100, percent: 28 },
      { label: "Haris Rauf", votes: 1980, percent: 18 },
      { label: "Shadab Khan", votes: 770, percent: 7 },
    ],
    totalVotes: 11050,
  },
];

const wallpapers = [
  {
    id: 1,
    name: "Babar Azam HD",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
    resolution: "1920×1080",
  },
  {
    id: 2,
    name: "Team Pakistan",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
    resolution: "2560×1440",
  },
  {
    id: 3,
    name: "Green Warriors",
    image:
      "https://images.unsplash.com/photo-1567580360737-dc67a6f5bf0e?w=800&q=80",
    resolution: "1920×1080",
  },
  {
    id: 4,
    name: "Stadium Nights",
    image:
      "https://images.unsplash.com/photo-1512070679279-8988d32161be?w=800&q=80",
    resolution: "3840×2160",
  },
];

function PollCard({ poll }) {
  const [voted, setVoted] = useState(null);

  return (
    <div className="glass border border-pak-green/20 p-6">
      <h3 className="font-heading font-700 text-white text-lg mb-6">
        {poll.question}
      </h3>
      <div className="space-y-3">
        {poll.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setVoted(i)}
            className={`w-full text-left relative overflow-hidden transition-all duration-300 group
              ${voted !== null ? "cursor-default" : "cursor-pointer hover:border-pak-gold/40"}`}>
            <div
              className={`relative flex items-center justify-between p-3 border
              ${voted === i ? "border-pak-gold/50" : "border-pak-green/20"}`}>
              {voted !== null && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${opt.percent}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`absolute left-0 top-0 h-full ${voted === i ? "bg-pak-gold/20" : "bg-pak-green/10"}`}
                />
              )}
              <span
                className={`relative font-heading text-sm ${voted === i ? "text-pak-gold" : "text-white/70"}`}>
                {opt.label}
              </span>
              {voted !== null && (
                <span
                  className={`relative font-display font-black text-lg ${voted === i ? "text-pak-gold" : "text-white/40"}`}>
                  {opt.percent}%
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 text-white/25 text-xs font-heading tracking-wider text-right">
        {poll.totalVotes.toLocaleString()} total votes
      </div>
    </div>
  );
}

export default function FanZone() {
  return (
    <PageWrapper>
      {/* Hero */}
      <div className="relative h-56 overflow-hidden flex items-end pb-8">
        <div className="absolute inset-0 stadium-lights bg-bg-darker" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-pak-gold" />
            <span className="font-heading text-pak-gold text-sm tracking-[4px] uppercase">
              Community
            </span>
          </div>
          <h1 className="font-display font-black text-white text-6xl md:text-8xl uppercase leading-none">
            Fan Zone
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16 space-y-20">
        {/* Jersey showcase */}
        <div>
          <SectionHeading label="Official Kit" title="Jersey Showcase" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jerseys.map((jersey, i) => (
              <motion.div
                key={jersey.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group glass border border-pak-green/20 hover:border-pak-gold/40 overflow-hidden transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={jersey.image}
                    alt={jersey.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="gold">{jersey.label}</Badge>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <div className="font-heading font-700 text-white">
                      {jersey.name}
                    </div>
                    <div className="text-white/30 text-xs font-heading tracking-wider mt-1">
                      T20I Official Kit
                    </div>
                  </div>
                  <button className="p-2 border border-pak-green/30 text-pak-green-light hover:bg-pak-green/10 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Polls */}
        <div>
          <SectionHeading
            label="Your Voice"
            title="Fan Polls"
            subtitle="Vote and let us know what you think!"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {polls.map((poll) => (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}>
                <PollCard poll={poll} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Wallpapers */}
        <div>
          <SectionHeading
            label="Downloads"
            title="Wallpapers"
            subtitle="Set your screen with Pakistan cricket pride."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {wallpapers.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden border border-pak-green/20 hover:border-pak-gold/40 transition-all duration-300 cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-bg-dark/0 group-hover:bg-bg-dark/60 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                      <Download size={24} className="text-white" />
                      <span className="font-heading text-white text-xs tracking-widest uppercase">
                        Download
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="font-heading text-white text-sm">
                    {w.name}
                  </div>
                  <div className="text-white/30 text-xs font-heading tracking-wider">
                    {w.resolution}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Social */}
        <div className="glass border border-pak-green/20 p-8 text-center">
          <div className="text-5xl mb-4">🇵🇰</div>
          <h3 className="font-display font-black text-white text-4xl uppercase mb-3">
            Join The Conversation
          </h3>
          <p className="text-white/40 font-body mb-8 max-w-md mx-auto">
            Follow Pakistan Cricket on social media for real-time updates,
            behind-the-scenes content, and more.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              {
                icon: Twitter,
                label: "Twitter",
                handle: "@PakistanCricket",
                color: "hover:border-sky-400/50 hover:text-sky-400",
              },
              {
                icon: Instagram,
                label: "Instagram",
                handle: "@PakistanCricket",
                color: "hover:border-pink-400/50 hover:text-pink-400",
              },
            ].map(({ icon: Icon, label, handle, color }) => (
              <button
                key={label}
                className={`flex items-center gap-3 px-6 py-3 border border-pak-green/30 text-white/60 transition-all duration-300 ${color}`}>
                <Icon size={18} />
                <div className="text-left">
                  <div className="font-heading text-sm font-600">{label}</div>
                  <div className="text-xs opacity-60">{handle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
