import React from "react";
import PropTypes from 'prop-types'
import StatBar from "../StatBar/StatBar";

const PokemonCard = ({ pokemon, isShiny, onShinyToggle }) => {

    const id = pokemon.id.toString().padStart(3, '0');

    const normalImage = pokemon.sprites.other['official-artwork'].front_default;
    const shinyImage = pokemon.sprites.other['official-artwork'].front_shiny;
    const imageUrl = isShiny ? shinyImage : normalImage;

    const typesHtml = pokemon.types.map(typeInfo => (
        <span key={typeInfo.type.name} className={`type-badge type-${typeInfo.type.name}`} >{typeInfo.type.name}</span>
    ));

    return (
        <div className="pokemon-card">
            <button id="shiny-btn" onClick={onShinyToggle}>{isShiny ? '★' : 'X'}</button>
            <img src={imageUrl || pokemon.sprites.front_default} alt={`Imagem do ${pokemon.name}`} />

            <p className="pokemon-number">#{id}</p>
            <h2 className="pokemon-name">{pokemon.name}</h2>

            <div className="pokemon-types">{typesHtml}</div>

            <div className="pokemon-stats">
                {pokemon.stats.map(stat => (
                    <StatBar key={stat.stat.name} statName={stat.stat.name} statValue={stat.base_stat} />
                ))}
            </div>
        </div>
    );
};

PokemonCard.propTypes = {
    pokemon: PropTypes.object.isRequired,
    isShiny: PropTypes.bool.isRequired,
    onShinyToggle: PropTypes.func.isRequired,
};

export default PokemonCard;