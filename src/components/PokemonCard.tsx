import {PokemonCard} from "@/types/pokemonTypes";
import {typeBorders, typeBackgrounds} from "@/utils/typeColors";
import Link from "next/link";

export default function Card({id, name, types, sprites}: PokemonCard)  {

    const mainType = types[0].type.name;

    return (
        <Link href={`/pokemon/${name}`}>
            <div className={`flex flex-col bg-stone-200 rounded-2xl pb-5 border-4 ${typeBorders[mainType]}`}>
                <img src={sprites.other["official-artwork"].front_default} alt={name} className={"h-70 object-contain"}/>
                <h2 className={"text-center capitalize text-2xl font-semibold"}>{id}. {name}</h2>
                <div className={"flex justify-center gap-2"}>
                    {types.map((type: {type: {name: string}}, index: number) => (
                        <p className={`border-2 p-1 rounded-md w-30 text-center font-bold capitalize mt-2 ${typeBorders[type.type.name]} ${typeBackgrounds[type.type.name]}`} key={index}>{type.type.name}</p>
                    ))}
                </div>
            </div>
        </Link>
    )
}