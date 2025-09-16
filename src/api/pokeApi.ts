import {PokemonSpeciesList} from "@/types/pokemonTypes";
import {SinglePokemonData} from "@/types/pokemonTypes";

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