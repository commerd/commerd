import { type Locale } from './config';
import { loadMessagesForLocale, type MessageNamespace } from './loader';

/**
 * Server-side message provider for RSC components
 * Loads messages on the server and provides them to components
 */
export class ServerMessageProvider {
  private messages: Record<MessageNamespace, Record<string, any>>;
  private locale: Locale;

  constructor(
    locale: Locale,
    messages: Record<MessageNamespace, Record<string, any>>
  ) {
    this.locale = locale;
    this.messages = messages;
  }

  /**
   * Get messages for a specific namespace
   */
  getMessages(namespace: MessageNamespace): Record<string, any> {
    return this.messages[namespace] || {};
  }

  /**
   * Get a specific message by key (supports dot notation)
   */
  getMessage(namespace: MessageNamespace, key: string, fallback?: string): string {
    const messages = this.getMessages(namespace);
    const value = this.getNestedValue(messages, key);
    
    if (typeof value === 'string') {
      return value;
    }
    
    if (fallback) {
      console.warn(`Message key "${namespace}.${key}" not found, using fallback: "${fallback}"`);
      return fallback;
    }
    
    console.warn(`Message key "${namespace}.${key}" not found and no fallback provided`);
    return key;
  }

  /**
   * Get nested value from messages object using dot notation
   */
  private getNestedValue(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Get current locale
   */
  getLocale(): Locale {
    return this.locale;
  }

  /**
   * Get all loaded messages (for debugging)
   */
  getAllMessages(): Record<MessageNamespace, Record<string, any>> {
    return this.messages;
  }
}

/**
 * Create a server message provider for the given locale and namespaces
 * This should be called in Server Components (layout, page, etc.)
 */
export async function createServerMessageProvider(
  locale: Locale,
  namespaces: MessageNamespace[]
): Promise<ServerMessageProvider> {
  const messages = await loadMessagesForLocale(locale, namespaces);
  return new ServerMessageProvider(locale, messages);
}

/**
 * Hook-like function for server components to get messages
 * Usage: const t = useServerMessages('header', 'navigation.home')
 */
export function useServerMessages(
  provider: ServerMessageProvider,
  namespace: MessageNamespace,
  key?: string
) {
  if (key) {
    return provider.getMessage(namespace, key);
  }
  return provider.getMessages(namespace);
}
