import React from 'react';
import '../../styles/styles.scss';

class JoinSession extends React.Component{
    constructor(props){
        super(props)
    }

    render = () =>{
        return(
            <form>
                <div class="flexRow">
                    <p>Session Code:</p>
                    <input type="text" />
                </div>
                <div>
                    <input type="button" value="Back" class="button--red button--small" />
                    <input type="submit" value="Enter" class="button--green button--small" />
                </div>
            </form>
        );
    }
}

export default JoinSession;