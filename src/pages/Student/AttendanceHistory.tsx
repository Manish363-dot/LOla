import React, { useState } from 'react';
import { Calendar, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';
import { storage } from '../../utils/storage';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';

export const AttendanceHistory: React.FC = () => {
  const { user: authUser } = useAuth();
  const students = storage.getStudents();
  const attendanceRecords = storage.getAttendanceRecords();
  
  const currentStudent = React.useMemo(() => {
    const byId = students.find(s => s.id === authUser?.id);
    if (byId) return byId;
    const byEmail = students.find(s => s.email === authUser?.email);
    if (byEmail) return byEmail;
    if (authUser && authUser.role === 'student') {
      return {
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        role: 'student',
        studentId: (authUser as any).studentId || `TEMP-${authUser.id.slice(0, 6)}`,
        department: 'Unknown',
        year: 1,
        phoneNumber: '',
        totalAttendance: 0,
        presentDays: 0,
        totalDays: 20,
        createdAt: new Date(),
      } as any;
    }
    return undefined;
  }, [students, authUser]);
  const studentRecords = attendanceRecords
    .filter(r => r.studentId === currentStudent?.studentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const [filterMonth, setFilterMonth] = useState('');

  const filteredRecords = studentRecords.filter(record => {
    if (!filterMonth) return true;
    return record.date.startsWith(filterMonth);
  });

  const getAttendanceIcon = (percentage: number) => {
    if (percentage === 100) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (percentage === 50) return <Clock className="h-5 w-5 text-yellow-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getAttendanceStatus = (percentage: number) => {
    if (percentage === 100) return { text: 'Full Day', color: 'bg-green-100 text-green-800' };
    if (percentage === 50) return { text: 'Half Day', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Absent', color: 'bg-red-100 text-red-800' };
  };

  if (!currentStudent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Attendance History</h2>
        <div className="text-sm text-gray-500">
          Your complete attendance record
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{currentStudent.totalAttendance}%</div>
            <div className="text-sm text-gray-600">Overall</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {studentRecords.filter(r => r.attendancePercentage === 100).length}
            </div>
            <div className="text-sm text-gray-600">Full Days</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {studentRecords.filter(r => r.attendancePercentage === 50).length}
            </div>
            <div className="text-sm text-gray-600">Half Days</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {currentStudent.totalDays - studentRecords.length}
            </div>
            <div className="text-sm text-gray-600">Absent</div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {filterMonth && (
          <button
            onClick={() => setFilterMonth('')}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Records List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Records ({filteredRecords.length})
          </h3>
        </div>
        
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No attendance records found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredRecords.map((record) => {
              const status = getAttendanceStatus(record.attendancePercentage);
              return (
                <div key={record.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getAttendanceIcon(record.attendancePercentage)}
                      <div>
                        <div className="text-lg font-semibold text-gray-900">
                          {format(new Date(record.date), 'EEEE, MMMM d, yyyy')}
                        </div>
                        <div className="text-sm text-gray-600">
                          {record.checkIn && `Check-in: ${format(new Date(record.checkIn), 'h:mm a')}`}
                          {record.checkIn && record.checkOut && ' • '}
                          {record.checkOut && `Check-out: ${format(new Date(record.checkOut), 'h:mm a')}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        {record.attendancePercentage}%
                      </div>
                    </div>
                  </div>
                  
                  {(record.location || record.deviceInfo) && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-500 space-y-1">
                        {record.location && (
                          <div>Location: {record.location.latitude.toFixed(4)}, {record.location.longitude.toFixed(4)}</div>
                        )}
                        {record.deviceInfo && (
                          <div>Device: {record.deviceInfo.split(' ')[0]}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};