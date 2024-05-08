import './App.css';
import React, {useState, useEffect} from 'react';
import './semantic/dist/semantic.min.css'
import { Routes, Route, useNavigate } from 'react-router-dom';

import { useUser } from "./context/user";
import { useAdmin } from "./context/admin.js"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header.js';
import PaintingsPage from './components/PaintingsPage.js';
import HomePage from './components/HomePage.js';
import ContactPage from './components/ContactPage.js';
import EventsPage from './components/EventsPage.js';
import AboutPage from './components/AboutPage.js';
import Footer from './components/Footer.js';
import PaintingDetail from './components/PaintingDetail.js';
import PostDetail from './components/PostDetail.js';
import AddPost from './components/AddPost.js'
import LoginForm from './components/Login.js';
import SignUp from './components/SignUp.js';
import AddEvent from './components/AddEvent.js';
import AddPainting from './components/AddPainting.js';
import EventDetail from './components/EventDetail.js';
import EditPainting from './components/EditPainting.js';
import EditPost from './components/EditPost.js';
import EditEvent from './components/EditEvent.js';
import User from './components/User.js';


export default function App() {
  const [pageToLoad, setPageToLoad] = useState("homepage")
  const { user, setUser } = useUser()
  const { setIsAdmin } = useAdmin()

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          checkAdminStatus(user);
        }
    )}
    });
  }, []);
  
  function checkAdminStatus(user) {
    user.is_admin ? setIsAdmin(true) : setIsAdmin(false)
  }

  function handleLogin(user) {
    setUser(user);
    user.is_admin ? setIsAdmin(true) : setIsAdmin(false)
    toast(`Welcome back, ${user.username}!`);

  }
  function handleLogout() {
    setUser(null);
    setIsAdmin(false)
    navigate('/')
    toast(`Goodbye, thanks for visiting!`);
  }

  return (
    <div className='ui container'>

      <Header onLogout={handleLogout}/>
      <div style={{marginTop: "75px"}}>
      <ToastContainer/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-info" element={<User />} />
          <Route path="/about-me" element={<AboutPage />} />
          <Route path="/painting" element={<PaintingsPage />} />
          <Route path="/painting/:id" element={<PaintingDetail />} />
          <Route path="/painting/new" element={<AddPainting />}/>
          <Route path="/painting/:id/edit" element={<EditPainting />}/>
          <Route path="/event" element={<EventsPage/>} />
          <Route path="/event/new" element={<AddEvent/>} />
          <Route path="/post/:id" element={<PostDetail/>} />
          <Route path="/post/:id/edit" element={<EditPost />} />
          <Route path="/event/:id" element={<EventDetail />} /> 
          <Route path="/event/:id/edit" element={<EditEvent/>} /> 
          <Route path="/contact-page" element={<ContactPage/>} />
          <Route path="/post/new" element={<AddPost/>} />
          <Route path="/user-login" element={<LoginForm onLogin={handleLogin}/>} />
          <Route path="/user-signup" element={<SignUp />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

