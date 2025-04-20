
import { ExerciseType } from '../types/workout';

export const BODYWEIGHT_EXERCISES: Record<string, ExerciseType[]> = {
  beginner: [
    { 
      name: "Basic Push-ups", 
      reps: "5-8 reps", 
      description: "Start in plank position, lower your body until your chest nearly touches the ground, then push back up",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Air Squats", 
      reps: "10-12 reps", 
      description: "Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, then return to standing",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    },
    { 
      name: "Plank Hold", 
      reps: "20-30 seconds", 
      description: "Hold a straight-arm plank position with core engaged",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Mountain Climbers", 
      reps: "20 reps (10 each leg)", 
      description: "In plank position, alternate bringing knees to chest in a running motion",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Bird Dogs", 
      reps: "10 each side", 
      description: "On hands and knees, extend opposite arm and leg while maintaining balance",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    }
  ],
  intermediate: [
    { 
      name: "Diamond Push-ups", 
      reps: "8-12 reps", 
      description: "Push-ups with hands close together forming a diamond shape",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Jump Squats", 
      reps: "12-15 reps", 
      description: "Perform a squat, then explosively jump up, land softly back into squat position",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    },
    { 
      name: "Burpees", 
      reps: "10 reps", 
      description: "Drop to ground, perform push-up, jump feet forward, then jump up with hands overhead",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Mountain Climbers", 
      reps: "30 reps (15 each leg)", 
      description: "Quick alternating knee drives in plank position",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Walking Lunges", 
      reps: "20 steps total", 
      description: "Step forward into lunge position, alternate legs while moving forward",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    }
  ],
  advanced: [
    { 
      name: "Plyometric Push-ups", 
      reps: "8-10 reps", 
      description: "Explosive push-ups where hands leave the ground at the top",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Pistol Squats", 
      reps: "5 each leg", 
      description: "Single-leg squats while other leg is extended in front",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    },
    { 
      name: "Burpee Push-ups", 
      reps: "12 reps", 
      description: "Burpee with push-up at bottom and jump at top",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Plank to Downward Dog", 
      reps: "15 reps", 
      description: "Alternate between plank and downward dog positions",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    { 
      name: "Jump Lunges", 
      reps: "20 reps (10 each leg)", 
      description: "Alternating jumping lunges with explosive movement",
      imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    }
  ]
};

export const WARMUP_EXERCISES = [
  "Arm circles (10 forward, 10 backward)",
  "High knees in place (30 seconds)",
  "Jumping jacks (30 seconds)",
  "Body-weight squats (10 reps)",
  "Forward arm swings (10 each arm)",
  "Hip rotations (10 each direction)"
];

export const COOLDOWN_STRETCHES = [
  "Forward fold (30 seconds)",
  "Runner's lunge stretch (30 seconds each side)",
  "Child's pose (30 seconds)",
  "Cat-cow stretch (10 repetitions)",
  "Downward dog hold (30 seconds)"
];

