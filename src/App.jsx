import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Lessons from './pages/Lessons';
import Pricing from './pages/Pricing';
import DailyClasses from './pages/DailyClasses';
import MicroLesson from './components/LessonApp';
import WorksheetApp from './components/WorksheetApp';
import Profile from './pages/Profile';
import Login from './pages/admin/Login';
import AddLesson from './pages/admin/AddLesson';
import AddWorksheet from './pages/admin/AddWorksheet';
import WorksheetsList from './pages/WorksheetsList';
import { AuthProvider, useAuth } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-bold">جاري التحميل...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  console.log("User Data:", user);
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-bold">جاري التحميل...</div>;
  }
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="lessons" element={<Lessons />} />
            <Route path="daily-classes" element={<DailyClasses />} />
            <Route path="lesson/:id" element={<MicroLesson />} />
            <Route path="worksheet/:slug" element={<WorksheetApp />} />
            <Route path="worksheets" element={<WorksheetsList />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="add-lesson"
            element={
              <AdminRoute>
                <AddLesson />
              </AdminRoute>
            }
          />
          <Route
            path="add-worksheet"
            element={
              <AdminRoute>
                <AddWorksheet />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;