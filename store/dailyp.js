// Product Search Function
function searchProducts() {
    let input = document.getElementById("search-bar").value.toLowerCase();
    let productCards = document.getElementsByClassName("product-card");

    for (let card of productCards) {
        let productName = card.getAttribute("data-name").toLowerCase();
        if (productName.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }
}

// Add to Cart Functionality
document.querySelectorAll(".product-card button").forEach(button => {
    button.addEventListener("click", function() {
        let productCard = this.closest(".product-card");
        let name = productCard.querySelector("h3").textContent;
        let price = productCard.querySelector("p strong").nextSibling.textContent.trim();
        let image = productCard.querySelector("img").src;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} added to cart! 🛒`);
    });
});
