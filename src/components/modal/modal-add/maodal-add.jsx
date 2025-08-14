import { use } from 'react';
import style from '../../../app.module.css';
import { ToDoContext } from '../../../context';

export const ModalAdd = () => {
	const { objModalAdd } = use(ToDoContext);
	const { onModal, onAddNewToDo, onChangeAddToDo, newToDo, isCreating } = objModalAdd;

	return (
		<div onClick={onModal} id="myModal" className={style.modal}>
			<div className={style['modal-content']}>
				<span id="myModalSpan" className={style.close}>
					&times;
				</span>
				<div className={style.wrapAddFormToDo}>
					<form
						action="#"
						className={style.addFormToDo}
						onSubmit={onAddNewToDo}
					>
						<label htmlFor="todo">Добавить To Do</label>
						<input
							onChange={onChangeAddToDo}
							id="todo"
							type="text"
							value={newToDo}
							placeholder="Напичатайте что бы вы хотели сделать..."
						/>
						<p className={style.addFormToDoInfo}>
							To Do должен содержать минимум 10 символов
						</p>
						<button disabled={!isCreating}>add</button>
					</form>
				</div>
			</div>
		</div>
	);
};
