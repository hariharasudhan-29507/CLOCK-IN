import React from 'react';
import { motion } from 'framer-motion';
import { TaskDemo } from './TaskDemo';

export function TaskDemoSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-heading text-foreground mb-2">Task Completion</h2>
          <p className="text-foreground/60">Click a task to complete it and earn XP</p>
        </motion.div>

        {/* Task Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <TaskDemo />
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-subheading text-foreground text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Create Task', desc: 'Add tasks with priority and deadlines' },
              { step: '2', title: 'Focus & Work', desc: 'Use Pomodoro timer to stay focused' },
              { step: '3', title: 'Complete', desc: 'Mark task done and earn XP instantly' },
              { step: '4', title: 'Level Up', desc: 'Unlock rewards and cosmetics' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="card-solid p-6 text-center space-y-3"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <span className="font-bold text-primary">{item.step}</span>
                </div>
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-foreground/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TaskDemoSection;
