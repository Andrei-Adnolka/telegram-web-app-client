import "./style.css";

const l10n = {
  ru: { myOrders: "Мои записи" },
};

const MOCK_CONFIG = [
  {
    id: "1",
    masterId: "22",
    date: { label: "Дата", value: "21 августа" },
    time: { label: "Время", value: "14:00-15:00" },
    master: { label: "Мастер", value: "Леша" },
    service: { label: "Услуга", value: "Стрижка + борода" },
    address: { label: "Адрес", value: "Минск" },
    price: { label: "Цена", value: "40 BYN" },
  },
  {
    id: "2",
    masterId: "22",
    date: { label: "Дата", value: "21 августа" },
    time: { label: "Время", value: "14:00-15:00" },
    master: { label: "Мастер", value: "Леша" },
    service: { label: "Услуга", value: "Стрижка + борода" },
    address: { label: "Адрес", value: "Минск" },
    price: { label: "Цена", value: "40 BYN" },
  },
];

const MyOrdersUI = ({ lang }) => {
  const { myOrders } = l10n[lang];
  return (
    <div className="my_orders">
      <span className="my_orders__title">{myOrders}</span>
      <div className="my_orders__list">
        {MOCK_CONFIG.map((order) => {
          const { date, time, master, service, price, id } = order;
          const firstLine = `${date.value}. ${time.value}`;
          return (
            <div key={id}>
              <div>{firstLine}</div>
              <div>{master.value}</div>
              <div>{service.value}</div>
              <div>{price.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrdersUI;
