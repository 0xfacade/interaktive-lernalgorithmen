import React from 'react';
import Select from 'react-select';

import LinearRegression from './linear_regression/LinearRegression';
import KMeans from './kmeans/KMeans';

const ALGOS = {
    "Lineare Regression": <LinearRegression/>,
    "kMeans": <KMeans/>,
};

export default class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            choice: this.getOptions()[0]
        }
    }

    getOptions() {
        return Object.keys(ALGOS).map((name) => {
            return {
                value: name,
                label: name
            }
        });
    }

    handleChange(choice) {
        this.setState({
            choice
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Demo der interaktiven Algorithmen</h1>
                <div className="mb-3">
                    <p>Algorithmus:</p>
                    <Select
                        value={this.state.choice}
                        options={this.getOptions()}
                        onChange={this.handleChange.bind(this)}/>
                </div>

                {ALGOS[this.state.choice.value]}
            </div>
        )
    }
}
