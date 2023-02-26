import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  btnStart: document.querySelector('button[data-start]'),
};

refs.btnStart.disabled = true;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0] - options.defaultDate < 0
      ? Report.failure('Error', 'Please choose a date in the future.', 'Okay')
      : (refs.btnStart.disabled = false);
    selectedDate = selectedDates[0];
    refs.btnStart.addEventListener('click', onStartTimer);
  },
};

flatpickr('#datetime-picker', options);

function onStartTimer() {
  const timerId = setInterval(() => {
    refs.btnStart.disabled = true;

    const deltaTime = selectedDate - Date.now();

    updateTimerInterface(convertMs(deltaTime));

    if (deltaTime < 1000) {
      Report.info('Info', "Let's go!", 'Okay');
      clearInterval(timerId);
      refs.btnStart.disabled = false;
    }
  }, 1000);
}

function updateTimerInterface(time) {
  refs.days.textContent = time.days;
  refs.hours.textContent = time.hours;
  refs.minutes.textContent = time.minutes;
  refs.seconds.textContent = time.seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}
