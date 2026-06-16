/**
 * TypeScript type definitions for the FloatingScore animation system.
 *
 * These types provide a single source of truth for animation configuration
 * and component props, ensuring type safety across the application.
 */

/**
 * Configuration describing a single floating-score animation pass.
 */
export interface AnimationConfig {
  /** Total animation duration in seconds (from fade-in start to fade-out end). */
  duration: number;
  /** Vertical travel distance in pixels (the element floats upward by this amount). */
  distance: number;
  /** Cubic-bezier easing curve expressed as four control points: [x1, y1, x2, y2]. */
  easing: number[];
}

/**
 * Props accepted by the FloatingScore component.
 */
export interface FloatingScoreProps {
  /** Numeric score value to display. Positive values are prefixed with '+'. */
  value: number;
  /** Total animation duration in seconds. Defaults to 1.8s when omitted. */
  duration?: number;
  /** Vertical travel distance in pixels. Defaults to 100px when omitted. */
  distance?: number;
  /** Initial horizontal position in pixels, used to absolutely position the element. */
  initialX: number;
  /** Initial vertical position in pixels, used to absolutely position the element. */
  initialY: number;
  /** Optional callback invoked when the animation completes (after `duration` seconds). */
  onComplete?: () => void;
}
