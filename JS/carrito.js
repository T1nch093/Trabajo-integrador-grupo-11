
//carrito visible
var carritoVisible = false;

//esperamos que se carguen los elementos
if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded",ready)

}

else {
    ready();
}
function ready(){
    //agregamos funcionalidad a los botones eliminar
    var botonesEliminarItem = document.getElementsByClassName('btn-Eliminar');
    for(var i=0; i < botonesEliminarItem.length;i++)
    {
        var button = botonesEliminarItem[i];
        button.addEventListener('click', EliminarItemCarrito);
    }
    //funcionalidad al boton sumar
    var botonesSumarCantindad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0; i < botonesSumarCantindad.length;i++){
        var button = botonesSumarCantindad[i];
        button.addEventListener('click', sumarCantidad);
    }
    var botonesRestarCantindad = document.getElementsByClassName('restar-cantidad');
    for(var i=0; i < botonesRestarCantindad.length;i++){
        var button = botonesRestarCantindad[i];
        button.addEventListener('click', restarCantidad);
    }
    //funcionalidad botones agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i < botonesAgregarAlCarrito.length; i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', Agregaralcarrito);
    }
    
    //boton pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

//elimino el item seleccionado
function EliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    //actualizamos el total del carrito
    actualizarTotalCarrito();
    //Control de elementos en el carrito
    ocultarCarrito();
}
//actualizamos el total del carrito
function actualizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento para actualizar el total
    for( var i=0; i < carritoItems.length; i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElemento);
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es")+ ",00";
}
function ocultarCarrito()
{
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0)
    {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
     //maximizo el contenedor de elemntos

     var items = document.getElementsByClassName('contenedor-items')[0];
     items.style.width = '100%';
    }
 
}
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;    
    //Actualizar total
    actualizarTotalCarrito();
}
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;
    //controlamos que no sea menor que 0
    if(cantidadActual>=0){
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;    
    //Actualizar total
    actualizarTotalCarrito();
    }
}
function Agregaralcarrito(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    //Agregamos el elemento al carrito
    agregarItemAlCarrito(titulo, precio, imagenSrc);

    //Hacer visible el carrito cuando ponemos productos
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

//controlamos que el item no se repita
var nombreItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
for(var i=0; i < nombreItemsCarrito.length; i++){
    if(nombreItemsCarrito[i].innerText==titulo){
        alert("El item ya se encuentra en el carrito");
        return;
    }
}
var itemCarritoContenido = `
<div class="carrito-item">
                 <img src="${imagenSrc}" alt="" width="60px">
                 <div class="carrito-item-detalle">
                    <span class="carrito-item-titulo">${titulo}</span>
                    <div class="selector-cantidad">
                        <i class="fa-solid fa-minus restar-cantidad"></i>
                        <input type="text" value="1" class="carrito-item-cantidad" disabled>
                        <i class="fa-solid fa-plus sumar-cantidad"></i>
                    </div>
                    <span class="carrito-item-precio">${precio}</span>
                </div>
                <span class="btn-Eliminar">
                    <i class="fa-solid fa-trash"></i>
                </span>
             </div>
`
item.innerHTML = itemCarritoContenido;
itemsCarrito.append(item);

//funsion para eliminar nuevos items
item.getElementsByClassName('btn-Eliminar')[0].addEventListener('click', EliminarItemCarrito);
item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click',sumarCantidad);
item.getElementsByClassName('restar-cantidad')[0].addEventListener('click',restarCantidad);
}
function pagarClicked(event){
    alert("gracias por su compra");
    //eliminamos los elementos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';
    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%'
    actualizarTotalCarrito();
}
//boton Contactar
window.addEventListener("load", function(){
    document.getElementById("Contactar").addEventListener("click", function(){
        alert("gracias por contactarnos");
    })
})

