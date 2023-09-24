import { useState } from "react";
import cn from "classnames";

import HeaderUI from "../header";

import MyPastOrdersUI from "./past-orders";

import "./style.scss";

const l10n = {
  ru: { myOrders: "Мои записи" },
  eng: { myOrders: "My orders" },
};

const DEFAULT_TAB_ID = "active";

const CONFIG = [
  { id: DEFAULT_TAB_ID, labels: { ru: "Активные", eng: "Active" } },
  { id: "past", labels: { ru: "Прошлые", eng: "Past" } },
];

const Tab = ({ text, isActive, onClick }) => (
  <div className={cn("tab", { ["tab_active"]: isActive })} onClick={onClick}>
    {text}
  </div>
);

const MyOrdersUI = ({ lang }) => {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB_ID);
  const { myOrders } = l10n[lang];

  const isActiveTab = activeTab === DEFAULT_TAB_ID;

  return (
    <div className="my_orders">
      <HeaderUI
        title={myOrders}
        isGoBackVisible={false}
        isGoForwardVisible={false}
      />
      <div className="tabs">
        {CONFIG.map((c) => {
          const onClick = () => {
            setActiveTab(c.id);
          };
          return (
            <Tab
              text={c.labels[lang]}
              isActive={c.id === activeTab}
              key={c.id}
              onClick={onClick}
            />
          );
        })}
      </div>
      {isActiveTab ? null : <MyPastOrdersUI lang={lang} />}
    </div>
  );
};

export default MyOrdersUI;
