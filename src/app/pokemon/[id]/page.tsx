"use client"

import {useEffect, useState} from "react";
import {fetchPokemonById} from "@/api/pokeApi";
import {SinglePokemonData} from "@/types/pokemonTypes";
import {typeBackgrounds, typeBorders} from "@/utils/typeColors";

type props = {
    params: {id:string};
}

export default function Pokemon({params}: props) {

    const [pokemon, setPokemon] = useState<SinglePokemonData | null>(null);

    const {id} = params

    useEffect(() => {
        const loadPokemonById = async () => {
            try {
                const pokemon = await fetchPokemonById(id);
                setPokemon(pokemon);
            }
            catch(error) {
                console.log("Error al cargar Pokemon", error);
            }
        };
        loadPokemonById();
    }, [id])

    return (
        <div>
            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} className={"h-64 object-contain"}/>
            <h2 className={"text-center capitalize text-2xl font-semibold"}>{pokemon?.id}. {pokemon?.name}</h2>
            <div className={"flex justify-center gap-2"}>
                {pokemon && pokemon.types.map((type: {type: {name: string}}, index: number) => (
                    <p className={`border-2 p-1 rounded-md w-30 text-center font-bold capitalize mt-2 ${typeBorders[type.type.name]} ${typeBackgrounds[type.type.name]}`} key={index}>{type.type.name}</p>
                ))}
            </div>
        </div>
    )
}