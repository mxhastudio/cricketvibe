import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Squad", path: "/squad" },
  { label: "Fixtures", path: "/fixtures" },
  { label: "Results", path: "/results" },
  { label: "Gallery", path: "/gallery" },
  { label: "News", path: "/news" },
  { label: "Rankings", path: "/rankings" },
  { label: "Fan Zone", path: "/fanzone" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[9999] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #006B3C, #D4AF37)",
        }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "glass border-b border-pak-green/20 py-3" : "py-5"
        }`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-full border-2 border-pak-green flex items-center justify-center
              group-hover:border-pak-gold transition-colors duration-300 glow-green">
              <span className="text-white font-display font-black text-sm">
                🏏
              </span>
            </div>
            <div>
              <div className="font-display font-black text-white text-xl leading-none tracking-widest uppercase">
                Pakistan
              </div>
              <div className="font-heading text-pak-gold text-xs tracking-[4px] uppercase">
                Cricket T20
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 font-heading font-600 text-sm tracking-wider uppercase transition-colors duration-200 group ${
                  location.pathname === link.path
                    ? "text-pak-gold"
                    : "text-white/70 hover:text-white"
                }`}>
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-pak-gold transition-all duration-300 ${
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-white/60 hover:text-white transition-colors">
              <Search size={18} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 text-white">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Watch Live Button */}
            <Link
              to="/fixtures"
              className="hidden lg:flex items-center gap-2 px-4 py-2 border border-pak-green text-pak-green-light 
                font-heading font-600 text-sm tracking-wider uppercase hover:bg-pak-green/10 transition-all duration-300
                hover:shadow-[0_0_15px_rgba(0,107,60,0.4)]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Live
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-pak-green/20">
              <div className="max-w-[1400px] mx-auto px-6 py-3">
                <input
                  type="text"
                  placeholder="Search players, matches, news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent border-b border-pak-green/40 text-white placeholder-white/30
                    font-heading text-lg py-2 focus:outline-none focus:border-pak-gold transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden glass border-t border-pak-green/20 overflow-hidden">
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}>
                    <Link
                      to={link.path}
                      className={`block py-3 font-heading font-600 text-lg tracking-widest uppercase border-b border-pak-green/10
                        ${location.pathname === link.path ? "text-pak-gold" : "text-white/70"}`}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
