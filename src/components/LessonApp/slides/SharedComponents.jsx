import React from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp } from 'react-icons/fa';

export const playAudio = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }
};

export const AudioButton = ({ text }) => (
  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => playAudio(text)} className="mb-4 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white border-b-[3px] border-sky-700 rounded-xl flex items-center gap-2 text-sm font-extrabold shadow-sm transition-all w-fit active:border-b-0 active:translate-y-1">
    <FaVolumeUp className="text-base" /><span>النطق 🔊</span>
  </motion.button>
);
