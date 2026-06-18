// ===== DIGITAL WORLD CLOCK =====
// Real-time clock displaying multiple time zones

class WorldClock {
    constructor() {
        this.timezones = [
            { name: 'New York', tz: 'America/New_York', city: 'EST/EDT' },
            { name: 'Los Angeles', tz: 'America/Los_Angeles', city: 'PST/PDT' },
            { name: 'London', tz: 'Europe/London', city: 'GMT/BST' },
            { name: 'Paris', tz: 'Europe/Paris', city: 'CET/CEST' },
            { name: 'Tokyo', tz: 'Asia/Tokyo', city: 'JST' },
            { name: 'Sydney', tz: 'Australia/Sydney', city: 'AEDT/AEST' },
            { name: 'Dubai', tz: 'Asia/Dubai', city: 'GST' },
            { name: 'Singapore', tz: 'Asia/Singapore', city: 'SGT' },
            { name: 'Hong Kong', tz: 'Asia/Hong_Kong', city: 'HKT' },
            { name: 'Mumbai', tz: 'Asia/Kolkata', city: 'IST' },
            { name: 'Bangkok', tz: 'Asia/Bangkok', city: 'ICT' },
            { name: 'Mexico City', tz: 'America/Mexico_City', city: 'CST/CDT' },
            { name: 'São Paulo', tz: 'America/Sao_Paulo', city: 'BRT/BRST' },
            { name: 'Cairo', tz: 'Africa/Cairo', city: 'EET' },
            { name: 'Istanbul', tz: 'Europe/Istanbul', city: 'EET' },
            { name: 'Moscow', tz: 'Europe/Moscow', city: 'MSK' },
            { name: 'Beijing', tz: 'Asia/Shanghai', city: 'CST' },
            { name: 'Bangkok', tz: 'Asia/Bangkok', city: 'ICT' },
            { name: 'Toronto', tz: 'America/Toronto', city: 'EST/EDT' },
            { name: 'Vancouver', tz: 'America/Vancouver', city: 'PST/PDT' }
        ];

        this.selectedTimezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
        this.use24HourFormat = true;
        this.updateInterval = null;

        this.init();
    }

    init() {
        this.createTimezoneSelector();
        this.updateClocks();
        this.startClock();
    }

    createTimezoneSelector() {
        const selector = document.getElementById('timezoneSelector');
        selector.innerHTML = '';

        this.timezones.forEach(tz => {
            const isSelected = this.selectedTimezones.includes(tz.tz);
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'timezone-checkbox';

            checkboxDiv.innerHTML = `
                <input type="checkbox" id="${tz.tz}" ${isSelected ? 'checked' : ''} 
                       onchange="clock.toggleTimezone('${tz.tz}')">
                <label for="${tz.tz}">${tz.name} (${tz.city})</label>
            `;

            selector.appendChild(checkboxDiv);
        });
    }

    toggleTimezone(tz) {
        const index = this.selectedTimezones.indexOf(tz);
        if (index > -1) {
            this.selectedTimezones.splice(index, 1);
        } else {
            this.selectedTimezones.push(tz);
        }
        this.updateClocks();
        this.updateZoneCount();
    }

    updateClocks() {
        const grid = document.getElementById('clocksGrid');
        grid.innerHTML = '';

        const sortedTimezones = this.timezones
            .filter(tz => this.selectedTimezones.includes(tz.tz))
            .sort((a, b) => {
                const offsetA = this.getTimezoneOffset(a.tz);
                const offsetB = this.getTimezoneOffset(b.tz);
                return offsetA - offsetB;
            });

        sortedTimezones.forEach(tz => {
            const card = this.createClockCard(tz);
            grid.appendChild(card);
        });

        this.updateZoneCount();
    }

    createClockCard(tz) {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.id = `card-${tz.tz}`;

        card.innerHTML = `
            <div class="timezone-name">${tz.name}</div>
            <div class="timezone-info">${tz.city}</div>
            
            <div class="analog-clock" id="clock-${tz.tz}">
                <div class="clock-numbers" id="numbers-${tz.tz}"></div>
                <div class="hand hour-hand" id="hour-${tz.tz}"></div>
                <div class="hand minute-hand" id="minute-${tz.tz}"></div>
                <div class="hand second-hand" id="second-${tz.tz}"></div>
                <div class="center-dot"></div>
            </div>
            
            <div class="digital-time" id="digital-${tz.tz}">--:--:--</div>
            <div class="day-info" id="day-${tz.tz}">--</div>
            <div class="time-difference" id="diff-${tz.tz}">UTC Offset: --</div>
        `;

        this.addClockNumbers(card, tz.tz);
        return card;
    }

    addClockNumbers(card, tz) {
        const numbersDiv = card.querySelector(`#numbers-${tz}`);
        const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        numbers.forEach((num, index) => {
            const angle = (index * 30) - 90;
            const numberDiv = document.createElement('div');
            numberDiv.className = 'clock-number';
            numberDiv.style.transform = `rotate(${angle}deg) translateY(-70px) rotate(${-angle}deg)`;
            numberDiv.textContent = num === 0 ? '12' : num;
            numbersDiv.appendChild(numberDiv);
        });
    }

    updateClockTime(tz) {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: !this.use24HourFormat,
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        const formatterTime = new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const parts = formatterTime.formatToParts(now);
        const hours = parseInt(parts.find(p => p.type === 'hour').value);
        const minutes = parseInt(parts.find(p => p.type === 'minute').value);
        const seconds = parseInt(parts.find(p => p.type === 'second').value);

        // Update analog clock
        this.updateAnalogClock(tz, hours, minutes, seconds);

        // Update digital time
        const formatParts = formatter.formatToParts(now);
        const timeStr = formatParts
            .filter(p => ['hour', 'minute', 'second', 'dayPeriod'].includes(p.type))
            .map(p => p.value)
            .join(':');

        const dateStr = formatParts
            .filter(p => ['weekday', 'month', 'day'].includes(p.type))
            .map(p => p.value)
            .join(' ');

        const digitalElement = document.getElementById(`digital-${tz}`);
        if (digitalElement) {
            digitalElement.textContent = timeStr;
        }

        const dayElement = document.getElementById(`day-${tz}`);
        if (dayElement) {
            dayElement.textContent = dateStr;
        }

        // Update UTC offset
        this.updateUTCOffset(tz);
    }

    updateAnalogClock(tz, hours, minutes, seconds) {
        const hourHand = document.getElementById(`hour-${tz}`);
        const minuteHand = document.getElementById(`minute-${tz}`);
        const secondHand = document.getElementById(`second-${tz}`);

        if (hourHand && minuteHand && secondHand) {
            // Convert to 12-hour format for analog clock
            const displayHours = hours % 12;
            const secondDegrees = (seconds / 60) * 360;
            const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
            const hourDegrees = (displayHours / 12) * 360 + (minutes / 60) * 30;

            secondHand.style.transform = `rotate(${secondDegrees}deg)`;
            minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
            hourHand.style.transform = `rotate(${hourDegrees}deg)`;
        }
    }

    updateUTCOffset(tz) {
        const now = new Date();
        const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(now.toLocaleString('en-US', { timeZone: tz }));
        
        const offset = (tzDate - utcDate) / (1000 * 60 * 60);
        const sign = offset >= 0 ? '+' : '';
        const offsetStr = `UTC ${sign}${offset.toFixed(1)}`;

        const diffElement = document.getElementById(`diff-${tz}`);
        if (diffElement) {
            diffElement.textContent = offsetStr;
        }
    }

    getTimezoneOffset(tz) {
        const now = new Date();
        const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(now.toLocaleString('en-US', { timeZone: tz }));
        return (tzDate - utcDate) / (1000 * 60 * 60);
    }

    startClock() {
        this.updateInterval = setInterval(() => {
            this.updateAllClocks();
            this.updateUTCInfo();
        }, 1000);
    }

    updateAllClocks() {
        this.selectedTimezones.forEach(tz => {
            this.updateClockTime(tz);
        });
    }

    updateUTCInfo() {
        const now = new Date();
        const utcFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'UTC',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const utcParts = utcFormatter.formatToParts(now);
        const utcTime = utcParts
            .filter(p => ['hour', 'minute', 'second'].includes(p.type))
            .map(p => p.value)
            .join(':');

        const utcElement = document.getElementById('utcTime');
        if (utcElement) {
            utcElement.textContent = utcTime;
        }

        const serverElement = document.getElementById('serverTime');
        if (serverElement) {
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            serverElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    updateZoneCount() {
        const countElement = document.getElementById('zoneCount');
        if (countElement) {
            countElement.textContent = this.selectedTimezones.length;
        }
    }

    toggleFormat() {
        this.use24HourFormat = !this.use24HourFormat;
        const formatDisplay = document.getElementById('formatDisplay');
        if (formatDisplay) {
            formatDisplay.textContent = this.use24HourFormat ? '24-Hour' : '12-Hour';
        }
        this.updateAllClocks();
    }

    showAllZones() {
        this.selectedTimezones = this.timezones.map(tz => tz.tz);
        this.createTimezoneSelector();
        this.updateClocks();
    }

    resetDefault() {
        this.selectedTimezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
        this.use24HourFormat = true;
        const formatDisplay = document.getElementById('formatDisplay');
        if (formatDisplay) {
            formatDisplay.textContent = '24-Hour';
        }
        this.createTimezoneSelector();
        this.updateClocks();
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Initialize clock on page load
let clock;
document.addEventListener('DOMContentLoaded', () => {
    clock = new WorldClock();
});

// Global functions for button clicks
function toggleFormat() {
    if (clock) clock.toggleFormat();
}

function showAllZones() {
    if (clock) clock.showAllZones();
}

function resetDefault() {
    if (clock) clock.resetDefault();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (clock) clock.destroy();
});
