import React from "react";
import styles from "./NavButton.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import InteractiveObject from "../../_commons/InteractiveObject/InteractiveObject";
import { InteractiveType } from "../../../contexts/InteractiveContext";

type TNavButtonProps = {
  label: string;
  path: string;
};

const NavButton = (props: TNavButtonProps): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive: boolean = location.pathname === props.path;

  const handleClick = (): void => {
    if (!isActive) {
      navigate(props.path);
    }
  };

  return (
    <li className={styles.liste}>
      <InteractiveObject
        type={InteractiveType.CLICK}
        isInteractionEnabled={!isActive}
      >
        <button
          className={`${styles.button} ${isActive ? styles.active : ""}`}
          onClick={handleClick}
        >
          {props.label}
        </button>
      </InteractiveObject>
    </li>
  );
};

export default NavButton;
