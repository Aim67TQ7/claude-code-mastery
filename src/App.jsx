import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InstructorCharacter from './components/InstructorCharacter'
import ChatMessage from './components/ChatMessage'
import QuizComponent from './components/QuizComponent'
import ProgressBar from './components/ProgressBar'
import CourseMenu from './components/CourseMenu'
import { courseData } from './data/courseData'
import { useTextToSpeech } from './hooks/useTextToSpeech'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentModule, setCurrentModule] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [messages, setMessages] = useState([])
  const [characterMood, setCharacterMood] = useState('explaining')
  const [isTyping, setIsTyping] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizScore, setQuizScore] = useState(null)
  const [userInput, setUserInput] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [completedSections, setCompletedSections] = useState([])

  const messagesEndRef = useRef(null)
  const { speak, isSpeaking, setVoiceEnabled, voiceEnabled } = useTextToSpeech()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'instructor',
      content: `Welcome to Claude Code Mastery! I'm your AI instructor, and I'll guide you through mastering Claude Code - from basic file operations to advanced manufacturing automation.

We have 9 comprehensive sections ahead of us. Each includes hands-on exercises, checkpoint quizzes, and real-world manufacturing applications.

Ready to begin? Let's start with the foundations!`,
      mood: 'explaining'
    }

    setMessages([welcomeMessage])
    setCharacterMood('explaining')

    if (voiceEnabled) {
      speak(welcomeMessage.content)
    }
  }, [])

  const addInstructorMessage = (content, mood = 'explaining') => {
    setIsTyping(true)
    setCharacterMood('thinking')

    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        type: 'instructor',
        content,
        mood
      }
      setMessages(prev => [...prev, newMessage])
      setCharacterMood(mood)
      setIsTyping(false)

      if (voiceEnabled) {
        speak(content)
      }
    }, 1000)
  }

  const handleUserResponse = (response) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: response
    }
    setMessages(prev => [...prev, userMessage])
    setUserInput('')

    // Process based on current context
    processUserInput(response)
  }

  const processUserInput = (input) => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes('next') || lowerInput.includes('continue')) {
      advanceLesson()
    } else if (lowerInput.includes('quiz') || lowerInput.includes('test')) {
      setShowQuiz(true)
      setCharacterMood('pointing')
    } else if (lowerInput.includes('help')) {
      addInstructorMessage(
        `Here's what you can do:\n\n- Type "next" or "continue" to advance\n- Type "quiz" to take the checkpoint quiz\n- Type "menu" to see all sections\n- Ask any question about Claude Code!\n\nI'm here to help you master this!`,
        'explaining'
      )
    } else if (lowerInput.includes('menu')) {
      setShowMenu(true)
    } else {
      // Handle as a question
      addInstructorMessage(
        `Great question! Let me explain that in the context of what we're learning.\n\nType "continue" when you're ready to proceed with the lesson, or "quiz" to test your knowledge.`,
        'thinking'
      )
    }
  }

  const advanceLesson = () => {
    const section = courseData[currentSection]
    const module = section?.modules[currentModule]

    if (!module) {
      addInstructorMessage(
        `Congratulations! You've completed all the course content. You're now ready to apply Claude Code to real manufacturing operations!`,
        'confident'
      )
      return
    }

    const step = module.steps[currentStep]

    if (step) {
      addInstructorMessage(step.content, step.mood || 'explaining')
      setCurrentStep(prev => prev + 1)
    } else if (currentModule < section.modules.length - 1) {
      // Move to next module
      setCurrentModule(prev => prev + 1)
      setCurrentStep(0)
      setShowQuiz(true)
      setCharacterMood('pointing')
      addInstructorMessage(
        `Excellent progress! Before we move on, let's check your understanding with a quick quiz.`,
        'pointing'
      )
    } else if (currentSection < courseData.length - 1) {
      // Move to next section
      setCompletedSections(prev => [...prev, currentSection])
      setCurrentSection(prev => prev + 1)
      setCurrentModule(0)
      setCurrentStep(0)
      addInstructorMessage(
        `Outstanding! You've completed Section ${currentSection + 1}. Let's move on to the next section!`,
        'confident'
      )
    }
  }

  const handleQuizComplete = (score, total) => {
    setQuizScore({ score, total })
    setShowQuiz(false)

    const percentage = (score / total) * 100

    if (percentage >= 80) {
      setCharacterMood('confident')
      addInstructorMessage(
        `Excellent! You scored ${score}/${total} (${percentage}%)! You've demonstrated solid understanding. Let's continue!`,
        'confident'
      )
    } else {
      setCharacterMood('thinking')
      addInstructorMessage(
        `You scored ${score}/${total} (${percentage}%). Let's review the material and try again. Remember, you need 80% to pass.`,
        'thinking'
      )
    }
  }

  const jumpToSection = (sectionIndex) => {
    setCurrentSection(sectionIndex)
    setCurrentModule(0)
    setCurrentStep(0)
    setShowMenu(false)

    const section = courseData[sectionIndex]
    addInstructorMessage(
      `Let's dive into Section ${sectionIndex + 1}: ${section.title}\n\n${section.description}`,
      'explaining'
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-instructor-card/80 backdrop-blur-sm border-b border-instructor-accent p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-instructor-highlight flex items-center justify-center">
              <span className="text-white font-bold">CC</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Claude Code Mastery</h1>
              <p className="text-gray-400 text-sm">
                Section {currentSection + 1} of {courseData.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-lg transition ${
                voiceEnabled ? 'bg-instructor-highlight' : 'bg-instructor-accent'
              }`}
            >
              {voiceEnabled ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z"/>
                  <path d="M14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              )}
            </button>

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="px-4 py-2 bg-instructor-accent hover:bg-instructor-highlight transition rounded-lg text-white text-sm font-medium"
            >
              Course Menu
            </button>
          </div>
        </div>

        <ProgressBar
          currentSection={currentSection}
          totalSections={courseData.length}
          completedSections={completedSections}
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto p-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            <AnimatePresence>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  characterMood={message.mood}
                />
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-gray-400"
              >
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-instructor-highlight rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-instructor-highlight rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-instructor-highlight rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>Instructor is typing...</span>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quiz Modal */}
          {showQuiz && (
            <QuizComponent
              section={currentSection}
              module={currentModule}
              onComplete={handleQuizComplete}
              onClose={() => setShowQuiz(false)}
            />
          )}

          {/* Input Area */}
          <div className="bg-instructor-card rounded-xl p-4 border border-instructor-accent">
            <div className="flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && userInput.trim() && handleUserResponse(userInput)}
                placeholder="Type 'continue', 'quiz', 'help', or ask a question..."
                className="flex-1 bg-instructor-bg rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-instructor-highlight"
              />
              <button
                onClick={() => userInput.trim() && handleUserResponse(userInput)}
                className="px-6 py-3 bg-instructor-highlight hover:bg-red-600 transition rounded-lg text-white font-medium"
              >
                Send
              </button>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleUserResponse('continue')}
                className="px-4 py-2 bg-instructor-accent hover:bg-instructor-highlight transition rounded-lg text-white text-sm"
              >
                Continue
              </button>
              <button
                onClick={() => setShowQuiz(true)}
                className="px-4 py-2 bg-instructor-accent hover:bg-instructor-highlight transition rounded-lg text-white text-sm"
              >
                Take Quiz
              </button>
              <button
                onClick={() => handleUserResponse('help')}
                className="px-4 py-2 bg-instructor-accent hover:bg-instructor-highlight transition rounded-lg text-white text-sm"
              >
                Help
              </button>
            </div>
          </div>
        </div>

        {/* Character Panel */}
        <div className="hidden lg:flex w-80 flex-col items-center justify-center p-4">
          <InstructorCharacter mood={characterMood} isSpeaking={isSpeaking} />
        </div>
      </main>

      {/* Course Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <CourseMenu
            sections={courseData}
            currentSection={currentSection}
            completedSections={completedSections}
            onSelectSection={jumpToSection}
            onClose={() => setShowMenu(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
