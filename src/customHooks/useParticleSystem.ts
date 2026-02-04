import { useState, useCallback, useRef } from "react";

/**
 * Type for particle configuration
 */
export type TParticle = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

/**
 * Configuration for particle system
 */
type TUseParticleSystemConfig = {
  maxParticles?: number;
  gravity?: number;
  friction?: number;
};

/**
 * Custom hook to manage a particle system
 * Encapsulates particle creation, update, and removal logic
 *
 * @param config Configuration for particle system
 * @returns Particle system state and controls
 */
export function useParticleSystem(config: TUseParticleSystemConfig = {}) {
  const {
    maxParticles = 100,
    gravity = 0.1,
    friction = 0.98,
  } = config;

  const [particles, setParticles] = useState<TParticle[]>([]);
  const particleIdRef = useRef(0);

  /**
   * Add a new particle to the system
   */
  const addParticle = useCallback(
    (x: number, y: number, vx: number, vy: number, life: number = 1) => {
      setParticles((prev) => {
        const newParticles = [...prev];

        // Remove oldest particle if max reached
        if (newParticles.length >= maxParticles) {
          newParticles.shift();
        }

        const newParticle: TParticle = {
          id: `particle-${particleIdRef.current++}`,
          x,
          y,
          vx,
          vy,
          life,
          maxLife: life,
        };

        newParticles.push(newParticle);
        return newParticles;
      });
    },
    [maxParticles]
  );

  /**
   * Update all particles based on physics
   */
  const updateParticles = useCallback(() => {
    setParticles((prev) => {
      return prev
        .map((particle) => ({
          ...particle,
          vx: particle.vx * friction,
          vy: (particle.vy + gravity) * friction,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 0.02,
        }))
        .filter((p) => p.life > 0);
    });
  }, [gravity, friction]);

  /**
   * Clear all particles
   */
  const clear = useCallback(() => {
    setParticles([]);
    particleIdRef.current = 0;
  }, []);

  return {
    particles,
    addParticle,
    updateParticles,
    clear,
  };
}
