import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import MastersList from "./list";

import "./style.scss";

const MOCK_MASTERS = [
  {
    id: "222",
    name: "Леша",
    place: "Октябрьская 21, барбершоп MLF_HUNTER",
    number: "+375441111111",
    servicesList: [
      { id: 1, label: "Срижка" },
      { id: 2, label: "Срижка + борода" },
    ],
  },
  {
    id: "333",
    name: "Петя",
    place: "Октябрьская 21, барбершоп MLF_HUNTER",
    number: "+375441111111",
    servicesList: [
      { id: 1, label: "Срижка" },
      { id: 2, label: "Срижка + борода" },
    ],
  },
];

const RegistrationUI = () => {
  const [master, setMaster] = useState(null);
  // const [date, setDate] = useState(0);
  // const [service, seetService] = useState("");
  console.log("master", master);
  return <div>{master ? null : <MastersList setMaster={setMaster} />}</div>;
};

export default RegistrationUI;
