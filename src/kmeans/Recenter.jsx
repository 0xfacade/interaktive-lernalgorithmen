import React from 'react';

const Reassign = (props) => <div className="mb-3">

    <h3>Runde {props.round}b</h3>

    <p>
        Die Koordinaten der Means werden auf die
        Mittelwerte der x bzw. y Werte der ihnen zugewiesenen
        Datenpunkte gesetzt.
    </p>

    <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={props.onContinue}>
        Nächster Schritt
    </button>

</div>;

export default Reassign;