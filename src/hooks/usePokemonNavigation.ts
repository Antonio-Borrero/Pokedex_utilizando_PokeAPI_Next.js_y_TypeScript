import {useEffect, useState} from "react";
import {SinglePokemonData} from "@/types/pokemonTypes";
import {fetchPokemonById} from "@/api/pokeApi";

export default function usePokemonNavigation(id: number) {

    const [prevPokemon, setPrevPokemon] = useState<SinglePokemonData | null>(null);
    const [nextPokemon, setNextPokemon] = useState<SinglePokemonData | null>(null);

    useEffect(() => {
        if (!id) return;

        const getAdjacentPokemon = async () => {

            const prevId = String(id - 1);
            const nextId = String(id + 1);

            if (id > 0) {
                try {
                    const prevPokemon = await fetchPokemonById(prevId);
                    setPrevPokemon(prevPokemon);
                } catch (error) {
                    console.log("No hay pokemon anterior", error);
                    setPrevPokemon(null);
                }

                try {
                    const nextPokemon = await fetchPokemonById(nextId);
                    setNextPokemon(nextPokemon);
                } catch (error) {
                    console.log("No hay pokemon siguiente", error);
                    setNextPokemon(null);
                }
            }
        }

        getAdjacentPokemon();
    }, [id]);

    return {prevPokemon, nextPokemon};
}