import Layout from './components/Layout';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
            <Routes>
              <Route path='/main' element={<Layout> <MainPage/> </Layout>} />
              <Route path='/' element={<LoginPage/>} />
              <Route path='/register' element={<RegisterPage/>} />
              <Route path='/profile' element={<Layout> <ProfilePage/></Layout>} />
            </Routes>
          
            
      </Router>
  );
}

export default App;
