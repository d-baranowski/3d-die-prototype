import {FlatShading, MeshPhongMaterial, Texture} from "three";

var d20Labels = [' ', '0', '1', '2', '3', '4', '5', '6', '7', '8',
    '9', '10', '11', '12', '13', '14', '15', '16', '17',
    '18', '19', '20'];
var d100Labels = [' ', '00', '10', '20', '30', '40', '50',
    '60', '70', '80', '90'];

export const scale = 50;
export const defaultLabelColor = '#ffffff';
export const defaultDieColor = '#661017';

var dieInfo = {
    d4: {mass: 300, inertia: 5, radiusFactor: 1.2, marginFactor: null},
    d6: {mass: 300, inertia: 13, radiusFactor: 0.9, marginFactor: 1,
        labels: d20Labels},
    d8: {mass: 340, inertia: 10, radiusFactor: 1, marginFactor: 1,
        labels: d20Labels},
    d10: {mass: 340, inertia: 10, radiusFactor: 0.9, marginFactor: 1,
        labels: d20Labels},
    d12: {mass: 340, inertia: 10, radiusFactor: 0.9, marginFactor: 1,
        labels: d20Labels},
    d20: {mass: 340, inertia: 10, radiusFactor: 1, marginFactor: 1,
        labels: d20Labels},
    d100: {mass: 340, inertia: 10, radiusFactor: 0.9, marginFactor: 1.5,
        labels: d100Labels}
};

var materialOptions = {
    specular: '#171d1f',
    color: '#ffffff',
    emissive: '#000000',
    shininess: 20,
    shading: FlatShading
};

const copy = function(obj) {
    if (!obj) {
        return obj;
    }
    return copyto(obj, new obj.constructor());
};

const copyto = function(obj, res) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Array) {
        for (var i = obj.length - 1; i >= 0; --i) {
            res[i] = copy(obj[i]);
        }
    }
    else {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                res[i] = copy(obj[i]);
            }
        }
    }
    return res;
};

export function createDieMaterials(type, labelColor, dieColor) {
    if (type === 'd4') {
        return createD4Materials(scale / 2, scale * 2,
            labelColor,
            dieColor);
    } else {
        return _createDieMaterials(dieInfo[type].labels,
            scale * dieInfo[type].marginFactor,
            labelColor,
            dieColor);
    }
}

export function _createDieMaterials(faceLabels, margin, labelColor, dieColor) {
    function createTextTexture(text, labelColor, dieColor) {
        if (text === undefined) {
            return null;
        }
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const size = scale / 2;
        canvas.width = size + margin;
        canvas.height = size + margin;
        context.font = size + "pt Arial";
        context.fillStyle = dieColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = labelColor;
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        if (text === '6' || text === '9') {
            context.fillText('  .', canvas.width / 2, canvas.height / 2);
        }
        const texture = new Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }
    const materials = [];
    for (let i = 0; i < faceLabels.length; ++i) {
        materials.push(
            new MeshPhongMaterial(
                copyto(materialOptions,
                    {map: createTextTexture(faceLabels[i],
                            labelColor,
                            dieColor)})
            )
        );
    }
    return materials;
}

function createD4Materials(size, margin, labelColor, dieColor) {
    function createD4Text(text, labelColor, dieColor) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.width = size + margin;
        canvas.height = size + margin;
        context.font = size + "pt Arial";
        context.fillStyle = dieColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = labelColor;
        context.translate(0, size / 10);
        for (var i in text) {
            context.fillText(text[i], canvas.width / 2,
                canvas.height / 2 - size - margin / 10);
            context.translate(canvas.width / 2, canvas.height / 2);
            context.rotate(Math.PI * 2 / 3);
            context.translate(-canvas.width / 2, -canvas.height / 2);
        }
        var texture = new Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }
    var materials = [];
    var labels = [[], [0, 0, 0], [2, 4, 3], [1, 3, 4], [2, 1, 4], [1, 2, 3]];
    for (var i = 0; i < labels.length; ++i) {
        materials.push(new MeshPhongMaterial(copyto(materialOptions,
            { map: createD4Text(labels[i], labelColor, dieColor) })));
    }
    return materials;
}
