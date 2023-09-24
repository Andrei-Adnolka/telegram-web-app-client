import { useParams, Link } from "react-router-dom";

import "./style.scss";

const MasterListUI = ({ setMaster, masterList }) => {
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
              <div className="master__button">Записаться</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MasterListUI;
