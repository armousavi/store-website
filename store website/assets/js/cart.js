const cartContainer = document.getElementById('cart');
const totalPriceContainer = document.getElementById('totalPrice');
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const displayCart = () => {
    cartContainer.innerHTML = '';
    let totalPrice = 0;
    const productCount = {};

    cartItems.forEach(item => {
        productCount[item.id] = (productCount[item.id] || 0) + 1;
    });

    Object.keys(productCount).forEach(productId => {
        const product = cartItems.find(item => item.id == productId);
        const count = productCount[productId];
        const itemTotalPrice = product.price * count;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="width: 100px;">
            <div>
                <h3>${product.title}</h3>
                <p>Price: ${product.price} $</p>
                <p>Count: ${count}</p>
                <p>Item Total Price: ${itemTotalPrice} $</p>
                <button onclick="removeFromCart(${product.id})" class="remove-button">Remove</button>
            </div>
            <hr>
        `;
        cartContainer.appendChild(itemDiv);
        totalPrice += itemTotalPrice;
    });

    totalPriceContainer.innerHTML = `Total Price : ${totalPrice} $`;
};

const removeFromCart = (productId) => {
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCart(); 
};

const goBack = () => {
    window.location.href = 'index.html';
};

displayCart();
