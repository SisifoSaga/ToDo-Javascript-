export default class Model {
  constructor() {
    // Inicialización de las tareas y las tareas archivadas desde localStorage.
    this.view = null;
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.archivedTodos = JSON.parse(localStorage.getItem('archivedTodos')) || [];
    this.currentId = this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 0;
  }

  // Método setView - Asocia la vista con el modelo.
  setView(view) {
    this.view = view;
  }

  // Método save - Guarda las tareas en localStorage.
  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // Método saveArchived - Guarda las tareas archivadas en localStorage.
  saveArchived() {
    localStorage.setItem('archivedTodos', JSON.stringify(this.archivedTodos));
  }

  // Método getTodos - Devuelve una copia de las tareas actuales.
  getTodos() {
    return this.todos.map(todo => ({ ...todo }));
  }

  /**
   * Método findTodo - Encuentra el índice de una tarea específica.
   * @param {number} id - ID de la tarea.
   * @returns {number} - Índice de la tarea en el array.
   */
  findTodo(id) {
    return this.todos.findIndex(todo => todo.id === id);
  }

  /**
   * Método addTodo - Agrega una nueva tarea a la lista.
   * @param {string} title - Título de la tarea.
   * @param {string} description - Descripción de la tarea.
   * @returns {Object} - Nueva tarea creada.
   */
  addTodo(title, description) {
    const todo = { id: this.currentId++, title, description, completed: false };
    this.todos.push(todo);
    this.save();
    return { ...todo };
  }

  /**
   * Método editTodo - Modifica los valores de una tarea existente.
   * @param {number} id - ID de la tarea.
   * @param {Object} values - Nuevos valores de la tarea.
   */
  editTodo(id, values) {
    const index = this.findTodo(id);
    Object.assign(this.todos[index], values);
    this.save();
  }

  /**
   * Método toggleCompleted - Cambia el estado de una tarea a completado o no completado.
   * @param {number} id - ID de la tarea.
   */
  toggleCompleted(id) {
    const index = this.findTodo(id);
    this.todos[index].completed = !this.todos[index].completed;
    this.save();
  }

  /**
   * Método removeTodo - Elimina una tarea de la lista.
   * @param {number} id - ID de la tarea.
   */
  removeTodo(id) {
    const index = this.findTodo(id);
    this.todos.splice(index, 1);
    this.save();
  }

  /**
   * Método archiveTodo - Mueve una tarea a la lista de archivadas.
   * @param {number} id - ID de la tarea a archivar.
   */
  archiveTodo(id) {
    const index = this.findTodo(id);
    const [todo] = this.todos.splice(index, 1);
    this.archivedTodos.push(todo);
    this.save();
    this.saveArchived();
  }

  /**
   * Método restoreTodo - Restaura una tarea desde la lista de archivadas a la lista principal.
   * @param {number} id - ID de la tarea a restaurar.
   */
  restoreTodo(id) {
    const index = this.archivedTodos.findIndex(todo => todo.id === id);
    const [todo] = this.archivedTodos.splice(index, 1);
    this.todos.push(todo);
    this.save();
    this.saveArchived();
  }
}
