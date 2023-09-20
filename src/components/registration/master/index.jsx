import { useState, useCallback, useEffect } from "react";

import CalendarIU from "../../calendar";
import FormIU from "../../form";
import { getDateWithoutTime } from "../../calendar/utils";

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

  const { telegram } = useTelegram();

  useChangeMainButtonName("Записаться");

  console.log("telegram", telegram);

  const onSendData = useCallback(() => {
    telegram.sendData(JSON.stringify({ date, service, formData }));
  }, [date, service, formData, telegram]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);
    return () => {
      telegram.offEvent("mainButtonClicked", onSendData);
    };
  }, [telegram, onSendData]);

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
      <FormIU onSetData={onSetFormData} />
    </div>
  );
};

export default MasterUI;
