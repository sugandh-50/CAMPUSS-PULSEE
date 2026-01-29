
import React, { useState, useEffect } from 'react';
import { User, StudentIssue, IssueStatus, PriorityLevel, IssueCategory } from './types';
import { mockIssues } from './store';
import { detectPriority } from './services/priorityEngine';
import StudentPortal from './components/StudentPortal';
import AdminPortal from './components/AdminPortal';
import { ShieldCheck, HeartPulse, LogOut, Bell, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [issues, setIssues] = useState<StudentIssue[]>(mockIssues);
  const [isLoginModal, setIsLoginModal] = useState(true);

  // Auto-login for demo purposes or handling login logic
  const handleLogin = (role: 'student' | 'admin') => {
    setUser({
      role,
      id: role === 'student' ? 'ROLL101' : 'ADMIN_01',
      name: role === 'student' ? 'Alex Johnson' : 'Administrator'
    });
    setIsLoginModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoginModal(true);
  };

  const handleIssueSubmit = (data: Omit<StudentIssue, 'id' | 'createdAt' | 'priority' | 'status' | 'department'>) => {
    const priority = detectPriority(data.description, data.stressLevel, data.category);
    const newIssue: StudentIssue = {
      ...data,
      id: (issues.length + 1).toString(),
      createdAt: new Date().toISOString(),
      priority,
      status: IssueStatus.PENDING,
      department: ['Engineering', 'Arts', 'Science', 'Business'][Math.floor(Math.random() * 4)] // Simulated random dept
    };
    setIssues([newIssue, ...issues]);
  };

  const updateIssueStatus = (id: string, status: IssueStatus) => {
    setIssues(prev => prev.map(issue => issue.id === id ? { ...issue, status } : issue));
  };

  if (isLoginModal) {
    return (
      <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-6">
            <HeartPulse className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CampusPulse</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">Intelligence-driven campus well-being and issue monitoring system.</p>
          
          <div className="space-y-4">
            <button 
              onClick={() => handleLogin('student')}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              Continue as Student
            </button>
            <button 
              onClick={() => handleLogin('admin')}
              className="w-full bg-white text-indigo-600 border-2 border-indigo-100 py-4 rounded-xl font-semibold hover:border-indigo-200 hover:bg-gray-50 transition"
            >
              Administrator Login
            </button>
          </div>
          <p className="mt-8 text-xs text-gray-400">© 2024 CampusPulse Intelligence Systems</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">CampusPulse</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">{user?.role}</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-indigo-600 transition">
                <Bell className="w-5 h-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-rose-600 transition p-2 rounded-lg hover:bg-rose-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {user?.role === 'student' ? (
          <StudentPortal 
            issues={issues.filter(i => i.studentId === user.id || (i.isAnonymous && i.studentId === 'DEMO-STUDENT'))} 
            onSubmit={handleIssueSubmit} 
          />
        ) : (
          <AdminPortal issues={issues} onUpdateStatus={updateIssueStatus} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs">Rule-based Priority Engine Active</span>
          </div>
          <p className="text-xs text-gray-500">Secure & Confidential Reporting System</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
