import { useState } from 'react';

import { ToDo, ModalAdd, ModalChange } from './components';
import { ToDoContext } from './context';

import style from './app.module.css';

import {
	useRequestGetToDo,
	useRequestAddToDo,
	useUpdatingToDo,
	useDeleteToDo,
} from './hooks';

export const App = () => {
	const [isVisible, setIsVisible] = useState(false);

	const [refreshToDoFlag, setRefreshToDoFlag] = useState(false);

	const { isLoading, setIsLoading, todos } = useRequestGetToDo(refreshToDoFlag);
	const [sortedList, setSortedList] = useState([]);

	const { isCreating, setIsCreating, requestAddToDo } = useRequestAddToDo(
		setRefreshToDoFlag,
		refreshToDoFlag,
	);
	const [newToDo, setNewToDo] = useState('');

	const { updatingToDo } = useUpdatingToDo(setRefreshToDoFlag, refreshToDoFlag);
	const [isUpdeting, setIsUpdating] = useState(false);
	const [toDoChange, setToDoChange] = useState('');
	const [changeId, setChangeId] = useState(null);

	const { deletingToDo } = useDeleteToDo(setRefreshToDoFlag, refreshToDoFlag);

	const [sortFlag, setSortFlag] = useState(true);

	const onModal = (event) => {
		if (event.target.id === 'myModal' || event.target.id === 'myModalSpan') {
			setIsVisible(!isVisible);
		} else if (event.target.id === 'myModal2' || event.target.id === 'myModalSpan2') {
			setIsUpdating(!isUpdeting);
		}
	};

	const getRandomNumberInRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const onAddNewToDo = (event) => {
		event.preventDefault();
		requestAddToDo({
			todo: newToDo,
			completed: false,
			userId: getRandomNumberInRange(1, 100),
		});
		setIsVisible(!isVisible);
		setNewToDo('');
		setIsCreating(false);
	};

	const onChangeAddToDo = ({ target }) => {
		setNewToDo(target.value);
		setToDoChange(target.value);
		if (target.value.length >= 10) {
			setIsCreating(true);
		} else {
			setIsCreating(false);
		}
	};

	const onClickUpdateToDo = ({ target }) => {
		setIsLoading(true);
		setIsUpdating(!isUpdeting);
		let id = target.dataset.id;
		setChangeId(id);
		fetch(`http://localhost:3000/todos/${id}`)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setToDoChange(data);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onUpadate = () => {
		updatingToDo(changeId, { todo: toDoChange });
		setIsVisible(!!isVisible);
		setNewToDo('');
		setIsCreating(false);
		setIsUpdating(false);
	};

	const onDeleteToDo = ({ target }) => {
		let id = target.dataset.id;
		deletingToDo(id);
	};

	const sortAlphabet = () => {
		if (sortedList.length === 0) {
			todos.sort((a, b) => {
				if (a.todo < b.todo) {
					return -1;
				}
				if (a.todo > b.todo) {
					return 1;
				}
				return 0;
			});

			setSortedList(todos);
			setSortFlag(true);
		} else {
			setSortedList([]);
			setRefreshToDoFlag(!refreshToDoFlag);
			setSortFlag(true);
		}
	};

	const onChangeFilter = ({ target }) => {
		let value = target.value.toLowerCase();
		let filterDataInput = todos.filter((elem) => {
			return elem.todo.toLowerCase().includes(value);
		});
		setSortedList(filterDataInput);
		setSortFlag(false);
	};

	const objTodo = {
		sortedList,
		sortFlag,
		todos,
		onClickUpdateToDo,
		onDeleteToDo,
	};

	const objModalAdd = {
		onModal,
		onAddNewToDo,
		onChangeAddToDo,
		newToDo,
		isCreating,
	};

	const objModalChange = {
		onModal,
		onUpadate,
		onChangeAddToDo,
		toDoChange,
		isCreating,
	};

	return (
		<div className={style.app}>
			<ToDoContext value={{ objTodo, objModalAdd, objModalChange }}>
				<h1 className={style.title}>Todo List</h1>
				<p className={style.findTitle}>Найти</p>
				<input type="text" placeholder="Найти To Do" onChange={onChangeFilter} />
				{isLoading ? <div className={style.loader}></div> : <ToDo />}
				{!isLoading && (
					<>
						<button
							onClick={() => {
								setIsVisible(!isVisible);
							}}
						>
							add
						</button>
						<button onClick={sortAlphabet}>sort</button>
					</>
				)}

				{isVisible && <ModalAdd />}

				{isUpdeting &&
					(isLoading ? <div className={style.loader}></div> : <ModalChange />)}
			</ToDoContext>
		</div>
	);
};
