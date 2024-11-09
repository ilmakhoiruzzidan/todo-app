import {Component} from 'react';
import Header from "./components/Header.jsx";
import Task from "./components/Task.jsx";
import Form from "./components/Form.jsx";

class TodoPage extends Component {
    state = {
        todos: [],
        isFormValid: false,
        errors: {
            todo: '',
            description: '',
            isDone: false
        }
    }

    handleSubmit = (id, todo, description) => {
        const todos = this.state.todos;
        this.setState((prevState) => {
            return {
                todos: [
                    ...prevState.todos,
                    {
                        id: todos.length + 1,
                        todo: todo,
                        description: description
                    }
                ]
            }
        })

    }

    handleDelete = (id) => {
        const updatedTodos = this.state.todos.filter(todo => todo.id !== id);
        if (!confirm("Are you sure you want to delete it?")) return;
        this.setState({
            todos: updatedTodos,
        })
    }

    handleUpdate = (e) => {
        console.log(e.target)
    }

    render() {
        return <div className="font-sans bg-sky-950 min-h-screen">
            <Header/>
            <Form
                onSubmit={this.handleSubmit}
                form={this.state.form}
                errors={this.state.errors}
            />
            <div className="task-list">
                {this.state.todos.map((task) => (
                    <Task
                        id={task.id}
                        key={task.id}
                        todo={task.todo}
                        description={task.description}
                        onDelete={() => this.handleDelete(task.id)}
                        onUpdate={this.handleUpdate}
                    />
                ))}
            </div>
        </div>;
    }
}

export default TodoPage;