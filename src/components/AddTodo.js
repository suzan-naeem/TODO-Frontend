import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class AddTodo extends Component{

    state = {
        task: '',
        
    }

    handleInput = (e) => {
        this.setState({
            task: e.target.value
        });
    }
    
    saveTask = async(e) =>{
        e.preventDefault();
        const res = await axios.post('http://localhost:8000/api/add-todo', this.state);
        if(res.data.status === 200){
            //console.log(res.data.message);

            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok",
              });

            this.setState({
                task: '',
            });    
        }
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4> Add Task
                                <Link to={'/'} className="btn btn-primary btn-sm float-right"> Back </Link>
                                </h4>
                                
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveTask}>
                                    <div className="form-group mb-3" >
                                        <label>Task Description</label>                                       
                                        <input type="text" name="task" onChange={this.handleInput} value={this.state.task} className="form-control" />                                        
                                    </div>                                                    
                                    <div className="form-group mb-3" >
                                        <button type="submit" className="btn btn-primary" >Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddTodo;