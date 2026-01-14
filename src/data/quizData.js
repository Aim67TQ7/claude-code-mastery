export const quizData = [
  // Section 1: Foundations
  {
    section: 1,
    title: "Foundations Quiz",
    passingScore: 0.67,
    questions: [
      {
        question: "What is Claude Code's primary purpose?",
        options: [
          "Web browsing only",
          "Software engineering tasks via CLI",
          "Image generation",
          "Email management"
        ],
        correct: 1,
        explanation: "Claude Code is Anthropic's official CLI tool that brings Claude's AI capabilities directly to your terminal for software engineering tasks."
      },
      {
        question: "Which command starts an interactive Claude session?",
        options: [
          "claude start",
          "claude --interactive",
          "claude",
          "start-claude"
        ],
        correct: 2,
        explanation: "Simply typing 'claude' in your terminal starts an interactive session."
      },
      {
        question: "What does CLAUDE.md configure?",
        options: [
          "User preferences",
          "Project-specific behavior",
          "System settings",
          "Network connections"
        ],
        correct: 1,
        explanation: "CLAUDE.md files define project-specific behavior, including coding conventions, quality requirements, and special instructions."
      }
    ]
  },

  // Section 2: Reading & Searching
  {
    section: 2,
    title: "Reading & Searching Quiz",
    passingScore: 0.8,
    questions: [
      {
        question: "Which tool finds files by name pattern?",
        options: [
          "Read",
          "Grep",
          "Glob",
          "Bash find"
        ],
        correct: 2,
        explanation: "Glob is designed for fast file pattern matching using patterns like **/*.py or src/**/*.ts."
      },
      {
        question: "Grep's default output mode returns:",
        options: [
          "Full file contents",
          "Matching lines with context",
          "File paths only",
          "Match counts"
        ],
        correct: 2,
        explanation: "The default output mode 'files_with_matches' returns just the file paths containing matches."
      },
      {
        question: "To search for 'TODO' case-insensitively, use:",
        options: [
          "Grep with pattern 'TODO'",
          "Grep with -i: true",
          "Glob with TODO pattern",
          "Read with search parameter"
        ],
        correct: 1,
        explanation: "The -i parameter enables case-insensitive searching in Grep."
      },
      {
        question: "The Read tool can process which formats?",
        options: [
          "Text files only",
          "Text and images",
          "Text, images, PDFs, and Jupyter notebooks",
          "Binary files only"
        ],
        correct: 2,
        explanation: "Read tool is versatile - it handles text files, images (with visual analysis), PDFs, and Jupyter notebooks."
      }
    ]
  },

  // Section 3: Writing & Editing
  {
    section: 3,
    title: "Writing & Editing Quiz",
    passingScore: 0.75,
    questions: [
      {
        question: "What must you do BEFORE using the Edit tool?",
        options: [
          "Run tests",
          "Read the file",
          "Create a backup",
          "Close the file"
        ],
        correct: 1,
        explanation: "You must read a file before editing it to understand the context and ensure accurate modifications."
      },
      {
        question: "Edit's old_string parameter must be:",
        options: [
          "Any valid regex",
          "Unique in the file (unless replace_all)",
          "At least 10 characters",
          "On a single line"
        ],
        correct: 1,
        explanation: "The old_string must match exactly once in the file to avoid ambiguous edits, unless replace_all is true."
      },
      {
        question: "To rename 'customerID' to 'customerId' everywhere:",
        options: [
          "Edit with replace_all: true",
          "Multiple separate Edit calls",
          "Write tool to rewrite file",
          "Bash sed command"
        ],
        correct: 0,
        explanation: "Use Edit with replace_all: true to rename all occurrences efficiently."
      },
      {
        question: "When should you use Write instead of Edit?",
        options: [
          "Creating new files",
          "Making small changes",
          "Renaming variables",
          "Adding imports"
        ],
        correct: 0,
        explanation: "Write is for creating new files or completely replacing content. Edit is for targeted modifications."
      }
    ]
  },

  // Section 4: Bash & System
  {
    section: 4,
    title: "Bash & System Quiz",
    passingScore: 0.75,
    questions: [
      {
        question: "Default Bash timeout is:",
        options: [
          "30 seconds",
          "60 seconds",
          "120 seconds",
          "No limit"
        ],
        correct: 2,
        explanation: "The default timeout is 120 seconds (2 minutes), with a maximum of 600 seconds (10 minutes)."
      },
      {
        question: "Which git operation is RESTRICTED by default?",
        options: [
          "git status",
          "git push --force",
          "git log",
          "git diff"
        ],
        correct: 1,
        explanation: "Force push (--force) is restricted by default to prevent accidental data loss."
      },
      {
        question: "To run a long build in background, use:",
        options: [
          "Bash with & at end",
          "Bash with run_in_background: true",
          "Bash with timeout: 0",
          "Separate terminal"
        ],
        correct: 1,
        explanation: "Set run_in_background: true in the Bash tool parameters for long-running processes."
      },
      {
        question: "After background execution, check results with:",
        options: [
          "Bash tail command",
          "TaskOutput tool",
          "Read tool",
          "Grep tool"
        ],
        correct: 1,
        explanation: "Use the TaskOutput tool with the task_id to check on background process results."
      }
    ]
  },

  // Section 5: Task Management
  {
    section: 5,
    title: "Task Management Quiz",
    passingScore: 0.8,
    questions: [
      {
        question: "How many tasks can be 'in_progress' simultaneously?",
        options: [
          "Unlimited",
          "Three",
          "One",
          "Depends on complexity"
        ],
        correct: 2,
        explanation: "Only ONE task should be in_progress at a time to maintain focus and accurate progress tracking."
      },
      {
        question: "When should you skip TodoWrite?",
        options: [
          "Multi-step tasks",
          "Single trivial tasks",
          "Complex features",
          "User-provided lists"
        ],
        correct: 1,
        explanation: "Skip TodoWrite for single, straightforward tasks that don't need tracking."
      },
      {
        question: "Plan mode is used to:",
        options: [
          "Execute code faster",
          "Design approach before implementation",
          "Skip approval steps",
          "Reduce context usage"
        ],
        correct: 1,
        explanation: "Plan mode allows you to design and get approval for an implementation approach before executing."
      },
      {
        question: "AskUserQuestion supports how many options?",
        options: [
          "2 only",
          "2-4 options",
          "Unlimited",
          "5-10 options"
        ],
        correct: 1,
        explanation: "AskUserQuestion supports 2-4 options per question, with users always able to provide custom input."
      },
      {
        question: "When should you mark a task complete?",
        options: [
          "When mostly done",
          "At end of session",
          "Immediately after finishing",
          "After user confirms"
        ],
        correct: 2,
        explanation: "Mark tasks complete immediately after finishing to maintain accurate progress tracking."
      }
    ]
  },

  // Section 6: Agents
  {
    section: 6,
    title: "Agents Quiz",
    passingScore: 0.75,
    questions: [
      {
        question: "Which agent type is best for codebase discovery?",
        options: [
          "Bash",
          "Explore",
          "Plan",
          "general-purpose"
        ],
        correct: 1,
        explanation: "The Explore agent is specialized for codebase discovery with all read-only tools available."
      },
      {
        question: "To run agents in parallel, you must:",
        options: [
          "Use separate commands",
          "Add parallel: true flag",
          "Send multiple Task calls in one message",
          "Use background mode"
        ],
        correct: 2,
        explanation: "Launch multiple agents by sending multiple Task tool calls in a single message."
      },
      {
        question: "Agents with 'current context' can:",
        options: [
          "Only see their prompt",
          "See full conversation history",
          "Access other agents' results",
          "Modify system settings"
        ],
        correct: 1,
        explanation: "Agents with current context receive the full conversation history to understand prior discussions."
      },
      {
        question: "The Task tool requires which parameters?",
        options: [
          "prompt only",
          "description, prompt, subagent_type",
          "prompt and model",
          "description and timeout"
        ],
        correct: 1,
        explanation: "Task tool requires description (3-5 words), prompt (detailed instructions), and subagent_type."
      }
    ]
  },

  // Section 7: Web & External
  {
    section: 7,
    title: "Web & External Quiz",
    passingScore: 0.8,
    questions: [
      {
        question: "WebSearch results must include:",
        options: [
          "Full page content",
          "Source URLs (citations)",
          "Download links",
          "Author information"
        ],
        correct: 1,
        explanation: "WebSearch results must always include source URLs for proper citation and verification."
      },
      {
        question: "Which MCP server type is for local CLI tools?",
        options: [
          "SSE",
          "HTTP",
          "stdio",
          "WebSocket"
        ],
        correct: 2,
        explanation: "stdio (standard input/output) is used for local subprocess-based CLI tools."
      },
      {
        question: "Before browser automation, you must call:",
        options: [
          "navigate",
          "tabs_context_mcp",
          "read_page",
          "computer"
        ],
        correct: 1,
        explanation: "Call tabs_context_mcp first to get information about available browser tabs."
      },
      {
        question: "WebFetch is best for:",
        options: [
          "General web searches",
          "Analyzing specific URLs",
          "Form submission",
          "File downloads"
        ],
        correct: 1,
        explanation: "WebFetch retrieves and analyzes specific web pages, extracting relevant information."
      },
      {
        question: "Which is NOT a popular MCP integration?",
        options: [
          "GitHub",
          "Slack",
          "Microsoft Word",
          "Linear"
        ],
        correct: 2,
        explanation: "GitHub, Slack, and Linear are popular MCP integrations. Microsoft Word is not currently available."
      }
    ]
  },

  // Section 8: Advanced Patterns
  {
    section: 8,
    title: "Advanced Patterns Quiz",
    passingScore: 0.8,
    questions: [
      {
        question: "Hooks can perform which actions?",
        options: [
          "Execute and log",
          "Block and warn",
          "Approve and deny",
          "Create and delete"
        ],
        correct: 1,
        explanation: "Hooks can either block an action (prevent it) or warn (allow but notify)."
      },
      {
        question: "Skills auto-load based on:",
        options: [
          "User commands only",
          "Context triggers",
          "Time of day",
          "System load"
        ],
        correct: 1,
        explanation: "Skills activate automatically when context triggers (relevant topics) are mentioned."
      },
      {
        question: "Fan-out/fan-in pattern is best for:",
        options: [
          "Sequential dependencies",
          "Parallel independent analysis",
          "Single-step operations",
          "User interactions"
        ],
        correct: 1,
        explanation: "Fan-out/fan-in dispatches work to multiple agents in parallel, then consolidates results."
      },
      {
        question: "Hooks are configured in:",
        options: [
          "CLAUDE.md",
          ".claude/hooks.json or hookify files",
          "System settings",
          "Environment variables"
        ],
        correct: 1,
        explanation: "Hooks are configured in .claude/hooks.json or using hookify markdown files."
      },
      {
        question: "The iterative refinement pattern includes:",
        options: [
          "Single pass execution",
          "Validation with retry loop",
          "Parallel workers only",
          "User approval at each step"
        ],
        correct: 1,
        explanation: "Iterative refinement processes, validates, and retries until quality gates are met."
      }
    ]
  },

  // Section 9: Manufacturing
  {
    section: 9,
    title: "Manufacturing Quiz",
    passingScore: 0.83,
    questions: [
      {
        question: "Customer name cleansing typically outputs:",
        options: [
          "Raw duplicates only",
          "Standardized data with confidence scores",
          "Deleted records",
          "Email notifications"
        ],
        correct: 1,
        explanation: "Name cleansing produces standardized data with confidence scores to help prioritize review."
      },
      {
        question: "Predictive maintenance ROI typically ranges:",
        options: [
          "10-50%",
          "50-100%",
          "100-200%",
          "300-500%"
        ],
        correct: 3,
        explanation: "Predictive maintenance typically delivers 300-500% ROI according to industry benchmarks."
      },
      {
        question: "BOM processing should flag:",
        options: [
          "All parts equally",
          "Mismatches and missing items",
          "Only expensive parts",
          "Approved items only"
        ],
        correct: 1,
        explanation: "BOM processing should flag mismatches and missing items to prevent production issues."
      },
      {
        question: "Compliance document processing extracts:",
        options: [
          "Formatting information",
          "Requirements mapped to specs",
          "Author metadata",
          "Revision history only"
        ],
        correct: 1,
        explanation: "Compliance processing extracts requirements and maps them to product specifications."
      },
      {
        question: "Executive dashboards should include:",
        options: [
          "All raw data",
          "Technical implementation details",
          "3-bullet summary with recommendations",
          "Complete audit logs"
        ],
        correct: 2,
        explanation: "Executive dashboards should be concise with 3-bullet summaries and actionable recommendations."
      },
      {
        question: "Phase 1 implementation focuses on:",
        options: [
          "Full production deployment",
          "Foundation and customer cleansing",
          "Predictive maintenance",
          "Multi-plant scaling"
        ],
        correct: 1,
        explanation: "Phase 1 focuses on foundation setup and customer name cleansing as the first priority."
      }
    ]
  }
]
