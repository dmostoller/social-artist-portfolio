import './App.css';
import React, {useState, useEffect} from 'react';
import './semantic/dist/semantic.min.css'
import Header from './components/Header.js';
import PaintingsPage from './components/PaintingsPage.js';
import HomePage from './components/HomePage.js';
import ContactPage from './components/ContactPage.js';
import EventsPage from './components/EventsPage.js';
import AboutPage from './components/AboutPage.js';
import Footer from './components/Footer.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import UploadPhoto from './components/UploadPhoto.js';
import Photo from './components/Photo.js';

export default function App() {
  const [pageToLoad, setPageToLoad] = useState("homepage")
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
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
  }
  function handleLogout() {
    setUser(null);
    setIsAdmin(false)
    navigate('/')
  }

  return (
    <div className='ui inverted container'>
      <Header pageToLoad={pageToLoad} onChangePage={setPageToLoad} user={user} onLogout={handleLogout}/>
      <div style={{marginTop: "25px"}}>
      <Routes>
          <Route path="/" element={<HomePage user={user} isAdmin={isAdmin}/>} />
          <Route path="/user" element={<User user={user} setUser={setUser} isAdmin={isAdmin}/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/paintings" element={<PaintingsPage user={user} isAdmin={isAdmin}/>} />
          <Route path="/paintings/:id" element={<PaintingDetail user={user} isAdmin={isAdmin}/>} />
          <Route path="/paintings/new" element={<AddPainting/>}/>
          <Route path="/paintings/:id/edit" element={<EditPainting/>}/>
          <Route path="/events" element={<EventsPage user={user} isAdmin={isAdmin}/>} />
          <Route path="/events/new" element={<AddEvent/>} />
          <Route path="/posts/:id" element={<PostDetail user={user} isAdmin={isAdmin}/>} />
          <Route path="/posts/:id/edit" element={<EditPost/>} />
          <Route path="/events/:id" element={<EventDetail user={user} isAdmin={isAdmin}/>} /> 
          <Route path="/events/:id/edit" element={<EditEvent/>} /> 
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/posts/new" element={<AddPost/>} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
          <Route path="/signup" element={<SignUp setUser={setUser}/>} />
          <Route path="/uploadphoto" element={<UploadPhoto/>} />
          <Route path="photo" element={<Photo/>} />

      </Routes>
      </div>
      <Footer />
    </div>
  );
}

