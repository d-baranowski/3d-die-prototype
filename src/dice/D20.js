import {Mesh} from "three";
import {createDieGeom, createDieGeometry} from "../teal/geometry";
import {_createDieMaterials, defaultDieColor, defaultLabelColor, scale} from "../teal/materials";

const d20Labels = [' ', '0', '1', '2', '3', '4', '5', '6', '7', '8',
    '9', '10', '11', '12', '13', '14', '15', '16', '17',
    '18', '19', '20'];

function createD20Geometry(radius) {
    const t = (1 + Math.sqrt(5)) / 2;
    const vertices = [[-1, t, 0], [1, t, 0 ], [-1, -t, 0], [1, -t, 0],
        [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
        [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
    const faces = [[0, 11, 5, 1], [0, 5, 1, 2], [0, 1, 7, 3], [0, 7, 10, 4], [0, 10, 11, 5],
        [1, 5, 9, 6], [5, 11, 4, 7], [11, 10, 2, 8], [10, 7, 6, 9], [7, 1, 8, 10],
        [3, 9, 4, 11], [3, 4, 2, 12], [3, 2, 6, 13], [3, 6, 8, 14], [3, 8, 9, 15],
        [4, 9, 5, 16], [2, 4, 11, 17], [6, 2, 10, 18], [8, 6, 7, 19], [9, 8, 1, 20]];
    return createDieGeom(vertices, faces, radius, -0.2, -Math.PI / 4 / 2);
}

export default class D20 extends Mesh{
    constructor() {
        const dieGometry = createD20Geometry(50);
        const dieMaterials =  _createDieMaterials(d20Labels,
            scale,
            defaultLabelColor,
            defaultDieColor);

        super(dieGometry, dieMaterials);
    }

    update = () =>  {
        this.rotation.x += 0.01;
        this.rotation.y += 0.04;
    }
}