import { Todo } from "./todo.class";

export class TodoList{

    constructor(){
        //this.todos = [];
        this.cargarLocal();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocal();
    }

    eliminarTodo(id){
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocal();
    }

    toggleTodo(id){
        for( const todo of this.todos ){
            if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocal();
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocal();
    }

    guardarLocal(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocal(){
        this.todos = ( localStorage.getItem('todo') )
                        ? JSON.parse(localStorage.getItem('todo'))
                        : [];
        this.todos = this.todos.map( Todo.fromJson );
    }
}