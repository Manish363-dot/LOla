import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { QRScanner } from './QRScanner';
import { AttendanceHistory } from './AttendanceHistory';
import { LeaveApplication } from './LeaveApplication';
import { StudentAnalytics } from './StudentAnalytics';
import { QrCode, History, FileText, BarChart3 } from 'lucide-react';

interface StudentDashboardProps {
  onLogout: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'scanner', name: 'Scan QR', icon: QrCode },
    { id: 'history', name: 'History', icon: History },
    { id: 'leave', name: 'Leave', icon: FileText },
  ];

  return (
    <Layout title="Student Portal - Smart Attendance System" onLogout={onLogout}>
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && <StudentAnalytics />}
          {activeTab === 'scanner' && <QRScanner />}
          {activeTab === 'history' && <AttendanceHistory />}
          {activeTab === 'leave' && <LeaveApplication />}
        </div>
      </div>
    </Layout>
  );
};