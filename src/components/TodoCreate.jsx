import sunIcon from '../assets/images/icon-sun.svg'
import moonIcon from '../assets/images/icon-moon.svg'
import { useState } from 'react'


const TodoCreate = ({handleThemeSwitch, theme, setTodoList,todoList}) => {
    const switchIcon = (theme === 'dark') ? sunIcon : moonIcon

    const [todoItem,setTodoItem] = useState('')

    const handleAddTodo = (e) =>{
        if(e.key === 'Enter') {
            const newTodo = {
                id:Date.now(),
                todo:todoItem,
                completed:false
            }
            setTodoList((prev)=>[...prev,newTodo])

            localStorage.setItem('todoList',JSON.stringify([...todoList,newTodo]))
            setTodoItem('')
        }
    }
  return (
    <div className="w-[90%] max-w-[600px]  sm:mt-24 mt-8">
        <div className="flex justify-between items-center">
            <p className="text-3xl sm:text-5xl tracking-[14px] text-white uppercase font-semibold">todo</p>
            <img src={switchIcon} alt='icon' onClick={handleThemeSwitch} className='w-6 h-6 object-cover cursor-pointer' />
        </div>
        <div className='mt-8 sm:mt-12'>
            <input value={todoItem} onChange={(e)=>setTodoItem(e.target.value)} className='w-full p-3 pl-6  dark:bg-[#25273c] text-xl dark:text-white/70 rounded-md focus:outline-gray-500 dark:focus:outline-slate-600' placeholder='Create a new todo' onKeyDown={handleAddTodo}/>
        </div>
    </div>
  )
}

export default TodoCreate