import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AuthProvider, useAuth } from "@/hooks/useAuth"; // <-- Add this import

import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import { StudentDashboard } from "./pages/Student/StudentDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";

const queryClient = new QueryClient();

// Wrapper components to inject onLogout prop
const AdminRoute = () => {
  const { logout } = useAuth();
  return <AdminDashboard onLogout={logout} />;
};

const StudentRoute = () => {
  const { logout } = useAuth();
  return <StudentDashboard onLogout={logout} />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* <-- Wrap your app with AuthProvider */}
        <ThemeProvider defaultTheme="light" storageKey="attendo-ui-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Navigate to="/panel/admin" replace />} />
                <Route path="/student" element={<Navigate to="/panel/student" replace />} />
                <Route path="/AdminDashboard" element={<Navigate to="/panel/admin" replace />} />
                <Route path="/StudentDashboard" element={<Navigate to="/panel/student" replace />} />
                <Route path="/panel/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminRoute />
                  </ProtectedRoute>
                } />
                <Route path="/panel/student" element={
                  <ProtectedRoute requiredRole="student">
                    <StudentRoute />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;