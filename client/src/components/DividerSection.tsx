import React from 'react';
import { motion } from 'framer-motion';

export function DividerSection() {
  return (
    <motion.div
      className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.8 }}
      style={{ originX: 0.5 }}
      viewport={{ once: true }}
    />
  );
}

export default DividerSection;
