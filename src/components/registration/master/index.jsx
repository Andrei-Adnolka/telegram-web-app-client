import { useState, useCallback } from "react";

import CalendarIU from "../../calendar";
import { getDateWithoutTime } from "../../calendar/utils";

import "./style.scss";

const Service = ({ service, setService }) => {
  const { label, id, price, time } = service;
  const onChose = () => {
    if (typeof setService === "function") {
      setService(service);
    }
  };
  return (
    <div key={id} onClick={onChose} className="service">
      {label}
      <div className="price_time">
        {price} {time}
      </div>
    </div>
  );
};

const ServiceList = ({ servicesList, setService }) => (
  <div className="master_services">
    <div className="master_services__title">Выберите услугу</div>
    <div className="master_services__list">
      {servicesList.map((s) => (
        <Service service={s} key={s.id} setService={setService} />
      ))}
    </div>
  </div>
);

const MasterUI = ({ name, servicesList, place, phone }) => {
  const today = getDateWithoutTime(new Date().getTime());
  const [date, setDate] = useState(today);
  const [service, setService] = useState("");

  const onRemoved = () => {
    setService("");
  };

  return (
    <div className="master_wrapper">
      <div className="master_info">
        Мастер: <span>{name}</span>
        <div>{place}</div>
      </div>
      {service ? (
        <div className="master_service">
          <div className="master_services__title">
            Услуга<span onClick={onRemoved}>Изменить</span>
          </div>
          <Service service={service} />
        </div>
      ) : (
        <ServiceList servicesList={servicesList} setService={setService} />
      )}
      <CalendarIU onClickDate={setDate} activeDay={date} />
    </div>
  );
};

export default MasterUI;
