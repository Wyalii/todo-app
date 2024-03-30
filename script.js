
 let editingId = 0;
 main()
 async function getAllTOdos(){ 
let response = await fetch("https://app-servers.io/api/todos"); 
let todos = await response.json() 
return todos; 
} 

async function main(){ 
  
  let todos = await getAllTOdos(); 
  render(todos) 

} 

 async function render(todos){ 
    let html = "";  
    for(let i = 0; i < todos.length; i++){ 
        html += ` 
        
        <div class="todo"> 
            <div class="task"> 
                <input type="checkbox" onclick = "taskStatus(${todos[i].id})" data-todoid = "${todos[i].id}" ${todos[i].completed ? "checked" : ""}> 
                <div class="text">${todos[i].task}</div>
            </div> 
            <div class="actions"> 
                <div class="deleteBtn" onclick ='deleteTodo(${todos[i].id})'>Delete</div> 
                <div class="editBtn" onclick = 'handleEditClick("${todos[i].task}", ${todos[i].id})'>Edit</div>
            </div>
        </div>
        
        `
    }
    updateCount(todos.length)
    document.querySelector('.box2').innerHTML = html
 } 

 async function deleteTodo(todoId){ 
    await fetch(`https://app-servers.io/api/todos/delete/${todoId}`, 
      {
        method: 'POST',
      }
) 
let todos = await getAllTOdos(); 
render(todos) 
 } 


async function sendTodo(todos){ 
    await fetch('https://app-servers.io/api/todos/add', 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task:todos}),
      }
)
}

 document.querySelector('.submit').addEventListener('click', handleSubmitClick) 
 
 async function addTodo(){ 
    
    let input = document.querySelector('.input').value; 
    await sendTodo(input)  
    let todos = await getAllTOdos(); 
    render(todos) 
    
 } 

 async function taskStatus (todoid){ 
   
   let checked = document.querySelector(`[data-todoid = "${todoid}"]`).checked
   
    await fetch(`https://app-servers.io/api/todos/edit/${todoid}`, 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed:checked }),
    }
)
 }   

 async function handleEditClick(taskName, todoid){ 
  editingId = todoid;
  document.querySelector('.input').value = taskName 
  
 } 

 async function editTodo(){ 
  let updatedName = document.querySelector('.input').value
  await fetch(`https://app-servers.io/api/todos/edit/${editingId}`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: updatedName }), 
      }
) 
let todos = await getAllTOdos(); 
render(todos)   
document.querySelector('.input').value = ""
editingId = 0;
 }
 
 async function handleSubmitClick(){ 
  let usertext = document.querySelector('.input').value;
  if(usertext == ""){ 
    alert('ur task should contain symbols')
    return;
  } 

  if(usertext < 5){ 
    alert('ur task can not container less than 5 numbers/symbols'); 
    return;
  }
  
  if(editingId !== 0){ 
    editTodo()
    
  }else{ 
    addTodo()
  }
 }
 
 function updateCount(count){ 
  document.querySelector('.todosCount').innerHTML = count
 }
 
 
 
 