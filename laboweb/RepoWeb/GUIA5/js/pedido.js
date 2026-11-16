// ===== Estado global del pedido y utilidades =====
const pedido = [];

function soles(monto) {
  return 'S/ ' + monto.toFixed(2);
}

function calcularTotal() {
  return pedido.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}

function anunciar(mensaje) {
  const aviso = document.getElementById('aviso');
  if (aviso) aviso.textContent = mensaje;
}

// ===== Dibujar la lista de productos en el DOM =====
function render() {
  const lista = document.getElementById('lista-pedido');
  const totalTexto = document.getElementById('total');
  const mensajeVacio = document.getElementById('pedido-vacio');
  
  if (!lista) return;
  lista.replaceChildren();

  for (const item of pedido) {
    const li = document.createElement('li');
    li.className = 'd-flex justify-content-between align-items-center py-2 border-bottom';

    const texto = document.createElement('span');
    texto.textContent = `${item.cantidad} × ${item.nombre} · ${soles(item.precio * item.cantidad)}`;

    const quitarBtn = document.createElement('button');
    quitarBtn.type = 'button';
    quitarBtn.className = 'btn btn-sm btn-outline-danger btn-quitar';
    quitarBtn.dataset.nombre = item.nombre;
    quitarBtn.textContent = 'Quitar';
    quitarBtn.setAttribute('aria-label', `Quitar ${item.nombre}`);

    li.append(texto, quitarBtn);
    lista.append(li);
  }

  if (totalTexto) totalTexto.textContent = soles(calcularTotal());
  if (mensajeVacio) mensajeVacio.hidden = pedido.length > 0;
}

// ===== Funciones para agregar y quitar =====
function agregar(nombre, precio) {
  const existente = pedido.find((item) => item.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    pedido.push({ nombre, precio, cantidad: 1 });
  }
  render();
  anunciar(`Se añadió ${nombre}. Total: ${soles(calcularTotal())}.`);
}

function quitar(nombre) {
  const posicion = pedido.findIndex((item) => item.nombre === nombre);
  if (posicion === -1) return;
  pedido.splice(posicion, 1);
  render();
  anunciar(`Se quitó ${nombre}. Total: ${soles(calcularTotal())}.`);
  
  const tituloPedido = document.getElementById('titulo-pedido');
  if (tituloPedido) tituloPedido.focus();
}

// ===== Delegación de eventos al cargar el DOM =====
document.addEventListener('DOMContentLoaded', () => {
  const catalogo = document.querySelector('.catalogo');
  if (catalogo) {
    catalogo.addEventListener('click', (evento) => {
      const boton = evento.target.closest('.btn-anadir');
      if (!boton) return;
      const producto = boton.closest('.producto');
      if (producto) {
        agregar(producto.dataset.nombre, Number(producto.dataset.precio));
      }
    });
  }

  const lista = document.getElementById('lista-pedido');
  if (lista) {
    lista.addEventListener('click', (evento) => {
      const boton = evento.target.closest('.btn-quitar');
      if (!boton) return;
      quitar(boton.dataset.nombre);
    });
  }

  render();
});