//

//

const create = function() {};

document.querySelector('#editForm').addEventListener('submit', function(e) {
	e.preventDefault();
	console.log('working');

	const div = document.createElement('div');
	const p = document.createElement('p');
	const text = document.createElement('a');
	text.setAttribute('href', '../index.html');
	text.textContent = e.target.elements.todoContent.value;

	div.appendChild(text);

	document.querySelector('#todos').appendChild(div);
});
