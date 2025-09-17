import {PokemonSpeciesList, SinglePokemonData, PokemonSpecies, EvolutionChain} from "@/types/pokemonTypes";

export const fetchPokemonSpecies = async (url: string): Promise<PokemonSpeciesList> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al hacer fetch de los pokemon");
    return await response.json();

}

export const fetchPokemonById = async (id: string): Promise<SinglePokemonData> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) throw new Error("Error al hacer fetch del pokemon");
    return await response.json();
}

export const fetchPokemonBySpecies = async (url: string): Promise<PokemonSpecies> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al hacer fetch de la especie");
    return await response.json();
}

export const fetchPokemonEvolutionChain = async (url: string): Promise<EvolutionChain> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al hacer fetch de la evolucion chain");
    return await response.json();
}

export const fetchEvolutions = async (names: string[]): Promise<SinglePokemonData[]> => {
    const promises = names.map( name => fetchPokemonById(name));
    return await Promise.all(promises)
}