
import { PriorityLevel, StressLevel, IssueCategory } from '../types';

const CRITICAL_KEYWORDS = [
  'safety', 'emergency', 'harassment', 'suicide', 'self-harm', 'danger', 
  'threat', 'assault', 'weapon', 'collapsed', 'fire', 'electric shock'
];

const URGENT_KEYWORDS = [
  'broken', 'leak', 'medical', 'pain', 'sick', 'anxiety', 'panic', 
  'theft', 'missing', 'failed', 'exam stress', 'fever'
];

export const detectPriority = (
  text: string, 
  stress: StressLevel, 
  category: IssueCategory
): PriorityLevel => {
  const lowerText = text.toLowerCase();
  
  // Rule 1: High Stress + Mental Health Category
  if (stress === StressLevel.HIGH && category === IssueCategory.MENTAL_HEALTH) {
    return PriorityLevel.CRITICAL;
  }

  // Rule 2: Critical Keywords
  if (CRITICAL_KEYWORDS.some(k => lowerText.includes(k))) {
    return PriorityLevel.CRITICAL;
  }

  // Rule 3: High Stress or Urgent Keywords
  if (stress === StressLevel.HIGH || URGENT_KEYWORDS.some(k => lowerText.includes(k))) {
    return PriorityLevel.URGENT;
  }

  // Rule 4: Medium Stress
  if (stress === StressLevel.MEDIUM) {
    return PriorityLevel.URGENT;
  }

  return PriorityLevel.NORMAL;
};
