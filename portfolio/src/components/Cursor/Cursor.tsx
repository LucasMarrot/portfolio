import { useRef, useEffect, useState } from "react";
import styles from "./Cursor.module.scss";
import Robot from "../Robot/Robot";

export default function Cursor(): JSX.Element {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef({ x: 0, y: 0 });

  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });

  const speed = 0.15;

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
    let animationFrameId: number;

    const tick = () => {
      if (circleRef.current) {
        circle.current.x += (mouse.current.x - circle.current.x) * speed;
        circle.current.y += (mouse.current.y - circle.current.y) * speed;

        setRobotPosition({
          x: circle.current.x + 40,
          y: circle.current.y + 20,
        });

        circleRef.current.style.transform = `
          translate(${circle.current.x}px, ${circle.current.y}px)
        `;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={circleRef} className={styles.circle}></div>
      <Robot />
    </>
  );
}
