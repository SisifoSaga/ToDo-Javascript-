import Alert from './alert.js';

export default class AddTodo {
  // Constructor de la clase que inicializa los elementos de interfaz de usuario.
  constructor() {
    // Referencia al botón para añadir una nueva tarea.
    this.btn = document.getElementById('add');
    // Referencias a los campos de entrada de título y descripción.
    this.title = document.getElementById('title');
    this.description = document.getElementById('description');
    // Instancia de la clase Alert para mostrar mensajes de error.
    this.alert = new Alert('alert');
  }

  /**
   * Método onClick - Configura el evento de clic del botón para añadir una tarea.
   * @param {Function} callback - Función a ejecutar cuando se hace clic en el botón.
   */
  onClick(callback) {
    this.btn.onclick = () => {
      // Si el título o la descripción están vacíos, muestra un mensaje de alerta.
      if (this.title.value === '' || this.description.value === '') {
        this.alert.show('Title and description are required');
      } else {
        // Oculta la alerta y ejecuta el callback con los valores del título y la descripción.
        this.alert.hide();
        callback(this.title.value, this.description.value);
      }
    };
  }
}
