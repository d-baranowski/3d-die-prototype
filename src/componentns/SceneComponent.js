import React, {Component} from 'react';
import DieBox from "../dice/DiceBox";
import createDie from "../dice/diceMeshCreator";

const mapOver = (value, istart, istop, ostart, ostop) => {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

class SceneComponent extends Component {
    static defaultProps = {
        width: window.innerWidth,
        height: window.innerHeight,
        dice: ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100']
    };

    componentDidMount() {
        this.box = new DieBox(this.canvas);
        this.diceReferences = {};


        const knownDieTypes = this.props.dice;
        const r = 200;

        for (let i = 0, pos = -3; i < knownDieTypes.length; ++i, ++pos) {
            const die = createDie(knownDieTypes[i], this.box._scale);
            die.addCallback((obj) => {
                console.log("HEllo from " + obj)
            });

            const angle = mapOver(i, 0, knownDieTypes.length, 0, 2 * Math.PI);
            const x = r*Math.cos(angle) + 5;
            const y = r*Math.sin(angle) + 5;

            die.position.set(x, y, 0);
            this.diceReferences[knownDieTypes[i]] = die;
        }

        this.box.drawSelector(Object.values(this.diceReferences));

        this.animate();
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        Object.values(this.diceReferences).forEach(obj => {
            obj.update();
        });

        this.box.render();
    };

    setCanvasRef = (ref) => {
        this.canvas = ref;
    };

    render() {
        return (
            <div
                ref={this.setCanvasRef}
                style={{height: this.props.height, width: this.props.width}}
            />
        );
    }
}

SceneComponent.propTypes = {};

export default SceneComponent;