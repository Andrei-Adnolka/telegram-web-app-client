import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useTelegram } from "./hooks";
import { RegistrationUI, MyOrdersUI } from "./components";

import "./App.css";

const App = () => {
  const { telegram } = useTelegram();
  const lang = "ru";

  useEffect(() => {
    telegram.ready();
  }, [telegram]);

  return (
    <div className="App">
      <Routes>
        <Route path="registration" element={<RegistrationUI />} />
        <Route path="my_order" element={<MyOrdersUI lang={lang} />} />
      </Routes>
    </div>
  );
};

export default App;
