import { useState, useEffect } from 'react';
import './css/App.css';
import TasksOptions from "./components/TasksOptions"
import Task from './components/Task';
import Search from './components/Search';

function App() {
  // используем хук состояния для массива с заданиями, в нем будут сохранятся все задания
  const [todos, setTodos] = useState([])
  // получаем переменные из компонента и создаем из них объект, который
  // будет содержать информацию о задаче
  const addTask = (taskName, taskDate, taskDescription) => {
    if (taskName) {
      const newTask = {
        id: Math.random().toString(36).substring(2, 9),
        task: taskName,
        date: taskDate,
        description: taskDescription,
        complete: false,
        active: false
      }
      // добавляем каждое новое задание(объект) в начало уже имеющегося массива
      setTodos([newTask, ...todos])
    }
  }

  // функция для поиска выбранной задачи в массиве задач по id, чтобы поменять в найденной задаче значение
  // complete на противоположное, чтобы применить стили и обозначить задачу, как решеннную
  const completeTask = (id) => {
    setTodos([...todos.map((todo) => todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo })])
  }

  // функция для нахождения и удаления выбранной задачи также по id
  const removeTask = (id) => {
    setEdit(true)
    setTodos([...todos.filter(todo => todo.id !== id)])
  }

  // хук состояния для понимания того, редактируется ли задание
  const [edit, setEdit] = useState(true)
  // хук состояния, в котором хранится задание, которое хотят редактировать
  const [changedTask, setChangedTask] = useState("")

  // функция для поиска выбранной задачи в массиве задач по id, чтобы поменять в найденной задаче значение
  // active на противоположное, чтобы применить стили и обозначить задачу, как редактируемую
  const changeTask = (id) => {
    if (edit) {
      setTodos([...todos.map((todo) => todo.id === id ? { ...todo, active: !todo.active } : { ...todo })])
      // с помощью id находим место задачи в общем массиве
      let index = todos.map(todo => todo.id).indexOf(id)
      // передаем информацию о редактируемой задаче в нужные стейты
      setChangedTask(todos[index])
      setEdit(todos[index].active)
    } else {
      setTodos([...todos.map((todo) => ({ ...todo, active: false }))])
      setEdit(true)
    }
  }
  function compare(a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateA - dateB;
  }
  // получаем измененную задачу из компонента и изменяем редактируемую задачу в общем массиве с задачами 
  const changedTaskSubmited = (changedTaskName, changedTaskDate, changedTaskDescription) => {
    setTodos([...todos.map((todo) => todo.id === changedTask.id ? { ...todo, active: !todo.active, task: changedTaskName, date: changedTaskDate, description: changedTaskDescription } : { ...todo })])
    let index = todos.map(todo => todo.task).indexOf(changedTask.task)
    setEdit(todos[index].active)
  }

  // хук состояния для копии массива с задачами, который будет отфильтровываться по запросу
  const [filtered, setFiltered] = useState([]);
  // хук эффекта, который при изменении начального массива с задачами, будет отправлять данные в массив filtered
  useEffect(
    () => {
      setFiltered(todos);
      todos.sort(compare);
      setTodos(todos);
      setSearch("")
    },
    [todos]
  );
  const [search, setSearch] = useState("")
  const searchCahange = (e) => {
    setSearch(e.target.value)
    let currentTodos = [],
      newList = [];
    if (e.target.value !== "") {
      currentTodos = todos;
      newList = currentTodos.filter(todo => {
        const lc = todo.task.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = todos;
    }
    // отправляем в стейт полученный массив
    setFiltered(newList);
    console.log(e.target.value)
  }
  const searchReset = () => {
    setSearch("")
  }
  return (
    <div className="App">
      <header className='header'>
        <h1>Todo list</h1>
      </header>
      <main className='main'>
        <div className='container-main'>
          <div className='container-first-box'>
            <div className='tasks-list-box'>
              <h2 className='tasks-list-title'>
                Список задач
              </h2>
              <Search search={search} searchCahange={searchCahange} />
              {/* отрисовываем все задачи отфильитрованного массива, тк он будет содержать общий массив
              задач, если строка запроса будет пустой */}
              {filtered.map((todo) => {
                return (
                  <Task
                    todo={todo}
                    key={todo.id}
                    completeTask={completeTask}
                    changeTask={changeTask}
                    removeTask={removeTask}
                    edit={edit}
                  />
                )
              })}

            </div>
          </div>
          <div className='container-second-box'>
            <TasksOptions addTask={addTask} edit={edit} changedTask={changedTask} changedTaskSubmited={changedTaskSubmited} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
