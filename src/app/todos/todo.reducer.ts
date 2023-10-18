import { createReducer, on } from "@ngrx/store";
import { borrar, crear, editar, limpiar, toggle, toggleAll } from "./todo.actions";
import { Todo } from "./models/todo.model";

export const estadoInicial: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comprar traje Ironman'),
    new Todo('Robar escudo del cptn América')
];

export const todoReducer = createReducer(estadoInicial,
    on(limpiar, (state) => state.filter(todo => !todo.completado)),

    on(crear, (state, { texto }) => [...state, new Todo(texto)]),
    
    on(borrar, (state, {id}) => state.filter(todo => todo.id !== id)),

    on(toggleAll, (state, {completado})=> state.map(todo => {
        return {
            ...todo, 
            completado: completado
        }
    })),

    on(toggle, (state, { id }) => {
        return state.map(todo => {
            if (todo.id == id) {
                return {
                    ...todo,
                    completado: !todo.completado
                }
            } else {
                return todo;
            }

        });
    }),
    on(editar, (state, { id, texto}) => {
        return state.map(todo => {
            if (todo.id == id) {
                return {
                    ...todo,
                    texto: texto
                }
            } else {
                return todo;
            }

        });
    }),

    
);

