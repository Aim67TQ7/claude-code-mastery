import { useState, useCallback, useRef } from 'react'

// ElevenLabs API configuration
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech'

// Default to a professional male voice - you can change this voice ID
const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM' // Rachel - clear, professional

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [error, setError] = useState(null)
  const audioRef = useRef(null)
  const abortControllerRef = useRef(null)

  // Get API key from localStorage or environment
  const getApiKey = () => {
    return localStorage.getItem('elevenlabs_api_key') || import.meta.env.VITE_ELEVENLABS_API_KEY
  }

  const speak = useCallback(async (text, voiceId = DEFAULT_VOICE_ID) => {
    const apiKey = getApiKey()

    // If no API key, fall back to browser speech synthesis
    if (!apiKey) {
      return speakWithBrowserTTS(text)
    }

    // Cancel any ongoing speech
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    try {
      setIsSpeaking(true)
      setError(null)

      const response = await fetch(`${ELEVENLABS_API_URL}/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: text.substring(0, 5000), // ElevenLabs has a character limit
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`)
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      // Play the audio
      if (audioRef.current) {
        audioRef.current.pause()
      }

      const audio = new Audio(audioUrl)
      audioRef.current = audio

      audio.onended = () => {
        setIsSpeaking(false)
        URL.revokeObjectURL(audioUrl)
      }

      audio.onerror = () => {
        setIsSpeaking(false)
        setError('Audio playback failed')
      }

      await audio.play()

    } catch (err) {
      if (err.name === 'AbortError') {
        // Cancelled, not an error
        return
      }

      console.error('ElevenLabs TTS error:', err)
      setError(err.message)
      setIsSpeaking(false)

      // Fall back to browser TTS
      speakWithBrowserTTS(text)
    }
  }, [])

  // Fallback to browser's built-in speech synthesis
  const speakWithBrowserTTS = useCallback((text) => {
    if (!window.speechSynthesis) {
      setError('Speech synthesis not supported')
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0

    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(voice =>
      voice.name.includes('Google') ||
      voice.name.includes('Microsoft') ||
      voice.lang.startsWith('en')
    )

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => {
      setIsSpeaking(false)
      setError('Speech synthesis error')
    }

    window.speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    // Stop ElevenLabs audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    // Abort any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Stop browser TTS
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }

    setIsSpeaking(false)
  }, [])

  const setApiKey = useCallback((key) => {
    localStorage.setItem('elevenlabs_api_key', key)
  }, [])

  return {
    speak,
    stop,
    isSpeaking,
    voiceEnabled,
    setVoiceEnabled,
    error,
    setApiKey
  }
}
