import { useParams, Link } from "react-router-dom";

import "./style.scss";

const MOCK_MASTERS = [
  {
    id: "222",
    name: "Леша",
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
      <span>Выберите мастера</span>
      <div className="masters_list">
        {MOCK_MASTERS.map((master) => {
          const { id, name, place, phone } = master;
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
                  <span>{place}</span>
                </div>
              </div>
              <a className="master__phone" href={`tel:${phone}`}>
                {phone}
              </a>
              <div className="master__button">Записаться</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MasterListUI;
