# AGENTS.md

This file provides guidance for agentic coding agents working in this repository.

## Development Commands

```bash
# Development
pnpm dev              # Start Vite dev server with HMR
pnpm build            # Type-check with tsc + production build
pnpm preview          # Preview production build locally

# Code Quality
pnpm lint             # Run ESLint on all TypeScript files
pnpm lint:fix         # Auto-fix ESLint issues
pnpm format           # Format all source files with Prettier
pnpm format:check     # Check if files are formatted correctly
pnpm pre-commit       # Full validation: format + lint:fix + build
```

## Architecture

### Tech Stack

- **React 19.1** with React Compiler (experimental) enabled via Babel
- **TypeScript 5.9** in strict mode with bundler resolution
- **Vite 7.1** for dev server and builds
- **TailwindCSS 4.1** integrated via Vite plugin
- **pnpm** as package manager (locked to 10.26.0)

### Project Organization

- `src/routes/` - Page components (TanStack Router file-based routing)
- `src/components/` - Reusable UI components
- `src/contexts/` - React Context definitions (types and context objects only, no components)
- `src/hooks/` - Custom React hooks
- Path alias `@/` resolves to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`)

### Build Configuration

- **Vite** uses React plugin with babel-plugin-react-compiler for automatic optimizations
- **TypeScript** compiles to ES2022, targets modern browsers (DOM + DOM.Iterable)
- Module resolution uses bundler mode (no baseUrl, paths work directly)

## Code Style Guidelines

### Critical ESLint Rules (eslint.config.js)

1. **Arrow functions only** - All functions must be arrow functions
   - `func-style: ['error', 'expression', { allowArrowFunctions: true }]`
   - `prefer-arrow-callback: ['error', { allowNamedFunctions: false }]`

2. **kebab-case filenames** - All files must use kebab-case
   - `unicorn/filename-case: ['error', { case: 'kebabCase' }]`
   - Examples: `home.tsx`, `user-profile.tsx`

3. **Absolute imports with @/ prefix** - No relative imports allowed
   - `no-relative-import-paths/no-relative-import-paths: ['error', { allowSameFolder: false, rootDir: 'src', prefix: '@' }]`
   - Use `import Component from '@/components/component'` not `import Component from './component'`

4. **TypeScript strict checks**
   - Unused vars/parameters warn (except those prefixed with `_`)
   - `any` types warn but don't error
   - Strict mode enabled in tsconfig

5. **Console usage**
   - `console.log()` triggers warnings
   - `console.warn()` and `console.error()` are allowed

6. **No ESLint disable comments** - ESLint rules cannot be disabled with comments
   - `no-inline-comments: ['error', { ignorePattern: 'prettier-ignore' }]`
   - `no-warning-comments: ['error', { terms: ['eslint-disable', 'eslint-ignore'] }]`
   - Exception: Only `prettier-ignore` comments are allowed

### Prettier Configuration (.prettierrc)

- No semicolons
- Single quotes
- ES5 trailing commas
- 100 character width
- 2 space tabs
- Avoid arrow parens when possible

### React Compiler - Automatic Memoization

- **NO manual memoization needed** - Do NOT use `useMemo`, `useCallback`, or `memo`
- **React Compiler handles all optimizations** - Components are automatically memoized
- Exception: Only use manual memoization if explicitly overriding compiler behavior

### Dark/Light Mode Implementation

- **TailwindCSS 4 class-based dark mode** - Uses `@custom-variant dark` in `src/index.css`
- **Theme management** - React Context (`ThemeContext` in `src/contexts/theme-context.tsx`)
- **State persistence** - User preference saved to localStorage
- **FOUC prevention** - Inline script in `index.html` applies theme before React loads

### Internationalization (i18n) Implementation

- **react-i18next** - Industry-standard i18n library with TypeScript support
- **Default language: Polish (pl)** - Primary language for the application
- **Secondary language: English (en)** - Alternative language option
- **State persistence** - User preference saved to localStorage
- **FOUC prevention** - Inline script in `index.html` sets language before React loads
- **Critical rule**: ALWAYS add both Polish and English translations when adding new content

### Color System

- **Centralized color management** - All colors defined in `src/index.css` using CSS custom properties
- **Semantic naming** - Use semantic names like `--color-surface-card` over specific values
- **Dark mode variants required** - All color utilities MUST include dark mode variants
- **Consistent standards** - Maintain the color table from CLAUDE.md for consistency

## Testing

This project does not currently have a test suite configured. When adding tests:

- Check for existing test frameworks in package.json
- Follow the same code style guidelines for test files
- Use kebab-case naming for test files
- Use absolute imports with @/ prefix

## Error Handling

- Use TypeScript strict mode to catch errors at compile time
- Implement proper error boundaries for React components
- Use console.warn() and console.error() for logging (console.log() triggers warnings)
- Handle all edge cases in TypeScript due to strict mode

## Import Patterns

- Always use absolute imports with @/ prefix
- Group imports: React libraries first, then third-party, then local imports
- Example:
  ```tsx
  import { useState } from 'react'
  import { useTranslation } from 'react-i18next'
  import { Link } from '@tanstack/react-router'
  import { Component } from '@/components/component'
  ```

## File Naming

- Use kebab-case for all files: `user-profile.tsx` not `UserProfile.tsx`
- Components use .tsx extension
- Utility files use .ts extension
- Context files end with -context.tsx

## Best Practices

1. **Run pre-commit before considering work complete** - `pnpm pre-commit` validates everything
2. **Fix all similar occurrences** - When fixing an issue, search for and fix all instances
3. **Create utility functions** - Don't duplicate code, extract to utilities in src/utils/
4. **Test both themes** - Always verify light and dark mode work correctly
5. **Test both languages** - Always verify Polish and English translations exist
6. **Use semantic color coding** - Maintain the color pattern in the contact page
7. **Mobile-first responsive design** - Start with mobile styles, then enhance for larger screens
