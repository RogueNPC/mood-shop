import data from './data.js'

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

function addItem(name, price){
    for (let i = 0; i < cart.length; i++){
        if (cart[i].name === name){
            cart[i].qty++
            return
        }
    }
    const item = {name, price, qty: 1}
    cart.push(item)
}

function showCart(){

    console.log(`You have ${getQty()} items in your cart.`)

    for (let i = 0; i < cart.length; i++){
        console.log(` - ${cart[i].name} ${cart[i].price} x ${cart[i].qty}`)
    }


    console.log(`Total in cart $${getTotal()}`)
}

function getQty(){
    let qty = 0
    for (let i = 0; i < cart.length; i++){
        qty += cart[i].qty
    }
    return qty
}

function getTotal(){
    let total = 0
    for (let i = 0; i < cart.length; i++){
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

addItem('apple', 0.99)
addItem('weed', 999.99)
addItem('weed', 999.99)
addItem('onion', 2.99)
addItem('apple', 0.99)
showCart()