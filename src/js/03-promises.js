const refs = {
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  createPromisesBtn: document.querySelector('button[type=submit]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(e) {
  e.preventDefault();
  const delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);
  createPromisesNumbers(amount).reduce((acc, promise) => {
    createPromise(promise, acc)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    return (acc += step);
  }, delay);
  e.currentTarget.reset();
}

function createPromisesNumbers(n) {
  const promisesNumbers = [];
  for (i = 1; i <= n; i += 1) {
    promisesNumbers.push(i);
  }
  return promisesNumbers;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      setTimeout(() => resolve({ position, delay }), delay);
    } else {
      setTimeout(() => reject({ position, delay }), delay);
    }
  });
}
