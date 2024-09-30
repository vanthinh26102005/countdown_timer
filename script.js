// 1. Selecting HTML Elements
// Input: Fetching references to the necessary DOM elements for the countdown timer and toast notification system.
const timeElement = document.getElementById('time');            // Displaying the current time
const countdownElement = document.getElementById('countdown');  // Displaying the countdown value
const toast = document.getElementById('toast');                 // Toast notification element
const timezoneSelect = document.getElementById('timezoneSelect'); // Dropdown for selecting timezones

// 2. Global Variables
// Input: These are global values used throughout the countdown timer system.
let countdownValue = 0;   // Holds the current countdown value in seconds
let countdownInterval;    // Stores the reference to the interval controlling the countdown

// 3. Displaying the Current Time in the Selected Timezone
/**
 * Input: The selected timezone from the dropdown.
 * Process: Formats and displays the current time in the selected timezone using `Intl.DateTimeFormat`.
 * Output: Updates the `timeElement` on the page with the formatted time.
 */
function updateTime() {
    // Input: Selected timezone from the dropdown
    const selectedTimezone = timezoneSelect.value;
    
    // Process: Format the current time according to the selected timezone.
    const options = { 
        timeZone: selectedTimezone, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    
    // Output: Update the time element to show the formatted time.
    timeElement.innerText = new Intl.DateTimeFormat('en-US', options).format(new Date());
}

// 4. Setting the Countdown Timer
/**
 * Input: The user-provided hours, minutes, and seconds from the input fields.
 * Process: Converts the time inputs into a total value in seconds and sets the countdown value.
 * Output: Displays the total countdown value in the `countdownElement`.
 */
function setCountdown() {
    // Input: Fetching the time values from user input fields and converting to integers.
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    // Process: Calculate the total countdown time in seconds.
    countdownValue = hours * 3600 + minutes * 60 + seconds;
    
    // Output: Display the calculated countdown value.
    countdownElement.innerText = `Countdown: ${countdownValue}`;
}

// 5. Starting and Running the Countdown
/**
 * Input: None (triggered by the start button).
 * Process: Starts a countdown that decreases the value every second.
 * Output: Updates the countdown display, and when it reaches zero, shows a toast notification.
 */
function startCountdown() {
    // Input: Ensure any existing countdown is cleared before starting a new one.
    if (countdownInterval) clearInterval(countdownInterval);

    // Process: Start a new interval that runs every second.
    countdownInterval = setInterval(() => {
        // Process: If there is time left, decrease the countdown value and update the display.
        if (countdownValue > 0) {
            countdownValue--;
            countdownElement.innerText = `Countdown: ${countdownValue}`;
        } else {
            // Output: Stop the countdown when it reaches zero and show the toast notification.
            clearInterval(countdownInterval);
            showToast();
        }
    }, 1000);  // The countdown runs every 1000 milliseconds (1 second).
}

// 6. Displaying a Toast Notification
/**
 * Input: None (triggered when countdown reaches zero).
 * Process: Adds the 'show' class to the toast to make it visible, and removes it after 2 seconds.
 * Output: Displays a brief toast notification to the user.
 */
function showToast() {
    // Process: Display the toast by adding the 'show' class.
    toast.classList.add('show');
    
    // Output: Hide the toast after 2 seconds by removing the 'show' class.
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);  // The toast is visible for 2 seconds.
}

// 7. Event Listeners
/**
 * Input: User actions (selecting a timezone, setting the countdown, starting the countdown, or pressing arrow keys).
 * Process: Listens for various user interactions and triggers the corresponding functions.
 * Output: Updates the time display, countdown value, or other elements based on the user's actions.
 */

// Input: When the user changes the timezone selection, update the time display.
timezoneSelect.addEventListener('change', updateTime);

document.getElementById('setCountdown').addEventListener('click', setCountdown);

document.getElementById('start').addEventListener('click', startCountdown);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') countdownValue++;
    
    if (e.key === 'ArrowDown' && countdownValue > 0) countdownValue--;
    
    // Output: Update the countdown display with the new value.
    countdownElement.innerText = `Countdown: ${countdownValue}`;
});

// Set the clock to update the time every second and initialize it on page load.
setInterval(updateTime, 1000);
updateTime();  // Initialize the time display immediately when the page loads.
