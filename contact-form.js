const contactForm = document.querySelector("#contactForm");
const contactFields = [
  {
    field: document.querySelector("#contactName"),
    requiredMessage: "Podaj imię i nazwisko.",
  },
  {
    field: document.querySelector("#contactPhone"),
    requiredMessage: "Podaj numer telefonu.",
  },
  {
    field: document.querySelector("#contactMessage"),
    requiredMessage: "Napisz, czego potrzebuje Twoje auto.",
  },
];

function validateContactField({ field, requiredMessage }) {
  const value = field.value.trim();
  let message = value ? "" : requiredMessage;

  if (value && field.type === "tel") {
    const phone = value.replace(/[\s-]/g, "");
    if (!/^(?:\+48)?[0-9]{9}$/.test(phone)) {
      message = "Podaj 9 cyfr, opcjonalnie z prefiksem +48. Spacje i myślniki są dozwolone.";
    }
  }

  const error = document.querySelector(`#${field.id}Error`);
  error.textContent = message;
  error.classList.toggle("hidden", !message);
  field.setAttribute("aria-invalid", String(Boolean(message)));
  field.setCustomValidity(message);
  return !message;
}

contactFields.forEach((entry) => {
  entry.field.addEventListener("blur", () => validateContactField(entry));
  entry.field.addEventListener("input", () => {
    if (entry.field.getAttribute("aria-invalid") === "true") {
      validateContactField(entry);
    }
  });
});

contactForm.addEventListener("submit", (event) => {
  const invalidFields = contactFields.filter(
    (entry) => !validateContactField(entry),
  );

  if (invalidFields.length) {
    event.preventDefault();
    invalidFields[0].field.focus();
    return;
  }

  contactFields.forEach(({ field }) => {
    field.value = field.value.trim();
    if (field.type === "tel") field.value = field.value.replace(/[\s-]/g, "");
  });
});

// Use inline errors when JavaScript is available; keep native HTML validation as a fallback.
contactForm.noValidate = true;
