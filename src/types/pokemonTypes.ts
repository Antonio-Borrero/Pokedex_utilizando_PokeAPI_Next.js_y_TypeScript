export type PokemonSpeciesList = {
    next: string | null,
    results: PokemonSpeciesResult[],
}

export type PokemonSpeciesResult = {
    name: string,
    url: string,
}

export type SinglePokemonData = {
    id: number,
    name: string,
    sprites: {other: {["official-artwork"]: {front_default: string}}},
    types: {type: {name: string}}[],
    height: number,
    weight: number,
    stats: {base_stat: number, stat: {name: string}}[],
    species: {url: string},
}

export type PokemonCard = Pick<SinglePokemonData, "id" | "name" | "sprites" | "types">;

export type PokemonSpecies = {
    name: string,
    evolution_chain: {url: string };
}

export type EvolutionChainLink = {
    species: {name: string, url: string};
    evolves_to: EvolutionChainLink[];
}

export type EvolutionChain = {
    chain: EvolutionChainLink;
}