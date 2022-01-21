import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { getPosts } from "./store/action-creator/post"
import NavBar from "./components/nav/NavBar";
import {Route, Routes , useLocation} from "react-router-dom";
import './App.css';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Singup from "./pages/signup/Singup";
import AuthRout from "./components/protect-route/AuthRout";
import PraivetRout from "./components/protect-route/PraivetRout";
import Write from "./pages/write/Write";
import Post from "./pages/post/Post";
import Footer from "./components/footer/Footer";
import Posts from "./pages/posts/Posts";
import Account from "./pages/account/Account";
import {AnimatePresence} from "framer-motion";
import { refreshToken } from "./store/action-creator/auth";
import { AppDispatch } from "./store/store";
import NotFoundPage from "./pages/not-found-page/NotFoundPage";

function App() {
  const[loading , setLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();

  const getToken = useCallback(() => {
    dispatch(refreshToken()).then((data:any) => {
      if(loading){
        setLoading(false)
      }
    })
    setTimeout(getToken, 5 * 60 * 1000)
  } , [dispatch])

  useLayoutEffect(() => {
    getToken()
  } , [getToken]);

  useEffect(() => {
    dispatch(getPosts())
  } , [dispatch])

  if (loading) return <div>loading...</div>

  return (
    <div className='app-componnet'>
      <NavBar />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path = "/" element = {<Home />} />
          <Route path = "/login" element = { <AuthRout><Login/></AuthRout>} />
          <Route path = "/singup" element = {<AuthRout><Singup /></AuthRout>} />
          <Route path = "/write" element = {<PraivetRout><Write/></PraivetRout>} />
          <Route path = "/write/:slug" element = {<PraivetRout><Write/></PraivetRout>} />
          <Route path = "/post/:slug" element = {<Post />} />
          <Route path = "/posts" element = {<Posts />} />
          <Route path = "/account" element = {<PraivetRout><Account /></PraivetRout>} />
          <Route path = "*" element = {<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
