import { NextResponse } from 'next/server';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const messagesDir = join(process.cwd(), 'src/messages');
    const locales = readdirSync(messagesDir);
    
    const files: Array<{
      name: string;
      path: string;
      locale: string;
      keys: number;
      lastModified: string;
    }> = [];

    for (const locale of locales) {
      const localeDir = join(messagesDir, locale);
      const localeFiles = readdirSync(localeDir);
      
      for (const file of localeFiles) {
        if (file.endsWith('.json')) {
          const filePath = join(localeDir, file);
          const stats = statSync(filePath);
          
          // Count keys in the file
          let keyCount = 0;
          try {
            const content = require(filePath);
            keyCount = countKeys(content);
          } catch (error) {
            console.error(`Error reading ${filePath}:`, error);
          }
          
          files.push({
            name: file.replace('.json', ''),
            path: `src/messages/${locale}/${file}`,
            locale,
            keys: keyCount,
            lastModified: stats.mtime.toISOString().split('T')[0],
          });
        }
      }
    }

    // Sort by locale, then by name
    files.sort((a, b) => {
      if (a.locale !== b.locale) {
        return a.locale.localeCompare(b.locale);
      }
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json(files);
  } catch (error) {
    console.error('Error reading message files:', error);
    return NextResponse.json(
      { error: 'Failed to read message files' },
      { status: 500 }
    );
  }
}

function countKeys(obj: any, prefix = ''): number {
  let count = 0;
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      count += countKeys(value, prefix + key + '.');
    } else {
      count++;
    }
  }
  
  return count;
}
