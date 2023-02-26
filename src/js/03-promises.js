import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const createBtnRef = document.querySelector('button[type="submit"]');
formRef.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(e) {
  const delay = Number(e.target.elements.delay.value);
  const step = Number(e.target.elements.step.value);
  const amount = Number(e.target.elements.amount.value);

  e.preventDefault();
  createBtnRef.disabled = true;

  setTimeout(() => {
    createBtnRef.disabled = false;
  }, delay + step * (amount - 1));

  getPromisesPositions(amount).reduce((delay, position) => {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    return (delay += step);
  }, delay);
  e.currentTarget.reset();
}

function getPromisesPositions(n) {
  const promisesPositions = [];
  for (let i = 1; i <= n; i += 1) {
    promisesPositions.push(i);
  }
  return promisesPositions;
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
