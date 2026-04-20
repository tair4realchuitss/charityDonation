const fakeDonateBtn = document.getElementById('fakeDonateBtn');
const paymentModal = document.getElementById('paymentModal');
const paymentCloseBtn = document.getElementById('paymentCloseBtn');
const paymentForm = document.getElementById('paymentForm');
const paymentStep = document.getElementById('paymentStep');
const successStep = document.getElementById('successStep');
const successDoneBtn = document.getElementById('successDoneBtn');

const paymentAmountText = document.getElementById('paymentAmountText');
const paymentButtonAmount = document.getElementById('paymentButtonAmount');
const successAmountText = document.getElementById('successAmountText');

function openPaymentModal() {
  const selectedAmount = window.getSelectedAmount ? window.getSelectedAmount() : 25;

  if (!paymentModal || !paymentAmountText || !paymentButtonAmount || !successAmountText) return;

  paymentAmountText.textContent = `$${selectedAmount}`;
  paymentButtonAmount.textContent = `$${selectedAmount}`;
  successAmountText.textContent = `$${selectedAmount}`;

  if (paymentStep) paymentStep.style.display = 'block';
  if (successStep) successStep.style.display = 'none';

  paymentModal.classList.add('active');
}

function closePaymentModal() {
  if (!paymentModal) return;
  paymentModal.classList.remove('active');
}

window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;

if (fakeDonateBtn) {
  fakeDonateBtn.addEventListener('click', openPaymentModal);
}

if (paymentCloseBtn) {
  paymentCloseBtn.addEventListener('click', closePaymentModal);
}

if (paymentModal) {
  paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
      closePaymentModal();
    }
  });
}

if (paymentForm) {
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const cardName = document.getElementById('cardName');
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCvv = document.getElementById('cardCvv');

    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) return;

    if (
      !cardName.value.trim() ||
      !cardNumber.value.trim() ||
      !cardExpiry.value.trim() ||
      !cardCvv.value.trim()
    ) {
      alert('Please fill in all payment fields.');
      return;
    }

    if (paymentStep) paymentStep.style.display = 'none';
    if (successStep) successStep.style.display = 'block';

    paymentForm.reset();
  });
}

if (successDoneBtn) {
  successDoneBtn.addEventListener('click', closePaymentModal);
}