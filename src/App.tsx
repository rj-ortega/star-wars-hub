import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Details } from "./Views/Details/index";
import { Home } from "./Views/Home/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:personName" element={<Details />} />
    </Routes>
  );
}

export default App;
