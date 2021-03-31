const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkOrDelete);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);


function addTodo(event){

	event.preventDefault();

	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	
	const checkButton = document.createElement("button");
	checkButton.classList.add("complete-btn");
	checkButton.innerHTML = '<i class="fas fa-check-circle"></i>';
	todoDiv.appendChild(checkButton);

	const trashButton = document.createElement("button");
	trashButton.classList.add("trash-btn");
	trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
	todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    saveLocalTodos(todoInput.value);

    todoInput.value = "";
}

function checkOrDelete(e) {
	const item = e.target;

	if (item.classList[0] === "trash-btn") {
		item.parentElement.classList.add("todo-fall");
		removeLocalTodos(item.parentElement);
		item.parentElement.addEventListener ("transitionend", function() {
			item.parentElement.remove();
		})
	}

	if (item.classList[0] === "complete-btn") {
		item.parentElement.classList.toggle("todo-completed");
	}
}

function filterTodo (e) {
	const todos = todoList.childNodes;
	console.log(todos);
	todos.forEach(function(todo){
    	switch(e.target.value) {
    		case "all":
    			todo.style.display = "flex";
    			break;
    		case "completed":
    			if (todo.classList.contains("todo-completed")) {
    				todo.style.display = "flex";
    			} else {
    				todo.style.display = "none";
    			}
    			break;
    		case "uncompleted":
    			if (!todo.classList.contains("todo-completed")) {
    				todo.style.display = "flex";
    			} else {
    				todo.style.display = "none";
    			}
    			break;
    	}
	});
}

function saveLocalTodos (todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos () {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function(todo){
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");

		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo);
		
		const checkButton = document.createElement("button");
		checkButton.classList.add("complete-btn");
		checkButton.innerHTML = '<i class="fas fa-check-circle"></i>';
		todoDiv.appendChild(checkButton);

		const trashButton = document.createElement("button");
		trashButton.classList.add("trash-btn");
		trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
		todoDiv.appendChild(trashButton);

	    todoList.appendChild(todoDiv);
	});	
}

function removeLocalTodos (todo){
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.splice(todos.indexOf(todo.children[0].innerText), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
}