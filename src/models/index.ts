export interface ApiSearchResponse<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}

export interface Monster {
    actions: Action[]; // Define this based on the specific structure of actions
    alignment: string;
    armor_class: number;
    armor_desc: string;
    bonus_actions: any | null; // Define based on specific structure if needed
      challenge_rating: string;
    charisma: number;
    charisma_save: number;
    condition_immunities: string;
    constitution: number;
    constitution_save: number;
    cr: number;
    damage_immunities: string;
    damage_resistances: string;
    damage_vulnerabilities: string;
    desc: string;
    dexterity: number;
    dexterity_save: number;
    document__license_url: string;
    document__slug: string;
    document__title: string;
    document__url: string;
    environments: any[];
    group: any | null;
    hit_dice: string;
    hit_points: number;
    img_main: string | null;
    intelligence: number;
    intelligence_save: number | null;
    languages: string;
    legendary_actions: Action[]; // Define this based on legendary action structure
    legendary_desc: string;
    name: string;
    page_no: number;
    perception: number | null;
    reactions: Action[]; // Define based on reaction structure
    senses: string;
    size: string;
    skills: {
        insight: number;
        perception: number;
        stealth: number;
    };
    slug: string;
    special_abilities: any[]; // Define based on special abilities structure
    speed: {
        walk: number;
        fly: number;
        swim: number;
    };
    spell_list: any[]; // Define this based on spell list structure
    strength: number;
    strength_save: number | null;
    subtype: string;
    type: string;
    v2_converted_path: string;
    wisdom: number;
    wisdom_save: number;
}

export interface Action {
    name: string,
    desc: string
}

export enum CombatStatus {
    Inactive = 0,
    Staging = 1,
    Active  = 2
}

export interface StagedMonster {
    id: number;
    name: string;
    modifier: number;
    count?: number;
    image?: string;
}