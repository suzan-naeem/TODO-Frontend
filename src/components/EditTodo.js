import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class EditTodo extends Component{

    state = {
        task: '',
        
    }

    async componentDidMount() {
      const todo_id = this.props.match.params.id;
      //console.log(todo_id);
      const res = await axios.get(`http://localhost:8000/api/edit-todo/${todo_id}`);
      if(res.data.status === 200){

      
            
        this.setState({
            task: res.data.todo.task,
            
        });

        


      }
    }

    handleInput = (e) => {
        this.setState({
            task: e.target.value
        });
    }
    
    updateTask = async(e) =>{
        e.preventDefault();
        
        const updatebtn = document.getElementById('updatebtn');
        // const msg = document.getElementById('msg');
        updatebtn.disabled = true;
        updatebtn.innerText = "Updating";
        const todo_id = this.props.match.params.id;
        const res = await axios.put(`http://localhost:8000/api/update-todo/${todo_id}`, this.state);
        if(res.data.status === 200){
            // console.log(res.data.message);
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Ok",
              });
            updatebtn.disabled = false;
            updatebtn.innerText = "Update";
   
        }
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4> Edit Task
                                <Link to={'/'} className="btn btn-primary btn-sm float-right"> Back </Link>
                                </h4>
                                
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateTask}>
                                    <div className="form-group mb-3" >
                                        <label>Task Description</label>                                       
                                        <input type="text" name="task" onChange={this.handleInput} value={this.state.task} className="form-control" />                                        
                                    </div>                                                    
                                    <div className="form-group mb-3" >
                                        <button type="submit" id="updatebtn" className="btn btn-primary" >Update</button>
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

export default EditTodo;