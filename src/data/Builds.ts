import { IGod } from "@/data/Gods";

export interface IBuild {
  name: string;
  author: IUser;
  description?: string;
  gods: IGod[];
  tags?: string[];
  steps: IBuildGuideStep[];
}

export interface IBuildGuideStep {
  description: string;
  isNote: boolean;
  time?: number;
  workingBuilding?: number;
  workingFood?: number;
  workingWood?: number;
  workingGold?: number;
  workingFavor?: number;
}

export interface IUser {
  username: string;
  rating: number;
}
