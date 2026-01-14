import React from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

function ChatMessage({ message, characterMood }) {
  const isInstructor = message.type === 'instructor'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex ${isInstructor ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isInstructor
            ? 'bg-instructor-card border border-instructor-accent'
            : 'bg-instructor-highlight'
        }`}
      >
        {isInstructor && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-instructor-highlight flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span className="text-instructor-highlight font-medium text-sm">
              Instructor
            </span>
            {characterMood && (
              <span className="text-gray-500 text-xs">
                ({characterMood})
              </span>
            )}
          </div>
        )}

        <div className={`${isInstructor ? 'text-gray-200' : 'text-white'} prose prose-invert max-w-none`}>
          <ReactMarkdown
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                if (inline) {
                  return (
                    <code className="bg-instructor-bg px-1.5 py-0.5 rounded text-instructor-highlight" {...props}>
                      {children}
                    </code>
                  )
                }
                return (
                  <div className="code-block my-3">
                    <code className="text-sm text-gray-300" {...props}>
                      {children}
                    </code>
                  </div>
                )
              },
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
              h3: ({ children }) => <h3 className="text-lg font-bold text-white mb-2">{children}</h3>,
              h4: ({ children }) => <h4 className="text-md font-semibold text-white mb-1">{children}</h4>,
              table: ({ children }) => (
                <div className="overflow-x-auto my-3">
                  <table className="min-w-full divide-y divide-instructor-accent">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-instructor-bg">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-3 py-2 text-sm text-gray-300 border-t border-instructor-accent">
                  {children}
                </td>
              )
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {!isInstructor && (
          <div className="flex justify-end mt-1">
            <span className="text-white/60 text-xs">You</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ChatMessage
