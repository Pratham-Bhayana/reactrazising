import { useState, useEffect, useCallback } from "react";
import { AnimationStage } from "../constants";

interface AnimationProgress {
  stage: AnimationStage;
  progress: number; // 0 to 1 for current stage
  goToNextStage: () => void;
  goToStage: (stage: AnimationStage) => void;
}

/**
 * Hook to manage animation progress through stages
 * @param initialStage The starting animation stage
 * @param autoProgress Whether to automatically progress through stages
 * @param stageDurations Durations for each stage in milliseconds
 */
export default function useAnimationProgress(
  initialStage: AnimationStage = AnimationStage.INITIAL,
  autoProgress: boolean = false,
  stageDurations: Record<AnimationStage, number> = {
    [AnimationStage.INITIAL]: 2000,
    [AnimationStage.EARTH_ROTATION]: 3000,
    [AnimationStage.ZOOM_TO_INDIA]: 2500,
    [AnimationStage.INDIA_MARKER]: 1500,
    [AnimationStage.MAIN_CONTENT]: 0 // No auto-progress from final stage
  }
): AnimationProgress {
  const [stage, setStage] = useState<AnimationStage>(initialStage);
  const [progress, setProgress] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Go to next stage
  const goToNextStage = useCallback(() => {
    setStage(prevStage => {
      const nextStage = prevStage + 1;
      // Check if next stage exists in enum
      if (Object.values(AnimationStage).includes(nextStage)) {
        return nextStage as AnimationStage;
      }
      return prevStage;
    });
    setProgress(0); // Reset progress for new stage
  }, []);

  // Go to specific stage
  const goToStage = useCallback((newStage: AnimationStage) => {
    setStage(newStage);
    setProgress(0); // Reset progress for new stage
  }, []);

  // Handle auto-progress when enabled
  useEffect(() => {
    if (!autoProgress) return;
    
    // Clear any existing timer
    if (timer) clearTimeout(timer);
    
    // Get duration for current stage
    const duration = stageDurations[stage];
    
    // Don't set timer if duration is 0 (no auto-progress)
    if (duration === 0) return;
    
    // Set progress update interval
    const interval = 16; // ~60fps
    const steps = duration / interval;
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep++;
      setProgress(currentStep / steps);
      
      // Move to next stage when complete
      if (currentStep >= steps) {
        clearInterval(progressInterval);
        goToNextStage();
      }
    }, interval);
    
    return () => clearInterval(progressInterval);
  }, [stage, autoProgress, stageDurations, timer, goToNextStage]);

  return { stage, progress, goToNextStage, goToStage };
}
