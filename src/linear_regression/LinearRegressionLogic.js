
export function samplePoints(N, x_lim, a, b, x_noise, y_noise) {
    const x = new Array(N);
    const interX = (x_lim[1] - x_lim[0]) / (N+2);
    for (let i = 0; i < N; i++) {
        x[i] = (i+1) * interX + (-x_noise + Math.random() * 2 * x_noise) ;
    }

    const y = x.map((v) => a * v + b + (-y_noise + 2 * y_noise * Math.random()));

    return {
        x, y
    }
}

function computeClosestPointOnLine(x, y, a, b) {
    const x_line = (a * (y-b) + x) / (a*a + 1);
    const y_line = a * x_line + b;

    return {
        x: x_line,
        y: y_line
    };
}

export function computeClosestPointsOnLine(points, a, b) {
    const numPoints = points.x.length;
    const closestX = new Array(numPoints);
    const closestY = new Array(numPoints);
    for (let i = 0; i < numPoints; i++) {
        const {x, y} = computeClosestPointOnLine(
            points.x[i],
            points.y[i],
            a, b);
        closestX[i] = x;
        closestY[i] = y;
    }

    return {
        x: closestX,
        y: closestY
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export function getSumOfDistances(pointsA, pointsB) {
    const numPoints = pointsA.x.length;
    let sum = 0;
    for (let i = 0; i < numPoints; i++) {
        sum += distance(
            pointsA.x[i],
            pointsA.y[i],
            pointsB.x[i],
            pointsB.y[i]
        );
    }
    return sum;
}