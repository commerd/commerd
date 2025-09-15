import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'File parameter is required' },
        { status: 400 }
      );
    }

    // Security check: ensure the file is within the messages directory
    if (!file.startsWith('src/messages/') || !file.endsWith('.json')) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }

    const filePath = join(process.cwd(), file);
    const content = readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading message data:', error);
    return NextResponse.json(
      { error: 'Failed to read message data' },
      { status: 500 }
    );
  }
}
