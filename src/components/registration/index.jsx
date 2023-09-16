import { useParams, Link } from "react-router-dom";

import "./style.css";

const MOCK_MASTERS = [
  {
    id: "222",
    name: "Леша",
    servicesList: [
      { id: 1, label: "Срижка" },
      { id: 2, label: "Срижка + борода" },
    ],
  },
  {
    id: "333",
    name: "Петя",
    servicesList: [
      { id: 1, label: "Срижка" },
      { id: 2, label: "Срижка + борода" },
    ],
  },
];

const RegistrationUI = () => {
  // const [master, setMaster] = useState();
  // const [date, setDate] = useState(0);
  // const [service, seetService] = useState("");

  const { masterId } = useParams();

  return (
    <div>
      {masterId ? null : (
        <>
          <span>Выберите мастера</span>
          {MOCK_MASTERS.map((master) => {
            const { id, name } = master;
            return (
              <Link key={id} to={`/registration/${id}`}>
                {name}
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
};

export default RegistrationUI;
