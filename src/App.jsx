import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar fija permanente */}
      <Navbar />

      {/* Vista principal */}
      <Home />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
