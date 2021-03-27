export class Todo{

    static fromJson({id, tarea, completado, creado}) {
        const tempTodo = new Todo( tarea );
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor(tarea){
        this.id = new Date().getTime();
        this.tarea = tarea;
        this.completado = false;
        this.date = new Date();
    }

    impormirClase(){
        console.log(`${this.tarea} - ${this.id}`);
    }

}