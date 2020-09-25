import data from './data.js'

const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
const itemsContainer = document.getElementById('items')

for (let i=0; i<data.length; ++i){
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    let img = document.createElement('img');
    img.src = data[i].image
    img.width = 300
    img.height = 300
    newDiv.appendChild(img)

    let desc = document.createElement('P')
    desc.innerText = data[i].desc
    newDiv.appendChild(desc)

    let price =document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    let button = document.createElement('button')
    button.id = data[i].name
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)

    itemsContainer.appendChild(newDiv)
}

const cart = [ ]

//Handle Change events on update input
itemList.onchange = function(e){
    if (e.target && e.target.classList.contains('update')){
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
}

//Handle clicks on list
itemList.onclick = function(e){
    // console.log("Clicked List!")
    // console.log(e.target)
    if (e.target && e.target.classList.contains('remove')){
        const name = e.target.dataset.name
        removeItem(name)
    } else if (e.target && e.target.classList.contains('add-one')){
        const name = e.target.dataset.name
        addItem(name)
    } else if (e.target && e.target.classList.contains('remove-one')){
        const name = e.target.dataset.name
        removeItem(name, 1)
    }
}

//Adds item to cart
function addItem(name, price){
    console.log("--> addItem function called")
    for (let i = 0; i < cart.length; i++){
        if (cart[i].name === name){
            cart[i].qty++
            console.log("--> add 1")
            showCart()
            return
        }
    }
    const item = {name, price, qty: 1}
    console.log("--> item:",item)
    cart.push(item)
    console.log("--> cart:",cart)
    showCart()
}

//Remove item from cart
function removeItem(name, qty = 0){
    for (let i = 0; i < cart.length; i++){
        if (cart[i].name === name){
            if (qty > 0) {
                cart[i].qty--
            }
            if (cart[i].qty < 1 || qty === 0){
                cart.splice(i, 1)
            }
            showCart()
            return
        }
    }
}

function updateCart(name,qty) {
    for (let i = 0; i < cart.length; i++){
        if (cart[i].name === name){
            if (qty < 1) {
                cart[i].qty--
            }
            else if (qty === 1) {
                cart[i].qty++
            }
            else{
                cart[i].qty = qty
            }
            if (cart [i].qty < 1){
                removeItem(name)
            }
            showCart()
            return
        }
    }
}

//Shows contents of cart
const all_items_button = Array.from(document.querySelectorAll("button"))
//console.log(all_items_button)
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    // addItem function called multiple times problem here?
    // console.log("--> click!")
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    //showCart()
  }))

function showCart(){
    console.log(`You have ${getQty()} items in your cart.`)
    cartQty.innerHTML = `You have ${getQty()} items in your cart.`

    let itemStr = ''
    for (let i = 0; i < cart.length; i++){
        //console.log(` - ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        const {name, price, qty} = cart[i]
        itemStr += `<li>
            ${name} $${price} x ${qty} = $${qty * price}
            <button class="remove" data-name="${name}">Remove</button>
            <button class="add-one" data-name="${name}"> + </button>
            <button class="remove-one" data-name="${name}"> - </button>
            <input class="update" type="number" data-name="${name}">
        </li>`
    }

    itemList.innerHTML = itemStr
    
    //console.log(`Total in cart $${getTotal()}`)
    cartTotal.innerHTML = `Total in cart $${getTotal()}`
}

//Calculate qty
function getQty(){
    let qty = 0
    for (let i = 0; i < cart.length; i++){
        qty += cart[i].qty
    }
    return qty
}

//Calculate total cost
function getTotal(){
    let total = 0
    for (let i = 0; i < cart.length; i++){
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

//test code
// addItem('apple', 0.99)
// addItem('silver', 999.99)
// addItem('silver', 999.99)
// addItem('onion', 2.99)
// addItem('apple', 0.99)
// removeItem('apple', 1)
// removeItem('silver')
showCart()