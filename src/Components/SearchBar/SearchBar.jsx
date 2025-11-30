import React, {useState} from "react";
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedTerm = searchTerm.trim().toLowerCase();

        if(trimmedTerm) {
            onSearch(trimmedTerm);
            setSearchTerm('') //limpar o input
        }
    };

    return (
        <form id="search-form" onSubmit={handleSubmit}>
            <input type="text" id="search-input" placeholder="Digite o nome ou número do Pokémon" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required />
            <button type="submit">Buscar</button>
        </form>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
};

export default SearchBar;