import React from 'react';
import { Line } from 'react-chartjs-2';
import { TrendingUp, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { storage } from '../../utils/storage';
import { format, subDays, eachDayOfInterval } from 'date-fns';

export const StudentAnalytics: React.FC = () => {
  const currentUser = storage.getCurrentUser();
  const students = storage.getStudents();
  const attendanceRecords = storage.getAttendanceRecords();
  
  const currentStudent = students.find(s => s.id === currentUser?.id);
  const studentRecords = attendanceRecords.filter(r => r.studentId === currentStudent?.studentId);

  // Generate last 7 days attendance data
  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date()
  }).map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayRecord = studentRecords.find(r => r.date === dateStr);
    return {
      date: format(date, 'MMM dd'),
      attendance: dayRecord?.attendancePercentage || 0
    };
  });

  const chartData = {
    labels: last7Days.map(d => d.date),
    datasets: [
      {
        label: 'Daily Attendance %',
        data: last7Days.map(d => d.attendance),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  if (!currentStudent) {
    return <div>Loading...</div>;
  }

  const stats = [
    {
      title: 'Overall Attendance',
      value: `${currentStudent.totalAttendance}%`,
      icon: TrendingUp,
      color: currentStudent.totalAttendance >= 75 ? 'green' : 'red',
    },
    {
      title: 'Days Present',
      value: `${currentStudent.presentDays}/${currentStudent.totalDays}`,
      icon: Calendar,
      color: 'blue',
    },
    {
      title: 'This Week',
      value: `${last7Days.filter(d => d.attendance > 0).length}/7`,
      icon: Clock,
      color: 'purple',
    },
  ];

  const colorClasses = {
    green: 'bg-green-500 text-green-50',
    red: 'bg-red-500 text-red-50',
    blue: 'bg-blue-500 text-blue-50',
    purple: 'bg-purple-500 text-purple-50',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {currentStudent.name}!</h2>
          <p className="text-gray-600">Here's your attendance overview</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Attendance Warning */}
      {currentStudent.totalAttendance < 75 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <div>
              <h3 className="font-medium text-yellow-800">Attendance Alert</h3>
              <p className="text-sm text-yellow-700">
                Your attendance is {currentStudent.totalAttendance}%, which is below the required 75%. 
                Please maintain regular attendance to avoid academic issues.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Attendance Trend (Last 7 Days)
        </h3>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Student ID:</span>
              <span className="font-medium">{currentStudent.studentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Department:</span>
              <span className="font-medium">{currentStudent.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Year:</span>
              <span className="font-medium">{currentStudent.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{currentStudent.email}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Goal</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to 75%</span>
                <span>{currentStudent.totalAttendance}/75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    currentStudent.totalAttendance >= 75 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(currentStudent.totalAttendance, 100)}%` }}
                ></div>
              </div>
            </div>
            {currentStudent.totalAttendance < 75 && (
              <p className="text-sm text-gray-600">
                You need {Math.ceil((75 - currentStudent.totalAttendance) / 100 * currentStudent.totalDays)} more days 
                of attendance to reach 75%.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};