import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageWrapper, SectionHeading } from '../components/ui';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80', alt: 'Pakistan Stadium', category: 'Stadium', span: 'col-span-2 row-span-2' },
  { id: 2, src: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80', alt: 'Cricket Ground', category: 'Stadium', span: '' },
  { id: 3, src: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80', alt: 'Bowler in action', category: 'Action', span: '' },
  { id: 4, src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', alt: 'Player training', category: 'Training', span: '' },
  { id: 5, src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80', alt: 'Match action', category: 'Action', span: 'col-span-2' },
  { id: 6, src: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?w=800&q=80', alt: 'Stadium night', category: 'Stadium', span: '' },
  { id: 7, src: 'https://images.unsplash.com/photo-1567580360737-dc67a6f5bf0e?w=800&q=80', alt: 'Cricket match', category: 'Action', span: '' },
  { id: 8, src: 'https://images.unsplash.com/photo-1508185159346-bb1c5e93ebb4?w=800&q=80', alt: 'Fans celebration', category: 'Fans', span: '' },
  { id: 9, src: 'https://images.unsplash.com/photo-1593037955898-a27c7b2a7c56?w=800&q=80', alt: 'Cricket action', category: 'Action', span: '' },
  { id: 10, src: 'https://images.unsplash.com/photo-1544216717-3bbf52512659?w=800&q=80', alt: 'Player practice', category: 'Training', span: 'col-span-2' },
];

const categories = ['All', 'Stadium', 'Action', 'Training', 'Fans'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0));
  const nextImage = () => setLightboxIndex(i => (i !== null ? (i + 1) % filtered.length : 0));

  return (
    <PageWrapper>
      <div className="relative h-56 overflow-hidden flex items-end pb-8">
        <div className="absolute inset-0 stadium-lights bg-bg-darker" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-pak-gold" />
            <span className="font-heading text-pak-gold text-sm tracking-[4px] uppercase">Visuals</span>
          </div>
          <h1 className="font-display font-black text-white text-6xl md:text-8xl uppercase leading-none">Gallery</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 font-heading text-sm tracking-widest uppercase border transition-all duration-300
                ${activeCategory === cat
                  ? 'bg-pak-green border-pak-green text-white'
                  : 'border-pak-green/30 text-white/50 hover:border-pak-green/60 hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`relative group cursor-pointer overflow-hidden border border-pak-green/10 hover:border-pak-gold/40 transition-all duration-300 ${img.span}`}
              onClick={() => openLightbox(i)}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-bg-dark/0 group-hover:bg-bg-dark/40 transition-all duration-300 flex items-center justify-center">
                <span className="font-heading text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/60 hover:text-white p-2 z-10">
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 z-10 glass border border-pak-green/30 hover:border-pak-green"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 z-10 glass border border-pak-green/30 hover:border-pak-green"
            >
              <ChevronRight size={24} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              className="max-w-4xl max-h-[80vh] w-full h-auto object-contain"
              onClick={e => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <div className="font-heading text-white/60 text-sm tracking-wider">{filtered[lightboxIndex].alt}</div>
              <div className="text-white/30 text-xs font-heading mt-1">{lightboxIndex + 1} / {filtered.length}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}