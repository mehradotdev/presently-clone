export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// CSV parsing and validation utilities
export function parseCSVLine(csvContent: string, startIndex: number): { fields: string[], nextIndex: number } | null {
  const fields: string[] = [];
  let currentField = '';
  let inQuotes = false;
  let i = startIndex;
  
  while (i < csvContent.length) {
    const char = csvContent[i];
    const nextChar = csvContent[i + 1];
    
    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote - add single quote to field
          currentField += '"';
          i += 2; // Skip both quotes
          continue;
        } else {
          // End of quoted field
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        // Regular character inside quotes (including newlines)
        currentField += char;
        i++;
        continue;
      }
    } else {
      if (char === '"') {
        // Start of quoted field
        inQuotes = true;
        i++;
        continue;
      } else if (char === ',') {
        // Field separator
        fields.push(currentField);
        currentField = '';
        i++;
        continue;
      } else if (char === '\n' || char === '\r') {
        // End of line
        if (currentField || fields.length > 0) {
          fields.push(currentField);
        }
        
        // Skip \r\n or \n\r combinations
        if ((char === '\r' && nextChar === '\n') || (char === '\n' && nextChar === '\r')) {
          i += 2;
        } else {
          i++;
        }
        
        return { fields, nextIndex: i };
      } else {
        // Regular character
        currentField += char;
        i++;
        continue;
      }
    }
  }
  
  // End of content
  if (currentField || fields.length > 0) {
    fields.push(currentField);
  }
  
  return fields.length > 0 ? { fields, nextIndex: i } : null;
}

export function validateCSVFormat(csvContent: string): Array<{ date: string; content: string }> {
  const trimmedContent = csvContent.trim();
  
  if (!trimmedContent) {
    throw new Error("CSV file is empty.");
  }

  const entries: Array<{ date: string; content: string }> = [];
  let currentIndex = 0;
  let lineNumber = 1;
  let isFirstLine = true;

  while (currentIndex < trimmedContent.length) {
    const result = parseCSVLine(trimmedContent, currentIndex);
    
    if (!result) {
      break;
    }
    
    const { fields, nextIndex } = result;
    currentIndex = nextIndex;
    
    // Skip empty lines
    if (fields.length === 0 || (fields.length === 1 && fields[0].trim() === '')) {
      lineNumber++;
      continue;
    }
    
    if (isFirstLine) {
      // Validate header
      if (fields.length < 2) {
        throw new Error("CSV file must contain at least 2 columns (entryDate and entryContent).");
      }
      
      const header1 = fields[0].toLowerCase().trim();
      const header2 = fields[1].toLowerCase().trim();
      
      if (!header1.includes('entrydate') || !header2.includes('entrycontent')) {
        throw new Error("CSV file must contain 'entryDate' and 'entryContent' columns.");
      }
      
      isFirstLine = false;
      lineNumber++;
      continue;
    }
    
    // Process data rows
    if (fields.length < 2) {
      throw new Error(`Invalid CSV format on line ${lineNumber}. Expected at least 2 fields.`);
    }
    
    const date = fields[0].trim();
    const content = fields[1].trim();
    
    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error(`Invalid date format on line ${lineNumber}. Expected YYYY-MM-DD format, got: ${date}`);
    }
    
    // Validate that it's a real date
    const dateObj = new Date(date + 'T00:00:00');
    if (isNaN(dateObj.getTime())) {
      throw new Error(`Invalid date on line ${lineNumber}: ${date}`);
    }
    
    if (content) {
      entries.push({ date, content });
    }
    
    lineNumber++;
  }
  
  if (entries.length === 0) {
    throw new Error("No valid entries found in the CSV file.");
  }
  
  return entries;
}

export function generateCSVContent(logs: Array<{ date: string; content: string }>): string {
  // Filter out empty entries and sort by date descending
  const validEntries = logs
    .filter(log => log.content.trim() !== "")
    .sort((a, b) => b.date.localeCompare(a.date));

  // Create CSV content
  const csvHeader = "entryDate,entryContent\n";
  const csvRows = validEntries.map(log => {
    // Use YYYY-MM-DD format for easier data import
    const formattedDate = log.date; // Already in YYYY-MM-DD format
    
    // Escape quotes in content and wrap in quotes to preserve newlines
    const escapedContent = log.content.replace(/"/g, '""');
    return `"${formattedDate}","${escapedContent}"`;
  }).join('\n');

  return csvHeader + csvRows;
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}
