import React from 'react'
import { motion } from 'framer-motion'

function ProgressBar({ currentSection, totalSections, completedSections }) {
  const progress = ((currentSection + 1) / totalSections) * 100

  return (
    <div className="mt-4">
      {/* Section indicators */}
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSections }).map((_, index) => {
          const isCompleted = completedSections.includes(index)
          const isCurrent = index === currentSection
          const isPast = index < currentSection

          return (
            <div key={index} className="flex items-center">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  isCompleted || isPast
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-instructor-highlight text-white'
                    : 'bg-instructor-accent text-gray-400'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
              >
                {isCompleted || isPast ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </motion.div>

              {/* Connector line */}
              {index < totalSections - 1 && (
                <div className="flex-1 h-0.5 mx-1 bg-instructor-accent">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: '0%' }}
                    animate={{
                      width: isPast || isCompleted ? '100%' : isCurrent ? '50%' : '0%'
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-instructor-accent rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-instructor-highlight to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Progress text */}
      <div className="flex justify-between mt-1 text-xs text-gray-400">
        <span>{Math.round(progress)}% complete</span>
        <span>{completedSections.length} of {totalSections} sections completed</span>
      </div>
    </div>
  )
}

export default ProgressBar
