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
    const item = {name: name, price: price, qty: 1}
    cart.push(item)
}

function showItems(){
    console.log(`You have ${cart.length} items in your cart.`)
    for (let i = 0; i < cart.length; i++){
        console.log(cart[i])
    }
}
addItem('apple', 0.99)
addItem('we', 999.99)
showItems()