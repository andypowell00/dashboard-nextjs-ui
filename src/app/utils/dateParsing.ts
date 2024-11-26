const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  export function parseStringDate(dateString: string): Date | null {
    const parts = dateString.split(' ');
    if (parts.length !== 3) return null;
  
    const month = months.indexOf(parts[0]);
    if (month === -1) return null;
  
    const day = parseInt(parts[1].replace(',', ''), 10);
    const year = parseInt(parts[2], 10);
  
    if (isNaN(day) || isNaN(year)) return null;
  
    return new Date(year, month, day);
  }
  
  export function getCurrentMonthRegex(currentMonth: number, currentYear: number): string {
    return `^(${months[currentMonth]})\\s\\d{1,2},\\s${currentYear}$`;
  }
  
  