import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { useTelegram } from "./hooks";
import { RegistrationUI, MyOrdersUI } from "./components";

import "./App.css";

const App = () => {
  const [lang, setLang] = useState("eng");

  const { telegram } = useTelegram();

  useEffect(() => {
    telegram.ready();
  }, [telegram]);

  const onClick = () => {
    setLang(lang === "ru" ? "eng" : "ru");
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="registration/:masterId?"
          element={<RegistrationUI lang={lang} />}
        />
        <Route path="my_orders" element={<MyOrdersUI lang={lang} />} />
      </Routes>
      <div onClick={onClick}>язык</div>
    </div>
  );
};

export default App;
