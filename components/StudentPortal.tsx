
import React, { useState } from 'react';
import { IssueCategory, StressLevel, StudentIssue, IssueStatus, PriorityLevel } from '../types';
import { detectPriority } from '../services/priorityEngine';
import { AlertCircle, CheckCircle, Clock, Send, Shield, User } from 'lucide-react';

interface StudentPortalProps {
  issues: StudentIssue[];
  onSubmit: (issue: Omit<StudentIssue, 'id' | 'createdAt' | 'priority' | 'status' | 'department'>) => void;
}

const StudentPortal: React.FC<StudentPortalProps> = ({ issues, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>(IssueCategory.ACADEMIC);
  const [stress, setStress] = useState<StressLevel>(StressLevel.LOW);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    onSubmit({
      studentId: 'DEMO-STUDENT',
      category,
      description,
      stressLevel: stress,
      isAnonymous
    });
    setDescription('');
    setStress(StressLevel.LOW);
  };

  const getStatusBadge = (status: IssueStatus) => {
    switch (status) {
      case IssueStatus.PENDING: return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">Pending</span>;
      case IssueStatus.IN_PROGRESS: return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">In Progress</span>;
      case IssueStatus.RESOLVED: return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Resolved</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Student Issue Portal</h1>
        <p className="text-gray-500 mt-2">Speak up securely. Your well-being matters to us.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Reporting Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as IssueCategory)}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
              >
                {Object.values(IssueCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Describe the Issue</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Be as detailed as possible..."
                className="w-full h-32 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Self-Reported Stress Level</label>
              <div className="flex gap-4">
                {Object.values(StressLevel).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setStress(lvl)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium border transition-colors ${
                      stress === lvl 
                        ? 'bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 py-2">
              <input 
                type="checkbox" 
                id="anonymous" 
                checked={isAnonymous} 
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-600 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Report Anonymously
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Report
            </button>
          </form>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-indigo-900 font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> How it works
            </h3>
            <p className="text-sm text-indigo-700 leading-relaxed">
              Our system uses smart analysis to prioritize your issue. Critical concerns regarding safety or mental health are flagged for immediate action.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">My Recent Reports</h3>
            <div className="space-y-4">
              {issues.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No reports submitted yet.</p>
              ) : (
                issues.slice(0, 5).map(issue => (
                  <div key={issue.id} className="border-b border-gray-50 pb-3 last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{issue.category}</span>
                      {getStatusBadge(issue.status)}
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-1">{issue.description}</p>
                    <span className="text-[10px] text-gray-400">{new Date(issue.createdAt).toLocaleDateString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
