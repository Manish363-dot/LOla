import React, { useState } from 'react';
import { Send, Calendar, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { storage } from '../../utils/storage';
import { LeaveApplication as LeaveApplicationType } from '../../types';
import { format } from 'date-fns';

export const LeaveApplication: React.FC = () => {
  const currentUser = storage.getCurrentUser();
  const students = storage.getStudents();
  const leaveApplications = storage.getLeaveApplications();
  
  const currentStudent = students.find(s => s.id === currentUser?.id);
  const studentApplications = leaveApplications
    .filter(app => app.studentId === currentStudent?.studentId)
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent) return;

    setSubmitting(true);

    const newApplication: LeaveApplicationType = {
      id: Math.random().toString(36).substr(2, 9),
      studentId: currentStudent.studentId,
      studentName: currentStudent.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: 'pending',
      appliedAt: new Date(),
    };

    const updatedApplications = [...leaveApplications, newApplication];
    storage.setLeaveApplications(updatedApplications);

    // Reset form
    setFormData({ startDate: '', endDate: '', reason: '' });
    setSubmitting(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!currentStudent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Leave Application</h2>
        <div className="text-sm text-gray-500">
          Apply for leave and track your applications
        </div>
      </div>

      {/* Application Form */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for Leave</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min={formData.startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Leave
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Please provide a detailed reason for your leave application..."
              required
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>{submitting ? 'Submitting...' : 'Submit Application'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Applications History */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Your Applications ({studentApplications.length})
          </h3>
        </div>
        
        {studentApplications.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No leave applications found.</p>
            <p className="text-sm text-gray-400">Submit your first application using the form above.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {studentApplications.map((application) => (
              <div key={application.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {getStatusIcon(application.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Leave Application
                        </h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Start Date:</span>
                          <div>{format(new Date(application.startDate), 'PPP')}</div>
                        </div>
                        <div>
                          <span className="font-medium">End Date:</span>
                          <div>{format(new Date(application.endDate), 'PPP')}</div>
                        </div>
                        <div>
                          <span className="font-medium">Applied On:</span>
                          <div>{format(new Date(application.appliedAt), 'PPP')}</div>
                        </div>
                        {application.reviewedAt && (
                          <div>
                            <span className="font-medium">Reviewed On:</span>
                            <div>{format(new Date(application.reviewedAt), 'PPP')}</div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <span className="font-medium text-gray-700">Reason:</span>
                        <p className="mt-1 text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {application.reason}
                        </p>
                      </div>
                      
                      {application.reviewedBy && (
                        <div className="mt-3 text-sm text-gray-500">
                          Reviewed by {application.reviewedBy}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};