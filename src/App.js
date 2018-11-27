import React, {Component} from 'react';
import './App.css';
import SceneComponent from "./SceneComponent";
import D20 from "./dice/D20";


class App extends Component {
    constructor(props) {
        super(props);
        this.d20 = new D20();

        this.d20.position.x -= 5;
        this.d20.position.z -= 15;
    }

    render() {
        return (
            <div className="App">
                <SceneComponent
                    objects={[this.d20]}
                />
            </div>
        );
    }
}

export default App;
