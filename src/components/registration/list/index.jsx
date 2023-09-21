import { useParams, Link } from "react-router-dom";

import "./style.scss";

const SERVICES = [
  { id: 1, label: "Срижка", price: "45 BYN", time: "1 ч" },
  {
    id: 2,
    label: "Срижка + борода + окрашивание",
    price: "55 BYN",
    time: "1 ч 30 мин",
  },
  { id: 3, label: "Срижка 1", price: "45 BYN", time: "1 ч" },
  {
    id: 4,
    label: "Срижка + борода + окрашивание 1",
    price: "55 BYN",
    time: "1 ч 30 мин",
  },
  { id: 5, label: "Срижка 2", price: "45 BYN", time: "1 ч" },
  {
    id: 6,
    label: "Срижка + борода + окрашивание 2",
    price: "55 BYN",
    time: "1 ч 30 мин",
  },
];

const MOCK_MASTERS = [
  {
    id: "222",
    name: "Леша",
    specialty: "Барбер",
    place: "барбершоп 'Гараж'",
    phone: "+375441111111",
    servicesList: SERVICES,
  },
  {
    id: "333",
    name: "Петя",
    specialty: "Барбер",
    place: "барбершоп 'Гараж'",
    phone: "+375(44)1111111",
    servicesList: [
      { id: 1, label: "Срижка", price: "45 BYN", time: "1 ч" },
      {
        id: 2,
        label: "Срижка + борода + окрашивание",
        price: "55 BYN",
        time: "1 ч 30 мин",
      },
    ],
  },
  {
    id: "444",
    name: "Иван",
    specialty: "Барбер",
    place: "барбершоп 'Гараж'",
    phone: "+375(44)1111111",
    servicesList: SERVICES,
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
              <span className="master__place">{place}</span>
              <div className="master__button">Записаться</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MasterListUI;
