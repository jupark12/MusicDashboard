import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Wheel from './components/Wheel/Wheel';
import Summary from './components/Summary/Summary';
import { GlobalProvider } from './util/GlobalState';

function App() {
  console.log("App.js")

  return (
    <div className="App">
      <GlobalProvider>
        <Header />
        <div className='flex'>
          <Wheel />
          <Summary /> 
        </div>
      </GlobalProvider>
    </div>
  );
}

export default App;
