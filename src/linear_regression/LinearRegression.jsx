import React from 'react';
import Slider from 'rc-slider';

export default class LinearRegression extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="d-flex">
                <div className="flex-grow-1">
                    Here the drawing
                </div>
                <div style={{
                    width: 300
                }}>

                    <Slider min="0" max="5" step="0.1" />
                </div>
            </div>
        );
    }
}