import { Link } from "react-router-dom";

import "./style.scss";

const l10n = {
  ru: {
    contact: "Позвонить",
    repeat: "Повторить",
    remove: "Удалить",
  },
  eng: {
    contact: "Call",
    repeat: "Repeat",
    remove: "Remove",
  },
};

const MOCK_CONFIG = [
  {
    id: "1",
    masterId: "222",
    photo: "/user-avatar.jpg",
    phone: "+375447152278",
    specialty: "Барбер",
    day: "Пт",
    date: { label: "Дата", value: "21 августа" },
    time: { label: "Время", value: "14:00-15:00" },
    master: { label: "Мастер", value: "Леша" },
    service: { label: "Услуга", value: "Стрижка + борода" },
    place: { label: "Адрес", value: 'Минск, барбершоп "MLF"' },
    price: { label: "Цена", value: "40 BYN" },
  },
  {
    id: "2",
    masterId: "333",
    photo: "/user-avatar.jpg",
    phone: "+375445852219",
    specialty: "Барбер",
    day: "Пт",
    date: { label: "Дата", value: "21 августа" },
    time: { label: "Время", value: "14:00-15:00" },
    master: { label: "Мастер", value: "Петя" },
    service: { label: "Услуга", value: "Стрижка" },
    place: { label: "Адрес", value: 'Минск, барбершоп "Тайга"' },
    price: { label: "Цена", value: "23 BYN" },
  },
];

const getAction = (src, text) => (
  <>
    <div className="image_wrapper">
      <img src={src} alt={text} />
    </div>
    {text}
  </>
);

const MyPastOrdersUI = ({ lang }) => {
  const { contact, repeat, remove } = l10n[lang];
  return (
    <div className="my_orders__list">
      {MOCK_CONFIG.map((order) => {
        const {
          date,
          time,
          master,
          service,
          price,
          id,
          masterId,
          photo,
          place,
          specialty,
          day,
          phone,
        } = order;
        return (
          <div key={id} className="master">
            <div className="master__header">
              <img src={photo} alt="avatar" />
              <div>
                <span>
                  {master.value}, {specialty}
                </span>
                <span className="master__place">{place.value}</span>
              </div>
            </div>
            <div className="master_info">
              <span>
                {day}, {date.value}, {time.value}
              </span>
              <span>
                {service.value}, {price.value}
              </span>
            </div>
            <div className="master_actions">
              <a className="master__phone" href={`https://t.me/${phone}`}>
                {getAction("/phone.svg", contact)}
              </a>
              <Link
                key={id}
                to={`/registration/${masterId}`}
                className="master__rebook"
              >
                {getAction("/repeat.svg", repeat)}
              </Link>
              <div>{getAction("/delete.svg", remove)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyPastOrdersUI;
