
import { ExerciseType } from '../types/workout';

// Traditional Indian (desi) bodyweight/no-equipment exercises with progression levels
const DESI_EXERCISES: Record<string, ExerciseType[]> = {
  beginner: [
    {
      name: "Surya Namaskar (Sun Salutation)",
      reps: "2 rounds",
      description: "Gentle flow through all 12 poses, focus on form and breathing",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      tutorialUrl: "https://www.youtube.com/watch?v=73SjJJwMSuA",
      tutorialUrlHindi: "https://www.youtube.com/watch?v=0bZLwCfBos0",
    },
    {
      name: "Baithak (Indian Squat)",
      reps: "8 reps",
      description: "Focus on form, keep heels down, and maintain good posture",
      imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
      tutorialUrl: "https://www.youtube.com/watch?v=e5zHK4SLpu0",
      tutorialUrlHindi: "https://www.youtube.com/watch?v=08cnr7Gln2U",
    },
    {
      name: "Plank Hold",
      reps: "20 seconds",
      description: "Focus on maintaining a straight body line and engaging core",
      imageUrl: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c",
      tutorialUrl: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
    },
    {
      name: "Marjariasana (Cat-Cow Pose)",
      reps: "8 repetitions",
      description: "Focus on spinal mobility and breathing",
      imageUrl: "https://images.unsplash.com/photo-1516642898673-edd1ced8aeae",
      tutorialUrl: "https://www.youtube.com/watch?v=kqnua4rHVVA",
    },
    {
      name: "Simple Bridge (Setubandhasana)",
      reps: "8 reps, hold 5 sec",
      description: "Beginner variation, focus on proper form",
      imageUrl: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0",
      tutorialUrl: "https://www.youtube.com/watch?v=2-7UM3YV9BQ",
    },
  ],
  intermediate: [
    {
      name: "Surya Namaskar (Sun Salutation)",
      reps: "4 rounds",
      description: "Moderate pace through all poses with full breathing",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      tutorialUrl: "https://www.youtube.com/watch?v=73SjJJwMSuA",
    },
    {
      name: "Hindu Push-ups (Dand)",
      reps: "15 reps",
      description: "Full range of motion, moderate pace",
      imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
      tutorialUrl: "https://www.youtube.com/watch?v=rq8C0F0rJgs",
    },
    {
      name: "Plank Hold",
      reps: "30 seconds",
      description: "Add subtle movements like hip dips or shoulder taps",
      imageUrl: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c",
      tutorialUrl: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
    },
    {
      name: "Chakrasana (Wheel Pose)",
      reps: "3 reps, hold 10 sec",
      description: "Focus on back flexibility and strength",
      imageUrl: "https://images.unsplash.com/photo-1516642898673-edd1ced8aeae",
      tutorialUrl: "https://www.youtube.com/watch?v=DZU_GUJC82U",
    },
    {
      name: "Naukasana (Boat Pose)",
      reps: "3 sets of 15 sec holds",
      description: "Core strengthening yoga pose with leg variations",
      imageUrl: "https://images.unsplash.com/photo-1526406901270-38ec1c582e10",
      tutorialUrl: "https://www.youtube.com/watch?v=qlXbGCCnKk0",
    },
  ],
  advanced: [
    {
      name: "Dynamic Surya Namaskar",
      reps: "6 rounds",
      description: "Flowing with jump transitions between poses",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      tutorialUrl: "https://www.youtube.com/watch?v=73SjJJwMSuA",
    },
    {
      name: "Plyometric Hindu Push-ups",
      reps: "12-15 reps",
      description: "Add explosive movement at the top of each push-up",
      imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
      tutorialUrl: "https://www.youtube.com/watch?v=rq8C0F0rJgs",
    },
    {
      name: "Jump Baithak (Jump Squats)",
      reps: "15 reps",
      description: "Explosive movement with full extension and soft landing",
      imageUrl: "https://images.unsplash.com/photo-1553531384-411a247ccd73",
      tutorialUrl: "https://www.youtube.com/watch?v=CVaEhXotL7M",
    },
    {
      name: "Dynamic Yoga Flow",
      reps: "5 minutes",
      description: "Continuous flow between warrior poses and balance positions",
      imageUrl: "https://images.unsplash.com/photo-1516642898673-edd1ced8aeae",
      tutorialUrl: "https://www.youtube.com/watch?v=of2spyCtUkw",
    },
    {
      name: "Advanced Plank Series",
      reps: "45 seconds",
      description: "Alternating between standard plank, side planks and plank jacks",
      imageUrl: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c",
      tutorialUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
    },
  ]
};

// MAIN EXERCISES for ALL LEVELS
export const BODYWEIGHT_EXERCISES: Record<string, ExerciseType[]> = {
  beginner: [...DESI_EXERCISES.beginner],
  intermediate: [...DESI_EXERCISES.intermediate],
  advanced: [...DESI_EXERCISES.advanced]
};

export const WARMUP_EXERCISES = [
  "Arm circles (10 forward, 10 backward)",
  "High knees in place (30 seconds)",
  "Jumping jacks (30 seconds)",
  "Body-weight squats (10 reps)",
  "Forward arm swings (10 each arm)",
  "Hip rotations (10 each direction)",
  "Surya Namaskar Flow (1 round - gentle pace)",
  "Kapalbhati breathing (1 min)",
  "Ankle rotations (10 each direction)",
  "Neck stretches (5 each direction)"
];

export const COOLDOWN_STRETCHES = [
  "Forward fold (30 seconds)",
  "Runner's lunge stretch (30 seconds each side)",
  "Child's pose (30 seconds)",
  "Cat-cow stretch (10 repetitions)",
  "Downward dog hold (30 seconds)",
  "Shavasana (Rest - 2 mins)",
  "Butterfly stretch (30 seconds)",
  "Seated spinal twist (30 seconds each side)",
  "Wrist and ankle rotations (10 each direction)",
  "Deep breathing exercise (1 min)"
];
