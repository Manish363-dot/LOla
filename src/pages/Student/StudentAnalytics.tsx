import React, { useMemo } from "react";
import {
  Line,
  Doughnut,
  Bar
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const StudentAnalytics: React.FC = () => {
  // ✅ Example mock data
  const overallAttendance = 72;
  const daysPresent = 123;
  const daysAbsent = 47;
  const lowAttendance = overallAttendance < 75;

  const trendData = useMemo(() => ({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Attendance %",
        data: [80, 70, 75, 68, 72],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.4,
      },
    ],
  }), []);

  const distributionData = useMemo(() => ({
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Days",
        data: [daysPresent, daysAbsent],
        backgroundColor: ["#22c55e", "#ef4444"],
        hoverOffset: 10,
      },
    ],
  }), [daysPresent, daysAbsent]);

  const weeklyData = useMemo(() => ({
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Attendance %",
        data: [85, 75, 70, 72],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
    ],
  }), []);

  return (
    <div className="space-y-8">
      {/* ===== Stat Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass hover-glow p-6 rounded-2xl shadow-lg transition-transform hover:scale-105">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6 text-blue-400" />
            <h3 className="text-lg font-semibold">Overall Attendance</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{overallAttendance}%</p>
        </div>

        <div className="glass hover-glow p-6 rounded-2xl shadow-lg transition-transform hover:scale-105">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <h3 className="text-lg font-semibold">Days Present</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{daysPresent}</p>
        </div>

        <div className="glass hover-glow p-6 rounded-2xl shadow-lg transition-transform hover:scale-105">
          <div className="flex items-center space-x-3">
            <XCircle className="h-6 w-6 text-red-400" />
            <h3 className="text-lg font-semibold">Days Absent</h3>
          </div>
          <p className="text-3xl font-bold mt-2">{daysAbsent}</p>
        </div>

        <div className="glass hover-glow p-6 rounded-2xl shadow-lg transition-transform hover:scale-105">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-yellow-400" />
            <h3 className="text-lg font-semibold">Target</h3>
          </div>
          <p className="text-3xl font-bold mt-2">75%</p>
        </div>
      </div>

      {/* ===== Charts ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass hover-glow p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Attendance Trend</h3>
          <Line data={trendData} />
        </div>

        <div className="glass hover-glow p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Attendance Distribution</h3>
          <Doughnut data={distributionData} />
        </div>
      </div>

      <div className="glass hover-glow p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Weekly Performance</h3>
        <Bar data={weeklyData} />
      </div>

      {/* ===== Alerts Section ===== */}
      {lowAttendance && (
        <div className="glass p-6 rounded-2xl shadow-lg border border-red-500">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h3 className="text-lg font-semibold text-red-500">Low Attendance Alert</h3>
          </div>
          <p className="mt-2 text-gray-200">
            Your attendance is below the required 75%. Please attend more classes to avoid
            being debarred from exams.
          </p>
        </div>
      )}

      {/* ===== Student Info ===== */}
      <div className="glass hover-glow p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Student Information</h3>
        <ul className="space-y-2 text-gray-200">
          <li><strong>ID:</strong> STU123</li>
          <li><strong>Department:</strong> Computer Science</li>
          <li><strong>Year:</strong> 3rd</li>
          <li><strong>Email:</strong> student@example.com</li>
          <li><strong>Goal:</strong> Maintain 75% attendance</li>
        </ul>
      </div>
    </div>
  );
};
