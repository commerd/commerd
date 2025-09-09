'use client';

import { createContext, useContext, ReactNode } from 'react';
import { type Locale } from './config';
import { type MessageNamespace } from './loader';

// Type for the client context
interface ClientI18nContextType {
  locale: Locale;
  messages: Record<MessageNamespace, Record<string, any>>;
}

// Create the context
const ClientI18nContext = createContext<ClientI18nContextType | null>(null);

// Provider component - should be used sparingly and only with minimal message sets
interface ClientI18nProviderProps {
  children: ReactNode;
  locale: Locale;
  messages: Record<MessageNamespace, Record<string, any>>;
}

export function ClientI18nProvider({ 
  children, 
  locale, 
  messages 
}: ClientI18nProviderProps) {
  return (
    <ClientI18nContext.Provider value={{ locale, messages }}>
      {children}
    </ClientI18nContext.Provider>
  );
}

// Hook to use messages in client components
export function useClientMessages() {
  const context = useContext(ClientI18nContext);
  
  if (!context) {
    throw new Error('useClientMessages must be used within a ClientI18nProvider');
  }
  
  return context;
}

// Helper function to get nested values
function getNestedValue(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Hook to get specific messages with type safety
export function useMessages(namespace: MessageNamespace) {
  const { messages } = useClientMessages();
  return messages[namespace] || {};
}

// Hook to get a specific message by key
export function useMessage(
  namespace: MessageNamespace, 
  key: string, 
  fallback?: string
): string {
  const messages = useMessages(namespace);
  const value = getNestedValue(messages, key);
  
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
