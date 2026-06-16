import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { FloatingScoreProps } from '../types/animation';
import styles from './FloatingScore.module.css';

const DEFAULT_DURATION = 1.8;
const DEFAULT_DISTANCE = 100;

const FloatingScore = ({
  value,
  duration = DEFAULT_DURATION,
  distance = DEFAULT_DISTANCE,
  initialX,
  initialY,
  onComplete,
}: FloatingScoreProps) => {
  useEffect(() => {
    if (!onComplete) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      onComplete();
    }, duration * 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [duration, onComplete]);

  const isPositive = value >= 0;
  const displayValue = isPositive ? `+${value}` : `${value}`;
  const variantClass = isPositive ? styles.positive : styles.negative;

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 1, 1, 0], y: [0, -distance] }}
      transition={{
        duration,
        times: [0, 0.11, 0.83, 1],
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ left: initialX, top: initialY, zIndex: 999 }}
      className={`${styles.floatingScore} ${variantClass}`}
    >
      {displayValue}
    </motion.div>
  );
};

export default FloatingScore;
export type { FloatingScoreProps };
