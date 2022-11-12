import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import RequireAuth from './components/RequireAuth';
import Header from './Header';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import PageNotFound from './views/PageNotFound/PageNotFound';
import Profile from './views/Profile/Profile';
import Signup from './views/Signup/Signup';

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="App-header">
                <Routes>
                    <Route element={<RequireAuth redirectTo="/login" />}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Route>
                    {/* <Route path="/" element={<Home/>}/> */}
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
