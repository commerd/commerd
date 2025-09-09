// Configuration
export { i18nConfig, type Locale } from './config';

// Message loading
export { 
  loadMessages, 
  loadMessagesForLocale, 
  getNestedValue, 
  getMessage,
  type MessageNamespace 
} from './loader';

// Server-side message provider
export { 
  ServerMessageProvider, 
  createServerMessageProvider, 
  useServerMessages 
} from './server';

// Client-side context (use sparingly)
export { 
  ClientI18nProvider, 
  useClientMessages, 
  useMessages, 
  useMessage 
} from './client';
