import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizData } from '../data/quizData'

function QuizComponent({ section, module, onComplete, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const quiz = quizData[section]?.questions || []
  const question = quiz[currentQuestion]

  const handleSelectAnswer = (index) => {
    setSelectedAnswer(index)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === question.correct
    setAnswers([...answers, { selected: selectedAnswer, correct: question.correct, isCorrect }])
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    setShowExplanation(false)

    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      // Calculate score
      const correctCount = answers.filter(a => a.isCorrect).length + (selectedAnswer === question.correct ? 1 : 0)
      setShowResult(true)
      onComplete(correctCount, quiz.length)
    }
  }

  if (!question) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div className="bg-instructor-card p-8 rounded-2xl max-w-lg text-center" onClick={e => e.stopPropagation()}>
          <p className="text-white text-lg">No quiz available for this section yet.</p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-instructor-highlight rounded-lg text-white"
          >
            Close
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-instructor-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-instructor-accent p-4 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">Checkpoint Quiz</h2>
            <p className="text-gray-400 text-sm">Section {section + 1} - Question {currentQuestion + 1} of {quiz.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-gray-400 text-xs">Pass threshold</p>
              <p className="text-instructor-highlight font-bold">80%</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-instructor-bg">
          <motion.div
            className="h-full bg-instructor-highlight"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="p-6">
          <h3 className="text-white text-xl font-medium mb-6">{question.question}</h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = showExplanation && index === question.correct
              const isWrong = showExplanation && isSelected && index !== question.correct

              return (
                <motion.button
                  key={index}
                  onClick={() => !showExplanation && handleSelectAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-xl border-2 transition ${
                    isCorrect
                      ? 'border-green-500 bg-green-500/20'
                      : isWrong
                      ? 'border-red-500 bg-red-500/20'
                      : isSelected
                      ? 'border-instructor-highlight bg-instructor-highlight/20'
                      : 'border-instructor-accent hover:border-instructor-highlight'
                  }`}
                  whileHover={!showExplanation ? { scale: 1.02 } : {}}
                  whileTap={!showExplanation ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCorrect
                        ? 'bg-green-500 text-white'
                        : isWrong
                        ? 'bg-red-500 text-white'
                        : isSelected
                        ? 'bg-instructor-highlight text-white'
                        : 'bg-instructor-accent text-gray-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-white">{option}</span>
                    {isCorrect && (
                      <svg className="w-5 h-5 text-green-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {isWrong && (
                      <svg className="w-5 h-5 text-red-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && question.explanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-instructor-bg rounded-xl border border-instructor-accent"
              >
                <h4 className="text-instructor-highlight font-medium mb-2">Explanation</h4>
                <p className="text-gray-300">{question.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`px-6 py-3 rounded-xl font-medium transition ${
                  selectedAnswer === null
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-instructor-highlight hover:bg-red-600 text-white'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-instructor-highlight hover:bg-red-600 text-white rounded-xl font-medium transition"
              >
                {currentQuestion < quiz.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default QuizComponent
