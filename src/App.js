import React  from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TodoList} />
        <Route exact path="/add-todo" component={AddTodo} />
        <Route exact path="/edit-todo/:id" component={EditTodo} />
      </Switch>
    </Router>
  );
}

export default App;
