import React from "react";

import "./app.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import Footer from "./components/footer";

const App = () => {
    return (
        <div className="app-wrapper">
            <Header />
            <Navbar />
            <Profile />
            <Footer />
        </div>
    )
}

export default App;