import {Face3, Geometry, Vector2, Vector3} from "three";

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
    return geom;
}

function createDieGeom(vertices, faces, radius, tab, af) {
    var geom = makeGeom(vertices, faces, radius, tab, af);
    return geom;
}

export function createD20Geometry(radius) {
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

