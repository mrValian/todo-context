import { useEffect, useState } from "react";

export const useRequestGetToDo = (refreshToDoFlag) => {
		const [todos, setToDos] = useState([]);
		const [isLoading, setIsLoading] = useState(false);

		useEffect(() => {
			setIsLoading(true);

			fetch('http://localhost:3000/todos')
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					setToDos(data);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}, [refreshToDoFlag]);

		return {todos, setIsLoading, setToDos, isLoading};
	};
