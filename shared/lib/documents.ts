import fs from 'fs';
import path from 'path';

export interface DocumentFile {
  title: string;
  href: string;
  filename: string;
  size?: number;
  modified?: Date;
}

export function scanDocumentsFolder(): DocumentFile[] {
  const docsPath = path.join(process.cwd(), 'public', 'docs');
  
  try {
    // Проверяем существование папки
    if (!fs.existsSync(docsPath)) {
      console.warn('Папка docs не найдена:', docsPath);
      return [];
    }

    const files = fs.readdirSync(docsPath);
    const documents: DocumentFile[] = [];

    files.forEach(file => {
      const filePath = path.join(docsPath, file);
      const stats = fs.statSync(filePath);
      
      // Проверяем, что это файл (не папка)
      if (stats.isFile()) {
        const ext = path.extname(file).toLowerCase();
        
        // Поддерживаем только PDF файлы
        if (ext === '.pdf') {
          const filename = path.basename(file);
          
          // Создаем читаемое название из имени файла
          let title = filename
            .replace(/\.pdf$/i, '') // убираем расширение
            .replace(/[-_]/g, ' ') // заменяем дефисы и подчеркивания на пробелы
            .replace(/\s+/g, ' ') // заменяем множественные пробелы на один
            .trim(); // убираем пробелы в начале и конце
          
          // Если название содержит только технические символы, используем более читаемое название
          if (title.length > 100 || /^[A-Z0-9_-]+$/.test(title)) {
            // Пытаемся извлечь смысл из технического названия
            const match = title.match(/(\d{4})(\d{2})(\d{2})/); // ищем дату в формате YYYYMMDD
            if (match) {
              const [, year, month, day] = match;
              title = `Документ от ${day}.${month}.${year}`;
            } else {
              title = 'Документ';
            }
          }
          
          // Делаем первую букву заглавной (работает с кириллицей)
          if (title.length > 0) {
            title = title.charAt(0).toUpperCase() + title.slice(1);
          }

          documents.push({
            title,
            href: `/docs/${encodeURIComponent(filename)}`, // кодируем для корректной работы с русскими символами
            filename,
            size: stats.size,
            modified: stats.mtime
          });
        }
      }
    });

    // Сортируем по дате изменения (новые сначала)
    return documents.sort((a, b) => {
      if (a.modified && b.modified) {
        return b.modified.getTime() - a.modified.getTime();
      }
      return 0;
    });

  } catch (error) {
    console.error('Ошибка при сканировании папки docs:', error);
    return [];
  }
}

// Функция для получения списка документов (для использования в компонентах)
export function getDocuments(): DocumentFile[] {
  return scanDocumentsFolder();
}
