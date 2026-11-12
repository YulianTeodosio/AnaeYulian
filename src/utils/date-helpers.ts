/**
 * Date and calculation utilities for Ana & Yulian memory book.
 */

export interface RelationshipStats {
  daysTogether: number;
  monthsTogether: number;
  yearsTogether: number;
  formattedAnniversary: string;
}

/**
 * Calculates time elapsed since a start date.
 */
export function calculateRelationshipTime(startDateStr: string, currentDate = new Date()): RelationshipStats {
  const start = new Date(startDateStr);
  if (isNaN(start.getTime())) {
    return {
      daysTogether: 0,
      monthsTogether: 0,
      yearsTogether: 0,
      formattedAnniversary: '',
    };
  }

  const diffTime = Math.max(0, currentDate.getTime() - start.getTime());
  const daysTogether = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Approximate months and years
  const yearsTogether = Math.floor(daysTogether / 365.25);
  const monthsTogether = Math.floor(daysTogether / 30.44);

  const formattedAnniversary = start.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    daysTogether,
    monthsTogether,
    yearsTogether,
    formattedAnniversary,
  };
}

/**
 * Formats a date string (YYYY-MM-DD or ISO) into Portuguese editorial date.
 */
export function formatEditorialDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  return d.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Validates admin password.
 */
export function verifyAdminPassword(input: string, secret = 'anayulian'): boolean {
  if (!input) return false;
  return input.trim().toLowerCase() === secret.trim().toLowerCase();
}
