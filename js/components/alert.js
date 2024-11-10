export default class Alert {
  /**
   * Constructor que toma el ID del elemento de alerta en el DOM.
   * @param {string} alertId - ID del elemento de alerta.
   */
  constructor(alertId) {
    // Referencia al elemento de alerta en la interfaz.
    this.alert = document.getElementById(alertId);
  }

  /**
   * Método show - Muestra un mensaje de error en el elemento de alerta.
   * @param {string} message - Mensaje a mostrar en la alerta.
   */
  show(message) {
    this.alert.classList.remove('d-none');
    this.alert.innerText = message;
  }

  // Método hide - Oculta el mensaje de alerta.
  hide() {
    this.alert.classList.add('d-none');
  }
}
