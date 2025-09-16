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
    weight: number,
    stats: {base_stat: number, stat: {name: string}}[],
}

export type PokemonCard = Pick<SinglePokemonData, "id" | "name" | "sprites" | "types">;