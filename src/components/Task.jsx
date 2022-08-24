import '../css/Task.css';
import React from "react";
import basket from "../img/waste-basket.png"


const Task = ({ todo, completeTask, removeTask, changeTask }) => {
    // функция для добавления стилей, исходя из значения active и complete 
    function changeOfColor() {
        if (todo.complete && todo.active) return "tasks-box-checked tasks-box"
        if (todo.active) return "tasks-box-active tasks-box"
        if (todo.complete) return "tasks-box-checked tasks-box"
        else return "tasks-box"
    }
    
    
    return (
        <div key={todo.id} >
            <div
                className={changeOfColor()}
            >
                <div className="task-checkbox-name-box">
                    <input type="checkbox" className="task-checkbox" onChange={() => completeTask(todo.id)} />
                    <div className="task" onClick={() => changeTask(todo.id)} >
                        <div className="task-short-name">{todo.task}</div>
                    </div>
                </div>
                <div  className="task-basket" >
                    <img src={basket} alt="Корзина" className="task-basket-img" onClick={() => removeTask(todo.id)} />
                </div>
            </div>
        </div>
    )
}

export default Task;