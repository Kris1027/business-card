# techKris

A modern, bilingual React + TypeScript business card application built with Vite. Features dark/light mode, Polish/English internationalization, mobile-first responsive design, and strict code quality standards.

## ✨ Features

- 🌍 **Internationalization** - Polish (default) and English language support with react-i18next
- 🌓 **Dark/Light Mode** - System preference detection with manual toggle
- 📱 **Mobile-First Design** - Responsive navigation with hamburger menu
- ⚡ **Fast Performance** - Vite with React Fast Refresh and React Compiler
- 🎨 **Modern UI** - TailwindCSS 4 with custom dark mode variants
- 🔒 **Type Safety** - TypeScript strict mode with type-safe translations
- 📏 **Code Quality** - Comprehensive ESLint + Prettier configuration
- ♿ **Accessible** - ARIA labels, keyboard navigation, and semantic HTML

## Tech Stack

- **React 19.1** - UI library with experimental compiler
- **TypeScript 5.9** - Type safety with strict mode
- **Vite 7.1** - Build tool and dev server with HMR
- **TailwindCSS 4.1** - Utility-first CSS framework
- **react-i18next** - Internationalization framework
- **pnpm** - Fast, disk space efficient package manager

## Project Structure

```
src/
├── components/               # Reusable UI components
│   ├── app-layout.tsx       # Main layout wrapper
│   ├── navigation-bar.tsx   # Responsive navigation with mobile menu
│   ├── footer.tsx           # Site footer
│   ├── theme-provider.tsx   # Dark/light mode provider
│   ├── theme-toggle.tsx     # Theme switcher button
│   ├── language-provider.tsx # i18n provider
│   └── language-toggle.tsx  # Language switcher dropdown
├── contexts/                 # React Context definitions
│   ├── theme-context.tsx    # Theme context types
│   └── language-context.tsx # Language context types
├── hooks/                    # Custom React hooks
│   ├── use-theme.ts         # Hook for theme context
│   └── use-language.ts      # Hook for language context
├── i18n/                     # Internationalization config
│   └── config.ts            # i18next setup with language detection
├── locales/                  # Translation files
│   ├── pl.ts                # Polish translations (default)
│   ├── en.ts                # English translations
│   └── index.ts             # Translation resources export
├── pages/                    # Application pages
│   └── home.tsx             # Home page component
├── types/                    # TypeScript type definitions
│   └── i18next.d.ts         # i18next module augmentation
├── main.tsx                  # Application entry point
└── index.css                 # Global styles with dark mode
```

## Development

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.0.0

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

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Full pre-commit validation (format + lint + test + build)
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

6. **Dark Mode Variants Required**
   ```typescript
   // ✅ Correct - All color utilities have dark: variants
   <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

   // ❌ Wrong - Missing dark mode variants
   <div className="bg-white text-gray-900">
   ```

7. **No ESLint Disable Comments**
   - ESLint rules cannot be disabled inline
   - Exception: `prettier-ignore` comments are allowed
   - Fix the underlying issue instead of disabling rules

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
- Vendor chunk splitting (react, router, i18n, icons)

### TypeScript Settings

- Target: ES2022
- Module: ESNext
- Module Resolution: Bundler mode
- JSX: react-jsx
- Strict mode enabled
- No unused locals/parameters

## Internationalization (i18n)

The application supports Polish (default) and English languages using react-i18next.

### Language Structure

Translations are organized by feature/component in `src/locales/`:

```typescript
// src/locales/pl.ts (Polish - default)
export const pl = {
  navigation: {
    brand: 'Marka',
    home: 'Strona główna',
    about: 'O mnie',
    // ...
  },
  // ...
}

// src/locales/en.ts (English)
export const en = {
  navigation: {
    brand: 'Brand',
    home: 'Home',
    about: 'About',
    // ...
  },
  // ...
}
```

### Using Translations

```typescript
import { useTranslation } from 'react-i18next'

const MyComponent = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('footer.craftedBy', { name: 'Kris1027' })}</p>
    </div>
  )
}
```

### Language Detection Priority

1. **localStorage** - Saved user preference (`language` key)
2. **Browser language** - `navigator.language` detection
3. **Fallback** - Polish (pl)

### Adding New Translations

**Important:** Always add translations to both `pl.ts` and `en.ts` files:

```typescript
// ✅ Correct - Both languages
// pl.ts
{ button: { submit: 'Wyślij' } }

// en.ts
{ button: { submit: 'Submit' } }

// ❌ Wrong - Only one language
// Only adding to en.ts
```

## Dark/Light Mode

The application features a theme system with dark and light modes.

### Theme Features

- System preference detection on first visit
- Manual toggle via sun/moon icon in navigation
- Preference persisted in localStorage
- FOUC (Flash of Unstyled Content) prevention
- Seamless transitions between themes

### Implementation

```typescript
import { useTheme } from '@/hooks/use-theme'

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme()

  // theme is 'light' or 'dark'
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

### Dark Mode CSS

All color utilities must include dark mode variants:

```css
/* Automatic dark mode using TailwindCSS */
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border-gray-200 dark:border-gray-800
">
```

## Ignored Files

The following are excluded from version control and formatting:

- `node_modules/`
- `dist/`
- `.DS_Store`
- `*.log`
- IDE-specific files (`.vscode/*`, `.idea`)

## Testing

The project uses **Vitest** with **React Testing Library** for unit and integration tests.

```bash
pnpm test           # Run all tests once
pnpm test:watch     # Run tests in watch mode
pnpm test:coverage  # Run tests with coverage report
```

Test files are co-located with their source files using the `.test.tsx` / `.test.ts` suffix.

## License

All Rights Reserved. See [LICENSE](./LICENSE) for details.

## Package Manager

This project uses `pnpm` with a locked version specified in `package.json`:

```bash
pnpm@10.26.0
```
