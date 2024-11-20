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

// const popup = new Paystack();

// popup.checkout({
//   key: "pk_domain_xxxxxx",
//   email: "allistermugaisi@gmail.com",
//   amount: 100,
//   onSuccess: (transaction) => {
//     console.log(transaction);
//   },
//   onLoad: (response) => {
//     console.log("onLoad: ", response);
//   },
//   onCancel: () => {
//     console.log("onCancel");
//   },
//   onError: (error) => {
//     console.log("Error: ", error.message);
//   },
// });

const popup = new Paystack();

const onElementsMount = (elements) => {
  if (elements && elements.applePay) {
    document.querySelector("#pay-button").innerText = "More Payment Options";
  }
};

async function payWithPaystack() {
  try {
    await popup.paymentRequest({
      key: "pk_domain_xxxxxx",
      email: "testuser@paystack.com",
      amount: 10000,
      currency: "NGN",
      container: "payment-request-buttons",
      loadPaystackCheckoutButton: "pay-button",
      styles: {
        theme: "dark",
        applePay: {
          width: "100%",
          height: "50px",
          borderRadius: "3px",
          type: "plain",
          locale: "en",
        },
      },
      onElementsMount,
    });
  } catch (error) {}
}
