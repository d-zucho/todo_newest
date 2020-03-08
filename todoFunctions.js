/**  --  Delete Todo  --  */

const deleteTodo = function(id) {
	const index = todos.findIndex(function(todo) {
		return todo.id === id;
		// returns true when todo.id is a match to
		// id of note of button pressed
	});
	if (index > -1) {
		todos.splice(index, 1);
	}
};

/**  --  Mark Completed --  */
const toggleTodo = function(id) {
	const todo = todos.find(function(todo) {
		return todo.id === id;
	});

	if (todo !== undefined) {
		todo.completed = !todo.completed;
	}
};

/**  -- Display Individual Todos */
const generateTodoDOM = function(filteredTodos) {
	filteredTodos.forEach(todo => {
		const todoEl = document.createElement('div');
		const checkbox = document.createElement('input');
		const todoText = document.createElement('a');
		const deleteButton = document.createElement('button');

		checkbox.setAttribute('type', 'checkbox');
		checkbox.checked = todo.completed;
		todoEl.appendChild(checkbox);
		checkbox.addEventListener('change', function(e) {
			toggleTodo(todo.id);
			saveTodos(todos);
			renderTodos(todos, filters);
		});

		todoText.setAttribute('href', 'editTodos/editTodos.html');
		todoText.textContent = todo.text;
		todoEl.appendChild(todoText);

		deleteButton.textContent = ' x ';
		todoEl.appendChild(deleteButton);

		document.querySelector('#todos').appendChild(todoEl);

		// delete note
		deleteButton.addEventListener('click', function(e) {
			deleteTodo(todo.id);
			saveTodos(todos);
			renderTodos(todos, filters);
		});
	});
	saveTodos(todos);
};

/** -- Render Todos --  */
const renderTodos = function(todos, filters) {
	const filteredTodos = todos.filter(function(todo) {
		return todo.text.toLowerCase().includes(filters.filterText.toLowerCase());
	});

	const incompleteTodos = filteredTodos.filter(function(todo) {
		return !todo.completed;
	});

	document.querySelector('#summary').innerHTML = '';
	document.querySelector('#todos').innerHTML = '';

	generateTodoDOM(filteredTodos);
	generateSummary(incompleteTodos);
};

/**  -- Save Todos  --  */
const saveTodos = function(todos) {
	localStorage.setItem('todos', JSON.stringify(todos));
};

/**  -- Check Local Storage --  */
const checkStorage = function() {
	if (todosJSON !== null) {
		todos = JSON.parse(todosJSON);
	}
};

/**  --  Generate Summary DOM  --  */
const generateSummary = function(incompleteTodos) {
	const summary = document.createElement('h2');
	summary.textContent = `You have ${incompleteTodos.length} todo(s) left`;
	document.querySelector('#summary').appendChild(summary);
};
