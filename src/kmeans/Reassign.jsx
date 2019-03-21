import React from 'react';

const Reassign = (props) => <div className="mb-3">

    <h3>Runde {props.round}a</h3>

    <p>
        Jeder Datenpunkt wird demjenigen Mean zugeordnet,
        der ihm am nächsten ist.
        Den zugeordneten Mean eines Datenpunkts erkennst du
        an dessen Farbe.
    </p>

    <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={props.onContinue}>
        Nächster Schritt
    </button>

</div>;

export default Reassign;