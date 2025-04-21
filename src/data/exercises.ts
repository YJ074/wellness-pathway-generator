
// Add Indian/desi exercises and mix with existing logic

import { ExerciseType } from '../types/workout';

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
    tutorialUrl: "https://www.youtube.com/watch?v=rq8C0F0rJgs", // English
    tutorialUrlHindi: "https://www.youtube.com/watch?v=l6BGJENZLAg", // Hindi
  },
  {
    name: "Baithak (Indian Squats)",
    reps: "20 reps",
    description: "Bodyweight squat variation used by Indian wrestlers; keep heels raised and swing arms forward.",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
    tutorialUrl: "https://www.youtube.com/watch?v=e5zHK4SLpu0", // English
    tutorialUrlHindi: "https://www.youtube.com/watch?v=08cnr7Gln2U", // Hindi
  },
  {
    name: "Naukasana (Boat Pose)",
    reps: "Hold 30 seconds",
    description: "Core strengthening yoga pose; balance on sit bones forming a 'V' shape.",
    imageUrl: "https://images.unsplash.com/photo-1526406901270-38ec1c582e10",
    tutorialUrl: "https://www.youtube.com/watch?v=qlXbGCCnKk0", // English
    tutorialUrlHindi: "https://www.youtube.com/watch?v=CGLAEa_PbQ4", // Hindi
  },
  {
    name: "Kapalbhati Pranayama",
    reps: "2-3 minutes",
    description: "A traditional breathing exercise for detoxification, involving forceful exhalations.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    tutorialUrl: "https://www.youtube.com/watch?v=tk0rT2Yhfgs", // English
    tutorialUrlHindi: "https://www.youtube.com/watch?v=SuGQbAq9pEw", // Hindi
  }
];

export const BODYWEIGHT_EXERCISES: Record<string, ExerciseType[]> = {
  beginner: [
    ...DESI_EXERCISES.slice(0, 3), // Mix in Indian basics
    { 
      name: "Basic Push-ups", 
      reps: "5-8 reps", 
      description: "Start in plank position, lower your body until your chest nearly touches the ground, then push back up",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tutorialUrl: "https://www.youtube.com/watch?v=IODxDxX7oi4"
    },
    { 
      name: "Air Squats", 
      reps: "10-12 reps", 
      description: "Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, then return to standing",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
      tutorialUrl: "https://www.youtube.com/watch?v=rMvwVtlqjTE"
    },
    { 
      name: "Plank Hold", 
      reps: "20-30 seconds", 
      description: "Hold a straight-arm plank position with core engaged",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tutorialUrl: "https://www.youtube.com/watch?v=ASdvN_XEl_c"
    }
  ],
  intermediate: [
    ...DESI_EXERCISES, // Use more desi
    { 
      name: "Diamond Push-ups", 
      reps: "8-12 reps", 
      description: "Push-ups with hands close together forming a diamond shape",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tutorialUrl: "https://www.youtube.com/watch?v=J0DnG1_S92I"
    },
    { 
      name: "Jump Squats", 
      reps: "12-15 reps", 
      description: "Perform a squat, then explosively jump up, land softly back into squat position",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
      tutorialUrl: "https://www.youtube.com/watch?v=CVaEhXotL7M"
    },
    { 
      name: "Burpees", 
      reps: "10 reps", 
      description: "Drop to ground, perform push-up, jump feet forward, then jump up with hands overhead",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tutorialUrl: "https://www.youtube.com/watch?v=TU8QYVW0gDU"
    }
  ],
  advanced: [
    ...DESI_EXERCISES,
    { 
      name: "Plyometric Push-ups", 
      reps: "8-10 reps", 
      description: "Explosive push-ups where hands leave the ground at the top",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tutorialUrl: "https://www.youtube.com/watch?v=Z0bRiVhnO8Q"
    },
    { 
      name: "Burpee Push-ups", 
      reps: "12 reps", 
      description: "Burpee with push-up at bottom and jump at top",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      tutorialUrl: "https://www.youtube.com/watch?v=TU8QYVW0gDU"
    }
  ]
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

