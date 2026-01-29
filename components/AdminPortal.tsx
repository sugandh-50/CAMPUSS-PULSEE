
import React from 'react';
import { StudentIssue, IssueStatus, PriorityLevel, IssueCategory } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { LayoutDashboard, ListFilter, UserCheck, AlertTriangle, TrendingUp, Map } from 'lucide-react';

interface AdminPortalProps {
  issues: StudentIssue[];
  onUpdateStatus: (id: string, status: IssueStatus) => void;
}

const COLORS = ['#6366f1', '#f59e0b', '#ef4444', '#10b981'];

const AdminPortal: React.FC<AdminPortalProps> = ({ issues, onUpdateStatus }) => {
  // Stats calculation
  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === IssueStatus.PENDING).length,
    critical: issues.filter(i => i.priority === PriorityLevel.CRITICAL).length,
    resolved: issues.filter(i => i.status === IssueStatus.RESOLVED).length,
  };

  // Chart data: Issues per Department
  const deptData = Array.from(new Set(issues.map(i => i.department))).map(dept => ({
    name: dept,
    count: issues.filter(i => i.department === dept).length
  }));

  // Chart data: Priority Distribution
  const priorityData = [
    { name: 'Critical', value: issues.filter(i => i.priority === PriorityLevel.CRITICAL).length },
    { name: 'Urgent', value: issues.filter(i => i.priority === PriorityLevel.URGENT).length },
    { name: 'Normal', value: issues.filter(i => i.priority === PriorityLevel.NORMAL).length },
  ];

  const getPriorityBadge = (p: PriorityLevel) => {
    switch (p) {
      case PriorityLevel.CRITICAL: return <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-[10px] font-bold">CRITICAL</span>;
      case PriorityLevel.URGENT: return <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold">URGENT</span>;
      case PriorityLevel.NORMAL: return <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold">NORMAL</span>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Stats Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: stats.total, icon: <LayoutDashboard />, color: 'text-gray-600' },
          { label: 'Pending Action', value: stats.pending, icon: <ListFilter />, color: 'text-amber-600' },
          { label: 'Critical Alert', value: stats.critical, icon: <AlertTriangle />, color: 'text-rose-600' },
          { label: 'Success Rate', value: `${Math.round((stats.resolved/stats.total)*100)}%`, icon: <UserCheck />, color: 'text-green-600' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
              <p className={`text-2xl font-bold mt-1 ${item.color}`}>{item.value}</p>
            </div>
            <div className={`${item.color} bg-gray-50 p-3 rounded-lg`}>{item.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" /> Department-wise Issue Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Map className="w-5 h-5 text-indigo-600" /> Priority Concentration
            </h3>
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="hidden md:block w-1/2 text-sm text-gray-600">
                <p className="mb-2 font-medium">Insights:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Critical issues require &lt; 2h response</li>
                  <li>Academic queries trending up</li>
                  <li>Hostel concerns concentrated in Block B</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Issue List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[700px]">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <ListFilter className="w-5 h-5 text-indigo-600" /> Active Feed
          </h3>
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            {issues.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(issue => (
              <div key={issue.id} className="p-4 rounded-lg border border-gray-50 bg-gray-50/50 hover:bg-white transition-all shadow-hover">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(issue.priority)}
                    <span className="text-[10px] text-gray-400">{new Date(issue.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <select 
                    value={issue.status}
                    onChange={(e) => onUpdateStatus(issue.id, e.target.value as IssueStatus)}
                    className="text-[10px] font-bold uppercase border-none bg-transparent focus:ring-0 cursor-pointer text-indigo-600"
                  >
                    {Object.values(IssueStatus).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <p className="text-xs font-semibold text-indigo-700 mb-1">{issue.category}</p>
                <p className="text-sm text-gray-700 mb-2 leading-tight">{issue.description}</p>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-[10px] text-gray-500 font-medium">
                    {issue.isAnonymous ? '👤 Anonymous' : `🆔 ${issue.studentId}`}
                  </span>
                  <span className="text-[10px] text-gray-500 italic">Stress: {issue.stressLevel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
