import React from "react";
import PropTypes from 'prop-types';

const NavigationButtons = ({ currentId, onPrev, onNext, isHidden }) => {
    const isPrevDisabled = currentId <= 1;
    const isNextDisabled = currentId >= 1025;

    if (isHidden) return null;

    return(
        <div id="navigation-buttons">
            <button id="prev-btn" className="nav-btn" onClick={onPrev} disabled={isPrevDisabled}>&lt; Anterior</button>
            <button id="next-btn" className="nav-btn" onClick={onNext} disabled={isNextDisabled}>Próximo &gt;</button>
        </div>
    );
};

NavigationButtons.propTypes = {
    currentId: PropTypes.number,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    isHidden: PropTypes.bool.isRequired,
};

export default NavigationButtons;