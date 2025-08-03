// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/Main';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/Register';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import DesignGalleryPage from './pages/design/Main';
import DesignDetailPage from './pages/design/DesignDetailPage';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-950">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/design" element={<DesignGalleryPage />} />
            <Route path="/design/:id" element={<DesignDetailPage />} />

            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-[calc(100vh-160px)]">
                  <h1 className="text-4xl text-gray-700 font-bold">404 - Page Not Found</h1>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
