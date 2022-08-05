import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const keyOfLocalStorage = "videoplayer-current-time";

// Створюємо ф-ю, яка для кожної події зберігатиме новий час у сховищі:
const timeUpDate = (event) => {
    localStorage.setItem(keyOfLocalStorage, event.seconds);
};
// Виводимо час відтворення:
const playbackTime = localStorage.getItem(keyOfLocalStorage);
console.log(playbackTime);
// Відтворюємо відео зі збереженої позиції часу відтворення:
if(playbackTime > 0) {
    player.setCurrentTime(playbackTime)
    .catch(function(error) {
      switch (error.name) {
          case 'RangeError':
              break;
          default:
              break;
      }
  });
}
// Реалізовуємо подію timeupdate та підключаємо throttle:
player.on('timeupdate', throttle(timeUpDate, 1000));