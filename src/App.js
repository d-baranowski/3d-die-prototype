import React, {Component} from 'react';
import './App.css';
import {AmbientLight, Mesh, MeshFaceMaterial, PerspectiveCamera, Scene, WebGLRenderer, SpotLight} from "three";
import {createDieMaterials} from "./teal/materials";
import {createDieGeometry} from "./teal/geometry";


class App extends Component {
    defaultLabelColor = '#ffffff';
    defaultDieColor = '#661017';

    componentDidMount() {
        this.camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        this.scene = new Scene();

        var ambientLight = new AmbientLight(0xf0f0f0);
        var spotLight = new SpotLight( 0xffffff );
        spotLight.position.set( 100, 1000, 100 );

        

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        this.scene.add(ambientLight);
        this.scene.add(spotLight);


        const dieGometry = createDieGeometry('d20',50);
        const dieMaterial = new MeshFaceMaterial(createDieMaterials('d20', this.defaultLabelColor, this.defaultDieColor));
        this.cube = new Mesh(dieGometry, dieMaterial);

        this.scene.add( this.cube );
        this.camera.position.z = 10;


        this.renderer = new WebGLRenderer( { antialias: true } );
        
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
        this.animate();
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.04;

        this.renderer.render(this.scene, this.camera);
    };

    render() {
        return (
            <div className="App">

            </div>
        );
    }
}

export default App;
