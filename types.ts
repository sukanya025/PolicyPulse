import { LucideIcon } from 'lucide-react';

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface Benefit {
  title: string;
  value: string;
  description: string;
}
