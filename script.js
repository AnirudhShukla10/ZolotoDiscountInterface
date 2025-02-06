const prices = {
    "8MM": 518,
    "10MM": 518,
    "15MM": 734,
    "20MM": 1163,
    "25MM": 2829,
    "32MM": 4061,
    "40MM": 8602,
    "50MM": 14784,
    "65MM": 22969,
    "80MM": 22969,
    "100MM": 22969
};
const sizeSelect = document.getElementById("size");
const calculatePriceButton = document.getElementById("calculate-price");
const originalPriceDisplay = document.getElementById("original-price");
const applyDiscountsButton = document.getElementById("apply-discounts");
const finalPriceDisplay = document.getElementById("final-price");
const discountBreakdown = document.getElementById("discount-breakdown");
const addToCartButton = document.getElementById("add-to-cart");
const cartItemsList = document.getElementById("cart-items");

let originalPrice = 0;
let finalPrice = 0;

// Calculate original price
calculatePriceButton.addEventListener("click", () => {
    originalPrice = prices[sizeSelect.value];
    originalPriceDisplay.textContent = `Original Price: ₹${originalPrice}`;
    finalPriceDisplay.textContent = "";
    discountBreakdown.innerHTML = "";
});

// Apply discounts
applyDiscountsButton.addEventListener("click", () => {
    let discountedPrice = originalPrice;
    let breakdown = `<p><strong>Original Price:</strong> ₹${originalPrice.toFixed(2)}</p>`;

    function applyDiscount(id, percentage) {
        if (document.getElementById(id).checked) {
            let discountAmount = discountedPrice * (percentage / 100);
            discountedPrice -= discountAmount;
            breakdown += `<p><strong>${id.replace(/-/g, ' ').toUpperCase()} (${percentage}%):</strong> -₹${discountAmount.toFixed(2)} (New Price: ₹${discountedPrice.toFixed(2)})</p>`;
        }
    }
    applyDiscount("special-trade-discount", 5);
    applyDiscount("project-discount", 5);
    applyDiscount("tod-discount", 5);
    applyDiscount("target-sales-discount", 25);
    if (document.getElementById("gst").checked) {
        let gstAmount = discountedPrice * 0.18;
        discountedPrice += gstAmount;
    }
    discountBreakdown.innerHTML = breakdown;
    finalPrice = discountedPrice;
    finalPriceDisplay.textContent = `Final Price: ₹${finalPrice.toFixed(2)}`;
});
addToCartButton.addEventListener("click", () => {
    cartItemsList.innerHTML += `<tr><td>FORGED BRASS BALL VALVE</td><td>${sizeSelect.value}</td><td>₹${finalPrice.toFixed(2)}</td></tr>`;
});
