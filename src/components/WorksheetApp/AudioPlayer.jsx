import React from 'react';
import { FaPlay, FaPause, FaHeadphones } from 'react-icons/fa';

export default function AudioPlayer({ audioUrl, isPlaying, toggleAudio, audioRef, setIsPlaying }) {
  if (!audioUrl) return null;

  return (
    <div className="bg-slate-900 p-3 rounded-2xl flex items-center gap-3 dir-ltr shadow-md">
      <button 
        onClick={toggleAudio} 
        className="w-10 h-10 shrink-0 bg-blue-500 hover:bg-blue-400 text-white rounded-full flex items-center justify-center text-sm transition-all"
      >
        {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
      </button>
      <div className="flex-1">
        <div className="font-bold text-white text-sm flex items-center gap-2">
          <FaHeadphones className="text-blue-300" /> Audio
        </div>
      </div>
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        onEnded={() => setIsPlaying(false)} 
        className="hidden" 
      />
    </div>
  );
}