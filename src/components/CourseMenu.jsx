import React from 'react'
import { motion } from 'framer-motion'

function CourseMenu({ sections, currentSection, completedSections, onSelectSection, onClose }) {
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
        exit={{ scale: 0.9, y: 20 }}
        className="bg-instructor-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-instructor-accent p-6 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-2xl">Course Sections</h2>
            <p className="text-gray-400">9 Sections - Beginner to Manufacturing Expert</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sections grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid md:grid-cols-3 gap-4">
            {sections.map((section, index) => {
              const isCompleted = completedSections.includes(index)
              const isCurrent = index === currentSection
              const isLocked = index > currentSection && !completedSections.includes(index - 1)

              return (
                <motion.button
                  key={index}
                  onClick={() => !isLocked && onSelectSection(index)}
                  disabled={isLocked}
                  className={`p-4 rounded-xl text-left transition border-2 ${
                    isCurrent
                      ? 'border-instructor-highlight bg-instructor-highlight/20'
                      : isCompleted
                      ? 'border-green-500 bg-green-500/10'
                      : isLocked
                      ? 'border-gray-700 bg-gray-900/50 opacity-50 cursor-not-allowed'
                      : 'border-instructor-accent hover:border-instructor-highlight'
                  }`}
                  whileHover={!isLocked ? { scale: 1.02 } : {}}
                  whileTap={!isLocked ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-instructor-highlight text-white'
                        : isLocked
                        ? 'bg-gray-700 text-gray-500'
                        : 'bg-instructor-accent text-gray-300'
                    }`}>
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : isLocked ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className={`font-bold ${isLocked ? 'text-gray-500' : 'text-white'}`}>
                        {section.title}
                      </h3>
                      <p className={`text-sm mt-1 ${isLocked ? 'text-gray-600' : 'text-gray-400'}`}>
                        {section.description}
                      </p>

                      {/* Status badge */}
                      <div className="mt-2">
                        {isCurrent && (
                          <span className="text-xs px-2 py-1 bg-instructor-highlight rounded-full text-white">
                            In Progress
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-xs px-2 py-1 bg-green-500/20 rounded-full text-green-400">
                            Completed
                          </span>
                        )}
                        {isLocked && (
                          <span className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-500">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Footer with stats */}
        <div className="bg-instructor-bg p-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-gray-400">Completed:</span>
              <span className="text-green-400 font-bold ml-2">{completedSections.length}/{sections.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Current:</span>
              <span className="text-instructor-highlight font-bold ml-2">Section {currentSection + 1}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-instructor-accent hover:bg-instructor-highlight transition rounded-lg text-white"
          >
            Continue Learning
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CourseMenu
