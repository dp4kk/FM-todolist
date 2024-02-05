import { useEffect, useState } from "react"
import TodoCreate from "./TodoCreate"
import TodoListDisplay from "./TodoListDisplay"
const TodoMain = ({handleThemeSwitch,theme}) => {
    const [todoList,setTodoList] = useState([])

    console.log(todoList)

    useEffect(()=>{
        const storedTodoList = localStorage.getItem('todoList')
        if(storedTodoList){
            setTodoList(JSON.parse(storedTodoList))
        }
    },[])
    
  return (
    <div className='w-full h-full absolute flex flex-col items-center z-[10] top-0 left-0'>
        <TodoCreate handleThemeSwitch={handleThemeSwitch} theme={theme} setTodoList={setTodoList} todoList={todoList}/>
        <TodoListDisplay todoList={todoList} setTodoList={setTodoList}/>
    </div>
  )
}

export default TodoMain