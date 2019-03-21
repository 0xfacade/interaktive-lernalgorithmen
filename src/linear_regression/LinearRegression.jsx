import React from 'react';

import Slider from 'rc-slider';
import 'rc-slider/dist/rc-slider.css'

import Plot from 'react-plotly.js';

import nj from 'numjs';
window.nj = nj;

import {
    samplePoints,
    computeClosestPointsOnLine,
    getSumOfDistances
} from './LinearRegressionLogic';

const X_LIM = [-1, 10];
const Y_LIM = [-1, 10];

export default class LinearRegression extends React.Component {

    constructor(props) {
        super(props);

        this.points = samplePoints(20, [0, 10], 0.6, 3.2, 0.25, 1.5);

        this.state = {
            a: 1,
            b: 1,
        }
    }

    getSampledPointsPlotData() {
        return {
        ...this.points,
            type: 'scatter',
            mode: 'markers',
        }
    }

    getUserDefinedLinePlotData() {
        const {a, b} = this.state;
        return {
            x: X_LIM,
            y: X_LIM.map((x) => a*x + b),
            type: 'scatter',
            mode: 'lines',
        };
    }

    getClosestPointsData(closestPoints) {
        const numPoints = this.points.x.length;
        const lines = new Array(numPoints);
        for (let i = 0; i < numPoints; i++) {
            lines[i] = {
                x: [this.points.x[i], closestPoints.x[i]],
                y: [this.points.y[i], closestPoints.y[i]],
                type: 'scatter',
                mode: 'lines',
                lines: {
                    color: 'rgba(0, 0, 0, 0.5)'
                }
            };
        }
        return lines;
    }

    render() {
        const closestPoints = computeClosestPointsOnLine(this.points, this.state.a, this.state.b);
        const errorSum = getSumOfDistances(closestPoints, this.points);

        return (
            <div className="d-flex">
                <div className="flex-grow-1">
                    <Plot

                        data={[
                            this.getUserDefinedLinePlotData(),
                            this.getSampledPointsPlotData(),
                        ].concat(this.getClosestPointsData(closestPoints))}

                        layout={{
                            autosize: true,
                            showlegend: false,
                            xaxis: {
                                range: X_LIM,
                                constrain: 'domain',
                            },
                            yaxis: {
                                range: Y_LIM,
                                scaleanchor: 'x',
                            }
                        }}

                        useResizeHandler={true}

                        style={{
                            width: "100%",
                            height: "600px",
                        }}

                        config={{
                            staticPlot: true,
                            displayModeBar: false,
                        }} />

                </div>
                <div className="p-3" style={{
                    width: 300
                }}>
                    <div className="mb-3">
                        <p>Steigung: {this.state.a}</p>
                        <Slider
                            min={-5}
                            max={5}
                            step={0.1}
                            value={this.state.a}
                            onChange={(v) => this.setState({
                                a: v
                            })} />
                    </div>

                    <div className="mb-3">
                        <p>Verschiebung: {this.state.b}</p>
                        <Slider
                            min={-5}
                            max={5}
                            step={0.1}
                            value={this.state.b}
                            onChange={(v) => this.setState({
                                b: v
                            })} />
                    </div>

                    <p>Gesamtfehler: {Math.round(errorSum * 1000) / 1000}</p>

                </div>
            </div>
        );
    }
}