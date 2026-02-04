import {
  useRef,
  useEffect,
  useState,
  RefObject,
  useCallback,
  lazy,
  Suspense,
} from "react";
import styles from "./Cursor.module.scss";
import {
  InteractiveType,
  useInteractive,
} from "../../contexts/InteractiveContext";

const Robot = lazy(() => import("../Robot/Robot"));

type CursorProps = {
  circleRef: RefObject<HTMLDivElement>;
};

export default function Cursor(props: CursorProps): JSX.Element {
  const { circleRef } = props;
  const { interactiveState } = useInteractive();
  const mouse = useRef({ x: 0, y: 0 });
  const previousMouse = useRef({ x: 0, y: 0 });
  const circle = useRef({ x: 0, y: 0 });
  const currentScale = useRef(0);
  const currentAngle = useRef(0);
  const SPEED = 0.1;
  const ROBOT_SIZE = 200;
  const ROBOT_OFFSET = { x: -25, y: -50 };

  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });

  /**
   * Memoize robot position update to avoid unnecessary recalculations
   */
  const updateRobotPosition = useCallback(() => {
    let newX = circle.current.x + ROBOT_OFFSET.x;
    let newY = circle.current.y + ROBOT_OFFSET.y;

    const maxX = window.innerWidth - ROBOT_SIZE;
    const maxY = window.innerHeight - ROBOT_SIZE;

    newX = Math.max(0, Math.min(maxX, newX));
    newY = Math.max(0, Math.min(maxY, newY));

    setRobotPosition({ x: newX, y: newY });
  }, [ROBOT_OFFSET.x, ROBOT_OFFSET.y]);

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

      updateRobotPosition();

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [circleRef, updateRobotPosition]);

  return (
    <>
      <div
        ref={circleRef}
        className={`${styles.circle} ${interactiveState.type ? styles[interactiveState.type] : ""}`}
      />
      <Suspense fallback={null}>
        <Robot
          positionX={robotPosition.x}
          positionY={robotPosition.y}
          path={window.location.hash}
          speechText={
            interactiveState.type === InteractiveType.SPEAK ||
            interactiveState.type === InteractiveType.ALL
              ? interactiveState.text
              : undefined
          }
        />
      </Suspense>
    </>
  );
}
