import { NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const { file, data } = await request.json();
    
    if (!file || !data) {
      return NextResponse.json(
        { error: 'File and data parameters are required' },
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
    
    // Write the data back to the file with proper formatting
    const formattedData = JSON.stringify(data, null, 2);
    writeFileSync(filePath, formattedData, 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving message data:', error);
    return NextResponse.json(
      { error: 'Failed to save message data' },
      { status: 500 }
    );
  }
}
