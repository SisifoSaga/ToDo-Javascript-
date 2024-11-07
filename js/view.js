import AddTodo from './components/add-todo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';

export default class View {
  constructor() {
    this.model = null;
    this.table = document.getElementById('table');
    this.archivedTable = document.getElementById('archivedTable');
    this.addTodoForm = new AddTodo();
    this.modal = new Modal();
    this.filters = new Filters();

    this.addTodoForm.onClick((title, description) => this.addTodo(title, description));
    this.modal.onClick((id, values) => this.editTodo(id, values));
    this.filters.onClick((filters) => this.filter(filters));
  }

  setModel(model) {
    this.model = model;
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));

    const archivedTodos = this.model.archivedTodos;
    archivedTodos.forEach((todo) => this.createArchivedRow(todo));
  }

  filter(filters) {
    const { type, words } = filters;
    const [, ...rows] = this.table.getElementsByTagName('tr');
    for (const row of rows) {
      const [title, description, completed] = row.children;
      let shouldHide = false;

      if (words) {
        shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
      }

      const shouldBeCompleted = type === 'completed';
      const isCompleted = completed.children[0].checked;

      if (type !== 'all' && shouldBeCompleted !== isCompleted) {
        shouldHide = true;
      }

      if (shouldHide) {
        row.classList.add('d-none');
      } else {
        row.classList.remove('d-none');
      }
    }
  }

  addTodo(title, description) {
    const todo = this.model.addTodo(title, description);
    this.createRow(todo);
  }

  toggleCompleted(id) {
    const confirmArchive = confirm("¿Deseas archivar esta tarea?");
    if (confirmArchive) {
      this.model.archiveTodo(id);
      document.getElementById(id).remove();
      const archivedTodo = this.model.archivedTodos.find(todo => todo.id === id);
      this.createArchivedRow(archivedTodo);
    }
  }

  editTodo(id, values) {
    this.model.editTodo(id, values);
    const row = document.getElementById(id);
    row.children[0].innerText = values.title;
    row.children[1].innerText = values.description;
    row.children[2].children[0].checked = values.completed;
  }

  removeTodo(id) {
    this.model.removeTodo(id);
    document.getElementById(id).remove();
  }

  archiveTodo(id) {
    const confirmArchive = confirm("¿Deseas archivar esta tarea?");
    if (confirmArchive) {
      this.model.archiveTodo(id);
      document.getElementById(id).remove();
      const archivedTodo = this.model.archivedTodos.find(todo => todo.id === id);
      this.createArchivedRow(archivedTodo);
    }
  }

  restoreTodo(id) {
    const confirmRestore = confirm("¿Deseas restaurar esta tarea?");
    if (confirmRestore) {
      this.model.restoreTodo(id);
      document.getElementById(`archived-${id}`).remove();
      const restoredTodo = this.model.getTodos().find(todo => todo.id === id);
      this.createRow(restoredTodo);
    }
  }

  createRow(todo) {
    const row = this.table.insertRow();
    row.setAttribute('id', todo.id);
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="text-center"></td>
      <td class="text-right"></td>
    `;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onclick = () => this.archiveTodo(todo.id);
    row.children[2].appendChild(checkbox);

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-primary', 'mb-1');
    editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
    editBtn.setAttribute('data-toggle', 'modal');
    editBtn.setAttribute('data-target', '#modal');
    editBtn.onclick = () => this.modal.setValues({
      id: todo.id,
      title: row.children[0].innerText,
      description: row.children[1].innerText,
      completed: row.children[2].children[0].checked,
    });
    row.children[3].appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = () => this.removeTodo(todo.id);
    row.children[3].appendChild(removeBtn);
  }

  createArchivedRow(todo) {
    const row = this.archivedTable.insertRow();
    row.setAttribute('id', `archived-${todo.id}`);
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td class="text-right"></td>
    `;

    const restoreBtn = document.createElement('button');
    restoreBtn.classList.add('btn', 'btn-secondary');
    restoreBtn.innerText = 'Restaurar';
    restoreBtn.onclick = () => this.restoreTodo(todo.id); // Llamada a restoreTodo con función flecha
    row.children[2].appendChild(restoreBtn);
  }
}
