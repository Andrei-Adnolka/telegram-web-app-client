import { memo, useState } from "react";
import InputMask from "react-input-mask";

import { useTelegram } from "../../hooks";

import "./style.scss";

const l10n = {
  ru: { title: "Контактная информация" },
  eng: { title: "Contact Information" },
};

const CONFIG = [
  {
    placeholder: { ru: "Ваше имя", eng: "Your name" },
    isRequired: true,
    id: "first_name",
  },
  {
    placeholder: { ru: "Ваша фамилия", eng: "Your last name" },
    isRequired: false,
    id: "last_name",
  },
];

const InputUI = ({ element, onSetData, extraData = {}, lang }) => {
  const [value, setValue] = useState("");
  const { id, placeholder, isRequired } = element;
  const pl = placeholder[lang];

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    onSetData(id, value);
  };

  return (
    <input
      onChange={onChange}
      onBlur={onBlur}
      className="form_input"
      placeholder={`${pl}${isRequired ? "*" : ""}`}
      value={value}
      type="text"
      name={id}
      {...extraData}
    />
  );
};

const PhoneInputUI = ({ onSetData }) => {
  const [value, setValue] = useState("");
  const name = "phone";
  const { telegram } = useTelegram();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    onSetData(name, value);
  };

  // const onClick = () => {
  //   telegram.requestContact((phone) => {
  //     onSetData(name, phone);
  //     telegram.sendData(JSON.stringify({ phone }));
  //   });
  // };

  return (
    <InputMask
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      mask="+\3\7\5\ \(99\)\ 999\-99\-99"
      placeholder="+375(__)___-__-__"
      maskChar="_"
      type="text"
      name={name}
      className="form_input"
    />
  );
};

const FormUI = ({ onSetData, lang }) => {
  const { title } = l10n[lang];
  return (
    <div className="form_wrapper">
      <div className="form_title">{title}</div>
      {CONFIG.map((element) => {
        return (
          <InputUI
            key={element.id}
            element={element}
            onSetData={onSetData}
            lang={lang}
          />
        );
      })}
      <PhoneInputUI onSetData={onSetData} />
    </div>
  );
};

export default memo(FormUI);
