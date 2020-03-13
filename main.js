let todos = [];

const filters = {
	filterText: '',
	hideCompleted: false,
};

const todosJSON = localStorage.getItem('todos');

checkStorage();

renderTodos(todos, filters);

/** -- Add a todo --  */
document.querySelector('#todoForm').addEventListener('submit', function(e) {
	e.preventDefault();

	todos.push({
		id: uuidv4(),
		text: e.target.elements.todoText.value,
		completed: false,
	});


	e.target.elements.todoText.value = '';
	document.querySelector('#todos').innerHTML = '';
	saveTodos(todos);

	renderTodos(todos, filters);
});

/**  -- Assign filterText to input --  */
document.querySelector('#filterText').addEventListener('input', function(e) {
	filters.filterText = e.target.value;

	document.querySelector('#todos').innerHTML = '';

	renderTodos(todos, filters);
});

document.querySelector('#addAdvanced').addEventListener('click', function (e) {
	location.assign('editTodos/editTodos.html')
})