import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';

const startBtn = document.querySelector('[data-start]');
const calendar = document.querySelector('#datetime-picker');
// console.log(calendar);
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0].getTime() < Date.now()) {
      window.alert('Please choose date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        changeTimer(selectedDates[0]);
      });
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function changeTimer() {
  let timer = setInterval(() => {
    let ms = new Date(calendar.value) - new Date();

    if (ms >= 0) {
      timerDays.textContent = convertMs(ms).days;
      timerHours.textContent = convertMs(ms).hours;
      timerMinutes.textContent = convertMs(ms).minutes;
      timerSeconds.textContent = convertMs(ms).seconds;
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(calendar, options);
