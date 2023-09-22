import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import HeaderUI from "../header";

import MastersList from "./list";
import Master from "./master";

import "./style.scss";

const RegistrationUI = () => {
  const [master, setMaster] = useState(null);
  const { masterId } = useParams();
  const isMasterPage = !!masterId;

  return (
    <div>
      <HeaderUI
        title={isMasterPage ? "Создать запись" : "Выберите мастера"}
        isGoBackVisible={isMasterPage}
        isGoForwardVisible={!isMasterPage && !!master}
      />
      {isMasterPage && master ? (
        <Master {...master} />
      ) : (
        <MastersList setMaster={setMaster} />
      )}
    </div>
  );
};

export default RegistrationUI;
