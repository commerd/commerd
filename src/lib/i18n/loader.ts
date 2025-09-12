import { type Locale } from './config';

// Type for message namespaces
export type MessageNamespace = 'common' | 'header' | 'footer' | 'home' | 'about' | 'seo' | 'contact' | 'conversion-optimization';

// Cache for loaded messages to avoid repeated file system reads
const messageCache = new Map<string, any>();

/**
 * Load messages for a specific locale and namespace
 * Uses dynamic imports and caching for optimal performance
 */
export async function loadMessages(
  locale: Locale,
  namespace: MessageNamespace
): Promise<Record<string, any>> {
  // Defensive fix: ignore namespaces containing dots (asset-like paths)
  if (namespace.includes('.')) {
    console.warn(`Skipping namespace with dot: ${namespace}`);
    return {};
  }

  const cacheKey = `${locale}/${namespace}`;
  
  // Return cached messages if available
  if (messageCache.has(cacheKey)) {
    return messageCache.get(cacheKey);
  }

  try {
    // Dynamic import of the message file
    const messages = await import(`../../messages/${locale}/${namespace}.json`);
    const messageData = messages.default || messages;
    
    // Cache the messages
    messageCache.set(cacheKey, messageData);
    
    return messageData;
  } catch (error) {
    console.warn(`Failed to load messages for ${cacheKey}:`, error);
    
    // Fallback to English if available
    if (locale !== 'en') {
      try {
        const fallbackMessages = await import(`../../messages/en/${namespace}.json`);
        const fallbackData = fallbackMessages.default || fallbackMessages;
        messageCache.set(cacheKey, fallbackData);
        return fallbackData;
      } catch (fallbackError) {
        console.error(`Failed to load fallback messages for ${namespace}:`, fallbackError);
      }
    }
    
    // Return empty object as last resort
    return {};
  }
}

/**
 * Load multiple namespaces for a locale
 * Optimized for loading all required messages at once
 */
export async function loadMessagesForLocale(
  locale: Locale,
  namespaces: MessageNamespace[]
): Promise<Record<MessageNamespace, Record<string, any>>> {
  // Filter out namespaces containing dots (asset-like paths)
  const safeNamespaces = namespaces.filter(ns => !ns.includes("."));
  
  const promises = safeNamespaces.map(async (namespace) => {
    const messages = await loadMessages(locale, namespace);
    return [namespace, messages] as const;
  });

  const results = await Promise.all(promises);
  
  return Object.fromEntries(results) as Record<MessageNamespace, Record<string, any>>;
}

/**
 * Get nested value from messages object using dot notation
 * Example: getNestedValue(messages, 'navigation.home') -> messages.navigation.home
 */
export function getNestedValue(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Type-safe message getter with fallback support
 */
export function getMessage(
  messages: Record<string, any>,
  key: string,
  fallback?: string
): string {
  const value = getNestedValue(messages, key);
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (fallback) {
    console.warn(`Message key "${key}" not found, using fallback: "${fallback}"`);
    return fallback;
  }
  
  console.warn(`Message key "${key}" not found and no fallback provided`);
  return key; // Return the key itself as last resort
}

/**
 * Get dictionary for a specific locale - loads all namespaces
 */
export async function getDictionary(locale: Locale): Promise<Record<string, any>> {
  const namespaces: MessageNamespace[] = ['common', 'header', 'footer', 'home', 'about'];
  const messages = await loadMessagesForLocale(locale, namespaces);
  
  // Flatten the messages into a single dictionary
  const dict: Record<string, any> = {};
  Object.entries(messages).forEach(([namespace, messages]) => {
    dict[namespace] = messages;
  });
  
  return dict;
}
