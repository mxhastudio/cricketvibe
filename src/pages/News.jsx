import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper, SectionHeading, Badge } from "../components/ui";
import { news, NewsItem } from "../data/news";

const categories = [
  "All",
  "Match Report",
  "Team News",
  "Player News",
  "ICC Rankings",
  "Analysis",
];

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? news
      : news.filter((n) => n.category === activeCategory);

  const featured = news.filter((n) => n.featured).slice(0, 2);

  return (
    <PageWrapper>
      {/* Hero */}
      <div className="relative h-56 overflow-hidden flex items-end pb-8">
        <div className="absolute inset-0 stadium-lights bg-bg-darker" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-pak-gold" />
            <span className="font-heading text-pak-gold text-sm tracking-[4px] uppercase">
              Cricket Updates
            </span>
          </div>
          <h1 className="font-display font-black text-white text-6xl md:text-8xl uppercase leading-none">
            News
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Featured */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden cursor-pointer border border-pak-gold/20 hover:border-pak-gold/40 transition-all duration-300">
              <div className="relative h-72">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="gold">Featured</Badge>
                  <Badge variant="green">{item.category}</Badge>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-display font-black text-white text-2xl uppercase leading-tight group-hover:text-pak-gold transition-colors mb-3">
                  {item.title}
                </h2>
                <p className="text-white/50 text-sm font-body leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-pak-green/10">
                  <span className="text-white/30 text-xs font-heading">
                    {item.author}
                  </span>
                  <span className="text-pak-gold text-xs font-heading tracking-wider">
                    Read More →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 font-heading text-sm tracking-widest uppercase border transition-all duration-300
                ${
                  activeCategory === cat
                    ? "bg-pak-green border-pak-green text-white"
                    : "border-pak-green/30 text-white/50 hover:border-pak-green/60 hover:text-white"
                }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="group glass border border-pak-green/20 hover:border-pak-gold/30 overflow-hidden transition-all duration-300 cursor-pointer">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-pak-green/80 text-white font-heading text-xs px-2 py-1 tracking-wider uppercase backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-700 text-white text-base leading-snug group-hover:text-pak-gold transition-colors line-clamp-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-white/35 text-sm font-body leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-pak-green/10">
                  <div className="flex items-center gap-2 text-white/25 text-xs font-heading">
                    <span>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <span className="text-pak-gold text-xs font-heading">
                    Read →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
