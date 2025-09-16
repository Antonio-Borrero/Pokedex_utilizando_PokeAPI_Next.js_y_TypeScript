"use client"

import Card from "@/components/PokemonCard";
import { useInfinitePokemon } from "@/hooks/useInfinitePokemon"

export default function Home() {

    const {pokemons, sentinel} = useInfinitePokemon();

  return (
      <div className={"grid grid-cols-6 justify-center gap-y-6 gap-x-2 m-6"}>
          {pokemons.map((pokemon) => (
              <Card
                  id={pokemon.id}
                  name={pokemon.name}
                  key={pokemon.name}
                  types={pokemon.types}
                  sprites={pokemon.sprites}
              />))}
          <div ref={sentinel} className="h-1 col-span-full"></div>
      </div>
  );
}
