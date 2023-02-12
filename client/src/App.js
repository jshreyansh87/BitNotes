import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Error from './components/Error';
import NoteState from './context/notes/NoteState';
import Navbar from './components/utils/Navbar';


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
