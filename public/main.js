const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.list');
const loadingFlag = document.querySelector('.loading-flag');
const todoForm = document.querySelector('.todo-container');

const getToDoCount = async () => {
  try {
    const {
      data: {todos},
    } = await axios.get('/api/v1/todos');
    return todos.length;
  }catch(err) {
    console.log(err);
  }
  
};

const getFragmented = async (id) => {
  try {
    const {
      data: {todos},
    } = await axios.get(`api/v1/todos/paginated?page=${id}`);
    return todos;
  }catch(err) {
    console.log(err);
  }
  
};


const render=async(id)=>{
    todoList.innerHTML="";
    loadingFlag.style.visibility="visible";
    const todos=await getFragmented(id);
    todos.map(item=>{
        const newITem=getItemView(item);
        todoList.appendChild(newITem)
    })
    loadingFlag.style.visibility="hidden";
}



const deleteTodo = async (elem, id) => {
    
  try {
    await axios.delete(`/api/v1/todos/${id}`);
    todoList.removeChild(elem.parentElement);
    await pagination.paginationRender();
    showPag();
    let fragmented=await getFragmented(pagination.currentPage);
    if(fragmented.length===0) {
        prev();
        fragmented=await getFragmented(pagination.currentPage);

    }

    if(pagination.currentPage!==pagination.pages&&pagination.currentPage!==1) {
        todoList.appendChild(getItemView(fragmented[fragmented.length-1]))
    }
    
    
    
  } catch (err) {
    if(err.request) {
      console.log(err.request);
      console.log("reincxa")
    }
  }

};

todoForm.addEventListener('submit', async (e) => {

  e.preventDefault();
  const name = todoInput.value;

  if(name===""||name.trim().length===0) {
    alert('no input')
    return;
  }


    const {data:{todo}}=await axios.post('/api/v1/todos', {name})
    const item=getItemView(todo);
    todoList.appendChild(item);
      await paginationAppend(pagination.currentPage);
    
      let fragmented=await getFragmented(pagination.currentPage);
      

      if(fragmented.length===pagination.recordPerPage&&pagination.totalRecords%5===1) {
        console.log(fragmented.length)
          goToLastPage();
          
      
  
      }else{
         
              
          
      }
     
      todoInput.value = '';
 
   
  
});

const getToDo = async (id) => {
  const {
    data: {todo},
  } = await axios.get(`/api/v1/todos/${id}`);
  return todo;
};

const updateToDo = async (elem, id) => {
  const {
    data: {todo},
  } = await axios.patch(`/api/v1/todos/${id}`, {edit: true});
  const item = getItemView(todo);
  todoList.replaceChild(item, elem.parentElement);
};

const save = async (elem, id) => {
  const input = elem.parentElement.firstElementChild;
  const {
    data: {todo},
  } = await axios.patch(`/api/v1/todos/${id}`, {
    name: input.value,
    edit: false,
  });
  const item = getItemView(todo);
  todoList.replaceChild(item, elem.parentElement);
};

const cancel = async (elem, id) => {
  const {
    data: {todo},
  } = await axios.patch(`/api/v1/todos/${id}`, {edit: false});
  const item = getItemView(todo);
  todoList.replaceChild(item, elem.parentElement);
};

const toggleComplete = async (elem, id) => {
  const checked = elem.checked;
  const {
    data: {todo},
  } = await axios.patch(`/api/v1/todos/${id}`, {completed: checked});
  const item = getItemView(todo);
  todoList.replaceChild(item, elem.parentElement);
};

const getItemView = (todo) => {
  let todoLi = document.createElement('li');
  todoLi.setAttribute("data-id",todo._id);
  const wrapperElement = document.createElement('span');
  wrapperElement.classList.add('non-overflow');
  wrapperElement.innerText = todo.name;
  wrapperElement.addEventListener("dblclick",()=>updateToDo(wrapperElement,todo._id))
  todoLi.appendChild(wrapperElement);
  let editBtn = document.createElement('button');
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editBtn.classList.add('edit-btn');
  editBtn.addEventListener('click', () => updateToDo(editBtn, todo._id));
  let removeBtn = document.createElement('button');
  removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  removeBtn.classList.add('remove-btn');
  removeBtn.setAttribute("disabled","disabled");
  removeBtn.removeAttribute("disabled","disabled")
  removeBtn.addEventListener('click', () => deleteTodo(removeBtn, todo._id));
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('checkbox');
  checkbox.addEventListener('change', () => toggleComplete(checkbox, todo._id));
  todoLi.prepend(checkbox);
  todoLi.appendChild(editBtn);
  todoLi.appendChild(removeBtn);
  todoLi.addEventListener("keyup",()=>toggleEvent(event))
  todoLi.classList.add('primary');

  if (todo.completed) {
    wrapperElement.classList.add('line-through');
    checkbox.checked = true;
  }
  if (todo.edit) {
    todoLi.innerText = '';
    todoLi.classList.add('alt');
    const editInput = document.createElement('input');
    editInput.setAttribute('type', 'text');
    editInput.value = todo.name;
    const saveBtn = document.createElement('button');
    saveBtn.addEventListener('click', () => save(saveBtn, todo._id));
    saveBtn.innerText = 'Save';
    const cancelbtn = document.createElement('button');
    cancelbtn.innerText = 'Cancel';
    cancelbtn.addEventListener('click', () => cancel(cancelbtn, todo._id));
    todoLi.appendChild(editInput);
    todoLi.appendChild(saveBtn);
    todoLi.appendChild(cancelbtn);
  }

  return todoLi;
};


const toggleEvent=(event)=>{
    if(event.target.tagName.toLowerCase()==="input") {
        let id=event.target.parentElement.dataset.id;
       
        if(event.which===27) {
            cancel(event.target,id)
        }

        else if(event.which===13) {
                save(event.target,id)
        }

    }
}







render(1);
