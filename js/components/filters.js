export default class Filters {
  // Constructor que obtiene el formulario de filtros y el botón de búsqueda.
  constructor() {
    this.form = document.getElementById('filters');
    this.btn = document.getElementById('search');
  }

  /**
   * Método onClick - Configura el evento clic del botón de búsqueda.
   * @param {Function} callback - Función a ejecutar cuando se hace clic en el botón.
   */
  onClick(callback) {
    this.btn.onclick = (e) => {
      e.preventDefault();
      // Obtiene los valores de los filtros del formulario.
      const data = new FormData(this.form);
      callback({
        type: data.get('type'),
        words: data.get('words'),
      });
    };
  }
}
