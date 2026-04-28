import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Hash } from 'lucide-react';
import { PageWrapper, Badge } from '../components/ui';
import { players } from '../data/players';

const roleColors = {
  'Batsman': 'green',
  'Bowler': 'red',
  'All-Rounder': 'gold',
  'Wicket-Keeper': 'gray',
};

export default function PlayerDetails() {
  const { id } = useParams();
  const player = players.find(p => p.id === id);

  if (!player) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
          <div className="text-8xl">🏏</div>
          <h2 className="font-display font-black text-white text-4xl uppercase">Player Not Found</h2>
          <Link to="/squad" className="text-pak-gold font-heading tracking-widest uppercase hover:text-white">← Back to Squad</Link>
        </div>
      </PageWrapper>
    );
  }

  const statEntries = [
    { label: 'Matches', value: player.stats.matches },
    ...(player.stats.runs !== undefined ? [{ label: 'Runs', value: player.stats.runs }] : []),
    ...(player.stats.average !== undefined ? [{ label: 'Average', value: player.stats.average }] : []),
    ...(player.stats.strikeRate !== undefined ? [{ label: 'Strike Rate', value: player.stats.strikeRate }] : []),
    ...(player.stats.fifties !== undefined ? [{ label: '50s', value: player.stats.fifties }] : []),
    ...(player.stats.hundreds !== undefined ? [{ label: '100s', value: player.stats.hundreds }] : []),
    ...(player.stats.wickets !== undefined ? [{ label: 'Wickets', value: player.stats.wickets }] : []),
    ...(player.stats.economy !== undefined ? [{ label: 'Economy', value: player.stats.economy }] : []),
    ...(player.stats.catches !== undefined ? [{ label: 'Catches', value: player.stats.catches }] : []),
    ...(player.stats.stumpings !== undefined ? [{ label: 'Stumpings', value: player.stats.stumpings }] : []),
  ];

  return (
    <PageWrapper>
      <div className="relative h-[60vh] overflow-hidden">
        <img src={player.coverImage} alt={player.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/90 via-bg-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />

        <Link to="/squad"
          className="absolute top-8 left-6 flex items-center gap-2 text-white/60 hover:text-white
            font-heading text-sm tracking-widest uppercase transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Squad
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex flex-wrap items-end gap-6">
              <div className="w-32 h-32 border-2 border-pak-green overflow-hidden flex-shrink-0 glow-green">
                <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <Badge variant={roleColors[player.role]}>{player.role}</Badge>
                  {player.isCaptain && <Badge variant="gold">Captain</Badge>}
                  {player.isViceCaptain && <Badge variant="green">Vice Captain</Badge>}
                </div>
                <h1 className="font-display font-black text-white leading-none uppercase"
                  style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
                  {player.name}
                </h1>
                <div className="flex flex-wrap gap-6 mt-3">
                  <div className="flex items-center gap-2 text-white/40 text-sm font-heading">
                    <Hash size={14} /> Jersey #{player.number}
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-sm font-heading">
                    <MapPin size={14} /> {player.hometown}
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-sm font-heading">
                    <Calendar size={14} /> Born {player.born}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 className="font-display font-black text-pak-gold text-2xl uppercase tracking-widest mb-4">Biography</h3>
              <p className="text-white/60 font-body leading-relaxed">{player.bio}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h3 className="font-display font-black text-pak-gold text-2xl uppercase tracking-widest mb-6">T20I Career Stats</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {statEntries.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="glass border border-pak-green/20 p-4 text-center hover:border-pak-gold/30 transition-colors"
                  >
                    <div className="font-display font-black text-white text-3xl">{stat.value}</div>
                    <div className="font-heading text-white/30 text-xs tracking-widest uppercase mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h3 className="font-display font-black text-pak-gold text-2xl uppercase tracking-widest mb-4">Achievements</h3>
              <div className="space-y-3">
                {player.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-start gap-3 glass border border-pak-green/20 p-4"
                  >
                    <span className="text-pak-gold mt-1">★</span>
                    <span className="text-white/70 font-body text-sm">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass border border-pak-green/20 p-6"
            >
              <h4 className="font-display font-black text-white text-xl uppercase tracking-widest mb-6">Player Info</h4>
              <div className="space-y-4">
                {[
                  { label: 'Full Name', value: player.name },
                  { label: 'Role', value: player.role },
                  { label: 'Jersey', value: `#${player.number}` },
                  { label: 'Age', value: `${player.age} years` },
                  { label: 'Born', value: player.born },
                  { label: 'Hometown', value: player.hometown },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-start border-b border-pak-green/10 pb-3">
                    <span className="text-white/30 font-heading text-xs tracking-widest uppercase">{item.label}</span>
                    <span className="text-white font-heading text-sm text-right max-w-[60%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <h4 className="font-display font-black text-pak-gold text-lg uppercase tracking-widest mb-4">Other Players</h4>
              <div className="space-y-3">
                {players.filter(p => p.id !== player.id && p.role === player.role).slice(0, 3).map(p => (
                  <Link key={p.id} to={`/player/${p.id}`}
                    className="flex items-center gap-3 glass border border-pak-green/20 p-3 hover:border-pak-gold/30 transition-colors group">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover object-top" />
                    <div className="flex-1 min-w-0">
                      <div className="font-heading font-600 text-white text-sm truncate group-hover:text-pak-gold transition-colors">{p.name}</div>
                      <div className="text-white/30 text-xs font-heading">{p.role}</div>
                    </div>
                    <span className="text-pak-green text-sm">→</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}