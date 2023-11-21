const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".botones-productos");
const carritoCompras = document.getElementById('resumenCarrito')
const header = document.getElementById("header");
const divProductos = document.querySelector('.container')
const btn = document.getElementById('btnVaciarCarrito')
const btnFinalizar = document.getElementById('btnFinalizar')
let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
let total = localStorage.getItem('precioTotal') ? JSON.parse(localStorage.getItem('precioTotal')) : 0;
let contadorProductos = localStorage.getItem('contadorProductos') ? JSON.parse(localStorage.getItem('contadorProductos')) : 0;
let consumoProductos = []


function cargarProductos() {
    fetch('/productos.json')
        .then((res) => res.json())
        .then((data) => {
            consumoProductos = data
            console.log(consumoProductos);
            consumoProductos.forEach((producto) => {
                divProductos.innerHTML += `
        <div class="card">
                    <div class="imgBx">
                        <img src="${producto.imagen}" alt="nike-air-shoe">
                    </div>    
                    <div class="contentBx">    
                        <h4>${producto.nombre}</h4>    
                        <h5>$${producto.precio}</h5>                   
                    <button onclick='agregarAlCarrito (${JSON.stringify(producto)})'>Agregar al carrito</button>  
                    </div>    
                </div> 
        `;
            })
        })

    detalleCarrito()
}

cargarProductos();


 function agregarAlCarrito(producto) {   
 
    const productoEnCarrito = carrito.find(item => item.id === producto.id);
    console.log(productoEnCarrito);
    contadorProductos++
    total += producto.precio;
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;

    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('precioTotal', JSON.stringify(total));
    localStorage.setItem('contadorProductos', JSON.stringify(contadorProductos));
    btn.style.display = 'block'
    btnFinalizar.style.display = 'block'   
  
    actualizoStock(producto)
    detalleCarrito();
}

function actualizoStock (producto){
    producto.stock--;   
    divProductos.innerHTML=""
    consumoProductos.forEach((producto) => {
        divProductos.innerHTML += `
            <div class="card">
                <div class="imgBx">
                    <img src="${producto.imagen}" alt="nike-air-shoe">
                </div>    
                <div class="contentBx">    
                    <h4>${producto.nombre}</h4>    
                    <h5>$${producto.precio}</h5>                   
                    <button onclick='agregarAlCarrito(${JSON.stringify(producto)})'>Agregar al carrito</button>  
                </div>    
            </div> 
        `;
    });
}
   



function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    localStorage.removeItem('precioTotal');
    localStorage.removeItem('contadorProductos');
    carritoCompras.innerHTML = ""
    total = 0
    contadorProductos = 0
    btn.style.display = 'none'
    btnFinalizar.style.display = 'none'
    detalleCarrito()
}


function detalleCarrito() {
    const div = document.createElement("div");
    if (carrito.length == 0) {
        btn.style.display = 'none'
        btnFinalizar.style.display = 'none'
        div.innerHTML = `<h6> No hay productos seleccionados`;
    } else {

        div.innerHTML = `<h6> Total: $ ${total}</h6>`;
    }
    carritoCompras.innerHTML = "";
    carrito.forEach(element => {
        carritoCompras.innerHTML += `
            <h6>${element.nombre} - Cantidad: ${element.cantidad}</h6>
        `;

    });


    carritoCompras.append(div);
}


async function finalizarCompra() {
    let apellido, nombre, email;

    const { value: formValues } = await Swal.fire({
        title: "Datos de compra",
        html: `
            <h6>Cantidad de productos: ${contadorProductos}</h6>
            <h6>Total: $ ${total}</h6>
            <input placeholder="Apellido" id="swal-input1" class="swal2-input">
            <input placeholder="Nombre" id="swal-input2" class="swal2-input">
            <input placeholder="E-mail" id="swal-input3" class="swal2-input">        
            <h6 id="custom-message"></h6>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            apellido = document.getElementById("swal-input1").value;
            nombre = document.getElementById("swal-input2").value;
            email = document.getElementById("swal-input3").value;

            if (apellido && nombre && email) {
                return [apellido, nombre, email];
            } else {
                document.getElementById("custom-message").innerText = "Por favor, completa todos los campos.";
                return false;
            }
        }
    });

    if (formValues) {
        Swal.fire({
            title: "COMPRA EXITOSA",
            html: `<p>APELLIDO: ${apellido}</p>
            <p> NOMBRE: ${nombre}</p>
            <p> E-MAIL: ${email}</p>
            <p>Recibirá en su casilla la información para realizar el pago</p>`,
            icon: "success",
            confirmButtonText: 'Aceptar',
        });
        vaciarCarrito();
    }
}
