import { useEffect } from "react";
import "./App.css";

const telegram = window.Telegram.WebApp;

function App() {
  const onClose = () => {
    telegram.close();
  };

  useEffect(() => {
    telegram.ready();
  }, []);

  return (
    <div className="App">
      work
      <button onClick={onClose}></button>
    </div>
  );
}

export default App;
