
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

async function render(todos: any []) {
  const container = document.querySelector('.box2');
  container.innerHTML = ''; // Clear existing content
  
  todos.forEach(todo => {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');

      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.todoid = todo.id;
      checkbox.checked = todo.completed;
      checkbox.addEventListener('click', () => taskStatus(todo.id));

      const textDiv = document.createElement('div');
      textDiv.classList.add('text');
      textDiv.textContent = todo.task;

      taskDiv.appendChild(checkbox);
      taskDiv.appendChild(textDiv);

      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('actions');

      const deleteBtn = document.createElement('div');
      deleteBtn.classList.add('deleteBtn');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

      const editBtn = document.createElement('div');
      editBtn.classList.add('editBtn');
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => handleEditClick(todo.task, todo.id));

      actionsDiv.appendChild(deleteBtn);
      actionsDiv.appendChild(editBtn);

      todoDiv.appendChild(taskDiv);
      todoDiv.appendChild(actionsDiv);

      container.appendChild(todoDiv);
  });

  updateCount(todos.length);
}



 async function deleteTodo(todoId:number){ 
    await fetch(`https://app-servers.io/api/todos/delete/${todoId}`, 
      {
        method: 'POST',
      }
) 
let todos = await getAllTOdos(); 
render(todos) 
 } 


async function sendTodo(todos: any[]){ 
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
    
    let input = (document.querySelector('.input') as HTMLInputElement).value; 
    await sendTodo(input)  
    let todos = await getAllTOdos(); 
    render(todos) 
    
 } 

 async function taskStatus (todoid:number){ 
   
   let checked = (document.querySelector(`[data-todoid = "${todoid}"]`) as HTMLInputElement).checked
   
    await fetch(`https://app-servers.io/api/todos/edit/${todoid}`, 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed:checked }),
    }
)
 }   

 async function handleEditClick(taskName: string, todoid: number){ 
  editingId = todoid;
  (document.querySelector('.input') as HTMLInputElement).value = taskName 
  
 } 

 async function editTodo(){ 
  let updatedName = (document.querySelector('.input') as HTMLInputElement).value
  await fetch(`https://app-servers.io/api/todos/edit/${editingId}`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: updatedName }), 
      }
) 
let todos = await getAllTOdos(); 
render(todos)   
(document.querySelector('.input') as HTMLInputElement).value = ""
editingId = 0;
 }
 
 async function handleSubmitClick(){ 
  let usertext = (document.querySelector('.input') as HTMLInputElement).value;
  if(usertext == ""){ 
    alert('ur task should contain symbols')
    return;
  } 

  if(usertext.length < 5){ 
    alert('ur task can not container less than 5 numbers/symbols'); 
    return;
  }
  
  if(editingId !== 0){ 
    editTodo()
    
  }else{ 
    addTodo()
  }
 }
 
 function updateCount(count:any){ 
  document.querySelector('.todosCount').innerHTML = count
 }
 
 
 
 