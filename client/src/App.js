import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import RequireAuth from './components/RequireAuth';
import Header from './Header';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Marketplace from './views/Marketplace/Marketplace';
import PageNotFound from './views/PageNotFound/PageNotFound';
import Profile from './views/Profile/Profile';
import Signup from './views/Signup/Signup';
import {HarmonySetup} from 'harmony-ai-editor';

function App() {
    return (<>
        <div className="App">
            <Header/>
            <div className="App-header">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    {/* <Route path="/profile" element={<Profile/>}/> */}
                    {/* <Route path="/" element={<Home/>}/> */}
                    <Route path="/market" element={<Marketplace/>}/>
                    <Route path="/login" element={<Login/>}/>                    
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
        <HarmonySetup repositoryId="5466f77b-ad23-4cb5-8698-4f4d92ed4cf5"/>
    </>);
}

export default App;
