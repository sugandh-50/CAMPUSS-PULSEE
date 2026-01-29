
import { StudentIssue, IssueCategory, StressLevel, IssueStatus, PriorityLevel } from './types';

export const mockIssues: StudentIssue[] = [
  {
    id: '1',
    studentId: 'ROLL101',
    category: IssueCategory.HOSTEL,
    description: 'Water leakage in Block B Room 302 causing electrical sparks.',
    stressLevel: StressLevel.MEDIUM,
    isAnonymous: false,
    priority: PriorityLevel.URGENT,
    status: IssueStatus.IN_PROGRESS,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    department: 'Engineering'
  },
  {
    id: '2',
    studentId: 'ROLL105',
    category: IssueCategory.MENTAL_HEALTH,
    description: 'Feeling overwhelmed with exams and having severe panic attacks.',
    stressLevel: StressLevel.HIGH,
    isAnonymous: true,
    priority: PriorityLevel.CRITICAL,
    status: IssueStatus.PENDING,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    department: 'Computer Science'
  },
  {
    id: '3',
    studentId: 'ROLL110',
    category: IssueCategory.ACADEMIC,
    description: 'Inquiry regarding credit transfer for summer internship.',
    stressLevel: StressLevel.LOW,
    isAnonymous: false,
    priority: PriorityLevel.NORMAL,
    status: IssueStatus.RESOLVED,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    department: 'Business'
  },
  {
    id: '4',
    studentId: 'ROLL112',
    category: IssueCategory.FACILITIES,
    description: 'Broken AC in library common area.',
    stressLevel: StressLevel.LOW,
    isAnonymous: false,
    priority: PriorityLevel.NORMAL,
    status: IssueStatus.PENDING,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    department: 'Arts'
  }
];
