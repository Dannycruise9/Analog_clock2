const CACHE_NAME = "analog-clock-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/main.js",
  "icons/maskable_icon_x512.png",
  "/icons/icon-512.png",
  "/icons/icon-1024.png",
  "img/clock.png",
  "img/favicon-removebg-preview.png",
  "/sound/ticking.mp3",
  "/sound/alarmbeep.mp3"
];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       if (response) {
//         return response;
//       }
//       return fetch(event.request);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames
//           .filter((cacheName) => cacheName !== CACHE_NAME)
//           .map((cacheName) => caches.delete(cacheName))
//       );
//     })
//   );
// });


// clock and alarm
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const hour = document.querySelector('.hour');
const setAlarmButton = document.getElementById("set-alarm");
const clearAlarmButton = document.getElementById("clear-alarm");
const tickingSound = new Audio("/sound/ticking.mp3");
const alarmAudio = new Audio("/sound/alarmbeep.mp3");
const alarmHourInput = document.querySelector('#alarm-hour');
const alarmMinInput = document.querySelector('#alarm-min');
const amPmInput = document.querySelector('#am-pm');

let alarmHour, alarmMin, amPm;

setInterval (() =>{
    const time = new Date();
    const secDeg = time.getSeconds()/ 60 * 360 -90;
    const hourDeg = time.getHours()/ 12 * 360 -90;
    const minDeg = time.getMinutes()/ 60 * 360 -90;
    sec.style.transform = `rotate(${secDeg}deg)`;
    min.style.transform = `rotate(${minDeg}deg)`;
    hour.style.transform = `rotate(${hourDeg}deg)`;
    checkAlarm(time); // check if alarm should go off
    tickingSound.play(); // play ticking sound every second
},1000);

const alarmForm = document.querySelector('#alarm-form');

alarmForm.addEventListener('submit', (event) => {
  event.preventDefault();
  setAlarm();
});


function setAlarm() {
    alarmHour = parseInt(alarmHourInput.value);
    alarmMin = parseInt(alarmMinInput.value);
    amPm = amPmInput.value;
    
    if (amPm === 'pm' && alarmHour !== 12) {
        alarmHour += 12;
    } else if (amPm === 'am' && alarmHour === 12) {
        alarmHour = 0;
    }
}

function checkAlarm(time) {
    if (time.getHours() === alarmHour && time.getMinutes() === alarmMin && time.getSeconds() === 0) {
      return  alarmAudio.play();
      
    }
}
console.log("alarmAudio"),

setAlarmButton.addEventListener('click', setAlarm);
clearAlarmButton.addEventListener('click', () => {
    alarmHourInput.value = '';
    alarmMinInput.value = '';
    amPmInput.value = 'am';
    alarmHour = null;
    alarmMin = null;
    amPm = null;
    console.log(setAlarmButton)
});