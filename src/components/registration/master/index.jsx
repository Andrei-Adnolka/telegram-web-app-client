import "./style.scss";

// id: "222",
// name: "Леша",
// place: "Октябрьская 21, барбершоп MLF_HUNTER",
// number: "+375441111111",
// servicesList: [
//   { id: 1, label: "Срижка", price: "45 BYN", time: "1 ч" },
//   { id: 2, label: "Срижка + борода", price: "55 BYN", time: "1 ч 30 мин" },
// ],
// ],

const MasterUI = ({ name, servicesList, place, phone }) => {
  console.log("servicesList", servicesList);
  return (
    <div className="master_wrapper">
      <div>Мастер: {name}</div>
      <div>{place}</div>
      {/* <a className="master__phone" href={`tel:${phone}`}>
        Телефон мастера: {phone}
      </a> */}
      <div className="master_services">
        <div className="master_services__title">Выберите услугу</div>
        <div className="master_services__list">
          {servicesList.map(({ label, id, price, time }) => {
            return (
              <div key={id}>
                {label}
                <div className="price_time">
                  {price} {time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MasterUI;
