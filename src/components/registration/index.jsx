import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import HeaderUI from "../header";

import MastersList from "./list";
import Master from "./master";

import "./style.scss";

const l10n = {
  ru: {
    createRegistration: "Создать запись",
    selectSpecialist: "Выберите мастера",
  },
  eng: {
    createRegistration: "Create registration",
    selectSpecialist: "Select specialist",
  },
};

const SERVICES = [
  { id: 1, label: "Срижка", price: "45 BYN", time: "1 ч" },
  {
    id: 2,
    label: "Срижка + борода + окрашивание",
    price: "55 BYN",
    time: "1 ч 30 мин",
  },
  { id: 3, label: "Срижка 1", price: "45 BYN", time: "1 ч" },
  {
    id: 4,
    label: "Срижка + борода + окрашивание 1",
    price: "55 BYN",
    time: "1 ч 30 мин",
  },
  { id: 5, label: "Срижка 2", price: "45 BYN", time: "1 ч" },
  {
    id: 6,
    label: "Срижка + борода + окрашивание 2",
    price: "55 BYN",
    time: "1 ч 30 мин",
  },
];

const MOCK_MASTERS = [
  {
    id: "222",
    name: "Леша",
    specialty: "Барбер",
    place: "барбершоп 'Гараж'",
    phone: "+375441111111",
    servicesList: SERVICES,
    photo: "/user-avatar.jpg",
    workingDays: [1695686400000, 1695772800000, 1695945600000],
    workingHours: {
      1695686400000: [
        "09:00:00",
        "09:30:00",
        "10:00:00",
        "10:30:00",
        "11:00:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "13:00:00",
      ],
      1695772800000: ["11:00:00", "11:30:00", "12:00:00"],
      1695945600000: ["09:00:00", "09:30:00"],
    },
  },
  {
    id: "333",
    name: "Петя",
    specialty: "Барбер",
    place: "барбершоп 'Гараж'",
    phone: "+375(44)1111111",
    servicesList: [
      { id: 1, label: "Срижка", price: "45 BYN", time: "1 ч" },
      {
        id: 2,
        label: "Срижка + борода + окрашивание",
        price: "55 BYN",
        time: "1 ч 30 мин",
      },
    ],
    photo: "/user-avatar.jpg",
    workingDays: [1695686400000, 1695772800000, 1695859200000],
    workingHours: {
      1695686400000: ["09:00:00", "09:30:00"],
      1695772800000: ["11:00:00", "11:30:00", "12:00:00"],
      1695859200000: ["12:00:00"],
    },
  },
  {
    id: "444",
    name: "Иван",
    specialty: "Барбер",
    place: "барбершоп 'Гараж'",
    phone: "+375(44)1111111",
    servicesList: SERVICES,
    photo: "/user-avatar.jpg",
    workingDays: [1695859200000],
    workingHours: {
      1695859200000: ["18:00:00"],
    },
  },
];

const RegistrationUI = ({ lang }) => {
  const { masterId } = useParams();
  const defaultMaster = useMemo(
    () => MOCK_MASTERS.find((el) => el.id === masterId),
    [masterId]
  );

  const [master, setMaster] = useState(defaultMaster);
  const isMasterPage = !!masterId;
  const { createRegistration, selectSpecialist } = l10n[lang];

  return (
    <div>
      <HeaderUI
        title={isMasterPage ? createRegistration : selectSpecialist}
        isGoBackVisible={isMasterPage}
        isGoForwardVisible={!isMasterPage && !!master}
      />
      {isMasterPage && master ? (
        <Master {...master} lang={lang} />
      ) : (
        <MastersList
          setMaster={setMaster}
          lang={lang}
          masterList={MOCK_MASTERS}
        />
      )}
    </div>
  );
};

export default RegistrationUI;
