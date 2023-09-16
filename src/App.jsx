import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useTelegram } from "./hooks";
import { RegistrationUI } from "./components";

import "./App.css";

const App = () => {
  const { telegram, onClose, user } = useTelegram();

  useEffect(() => {
    telegram.ready();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<RegistrationUI />} />
        {/* <Route element={<RegistrationUI />} /> */}
      </Routes>
    </div>
  );
};

export default App;
