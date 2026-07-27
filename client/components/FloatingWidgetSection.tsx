import React from 'react';
import { motion } from 'framer-motion';
import { FloatingWidget } from './FloatingWidget';

export function FloatingWidgetSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-heading text-foreground mb-2">Floating Companion</h2>
          <p className="text-foreground/60">Always-on-top widget for quick task management</p>
        </motion.div>

        {/* Widget Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <FloatingWidget />
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { icon: '📌', title: 'Always On Top', desc: 'Stay focused with the widget always visible' },
            { icon: '🔄', title: 'Resizable', desc: 'Adjust size to fit your workspace' },
            { icon: '⚡', title: 'Quick Add', desc: 'Create tasks without leaving your work' },
            { icon: '📊', title: 'Progress Tracking', desc: 'See today\'s progress at a glance' },
            { icon: '🎯', title: 'Focus Mode', desc: 'Minimize distractions, maximize productivity' },
            { icon: '🔔', title: 'Smart Alerts', desc: 'Get notified about upcoming tasks' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="card-solid p-6 space-y-3"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h4 className="font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-foreground/60 mt-1">{feature.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FloatingWidgetSection;
