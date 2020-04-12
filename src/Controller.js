import React from 'react';
import Home from './components/03_Organisms/Home';
import JoinSession from './components/03_Organisms/JoinSession';

class Controller extends React.Component{
    constructor(props){
        super(props);
        this.changeScreen = this.changeScreen.bind(this);
        this.state = {
            page: 'home'
        }
    }

    // function that changes the state of page
    changeScreen = (screen) => {
        this.setState({page: screen})
    }

    render = () => {
        if (this.state.page == 'home'){
            return (
                <Home changeScreen={this.changeScreen}/>
            )
        }
        if (this.state.page == 'joinSession'){
            return(
                <JoinSession changeScreen={this.changeScreen}/>
            )
        }
    }

}

export default Controller