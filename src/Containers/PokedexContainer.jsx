import React, {useState, useEffect, useCallback} from "react";
import PokemonCard from "../Components/PokemonCard/PokemonCard";
import SearchBar from "../Components/SearchBar/SearchBar";
import NavigationButtons from "../Components/NavigationButtons/NavigationButtons";

const PoKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';

const PokedexContainer = () => {

    const [pokemonData, setPokemonDate] = useState(null);
    const [currentPokemonId, setCurrentPokemonId] = useState(null);
    const [isShiny, setIsShiny] = useState(false);
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false);


    const fetchPokemon = useCallback(async (idOrName) => {
        setIsLoading(true);
        setPokemonDate(null);
        setMessage('Carregando...');

        try {
            const url = `${PoKEAPI_URL}${idOrName}`;
            const response = await fetch(url)

            if(!response.ok) {
                throw new Error('Pokémon não encontrado!');
            }

            const data = await response.json();
            setCurrentPokemonId(data.id);
            setPokemonDate(data);
            setMessage('');
        } catch (error) {
            console.error('Erro ao buscar Pokémon', error);
            setCurrentPokemonId(null);
            setPokemonDate(null);
            setMessage('Pokémon não encontrado. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        const randomId = Math.floor(Math.random() * 1025) + 1;
        fetchPokemon(randomId);
    }, [fetchPokemon]);

    const handleSearch = (searchTerm) => {
        setIsShiny(false);
        fetchPokemon(searchTerm);
    };

    const hanleShinyToggle = () => {
        setIsShiny(prevShiny => !prevShiny);
    };

    const handlePrev = () => {
        if(currentPokemonId > 1) {
            fetchPokemon(currentPokemonId - 1);
        }
    };

    const handleNext = () => {
        if (currentPokemonId < 1025) {
            fetchPokemon(currentPokemonId + 1);
        }
    }

    return (
        <div className="pokedex-app">
            <h1>Pokédex</h1>

            <SearchBar onSearch={handleSearch} />

            <p id="message-area" style={{display: message ? 'block' : 'none'}}>{message}</p>

            <div id="pokedex-container">
                {pokemonData && (
                    <PokemonCard pokemon={pokemonData}
                    isShiny={isShiny}
                    onShinyToggle={hanleShinyToggle} />
                )}
            </div>

            <NavigationButtons
                currentId={currentPokemonId}
                onPrev={handlePrev}
                onNext={handleNext}
                isHidden={!pokemonData || isLoading} />
        </div>
    );
};

export default PokedexContainer;