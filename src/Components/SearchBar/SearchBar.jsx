import React, {useState} from "react";
import PropTypes from 'prop-types';

// Focado na UI do formulário e no estado local do input
const SearchBar = ({ onSearch }) => {
    // Gerencia o valor digitado
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedTerm = searchTerm.trim().toLowerCase();

        if(trimmedTerm) {
            // Chama a função onSearch 
            onSearch(trimmedTerm);
            setSearchTerm('') // Limpar o input
        }
    };

    return (
        <form id="search-form" onSubmit={handleSubmit}>
            <input type="text" id="search-input" placeholder="Digite o nome ou número do Pokémon" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required />
            <button type="submit">Buscar</button>
        </form>
    );
};

// Validação de props para que onSearch é uma função
SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
};

export default SearchBar;