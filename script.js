// 1. Selecting HTML Elements
const timeElement = document.getElementById('time'); // return object
const countdownElement = document.getElementById('countdown');
const toast = document.getElementById('toast');
const timezoneSelect = document.getElementById('timezoneSelect');


// 2. Global variables
let countdownValue = 0;
let countdownInterval;

//3. Displaying the Current Time in the Selected Timezone
function updateTime() {
    const selectedTimezone = timezoneSelect.value;
    const options = { timeZone: selectedTimezone, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    timeElement.innerText = new Intl.DateTimeFormat('en-US', options).format(new Date());
    //it is used to format the date and time for a given timezone (ex: saigon / nyork).
}

// 4. Setting the Countdown Timer

function setCountdown() {
    const hours = parseInt(document.getElementById('hours').value) || 0; // return interger
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    countdownValue = hours * 3600 + minutes * 60 + seconds;
    countdownElement.innerText = `Countdown: ${countdownValue}`;
}
// 6. Displaying a Toast Notification

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// 5. Starting and Running the Countdown

function startCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        if (countdownValue > 0) {
            countdownValue--;
            countdownElement.innerText = `Countdown: ${countdownValue}`;
        } else {
            clearInterval(countdownInterval);
            showToast();
        }
    }, 1000);
}


// 7. Event Listeners

timezoneSelect.addEventListener('change', updateTime);
document.getElementById('setCountdown').addEventListener('click', setCountdown);
document.getElementById('start').addEventListener('click', startCountdown);
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') countdownValue++;
    if (e.key === 'ArrowDown' && countdownValue > 0) countdownValue--;
    countdownElement.innerText = `Countdown: ${countdownValue}`;
});

setInterval(updateTime, 1000);
updateTime();
