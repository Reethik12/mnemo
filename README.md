# Mnemo 🧠

AI-powered application built with Next.js 15, React 19, and TypeScript.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript 5
- **UI:** React 19
- **Styling:** Tailwind CSS 4
- **Linting:** ESLint 9 + eslint-config-next
- **Formatting:** Prettier + prettier-plugin-tailwindcss
- **Git Hooks:** Husky + lint-staged

## Project Structure

```
src/
├── app/           # Next.js App Router (pages, layouts, routes)
├── components/    # Shared React components
├── hooks/         # Custom React hooks
├── lib/           # Core abstractions & configurations
├── services/      # API services & external integrations
├── types/         # Shared TypeScript type definitions
└── utils/         # Utility functions
```

## Getting Started

### Prerequisites

- Node.js >= 20
- npm (or pnpm)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [https://mnemo-eosin.vercel.app]

### Scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start dev server (Turbopack)        |
| `npm run build`        | Production build                    |
| `npm run start`        | Start production server             |
| `npm run lint`         | Run ESLint                          |
| `npm run lint:fix`     | Run ESLint with auto-fix            |
| `npm run format`       | Format all files with Prettier      |
| `npm run format:check` | Check formatting without writing    |
| `npm run type-check`   | Run TypeScript type checking        |
| `npm run validate`     | Run all checks (types + lint + fmt) |

## Absolute Imports

Use the `@/` prefix to import from `src/`:

```ts
import { something } from "@/lib/something";
import { MyComponent } from "@/components/my-component";
```

## 🤖 AI Assistance Disclosure

This project was developed in accordance with the hackathon rules. AI-assisted development tools were used to accelerate development, improve productivity, and assist with debugging, while all project design decisions, architecture, feature planning, integration, testing, validation, and final implementation were performed and verified by the project author.

### AI Tools Used

- **ChatGPT (OpenAI)**
  - Brainstorming ideas and feature planning
  - Architecture discussions
  - Debugging assistance
  - Code explanation and refactoring suggestions
  - Documentation and README drafting
  - Demo script preparation

- **Google AI Studio (Gemini)**
  - Code suggestions
  - UI/UX improvements
  - Technical discussions
  - Documentation refinement
  - Demo narration assistance

- **Antigravity AI**
  - Multi-agent development workflow
  - Claude opus 4.6 & Gemini Pro AI agent were used 
  - Large feature generation
  - Refactoring support
  - Component scaffolding
  - Rapid iteration of application modules

### Human Contributions

The following were personally designed, implemented, integrated, tested, and validated by the project author:

- Overall concept and product vision of **Mnemo**
- System architecture
- Five-module application design
- Cognee Cloud integration strategy
- Memory workflow and user experience
- Feature selection and implementation decisions
- Debugging and issue resolution
- GitHub repository management
- Deployment to Vercel
- Project testing and validation
- Final review and documentation

### Cognee Integration

Cognee Cloud is the core technology powering Mnemo. The application is built around Cognee's persistent memory capabilities using:

- `remember()`
- `recall()`
- `improve()`
- `forget()`

These capabilities drive the Living Memory Operating System implemented throughout the five modules.

AI tools were used solely as development assistants and did not replace the author's engineering decisions or project ownership.

## License

MIT
