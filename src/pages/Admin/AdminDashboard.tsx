import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { QRCodeGenerator } from './QRCodeGenerator';
import { StudentManagement } from './StudentManagement';
import { AttendanceReports } from './AttendanceReports';
import { LeaveManagement } from './LeaveManagement';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { QrCode, Users, FileText, Calendar, BarChart3, Sparkles } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', name: 'Overview', icon: Sparkles },
    { id: 'qr-generator', name: 'QR Generator', icon: QrCode },
    { id: 'students', name: 'Students', icon: Users },
    { id: 'attendance', name: 'Attendance', icon: FileText },
    { id: 'leave', name: 'Leave', icon: Calendar },
  ];

  return (
    <Layout title="Admin Panel - Smart Attendance System" onLogout={onLogout}>
      <div className="rounded-lg shadow glass">
        <div className="border-b border-border/50">
          <nav className="-mb-px flex space-x-2 sm:space-x-4 px-3 sm:px-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-3 px-3 sm:px-4 rounded-t-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground hover:border-b hover:border-border'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === 'dashboard' && <AnalyticsDashboard />}
          {activeTab === 'qr-generator' && <QRCodeGenerator />}
          {activeTab === 'students' && <StudentManagement />}
          {activeTab === 'attendance' && <AttendanceReports />}
          {activeTab === 'leave' && <LeaveManagement />}
        </div>
      </div>
    </Layout>
  );
};