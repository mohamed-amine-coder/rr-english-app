import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import AudioPlayer from './AudioPlayer'
import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FaPlay,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaArrowRight,
  FaFileAlt,
} from 'react-icons/fa'

function parseVocabulary(vocabStr = '') {
  return vocabStr
    .split(',')
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const [left, right] = pair.split('=').map((s) => s && s.trim())
      return { word: left || pair, translation: right || '' }
    })
}

function WorksheetPaper({ worksheet }) {
  // Placeholder — user will replace with full implementation.
  return (
    <div className="p-6 bg-white rounded shadow text-gray-700">
      <h2 className="text-xl font-semibold">ورقة للطباعة: {worksheet?.title}</h2>
      <p className="mt-2 text-sm text-gray-500">مكوّن الورقة هنا (Paper View)</p>
    </div>
  )
}

function ReadingSection({ worksheet }) {
  return (
    <div className="space-y-4">
      {worksheet.image_url && (
        <img src={worksheet.image_url} alt="illustration" className="w-full rounded-lg shadow-md" />
      )}
      {worksheet.audio_url && <AudioPlayer src={worksheet.audio_url} />}
      <div className="prose prose-lg" dir="rtl" style={{ unicodeBidi: 'plaintext' }}>
        <div dangerouslySetInnerHTML={{ __html: worksheet.reading }} />
      </div>
    </div>
  )
}

function VocabSection({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((v, i) => (
        <div key={i} className="p-4 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold" dir="ltr" style={{ unicodeBidi: 'plaintext' }}>{v.word}</div>
            <div className="text-amber-600 font-semibold">{v.translation}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function VocabQuiz({ items, onComplete }) {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(null)

  const quizItems = useMemo(() => {
    const translations = items.map((i) => i.translation)
    return items.map((it) => {
      const choices = new Set()
      choices.add(it.translation)
      while (choices.size < Math.min(4, items.length)) {
        const candidate = translations[Math.floor(Math.random() * translations.length)]
        choices.add(candidate)
      }
      const arr = Array.from(choices).sort(() => Math.random() - 0.5)
      return { prompt: it.word, choices: arr, answer: arr.indexOf(it.translation) }
    })
  }, [items])

  const cur = quizItems[idx]

  function choose(i) {
    setSelected(i)
    setCorrect(i === cur.answer)
  }

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">اختر الترجمة الصحيحة لـ</div>
      <div className="p-4 bg-white rounded shadow">{cur.prompt}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cur.choices.map((c, i) => (
          <button
            key={i}
            onClick={() => choose(i)}
            className={`p-3 rounded-lg text-right border ${selected===i? (correct? 'bg-emerald-100 border-emerald-400':'bg-rose-100 border-rose-400') : 'bg-white hover:bg-gray-50'}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <div />
        <button
          onClick={() => {
            setSelected(null)
            setCorrect(null)
            if (idx + 1 < quizItems.length) setIdx(idx + 1)
            else onComplete()
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow"
        >
          التالي
        </button>
      </div>
    </div>
  )
}

function QuestionsQuiz({ questions, onComplete }) {
  const [i, setI] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const cur = questions[i]

  function choose(idx) {
    setSelected(idx)
    setShowExplanation(true)
  }

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">سؤال {i + 1} من {questions.length}</div>
      <div className="p-4 bg-white rounded shadow" dir="rtl">{cur.question}</div>
      <div className="grid grid-cols-1 gap-3">
        {cur.options.map((opt, idxOpt) => {
          const isCorrect = selected === idxOpt && idxOpt === cur.correctAnswer
          const isWrong = selected === idxOpt && idxOpt !== cur.correctAnswer
          return (
            <button
              key={idxOpt}
              onClick={() => choose(idxOpt)}
              className={`p-3 rounded-lg text-right border ${isCorrect? 'bg-emerald-100 border-emerald-400' : isWrong? 'bg-rose-100 border-rose-400' : 'bg-white hover:bg-gray-50'}`}
            >
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                <span>
                  {selected === idxOpt && (isCorrect ? <FaCheckCircle className="text-emerald-600"/> : <FaTimesCircle className="text-rose-600"/>)}
                </span>
              </div>
            </button>
          )
        })}
      </div>
      {showExplanation && (
        <div className="p-3 bg-yellow-50 rounded text-sm">{cur.explanation_darija}</div>
      )}
      <div className="flex justify-between">
        <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => { if (i>0){ setI(i-1); setSelected(null); setShowExplanation(false)} }}>
          <FaArrowLeft />
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => {
            setSelected(null)
            setShowExplanation(false)
            if (i + 1 < questions.length) setI(i + 1)
            else onComplete()
          }}
        >
          التالي
        </button>
      </div>
    </div>
  )
}

function PracticeSection({ practice, onComplete }) {
  const [i, setI] = useState(0)
  const [selected, setSelected] = useState(null)
  const cur = practice[i]

  function choose(idx) {
    setSelected(idx)
  }

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">تدريب {i + 1} من {practice.length}</div>
      <div className="p-4 bg-white rounded shadow">{cur.sentence.replace('___', '_____')}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cur.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => choose(idx)}
            className={`p-3 rounded-lg text-right border ${selected===idx? (idx===cur.correctIndex? 'bg-emerald-100 border-emerald-400':'bg-rose-100 border-rose-400') : 'bg-white hover:bg-gray-50'}`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <div />
        <button
          onClick={() => {
            setSelected(null)
            if (i + 1 < practice.length) setI(i + 1)
            else onComplete()
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          التالي
        </button>
      </div>
    </div>
  )
}

export default function WorksheetApp() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth() || {}
  const [worksheet, setWorksheet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState('interactive')
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    if (!slug) return
    let mounted = true
    setLoading(true)
    ;(async () => {
      // try slug, then id
      let { data, error } = await supabase.from('worksheets').select('*').eq('slug', slug).single()
      if (error || !data) {
        const res = await supabase.from('worksheets').select('*').eq('id', slug).single()
        data = res.data
        error = res.error
      }
      if (mounted) {
        setWorksheet(data)
        setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [slug])

  const vocabItems = useMemo(() => parseVocabulary(worksheet?.vocabulary), [worksheet])

  function next() { setCurrentStep((s) => s + 1) }
  function prev() { setCurrentStep((s) => Math.max(1, s - 1)) }

  async function handleComplete() {
    // play confetti
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.3 } })

    // save progress
    try {
      if (!user || !worksheet) return
      await supabase.from('worksheet_progress').insert([{ user_id: user.id, worksheet_id: worksheet.id, progress: 100, xp: 40 }])
    } catch (e) {
      console.warn('Failed to save progress', e)
    }
  }

  if (loading) return <div className="p-6">جارٍ التحميل...</div>
  if (!worksheet) return <div className="p-6">لم يتم العثور على الورقة. الرجاء التحقق.</div>

  return (
    <div dir="rtl" className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white shadow">
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-bold">{worksheet.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode(mode === 'paper' ? 'interactive' : 'paper')}
            className="px-3 py-2 bg-white border rounded shadow flex items-center gap-2"
          >
            <FaFileAlt /> {mode === 'paper' ? 'عرض تفاعلي' : 'عرض للطباعة'}
          </button>
        </div>
      </div>

      {mode === 'paper' ? (
        <WorksheetPaper worksheet={worksheet} />
      ) : (
        <div className="bg-gradient-to-br from-sky-50 to-emerald-50 p-6 rounded-xl shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">المرحلة {currentStep}/6</div>
              <div className="text-xs text-gray-500">اعمل على المهام للحصول على نقاط خبرة</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentStep(1)} className="px-3 py-1 bg-white rounded">ابدأ من جديد</button>
              <div className="px-3 py-1 bg-white rounded">+40 XP</div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-4">
                <ReadingSection worksheet={worksheet} />
                <div className="flex justify-between">
                  <div />
                  <button onClick={next} className="px-4 py-2 bg-blue-600 text-white rounded">التالي <FaArrowRight className="inline ml-2"/></button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-4">
                <VocabSection items={vocabItems} />
                <div className="flex justify-between">
                  <button onClick={prev} className="px-4 py-2 bg-gray-200 rounded"><FaArrowLeft/></button>
                  <button onClick={next} className="px-4 py-2 bg-blue-600 text-white rounded">اختبار المفردات</button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-4">
                <VocabQuiz items={vocabItems} onComplete={next} />
                <div className="flex justify-between">
                  <button onClick={prev} className="px-4 py-2 bg-gray-200 rounded"><FaArrowLeft/></button>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-4">
                <QuestionsQuiz questions={worksheet.questions || []} onComplete={next} />
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-4">
                <PracticeSection practice={worksheet.practice || []} onComplete={() => { next(); handleComplete(); }} />
              </motion.div>
            )}

            {currentStep === 6 && (
              <motion.div key="s6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-4 text-center">
                <div className="p-6 bg-white rounded shadow">
                  <h2 className="text-2xl font-bold">ممتاز! لقد أكملت الورقة</h2>
                  <p className="mt-2 text-lg text-emerald-600">+40 XP</p>
                  <p className="mt-2 text-sm text-gray-500">تم حفظ التقدم إلى حسابك</p>
                </div>
                <div className="flex justify-center gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => { setCurrentStep(1); }}>أعد المحاولة</button>
                  <button className="px-4 py-2 bg-white border rounded" onClick={() => navigate(-1)}>العودة</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
