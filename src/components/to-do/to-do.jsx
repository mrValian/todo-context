import { use } from 'react';
import style from '../../app.module.css';
import { ToDoContext } from '../../context';

export const ToDo = () => {
	const { objTodo } = use(ToDoContext);
	const { sortedList, sortFlag, todos, onClickUpdateToDo, onDeleteToDo } = objTodo;

	return (sortedList.length === 0 && sortFlag ? todos : sortedList).map(
		({ id, todo }) => (
			<div className={style.task} key={id}>
				<div className={style.taskId}>{id}</div>
				<div className={style.taskDo}>{todo}</div>
				<div className={style.taskWrapBtn}>
					<button data-id={id} onClick={onClickUpdateToDo}>
						update
					</button>
					<button data-id={id} onClick={onDeleteToDo}>
						delete
					</button>
				</div>
			</div>
		),
	);
};
