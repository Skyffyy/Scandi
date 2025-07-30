document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("delete-product-btn").addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(".delete-checkbox:checked");
    checkboxes.forEach(checkbox => {
      checkbox.parentElement.remove();
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const productType = document.getElementById("productType");
  const typeSpecificFields = document.getElementById("type-specific-fields");
  const form = document.getElementById("product_form");
  const message = document.getElementById("message");
  const cancelButton = document.getElementById("cancel-button");

  const existingSKUs = ["JVC200123", "GGWP0007", "TR120555"];

  productType.addEventListener("change", () => {
    const type = productType.value;
    let html = "";

    if (type === "DVD") {
      html = `
        <div class="form-group">
          <label for="size">Size (MB)</label>
          <input type="number" id="size" name="size" required />
          <p class="description">Please, provide size in MB</p>
        </div>`;
    } else if (type === "Book") {
      html = `
        <div class="form-group">
          <label for="weight">Weight (KG)</label>
          <input type="number" id="weight" name="weight" required />
          <p class="description">Please, provide weight in KG</p>
        </div>`;
    } else if (type === "Furniture") {
      html = `
        <div class="form-group">
          <label for="height">Height (CM)</label>
          <input type="number" id="height" name="height" required />
        </div>
        <div class="form-group">
          <label for="width">Width (CM)</label>
          <input type="number" id="width" name="width" required />
        </div>
        <div class="form-group">
          <label for="length">Length (CM)</label>
          <input type="number" id="length" name="length" required />
          <p class="description">Please, provide dimensions in HxWxL format</p>
        </div>`;
    }

    typeSpecificFields.innerHTML = html;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    message.textContent = "";

    const formData = new FormData(form);
    const sku = formData.get("sku").trim();
    const name = formData.get("name").trim();
    const price = formData.get("price").trim();
    const type = formData.get("productType");

    if (!sku || !name || !price || !type) {
      message.textContent = "Please, submit required data";
      return;
    }

    if (existingSKUs.includes(sku)) {
      message.textContent = "SKU must be unique";
      return;
    }

    if (type === "DVD" && !formData.get("size")) {
      message.textContent = "Please, submit required data";
      return;
    }

    if (type === "Book" && !formData.get("weight")) {
      message.textContent = "Please, submit required data";
      return;
    }

    if (type === "Furniture" && (!formData.get("height") || !formData.get("width") || !formData.get("length"))) {
      message.textContent = "Please, submit required data";
      return;
    }

    const numberFields = ["price", "size", "weight", "height", "width", "length"];
    for (const field of numberFields) {
      const value = formData.get(field);
      if (value && isNaN(value)) {
        message.textContent = "Please, provide the data of indicated type";
        return;
      }
    }

    alert("Product saved successfully!");
    window.location.href = "index.html"; 
  });

  cancelButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});