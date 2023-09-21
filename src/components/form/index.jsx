import { memo, useState } from "react";
import InputMask from "react-input-mask";

import { useTelegram } from "../../hooks";

import "./style.scss";

const CONFIG = [
  { placeholder: "Ваше имя", isRequired: true, id: "first_name" },
  { placeholder: "Ваша фамилия", isRequired: false, id: "last_name" },
];

const InputUI = ({ element, onSetData, extraData = {} }) => {
  const [value, setValue] = useState("");
  const { id, placeholder, isRequired } = element;

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
      placeholder={`${placeholder}${isRequired ? "*" : ""}`}
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

  const onClick = () => {
    telegram.requestContact((phone) => {
      onSetData(name, phone);
      telegram.sendData(JSON.stringify({ phone }));
    });
  };

  return (
    <InputMask
      onClick={onClick}
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

const FormUI = ({ onSetData }) => {
  return (
    <div className="form_wrapper">
      <div className="form_title">Контактная информация</div>
      {CONFIG.map((element) => {
        return (
          <InputUI key={element.id} element={element} onSetData={onSetData} />
        );
      })}
      <PhoneInputUI onSetData={onSetData} />
    </div>
  );
};

export default memo(FormUI);
