import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
  {
    category: 'Desktop',
    items: ['Tauri v2', 'Rust Backend', 'Secure & Fast'],
  },
  {
    category: 'Frontend',
    items: ['React 19', 'TypeScript', 'Vite'],
  },
  {
    category: 'UI & Animation',
    items: ['shadcn/ui', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js'],
  },
  {
    category: 'State & Data',
    items: ['Zustand', 'TanStack Query', 'React Hook Form'],
  },
  {
    category: 'Backend',
    items: ['Supabase', 'PostgreSQL', 'Real-time Sync'],
  },
  {
    category: 'Auth & Storage',
    items: ['Clerk', 'Google OAuth', 'S3 Storage'],
  },
];

const features = [
  { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized performance with Tauri' },
  { icon: '🎮', title: 'Gamified', desc: 'XP, levels, achievements, streaks' },
  { icon: '📱', title: 'Desktop First', desc: 'Native app with floating widget' },
  { icon: '🔔', title: 'Smart Notifications', desc: 'Native alerts with custom sounds' },
  { icon: '🎨', title: 'Beautiful UI', desc: 'Premium design with smooth animations' },
  { icon: '🔐', title: 'Secure', desc: 'End-to-end encrypted sync' },
];

export function TechStackSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-heading text-foreground mb-2">Built with Modern Tech</h2>
          <p className="text-foreground/60">Cutting-edge stack for performance and reliability</p>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.map((stack, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="card-solid p-6 space-y-4"
              whileHover={{ y: -4 }}
            >
              <h3 className="text-lg font-bold text-primary">{stack.category}</h3>
              <ul className="space-y-2">
                {stack.items.map((item, itemIdx) => (
                  <motion.li
                    key={itemIdx}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: itemIdx * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h3 className="text-subheading text-foreground text-center">Key Features</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="card-solid p-6 text-center space-y-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl">{feature.icon}</div>
                <h4 className="font-semibold text-foreground">{feature.title}</h4>
                <p className="text-sm text-foreground/60">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Productivity Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h3 className="text-subheading text-foreground text-center">Productivity Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Task Priority',
              'Subtasks',
              'Recurring Tasks',
              'Pomodoro Timer',
              'Calendar View',
              'Drag & Drop',
              'Keyboard Shortcuts',
              'Smart Search',
              'Tags & Categories',
              'Attachments',
              'Markdown Notes',
              'Smart Alarm',
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="p-4 rounded-lg card-solid text-center text-sm font-medium text-foreground/80"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, color: '#f5a623' }}
              >
                {feature}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Folder Structure */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-subheading text-foreground text-center">Project Structure</h3>
          <div className="card-solid p-6 overflow-x-auto">
            <pre className="text-xs text-foreground/70 font-mono">
{`clock-in/
├── apps/
│   ├── desktop/          # Tauri app
│   └── landing/          # Marketing site
├── packages/
│   ├── ui/               # Shared components
│   ├── animations/       # Animation utils
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Helpers
│   ├── icons/            # Icon library
│   └── types/            # TypeScript types
├── supabase/             # Backend config
├── tests/                # Test suite
├── docs/                 # Documentation
└── scripts/              # Build scripts`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TechStackSection;
