// src/App.jsx
import { useState } from 'react'
import './App.css'
import Router from "./shared/Router";
import axios from "axios";
import useBearsStore from "./zustand/bearsStore";

function App() {

  const bears = useBearsStore((state) => state.bears);
  const increasePopulation = useBearsStore((state) => state.increasePopulation);

  return (
    <Router />
  )
}

export default App
