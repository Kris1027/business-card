# Business Card

A modern React + TypeScript application built with Vite, featuring strict code quality standards and best practices.

## Tech Stack

- **React 19.1** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.1** - Build tool and dev server
- **TailwindCSS 4.1** - Utility-first CSS framework
- **pnpm** - Package manager

## Project Structure

```
src/
├── pages/          # Application pages
│   └── home.tsx    # Home page component
├── main.tsx        # Application entry point
└── index.css       # Global styles
```

## Development

### Prerequisites

- Node.js
- pnpm 10.20.0+

### Installation

```bash
pnpm install
```

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run ESLint
pnpm lint

# Run ESLint with auto-fix
pnpm lint:fix

# Format code with Prettier
pnpm format

# Check code formatting
pnpm format:check

# Full pre-commit validation (format + lint + build)
pnpm pre-commit
```

## Code Quality

### ESLint Configuration

The project uses a strict ESLint setup with the following rules:

- **TypeScript ESLint** - Type-aware linting rules
- **React Hooks** - Latest recommended rules
- **React Refresh** - Fast Refresh compatibility
- **Prettier Integration** - No style conflicts
- **Unicorn** - Additional best practices

### Enforced Code Standards

1. **Arrow Functions Only**
   ```typescript
   // ✅ Correct
   const MyComponent = () => { ... }

   // ❌ Wrong
   function MyComponent() { ... }
   ```

2. **kebab-case Filenames**
   ```
   ✅ home.tsx
   ✅ user-profile.tsx
   ❌ Home.tsx
   ❌ UserProfile.tsx
   ```

3. **Absolute Imports with @/ Prefix**
   ```typescript
   // ✅ Correct
   import Home from '@/pages/home'

   // ❌ Wrong
   import Home from './pages/home'
   import Home from '../pages/home'
   ```

4. **TypeScript Strict Mode**
   - No unused variables/parameters
   - No explicit `any` types (warns)
   - Strict type checking enabled

5. **Console Usage**
   - `console.log()` - Warns
   - `console.warn()` - Allowed
   - `console.error()` - Allowed

### Prettier Configuration

- No semicolons
- Single quotes
- ES5 trailing commas
- 2 space indentation
- 100 character line width
- Arrow function parens: avoid
- LF line endings

## Path Aliases

The project uses `@/` as an alias for the `src/` directory:

```typescript
import Home from '@/pages/home'
import styles from '@/index.css'
```

Configured in:
- `vite.config.ts` - Build-time resolution
- `tsconfig.app.json` - TypeScript IntelliSense

## Build Configuration

### Vite Features

- React Fast Refresh for instant HMR
- React Compiler (experimental) for optimizations
- TailwindCSS v4 integration
- Path alias resolution

### TypeScript Settings

- Target: ES2022
- Module: ESNext
- Module Resolution: Bundler mode
- JSX: react-jsx
- Strict mode enabled
- No unused locals/parameters

## Ignored Files

The following are excluded from version control and formatting:

- `node_modules/`
- `dist/`
- `.DS_Store`
- `*.log`
- IDE-specific files (`.vscode/*`, `.idea`)

## Package Manager

This project uses `pnpm` with a locked version specified in `package.json`:

```bash
pnpm@10.20.0
```
