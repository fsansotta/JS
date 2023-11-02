const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".botones-productos");
const carritoCompras = document.getElementById('resumenCarrito')
const header = document.getElementById("header");
let total = 0
let carrito = [];

const productosArray = [
    { id: 1, nombre: "Titular 2023", precio: 45000, imagen: "./imagenes/camisetas/PU771561-02-1.jpg" },
    { id: 2, nombre: "Suplente 2023", precio: 40000, imagen: "./imagenes/camisetas/PU771554-01-1.jpg" },
    { id: 3, nombre: "Suplente 2021", precio: 30000, imagen: "./imagenes/camisetas/PU_759748-01-1.jpg" },
    { id: 4, nombre: "Titular 94", precio: 38000, imagen: "./imagenes/camisetas/Captura de pantalla 2023-10-29 184028.png" },
    { id: 5, nombre: "Suplente 2016", precio: 20000, imagen: "./imagenes/camisetas/56cbaa88951af-360117-500x500.jpg" },
    
]


function cargarProductos() {
    productosArray.forEach(producto => {

        const div = document.createElement("div")
        div.classList.add("producto");
        div.innerHTML += ` <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.nombre}</h3>
            <p class="producto-precio">${producto.precio}</p>
            <button type="button" class="btn btn-danger" onclick="agregarAlCarrito(${producto.id})">AGREGAR AL CARRITO</button>
        </div>
        `;

        contenedorProductos.append(div);

    })

}

cargarProductos();


function agregarAlCarrito(id) {
    const producto = productosArray.find(item => item.id === id);
    total += producto.precio;
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarIcono();
    detalleCarrito();
}



function mostrarIcono() {
    if (carrito.length > 0) {
        header.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
`
    }
    else {
        header.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>`
    }
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    mostrarIcono();
    carritoCompras.innerHTML = ""
    total = 0
}


function detalleCarrito() {    
    carritoCompras.innerHTML = "";
    carrito.forEach(element => {
        carritoCompras.innerHTML += `
    <h6>${element.nombre}</h6>
   
    `
    });
    
    const div = document.createElement("div")
    div.innerHTML=`<h6> Total: $ ${total}</h6>`
    carritoCompras.append(div);
}


