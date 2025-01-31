import { useRef, useEffect, useState } from "react";
import styles from "./Cursor.module.scss";
import Robot from "../Robot/Robot";

export default function Cursor(): JSX.Element {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const previousMouse = useRef({ x: 0, y: 0 });
  const circle = useRef({ x: 0, y: 0 });
  const currentScale = useRef(0);
  const currentAngle = useRef(0);
  const SPEED = 0.1;

  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const tick = () => {
      // MOVE
      circle.current.x += (mouse.current.x - circle.current.x) * SPEED;
      circle.current.y += (mouse.current.y - circle.current.y) * SPEED;
      const translateTransform = `translate(${circle.current.x}px, ${circle.current.y}px)`;

      // SQUEEZE
      const deltaMouseX = mouse.current.x - previousMouse.current.x;
      const deltaMouseY = mouse.current.y - previousMouse.current.y;
      previousMouse.current.x = mouse.current.x;
      previousMouse.current.y = mouse.current.y;
      const mouseVelocity = Math.min(
        Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
        150
      );
      const scaleValue = (mouseVelocity / 150) * 0.5;
      currentScale.current += (scaleValue - currentScale.current) * SPEED;
      const scaleTransform = `scale(${1 + currentScale.current}, ${1 - currentScale.current})`;

      // ROTATE
      const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
      if (mouseVelocity > 20) {
        currentAngle.current = angle;
      }
      const rotateTransform = `rotate(${currentAngle.current}deg)`;

      if (circleRef.current) {
        circleRef.current.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
      }

      // MANAGE ROBOT
      setRobotPosition({
        x: circle.current.x + 15,
        y: circle.current.y + 10,
      });

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={circleRef} className={styles.circle}></div>
      <Robot positionX={robotPosition.x} positionY={robotPosition.y} />
    </>
  );
}
