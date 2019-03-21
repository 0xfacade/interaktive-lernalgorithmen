
export function sampleCluster(N, centerX, centerY, width, height) {
    const x = new Array(N);
    const y = new Array(N);

    for (let i = 0; i < N; i++) {
        x[i] = centerX - width / 2 + Math.random() * width;
        y[i] = centerY - height / 2 + Math.random() * height;
    }

    return {
        x, y
    }
}

export function sampleClusters(clusters) {
    let x = [], y = [];
    for (let i = 0; i < clusters.length; i++) {
        const clusterData = clusters[i];
        const points = sampleCluster(
            clusterData.numPoints,
            clusterData.center[0],
            clusterData.center[1],
            clusterData.width,
            clusterData.height
        );
        x = x.concat(points.x);
        y = y.concat(points.y);
    }

    return {
        x, y
    }
}

function squaredDistance(x1, y1, x2, y2) {
    return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

function minIndex(arr) {
    let bestJ = 0;
    for (let j = 1; j < arr.length; j++) {
        if (arr[j] < arr[bestJ]) {
            bestJ = j;
        }
    }
    return bestJ;
}

export function findClosestMeans(points, means) {
    const {x, y} = points;
    const closestMeans = new Array(x.length);
    for(let i = 0; i < x.length; i++) {
        const distances = means.map((m) => squaredDistance(x[i], y[i], m[0], m[1]));
        closestMeans[i] = minIndex(distances);
    }

    return closestMeans;
}

export function findNewMeans(points, assignments, numMeans) {
    const {x, y} = points;
    const newMeans = new Array(numMeans);
    for (let j = 0; j < numMeans; j++) {
        let sumX = 0, sumY = 0, numAssigned = 0;
        for (let i = 0; i < x.length; i++) {
            if (assignments[i] !== j) {
                continue;
            }
            numAssigned++;
            sumX += x[i];
            sumY += y[i];
        }
        newMeans[j] = [
            sumX / numAssigned,
            sumY / numAssigned
        ];
    }

    return newMeans;
}

export function meansAreSame(meansA, meansB) {
    for (let j = 0; j < meansA.length; j++) {
        const d = Math.sqrt(squaredDistance(
            meansA[j][0],
            meansA[j][1],
            meansB[j][0],
            meansB[j][1]
        ));
        if (d > 0.01) {
            return false;
        }
    }
    return true;
}