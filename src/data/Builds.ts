import { IGod } from "@/data/Gods";

export interface IBuild {
  id?: string;
  name: string;
  author: string; // IUser id
  rating: number;
  description?: string;
  tags?: string[];
  gods: IGod[];
  guide: IBuildGuide;
}

interface IBuildGuide {
  i?: IBuildGuideStep[];
  ii?: IBuildGuideStep[];
  iii?: IBuildGuideStep[];
  iv?: IBuildGuideStep[];
  v?: IBuildGuideStep[];
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
  id: string;
  username: string;
  builds: string[]; // List of build ids
}
