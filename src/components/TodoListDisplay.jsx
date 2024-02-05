import checkIcon from '../assets/images/icon-check.svg'
import {DragDropContext, Draggable} from 'react-beautiful-dnd'
import {StrictModeDroppable as Droppable} from '../helper/StrictModeDroppable'
import { useState } from 'react'



const TodoListDisplay = ({todoList,setTodoList}) => {

    const [filter, setFilter] = useState('all')


    const leftItems = todoList.filter((item)=>item.completed === false).length


    const handleToggleCompletion=(id)=>{
        const itemIndex = todoList.findIndex((el)=>el.id === id)
        const todoListCopy= [...todoList]
        todoListCopy[itemIndex].completed = !todoListCopy[itemIndex].completed
        setTodoList(todoListCopy)
        localStorage.setItem('todoList',JSON.stringify(todoList))
    }

    const handleDeletion =(id) =>{
        const updatedList=todoList.filter(item=>item.id !==id )
        setTodoList(updatedList)
        localStorage.setItem('todoList', JSON.stringify(updatedList))
    }

    const handleClearCompleted = () =>{
        const updatedList = todoList.filter((item)=>item.completed === false)
        setTodoList(updatedList)
        localStorage.setItem('todoList',updatedList)
    }

    const filteredTodos = () =>{
        switch (filter) {
            case 'completed':
                return todoList.filter((item)=> item.completed);
            case 'active':
                return todoList.filter((item)=>!item.completed);
            default:
                return todoList
        }

    }

    const handleFilterChange = (newFilter) =>{
        setFilter(newFilter)
    }
 
    const handleonDragEnd = (result) =>{
        if(!result.destination) return
        const todoCopy= [...todoList]
        const [reorderedItem] = todoCopy.splice(result.source.index, 1)
        todoCopy.splice(result.destination.index, 0, reorderedItem)
        setTodoList(todoCopy)
        localStorage.setItem('todoList',JSON.stringify(todoCopy))
    }



  return (
    <>
    <div className='w-[90%] max-w-[600px] mt-4 sm:mt-14 dark:bg-[#25273c] bg-white shadow-2xl rounded-md'>
        <DragDropContext onDragEnd={handleonDragEnd}>
            <Droppable droppableId='todos'>
            {(provided)=>(   
        <ul {...provided.droppableProps} ref={provided.innerRef}>
             {filteredTodos().map((listItem,index)=>{
                return(
                    <Draggable key={listItem.id} draggableId={listItem.id.toString()} index={index}>
                        {(provided)=>(                        
                            <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="text-xl p-3 dark:text-white/70 text-gray-700  gap-4 items-center border-b dark:border-white/40 dark:bg-[#25273c] bg-white flex justify-between group">
                                <div className='flex items-center gap-2'>
                                 <div className='border-2 rounded-full dark:border-white/20 border:gray-400' onClick={()=>handleToggleCompletion(listItem.id)}>
                                 <img src={checkIcon} className={`bg-gradient-to-b from-blue-400 to bg-purple-400 p-1.5  rounded-full ${listItem.completed? 'opacity-1' : 'opacity-0'}`} />
                                 </div>
                                <p className={`${listItem.completed ? 'line-through dark:text-white/40 text-black/40' : ''} mt-1 text-slate-700 dark:text-white/70`}>
                                 {listItem.todo}
                                  </p>
                                </div>
                                <button className='opacity-0 group-hover:opacity-100 transition-all duration-500' onClick={()=>handleDeletion(listItem.id)} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                                </button>
                            </li>
                        )}
                    </Draggable>
                )
})}
            {provided.placeholder}
        </ul>
          )}
            </Droppable>
        </DragDropContext>
        <div className='w-full p-3 flex justify-between text-slate-700 dark:text-white/70 '>
            <p>{leftItems} items left</p>
            <div className='sm:flex hidden gap-3'>
                <button onClick={()=>handleFilterChange('all')} className={filter === 'all' ? 'text-blue-500':''}>All</button>
                <button onClick={()=>handleFilterChange('active')}  className={filter === 'active' ? 'text-blue-500':''}>Active</button>
                <button onClick={()=>handleFilterChange('completed')}  className={filter === 'completed' ? 'text-blue-500':''}>Completed</button>
            </div>
            <button onClick={handleClearCompleted}>Clear Completed</button>
        </div>
    </div>
    <div className='w-[90%] dark:bg-[#25273c] bg-white shadow-2xl p-3 mt-6 sm:hidden rounded-md'>
         <div className='flex gap-4 w-full  justify-center dark:text-white/70 text-slate-700'>
                <button onClick={()=>handleFilterChange('all')} className={filter === 'all' ? 'text-blue-500':''}>All</button>
                <button onClick={()=>handleFilterChange('active')}  className={filter === 'active' ? 'text-blue-500':''}>Active</button>
                <button onClick={()=>handleFilterChange('completed')}  className={filter === 'completed' ? 'text-blue-500':''}>Completed</button>
            </div>
    </div>
    <p className='mt-12 text-gray-400 dark:text-slate-500'>Drag and drop to reorder list</p>
    </>
  )
}

export default TodoListDisplay