// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/themes/dark.css';
import Notiflix from 'notiflix';

Notiflix.Report.init({
  className: 'notiflix-report',
  width: '200px',
  backgroundColor: '#f8f8f8',
  borderRadius: '25px',
  rtl: false,
  zindex: 4002,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  backOverlayClickToClose: false,
  fontFamily: 'Quicksand',
  svgSize: '60px',
  plainText: true,
  titleFontSize: '16px',
  titleMaxLength: 34,
  messageFontSize: '13px',
  messageMaxLength: 400,
  buttonFontSize: '14px',
  buttonMaxLength: 34,
  cssAnimation: true,
  cssAnimationDuration: 360,
  cssAnimationStyle: 'fade', // 'fade' - 'zoom'

  failure: {
    svgColor: '#ff5549',
    titleColor: '#1e1e1e',
    messageColor: '#242424',
    buttonBackground: '#ff5549',
    buttonColor: '#fff',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
});

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const calendar = document.querySelector('#datetime-picker');

const timerValue = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;

/////////////////////////////////////////////////////////

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = true;
      Notiflix.Report.failure(
        'Error',
        'Please choose data in the future',
        'Cancel'
      );
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        changeTimer(selectedDates[0]);
      });
    }
  },
};

flatpickr(calendar, options);

function changeTimer() {
  let timer = setInterval(() => {
    let countdown = new Date(calendar.value) - new Date();
    startBtn.disabled = true;
    calendar.disabled = true;
    console.log(countdown);
    if (countdown >= 0) {
      let timerData = convertMs(countdown);
      timerValue.days.textContent = timerData.days;
      timerValue.hours.textContent = timerData.hours;
      timerValue.minutes.textContent = timerData.minutes;
      timerValue.seconds.textContent = timerData.seconds;
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
