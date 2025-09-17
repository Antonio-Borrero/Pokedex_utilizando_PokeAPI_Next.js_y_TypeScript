"use client"

import { useEffect, useState } from "react";
import { fetchPokemonById } from "@/api/pokeApi";
import { SinglePokemonData } from "@/types/pokemonTypes";
import { typeBackgrounds} from "@/utils/typeColors";

type Props = {
    params: { id: string };
};

export default function Pokemon({ params }: Props) {
    const [pokemon, setPokemon] = useState<SinglePokemonData | null>(null);

    const { id } = params;

    useEffect(() => {
        const loadPokemonById = async () => {
            try {
                const pokemon = await fetchPokemonById(id);
                setPokemon(pokemon);
            } catch (error) {
                console.log("Error al cargar Pokemon", error);
            }
        };
        loadPokemonById();
    }, [id]);

    const pokemonType = pokemon?.types[0].type.name;
    const pokemonStats = pokemon?.stats;

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-100 via-white to-red-200 flex items-center justify-center p-4">
            <div className={`rounded-2xl border-4 border-black shadow-lg max-w-1/2 flex gap-8 p-4 ${typeBackgrounds[pokemonType]}`}>

                {/* imagen */}

                <img src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} className="object-contain"/>

                {/* panel de datos */}

                <div className="flex flex-col gap-4 border-2 border-gray-400 rounded-2xl bg-stone-100 p-4 shadow-inner flex-1 divide-y divide-gray-300">

                    {/* pokedex y nombre */}

                    <div className="pb-2">
                        <h2 className="capitalize text-3xl font-bold font-sans">
                            Pokedex: {pokemon?.id}
                        </h2>
                        <h2 className="capitalize text-3xl font-bold font-sans">
                            Name: {pokemon?.name}
                        </h2>
                    </div>

                    {/* tipos */}

                    <div className="pb-2 flex justify-between items-center">
                        <h2 className="capitalize text-2xl font-semibold">Type:</h2>
                        <ul className="flex gap-2">
                            {pokemon?.types.map((type: { type: { name: string } }, index: number) => (
                                <li key={index} className={`capitalize font-semibold px-2 py-1 rounded-md ${typeBackgrounds[type.type.name]} border-black border`}>
                                    {type.type.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* peso */}

                    <div className="pb-3 flex justify-between">
                        <h2 className="capitalize text-2xl font-semibold">Weight:</h2>
                        <p className="font-mono text-xl">{pokemon?.weight}</p>
                    </div>

                    {/* stats */}

                    <div>
                        <h2 className="capitalize text-2xl font-semibold">Base Stats:</h2>
                        <ul className="pl-4 pt-2 flex flex-col gap-2">
                            {pokemonStats?.map(
                                (stat: { stat: { name: string }; base_stat: number }, index: number) => (
                                    <li key={index} className="capitalize font-mono text-xl flex flex-col gap-1">
                                        <div className="flex justify-between">
                                            <span>{stat.stat.name}</span>
                                            <span>{stat.base_stat}</span>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
