"use client"

import { useEffect, useState } from "react";
import {fetchEvolutions, fetchPokemonById, fetchPokemonBySpecies, fetchPokemonEvolutionChain} from "@/api/pokeApi";
import {SinglePokemonData} from "@/types/pokemonTypes";
import { typeBackgrounds} from "@/utils/typeColors";
import {getAllEvolutionsName} from "@/utils/evolution";
import Link from "next/link";

type Props = {
    params: { id: string };
};

export default function Pokemon({ params }: Props) {

    const [pokemon, setPokemon] = useState<SinglePokemonData | null>(null);
    const [evolutions, setEvolutions] = useState<SinglePokemonData[]>([])

    const id = params.id;

    useEffect(() => {
        const loadPokemon = async () => {
            try {
                const pokemon = await fetchPokemonById(id);
                setPokemon(pokemon);

                const pokemonSpecies = await fetchPokemonBySpecies(pokemon?.species.url);
                if (!pokemonSpecies.evolution_chain.url) return;

                const evolutionChain = await fetchPokemonEvolutionChain(pokemonSpecies?.evolution_chain.url)

                const evolutionNames = getAllEvolutionsName(evolutionChain.chain);

                const evolutionSprites = await fetchEvolutions(evolutionNames);
                setEvolutions(evolutionSprites);

            }
            catch (error) {
                console.log("Error cargando pokemon y/o chain", error);
            }
        };
        loadPokemon();
    }, [id]);

    const pokemonType = pokemon?.types[0].type.name;
    const pokemonStats = pokemon?.stats;

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-100 via-white to-red-200 flex items-center justify-center p-4">
            <div className={`rounded-2xl border-4 border-black shadow-lg md:w-[50vw] flex gap-8 p-4 ${typeBackgrounds[pokemonType]}`}>
                <div className="flex flex-col items-center divide-y divide-gray-300 flex-2">

                    {/* imagen */}

                    <div className="flex justify-center w-full">
                        <img
                            src={pokemon?.sprites.other["official-artwork"].front_default}
                            alt={pokemon?.name}
                            className="object-contain max-h-[40vh] md:max-h-[60vh] w-auto"
                        />
                    </div>

                    {/* linea evolutiva */}

                    <div className="flex divide-x divide-gray-300 w-full mt-1">
                        {evolutions.map(evolution => (
                                <div key={evolution.name} className="flex-1 flex justify-center">
                                    <Link href={`/pokemon/${evolution.name}`} className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                                        <img
                                            src={evolution.sprites.other["official-artwork"].front_default}
                                            alt={evolution.name}
                                            className="object-contain max-h-[10vh] md:max-h-[20vh] w-auto"
                                        />
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>

                {/* panel de datos */}

                <div className="flex flex-col gap-4 border-2 border-gray-400 rounded-2xl bg-stone-100 p-4 shadow-inner flex-1 w-full divide-y divide-gray-300">

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

                    {/* altura */}

                    <div className="pb-3 flex justify-between">
                        <h2 className="capitalize text-2xl font-semibold">Height:</h2>
                        <p className="font-mono text-xl">{pokemon?.height}</p>
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
