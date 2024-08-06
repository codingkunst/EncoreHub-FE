// src/App.jsx
import { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from "./shared/Router";
import useBearsStore from "./zustand/bearsStore";



function App() {
  return <Router />
}

export default App;
