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

### Code Duplication and Utility Functions
- **DO NOT duplicate code** - Before writing logic, check if a utility function already exists
- **Create utility functions** - If logic is used in multiple places, extract it to a utility file
- **Utility file locations**:
  - `src/utils/` - General-purpose utility functions
  - `src/hooks/` - Reusable React hooks
  - `src/lib/` - Third-party library configurations and wrappers
- **Valid exceptions to DRY principle**:
  - FOUC prevention scripts in `index.html` (theme detection, language detection)
  - These inline scripts run before React loads and cannot import ES modules
  - Must be kept in sync manually with corresponding React code
- ❌ Bad: Copying the same validation logic across 3 components
- ✅ Good: Creating `src/utils/validation.ts` with shared validation functions
- **Before duplicating code, ask**: "Can this be extracted into a reusable function?"

### Responsive Design
- **Mobile-first approach** - Always start with mobile styles (unprefixed utilities), then progressively enhance for larger screens
- Use TailwindCSS breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px)
- Example: `class="hidden md:flex"` (hidden on mobile, visible as flex on desktop)
- Test responsive designs at mobile sizes first before moving to desktop

### Vite/React Specifics
- HMR works via React Fast Refresh (configured in vite.config.ts)
- React Compiler is enabled: components are automatically memoized when possible
- TailwindCSS uses v4 (configured via Vite plugin, not PostCSS)

### React Compiler - Automatic Memoization
- **NO manual memoization needed** - Do NOT use `useMemo`, `useCallback`, or `memo`
- **React Compiler handles all optimizations** - The compiler automatically memoizes components, values, and functions
- ❌ Bad: `const value = useMemo(() => expensive(data), [data])`
- ✅ Good: `const value = expensive(data)`
- ❌ Bad: `const handler = useCallback(() => doSomething(), [dep])`
- ✅ Good: `const handler = () => doSomething()`
- **Exception**: Only use manual memoization if explicitly overriding compiler behavior with `"use no memo"` directive
- **Reference**: [React Compiler Documentation](https://react.dev/learn/react-compiler/introduction)

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

## Color System

### Centralized Color Management

All colors are centrally defined in `src/index.css` using CSS custom properties (CSS variables) within the `@theme` directive. This provides a single source of truth for all colors, making theme customization and maintenance straightforward.

**File location**: `src/index.css`

### Color Architecture

The color system follows industry-standard semantic naming conventions based on design system best practices (Tailwind CSS and Radix UI). Dark mode colors use deeper blacks (#0a0a0a) for reduced eye strain, higher contrast ratios for WCAG compliance, and more visible borders for improved visual hierarchy:

#### 1. **Surface Colors** (Backgrounds)
Used for page backgrounds, card surfaces, and interactive hover states:

| Semantic Name | Light Mode | Dark Mode | Usage |
|---------------|-----------|-----------|-------|
| `--color-surface-page` | `#f9fafb` (gray-50) | `#0a0a0a` (near black) | Main page background |
| `--color-surface-card` | `#ffffff` (white) | `#171717` (neutral-900) | Card/container background |
| `--color-surface-hover` | `#f3f4f6` (gray-100) | `#262626` (neutral-800) | Hover state background |

**TailwindCSS equivalents**:
- Page: `bg-gray-50` / `dark:bg-[#0a0a0a]`
- Card: `bg-white` / `dark:bg-neutral-900`
- Hover: `hover:bg-gray-100` / `dark:hover:bg-neutral-800`

#### 2. **Text Colors** (Hierarchy)
Used for all text content with clear hierarchy:

| Semantic Name | Light Mode | Dark Mode | Usage |
|---------------|-----------|-----------|-------|
| `--color-text-primary` | `#111827` (gray-900) | `#fafafa` (near white) | Headings, primary text |
| `--color-text-secondary` | `#374151` (gray-700) | `#e5e5e5` (neutral-200) | Subheadings, secondary text |
| `--color-text-body` | `#4b5563` (gray-600) | `#a3a3a3` (neutral-400) | Body text, descriptions |
| `--color-text-muted` | `#6b7280` (gray-500) | `#737373` (neutral-500) | Muted text, placeholders |
| `--color-text-link` | `#2563eb` (blue-600) | `#60a5fa` (blue-400) | Links, CTAs |
| `--color-text-link-hover` | `#1d4ed8` (blue-700) | `#93c5fd` (blue-300) | Link hover state |

**TailwindCSS equivalents**:
- Primary: `text-gray-900` / `dark:text-[#fafafa]`
- Secondary: `text-gray-700` / `dark:text-neutral-200`
- Body: `text-gray-600` / `dark:text-neutral-400`
- Muted: `text-gray-500` / `dark:text-neutral-500`
- Links: `text-blue-600` / `dark:text-blue-400`

#### 3. **Border Colors**
Used for borders and dividers:

| Semantic Name | Light Mode | Dark Mode | Usage |
|---------------|-----------|-----------|-------|
| `--color-border-default` | `#d1d5db` (gray-300) | `#404040` (neutral-700) | Default borders |
| `--color-border-divider` | `#e5e7eb` (gray-200) | `#262626` (neutral-800) | Section dividers |

**TailwindCSS equivalent**:
- Default: `border-gray-300` / `dark:border-neutral-700`
- Divider: `border-gray-200` / `dark:border-neutral-800`

#### 4. **Interactive Colors**
Used for interactive elements like buttons and focus states:

| Semantic Name | Light Mode | Dark Mode | Usage |
|---------------|-----------|-----------|-------|
| `--color-interactive-primary` | `#2563eb` (blue-600) | `#3b82f6` (blue-500) | Primary buttons, CTAs |
| `--color-interactive-primary-hover` | `#1d4ed8` (blue-700) | `#60a5fa` (blue-400) | Primary button hover |
| `--color-focus-ring` | `#3b82f6` (blue-500) | `#60a5fa` (blue-400) | Focus ring outline |

**TailwindCSS equivalents**:
- Primary: `bg-blue-600` / `dark:bg-blue-500`
- Hover: `hover:bg-blue-700` / `dark:hover:bg-blue-400`
- Focus: `focus:ring-blue-500` / `dark:focus:ring-blue-400`

#### 5. **Semantic Colors** (Status/Feature-specific)
Used for semantic purposes (success, info, warnings) and feature-specific colors:

| Purpose | Light Colors | Dark Colors | Usage |
|---------|-------------|------------|-------|
| **Success** | `bg: #dcfce7` (green-100)<br>`text: #16a34a` (green-600) | `bg: rgba(34, 197, 94, 0.1)`<br>`text: #4ade80` (green-400) | Success messages, checkmarks, phone contact |
| **Info** | `bg: #dbeafe` (blue-100)<br>`text: #2563eb` (blue-600) | `bg: rgba(59, 130, 246, 0.1)`<br>`text: #60a5fa` (blue-400) | Info messages, email contact, LinkedIn |
| **Warning** | `bg: #fee2e2` (red-100)<br>`text: #dc2626` (red-600) | `bg: rgba(239, 68, 68, 0.1)`<br>`text: #f87171` (red-400) | Warnings, location contact |
| **Discord** | `bg: #f3e8ff` (purple-100)<br>`text: #9333ea` (purple-600) | `bg: rgba(168, 85, 247, 0.1)`<br>`text: #c084fc` (purple-400) | Discord-specific styling |

**CSS Variables**:
- Success: `--color-success-bg`, `--color-success-text`, `--color-success`
- Info: `--color-info-bg`, `--color-info-text`, `--color-info`
- Warning: `--color-warning-bg`, `--color-warning-text`, `--color-warning`
- Discord: `--color-discord-bg`, `--color-discord-text`, `--color-discord`

### Semantic Color Coding Pattern

The contact page (`src/routes/contact.tsx`) uses **intentional semantic color coding** to visually differentiate contact methods:
- 🔵 **Blue**: Email, LinkedIn (communication platforms)
- 🟢 **Green**: Phone (direct contact)
- 🔴 **Red**: Location (physical address)
- 🟣 **Purple**: Discord (community platform)
- ⚫ **Gray**: GitHub (professional profile)

This pattern is **intentional** and should be preserved when modifying the contact page.

### Color Consistency Standards

The following color standards must be maintained throughout the application:

| Element | Light Mode | Dark Mode |
|---------|-----------|----------|
| **Page Background** | `bg-gray-50` | `bg-[#0a0a0a]` |
| **Card Background** | `bg-white` | `bg-neutral-900` |
| **Primary Text** | `text-gray-900` | `text-[#fafafa]` |
| **Secondary Text** | `text-gray-700` | `text-neutral-200` |
| **Body Text** | `text-gray-600` | `text-neutral-400` |
| **Link/CTA Text** | `text-blue-600` | `text-blue-400` |
| **Borders** | `border-gray-300` | `border-neutral-700` |
| **Button Hover BG** | `hover:bg-gray-100` | `dark:hover:bg-neutral-800` |
| **Link Hover** | `hover:text-blue-600` | `dark:hover:text-blue-400` |
| **Focus Ring** | `focus:ring-blue-500` | `focus:ring-blue-400` |

### Using Custom Colors

To use the custom color variables with TailwindCSS utilities:

```css
/* In CSS files */
.my-element {
  background-color: var(--color-surface-card);
  color: var(--color-text-primary);
}
```

```html
<!-- With arbitrary values in HTML -->
<div class="bg-[var(--color-surface-card)] text-[var(--color-text-primary)]">
  Content
</div>
```

### Best Practices

1. **Use semantic names**: Prefer `--color-text-primary` over specific gray values
2. **Maintain consistency**: Always use the standardized colors from the table above
3. **Test both modes**: Always verify colors work correctly in both light and dark modes
4. **Update centrally**: When changing colors, update `src/index.css` first
5. **Preserve semantic coding**: Maintain the color coding pattern in the contact page
6. **Check dark mode hover states**: Ensure `dark:hover:bg-gray-800` is used consistently (not `gray-700`)

### Color System Benefits

✅ **Single source of truth** - All colors defined in one place (`src/index.css`)
✅ **Easy theme customization** - Change colors globally by updating CSS variables
✅ **Automatic dark mode** - Dark mode colors automatically applied via `@theme dark`
✅ **Consistent standards** - Clear guidelines prevent color inconsistencies
✅ **Semantic naming** - Color names describe purpose, not appearance
✅ **Type-safe** - TailwindCSS utilities remain type-safe and autocomplete-friendly
