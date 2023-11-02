const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".botones-productos");
const carritoCompras = document.getElementById('resumenCarrito')
const header = document.getElementById("header");
const divProductos = document.querySelector('.container')
const btn = document.getElementById('btnVaciarCarrito')
let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
let total = localStorage.getItem('precioTotal') ? JSON.parse(localStorage.getItem('precioTotal')) : 0;


const productosArray = [
    { id: 1, nombre: "Titular 2023", precio: 45000, imagen: "./imagenes/IMG-20231031-WA0194.png" },
    { id: 2, nombre: "Suplente 2023", precio: 40000, imagen: "./imagenes/IMG-20231031-WA0195.png" },
    { id: 3, nombre: "Suplente 2021", precio: 30000, imagen: "./imagenes/IMG-20231031-WA0192.png" },
    { id: 4, nombre: "Titular 94", precio: 38000, imagen: "./imagenes/IMG-20231031-WA0193.png" },
    { id: 5, nombre: "Suplente 2016", precio: 20000, imagen: "./imagenes/IMG-20231031-WA0196.png" },
    
]


function cargarProductos() {
    productosArray.forEach(producto => {      
        divProductos.innerHTML += `
        <div class="card">
                    <div class="imgBx">
                        <img src="${producto.imagen}" alt="nike-air-shoe">
                    </div>    
                    <div class="contentBx">    
                        <h4>${producto.nombre}</h4>    
                        <h5>$${producto.precio}</h5>                        
                        <button onclick='agregarAlCarrito (${producto.id})'>Agregar al carrito</button>
                    </div>    
                </div>
        `;    
    })
    detalleCarrito()
}

cargarProductos();


function agregarAlCarrito(id) {
    const producto = productosArray.find(item => item.id === id);
    const productoEnCarrito = carrito.find(item => item.id === id);
    total += producto.precio;
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    localStorage.setItem('precioTotal', JSON.stringify(total)); 
    btn.style.display='block'
    detalleCarrito();
}


function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');  
    localStorage.removeItem('precioTotal');  
    carritoCompras.innerHTML = ""
    total = 0
    btn.style.display='none'
    detalleCarrito()
}


function detalleCarrito() {    
    carritoCompras.innerHTML = "";
    carrito.forEach(element => {
        carritoCompras.innerHTML += `
            <h6>${element.nombre} - Cantidad: ${element.cantidad}</h6>
        `;
    });

    const div = document.createElement("div");
    div.innerHTML = `<h6> Total: $ ${total}</h6>`;
    carritoCompras.append(div);
   }