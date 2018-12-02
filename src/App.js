import React, {Component} from 'react';
import './App.css';
import SceneComponent from "./componentns/SceneComponent";


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <SceneComponent />
            </div>
        );
    }
}

export default App;
