import THREE from "../libs/three.min";
import createDie from "./diceMeshCreator";

class DieBox {
    constructor(container) {
        this.cw = container.clientWidth / 2;
        this.ch = container.clientHeight / 2;

        this.w = this.cw;
        this.h = this.ch;

        this.aspect = Math.min(this.cw / this.w, this.ch / this.h);
        this._scale = Math.sqrt(this.w * this.w + this.h * this.h) / 13;

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(this.cw * 2, this.ch * 2);

        this.renderer.setClearColor(0xffffff, 0);

        this.dice = [];
        this.scene = new THREE.Scene();

        container.appendChild(this.renderer.domElement);

        const wh = Math.min(this.cw, this.ch) / this.aspect / Math.tan(10 * Math.PI / 180);
        this.camera = new THREE.PerspectiveCamera(20, this.cw / this.ch, 1, wh * 1.3);
        this.camera.position.z = wh;

        const ambientLight = new THREE.AmbientLight(0xf0f0f0);
        this.scene.add(ambientLight);
        const mw = Math.max(this.w, this.h);
        const light = new THREE.SpotLight(0xf0f0f0);
        light.position.set(-mw * 2, mw / 2, mw * 2);
        light.target.position.set(0, 0, 0);

        this.scene.add(light);

        this.renderer.render(this.scene, this.camera);
    };

    searchDieByMouse = (ev) => {
        const intersects = (new THREE.Raycaster(this.camera.position,
            (new THREE.Vector3((ev.clientX - this.cw) / this.aspect,
                (ev.clientY - this.ch) / this.aspect, this.w / 9))
                .sub(this.camera.position).normalize())).intersectObjects(this.dice);
        if (intersects.length) {
            return intersects[0].object.userData;
        }
    };

    drawSelector() {
        const step = this.w / 4.5;
        const knownDieTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];

        for (let i = 0, pos = -3; i < knownDieTypes.length; ++i, ++pos) {
            const die = createDie(knownDieTypes[i], this._scale);
            die.position.set(pos * step, 0, step * 0.5);

            this.dice.push(die);
            this.scene.add(die);
        }

        this.renderer.render(this.scene, this.camera);
    };
}


function diceInitialize(container, w, h) {
    const canvas = document.getElementById('canvas');
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    const box = new DieBox(canvas);

    container.addEventListener('mouseup', (ev) => {
        const dieProps = box.searchDieByMouse(ev);
        console.log(dieProps);
    });

    box.drawSelector();
}


diceInitialize(document.body, window.innerWidth - 1, window.innerHeight - 1);