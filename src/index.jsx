import ReactDom from 'react-dom';
import React from 'react';

import KMeans from './kmeans/KMeans'

const root = document.getElementById("react-root");
ReactDom.render(<KMeans />, root);