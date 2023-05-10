import React from "react";
import { Routes, Route } from "react-router-dom";
import { Username, Profile, Register, PageNotFound, Password, Recovery, Reset } from './components';
import { AuthoriseUser, Protectroute } from "./middleware/auth";


const App = () => {
  return (
    <main>
      <div>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password" element={<Protectroute><Password /></Protectroute>} />
        <Route path="/profile" element={<AuthoriseUser><Profile /></AuthoriseUser>} />
        <Route path="/recovery" element={<Protectroute><Recovery /></Protectroute>} />
        <Route path="/reset" element={<Protectroute><Reset /></Protectroute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </div>
    </main>
  );
}

export default App;
