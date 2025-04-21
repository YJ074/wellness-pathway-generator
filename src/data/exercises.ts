
import { ExerciseType } from '../types/workout';

// Only Indian traditional (desi) bodyweight/no-equipment exercises
const DESI_EXERCISES: ExerciseType[] = [
  {
    name: "Surya Namaskar",
    reps: "5 rounds",
    description: "A sequence of 12 powerful yoga poses; excellent for overall flexibility and strength.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    tutorialUrl: "https://www.youtube.com/watch?v=73SjJJwMSuA", // English
    tutorialUrlHindi: "https://www.youtube.com/watch?v=0bZLwCfBos0", // Hindi
  },
  {
    name: "Hindu Push-ups (Dand)",
    reps: "12-15 reps",
    description: "Traditional Indian push-ups for strength and mobility. Start in downward dog, dive down, and arch up like cobra.",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
    tutorialUrl: "https://www.youtube.com/watch?v=rq8C0F0rJgs",
    tutorialUrlHindi: "https://www.youtube.com/watch?v=l6BGJENZLAg",
  },
  {
    name: "Baithak (Indian Squats)",
    reps: "20 reps",
    description: "Bodyweight squat variation used by Indian wrestlers; keep heels raised and swing arms forward.",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
    tutorialUrl: "https://www.youtube.com/watch?v=e5zHK4SLpu0",
    tutorialUrlHindi: "https://www.youtube.com/watch?v=08cnr7Gln2U",
  },
  {
    name: "Naukasana (Boat Pose)",
    reps: "Hold 30 seconds",
    description: "Core strengthening yoga pose; balance on sit bones forming a 'V' shape.",
    imageUrl: "https://images.unsplash.com/photo-1526406901270-38ec1c582e10",
    tutorialUrl: "https://www.youtube.com/watch?v=qlXbGCCnKk0",
    tutorialUrlHindi: "https://www.youtube.com/watch?v=CGLAEa_PbQ4",
  },
  {
    name: "Kapalbhati Pranayama",
    reps: "2-3 minutes",
    description: "A traditional breathing exercise for detoxification, involving forceful exhalations.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    tutorialUrl: "https://www.youtube.com/watch?v=tk0rT2Yhfgs",
    tutorialUrlHindi: "https://www.youtube.com/watch?v=SuGQbAq9pEw",
  }
];

// MAIN EXERCISES for ALL LEVELS: Only the Indian (desi) exercises
export const BODYWEIGHT_EXERCISES: Record<string, ExerciseType[]> = {
  beginner: [...DESI_EXERCISES],
  intermediate: [...DESI_EXERCISES],
  advanced: [...DESI_EXERCISES]
};

export const WARMUP_EXERCISES = [
  "Arm circles (10 forward, 10 backward)",
  "High knees in place (30 seconds)",
  "Jumping jacks (30 seconds)",
  "Body-weight squats (10 reps)",
  "Forward arm swings (10 each arm)",
  "Hip rotations (10 each direction)",
  "Surya Namaskar Flow (2 rounds)", // Add desi-specific warmup
  "Kapalbhati breathing (1 min)"
];

export const COOLDOWN_STRETCHES = [
  "Forward fold (30 seconds)",
  "Runner's lunge stretch (30 seconds each side)",
  "Child's pose (30 seconds)",
  "Cat-cow stretch (10 repetitions)",
  "Downward dog hold (30 seconds)",
  "Shavasana (Rest - 2 mins)" // Indian cool down
];
