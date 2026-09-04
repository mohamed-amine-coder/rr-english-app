import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Lessons from './pages/Lessons';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import MicroLesson from './components/LessonApp';
import Worksheets from './components/Worksheets';
import LessonPDF from './pages/LessonPDF'
import Profile from './pages/Profile';
import Login from './pages/admin/Login';
import AddLesson from './pages/admin/AddLesson';
import AddWorksheet from './pages/admin/AddWorksheet';
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
            <Route path="lesson/:id" element={<MicroLesson />} />
            <Route path="lesson-pdf" element={<LessonPDF />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="worksheets" element={<Worksheets />} />
            <Route path="*" element={<NotFound />} />
            <Route path="profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
          <Route path="add-lesson" element={<AdminRoute> <AddLesson /> </AdminRoute>} />
          <Route path="lesson-pdf" element={<AdminRoute> <LessonPDF /> </AdminRoute>} />
          <Route path="add-worksheet" element={<AdminRoute> <AddWorksheet /> </AdminRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;