import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Wheel from './components/Wheel/Wheel';
import Summary from './components/Summary/Summary';
import { GlobalProvider } from './util/GlobalState';
import leaveAudio from './assets/audio/Leave.mp3';
import lifeStyleAudio from './assets/audio/LIFESTYLE.mp3';
import tellMeAudio from './assets/audio/TellMe.mp3';
import coupAudio from './assets/audio/coup.mp3';

function App() {

  const cards = [
    {
      title: "Sunny Days",
      cover: require('./assets/imgs/yellow.png'),
      date: "08/10/24",
      summary: "A cheerful tune that brings warmth and happiness on sunny days.",
      audio: leaveAudio
    },
    {
      title: "LifeStyle",
      cover: require('./assets/imgs/vultures.png'),
      date: "09/10/24",
      summary: "A soothing melody perfect for a romantic night under the stars.",
      audio: lifeStyleAudio
    },
    {
      title: "Rhythm of the Night",
      cover: "https://via.placeholder.com/80/DC143C/FFFFFF?text=Rhythm+of+the+Night",
      date: "10/10/24",
      summary: "An upbeat dance track that keeps you moving all night long.",
      audio: tellMeAudio
    },
    {
      title: "Lost in Melody",
      cover: "https://via.placeholder.com/80/20B2AA/FFFFFF?text=Lost+in+Melody",
      date: "11/10/24",
      summary: "A dreamy song that takes you on a journey through sound.",
      audio: coupAudio
    },
    {
      title: "Dance With Me",
      cover: "https://via.placeholder.com/80/FF69B4/000000?text=Dance+With+Me",
      date: "12/10/24",
      summary: "A fun and catchy tune that invites everyone to hit the dance floor.",
      audio: leaveAudio
    },
    {
      title: "Chasing Stars",
      cover: "https://via.placeholder.com/80/4682B4/FFFFFF?text=Chasing+Stars",
      date: "01/10/24",
      summary: "An inspiring anthem about following your dreams and aspirations.",
      audio: leaveAudio
    },
    {
      title: "Echoes of Yesterday",
      cover: "https://via.placeholder.com/80/8B4513/FFFFFF?text=Echoes+of+Yesterday",
      date: "02/10/24",
      summary: "A reflective song that captures the nostalgia of the past.",
      audio: leaveAudio
    },
    {
      title: "Electric Dreams",
      cover: "https://via.placeholder.com/80/9400D3/FFFFFF?text=Electric+Dreams",
      date: "03/10/24",
      summary: "A futuristic sound that blends electronic beats with smooth vocals.",
      audio: leaveAudio
    },
    {
      title: "Sweet Harmony",
      cover: "https://via.placeholder.com/80/FF4500/FFFFFF?text=Sweet+Harmony",
      date: "04/10/24",
      summary: "A heartwarming ballad about love and connection.",
      audio: leaveAudio
    },
    {
      title: "Journey to the Unknown",
      cover: "https://via.placeholder.com/80/00CED1/000000?text=Journey+to+the+Unknown",
      date: "05/10/24",
      summary: "An adventurous song that takes you on a musical exploration.",
      audio: leaveAudio
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
