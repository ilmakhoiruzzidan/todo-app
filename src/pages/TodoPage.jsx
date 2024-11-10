import {Component} from 'react';
import Header from "./components/Header.jsx";
import Task from "./components/Task.jsx";
import Form from "./components/Form.jsx";
import getDate from "./utils/DateUtil.js";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {confirmAlert} from 'react-confirm-alert';
import {toast} from "react-hot-toast";

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
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="bg-sky-950 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto text-center">
                        <h1 className="text-lg font-bold text-gray-100">Confirm to delete task</h1>
                        <p className="my-4 text-gray-200">Are you sure you want to delete this task?</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => {
                                    toast.success('Task Deleted');
                                    this.setState({
                                        todos: filteredTodo,
                                        selectedTodo: null,
                                    });
                                    onClose();
                                }}
                                className="px-4 py-2 bg-sky-900 text-gray-100 rounded-xl hover:bg-sky-800"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => {
                                    toast.error('Canceled');
                                    onClose();
                                }}
                                className="px-4 py-2 bg-red-500 text-gray-100 rounded-xl hover:bg-red-600"
                            >
                                No
                            </button>
                        </div>
                    </div>
                );
            }
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