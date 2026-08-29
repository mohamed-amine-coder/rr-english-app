import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaHeadphones, FaCheckCircle, FaBookOpen } from 'react-icons/fa';

export default function EnglishWorksheet() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const dialogueLines = [
    { speaker: "A", text: "Hello! Can I help you?" },
    { speaker: "B", text: "Hi. I want a cup of coffee, please." },
    { speaker: "A", text: "Sure. Do you want something to eat?" },
    { speaker: "B", text: "Yes, a piece of chocolate cake." },
    { speaker: "A", text: "Coming right up!" }
  ];

  const questions = [
    "1. Where are the two speakers?",
    "2. What does speaker B want to drink?",
    "3. Does speaker B want something to eat?",
    "4. What food did speaker B order?",
    "5. Is speaker A polite in the conversation?",
    "6. How does speaker A reply at the end?",
    "7. What time of the day do you think this is?",
    "8. Translate the first sentence into Arabic.",
    "9. Give another way to say 'Can I help you?'",
    "10. Write a short sentence to thank speaker A."
  ];

  const handleInputChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh', padding: '20px', direction: 'rtl' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#fff', padding: '15px 25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#e8f5e9', color: '#2e7d32', padding: '6px 15px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
          <FaHeadphones /> تمرين استماع وتفاعل
        </div>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a237e' }}>
          RR ENGLISH 🎓
        </div>
      </div>

      {/* Main Container */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        
        {/* Left Column: Dialogue & Questions */}
        <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#1a237e', marginBottom: '10px' }}>شنو سمعتي فالحوار؟</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>اقرأ الديالوغ مزيان وجاوب على الأسئلة تحته:</p>

          {/* Dialogue Box */}
          <div style={{ background: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', marginBottom: '25px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaBookOpen color="#2e7d32" /> النص ديال الحوار (Dialogue):
            </h4>
            {dialogueLines.map((line, index) => (
              <motion.div 
                whileHover={{ scale: 1.01 }}
                key={index} 
                style={{ marginBottom: '8px', fontSize: '15px', direction: 'ltr', textAlign: 'left', padding: '6px 10px', background: '#fff', borderRadius: '6px', border: '1px solid #eee' }}
              >
                <strong style={{ color: '#2e7d32' }}>Speaker {line.speaker}:</strong> {line.text}
              </motion.div>
            ))}
          </div>

          {/* 10 Questions without answers (Text inputs) */}
          <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '15px' }}>✏️ الأسئلة (10 أسئلة):</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions.map((q, index) => (
              <div key={index} style={{ padding: '12px', background: '#fdfdfd', border: '1px solid #eee', borderRadius: '8px', direction: 'ltr', textAlign: 'left' }}>
                <div style={{ fontSize: '14px', color: '#333', marginBottom: '8px', fontWeight: '500' }}>
                  {q}
                </div>
                <input 
                  type="text" 
                  placeholder="Type your answer here..."
                  value={answers[index] || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', outline: 'none' }}
                />
              </div>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={{ marginTop: '20px', width: '100%', padding: '12px', background: '#2e7d32', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {submitted ? "تم إرسال الاجوبة بنجاح! 🎉" : "إرسال الاجوبة"}
          </motion.button>
        </div>

        {/* Right Column: Audio Notification & Image Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Illustration Box */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', border: '2px dashed #c8e6c9' }}>
            <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f8e9', borderRadius: '8px', color: '#558b2f', fontSize: '15px', fontWeight: 'bold' }}>
              [صورة توضيحية للديالوغ]
            </div>
          </div>

          {/* Audio Notification Box */}
          <motion.div 
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}
          >
            <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '15px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <FaHeadphones size={20} /> الصوت كاين فالمنصة دخل سمعو دبا
            </div>
            <p style={{ color: '#777', fontSize: '13px', marginTop: '10px' }}>
              سمع للحوار اللي دار فالمقهى وجاوب على الأسئلة.
            </p>
          </motion.div>

        </div>

      </form>
    </motion.div>
  );
}