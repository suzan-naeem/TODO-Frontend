import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import swal from 'sweetalert';

class TodoList extends Component{

    state = {
        todos: [],
        loading: true,
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:8000/api/todos');
        //console.log(res);
        if(res.data.status === 200){
            
            this.setState({
                todos: res.data.todos,
                loading: false,
            });
        }
    }

    deleteTodo = async(e ,id)=>{

        const clicked = e.currentTarget;
        clicked.innerText = "Deleting";
        const res = await axios.delete(`http://localhost:8000/api/delete-todo/${id}`);
        if(res.data.status === 200){
          
          clicked.closest("tr").remove();
        //   console.log(res.data.message)

        swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: "Ok",
          });
        }


    }


    render(){

        var todo_HTMLTABLE = "";
        if(this.state.loading){
            todo_HTMLTABLE = <tr><td><h2>Loading...</h2></td></tr>
        }else{
            todo_HTMLTABLE =
            this.state.todos.map( (item) => {
                return (
                    <tr key={item.id}>
                        <td>
                        {item.task} 
                        <Link to={`edit-todo/${item.id}`} className="btn btn-success btn-sm float-right">Edit</Link>
                        <button type="button" onClick={(e)=>this.deleteTodo(e, item.id)} className="btn btn-danger btn-sm float-right mx-3">Delete</button>
                        </td>
                      
                    </tr>

                );
            });
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4> Todo List
                                <Link to={'add-todo'} className="btn btn-primary btn-sm float-right"> Add task </Link>
                                </h4>
                                
                            </div>
                            <div className="card-body" >
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Task</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todo_HTMLTABLE}
                                    </tbody>    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoList;