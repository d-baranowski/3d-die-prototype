import THREE from "../libs/three.min";

const getDirection = (x1, y1, x2, y2) => {
    // might be negative:
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    // correct, positive angle:
    return (angle + 360) % 360;
};

class DieBox {
    constructor(container) {
        this.container = container;
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

        container.addEventListener('mouseup', (ev) => {
            const die = this.searchDieByMouse(ev);
            die && die.onClick()
        });

        this.renderer.render(this.scene, this.camera);
    };

    searchDieByMouse = (ev) => {
        const axis = new THREE.Vector3( 0, 0, -1 );
        const direction  =  new THREE.Vector3(0, 1, 0);

        const screenCenter = new THREE.Vector2(this.container.clientWidth/2, this.container.clientHeight/2);

        const degrees = getDirection(ev.clientX, ev.clientY, screenCenter.x, screenCenter.y) - 90;
        const angleDeg = degrees * Math.PI / 180;

        direction.applyAxisAngle(axis, angleDeg);
        const raycaster = new THREE.Raycaster(new THREE.Vector3(0,0,0), direction, 0, 200);

        /*
            SHOWS RAYCASTER
            this.scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000) );
        */

        const intersects = raycaster.intersectObjects(this.dice);

        if (intersects.length) {
            return intersects[0].object;
        }
    };

    drawSelector(dice) {
        for (let i = 0; i < dice.length; ++i) {
            this.dice.push(dice[i]);
            this.scene.add(dice[i]);
        }

        this.renderer.render(this.scene, this.camera);
    };

    render() {
        this.renderer.render(this.scene, this.camera);
    };
}


export default DieBox