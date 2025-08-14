import { use } from 'react';
import style from '../../../app.module.css';
import { ToDoContext } from '../../../context';

export const ModalChange = () => {
	const { objModalChange } = use(ToDoContext);
	const { onModal, onUpadate, onChangeAddToDo, toDoChange, isCreating } =
		objModalChange;

	return (
		<div onClick={onModal} id="myModal2" className={style.modal}>
			<div className={style['modal-content']}>
				<span id="myModalSpan2" className={style.close}>
					&times;
				</span>
				<div className={style.wrapAddFormToDo}>
					<form action="#" className={style.addFormToDo} onSubmit={onUpadate}>
						<label htmlFor="todo">Добавить To Do</label>
						<input
							onChange={onChangeAddToDo}
							id="todo"
							type="text"
							value={toDoChange.todo}
							placeholder="Напичатайте что бы вы хотели сделать..."
						/>
						<p className={style.addFormToDoInfo}>
							To Do должен содержать минимум 10 символов
						</p>
						<button disabled={!isCreating}>update</button>
					</form>
				</div>
			</div>
		</div>
	);
};
