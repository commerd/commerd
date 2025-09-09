# Component Internationalization Guide

This guide explains the best practices for creating multi-language components in your Commerd project.

## 🎯 **Best Practice Approach**

We use a **centralized content management system** with **type-safe translations** and **dual rendering strategies**:

### **1. Centralized Content Management**
- All component text is stored in `src/lib/i18n/content.ts`
- Type-safe access with full TypeScript support
- Easy to maintain and update
- No prop drilling required

### **2. Dual Rendering Strategies**

#### **Server-Side Components** (Recommended for most cases)
- **Fastest**: No client-side JavaScript needed
- **Most Responsive**: Rendered on server, instant display
- **SEO Optimized**: Content available immediately
- **Best Performance**: Smaller bundle size

#### **Client-Side Components** (For interactive features)
- **Dynamic**: Can change language without page reload
- **Interactive**: Perfect for language switchers, forms
- **Hydrated**: Client-side interactivity after initial render

## 🚀 **Usage Examples**

### **Server-Side Component (Recommended)**

```tsx
// src/components/ui/ServerHero.tsx
import { useContent } from '@/lib/i18n/content';
import { type Locale } from '@/lib/i18n/config';

interface ServerHeroProps {
  locale: Locale;
}

export function ServerHero({ locale }: ServerHeroProps) {
  const t = useContent('hero', locale);

  return (
    <section>
      <h1>{t.title}</h1>
      <p>{t.subtitle}</p>
      <button>{t.getStarted}</button>
    </section>
  );
}

// Usage in page
export default function HomePage() {
  return (
    <div>
      <ServerHero locale="en" />
      <ServerHero locale="th" />
    </div>
  );
}
```

### **Client-Side Component (For Interactive Features)**

```tsx
// src/components/ui/Navigation.tsx
'use client';
import { useTranslations, useLocaleSwitcher } from '@/lib/i18n/hooks';

export function Navigation() {
  const t = useTranslations('navigation');
  const { currentLocale, switchLocale } = useLocaleSwitcher();

  return (
    <nav>
      <Link href="/">{t.home}</Link>
      <Link href="/about">{t.about}</Link>
      <button onClick={() => switchLocale('th')}>
        Switch to Thai
      </button>
    </nav>
  );
}
```

## 📁 **File Structure**

```
src/
├── lib/i18n/
│   ├── config.ts          # Language configuration
│   ├── content.ts         # Centralized content management
│   ├── hooks.ts          # Client-side hooks
│   └── index.ts          # Exports
├── components/ui/
│   ├── Navigation.tsx     # Client component (interactive)
│   ├── Hero.tsx          # Client component
│   ├── ServerHero.tsx    # Server component (recommended)
│   ├── ServerFeatures.tsx # Server component
│   └── index.ts          # Exports
└── app/
    ├── page.tsx          # Uses server components
    ├── [locale]/page.tsx # Uses both approaches
    └── demo/page.tsx     # Demonstrates both approaches
```

## 🎨 **Content Management**

### **Adding New Content**

1. **Add to content.ts:**
```typescript
export const componentContent = {
  // ... existing content
  newComponent: {
    en: {
      title: 'New Component',
      description: 'This is a new component',
      button: 'Click Me',
    },
    th: {
      title: 'คอมโพเนนต์ใหม่',
      description: 'นี่คือคอมโพเนนต์ใหม่',
      button: 'คลิกที่นี่',
    },
  },
};
```

2. **Use in component:**
```tsx
// Server component
const t = useContent('newComponent', locale);

// Client component
const t = useTranslations('newComponent');
```

### **Adding New Languages**

1. **Update config.ts:**
```typescript
export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'th', 'ja'], // Add new language
  localeNames: {
    en: 'English',
    th: 'ไทย',
    ja: '日本語', // Add new language
  },
};
```

2. **Add content for new language:**
```typescript
export const componentContent = {
  hero: {
    en: { /* English content */ },
    th: { /* Thai content */ },
    ja: { /* Japanese content */ }, // Add new language
  },
};
```

## ⚡ **Performance Benefits**

### **Server-Side Components**
- **Bundle Size**: Smaller JavaScript bundles
- **First Paint**: Instant content display
- **SEO**: Content available to crawlers immediately
- **Caching**: Can be cached at CDN level

### **Client-Side Components**
- **Interactivity**: Dynamic language switching
- **User Experience**: Smooth transitions
- **State Management**: Can maintain component state

## 🔧 **Best Practices**

### **1. Choose the Right Approach**
- **Use Server Components** for static content (hero, features, footer)
- **Use Client Components** for interactive features (navigation, forms, language switcher)

### **2. Content Organization**
- Group related content together
- Use descriptive keys
- Keep content structure consistent across languages

### **3. Type Safety**
- Always use TypeScript
- Leverage the type system for content keys
- Get autocomplete for all content

### **4. Performance**
- Prefer server components when possible
- Use client components only when interactivity is needed
- Minimize client-side JavaScript

## 🎯 **When to Use Each Approach**

### **Server Components** ✅
- Static content (hero sections, features, testimonials)
- SEO-critical content
- Performance-critical pages
- Content that doesn't change based on user interaction

### **Client Components** ✅
- Navigation with language switcher
- Interactive forms
- Dynamic content that changes based on user actions
- Components that need to maintain state

## 🚀 **Getting Started**

1. **Create your component:**
```tsx
// For server component
import { useContent } from '@/lib/i18n/content';

export function MyComponent({ locale }: { locale: Locale }) {
  const t = useContent('myComponent', locale);
  return <div>{t.title}</div>;
}
```

2. **Add content:**
```typescript
// In content.ts
myComponent: {
  en: { title: 'My Component' },
  th: { title: 'คอมโพเนนต์ของฉัน' },
}
```

3. **Use in page:**
```tsx
export default function Page() {
  return <MyComponent locale="en" />;
}
```

This approach gives you the **fastest, most responsive, and most maintainable** internationalization system for your components!
