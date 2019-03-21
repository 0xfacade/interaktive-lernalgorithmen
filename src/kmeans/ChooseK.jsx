import React from 'react';

import Slider from 'rc-slider';
import 'rc-slider/dist/rc-slider.css'

const ChooseK = (props) => <div className="mb-3">
    <p>Bevor der Algorithmus startet, kannst du
        den Wert k wählen, der die Anzahl der Means bestimmt,
        mit denen k-Means rechnet.
        Die Means werden zufällig verteilt. Du erkennst sie als die großen farbigen Punkte in der Grafik.</p>

    <div className="my-3">
        <p>Anzahl der Cluster: {props.k}</p>
        <Slider
            min={1}
            max={7}
            step={1}
            value={props.k}
            onChange={props.onChange}/>
    </div>

    <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={props.onStart}>Start
    </button>
</div>;

export default ChooseK;