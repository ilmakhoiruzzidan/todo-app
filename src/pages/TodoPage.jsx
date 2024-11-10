import {Component} from 'react';
import Header from "./components/Header.jsx";
import Task from "./components/Task.jsx";
import Form from "./components/Form.jsx";
import getDate from "./utils/DateUtil.js";

class TodoPage extends Component {
    state = {
        todos: [],
        isFormValid: false,
        errors: {
            todo: '',
            description: '',
            isDone: false
        },
        selectedTodo: null,
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
                        description: description,
                        date: getDate(),
                    }
                ],
                selectedTodo: null,
            }
        })
    }

    handleDelete = (id) => {
        const filteredTodo = this.state.todos.filter(todo => todo.id !== id);
        if (!confirm("Are you sure you want to delete it?")) return;
        this.setState({
            todos: filteredTodo,
            selectedTodo: null,
        });
    }

    handleSelect = (id) => {
        const selectedTodo = this.state.todos.find(todo => todo.id === id);
        this.setState({selectedTodo});
    }

    handleUpdate = (id, newTodo, newDescription) => {
        this.setState((prevState) => {
            const updatedTodos = prevState.todos.map(todo =>
                todo.id === id ? {
                    ...todo,
                    todo: newTodo,
                    description: newDescription,
                } : todo);
            return {
                todos: updatedTodos,
                selectedTask: null,
            }
        });
    }

    handleReset = () => {
        this.setState({
            selectedTodo: {
                id: 0,
                todo: '',
                description: '',
            },
        })
    }

    render() {
        return <div className="font-sans bg-sky-950 min-h-screen">
            <Header/>
            <Form
                onSubmit={this.handleSubmit}
                onUpdate={this.handleUpdate}
                onReset={this.handleReset}
                selectedTodo={this.state.selectedTodo}
                form={this.state.form}
                errors={this.state.errors}
            />
            <div className="task-list">
                {this.state.todos.map((todo) => (
                    <Task
                        id={todo.id}
                        key={todo.id}
                        todo={todo.todo}
                        description={todo.description}
                        date={todo.date}
                        onDelete={() => this.handleDelete(todo.id)}
                        onSelect={() => this.handleSelect(todo.id)}
                    />
                ))}
            </div>
        </div>;
    }
}

export default TodoPage;