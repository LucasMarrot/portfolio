import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/**
 * Robot animation enumeration
 */
export enum TRobotAnimation {
  Greet = 0,
  ArmRaised = 1,
  Idle = 2,
  Walk = 3,
  Welcome = 4,
}

/**
 * Configuration for robot loading and animation
 */
type TUseRobotAnimationConfig = {
  modelPath: string;
  animationIndex?: number;
  onError?: (error: Error) => void;
};

/**
 * Custom hook to manage robot model loading and animation
 * Encapsulates GLTFLoader, animation mixer setup, and animation playback
 *
 * @param scene Three.js scene to add robot to
 * @param config Configuration for robot model and animation
 * @returns Object with mixer reference and animation control methods
 */
export function useRobotAnimation(
  scene: THREE.Scene | null,
  config: TUseRobotAnimationConfig
) {
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  const playAnimation = useCallback(
    (animationIndex: number = config.animationIndex || TRobotAnimation.Idle) => {
      if (!modelRef.current || !mixerRef.current) return;

      const mixer = mixerRef.current;
      const gltf = (modelRef.current as any).__gltf;

      if (!gltf || !gltf.animations) return;

      // Stop all actions
      mixer.stopAllAction();

      // Play specified animation
      if (gltf.animations.length > animationIndex) {
        const action = mixer.clipAction(
          gltf.animations[animationIndex],
          modelRef.current
        );
        action.play();
      }
    },
    [config.animationIndex]
  );

  useEffect(() => {
    if (!scene) return;

    const loader = new GLTFLoader();
    loader.load(
      config.modelPath,
      (gltf) => {
        const modelRobot = gltf.scene;
        modelRobot.position.set(0, 0, 0);
        scene.add(modelRobot);
        modelRef.current = modelRobot;

        // Store gltf reference for animation access
        (modelRobot as any).__gltf = gltf;

        // Enable shadows
        modelRobot.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Setup animation mixer
        const mixer = new THREE.AnimationMixer(modelRobot);
        mixerRef.current = mixer;

        // Play default animation
        playAnimation();
      },
      undefined,
      (error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const err = new Error(`Failed to load robot model: ${errorMessage}`);
        console.error(err);
        config.onError?.(err);
      }
    );

    return () => {
      if (modelRef.current && scene) {
        scene.remove(modelRef.current);
      }
    };
  }, [scene, config, playAnimation]);

  return {
    mixer: mixerRef,
    model: modelRef,
    playAnimation,
  };
}
