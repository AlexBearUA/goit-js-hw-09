import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDate);
    return selectedDate;
  },
};

flatpickr(input, options);
console.log(selectedDate);

// const timer = {
//   start() {
//     const starttime = Date.now();

//     setInterval(() => {
//       const currentTime = Date.now();
//       console.log(currentTime - starttime);
//     }, 1000);
//   },
// };

// console.log(inputData.value);

// timer.start();
