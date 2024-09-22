export enum Pantheons {
  Greek = "Greek",
  Egyptian = "Egyptian",
  Norse = "Norse",
  Atlantean = "Atlantean",
}

export enum Ages {
  I = "Archaic",
  II = "Classical",
  III = "Heroic",
  IV = "Mythic",
  V = "Wonder",
}

export interface IGod {
  name: string;
  pantheon: Pantheons;
}

export const GODS: { [name: string]: IGod } = {
  Zeus: {
    name: "Zeus",
    pantheon: Pantheons.Greek,
  },

  Hades: {
    name: "Hades",
    pantheon: Pantheons.Greek,
  },

  Poseidon: {
    name: "Poseidon",
    pantheon: Pantheons.Greek,
  },

  Ra: {
    name: "Ra",
    pantheon: Pantheons.Egyptian,
  },

  Isis: {
    name: "Isis",
    pantheon: Pantheons.Egyptian,
  },

  Set: {
    name: "Set",
    pantheon: Pantheons.Egyptian,
  },

  Thor: {
    name: "Thor",
    pantheon: Pantheons.Norse,
  },

  Odin: {
    name: "Odin",
    pantheon: Pantheons.Norse,
  },

  Loki: {
    name: "Loki",
    pantheon: Pantheons.Norse,
  },

  Freyr: {
    name: "Freyr",
    pantheon: Pantheons.Norse,
  },

  Kronos: {
    name: "Kronos",
    pantheon: Pantheons.Atlantean,
  },

  Oranos: {
    name: "Oranos",
    pantheon: Pantheons.Atlantean,
  },

  Gaia: {
    name: "Gaia",
    pantheon: Pantheons.Atlantean,
  },
};

export default GODS;
