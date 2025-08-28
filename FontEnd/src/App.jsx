import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import Home from "./pages/Home";
  import { ToastContainer,  } from 'react-toastify'
const App = () => {
  return (
    <div>
       <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<Todos/>} />
      </Routes>
    </div>
  );
};

export default App;
