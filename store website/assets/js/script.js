const productsContainer = document.getElementById('products');
const categorySelect = document.getElementById('categorySelect');
const goToCartButton = document.getElementById('goToCart');
const cartCount = document.getElementById('cartCount'); 
let allProducts = [];
let cartItems = [];





const displayProducts = (products) => {
    productsContainer.innerHTML = ''; 
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('products');
        productDiv.innerHTML = `
            <h3 class="label">${product.title}</h3>
            <img src="${product.image}" alt="${product.title}" class="img">
            <p class="price">Price: ${product.price} $</p>
            <p class="description">${product.description}</p> 
        `;

        const btn = document.createElement('button');
        btn.innerText = 'Add To Cart';
        btn.onclick = () => addToCart(product); 
        productDiv.append(btn);

        productsContainer.append(productDiv);
    });
};




const addToCart = (product) => {
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    cartCount.innerText = cartItems.length; 
};



const fetchProducts = () => {
    fetch('https://fakestoreapi.com/products')
        .then(response => {
            if (response==true) {
                ('response was not ok');
            }
            return response.json();
        })
        .then(products => {
            allProducts = products;
            displayProducts(allProducts);
        })
        .catch(error => {
            alert('Error products:', error);
        });
};

fetchProducts();


categorySelect.addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    const filteredProducts = [];

    allProducts.forEach(product => {
        if (!selectedCategory || product.category === selectedCategory) {
            filteredProducts.push(product);
        }
    });

    displayProducts(filteredProducts);
});

goToCartButton.onclick = () => {
    window.location.href = 'cart.html';
};

priceFilter.addEventListener('change', (event) => {
    const selectedPriceRange = event.target.value;
    let filteredProducts = allProducts;

    if (selectedPriceRange) {
        const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
        filteredProducts = allProducts.filter(product => {
            const price = parseFloat(product.price);
            return price >= minPrice && price <= maxPrice;
        });
    }

    displayProducts(filteredProducts);
});


function filterProducts() {
    const selectedCategory = categorySelect.value;
    const selectedPriceRange = priceFilter.value;

    let filteredProducts = allProducts;

    if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    if (selectedPriceRange) {
        const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
            const price = parseFloat(product.price);
            return price >= minPrice && price <= maxPrice;
        });
    }

    displayProducts(filteredProducts);
}

categorySelect.addEventListener('change', filterProducts);

goToCartButton.onclick = () => {
    window.location.href = 'cart.html';
};

priceFilter.addEventListener('change', filterProducts);



let d = new Date();
const date = document.getElementsByClassName('time')[0];
date.innerHTML= (d.getHours() +':'+ d.getMinutes());