import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClockIn } from '@/contexts/ClockInContext';
import { 
  Image as ImageIcon, 
  Plus, 
  Sparkles, 
  Calendar, 
  Tag, 
  Heart, 
  Share2, 
  X,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60',
];

export function MemoryJournalView() {
  const { memories, addMemory } = useClockIn();

  const [isNewMemoryOpen, setIsNewMemoryOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('Today, 2026');
  const [month, setMonth] = useState('August');
  const [emoji, setEmoji] = useState('🏆');
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0]);
  const [tagsInput, setTagsInput] = useState('Milestone, Growth');

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addMemory({
      title: title.trim(),
      description: description.trim() || 'A proud milestone on the journey of progress.',
      date: date || 'August 2026',
      month: month || 'August',
      emoji: emoji || '⭐',
      imageUrl: selectedImage,
      color: 'from-amber-500/20 to-orange-600/20',
      tags: tags.length ? tags : ['Milestone'],
    });

    setTitle('');
    setDescription('');
    setIsNewMemoryOpen(false);
  };

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Growth Narrative</span>
          </div>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Photo Memory Timeline
          </h2>
          <p className="text-sm text-foreground/60">
            See your progress, not your failures. Every victory documented forever.
          </p>
        </div>

        <Button
          onClick={() => setIsNewMemoryOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          <span>Record Milestone</span>
        </Button>
      </div>

      {/* Timeline Section */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/40 before:to-primary/10">
        {memories.map((mem, idx) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="relative"
          >
            {/* Timeline Marker Dot */}
            <div className="absolute -left-6 sm:-left-10 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md shadow-primary/50" />

            {/* Memory Card */}
            <div className="card-solid p-6 rounded-3xl border border-border/60 hover:border-primary/40 transition-all space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image Thumbnail */}
                {mem.imageUrl && (
                  <div className="w-full md:w-56 h-44 rounded-2xl overflow-hidden bg-card/80 border border-border/40 flex-shrink-0 relative group">
                    <img
                      src={mem.imageUrl}
                      alt={mem.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-xl bg-background/80 backdrop-blur-md flex items-center justify-center text-lg shadow">
                      {mem.emoji}
                    </div>
                  </div>
                )}

                {/* Info & Notes */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-primary uppercase tracking-widest">
                        {mem.month} • {mem.date}
                      </span>
                      <span className="text-2xl md:hidden">{mem.emoji}</span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mt-1 tracking-tight">
                      {mem.title}
                    </h3>

                    <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                      {mem.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    {mem.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-lg bg-foreground/5 border border-border/40 text-foreground/60 text-[11px] font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Record Milestone Modal */}
      {isNewMemoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg card-solid border border-primary/40 shadow-2xl p-6 rounded-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Record Photo Milestone</h3>
              <button
                onClick={() => setIsNewMemoryOpen(false)}
                className="p-1 rounded-lg text-foreground/60 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1">Milestone Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Completed React 19 Refactor"
                  className="w-full px-3.5 py-2 bg-background/60 border border-border/60 rounded-xl text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground/80 mb-1">Date Stamp</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. August 30, 2026"
                    className="w-full px-3 py-2 bg-background/60 border border-border/60 rounded-xl text-xs text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground/80 mb-1">Emoji Badge</label>
                  <input
                    type="text"
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                    className="w-full text-center text-lg px-2 py-1 bg-background/60 border border-border/60 rounded-xl outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1">Reflection Note</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What was the breakthrough or achievement? How do you feel?"
                  className="w-full px-3 py-2 bg-background/60 border border-border/60 rounded-xl text-xs text-foreground outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Preset Image Selector */}
              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1.5">Choose Milestone Image</label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_IMAGES.map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`h-16 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                        selectedImage === imgUrl ? 'border-primary ring-2 ring-primary/40' : 'border-border/40 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="preset" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Design, Milestone, Victory"
                  className="w-full px-3 py-2 bg-background/60 border border-border/60 rounded-xl text-xs text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewMemoryOpen(false)}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20"
                >
                  Save Milestone (+150 XP)
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default MemoryJournalView;
