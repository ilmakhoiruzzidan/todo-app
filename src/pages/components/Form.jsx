import {Component} from 'react';
import {PlusIcon, XMarkIcon} from "@heroicons/react/24/solid/index.js";
import PropTypes from "prop-types";
import {toast} from "react-hot-toast";

class Form extends Component {
    state = {
        data: {
            id: 0,
            todo: '',
            description: '',
        },
        errors: {
            todo: null,
            description: null,
        },
        isFormValid: false,
    };

    handleChange = (e) => {
        const {name, value} = e.target;

        let errorMessage = '';

        if (name === 'todo' && name === 'description' && value.trim() === '') {
            errorMessage = 'This field cannot be empty!';
        }

        this.setState((prevState) => {
            const updatedErrors = {
                ...prevState.errors,
                [name]: errorMessage,
            };

            const updatedFormValid = Object.values(updatedErrors).every(error => error === '');

            return {
                data: {
                    ...prevState.data,
                    [name]: value,
                },
                errors: updatedErrors,
                isFormValid: updatedFormValid,
            };
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedTodo !== this.props.selectedTodo) {
            this.setState({
                data: this.props.selectedTodo || {id: 0, todo: '', description: ''},
            });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selectedTodo && nextProps.selectedTodo.id !== prevState.data.id) {
            return {
                data: nextProps.selectedTodo
            };
        }
        return null;
    }

    handleAddTodo = (e) => {
        e.preventDefault();
        const {id, todo, description} = this.state.data;

        if (id && this.props.onUpdate) {
            this.props.onUpdate(id, todo, description);
            toast.success("Successfully Update Task");

        } else {
            this.props.onSubmit(id, todo, description);
            toast.success("Successfully Add New Task");
        }

        // buat resetnya
        this.setState({
            data: {
                todo: '',
                description: '',
            },
            isFormValid: false,
        })
    }

    render() {
        const {
            data: {
                todo,
                description,
            },
            errors,
            isFormValid
        } = this.state;
        return (
            <div className="flex items-center py-4 justify-center bg-sky-950 w-full">
                <form onSubmit={this.handleAddTodo} className="p-4 bg-sky-900 shadow-lg rounded-xl w-96">
                    <div className="flex flex-col text-gray-100 gap-2">
                        <label htmlFor="todo" className="flex flex-col gap-2">
                            <span className="font-bold text-base">Title Task</span>
                            <input
                                className={`p-2 font-light text-sm rounded-md bg-gray-800 transition outline-none ${errors.todo ? `ring-1 ring-red-500` : `focus:ring-1 focus:ring-gray-100`}`}
                                type="text"
                                name="todo"
                                id="todo"
                                value={todo}
                                onChange={this.handleChange}
                                placeholder="Add Task Name..."
                            />
                            {errors.todo && <span className="h-3 font-bold text-red-500 text-xs">{errors.todo}</span>}
                        </label>

                        <label htmlFor="description" className="flex flex-col gap-2">
                            <span className="font-bold text-base">Description</span>
                            <input
                                className={`p-2 font-light text-sm rounded-md bg-gray-800 transition outline-none ${errors.description ? `ring-1 ring-red-500` : `focus:ring-1 focus:ring-gray-100`}`}
                                type="text"
                                name="description"
                                id="description"
                                value={description}
                                onChange={this.handleChange}
                                placeholder="Add Description..."
                            />
                            {errors.description &&
                                <span className="h-3 font-bold text-red-500 text-xs">{errors.description}</span>}
                        </label>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="reset"
                                onClick={this.props.onReset}
                                className="p-2 font-bold mt-4 rounded-full bg-gray-300 hover:bg-red-500 hover:text-gray-100 text-sky-950 transition">
                            <XMarkIcon className=" h-5 w-5"/>
                        </button>
                        <button type="submit"
                                disabled={!isFormValid}
                                className="p-2 font-bold mt-4 rounded-full disabled:bg-gray-500 bg-sky-950 text-gray-100 hover:bg-black transition">
                            <PlusIcon className=" h-5 w-5"/>
                        </button>
                    </div>
                </form>
            </div>
        )
            ;
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    selectedTodo: PropTypes.object,
}

export default Form;