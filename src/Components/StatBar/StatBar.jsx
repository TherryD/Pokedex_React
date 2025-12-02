import React from "react";
import PropTypes from 'prop-types';

// Exibe uma única linha de estatística
const StatBar = ({ statName, statValue}) => {
    // Cálculo da porcentagem da barra de estatística
    const statPercentage = (statValue /255) * 100;
    // Formatação dos nomes das estatísticas
    let displayName = statName 
        .replace('special-attack', 'Sp. Atk')
        .replace('special-efense', 'Sp. Def')
        .replace('hp', 'HP')
        .replace('attack', 'Attack')
        .replace('defense', 'Defense')
        .replace('speed', 'Speed')

    return (
        <div className="stat-row">
            <div className="stat-name">{displayName}</div>
            <div className="stat-value">{statValue}</div>
            <div className="stat-bar">
                <div className="stat-bar-inner" style={{width: `${statPercentage > 100 ? 100 : statPercentage}%`}}></div>
            </div>
        </div>
    );
};

// Validação de Props
StatBar.propTypes = {
    statName: PropTypes.string.isRequired,
    statValue: PropTypes.number.isRequired,
};

export default StatBar;