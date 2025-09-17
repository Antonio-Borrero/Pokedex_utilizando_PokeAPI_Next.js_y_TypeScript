import {PokemonCard} from "@/types/pokemonTypes";
import {typeBackgrounds} from "@/utils/typeColors";
import Link from "next/link";

export default function Card({id, name, types, sprites}: PokemonCard)  {

    const mainType = types[0].type.name;

    return (
        <Link href={`/pokemon/${name}`}>
            <div className={`flex flex-col rounded-2xl pb-5 border-4 ${typeBackgrounds[mainType]} border-black shadow-lg`}>
                <img src={sprites.other["official-artwork"].front_default} alt={name} className={"h-70 object-contain"}/>
                <h2 className={"text-center capitalize text-2xl font-semibold"}>{id}. {name}</h2>
            </div>
        </Link>
    )
}