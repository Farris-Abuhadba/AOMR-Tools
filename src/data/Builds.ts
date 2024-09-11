import { IGod } from "@/data/Gods";

export interface IBuildGuide {
  name: string;
  author: IUser;
  gods: IGod[];
  tags: string[];
  steps: (IBuildGuideStep | IBuildGuideNote)[];
}

export interface IBuildGuideStep {
  description: string;
  time?: number;
  workingBuilding?: number;
  workingFood?: number;
  workingWood?: number;
  workingGold?: number;
  workingFavor?: number;
}

export interface IBuildGuideNote {
  description: string;
}

export interface IUser {
  username: string;
  rating: number;
}
