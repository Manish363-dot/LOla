import React, { useEffect, useState } from "react";

interface Alert {
  id: number;
  type: "attendance" | "event" | "faculty" | "achievement";
  message: string;
  date: string;
  sticky?: boolean; // pinned alerts
  level?: "safe" | "warning" | "danger"; // for attendance
}

export const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Example: student attendance % (you can fetch from analytics later)
  const [attendance, setAttendance] = useState(72);

  useEffect(() => {
    const savedAlerts = localStorage.getItem("studentAlerts");
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    } else {
      // Add a welcome alert for first-time users
      const initialAlert: Alert = {
        id: Date.now(),
        type: "faculty",
        message: "Welcome to the Smart Attendance Portal 🎓",
        date: new Date().toLocaleString(),
        sticky: true,
      };
      setAlerts([initialAlert]);
      localStorage.setItem("studentAlerts", JSON.stringify([initialAlert]));
    }
  }, []);

  // Auto-generate attendance alert
  useEffect(() => {
    let level: "safe" | "warning" | "danger" | undefined;
    if (attendance < 75) level = "danger";
    else if (attendance < 85) level = "warning";
    else level = "safe";

    const newAlert: Alert = {
      id: Date.now(),
      type: "attendance",
      message:
        level === "danger"
          ? `⚠️ Attendance dropped below 75% (Current: ${attendance}%)`
          : level === "warning"
          ? `⚠️ Attendance is in warning zone (Current: ${attendance}%)`
          : `✅ Great! Attendance is healthy (Current: ${attendance}%)`,
      date: new Date().toLocaleString(),
      level,
    };

    // prevent duplicates
    if (!alerts.find((a) => a.message === newAlert.message)) {
      const updatedAlerts = [...alerts, newAlert];
      setAlerts(updatedAlerts);
      localStorage.setItem("studentAlerts", JSON.stringify(updatedAlerts));
    }
  }, [attendance]);

  // Helper for styling
  const getAlertStyle = (alert: Alert) => {
    switch (alert.type) {
      case "attendance":
        if (alert.level === "danger")
          return "bg-red-50 border-red-300 text-red-700";
        if (alert.level === "warning")
          return "bg-yellow-50 border-yellow-300 text-yellow-700";
        return "bg-green-50 border-green-300 text-green-700";
      case "event":
        return "bg-blue-50 border-blue-300 text-blue-700";
      case "faculty":
        return "bg-purple-50 border-purple-300 text-purple-700";
      case "achievement":
        return "bg-emerald-50 border-emerald-300 text-emerald-700";
      default:
        return "bg-gray-50 border-gray-300 text-gray-700";
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">📢 Alerts & Notifications</h2>

      {alerts.length === 0 ? (
        <p className="text-gray-500">No alerts yet ✅</p>
      ) : (
        <div className="space-y-3">
          {alerts
            .sort((a, b) => (a.sticky === b.sticky ? 0 : a.sticky ? -1 : 1)) // sticky always first
            .map((alert) => (
              <div
                key={alert.id}
                className={`border p-3 rounded-lg shadow-sm ${getAlertStyle(
                  alert
                )}`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium">{alert.message}</p>
                  {alert.sticky && (
                    <span className="text-xs font-semibold text-purple-600">
                      📌 Pinned
                    </span>
                  )}
                </div>
                <span className="text-xs block mt-1 text-gray-500">
                  {alert.date}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
