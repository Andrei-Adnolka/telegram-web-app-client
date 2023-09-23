import { useState, useCallback, useEffect } from "react";
import t from "timestamp-utils";

import CalendarIU from "../../calendar";
import FormIU from "../../form";
import { getDateWithoutTime, getDayLabel } from "../../calendar/utils";

import { useTelegram, useChangeMainButtonName } from "../../../hooks";

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
  const [formData, setFormData] = useState("");

  const { telegram, queryId, userInfo } = useTelegram();

  useChangeMainButtonName("Записаться");

  const onSendData = useCallback(() => {
    const data = {
      masterName: name,
      masterPhone: phone,
      place,
      date,
      dayLabel: getDayLabel(date),
      service,
      formData,
      queryId,
      userInfo,
    };
    // fetch("http://localhost:8000/web-data ", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // // TODO: remove after deploy bot
    telegram.sendData(JSON.stringify(data));
  }, [date, service, formData, queryId, name]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);
    return () => {
      telegram.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    if (date && service && formData.first_name && formData.phone) {
      telegram.MainButton.show();
    } else {
      telegram.MainButton.hide();
    }
  }, [date, service, formData]);

  const onRemoved = () => {
    setService("");
  };

  const onSetFormData = useCallback(
    (id, value) => {
      setFormData((prev) => ({ ...prev, [id]: value }));
    },
    [setFormData]
  );

  return (
    <div className="master_wrapper">
      <div className="master_info">
        Мастер: <span>{name}</span>
        <div>{place}</div>
      </div>
      {service ? (
        <div className="master_service" onClick={onSendData}>
          <div className="master_services__title">
            Услуга<span onClick={onRemoved}>Изменить</span>
          </div>
          <Service service={service} />
        </div>
      ) : (
        <ServiceList servicesList={servicesList} setService={setService} />
      )}
      <CalendarIU onClickDate={setDate} activeDay={date} />
      <FormIU onSetData={onSetFormData} />
    </div>
  );
};

export default MasterUI;
