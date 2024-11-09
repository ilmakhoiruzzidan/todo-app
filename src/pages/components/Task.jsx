import {Component} from 'react';
import PropTypes from 'prop-types';
import {TrashIcon} from "@heroicons/react/24/solid/index.js";
import log from "eslint-plugin-react/lib/util/log.js";

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

    handleUpdate = () => {
        console.log('Ini kepanggil')
        this.props.onUpdate(this.props.id);
    }


    render() {
        const {isDone} = this.state;
        const {id, todo, description} = this.props;
        return (
            <div className="flex py-4 justify-center bg-sky-950 w-full" key={id}>
                <div onClick={this.handleUpdate}
                    className={`flex p-4 text-gray-100 justify-between shadow-lg rounded-xl w-96 ${isDone ? `bg-gradient-to-r from-gray-900 to-sky-900` : `bg-sky-900`}`}>
                    <div className="flex flex-col">
                        <span
                            className={`text-2xl font-semibold ${isDone ? `line-through` : ``} `}>{todo}</span>
                        <span
                            className={`text-sm text-gray-300 font-light`}>{description}</span>
                    </div>
                    <div className="flex flex-col ">
                        <label className="flex justify-end">
                            <input
                                onChange={this.handleChangeDone}
                                type="checkbox"
                                className="toggle bg-gray-100 transition checked:bg-sky-700"
                                checked={isDone}
                            />
                        </label>
                        <button
                            onClick={this.handleDelete}
                            className="flex text-red-500 mt-4 hover:outline-gray-100 transition justify-end">
                            <TrashIcon className="h-7 w-7"/>
                        </button>
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
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
}

export default Task;