//Referencias en el HTML

import { Todo } from "../classes";
import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const divInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? checked : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return  div.firstElementChild;
}

//Eventos
divInput.addEventListener('keyup', ( event ) => {
    if( event.keyCode === 13 && divInput.value.length > 0){
        const nuevoTodo = new Todo( divInput.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        divInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento =  event.target.parentElement.parentElement;
    const idElemento = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input') ){
        todoList.toggleTodo(idElemento);
        todoElemento.classList.toggle('completed');
    }
    if( nombreElemento.includes('button') ){
        todoList.eliminarTodo(idElemento);
        divTodoList.removeChild(todoElemento);
    }

    console.log(todoList);
});

btnBorrar.addEventListener('click', (event) => {

    todoList.eliminarCompletados();
    for( let i = divTodoList.children.length - 1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFilters.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if(!filtro) { return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }

})