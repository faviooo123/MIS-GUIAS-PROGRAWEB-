// ===== Confirmación de "Vaciar pedido" con el modal de Bootstrap =====
document.addEventListener('DOMContentLoaded', () => {
  const btnConfirmar = document.getElementById('confirmarVaciar');
  if (btnConfirmar) {
    btnConfirmar.addEventListener('click', () => {
      if (typeof pedido !== 'undefined') {
        pedido.length = 0; // Vacía el arreglo de jspedido.js
        render();
        anunciar('Se vació el pedido. Total: S/ 0.00.');
      }
    });
  }
});