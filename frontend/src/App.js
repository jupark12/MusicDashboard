import logo from "./logo.svg";
import "./App.css";
import Auth from "./components/Auth/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./Main";
import { GlobalProvider } from "./util/GlobalState";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
