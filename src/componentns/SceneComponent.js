import React, {Component} from 'react';
import {AmbientLight, PerspectiveCamera, Scene, SpotLight, WebGLRenderer} from "three";
import ReactDOM from 'react-dom';

class SceneComponent extends Component {
    static defaultProps = {
        width: window.innerWidth,
        height: window.innerHeight,
        objects: []
    };

    constructor(props) {
        super(props);

        this.camera = new PerspectiveCamera( 20, props.width / props.height, 0.01, 100 );
        this.camera.position.z = 10;
        this.scene = new Scene();

        this.ambientLight = new AmbientLight(0xf0f0f0);
        this.spotLight = new SpotLight( 0xffffff );

        this.spotLight.position.set( 100, 1000, 100 );
        this.spotLight.shadow.mapSize.width = 1024;
        this.spotLight.shadow.mapSize.height = 1024;

        this.scene.add(this.ambientLight);
        this.scene.add(this.spotLight);

        props.objects.forEach(obj => {
           this.scene.add(obj);
        });

        this.renderer = new WebGLRenderer( { antialias: true, alpha: true  } );
        this.renderer.setClearColor( 0xffffff, 0 );

        this.renderer.setSize( props.width, props.height );
    }

    componentDidMount() {
        this.domRef = ReactDOM.findDOMNode(this);
        this.domRef.appendChild( this.renderer.domElement );
        this.animate();
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        this.props.objects.forEach(obj => {
            obj.update();
        });

        this.renderer.render(this.scene, this.camera);
    };

    render() {
        return (
            <div></div>
        );
    }
}

SceneComponent.propTypes = {};

export default SceneComponent;