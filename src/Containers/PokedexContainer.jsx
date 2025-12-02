import React, {useState, useEffect, useCallback} from "react";
import PokemonCard from "../Components/PokemonCard/PokemonCard";
import SearchBar from "../Components/SearchBar/SearchBar";
import NavigationButtons from "../Components/NavigationButtons/NavigationButtons";

// URL da API
const PoKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';

// Responsável pela lógica, estado e comunicação da API
const PokedexContainer = () => {

    const [pokemonData, setPokemonDate] = useState(null);
    const [currentPokemonId, setCurrentPokemonId] = useState(null);
    const [isShiny, setIsShiny] = useState(false);
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false);


    // Função para buscar dados na PokéAPI
    const fetchPokemon = useCallback(async (idOrName) => {
        setIsLoading(true);
        setPokemonDate(null); // Limpa o card enquanto carrega
        setMessage('Carregando...'); //Exibe mensagem de status

        try {
            const url = `${PoKEAPI_URL}${idOrName}`;
            const response = await fetch(url)

            if(!response.ok) {
                // mensagem de erro 
                throw new Error('Pokémon não encontrado!');
            }

            const data = await response.json();
            // Atualiza os estados com dados e o ID
            setCurrentPokemonId(data.id);
            setPokemonDate(data);
            setMessage(''); // Limpa a mensagem de status
        } catch (error) {
            // Loga e reseta o estado em caso e falha na busca
            console.error('Erro ao buscar Pokémon', error);
            setCurrentPokemonId(null);
            setPokemonDate(null);
            setMessage('Pokémon não encontrado. Tente novamente.');
        } finally {
            // Executado sempre, para garantir que o estado e loading seja desligado
            setIsLoading(false);
        }
    }, []) // Array e ependências vazio 

    // Carrga um Pokémon aleatório na primeira montagem do componente
    useEffect(() => {
        const randomId = Math.floor(Math.random() * 1025) + 1;
        fetchPokemon(randomId);
    }, [fetchPokemon]); // Depende de fetchPokemon

    // Handler de Busca 
    const handleSearch = (searchTerm) => {
        setIsShiny(false); // Rseta o estado shiny 
        fetchPokemon(searchTerm);
    };

    // Handler de Toggle Shiny
    const hanleShinyToggle = () => {
        // Atualiza o estado usando o valor anterior
        setIsShiny(prevShiny => !prevShiny);
    };

    // Handlers de Navegação
    const handlePrev = () => {
        if(currentPokemonId > 1) {
            fetchPokemon(currentPokemonId - 1);
        }
    };

    const handleNext = () => {
        if (currentPokemonId < 1025) { // Limite do projeto
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