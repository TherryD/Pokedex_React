import React from "react";
import PropTypes from 'prop-types';

// Focado na UI e nos handlers e navegação
const NavigationButtons = ({ currentId, onPrev, onNext, isHidden }) => {
    // Lógica simples de destivação dos botões para o limite da Pokédex
    const isPrevDisabled = currentId <= 1;
    const isNextDisabled = currentId >= 1025;
    //  Se for true, não renderiza nada
    if (isHidden) return null;

    return(
        <div id="navigation-buttons">
            <button id="prev-btn" className="nav-btn" onClick={onPrev} disabled={isPrevDisabled}>&lt; Anterior</button>
            <button id="next-btn" className="nav-btn" onClick={onNext} disabled={isNextDisabled}>Próximo &gt;</button>
        </div>
    );
};

// Validação de Props
NavigationButtons.propTypes = {
    currentId: PropTypes.number,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    isHidden: PropTypes.bool.isRequired,
};

export default NavigationButtons;