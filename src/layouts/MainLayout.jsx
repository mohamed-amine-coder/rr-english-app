import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      {/* هاد البلاصة هي فين غتبان الصفحة ديالنا (Home ولا About...) */}
      <main className="flex-grow container mx-auto p-6">
        <Outlet /> 
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;