import React, { useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type RobotProps = {
  positionX: number;
  positionY: number;
};

enum RobotAnimation {
  Greet = 0,
  ArmRaised = 1,
  Idle = 2,
  Walk = 3,
  Welcome = 4,
}

export default function Robot(props: RobotProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 300;
    camera.position.y = 150;
    camera.position.x = 0;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0); // Set background to transparent
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Load 3D Model
    const loader = new GLTFLoader();
    loader.load(
      "/models/robot.glb", // Path to your model file
      (gltf) => {
        const modelRobot = gltf.scene;
        modelRobot.position.set(0, 0, 0); // Position the model in front of the camera
        scene.add(modelRobot);

        // Enable shadows for the model
        modelRobot.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true; // The model casts shadows
            child.receiveShadow = true; // The model receives shadows
          }
        });

        scene.add(modelRobot);

        // Animation Mixer
        const mixer = new THREE.AnimationMixer(modelRobot);
        mixerRef.current = mixer;

        // Play the third animation (index 2)
        if (gltf.animations.length > 2) {
          const action = mixer.clipAction(
            gltf.animations[RobotAnimation.Idle],
            modelRobot
          );
          action.play();
        }

        // Animation
        const clock = new THREE.Clock();
        const animate = () => {
          requestAnimationFrame(animate);

          const delta = clock.getDelta();
          mixer.update(delta);

          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the model", error);
      }
    );

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10); // Position the light behind and above the camera
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        transform: `translate(${props.positionX}px, ${props.positionY}px)`,
        transition: "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
        width: "150px",
        height: "150px",
        position: "absolute",
      }}
    />
  );
}
