import {Component} from 'react';
import PropTypes from 'prop-types';
import {TrashIcon} from "@heroicons/react/24/solid/index.js";
import {PencilIcon} from "@heroicons/react/16/solid/index.js";

class Task extends Component {
    state = {
        isDone: false,
    }

    handleChangeDone = () => {
        this.setState((prevState) => ({
            isDone: !prevState.isDone,
        }));
    }

    handleDelete = () => {
        this.props.onDelete(this.props.id);
    }

    handleSelect = () => {
        this.props.onSelect(this.props.id);
    }

    render() {
        const {isDone} = this.state;
        const {id, todo, description, date} = this.props;
        return (
            <div className="flex py-4 justify-center bg-sky-950 w-full" key={id}>
                <div
                    className={`flex p-4 text-gray-100 cursor-pointer transition justify-between shadow-md rounded-xl w-96 ${isDone ? `bg-gradient-to-r from-gray-900 to-sky-900` : `bg-sky-900`}`}>
                    <div className="flex flex-wrap flex-col w-full">
                        <p className={`text-2xl font-semibold ${isDone ? `line-through` : ``} `}>{todo}</p>
                        <p className={`text-sm text-gray-300 font-light`}>{description}</p>
                        <p className="text-sm text-gray-300 justify-self-end items-end">{date}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="flex justify-end">
                            <input
                                onChange={this.handleChangeDone}
                                type="checkbox"
                                className="toggle bg-gray-100 transition checked:bg-sky-700"
                                checked={isDone}
                            />
                        </label>
                        <div className="flex flex-row mt-4 gap-2">
                            <button
                                onClick={this.handleDelete}
                                className="text-red-500 hover:text-red-600 transition justify-end">
                                <TrashIcon className="h-7 w-7"/>
                            </button>
                            <button
                                className="text-amber-500 hover:text-amber-600 transition justify-end"
                                onClick={this.handleSelect}>
                                <PencilIcon className="h-7 w-7"/>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        )

    }
}

Task.propTypes = {
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
}

export default Task;