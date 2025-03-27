export interface ApiSearchResponse<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}

export interface Open5eMonster {
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

export interface APIMonster {
    index: string;
    name: string;
    size: string;
    type: string;
    alignment: string;
    armor_class: APIArmorClass[];
    hit_points: number;
    hit_dice: string;
    hit_points_roll: string;
    speed: APISpeed,
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
    proficiencies: APIProficiency[],
    damage_vulnerabilities: string[],
    damage_resistances: string[],
    damage_immunities: string[],
    condition_immunities: APIReference[],
    senses: {
        darkvision?: string;
        passive_perception: number
    },
    languages: string;
    challenge_rating: number;
    proficiency_bonus: number;
    xp: number;
    special_abilities: APIDescription[],
    actions: APIAction[],
    image: string;
    url: string;
    updated_at: Date;
    legendary_actions: APIAction[]
}

export interface APIDescription {
    name: string;
    desc: string;
}

export interface APIAction {
    name: string;
    desc: string;
    attack_bonus?: number;
    dc?: APIDC;
    damage?: APIDamage;
    usage?: APIUsage;
}

export interface APIDamage {
    damage_type: APIReference;
    damage_dice: string;
}

export interface APIDC {
    dc_type: APIReference;
    dc_value: number;
    success_type: string;
}

export interface APIUsage {
    type: string;
    dice: string;
    min_value: number;
}

export interface APIArmorClass {
    type: string;
    value: number;
    armor: APIReference;
}

export interface APISpeed {
    walk: string;
    fly: string;
    swim: string;
}

export interface APIProficiency {
    value: number;
    proficiency: APIReference;
}

export interface APIReference {
    index: string;
    name: string;
    url: string;
}

export enum CombatStatus {
    Inactive = 0,
    Staging = 1,
    Active = 2
}

export interface StagedMonster {
    id: number;
    name: string;
    modifier: number;
    count?: number;
    image?: string;
}

export interface StagedPlayer {
    id: number;
    name: string;
    initiative?: number;
    image?: string;
}

export interface Combatant {
    id: number;
    name: string;
    player?: boolean;
    initiative?: number;
    image?: string;
}

export enum APISources {
    DnDApi = 1,
    OpenApi = 2
}