document.addEventListener("DOMContentLoaded", () => {
    loadCart();
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTable = document.querySelector("#cart-table tbody");
    const cartTotal = document.getElementById("cart-total");
    cartTable.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let row = document.createElement("tr");

        let price = parseFloat(item.price.replace("$", ""));
        let totalItemPrice = price * item.quantity;
        total += totalItemPrice;

        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}"> ${item.name}</td>
            <td>${item.price}</td>
            <td>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                data-index="${index}" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>$${totalItemPrice.toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeItem(${index})">X</button></td>
        `;

        cartTable.appendChild(row);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
