// ~~~~~~~~~~~~ View ~~~~~~~~~~~~
export const View = (() => {
    const domstr = {
        todolist: "#todolist__container",
        todolistcompleted: "#todolist__container_completed",
        deletebutton: ".dlebtn",
        editbutton: ".editbtn",
        inputbox: ".todolist__input",
        completebutton: ".completedbtn",
        uncompletebutton: ".uncompletedbtn",

    };
    const render = (ele, tmp) => {
        ele.innerHTML = tmp;
    };
    const createTmp = (arr) => {
        let tmp = "";
        arr.forEach((todo) => {
            tmp += `
                <div class="todo_container">

                    <button ${!todo.isCompleted ? 'hidden' : 'visible'} class="uncompletebtn ${todo.id}">uncompleted</button>
                    ${true ?
                        `<span>${todo.content}</span>`
                        : 
                        `<input type="text" placeholder=${todo.content}/>`
                    }
                    <button class="editbtn ${todo.id}">Edit</button>
                    <button class="dlebtn ${todo.id}">delete</button>
                    <button ${todo.isCompleted ? 'hidden' : 'visible'} class="completedbtn ${todo.id}">completed</button>
                </div>
            `;
        });
        return tmp;
    };
    return {
        domstr,
        render,
        createTmp,
    };
})();