
var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    Timer = require("./ui/Timer"),
    mountNode = document.getElementById("app");


var TodoApp = React.createClass({

  getInitialState() {
    return {
      todos: ['Groceries', 'Cleaning']
    }
  },

  addTodo(todo) {
    this.setState({
      todos: this.state.todos.concat(todo)
    })
  },

  deleteTodo(todo) {
    let todos = this.state.todos;
    let index = todos.indexOf(todo);

    let updatedTodos = todos.filter( (item) => {
      return todo !== item;
    });

    this.setState({
      todos: updatedTodos
    })
  },

  render: function() {
    return (
      <div>
        <h3>todos</h3>

        <TodoList
          todos={this.state.todos}
          deleteTodo={this.deleteTodo}
        />

        <TodoCreate addTodo={this.addTodo} />
      </div>
    );
  }
});

let TodoCreate = React.createClass({
  getInitialState() {
    return {
      newTodo: ''
    }
  },

  handleChange(e) {
    this.setState({
      newTodo: e.target.value
    })
  },

  submitTodo(e) {
    e.preventDefault();
    this.props.addTodo(this.state.newTodo);
    this.setState({
      newTodo: ''
    })
  },

  render() {
    return (
      <div>
        <form onSubmit={this.submitTodo}>
          <input type='text' value={this.state.newTodo} onChange={this.handleChange} />
          <button>Submit Todo</button>
        </form>
      </div>
    )
  }
});

let TodoItem = React.createClass({
  deleteTodo() {
    this.props.deleteTodo(this.props.todo);
  },

  toggleCompleted() {
    this.props.toggleCompleted(this.props.todo);
  },

  render() {
    return (
      <li>
        {this.props.todo}
        <button onClick={this.deleteTodo}>Delete</button>
      </li>
    )
  }
});

let TodoList = React.createClass({
  generateKey(todo) {
    return todo + Math.random();
  },

  render() {
    let todos = [];

    this.props.todos.map( (todo) => {
      todos.push(<TodoItem todo={todo} deleteTodo={this.props.deleteTodo} key={this.generateKey(todo)} />)
    });

    return (
      <ol>
        {todos}
      </ol>
    )
  }
})


ReactDOM.render(<TodoApp />, mountNode);
