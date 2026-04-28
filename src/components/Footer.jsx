import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Youtube, Twitter, Instagram, Facebook, ArrowUp } from "lucide-react";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const footerLinks = {
  "Quick Links": [
    { label: "Home", path: "/" },
    { label: "Squad", path: "/squad" },
    { label: "Fixtures", path: "/fixtures" },
    { label: "Results", path: "/results" },
  ],
  Explore: [
    { label: "Gallery", path: "/gallery" },
    { label: "News", path: "/news" },
    { label: "Rankings", path: "/rankings" },
    { label: "Fan Zone", path: "/fanzone" },
  ],
  Support: [
    { label: "Contact Us", path: "/contact" },
    { label: "Sponsorship", path: "/contact" },
    { label: "Media", path: "/contact" },
    { label: "Newsletter", path: "/contact" },
  ],
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-bg-darker border-t border-pak-green/20 pt-16 pb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 stadium-lights opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px divider" />

      <div className="max-w-[1400px] mx-auto px-6 relative">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full border-2 border-pak-green flex items-center justify-center glow-green">
                <span className="text-xl">🏏</span>
              </div>
              <div>
                <div className="font-display font-black text-white text-2xl tracking-widest uppercase">
                  Pakistan
                </div>
                <div className="font-heading text-pak-gold text-xs tracking-[4px] uppercase">
                  Cricket T20
                </div>
              </div>
            </Link>
            <p className="text-white/40 font-body text-sm leading-relaxed mb-6 max-w-xs">
              The official fan hub for Pakistan National T20 Cricket Team.
              Follow every match, every moment, every milestone.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 glass border border-pak-green/30 flex items-center justify-center
                    text-white/50 hover:text-pak-gold hover:border-pak-gold/50 transition-all duration-300"
                  aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-black text-pak-gold tracking-widest uppercase text-sm mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-white/40 hover:text-white font-heading text-sm tracking-wider transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass border border-pak-green/20 p-6 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h4 className="font-display font-black text-white text-xl tracking-widest uppercase mb-1">
                Stay in the Game
              </h4>
              <p className="text-white/40 text-sm">
                Get match alerts, news, and exclusive content delivered to your
                inbox.
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 sm:w-64 bg-pak-green/10 border border-pak-green/30 px-4 py-2.5
                  text-white placeholder-white/20 font-heading text-sm focus:outline-none focus:border-pak-gold
                  transition-colors"
              />
              <button
                className="px-6 py-2.5 bg-pak-green text-white font-heading font-700 text-sm tracking-wider uppercase
                hover:bg-pak-green-light transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-body">
            © 2025 Pakistan Cricket T20 Fan Hub. Built with 💚 for cricket fans
            worldwide.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/25 text-xs">Privacy Policy</span>
            <span className="text-white/25 text-xs">Terms of Use</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 border border-pak-green/30 flex items-center justify-center
                text-pak-green hover:bg-pak-green/20 transition-all duration-300">
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
