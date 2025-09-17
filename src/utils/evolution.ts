import {EvolutionChainLink} from "@/types/pokemonTypes";

export function getAllEvolutionsName(chain: EvolutionChainLink) {
    const names: string[] = [chain.species.name];

    chain.evolves_to.forEach((next) => {
        names.push(...getAllEvolutionsName(next));
    });

    return names;
}