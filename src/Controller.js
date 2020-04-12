import React from 'react';
import Home from './components/03_Organisms/Home';

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
                <div><p>test</p></div>
            )
        }
    }

}

export default Controller