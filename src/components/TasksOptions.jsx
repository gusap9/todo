import { useEffect, useState } from "react";
import "../css/TasksOptions.css";

const TasksOptions = ({ addTask, edit, changedTask, changedTaskSubmited }) => {
    // переменная, содержащая сегодняшнюю дату в нужном для поля input формата
    const today = new Date().toISOString().slice(0, 10);

    // хук состояния с названием добавляемой задачи 
    const [taskName, setTaskName] = useState("")
    const taskNameChange = (e) => {
        setTaskName(e.target.value)
    }
    // хук состояния с датой добавляемой задачи 
    const [taskDate, setTaskDate] = useState(today)
    const taskDateChange = (e) => {
        setTaskDate(e.target.value)
    }
    // хук состояния с описанием добавляемой задачи 
    const [taskDescription, setTaskDescription] = useState("")
    const taskDescriptionChange = (e) => {
        setTaskDescription(e.target.value)
    }
    // функция отправки формы в App.js для последующей обработки значений в
    // объект, содержащий информацию о задаче
    const handleSubmit = (e) => {
        e.preventDefault()
        addTask(taskName, taskDate, taskDescription)
        //очищение инпутов для ввода новой задачи
        setTaskName("")
        setTaskDate(today)
        setTaskDescription("")
    }

    // хук состояния с названием редактируемой задачи
    const [changedTaskName, setChangedTaskName] = useState("")
    const changedTaskNameChange = (e) => {
        setChangedTaskName(e.target.value)
    }
    // хук состояния с датой редактируемой задачи
    const [changedTaskDate, setChangedTaskDate] = useState(today)
    const changedTaskDateChange = (e) => {
        setChangedTaskDate(e.target.value)
    }
    // хук состояния с описанием редактируемой задачи
    const [changedTaskDescription, setChangedTaskDescription] = useState("")
    const changedTaskDescriptionChange = (e) => {
        setChangedTaskDescription(e.target.value)
    }
    // хук эффекта, который передает данные изменяемого задачи в стейты, когда оно редактируется
    useEffect(() => {
        if (changedTask.task){
            setChangedTaskName(changedTask.task)
            setChangedTaskDate(changedTask.date)
            setChangedTaskDescription(changedTask.description)
        }
    }, [edit]
    )
    // функция отправки формы измененного задания в App.js  
    const changedSubmit = (e) => {
        e.preventDefault()
        changedTaskSubmited(changedTaskName, changedTaskDate, changedTaskDescription)
    }
    return (
        <div>
            {/* отрисовка формы для редактирования или добавления задачи 
            отрисовка зависит от значения =t, передаваемого из App.js */}
            {
                edit === false ?
                    <form className='options-box' onSubmit={changedSubmit}>
                        <div className="options-first-sting">
                            <div className="task-name">
                                Название задачи:
                                <input type="text" value={changedTaskName} onChange={changedTaskNameChange} placeholder="Например: Сделать зарядку" />
                            </div>
                            <div className="task-date task-name">
                                Дата:
                                <input type="date" value={changedTaskDate} onChange={changedTaskDateChange} min={today} />
                            </ div>
                        </div>
                        <div className="options-second-string">
                            <div className="task-description task-name">
                                Описание задачи:
                                <input type="text" value={changedTaskDescription} onChange={changedTaskDescriptionChange} placeholder="Например: анжуманя 20 раз, бегит 5 мин., пресс качат 20 раз, турник 10 раз " />
                            </div>
                        </div>
                        <div className="oprions-third-string">
                            <button className="options-submit">
                                Сохранить изменения
                            </button>
                        </div>
                    </form>
                    :
                    <form className='options-box' onSubmit={handleSubmit}><div className="options-first-sting">
                        <div className="task-name">
                            Название задачи:
                            <input type="text" value={taskName} onChange={taskNameChange} placeholder="Например: Сделать зарядку" />
                        </div>
                        <div className="task-date task-name">
                            Дата:
                            <input type="date" value={taskDate} onChange={taskDateChange} min={today} />
                        </ div>
                    </div>
                        <div className="options-second-string">
                            <div className="task-description task-name">
                                Описание задачи:
                                <input type="text" value={taskDescription} onChange={taskDescriptionChange} placeholder="Например: анжуманя 20 раз, бегит 5 мин., пресс качат 20 раз, турник 10 раз " />
                            </div>
                        </div>
                        <div className="oprions-third-string">
                            <button className="options-submit">
                                Добавить задачу
                            </button>
                        </div>
                    </form>
            }

        </div>
    )
}

export default TasksOptions;