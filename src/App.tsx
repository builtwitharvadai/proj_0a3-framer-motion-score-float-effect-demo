import { useState } from 'react';
import { FloatingScore } from './components';
import styles from './App.module.css';

interface ActiveAnimation {
  id: string;
  value: number;
  x: number;
  y: number;
}

function App() {
  const [animations, setAnimations] = useState<ActiveAnimation[]>([]);

  const handleSpawnAnimation = (value: number) => {
    const id = `${Date.now()}-${Math.random().toString()}`;
    const x = window.innerWidth / 2 + Math.random() * 100 - 50;
    const y = window.innerHeight / 2;
    const newAnimation: ActiveAnimation = { id, value, x, y };
    setAnimations((prev) => [...prev, newAnimation].slice(-10));
  };

  const handleAnimationComplete = (id: string) => {
    setAnimations((prev) => prev.filter((animation) => animation.id !== id));
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>Framer Motion Score Float Demo</h1>
        <p className={styles.description}>Click buttons to see floating score animations</p>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.buttonSmall}`}
            onClick={() => handleSpawnAnimation(10)}
          >
            +10 Points
          </button>
          <button
            className={`${styles.button} ${styles.buttonMedium}`}
            onClick={() => handleSpawnAnimation(50)}
          >
            +50 Points
          </button>
          <button
            className={`${styles.button} ${styles.buttonLarge}`}
            onClick={() => handleSpawnAnimation(100)}
          >
            +100 Points
          </button>
        </div>
      </div>
      {animations.map((animation) => (
        <FloatingScore
          key={animation.id}
          value={animation.value}
          initialX={animation.x}
          initialY={animation.y}
          onComplete={() => handleAnimationComplete(animation.id)}
        />
      ))}
    </div>
  );
}

export default App;
