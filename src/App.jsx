import React from "react";
import PokedexContainer from "./Containers/PokedexContainer";
import './Style.css'; // Importação global do CSS

const App = () => {
    // O Container gerencia toda a lógica e estado da aplicação
    return (
        <div className="App">
            <PokedexContainer />
        </div>
    );
};

export default App;