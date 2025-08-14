// import { useState } from 'react';

export const useUpdatingToDo = (setRefreshToDoFlag, refreshToDoFlag) => {
	// const [isUpdating, setIsUpdating] = useState(false);

	const updatingToDo = (id, todo) => {
		// setIsUpdating(true);

		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(todo), // body data type must match "Content-Type" header
		})
			.then((response) => response.json())
			.then((info) => {
				console.log('add thing answer serwer ', info);
				setRefreshToDoFlag(!refreshToDoFlag);
			})
			.finally(() => {
				// setIsUpdating(false);
			});
	};

	return {
		// setIsUpdating,
		// isUpdating,
		updatingToDo,
	};
};
