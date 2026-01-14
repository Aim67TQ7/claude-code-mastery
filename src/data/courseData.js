export const courseData = [
  {
    id: 1,
    title: "Foundations",
    description: "What is Claude Code and how to get started",
    modules: [
      {
        id: "1.1",
        title: "Architecture Overview",
        steps: [
          {
            content: `Let's start with the fundamentals. **Claude Code** is Anthropic's official CLI tool that brings Claude's AI capabilities directly to your terminal.

Think of it as having an expert software engineer available 24/7 who can:
- Read and understand your codebase
- Write and modify code autonomously
- Execute commands and manage git operations
- Search the web for current information

Ready to dive deeper?`,
            mood: "explaining"
          },
          {
            content: `The architecture has four key layers:

1. **LLM Core** - Claude Opus 4.5 powers the reasoning
2. **Tool Layer** - File operations, search, web access
3. **Agent System** - Parallel workers for complex tasks
4. **Context Management** - Intelligent conversation memory

This means Claude Code can handle everything from simple file edits to orchestrating multi-step manufacturing automation workflows.`,
            mood: "pointing"
          }
        ]
      },
      {
        id: "1.2",
        title: "Installation & Setup",
        steps: [
          {
            content: `Installing Claude Code is straightforward.

**For macOS/Linux:**
\`\`\`bash
curl -fsSL https://claude.ai/install.sh | sh
\`\`\`

**For Windows (via npm):**
\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

After installation, run \`claude config\` to set up your API key.`,
            mood: "explaining"
          },
          {
            content: `**Pro tip:** Create a \`CLAUDE.md\` file in your project root to define project-specific behavior.

This file tells Claude about:
- Your coding conventions
- Project structure
- Quality requirements
- Special instructions

For manufacturing projects, you might include ERP integration patterns and data format specifications.`,
            mood: "pointing"
          }
        ]
      },
      {
        id: "1.3",
        title: "First Commands",
        steps: [
          {
            content: `Here are the essential commands to get started:

| Command | Purpose |
|---------|---------|
| \`claude\` | Start interactive session |
| \`claude "your question"\` | One-shot query |
| \`/help\` | In-session help |
| \`/clear\` | Clear conversation context |

Try starting with \`claude\` and asking "What tools do you have access to?"`,
            mood: "explaining"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Reading & Searching",
    description: "Master file operations and code discovery",
    modules: [
      {
        id: "2.1",
        title: "The Read Tool",
        steps: [
          {
            content: `The **Read** tool is your window into any file. It can handle:

- Text files (any encoding)
- Images (PNG, JPG) - Claude can analyze them visually!
- PDFs (page-by-page extraction)
- Jupyter notebooks (code + outputs)

**Key parameters:**
- \`file_path\`: Absolute path (required)
- \`offset\`: Starting line number
- \`limit\`: Number of lines to read`,
            mood: "explaining"
          },
          {
            content: `**Manufacturing Application:** Use Read to analyze production log files, extract data from PDF reports, or review configuration files across your plant systems.

For example, reading an ERP export file to understand its structure before processing.`,
            mood: "pointing"
          }
        ]
      },
      {
        id: "2.2",
        title: "Glob - Pattern Matching",
        steps: [
          {
            content: `**Glob** finds files by name patterns - essential for large codebases.

| Pattern | Matches |
|---------|---------|
| \`**/*.py\` | All Python files recursively |
| \`src/**/*.ts\` | TypeScript in src folder |
| \`*.{js,jsx}\` | JS and JSX in current dir |
| \`test_*.py\` | Test files starting with test_ |

This is much faster than manually searching through directories!`,
            mood: "explaining"
          }
        ]
      },
      {
        id: "2.3",
        title: "Grep - Content Search",
        steps: [
          {
            content: `**Grep** searches *inside* files using powerful regex patterns.

**Features:**
- Full regex support
- Case-insensitive search (\`-i\`)
- Context lines (\`-A\`, \`-B\`, \`-C\`)
- Multiline matching
- File type filtering

**Example patterns:**
- \`"TODO|FIXME"\` - Find code markers
- \`"function.*export"\` - Functions being exported
- \`"import.*from"\` - Module imports`,
            mood: "explaining"
          },
          {
            content: `**Manufacturing Application:** Search production logs for error patterns, find all references to a specific part number, or locate configuration settings across multiple systems.

\`\`\`
Pattern: "ERROR|WARN|CRITICAL"
Output mode: content
Context: 3 lines before and after
\`\`\``,
            mood: "pointing"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Writing & Editing",
    description: "Make precise code modifications",
    modules: [
      {
        id: "3.1",
        title: "The Edit Tool",
        steps: [
          {
            content: `The **Edit** tool makes surgical changes to files. Think find-and-replace, but smarter.

**How it works:**
\`\`\`
old_string: Exact text to find (must be unique)
new_string: Replacement text
replace_all: Boolean for global replacement
\`\`\`

**Critical rule:** You must READ a file before editing it. This ensures you understand the context.`,
            mood: "explaining"
          },
          {
            content: `**Best practices:**

1. **Read first** - Always understand the file before editing
2. **Unique matches** - old_string must match exactly once (or use replace_all)
3. **Preserve indentation** - Match the source file's whitespace
4. **Minimal changes** - Only change what's necessary

This prevents accidental modifications to the wrong code!`,
            mood: "pointing"
          }
        ]
      },
      {
        id: "3.2",
        title: "Write Tool",
        steps: [
          {
            content: `The **Write** tool creates new files or completely replaces existing content.

**Use Write when:**
- Creating new source files
- Writing configuration files
- Generating test files

**Use Edit when:**
- Making targeted changes
- Updating specific functions
- Renaming variables

Remember: Edit for modifications, Write for creation!`,
            mood: "explaining"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Bash & System",
    description: "Execute commands and manage version control",
    modules: [
      {
        id: "4.1",
        title: "Bash Fundamentals",
        steps: [
          {
            content: `The **Bash** tool executes shell commands in a persistent session.

**Capabilities:**
- Git operations (status, commit, push)
- Package management (npm, pip)
- Build processes
- Running tests

**Timeout settings:**
- Default: 120 seconds
- Maximum: 600 seconds (10 minutes)
- Use \`run_in_background\` for long processes`,
            mood: "explaining"
          },
          {
            content: `**Safe Git operations:**
\`\`\`bash
git status          # View changes
git log --oneline   # View history
git diff            # View modifications
git add <file>      # Stage changes
git commit -m "..." # Create commit
git push            # Push to remote
\`\`\`

**Restricted by default:**
- Force push (--force)
- Hard reset
- Config modifications`,
            mood: "pointing"
          }
        ]
      },
      {
        id: "4.2",
        title: "Background Execution",
        steps: [
          {
            content: `For long-running processes, use background execution:

\`\`\`
Bash with run_in_background: true
-> Returns task_id
-> Use TaskOutput to check results
-> Continue other work while waiting
\`\`\`

**Perfect for:**
- Running full test suites
- Building large projects
- Starting development servers
- ETL pipeline execution`,
            mood: "explaining"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Task Management",
    description: "Plan and track complex workflows",
    modules: [
      {
        id: "5.1",
        title: "TodoWrite Tool",
        steps: [
          {
            content: `**TodoWrite** tracks progress on multi-step tasks - essential for complex projects.

**Task structure:**
\`\`\`json
{
  "content": "Run database migrations",
  "activeForm": "Running database migrations",
  "status": "pending | in_progress | completed"
}
\`\`\`

**Rules:**
- Only ONE task \`in_progress\` at a time
- Mark complete IMMEDIATELY after finishing
- Break complex tasks into 3-7 subtasks`,
            mood: "explaining"
          },
          {
            content: `**Manufacturing Application:**

Track multi-step ERP migrations:
1. Export customer data
2. Cleanse and normalize names
3. Validate against master data
4. Import to new system
5. Verify data integrity
6. Generate migration report

Each step marked complete as you progress - nothing gets forgotten!`,
            mood: "pointing"
          }
        ]
      },
      {
        id: "5.2",
        title: "Plan Mode",
        steps: [
          {
            content: `**Plan Mode** helps design implementations before executing.

**Workflow:**
1. Enter plan mode
2. Explore codebase (read-only)
3. Design approach
4. Get user approval
5. Exit plan mode
6. Execute implementation

**Use when:**
- New feature implementation
- Multiple valid approaches exist
- Architectural decisions needed`,
            mood: "explaining"
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Agents",
    description: "Parallel execution and multi-agent workflows",
    modules: [
      {
        id: "6.1",
        title: "Agent Architecture",
        steps: [
          {
            content: `**Agents** are specialized subprocesses that handle complex tasks autonomously.

| Agent Type | Purpose | Best For |
|------------|---------|----------|
| Explore | Codebase discovery | Finding files, understanding structure |
| Plan | Architecture design | Designing implementations |
| Bash | Command execution | Running scripts |
| general-purpose | Complex research | Multi-step investigation |

Each agent has specific tools and capabilities tailored to its purpose.`,
            mood: "explaining"
          },
          {
            content: `**Parallel Execution** - the real power!

Launch multiple agents simultaneously:
\`\`\`
Agent 1: Search for API implementations
Agent 2: Analyze test patterns
Agent 3: Review documentation
\`\`\`

Results consolidate automatically. This is 3x faster than sequential work!`,
            mood: "pointing"
          }
        ]
      },
      {
        id: "6.2",
        title: "Orchestration Patterns",
        steps: [
          {
            content: `**Pattern 1: Sequential**
Agent A -> Agent B -> Agent C
(Use when steps have dependencies)

**Pattern 2: Parallel (Fan-out/Fan-in)**
Dispatcher -> [Agent 1, Agent 2, Agent 3] -> Consolidator
(Use for independent analysis)

**Pattern 3: Supervisor/Worker**
Supervisor coordinates workers, aggregates results
(Use for complex multi-domain tasks)`,
            mood: "explaining"
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Web & External",
    description: "Search, fetch, and integrate external services",
    modules: [
      {
        id: "7.1",
        title: "Web Search & Fetch",
        steps: [
          {
            content: `**WebSearch** accesses current information beyond training data.

**Parameters:**
- \`query\`: Search terms
- \`allowed_domains\`: Whitelist specific sites
- \`blocked_domains\`: Exclude specific sites

**WebFetch** retrieves and analyzes specific pages:
1. Provide URL and analysis prompt
2. Claude fetches and converts to markdown
3. Returns relevant extracted information`,
            mood: "explaining"
          },
          {
            content: `**Manufacturing Application:**

- Monitor supplier websites for pricing changes
- Fetch regulatory updates (RoHS, REACH, ISO)
- Research competitor products
- Track industry news and trends

All integrated directly into your workflows!`,
            mood: "pointing"
          }
        ]
      },
      {
        id: "7.2",
        title: "MCP Integrations",
        steps: [
          {
            content: `**Model Context Protocol (MCP)** connects Claude to external services.

**Popular integrations:**
- GitHub - Repository management
- Slack - Team communication
- Linear - Issue tracking
- Supabase - Database operations
- Playwright - Browser automation

**Server types:**
- stdio: Local CLI tools
- SSE: Hosted services
- HTTP: REST APIs
- WebSocket: Real-time data`,
            mood: "explaining"
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Advanced Patterns",
    description: "Hooks, skills, and production workflows",
    modules: [
      {
        id: "8.1",
        title: "Hooks System",
        steps: [
          {
            content: `**Hooks** execute commands in response to events - your automation safety net.

**Event types:**
- \`bash\`: Before/after bash commands
- \`file\`: On file creation/modification
- \`stop\`: When Claude stops
- \`prompt\`: On user messages

**Actions:**
- \`block\`: Prevent the action
- \`warn\`: Allow but notify`,
            mood: "explaining"
          },
          {
            content: `**Use cases:**

1. Prevent dangerous commands (\`rm -rf\`)
2. Warn about debug code (\`console.log\`)
3. Require tests before commits
4. Validate file writes match patterns
5. Block commits with secrets

This protects your production systems from accidents!`,
            mood: "pointing"
          }
        ]
      },
      {
        id: "8.2",
        title: "Skills System",
        steps: [
          {
            content: `**Skills** are packaged domain expertise that auto-load based on context.

**Available skills:**
- \`customer-name-cleansing\`: ERP data standardization
- \`roi-analysis\`: Business case development
- \`risk-assessment\`: Strategic risk analysis
- \`executive-brief\`: C-suite deliverables
- \`compliance-check\`: Regulatory validation

Skills activate automatically when you mention relevant topics!`,
            mood: "explaining"
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Manufacturing",
    description: "Real-world operations and production applications",
    modules: [
      {
        id: "9.1",
        title: "ERP Data Integration",
        steps: [
          {
            content: `**Customer Name Cleansing** - the foundation of AI-ready data.

**Workflow:**
1. Parse ERP export (Epicor, SAP, NetSuite)
2. Standardize naming conventions
3. Identify duplicates with confidence scores
4. Flag for review vs auto-merge
5. Output cleansed master data

This enables accurate analytics and prevents "garbage in, garbage out."`,
            mood: "explaining"
          },
          {
            content: `**Bill of Materials Processing:**

Input: Messy BOM data from Excel, PDF, email
Process:
1. Extract part numbers and descriptions
2. Normalize formats
3. Validate against part master
4. Flag mismatches and missing items
5. Sync to ERP/PLM systems

Output: Validated, normalized BOM ready for production!`,
            mood: "pointing"
          }
        ]
      },
      {
        id: "9.2",
        title: "Quality & Compliance",
        steps: [
          {
            content: `**Defect Analysis Pipeline:**

Input: Production logs, sensor data, images
Process:
1. Parse production records
2. Identify anomaly patterns
3. Correlate with process parameters
4. Generate root cause hypotheses
5. Recommend corrective actions

**ROI:** 95% reduction in defect detection time!`,
            mood: "explaining"
          },
          {
            content: `**Compliance Document Processing:**

Parse regulatory frameworks (RoHS, REACH, ISO 9001):
- Extract requirements
- Map to product specifications
- Identify compliance gaps
- Generate remediation plans
- Track status over time

Automated compliance means fewer audits surprises!`,
            mood: "pointing"
          }
        ]
      },
      {
        id: "9.3",
        title: "Predictive Operations",
        steps: [
          {
            content: `**Predictive Maintenance:**

Input: Sensor data, maintenance logs, specs
Process:
1. Aggregate equipment telemetry
2. Detect anomaly patterns
3. Predict failure probability
4. Calculate optimal maintenance timing
5. Generate work orders

**Results:**
- 300-500% ROI lift
- 78% of facilities report waste reduction
- 99.5% on-time delivery rates`,
            mood: "explaining"
          },
          {
            content: `**Congratulations!** You've completed the Claude Code Mastery curriculum.

You now have the knowledge to:
- Automate manufacturing data workflows
- Build quality control systems
- Implement predictive maintenance
- Generate executive dashboards
- Scale across multiple plants

Your next step: Apply these patterns to your specific operations!`,
            mood: "confident"
          }
        ]
      }
    ]
  }
]
