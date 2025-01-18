export interface User {
  username: string;
  email: string;
  age: number;
  occupation: string;
  goals: string[];
}

export interface RegistrationInput {
  username: string;
  email: string;
  password: string;
  age: number;
  occupation: string;
  goals: string[];
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ProfileOutput {
  username: string;
  email: string;
  age: number;
  occupation: string;
  goals: string[];
  xp: number;
  level: number;
  coins: number;
  streak: number;
  recentPerformance: Performance[];
  achievements: Achievement[];
  activeChallenges: Challenge[];
}

export interface ProgressUpdateInput {
  testType: string;
  score: number;
  timeTaken: number;
}

export interface StreakOutput {
  streak: number;
}

export interface SkillTree {
  [skillType: string]: {
    unlocked: boolean;
    level: number;
  };
}

export interface SkillsOutput {
  skillTree: SkillTree;
}

export interface Performance {
  // Define properties for performance
}

export interface Achievement {
  // Define properties for achievement
}

export interface Challenge {
  // Define properties for challenge
}