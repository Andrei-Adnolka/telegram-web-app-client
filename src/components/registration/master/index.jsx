import "./style.scss";

const MasterUI = ({ name, servicesList, place, phone }) => {
  console.log("servicesList", servicesList);
  return (
    <div className="master_wrapper">
      <div className="master_info">
        Мастер: <span>{name}</span>
        <div>{place}</div>
      </div>
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
