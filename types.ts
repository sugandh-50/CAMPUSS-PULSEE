
export enum IssueCategory {
  ACADEMIC = 'Academic',
  HOSTEL = 'Hostel',
  MENTAL_HEALTH = 'Mental Health',
  FACILITIES = 'Facilities'
}

export enum StressLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum PriorityLevel {
  NORMAL = 'Normal',
  URGENT = 'Urgent',
  CRITICAL = 'Critical'
}

export enum IssueStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  RESOLVED = 'Resolved'
}

export interface StudentIssue {
  id: string;
  studentId: string;
  category: IssueCategory;
  description: string;
  stressLevel: StressLevel;
  isAnonymous: boolean;
  priority: PriorityLevel;
  status: IssueStatus;
  createdAt: string;
  department: string;
}

export interface User {
  role: 'student' | 'admin';
  id: string;
  name: string;
}
