/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, RefObject } from "react";
import * as THREE from "three";

/**
 * Configuration for Three.js scene setup
 */
type TUseThreeJsSceneConfig = {
  cameraZ?: number;
  cameraY?: number;
  cameraX?: number;
  backgroundColor?: number;
  enableShadows?: boolean;
};

const DEFAULT_CONFIG: TUseThreeJsSceneConfig = {
  cameraZ: 300,
  cameraY: 150,
  cameraX: 0,
  backgroundColor: 0x000000,
  enableShadows: true,
};

/**
 * Scene components returned by the hook
 */
export type TThreeJsSceneState = {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
};

/**
 * Custom hook to manage Three.js scene setup and cleanup
 * Encapsulates scene initialization, camera setup, and renderer configuration
 *
 * @param containerRef Reference to DOM container for Three.js rendering
 * @param config Optional configuration for scene
 * @returns Scene, camera, and renderer objects
 */
export function useThreeJsScene(
  containerRef: RefObject<HTMLDivElement>,
  config: Partial<TUseThreeJsSceneConfig> = {}
): TThreeJsSceneState {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = finalConfig.cameraZ || 300;
    camera.position.y = finalConfig.cameraY || 150;
    camera.position.x = finalConfig.cameraX || 0;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(finalConfig.backgroundColor || 0x000000, 0);
    if (finalConfig.enableShadows) {
      renderer.shadowMap.enabled = true;
    }
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // Cleanup on unmount
    return () => {
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [containerRef, finalConfig]);

  return {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
  };
}
