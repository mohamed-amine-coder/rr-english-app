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
  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} onClick={() => playAudio(text)} className="mb-4 px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white border-b-4 border-sky-600 rounded-2xl flex items-center gap-2 text-sm font-extrabold shadow-sm transition w-fit">
    <FaVolumeUp className="text-base" /><span>النطق 🔊</span>
  </motion.button>
);
