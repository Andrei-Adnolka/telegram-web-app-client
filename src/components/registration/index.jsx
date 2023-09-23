import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import HeaderUI from "../header";

import MastersList from "./list";
import Master from "./master";

import "./style.scss";

const l10n = {
  ru: {
    createRegistration: "Создать запись",
    selectSpecialist: "Выберите мастера",
  },
  eng: {
    createRegistration: "Create registration",
    selectSpecialist: "Select specialist",
  },
};

const RegistrationUI = ({ lang }) => {
  const [master, setMaster] = useState(null);
  const { masterId } = useParams();
  const isMasterPage = !!masterId;
  const { createRegistration, selectSpecialist } = l10n[lang];

  return (
    <div>
      <HeaderUI
        title={isMasterPage ? createRegistration : selectSpecialist}
        isGoBackVisible={isMasterPage}
        isGoForwardVisible={!isMasterPage && !!master}
      />
      {isMasterPage && master ? (
        <Master {...master} lang={lang} />
      ) : (
        <MastersList setMaster={setMaster} lang={lang} />
      )}
    </div>
  );
};

export default RegistrationUI;
