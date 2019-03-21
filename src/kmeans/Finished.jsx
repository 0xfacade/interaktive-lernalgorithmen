import React from 'react';

const Finished = (props) => <div className="mb-3">

    <h3>Fertig!</h3>

    <p>
        Nach {props.rounds} haben sich die Means nicht mehr
        verändert.
    </p>

    <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={props.onRestart}>
        Neu beginnen
    </button>

</div>;

export default Finished;