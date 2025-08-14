// import { useState } from "react";

export const useDeleteToDo = (setRefreshToDoFlag, refreshToDoFlag) => {
    // const [isDeleting, setIsDeleting] = useState(false);

    const deletingToDo = (id) => {
            // setIsDeleting(true);
    
            fetch(`http://localhost:3000/todos/${id}`, {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            })
                .then((response) => response.json())
                .then((info) => {
                    console.log('add thing answer serwer ', info);
                    setRefreshToDoFlag(!refreshToDoFlag);
                })
                .finally(() => {
                    // setIsDeleting(false);
                });
        };

        return {
            // isDeleting,
            deletingToDo,
        };
};
