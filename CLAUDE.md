# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **pnpm** as package manager (locked to 10.20.0)

### Project Organization
- `src/pages/` - Page components (entry point: `src/main.tsx` → `src/pages/home.tsx`)
- Path alias `@/` resolves to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`)

### Build Configuration
- **Vite** uses React plugin with babel-plugin-react-compiler for automatic optimizations
- **TypeScript** compiles to ES2022, targets modern browsers (DOM + DOM.Iterable)
- Module resolution uses bundler mode (no baseUrl, paths work directly)

## Enforced Code Standards

### Critical ESLint Rules (eslint.config.js)
1. **Arrow functions only** - All functions must be arrow functions
   - `func-style: ['error', 'expression', { allowArrowFunctions: true }]`
   - `prefer-arrow-callback: ['error', { allowNamedFunctions: false }]`

2. **kebab-case filenames** - All files must use kebab-case
   - `unicorn/filename-case: ['error', { case: 'kebabCase' }]`
   - Examples: `home.tsx`, `user-profile.tsx`

3. **Absolute imports with @/ prefix** - No relative imports allowed
   - `no-relative-import-paths/no-relative-import-paths: ['error', { allowSameFolder: false, rootDir: 'src', prefix: '@' }]`
   - Use `import Home from '@/pages/home'` not `import Home from './pages/home'`

4. **TypeScript strict checks**
   - Unused vars/parameters warn (except those prefixed with `_`)
   - `any` types warn but don't error
   - Strict mode enabled in tsconfig

5. **Console usage**
   - `console.log()` triggers warnings
   - `console.warn()` and `console.error()` are allowed

### Auto-fix Capability
- ESLint can auto-fix: arrow functions, relative imports → `@/` imports
- Prettier formats on save: no semicolons, single quotes, 100 char width, ES5 trailing commas

## Important Implementation Notes

### When Creating Files
- Use kebab-case for all filenames: `user-profile.tsx` not `UserProfile.tsx`
- All component functions must be arrow functions: `const Component = () => {}`
- Always use `@/` prefix for imports: `import { X } from '@/pages/x'`

### When Modifying Code
- Run `pnpm lint:fix` to auto-fix imports and formatting issues
- The `pre-commit` script validates everything (format + lint + build) before committing
- TypeScript strict mode is enabled: handle all edge cases and avoid `any`

### Vite/React Specifics
- HMR works via React Fast Refresh (configured in vite.config.ts)
- React Compiler is enabled: components are automatically memoized when possible
- TailwindCSS uses v4 (configured via Vite plugin, not PostCSS)
