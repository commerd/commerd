# Internationalization Best Practices - Restructured

This document outlines the improved internationalization system that follows best practices for performance, maintainability, and scalability.

## 🎯 **Key Improvements**

### **1. Per-Locale, Per-Namespace Files**
- **Structure**: `src/messages/{locale}/{namespace}.json`
- **Benefits**: Route-level code-splitting, easier translation ownership, smaller PRs
- **Example**: `en/header.json`, `th/footer.json`, `en/home.json`

### **2. Server-First Loading (RSC)**
- **Approach**: Load messages in Server Components with dynamic imports
- **Performance**: Only load what's needed for the current route
- **Caching**: Built-in caching to avoid repeated file system reads

### **3. Minimal Client Bundle**
- **Strategy**: Pass only needed strings to Client Components via props
- **Avoid**: Hydrating huge providers with all locales/namespaces
- **Result**: Smaller JavaScript bundles, faster page loads

## 📁 **File Structure**

```
src/
├── messages/
│   ├── en/
│   │   ├── common.json      # Shared UI elements
│   │   ├── header.json      # Navigation, logo, actions
│   │   ├── footer.json      # Footer links, newsletter
│   │   ├── home.json        # Home page content
│   │   └── about.json       # About page content
│   └── th/
│       ├── common.json      # Thai translations
│       ├── header.json
│       ├── footer.json
│       ├── home.json
│       └── about.json
├── lib/i18n/
│   ├── config.ts           # Locale configuration
│   ├── loader.ts           # Message loading & caching
│   ├── server.ts           # Server-side message provider
│   └── client.tsx          # Minimal client context
└── components/
    ├── header/
    │   ├── ServerHeaderV2.tsx  # Server component (recommended)
    │   └── Header.tsx          # Client component (interactive)
    └── footer/
        ├── ServerFooterV2.tsx  # Server component (recommended)
        └── Footer.tsx          # Client component (interactive)
```

## 🚀 **Usage Examples**

### **Server Components (Recommended)**

```tsx
// src/app/page.tsx
import { createServerMessageProvider } from '@/lib/i18n/server';
import { ServerHeaderV2 } from '@/components/header/ServerHeaderV2';

export default async function HomePage() {
  const locale = 'en';
  
  // Load only the messages needed for this page
  const messages = await createServerMessageProvider(locale, [
    'header',
    'footer', 
    'home'
  ]);
  
  return (
    <div>
      <ServerHeaderV2 locale={locale} messages={messages} />
      {/* Page content */}
    </div>
  );
}
```

### **Server Component with Messages**

```tsx
// src/components/header/ServerHeaderV2.tsx
import { ServerMessageProvider } from '@/lib/i18n/server';

interface ServerHeaderV2Props {
  locale: Locale;
  messages: ServerMessageProvider;
}

export function ServerHeaderV2({ locale, messages }: ServerHeaderV2Props) {
  const t = messages.getMessages('header');
  
  return (
    <header>
      <h1>{t.logo}</h1>
      <nav>
        <Link href="/">{t.navigation.home}</Link>
        <Link href="/about">{t.navigation.about}</Link>
      </nav>
    </header>
  );
}
```

### **Client Components (When Needed)**

```tsx
// src/components/InteractiveComponent.tsx
'use client';
import { ClientI18nProvider, useMessage } from '@/lib/i18n/client';

// In your page component
export default async function Page() {
  const messages = await createServerMessageProvider('en', ['common']);
  
  return (
    <ClientI18nProvider 
      locale="en" 
      messages={{ common: messages.getMessages('common') }}
    >
      <InteractiveComponent />
    </ClientI18nProvider>
  );
}

// In your client component
function InteractiveComponent() {
  const saveText = useMessage('common', 'save');
  
  return <button>{saveText}</button>;
}
```

## ⚡ **Performance Benefits**

### **1. Route-Level Code Splitting**
- Each route loads only its required namespaces
- No unused translations in the bundle
- Faster initial page loads

### **2. Server-Side Caching**
- Messages are cached after first load
- No repeated file system reads
- Optimal performance for repeated requests

### **3. Minimal Client Bundle**
- Client components receive only needed strings
- No large translation objects in JavaScript
- Smaller bundle sizes, faster hydration

## 🔧 **Message Loading**

### **Dynamic Imports**
```typescript
// Automatically loads and caches messages
const messages = await loadMessages('en', 'header');
```

### **Multiple Namespaces**
```typescript
// Load multiple namespaces at once
const messages = await loadMessagesForLocale('en', [
  'header',
  'footer',
  'home'
]);
```

### **Fallback Support**
```typescript
// Automatic fallback to English if Thai not available
const messages = await loadMessages('th', 'header');
// Falls back to en/header.json if th/header.json doesn't exist
```

## 🎨 **Adding New Content**

### **1. Create Message Files**
```json
// src/messages/en/newpage.json
{
  "title": "New Page",
  "description": "This is a new page",
  "sections": {
    "intro": "Welcome to our new page",
    "features": "Check out these features"
  }
}
```

### **2. Add to Namespace Types**
```typescript
// src/lib/i18n/loader.ts
export type MessageNamespace = 
  | 'common' 
  | 'header' 
  | 'footer' 
  | 'home' 
  | 'newpage'; // Add new namespace
```

### **3. Use in Components**
```tsx
// Load the new namespace
const messages = await createServerMessageProvider('en', ['newpage']);

// Use in component
const t = messages.getMessages('newpage');
return <h1>{t.title}</h1>;
```

## 🌍 **Adding New Languages**

### **1. Update Configuration**
```typescript
// src/lib/i18n/config.ts
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

### **2. Create Message Files**
```bash
# Create directory structure
mkdir -p src/messages/ja
touch src/messages/ja/{common,header,footer,home}.json
```

### **3. Add Translations**
```json
// src/messages/ja/header.json
{
  "logo": "Commerd",
  "tagline": "革新的なビジネスソリューション",
  "navigation": {
    "home": "ホーム",
    "about": "会社概要"
  }
}
```

## 🔍 **Type Safety & Validation**

### **Key Validation**
```typescript
// Automatic fallback for missing keys
const title = messages.getMessage('home', 'title', 'Default Title');
```

### **Development Warnings**
```typescript
// Console warnings for missing keys in development
console.warn(`Message key "home.title" not found, using fallback`);
```

## 📊 **SEO & Localization**

### **Locale-Specific Metadata**
```tsx
// Each locale gets proper metadata
export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const seoContent = getSEOContent('home', params.locale);
  return generateSEOMetadata(seoContent, params.locale, `/${params.locale}`);
}
```

### **Proper HTML Attributes**
```tsx
// Correct lang attribute
<html lang={locale}>
```

## 🚀 **Best Practices Summary**

1. **Use Server Components** for static content (header, footer, pages)
2. **Use Client Components** only for interactive features (forms, language switcher)
3. **Load minimal namespaces** per route
4. **Cache messages** on the server
5. **Pass only needed strings** to client components
6. **Use fallbacks** for missing translations
7. **Keep message files small** and focused
8. **Validate keys** in development
9. **Use proper SEO** metadata per locale
10. **Plan for scalability** from the start

This system provides the **fastest, most maintainable, and most scalable** internationalization solution for your Next.js application!
