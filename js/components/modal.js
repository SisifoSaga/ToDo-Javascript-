import Alert from './alert.js';

export default class Modal {
  // Constructor que inicializa los elementos del modal.
  constructor() {
    this.title = document.getElementById('modal-title');
    this.description = document.getElementById('modal-description');
    this.btn = document.getElementById('modal-btn');
    this.completed = document.getElementById('modal-completed');
    this.alert = new Alert('modal-alert');
    this.todo = null;
  }

  /**
   * Método setValues - Configura los valores del modal con los datos de una tarea.
   * @param {Object} todo - Objeto tarea con propiedades de title, description y completed.
   */
  setValues(todo) {
    this.todo = todo;
    this.title.value = todo.title;
    this.description.value = todo.description;
    this.completed.checked = todo.completed;
  }

  /**
   * Método onClick - Configura el evento clic del botón del modal.
   * @param {Function} callback - Función que recibe los valores editados de la tarea.
   */
  onClick(callback) {
    this.btn.onclick = () => {
      // Verifica si el título y la descripción están completos.
      if (!this.title.value || !this.description.value) {
        this.alert.show('Title and description are required');
        return;
      }
      $('#modal').modal('toggle');
      callback(this.todo.id, {
        title: this.title.value,
        description: this.description.value,
        completed: this.completed.checked,
      });
    };
  }
}
