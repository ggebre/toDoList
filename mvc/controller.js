import { View } from './view.js'
import { Model } from './model.js'

// ~~~~~~~~~~~~ Controller ~~~~~~~~~~~~
export const Controller = ((model, view) => {
    const state = new model.State();

    const addTodo = () => {
        const inputbox = document.querySelector(view.domstr.inputbox);
        inputbox.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                
                const newtodo = new model.Todo(event.target.value);

                model.addTodo(newtodo).then(todo => {
                    state.todolist = [todo, ...state.todolist];
                });
                event.target.value = "";
            }
        });
    };

    const deleteTodo = () => {
        const todolistEle = document.querySelectorAll(view.domstr.deletebutton);
        for(let i=0; i < todolistEle.length; i++){
            todolistEle[i].addEventListener("click", (event) => {
                const [className, id] = event.target.className.split(" ");
                state.todolist = state.todolist.filter((todo) => +todo.id !== +id);
                model.deleteTodo(id);
            });
        }
        
    }; 
    const editTodo = () => {
        const todolistEle = document.querySelectorAll(view.domstr.editbutton);
        for(let i=0; i < todolistEle.length; i++){
            
            todolistEle[i].addEventListener("click", (event) => {
                const [className, id] = event.target.className.split(" ");
                // state.todolist = state.todolist.filter((todo) => +todo.id !== +id);
                // model.deleteTodo(id);
            });
        }
        
    };

    const init = () => {
        model.getTodos()
            .then((todolist) => {
            state.todolist = todolist.reverse();})
            .then(() => {
                deleteTodo();
                editTodo();
            });
    };

    const bootstrap = () => {
        init();
        addTodo();
    };

    return { bootstrap };
})(Model, View);