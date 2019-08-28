import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './Components/Header';
import List from './Components/List';
import '../sass/index.sass'

class App extends Component {
    state = {
        authorized: false
    }

    render() {
        return (
            <div>
                <div className="container">
                  <Header/>
                  <List/>
                </div>
            </div>
        )
    }

    handleClick = () => {
        this.setState({
            authorized: !this.state.authorized
        })
    }
}

render(<App/>, document.getElementById('root'))