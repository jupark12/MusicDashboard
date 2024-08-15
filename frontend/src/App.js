import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Wheel from './components/Wheel/Wheel';
import Summary from './components/Summary/Summary';
import { GlobalProvider } from './util/GlobalState';

function App() {

  const cards = [
    {
        title: "Song 1",
        cover: "https://via.placeholder.com/80",
        date: "08/10/24"
    },
    {
        title: "Song 2",
        cover: "https://via.placeholder.com/80",
        date: "09/10/24"
    },
    {
        title: "Song 3",
        cover: "https://via.placeholder.com/80",
        date: "10/10/24" 
    },
    {
        title: "Song 4",
        cover: "https://via.placeholder.com/80",
        date: "11/10/24"
    },
    {
        title: "Song 5",
        cover: "https://via.placeholder.com/80",
        date: "12/10/24" 
    },
    {
        title: "Song 6",
        cover: "https://via.placeholder.com/80",
        date: "01/10/24"
    },
    {
        title: "Song 7",
        cover: "https://via.placeholder.com/80",
        date: "02/10/24",
    },
    {
        title: "Song 8",
        cover: "https://via.placeholder.com/80",
        date: "03/10/24"
    },
    {
        title: "Song 9",
        cover: "https://via.placeholder.com/80",
        date: "04/10/24" 
    },
    {
        title: "Song 10",
        cover: "https://via.placeholder.com/80",
        date: "05/10/24"
    },
  ];


  return (
    <div className="App">
      <GlobalProvider>
        <Header />
        <Summary cards={cards}/>
        <Wheel cards={cards}/>
      </GlobalProvider>
    </div>
  );
}

export default App;
