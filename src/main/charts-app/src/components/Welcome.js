import React, {Component} from "react";

export default class Welcome extends Component{

    render(){
        return(
            <div className='bg-dark text-white text-sm-center container-fluid p-5'> 
              <h1 class="display-2">Welcome to Charts.io</h1>
              <p class="lead">Create your own charts, taking controll of your own money!</p>
            </div>
        );
    }

}


