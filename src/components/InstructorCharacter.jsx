import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Import character images
import thinkingImg from '../assets/characters/thinking.png'
import explainingImg from '../assets/characters/explaining.png'
import confidentImg from '../assets/characters/confident.png'
import pointingImg from '../assets/characters/pointing.png'

const characterImages = {
  thinking: thinkingImg,
  explaining: explainingImg,
  confident: confidentImg,
  pointing: pointingImg
}

const moodLabels = {
  thinking: 'Processing...',
  explaining: 'Teaching',
  confident: 'Great job!',
  pointing: 'Key point!'
}

function InstructorCharacter({ mood = 'explaining', isSpeaking = false }) {
  const currentImage = characterImages[mood] || characterImages.explaining

  return (
    <div className="relative flex flex-col items-center">
      {/* Speech indicator */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-16 bg-instructor-highlight px-4 py-2 rounded-full"
          >
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <motion.div
                  animate={{ scaleY: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="w-1 h-3 bg-white rounded-full"
                />
                <motion.div
                  animate={{ scaleY: [1, 2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                  className="w-1 h-3 bg-white rounded-full"
                />
                <motion.div
                  animate={{ scaleY: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                  className="w-1 h-3 bg-white rounded-full"
                />
              </div>
              <span className="text-white text-sm font-medium">Speaking</span>
            </div>
            {/* Speech bubble tail */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-instructor-highlight" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character container with glow effect */}
      <motion.div
        className={`relative ${isSpeaking ? 'character-glow' : ''}`}
        animate={{
          y: [0, -5, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut'
        }}
      >
        {/* Character image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={mood}
            src={currentImage}
            alt={`Instructor - ${mood}`}
            className="w-64 h-auto object-contain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Mood indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
        >
          <div className="bg-instructor-card border border-instructor-accent px-3 py-1 rounded-full">
            <span className="text-gray-300 text-sm">{moodLabels[mood]}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Name plate */}
      <div className="mt-6 text-center">
        <h3 className="text-white font-bold text-lg">AI Instructor</h3>
        <p className="text-gray-400 text-sm">Claude Code Expert</p>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 -left-8 w-4 h-4 bg-instructor-highlight/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.div
          className="absolute top-20 -right-6 w-3 h-3 bg-blue-500/30 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
        />
      </div>
    </div>
  )
}

export default InstructorCharacter
