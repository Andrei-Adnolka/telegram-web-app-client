import { useParams, Link } from "react-router-dom";

import "./style.scss";

const MOCK_MASTERS = [
  {
    id: "222",
    name: "Леша",
    specialty: "Барбер",
    place: "Октябрьская 21, барбершоп MLF_HUNTER",
    phone: "+375441111111",
    servicesList: [
      { id: 1, label: "Срижка" },
      { id: 2, label: "Срижка + борода" },
    ],
  },
  {
    id: "333",
    name: "Петя",
    specialty: "Барбер",
    place: "Октябрьская 21, барбершоп MLF_HUNTER",
    phone: "+375(44)1111111",
    servicesList: [
      { id: 1, label: "Срижка" },
      { id: 2, label: "Срижка + борода" },
    ],
  },
  {
    id: "444",
    name: "Иван",
    specialty: "Барбер",
    place: "Октябрьская 21, барбершоп MLF_HUNTER",
    phone: "+375(44)1111111",
    servicesList: [
      { id: 1, label: "Срижка" },
      { id: 2, label: "Срижка + борода" },
    ],
  },
  {
    id: "555",
    name: "Степан",
    specialty: "Барбер",
    place: "Октябрьская 21, барбершоп MLF_HUNTER",
    phone: "+375(44)1111111",
    servicesList: [
      { id: 1, label: "Срижка" },
      { id: 2, label: "Срижка + борода" },
    ],
  },
];

const MasterListUI = ({ setMaster }) => {
  return (
    <div className="masters_wrapper">
      <div className="masters_list">
        {MOCK_MASTERS.map((master) => {
          const { id, name, specialty, place, phone } = master;
          const onSetData = () => {
            setMaster(master);
          };
          return (
            <Link
              key={id}
              to={`/registration/${id}`}
              className="master"
              onClick={onSetData}
            >
              <div className="master__header">
                <img src="/user-avatar.jpg" alt="avatar" />
                <div>
                  <span>{name}</span>
                  <span>{specialty}</span>
                </div>
              </div>
              {/* <a className="master__phone" href={`tel:${phone}`}>
                {phone}
              </a> */}
              <div className="master__button">Записаться</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MasterListUI;
