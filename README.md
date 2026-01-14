# Claude Code Mastery

An interactive learning platform for mastering Claude Code, featuring an animated AI instructor with text-to-speech capabilities.

## Features

- **9 Comprehensive Sections** - From basics to manufacturing automation
- **Animated Instructor** - Character with 4 expression states (thinking, explaining, confident, pointing)
- **Text-to-Speech** - ElevenLabs integration with browser fallback
- **Interactive Quizzes** - Checkpoint assessments with 80% pass threshold
- **Progress Tracking** - Visual progress bar and section completion
- **Manufacturing Focus** - Real-world ERP and operations applications

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Voice Configuration

### Option 1: Browser TTS (Free)
Works out of the box using Web Speech API.

### Option 2: ElevenLabs (Premium Quality)
1. Get API key from [ElevenLabs](https://elevenlabs.io)
2. Add to environment: `VITE_ELEVENLABS_API_KEY=your_key_here`
3. Or set in browser localStorage: `elevenlabs_api_key`

## Project Structure

```
claude-code-mastery/
├── src/
│   ├── assets/
│   │   └── characters/     # Instructor PNG sprites
│   ├── components/
│   │   ├── InstructorCharacter.jsx
│   │   ├── ChatMessage.jsx
│   │   ├── QuizComponent.jsx
│   │   ├── ProgressBar.jsx
│   │   └── CourseMenu.jsx
│   ├── data/
│   │   ├── courseData.js   # 9 sections with modules
│   │   └── quizData.js     # Checkpoint quizzes
│   ├── hooks/
│   │   └── useTextToSpeech.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Curriculum Sections

1. **Foundations** - Installation, first commands, architecture
2. **Reading & Searching** - Glob, Grep, Read tools
3. **Writing & Editing** - Write, Edit, NotebookEdit
4. **Bash & System** - Commands, Git, background execution
5. **Task Management** - TodoWrite, plan mode
6. **Agents** - Parallel execution, orchestration patterns
7. **Web & External** - WebSearch, WebFetch, MCP
8. **Advanced Patterns** - Hooks, skills, workflows
9. **Manufacturing** - ERP, quality control, predictive maintenance

## Deployment

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Manual
```bash
npm run build
npm run preview
```

## Character States

| State | Image | Use Case |
|-------|-------|----------|
| thinking | thinking.png | Processing, loading |
| explaining | explaining.png | Teaching concepts |
| confident | confident.png | Encouragement, success |
| pointing | pointing.png | Key points, alerts |

## License

Private - n0v8v AI Advisory
