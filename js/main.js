let tabsContainer = document.querySelector("#tabs");

let tabTogglers = tabsContainer?.querySelectorAll("#tabs a");

tabTogglers?.forEach(function (toggler) {
  toggler.addEventListener("click", function (e) {
    e.preventDefault();

    let tabName = this.getAttribute("href");

    let tabContents = document.querySelector("#tab-contents");

    for (let i = 0; i < tabContents.children.length; i++) {
      tabTogglers[i].parentElement.classList.remove(
        "border-r-2",
        "border-red-500"
      );
      tabContents.children[i].classList.remove("hidden");
      if ("#" + tabContents.children[i].id === tabName) {
        continue;
      }
      tabContents.children[i].classList.add("hidden");
    }
    e.target.parentElement.classList.add("border-r-2", "border-red-500");
  });
});

// Get the modal
let modal = document.getElementById("book_consultation_modal");

// Get the button that opens the modal
let btn = document.getElementById("book_consultation");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const paymentForm = document.getElementById("paymentForm");

if (paymentForm) {
  paymentForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const API_BASE_URL = "https://victoria-visa.onrender.com";

    let payloadForCard = {
      first_name: formData.get("paystack_first_name"),
      last_name: formData.get("paystack_last_name"),
      email: formData.get("paystack_email"),
      phone: `+254${parseInt(formData.get("paystack_phone"))}`,
      amount: 200 * 100,
      metadata: {
        custom_fields: [
          {
            display_name: "Message",
            variable_name: "message",
            value: formData.get("paystack_message"),
          },
        ],
        cancel_action: "https://www.victoriavisaconsultants.com",
      },
    };

    const resultElement = document.getElementById("initialize-result");
    resultElement.innerText = ""; // Clear previous results

    try {
      const response = await fetch(`${API_BASE_URL}/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadForCard),
      });

      const result = await response.json();

      document.getElementById("initialize-result").innerText = JSON.stringify(
        result,
        null,
        2
      );
    } catch (error) {
      document.getElementById(
        "initialize-result"
      ).innerText = `Error: ${error.message}`;
      resultElement.classList.remove("text-green-500"); // Change text color for error
      resultElement.classList.add("text-red-500");
    }

    let payloadForMPESA = {
      first_name: formData.get("paystack_first_name"),
      last_name: formData.get("paystack_last_name"),
      email: formData.get("paystack_email"),
      phone: `+254${parseInt(formData.get("paystack_phone"))}`,
      amount: 200 * 100,
      currency: "KES",
      mobile_money: {
        phone: `+254${parseInt(formData.get("paystack_phone"))}`,
        provider: "mpesa",
      },
      metadata: {
        custom_fields: [
          {
            display_name: "Message",
            variable_name: "message",
            value: formData.get("paystack_message"),
          },
        ],
        cancel_action: "https://www.victoriavisaconsultants.com",
      },
    };

    // https://victoria-visa.onrender.com/charge

    // fetch("https://victoria-visa.onrender.com/charge", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then(function (response) {
    //     return response.text();
    //   })
    //   .then(function (sessionId) {
    //     // stripe.redirectToCheckout({ sessionId: sessionId });
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  });
}
