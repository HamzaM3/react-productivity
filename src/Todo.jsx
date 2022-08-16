import { useState, useRef, useEffect } from 'react';
import { SVGPlus, SVGCheckbox, SVGCross } from './svg'

class TodoItem {
    constructor(todo, id, checked=false) {
        this.todo = todo;
        this.id = id
        this.checked = checked
    }

    toggle() {
        this.checked = !this.checked;
    }
}


export default function Todo () {
    let input = useRef();

    const [todoList, setTodoList] = useState([new TodoItem('Remove this todo', Date.now()), new TodoItem('Remove this one too', Date.now() + 1)])

    function addTodo() {
        console.log(todoList)
        let todo = new TodoItem(input.current.value, Date.now());
        console.log(todo, [...todoList, todo])
        setTodoList([...todoList, todo])
    }

    function removeTodo(id) {
        setTodoList(todoList.filter(todoItem => todoItem.id !== id))
    }

    function checkTodo(id) {
        setTodoList(todoList.map(todoItem => {
            if (todoItem.id === id) {
                todoItem.toggle()
            }
            return todoItem
        }))
    }

    useEffect(() => {
        input.current.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.current.value.trim() !== "") {
                addTodo()
            }
        })
    }, [addTodo])

    return <div className="todo">
        <h1 onClick={addTodo}>To do list</h1>

        <div className='input'>
            <div className="todo-entry">
                    <input ref={input} spellCheck="false" type="text"/>
            </div>
            <SVGPlus onClick={addTodo} color="white" />
        </div>

        <div className='list'>
            {
                todoList.map(item => {
                    return <div key={item.id} className="item">
                        <SVGCheckbox checked={item.checked} onClick={() => checkTodo(item.id)} />
                        <div className="title">{item.todo}</div>
                        <SVGCross onClick={() => removeTodo(item.id)} />
                    </div>
                })
            }
        </div>
    </div>
}