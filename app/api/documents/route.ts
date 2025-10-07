import { NextResponse } from 'next/server';
import { scanDocumentsFolder } from '@shared/lib/documents';

export async function GET() {
  try {
    const documents = scanDocumentsFolder();
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Ошибка при получении документов:', error);
    return NextResponse.json({ error: 'Ошибка при получении документов' }, { status: 500 });
  }
}
