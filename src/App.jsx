import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Cards from './pages/Cards';
import MyCards from './pages/MyCards';
import CreateCard from './pages/CreateCard';
import EditCard from './pages/EditCard';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import MyLikedCards from './pages/MyLikedCards';
import AdminSandbox from './pages/AdminSanbbox';
import CardDetailsPage from './pages/CardDetailsPage';
import { ThemeProvider } from './context/ThemeContext';
import './style/styleTheme.css'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="App d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container flex-grow-1 mt-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/my-cards" element={<MyCards />} />
                <Route path="/liked-cards" element={<MyLikedCards />} />
                <Route path="/create-card" element={<CreateCard />} />
                <Route path="/edit-card/:id" element={<EditCard />} />
                <Route path="/admin-sandbox" element={<AdminSandbox />} />
                <Route path="/cards/:id" element={<CardDetailsPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;