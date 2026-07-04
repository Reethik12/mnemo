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

## License

MIT
