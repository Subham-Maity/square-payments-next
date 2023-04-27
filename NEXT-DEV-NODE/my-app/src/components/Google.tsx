import { Payments } from "square";

const appId = "sandbox-sq0idb-tAWejHTPg022h3j-G00tww";
const locationId = "LB6KD73BNFPA9";

async function createPayment(token: string, verificationToken: string) {
  const body = JSON.stringify({
    locationId,
    sourceId: token,
    verificationToken,
  });

  const paymentResponse = await fetch("/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (paymentResponse.ok) {
    return paymentResponse.json();
  }

  const errorBody = await paymentResponse.text();
  throw new Error(errorBody);
}

async function tokenize(paymentMethod: Square.PaymentMethod) {
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === "OK") {
    return tokenResult.token;
  } else {
    let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
    }

    throw new Error(errorMessage);
  }
}

// Required in SCA Mandated Regions: Learn more at https://developer.squareup.com/docs/sca-overview
async function verifyBuyer(payments: Square.Payments, token: string) {
  const verificationDetails = {
    amount: "1.00",
    billingContact: {
      addressLines: ["123 Main Street", "Apartment 1"],
      familyName: "Doe",
      givenName: "John",
      email: "john.doe@square.example",
      country: "GB",
      phone: "3214563987",
      region: "LND",
      city: "London",
    },
    currencyCode: "GBP",
    intent: "CHARGE",
  };

  const verificationResults = await payments.verifyBuyer(
    token,
    verificationDetails
  );
  return verificationResults.token;
}

// status is either SUCCESS or FAILURE;
function displayPaymentResults(status: "SUCCESS" | "FAILURE") {
  const statusContainer = document.getElementById(
    "payment-status-container"
  ) as HTMLDivElement;
  if (status === "SUCCESS") {
    statusContainer.classList.remove("is-failure");
    statusContainer.classList.add("is-success");
  } else {
    statusContainer.classList.remove("is-success");
    statusContainer.classList.add("is-failure");
  }

  statusContainer.style.visibility = "visible";
}

async function handlePaymentMethodSubmission(
  payments: Square.Payments,
  event: MouseEvent,
  paymentMethod: Square.PaymentMethod
) {
  event.preventDefault();

  try {
    const token = await tokenize(paymentMethod);
    let verificationToken = await verifyBuyer(payments, token);
    const paymentResults = await createPayment(token, verificationToken);
    displayPaymentResults("SUCCESS");

    console.debug("Payment Success", paymentResults);
  } catch (e) {
    displayPaymentResults("FAILURE");
    console.error(e.message);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  if (!window.Square) {
    throw new Error("Square.js failed to load properly");
  }

  let payments: Square.Payments;
  try {
    payments = window.Square.payments(appId, locationId);
  } catch {
    const statusContainer = document.getElementById(
      "payment-status-container"
    ) as HTMLDivElement;
    statusContainer.className = "missing-credentials";
    statusContainer.style.visibility = "visible";
    return;
  }

  try {
    const paymentRequest = payments.paymentRequest({
      countryCode: "US",
      currencyCode: "USD",
      total: {
        amount: "1.00",
        label: "Total",
      },
    });

    const googlePay = await payments.googlePay(paymentRequest);

    await googlePay.attach("#google-pay-button");
    document
      .getElementById("google-pay-button")

      .addEventListener("click", async function (event) {
        await handlePaymentMethodSubmission(payments, event, googlePay);
      });
  } catch (e) {
    console.error("Initializing Google Pay failed", e);
    // There are a number of reason why Google Pay may not be supported
    // (e.g. Browser Support, Device Support, Account). Therefore you should handle
    // initialization failures, while still loading other applicable payment methods.
  }
});
