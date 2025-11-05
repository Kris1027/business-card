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
- `src/components/` - Reusable UI components (navigation, theme toggle, providers)
- `src/contexts/` - React Context definitions (types and context objects only, no components)
- `src/hooks/` - Custom React hooks
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

6. **Dark mode variants required** - All color utilities MUST include dark mode variants
   - Every color utility must have a corresponding `dark:` variant
   - Affected utilities: `bg-*`, `text-*`, `border-*`, `ring-*`, `shadow-*`, `divide-*`
   - ❌ Bad: `<div class="bg-white text-gray-900">`
   - ✅ Good: `<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">`
   - Exception: Decorative elements that work identically in both modes (e.g., `text-white` on dark backgrounds)
   - Always test in both light and dark modes before considering work complete

7. **No ESLint disable comments** - ESLint rules cannot be disabled with comments
   - `no-inline-comments: ['error', { ignorePattern: 'prettier-ignore' }]`
   - `no-warning-comments: ['error', { terms: ['eslint-disable', 'eslint-ignore'] }]`
   - ❌ Bad: `/* eslint-disable rule-name */` or `// eslint-disable-next-line`
   - ✅ Good: Fix the underlying issue instead of disabling the rule
   - Exception: Only `prettier-ignore` comments are allowed
   - If a rule needs to be bypassed, restructure the code or update eslint.config.js

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
- **ALWAYS run `pnpm pre-commit` after implementing any new feature** - This ensures all code quality checks pass
- **When fixing an issue, always search for similar occurrences** - Use Grep/Glob to find and fix all instances of the same problem across the codebase
- TypeScript strict mode is enabled: handle all edge cases and avoid `any`

### Responsive Design
- **Mobile-first approach** - Always start with mobile styles (unprefixed utilities), then progressively enhance for larger screens
- Use TailwindCSS breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px)
- Example: `class="hidden md:flex"` (hidden on mobile, visible as flex on desktop)
- Test responsive designs at mobile sizes first before moving to desktop

### Vite/React Specifics
- HMR works via React Fast Refresh (configured in vite.config.ts)
- React Compiler is enabled: components are automatically memoized when possible
- TailwindCSS uses v4 (configured via Vite plugin, not PostCSS)

### Dark/Light Mode Implementation
- **TailwindCSS 4 class-based dark mode** - Uses `@custom-variant dark` in `src/index.css`
- **Theme management** - React Context (`ThemeContext` in `src/contexts/theme-context.tsx`)
- **Theme provider** - `<ThemeProvider>` component in `src/components/theme-provider.tsx`
- **State persistence** - User preference saved to localStorage (key: `theme`)
- **System preference support** - Automatically detects OS theme on first visit
- **FOUC prevention** - Inline script in `index.html` applies theme before React loads
- **Theme toggle** - `<ThemeToggle />` component in navigation bar (sun/moon icons)
- **File structure**:
  - `src/contexts/theme-context.tsx` - Context and types (no components to satisfy react-refresh)
  - `src/components/theme-provider.tsx` - ThemeProvider component
  - `src/hooks/use-theme.ts` - Hook to access theme context
- **Usage pattern**:
  ```tsx
  import { useTheme } from '@/hooks/use-theme'

  const Component = () => {
    const { theme, toggleTheme } = useTheme()
    // theme is 'light' or 'dark'
  }
  ```

### Internationalization (i18n) Implementation
- **react-i18next** - Industry-standard i18n library with TypeScript support
- **Default language: Polish (pl)** - Primary language for the application
- **Secondary language: English (en)** - Alternative language option
- **Language toggle** - `<LanguageToggle />` component in navigation bar (globe icon)
- **State persistence** - User preference saved to localStorage (key: `language`)
- **Browser detection** - Automatically detects browser language on first visit, falls back to Polish
- **FOUC prevention** - Inline script in `index.html` sets language and page title before React loads
- **File structure**:
  - `src/i18n/config.ts` - i18next configuration with language detection logic
  - `src/locales/pl.ts` - Polish translations (default)
  - `src/locales/en.ts` - English translations
  - `src/locales/index.ts` - Exports all translation resources and Language type
  - `src/contexts/language-context.tsx` - Context and types
  - `src/components/language-provider.tsx` - LanguageProvider component
  - `src/hooks/use-language.ts` - Hook to access language context
  - `src/types/i18next.d.ts` - TypeScript type definitions for type-safe translation keys
- **Usage pattern**:
  ```tsx
  import { useTranslation } from 'react-i18next'

  const Component = () => {
    const { t } = useTranslation()
    return <h1>{t('home.title')}</h1>
  }
  ```

#### Critical i18n Rules
1. **ALWAYS add both Polish and English translations** when adding new content
   - ❌ Bad: Only adding English translation
   - ✅ Good: Adding both `pl.ts` and `en.ts` translations simultaneously

2. **Translation file structure** - Keep translations organized by feature/component
   ```typescript
   {
     navigation: { ... },
     footer: { ... },
     home: { ... },
     // Group related translations together
   }
   ```

3. **Use translation keys consistently** - Follow the existing pattern
   - Format: `category.specificKey` (e.g., `navigation.home`, `footer.craftedBy`)
   - Use descriptive keys that indicate the content, not the location
   - Keep keys in sync between `pl.ts` and `en.ts` files

4. **Update both translation files when adding new features**
   - Before considering a feature complete, verify translations exist in both languages
   - Use Grep to search for similar translation patterns when unsure
   - Test the feature in both Polish and English modes

5. **Interpolation for dynamic content** - Use i18next interpolation syntax
   ```typescript
   // Translation file
   { githubLabel: "Visit {{name}}'s GitHub profile" }

   // Usage
   t('footer.githubLabel', { name: 'Kris1027' })
   ```

6. **Never hardcode user-facing text** - All visible text must use `t()` function
   - ❌ Bad: `<button>Click me</button>`
   - ✅ Good: `<button>{t('button.clickMe')}</button>`
   - Exception: Developer-facing content (console logs, error boundaries for devs)

7. **Language detection priority order**:
   1. localStorage (`language` key)
   2. Browser language (navigator.language)
   3. Fallback to Polish (`pl`)
