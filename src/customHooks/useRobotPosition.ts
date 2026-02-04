import { useState, useCallback } from "react";

/**
 * Configuration for robot position calculation
 */
type TUseRobotPositionConfig = {
  robotSize: number;
  offsetX: number;
  offsetY: number;
};

/**
 * Custom hook to manage robot position based on cursor movement
 * Encapsulates boundary checking and position clamping logic
 *
 * @param cursorX Current cursor X position
 * @param cursorY Current cursor Y position
 * @param config Configuration for robot positioning
 * @returns Current robot position
 */
export function useRobotPosition(
  cursorX: number,
  cursorY: number,
  config: TUseRobotPositionConfig
) {
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });

  /**
   * Update robot position with boundary constraints
   */
  const updatePosition = useCallback(() => {
    let newX = cursorX + config.offsetX;
    let newY = cursorY + config.offsetY;

    // Clamp to viewport bounds
    const maxX = window.innerWidth - config.robotSize;
    const maxY = window.innerHeight - config.robotSize;

    newX = Math.max(0, Math.min(maxX, newX));
    newY = Math.max(0, Math.min(maxY, newY));

    setRobotPosition({ x: newX, y: newY });
  }, [cursorX, cursorY, config]);

  return {
    robotPosition,
    updatePosition,
  };
}
