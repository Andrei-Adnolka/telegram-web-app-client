import { useParams, Link } from "react-router-dom";

import "./style.scss";

const l10n = {
  ru: { button: "Записаться" },
  eng: { button: "Book now" },
};

const MasterListUI = ({ setMaster, masterList, lang }) => {
  const { button } = l10n[lang];
  return (
    <div className="masters_wrapper">
      <div className="masters_list">
        {masterList.map((master) => {
          const { id, name, specialty, place, phone, photo } = master;
          const onSetData = () => {
            setMaster(master);
          };
          return (
            <Link
              key={id}
              to={`/registration/${id}`}
              className="master"
              onClick={onSetData}
            >
              <div className="master__header">
                <img src={photo} alt="avatar" />
                <div>
                  <span>{name}</span>
                  <span>{specialty}</span>
                </div>
              </div>
              {/* <a className="master__phone" href={`tel:${phone}`}>
                {phone}
              </a> */}
              <span className="master__place">{place}</span>
              <div className="master__button">{button}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MasterListUI;
