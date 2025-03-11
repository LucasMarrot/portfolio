import React from "react";
import styles from "./NavButton.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import InteractiveObject from "../../_commons/InteractiveObject/InteractiveObject";
import { InteractiveType } from "../../../contexts/InteractiveContext";
import clickNavButtonPush from "../../../assets/sounds/effects/clickNavButtonPush.mp3";
import clickNavButtonPull from "../../../assets/sounds/effects/clickNavButtonPull.mp3";

type TNavButtonProps = {
  label: string;
  path: string;
};

const NavButton = (props: TNavButtonProps): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive: boolean = location.pathname === props.path;
  const isHome: boolean = location.pathname === "/";

  const handleClick = (): void => {
    if (!isActive) {
      navigate(props.path);
    }
  };

  const handleMouseDown = (): void => {
    const audio = new Audio(clickNavButtonPush);
    audio.play();
  };

  const handleMouseUp = (): void => {
    const audio = new Audio(clickNavButtonPull);
    audio.play();
  };

  return (
    <li className={`${styles.list} ${isHome ? styles.home : ""}`}>
      <InteractiveObject
        type={InteractiveType.CLICK}
        isInteractionEnabled={!isActive}
      >
        <button
          className={`${styles.button} ${isActive ? styles.active : ""}`}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {props.label}
        </button>
      </InteractiveObject>
    </li>
  );
};

export default NavButton;
