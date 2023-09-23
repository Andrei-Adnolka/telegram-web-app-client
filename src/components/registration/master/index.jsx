import { useState, useCallback, useEffect } from "react";
import t from "timestamp-utils";
import cn from "classnames";

import CalendarIU from "../../calendar";
import FormIU from "../../form";
import { getDayLabel } from "../../calendar/utils";

import { useTelegram, useChangeMainButtonName } from "../../../hooks";

import "./style.scss";

const l10n = {
  ru: {
    selectService: "Выберите услугу",
    specialist: "Мастер",
    service: "Услуга",
    place: "Место",
  },
  eng: {
    selectService: "Select service",
    specialist: "Specialist",
    service: "Service",
    place: "Place",
  },
};

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

const ServiceList = ({ servicesList, setService, lang }) => {
  const { selectService } = l10n[lang];

  return (
    <div className="master_services">
      <div className="master_services__title">{selectService}</div>
      <div className="master_services__list">
        {servicesList.map((s) => (
          <Service service={s} key={s.id} setService={setService} />
        ))}
      </div>
    </div>
  );
};

const MasterUI = (props) => {
  const { name, servicesList, place, phone, workingDays, workingHours, lang } =
    props;
  const { specialist, service: s, place: p } = l10n[lang];

  const [date, setDate] = useState(workingDays[0]);
  const [time, setTime] = useState(0);
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
      time,
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
        {specialist}: <span>{name}</span>
        <div>
          {p}: {place}
        </div>
      </div>
      {service ? (
        <div className="master_service">
          <div className="master_services__title">
            {s}
            <img src="/pencil.svg" onClick={onRemoved} />
          </div>
          <Service service={service} />
        </div>
      ) : (
        <ServiceList
          servicesList={servicesList}
          setService={setService}
          lang={lang}
        />
      )}
      <CalendarIU
        onClickDate={setDate}
        activeDay={date}
        workingDays={workingDays}
      />
      <div className="working_hours">
        {workingHours?.[date]?.map?.((hours) => {
          const [hour, min] = hours.split(":");
          const onClick = () => {
            setTime(hours);
          };
          return (
            <div
              key={hours}
              onClick={onClick}
              className={cn({ ["hour_active"]: hours === time })}
            >{`${hour}:${min}`}</div>
          );
        })}
      </div>
      <FormIU onSetData={onSetFormData} />
    </div>
  );
};

export default MasterUI;
