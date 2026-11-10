let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const saved = localStorage.getItem("toDoTasks");
	if (saved === null) {
		return items;
	}
	try {
		return JSON.parse(saved);
	} catch {
		return items;
	}
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(
		".to-do__item-button_type_duplicate",
	);
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener("click", () => {
		clone.remove();
		saveTasks(getTasksFromDOM());
	});

	duplicateButton.addEventListener("click", () => {
		const copyText = textElement.textContent;
		const copy = createItem(copyText);
		listElement.prepend(copy);
		saveTasks(getTasksFromDOM());
	});

	editButton.addEventListener("click", () => {
		textElement.contentEditable = "true";
		textElement.focus();
	});

	textElement.addEventListener("blur", () => {
		textElement.contentEditable = "false";
		saveTasks(getTasksFromDOM());
	});

	return clone;
}

function getTasksFromDOM() {
	return Array.from(
		listElement.querySelectorAll(".to-do__item-text"),
		(el) => el.textContent,
	);
}

function saveTasks(tasks) {
	localStorage.setItem("toDoTasks", JSON.stringify(tasks));
}

items = loadTasks();
items.forEach((item) => {
	listElement.append(createItem(item));
});

formElement.addEventListener("submit", (event) => {
	event.preventDefault();
	const text = inputElement.value.trim();
	if (text === "") {
		return;
	}
	const newItem = createItem(text);
	listElement.prepend(newItem);
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = "";
});
