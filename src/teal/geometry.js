import {Face3, Geometry, Sphere, Vector2, Vector3} from "three";

export function createDieGeometry(type, radius) {
    var geometryCreators = {
        d4: createD4Geometry,
        d6: createD6Geometry,
        d8: createD8Geometry,
        d10: createD10Geometry,
        d12: createD12Geometry,
        d20: createD20Geometry,
        d100: createD10Geometry
    };

    return geometryCreators[type](radius);
}

function makeGeom(vertices, faces, radius, tab, af) {
    var geom = new Geometry();
    for (var i = 0; i < vertices.length; ++i) {
        var vertex = (new Vector3()).fromArray(vertices[i]).normalize().multiplyScalar(radius);
        vertex.index = geom.vertices.push(vertex) - 1;
    }
    for (var i = 0; i < faces.length; ++i) {
        var ii = faces[i], fl = ii.length - 1;
        var aa = Math.PI * 2 / fl;
        for (var j = 0; j < fl - 2; ++j) {
            geom.faces.push(new Face3(ii[0], ii[j + 1], ii[j + 2], [geom.vertices[ii[0]],
                geom.vertices[ii[j + 1]], geom.vertices[ii[j + 2]]], 0, ii[fl] + 1));
            geom.faceVertexUvs[0].push([
                new Vector2((Math.cos(af) + 1 + tab) / 2 / (1 + tab),
                    (Math.sin(af) + 1 + tab) / 2 / (1 + tab)),
                new Vector2((Math.cos(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab),
                    (Math.sin(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab)),
                new Vector2((Math.cos(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab),
                    (Math.sin(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab))]);
        }
    }
    geom.computeFaceNormals();
    geom.computeVertexNormals();
    geom.boundingSphere = new Sphere(new Vector3(), radius);
    return geom;
}

export function createDieGeom(vertices, faces, radius, tab, af) {
    return makeGeom(vertices, faces, radius, tab, af);
}

function createD4Geometry(radius) {
    var vertices = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]];
    var faces = [[1, 0, 2, 1], [0, 1, 3, 2], [0, 3, 2, 3], [1, 2, 3, 4]];
    return createDieGeom(vertices, faces, radius, -0.1, Math.PI * 7 / 6);
}

function createD6Geometry(radius) {
    var vertices = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    var faces = [[0, 3, 2, 1, 1], [1, 2, 6, 5, 2], [0, 1, 5, 4, 3],
        [3, 7, 6, 2, 4], [0, 4, 7, 3, 5], [4, 5, 6, 7, 6]];
    return createDieGeom(vertices, faces, radius, 0.1, Math.PI / 4);
}

function createD8Geometry(radius) {
    var vertices = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    var faces = [[0, 2, 4, 1], [0, 4, 3, 2], [0, 3, 5, 3], [0, 5, 2, 4], [1, 3, 4, 5],
        [1, 4, 2, 6], [1, 2, 5, 7], [1, 5, 3, 8]];
    return createDieGeom(vertices, faces, radius, 0, -Math.PI / 4 / 2);
}

function createD10Geometry(radius) {
    var a = Math.PI * 2 / 10,
        h = 0.105,
        v = -1;
    var vertices = [];
    for (var i = 0, b = 0; i < 10; ++i, b += a) {
        vertices.push([Math.cos(b), Math.sin(b), h * (i % 2 ? 1 : -1)]);
    }
    vertices.push([0, 0, -1]); vertices.push([0, 0, 1]);
    var faces = [[5, 7, 11, 0], [4, 2, 10, 1], [1, 3, 11, 2], [0, 8, 10, 3], [7, 9, 11, 4],
        [8, 6, 10, 5], [9, 1, 11, 6], [2, 0, 10, 7], [3, 5, 11, 8], [6, 4, 10, 9],
        [1, 0, 2, v], [1, 2, 3, v], [3, 2, 4, v], [3, 4, 5, v], [5, 4, 6, v],
        [5, 6, 7, v], [7, 6, 8, v], [7, 8, 9, v], [9, 8, 0, v], [9, 0, 1, v]];
    return createDieGeom(vertices, faces, radius, 0, Math.PI * 6 / 5);
}

function createD12Geometry(radius) {
    var p = (1 + Math.sqrt(5)) / 2, q = 1 / p;
    var vertices = [[0, q, p], [0, q, -p], [0, -q, p], [0, -q, -p], [p, 0, q],
        [p, 0, -q], [-p, 0, q], [-p, 0, -q], [q, p, 0], [q, -p, 0], [-q, p, 0],
        [-q, -p, 0], [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1],
        [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]];
    var faces = [[2, 14, 4, 12, 0, 1], [15, 9, 11, 19, 3, 2], [16, 10, 17, 7, 6, 3], [6, 7, 19, 11, 18, 4],
        [6, 18, 2, 0, 16, 5], [18, 11, 9, 14, 2, 6], [1, 17, 10, 8, 13, 7], [1, 13, 5, 15, 3, 8],
        [13, 8, 12, 4, 5, 9], [5, 4, 14, 9, 15, 10], [0, 12, 8, 10, 16, 11], [3, 19, 7, 17, 1, 12]];
    return createDieGeom(vertices, faces, radius, 0.2, -Math.PI / 4 / 2);
}

function createD20Geometry(radius) {
    var t = (1 + Math.sqrt(5)) / 2;
    var vertices = [[-1, t, 0], [1, t, 0 ], [-1, -t, 0], [1, -t, 0],
        [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
        [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
    var faces = [[0, 11, 5, 1], [0, 5, 1, 2], [0, 1, 7, 3], [0, 7, 10, 4], [0, 10, 11, 5],
        [1, 5, 9, 6], [5, 11, 4, 7], [11, 10, 2, 8], [10, 7, 6, 9], [7, 1, 8, 10],
        [3, 9, 4, 11], [3, 4, 2, 12], [3, 2, 6, 13], [3, 6, 8, 14], [3, 8, 9, 15],
        [4, 9, 5, 16], [2, 4, 11, 17], [6, 2, 10, 18], [8, 6, 7, 19], [9, 8, 1, 20]];
    return createDieGeom(vertices, faces, radius, -0.2, -Math.PI / 4 / 2);
}