import {useState, useRef, useCallback, useEffect} from "react";
import {PokemonSpeciesList, PokemonCard} from "@/types/pokemonTypes";
import {fetchPokemonSpecies, fetchPokemonById} from "@/api/pokeApi";

export const useInfinitePokemon = () => {

    const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=20");
    const [pokemons, setPokemons] = useState<PokemonCard[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasNext, setHasNext] = useState<boolean>(true);

    const sentinel = useRef<HTMLDivElement | null>(null);

    const loadPokemons = useCallback(async () => {

        if (loading || !hasNext) return;
        setLoading(true);

        try {
            const speciesList: PokemonSpeciesList = await fetchPokemonSpecies(url);
            const pokemonData: PokemonCard[] = await Promise.all(
                speciesList.results.map(async (species) => {
                    const pokemon: PokemonCard = await fetchPokemonById(species.name);
                    return pokemon;
                })
            )
            setPokemons(prev => [...prev, ...pokemonData]);
            setUrl(speciesList.next ?? "");
            setHasNext(Boolean(speciesList.next));
        }
        catch (error) {
            console.log("Error al cargar los Pokemon", error);
        }
        finally {
            setLoading(false);
        }
    }, [url, hasNext, loading]);

    const infiniteScroll = useCallback(() => {
        const observer = new IntersectionObserver((entries) => {
                const first = entries[0];
                if (first.isIntersecting && !loading && hasNext){
                    loadPokemons();
                }
            },
            {
                root: null,
                rootMargin: "200px",
                threshold: 0,
            });
        if (sentinel.current) {
            observer.observe(sentinel.current);
        }
        return () => {
            observer.disconnect();
        }
    }, [loadPokemons, hasNext, loading]);

    useEffect(() => {
        loadPokemons();
    }, []);

    useEffect(() => {
        return infiniteScroll()
    }, [infiniteScroll]);

    return {pokemons, sentinel};
}