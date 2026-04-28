import { motion } from "framer-motion";

// Section wrapper
export function Section({ children, className = "", id = "" }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`py-20 ${className}`}>
      {children}
    </motion.section>
  );
}

// Section heading
export function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-3">
        <span className="h-px w-8 bg-pak-gold" />
        <span className="font-heading text-pak-gold text-sm tracking-[4px] uppercase">
          {label}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-display font-black text-white text-5xl md:text-6xl uppercase leading-none tracking-tight">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/40 font-body mt-4 max-w-xl text-sm leading-relaxed">
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// Stat card
export function StatCard({ value, label, icon }) {
  return (
    <div className="glass border border-pak-green/20 p-6 hover:border-pak-gold/30 transition-colors duration-300 group">
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <div className="font-display font-black text-white text-4xl tracking-tight group-hover:text-pak-gold transition-colors">
        {value}
      </div>
      <div className="font-heading text-white/40 text-xs tracking-[3px] uppercase mt-1">
        {label}
      </div>
    </div>
  );
}

// Badge
export function Badge({ children, variant = "green" }) {
  const variants = {
    green: "bg-pak-green/20 text-pak-green-light border-pak-green/30",
    gold: "bg-pak-gold/20 text-pak-gold border-pak-gold/30",
    red: "bg-red-500/20 text-red-400 border-red-500/30",
    gray: "bg-white/10 text-white/60 border-white/20",
  };
  return (
    <span
      className={`inline-block px-2.5 py-1 border font-heading text-xs tracking-widest uppercase ${variants[variant]}`}>
      {children}
    </span>
  );
}

// Stagger container
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Page wrapper
export function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-20 min-h-screen">
      {children}
    </motion.div>
  );
}

// Loading skeleton
export function Skeleton({ className = "" }) {
  return <div className={`skeleton rounded ${className}`} />;
}
