'use strict';
// Data
const account1 = {
  owner: 'Anna Ternova',
  movements: [100, 260, -500, 200, -350, -530, 90, 2000],
  interestRate: 1.3, // %
  pin: 1111,

  movementsDates: [
    '2024-11-01T12:13:43.035Z',
    '2024-11-30T09:49:56.867Z',
    '2024-12-25T07:05:53.907Z',
    '2024-01-25T15:14:16.235Z',
    '2024-02-05T17:23:26.386Z',
    '2025-05-30T15:41:46.374Z',
    '2025-05-31T19:48:59.371Z',
    '2025-06-01T12:02:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  owner: 'John Smith',
  movements: [3000, 5400, -250, -390, -2240, -100, 4500, -70],
  interestRate: 1.4,
  pin: 2222,

  movementsDates: [
    '2024-11-01T13:15:33.035Z',
    '2024-11-30T09:48:16.867Z',
    '2024-12-25T06:04:23.907Z',
    '2024-01-25T14:18:46.235Z',
    '2024-02-05T16:33:06.386Z',
    '2024-04-10T14:43:26.374Z',
    '2024-06-25T18:49:59.371Z',
    '2024-07-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account3 = {
  owner: 'Steven Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.4,
  pin: 3333,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-29T14:11:59.604Z',
    '2025-05-30T17:01:17.194Z',
    '2025-05-31T23:36:17.929Z',
    '2025-06-01T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Cooper',
  movements: [230, 2000, 600, 30, 110],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2024-11-18T21:31:17.178Z',
    '2024-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-05-01T10:17:24.185Z',
    '2024-05-08T14:11:59.604Z',
    '2024-06-27T17:01:17.194Z',
    '2024-07-11T23:36:17.929Z',
    '2024-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.nav--welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerLogin = document.querySelector('.login__container');
const loginForm = document.querySelector('.login');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const nav = document.querySelector('.nav');
const containerBalance = document.querySelector('.balance');

const btnLogin = document.querySelector('.login__btn');
const btnLogout = document.querySelector('.btn--logout');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnModalConfirm = document.querySelector('.modal__btn--confirm');
const btnModalCancel = document.querySelector('.modal__btn--cancel');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const pageLogin = document.querySelector('.page--login');
const pageApp = document.querySelector('.page--app');
const modal = document.querySelector('.modal');
const confirmModalMessage = document.querySelector('.modal__message');
const messageClosed = document.querySelector('.notification--closed');
const overlay = document.querySelector('.overlay');
const notification = document.querySelector('.notification');
const modalContent = document.querySelector('.modal__box');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));
  console.log(combinedMovsDates);
  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

  combinedMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(obj.movement, acc.locale, acc.currency);
    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(outcomes),
    acc.locale,
    acc.currency
  );
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(
    Math.abs(interest),
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  // e.preventDefault();
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;
    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      // Switch pages
      pageLogin.classList.add('active');
      pageApp.classList.remove('active');
      nav.classList.add('nav--hidden'); // to hide
    }
    // Decrese 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 300;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
// Open/Close Modal
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

function showNotification(message) {
  notification.textContent = message;
  notification.classList.remove('hidden'); // reset state
  void notification.offsetWidth; // trigger reflow
  setTimeout(() => notification.classList.add('hidden'), 2000);
}

// Placeholder
const handlePlaceholders = () => {
  if (window.matchMedia('(max-width: 899px)').matches) {
    inputTransferTo.placeholder = 'Send to';
    inputTransferAmount.placeholder = 'Amount';
    inputLoanAmount.placeholder = 'Amount';
    inputCloseUsername.placeholder = 'user';
    inputClosePin.placeholder = 'PIN';
  } else {
    inputTransferTo.placeholder = '';
    inputTransferAmount.placeholder = '';
    inputLoanAmount.placeholder = '';
    inputCloseUsername.placeholder = '';
    inputClosePin.placeholder = '';
  }
};
handlePlaceholders();
window.addEventListener('resize', handlePlaceholders);

///////////////////////////////////////
// Event handlers

/////////////////////////////////////////////////
// Implementing Login
let currentAccount, timer;

// day/ month/ year
// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  // Check if credentials are correct
  //////////////////////////////
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }!`;
    // Scroll to top
    // nav.scrollIntoView({ behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    nav.classList.remove('nav--hidden'); // to show

    // Switch pages
    pageLogin.classList.remove('active');
    pageApp.classList.add('active');

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    // Update UI
    updateUI(currentAccount);
  } else {
    alert('Wrong username or PIN');
  }
});

btnLogout.addEventListener('click', function () {
  // Hide UI
  nav.classList.add('nav--hidden'); // to hide

  // Switch pages
  setTimeout(() => pageLogin.classList.add('active'), 2500);
  pageApp.classList.remove('active');
});

/////////////////////////////////////////////////
// Implementing Transfers
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //Update UI
    updateUI(currentAccount);
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});
let pendingClose = false;

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // Check if credentials are correct
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    pendingClose = true;

    openModal();
    confirmModalMessage.textContent = `Are you sure you want to close the account for ${currentAccount.owner}`;
  } else {
    alert('Wrong username or PIN');
  }
});

btnModalConfirm.addEventListener('click', function (e) {
  e.preventDefault();
  const index = accounts.findIndex(
    acc => acc.username === currentAccount.username
  );
  // Delete account
  accounts.splice(index, 1);
  // Hide UI
  nav.classList.add('nav--hidden'); // to hide
  // Switch pages
  pageApp.classList.remove('active');
  // setTimeout(() => (containerLogin.style.display = 'flex'), 6000);
  setTimeout(() => pageLogin.classList.add('active'), 2500);

  closeModal();
  inputCloseUsername.value = inputClosePin.value = '';
  pendingClose = false;

  // Show animated notification
  showNotification("Account successfully closed. We're sad to see you go 💔");
});

// Close canceling closure
btnModalCancel.addEventListener('click', function () {
  closeModal();
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

// Sort movements
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;

  btnSort.classList.toggle('btn--sort.active');
  this.textContent = this.classList.contains('btn--sort.active')
    ? 'Sorted ↓'.toUpperCase()
    : 'Sort'.toUpperCase();
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

overlay.addEventListener('click', function (e) {
  // Check if the click was outside the modal content
  if (!modalContent.contains(e.target)) {
    closeModal();
  }
});

// TOGGLE
const toggle = document.getElementById('switch');
const body = document.querySelector('.body');
const logo = document.querySelector('.logo');
const loginLogo = document.querySelector('.login-logo');

// Load theme from localStorage (optional but useful)
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');

  toggle.checked = true;
}

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
});
