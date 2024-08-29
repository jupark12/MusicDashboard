import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./Main";
import { GlobalProvider } from "./util/GlobalState";

function App() {
  console.log("App.js");

  return (
    <div className="App">
      <GlobalProvider>
        <div className="">
          <Main />
        </div>
      </GlobalProvider>
    </div>
  );
}

export default App;
