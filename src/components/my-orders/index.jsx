import HeaderUI from "../header";

import "./style.scss";

const l10n = {
  ru: { myOrders: "Мои записи" },
};

const MOCK_CONFIG = [
  {
    id: "1",
    masterId: "22",
    photo: "/user-avatar.jpg",
    phone: "+375441111111",
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
    masterId: "22",
    photo: "/user-avatar.jpg",
    phone: "+375441111111",
    specialty: "Барбер",
    day: "Пт",
    date: { label: "Дата", value: "21 августа" },
    time: { label: "Время", value: "14:00-15:00" },
    master: { label: "Мастер", value: "Леша" },
    service: { label: "Услуга", value: "Стрижка + борода" },
    place: { label: "Адрес", value: 'Минск, барбершоп "MLF"' },
    price: { label: "Цена", value: "40 BYN" },
  },
];

const MyOrdersUI = ({ lang }) => {
  const { myOrders } = l10n[lang];
  return (
    <div className="my_orders">
      <HeaderUI
        title={myOrders}
        isGoBackVisible={false}
        isGoForwardVisible={false}
      />
      <div className="my_orders__list">
        {MOCK_CONFIG.map((order) => {
          const {
            date,
            time,
            master,
            service,
            price,
            id,
            photo,
            place,
            specialty,
            day,
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
                {/* <a className="master__phone" href={`tel:${phone}`}>
                {phone}
              </a> */}
              </div>
              <div className="master_info">
                <span>
                  {day}, {date.value}, {time.value}
                </span>
                <span>
                  {service.value}, {price.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrdersUI;
