import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Router } from "./Router";
import { Navbar } from "./Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
  );
}

export default App;
