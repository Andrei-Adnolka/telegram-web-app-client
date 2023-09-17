import { useNavigate } from "react-router-dom";

import "./style.scss";

const HeaderUI = ({ title, isGoBackVisible, isGoForwardVisible }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(+1);
  };

  return (
    <div className="header_wrapper">
      {isGoBackVisible ? (
        <div className="back_button" onClick={goBack}>
          {"<"}
        </div>
      ) : null}
      <div className="header_title">{title}</div>
      {isGoForwardVisible ? (
        <div className="back_forward" onClick={goForward}>
          {">"}
        </div>
      ) : null}
    </div>
  );
};

export default HeaderUI;
