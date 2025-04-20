
import { ExerciseType } from '../types/workout';

export const BODYWEIGHT_EXERCISES: Record<string, ExerciseType[]> = {
  beginner: [
    { 
      name: "Push-ups from knees", 
      reps: "5-8 reps", 
      description: "Modified push-ups with knees on the ground",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Wall push-ups", 
      reps: "8-10 reps", 
      description: "Push-ups against a wall",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    { 
      name: "Assisted squats", 
      reps: "10 reps", 
      description: "Squats while holding onto a chair for support",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    },
    { 
      name: "Standing crunches", 
      reps: "10 reps", 
      description: "Crunches performed while standing",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Incline push-ups", 
      reps: "8 reps", 
      description: "Push-ups with hands elevated on a stable surface",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    }
  ],
  intermediate: [
    { 
      name: "Regular push-ups", 
      reps: "10-12 reps", 
      description: "Standard push-ups",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Bodyweight squats", 
      reps: "15 reps", 
      description: "Regular squats without support",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    },
    { 
      name: "Mountain climbers", 
      reps: "20 reps", 
      description: "Alternating knee drives in plank position",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    { 
      name: "Plank hold", 
      reps: "30 seconds", 
      description: "Hold plank position with proper form",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Lunges", 
      reps: "10 each leg", 
      description: "Forward lunges alternating legs",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    }
  ],
  advanced: [
    { 
      name: "Diamond push-ups", 
      reps: "12-15 reps", 
      description: "Push-ups with hands forming a diamond shape",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Jump squats", 
      reps: "20 reps", 
      description: "Explosive squats with jump at the top",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    },
    { 
      name: "Burpees", 
      reps: "12 reps", 
      description: "Full burpee with push-up",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    { 
      name: "Plank to downward dog", 
      reps: "10 reps", 
      description: "Alternating between plank and downward dog positions",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Walking lunges", 
      reps: "20 steps", 
      description: "Continuous lunges walking forward",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    }
  ]
};

export const WARMUP_EXERCISES = [
  "Arm circles (10 forward, 10 backward)",
  "Shoulder rolls (10 each direction)",
  "Hip circles (10 each direction)",
  "Jumping jacks (30 seconds)",
  "High knees (30 seconds)",
  "Leg swings (10 each leg)"
];

export const COOLDOWN_STRETCHES = [
  "Child's pose (30 seconds)",
  "Cat-cow stretch (10 repetitions)",
  "Hamstring stretch (30 seconds each leg)",
  "Quad stretch (30 seconds each leg)",
  "Shoulder stretch (30 seconds each side)"
];
