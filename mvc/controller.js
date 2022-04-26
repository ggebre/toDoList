import { View } from './view.js'
import { Model } from './model.js'

// ~~~~~~~~~~~~ Controller ~~~~~~~~~~~~
export const Controller = ((model, view) => {
    const state = new model.State();

    const addTodo = () => {
        const inputbox = document.querySelector(view.domstr.inputbox);
        const submitbtn = document.querySelector(view.domstr.submitbtn);
        
        submitbtn.addEventListener("click", () => {
            console.log(inputbox.value)
            const newtodo = new model.Todo(inputbox.value);

                model.addTodo(newtodo).then(todo => {
                    state.todolist = [todo, ...state.todolist];
                });
                inputbox.value = "";
        });
    };

    const deleteTodo = () => {
        const todolistEle = document.querySelectorAll(view.domstr.deletebutton);
        for(let i=0; i < todolistEle.length; i++){
            todolistEle[i].addEventListener("click", (event) => {
                const [className, id] = event.target.className.split(" ");
                model.deleteTodo(id);
            });
        }
        
    }; 
    const toggleCompletion = () => {
        const todolistEle = document.querySelectorAll(view.domstr.completebutton);
        
        for(let i=0; i < todolistEle.length; i++){
            todolistEle[i].addEventListener("click", (event) => {
                const [className, id] = event.target.className.split(" ");
                
                const foundTodo = state.todolist.filter((todo) => +todo.id === +id);
                const [elem] = foundTodo;
                elem.isCompleted = !elem.isCompleted;
                model.editTodo(elem);
            });
        }
    }
    const editTodo = () => {
        const todolistEle = document.querySelectorAll(view.domstr.editbutton);
        for(let i=0; i < todolistEle.length; i++){
        
            todolistEle[i].addEventListener("click", (event) => {
                const [className, id] = event.target.className.split(" ");
                const foundTodo = state.todolist.filter((todo) => +todo.id === +id);
                const [elem] = foundTodo;
                elem.editable = !elem.editable;
                state.todolist = [...state.todolist];
                editInputToDo(id)
            });
        } 
    }; 
    const editInputToDo = (id) => {
        
        const inputbox = document.querySelector(`#edit-${id}`);
        inputbox.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                const foundTodo = state.todolist.filter((todo) => +todo.id === +id);
                const [elem] = foundTodo;
                elem.editable = !elem.editable;
                elem.content = event.target.value; 
                model.editTodo(elem);
            }
        });
    }

    const init = () => {
        model.getTodos()
            .then((todolist) => {
            state.todolist = todolist.reverse();})
            .then(() => {
                deleteTodo();
                editTodo();
                toggleCompletion();
            });
    };

    const bootstrap = () => {
        init();
        addTodo();
    };

    return { bootstrap };
})(Model, View);