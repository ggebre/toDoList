import { Api } from './api.js'
import { View } from './view.js'

// ~~~~~~~~~~~~ Model ~~~~~~~~~~~~
export const Model = ((api, view) => {
    class Todo {
        constructor(content) {
            this.content = content;
            this.isCompleted = false;
            this.editable = false;
        }
    }

    class State {
        #todolist = [];
        #toggleInput = false;
        get toggleInput() {
            return this.#toggleInput
        } 
        set toggleInput(isOn){
            this.#toggleInput = !this.#toggleInput;
        }
        get todolist() {
            return this.#todolist;
        }
        set todolist(newtodolist) {
            this.#todolist = [...newtodolist];

            const todolistEle = document.querySelector(view.domstr.todolist);
            const todolistCompleted = document.querySelector(view.domstr.todolistcompleted);

            const tmp = view.createTmp(this.todolist.filter(todo => !todo.isCompleted));
            const tmpCompleted = view.createTmp(this.todolist.filter(todo => todo.isCompleted));
            
            view.render(todolistEle, tmp);
            view.render(todolistCompleted, tmpCompleted);
        }
    }

    const getTodos = api.getTodos;
    const deleteTodo = api.deleteTodo;
    const addTodo = api.addTodo;
    const editTodo = api.editTodo;

    return {
        getTodos,
        deleteTodo,
        addTodo,
        editTodo,
        State,
        Todo,
    };
})(Api, View);