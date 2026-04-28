import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { PageWrapper, SectionHeading, Badge } from '../components/ui';
import { upcomingMatches, venues } from '../data/matches';

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hrs', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2">
      {units.map(u => (
        <div key={u.label} className="text-center">
          <div className="bg-pak-green/20 border border-pak-green/30 px-3 py-1.5 font-display font-black text-white text-2xl w-16 text-center">
            {String(u.value).padStart(2, '0')}
          </div>
          <div className="text-white/30 text-[10px] font-heading tracking-widest uppercase mt-1">{u.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Fixtures() {
  return (
    <PageWrapper>
      <div className="relative h-56 overflow-hidden flex items-end pb-8">
        <div className="absolute inset-0 stadium-lights bg-bg-darker" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-pak-gold" />
            <span className="font-heading text-pak-gold text-sm tracking-[4px] uppercase">Schedule</span>
          </div>
          <h1 className="font-display font-black text-white text-6xl md:text-8xl uppercase leading-none">Fixtures</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <SectionHeading label="Coming Up" title="Upcoming Matches" subtitle="Mark your calendars for Pakistan's next battles on the cricket field." />

        <div className="space-y-4 mb-20">
          {upcomingMatches.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass border border-pak-green/20 hover:border-pak-green/40 p-6 transition-all duration-300"
            >
              <div className="flex flex-wrap items-start gap-6 justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-5xl">🇵🇰</span>
                    <span className="text-white/40 text-xs font-heading tracking-wider mt-1">PAK</span>
                  </div>
                  <div className="text-center">
                    <div className="font-display font-black text-pak-gold text-2xl">VS</div>
                    <Badge variant="green">T20I</Badge>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-5xl">{match.opponentFlag}</span>
                    <span className="text-white/40 text-xs font-heading tracking-wider mt-1">
                      {match.opponent.slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-black text-white text-xl uppercase mb-3">{match.series}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-white/40 font-heading">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(match.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5"><Clock size={14} />{match.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14} />{match.venue}, {match.city}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className="text-white/30 text-xs font-heading tracking-widest uppercase mb-2 text-center">Match Starts In</div>
                  <Countdown targetDate={match.date} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <SectionHeading label="Pakistan Cricket" title="Our Venues" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {venues.map((venue, i) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass border border-pak-green/20 overflow-hidden hover:border-pak-gold/30 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-display font-black text-white text-xl uppercase mb-1">{venue.name}</h3>
                <div className="flex items-center gap-2 text-white/40 text-xs font-heading mb-3">
                  <MapPin size={12} /> {venue.city} • Capacity: {venue.capacity}
                </div>
                <p className="text-white/40 text-sm font-body">{venue.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}