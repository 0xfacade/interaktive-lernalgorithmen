import React from 'react';
import Plot from 'react-plotly.js';

import nj from 'numjs';
window.nj = nj;

import {
    sampleClusters,
    findClosestMeans,
    findNewMeans,
    meansAreSame
} from './KMeansLogic';

import ChooseK from './ChooseK';
import Reassign from './Reassign';
import Recenter from './Recenter';
import Finished from './Finished';

const X_LIM = [-1, 10];
const Y_LIM = [-1, 10];

const CLUSTERS = [
    {
        center: [2, 2],
        width: 1.5,
        height: 0.7,
        numPoints: 25,
    },
    {
        center: [8, 4],
        width: 0.7,
        height: 1,
        numPoints: 22,
    },
    {
        center: [2, 8],
        width: 1.5,
        height: 0.4,
        numPoints: 18,
    }
];

const MEAN_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'yellow',
    'violet',
    'indigo',
];

const PHASE_CHOOSE_K = 0;
const PHASE_ASSIGN = 1;
const PHASE_RECENTER = 2;
const PHASE_FINISHED = 3;

export default class KMeans extends React.Component {

    constructor(props) {
        super(props);

        this.points = sampleClusters(CLUSTERS);
        const initialAssignments = new Array(this.points.x.length);
        for(let i = 0; i < this.points.x.length; i++) {
            initialAssignments[i] = -1;
        }

        this.state = this.getInitialState();
    }

    getInitialState() {
        const initialAssignments = new Array(this.points.x.length);
        for(let i = 0; i < this.points.x.length; i++) {
            initialAssignments[i] = -1;
        }

        return {
            k: 3,
            means: [
                [1, 1],
                [9, 9],
                [1, 5]
            ],
            assignments: initialAssignments,
            phase: PHASE_CHOOSE_K,
            round: 0,
        }
    }

    getClustersPlotData() {
        return {
            ...this.points,
            type: 'scatter',
            mode: 'markers',
            marker: {
                color: this.state.assignments.map((a) => {
                    if (a === -1) {
                        return 'blue';
                    } else {
                        return MEAN_COLORS[a];
                    }
                })
            }
        }
    }

    getMeansPlotData() {
        return {
            x: this.state.means.map((m) => m[0]),
            y: this.state.means.map((m) => m[1]),
            type: 'scatter',
            mode: 'markers',
            marker: {
                color: MEAN_COLORS.slice(0, this.state.k),
                size: 20
            }
        }
    }

    onKChange(newK) {
        if (newK < this.state.k) {
            const newMeans = this.state.means.slice(0, newK);
            this.setState({
                k: newK,
                means: newMeans
            })
        } else {
            const newMeans = this.state.means.concat();
            while (newMeans.length < newK) {
                const meanX = Math.random() * 10;
                const meanY = Math.random() * 10;
                newMeans.push([meanX, meanY]);
            }
            this.setState({
                k: newK,
                means: newMeans
            })
        }

    }

    reassign() {
        const newAssignments = findClosestMeans(this.points, this.state.means);
        const newRound = this.state.round + 1;
        this.setState({
            phase: PHASE_ASSIGN,
            round: newRound,
            assignments: newAssignments
        });
    }

    recenter() {
        const newMeans = findNewMeans(this.points, this.state.assignments, this.state.means.length);

        if (meansAreSame(newMeans, this.state.means)) {
            this.setState({
                phase: PHASE_FINISHED,
            })
        } else {
            this.setState({
                phase: PHASE_RECENTER,
                means: newMeans,
            })
        }
    }

    restart() {
        this.setState({
            ...this.getInitialState()
        })
    }

    renderMenu(){
        if(this.state.phase === PHASE_CHOOSE_K) {
            return <ChooseK
                k={this.state.k}
                onChange={this.onKChange.bind(this)}
                onStart={() => this.reassign()}
            />
        } else if (this.state.phase === PHASE_ASSIGN) {
            return <Reassign
                round={this.state.round}
                onContinue={() => this.recenter()} />
        } else if (this.state.phase === PHASE_RECENTER) {
            return <Recenter
                round={this.state.round}
                onContinue={() => this.reassign()} />
        } else {
            return <Finished
                round={this.state.round}
                onRestart={() => this.restart()} />
        }
    }

    render() {

        return (
            <div className="d-flex">
                <div className="flex-grow-1">
                    <Plot

                        data={[
                            this.getClustersPlotData(),
                            this.getMeansPlotData()
                        ]}

                        layout={{
                            title: null,
                            autosize: true,
                            showlegend: false,
                            xaxis: {
                                range: X_LIM,
                                constrain: 'domain',
                            },
                            yaxis: {
                                range: Y_LIM,
                                scaleanchor: 'x',
                            },
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

                    {this.renderMenu()}

                </div>
            </div>
        );
    }
}