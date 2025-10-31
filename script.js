// Timeline events data
// Today: ۹ آبان ۱۴۰۴ = Oct 31, 2025
const timelineEvents = [
    {
        date: '2025-11-04T10:00:00', // ۱۳ آبان ۱۴۰۴
        title: 'پریود شدن',
        jalaliDate: '۱۳ آبان ۱۴۰۴',
        description: ''
    },
    {
        date: '2025-12-05T10:00:00', // ۱۵ آذر ۱۴۰۴
        title: 'فرستادن عکس از کارها برای امید',
        jalaliDate: '۱۵ آذر ۱۴۰۴',
        description: ''
    },
    {
        date: '2025-12-15T10:00:00', // ۲۵ آذر ۱۴۰۴
        title: 'گذاشتن دو پست در آزمایشگاه خستگی و شکست',
        jalaliDate: '۲۵ آذر ۱۴۰۴',
        description: ''
    },
    {
        date: '2025-12-21T10:00:00', // ۱ دی ۱۴۰۴
        title: 'ارسال دعوتنامه برای گروه راهنمای شرکت در عروسی',
        jalaliDate: '۱ دی ۱۴۰۴',
        description: ''
    },
    {
        date: '2025-12-25T10:00:00', // ۵ دی ۱۴۰۴
        title: 'دعوت از چند دوست متفرقه رودربایستی دار',
        jalaliDate: '۵ دی ۱۴۰۴',
        description: ''
    },
    {
        date: '2026-01-21T10:00:00', // ۲ بهمن ۱۴۰۴
        title: 'برگزاری کوکوگالری',
        jalaliDate: '۲ بهمن ۱۴۰۴',
        description: ''
    },
    {
        date: '2026-03-10T10:00:00', // ۲۰ اسفند ۱۴۰۴
        title: 'فرستادن رزومه برای آرت رزیدنسی',
        jalaliDate: '۲۰ اسفند ۱۴۰۴',
        description: ''
    }
];

let currentEventIndex = -1;
let timerInterval = null;

// Initialize timeline
function initializeTimeline() {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';

    const now = new Date();

    timelineEvents.forEach((event, index) => {
        const eventDate = new Date(event.date);
        const isCompleted = eventDate < now;
        const isActive = !isCompleted && (index === 0 || new Date(timelineEvents[index - 1].date) < now);

        const item = document.createElement('div');
        item.className = `timeline-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;

        const content = document.createElement('div');
        content.className = `mdc-card timeline-content ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;

        const dateStr = formatDate(eventDate);
        const jalaliDateStr = event.jalaliDate || dateStr;
        let statusText = '';
        let chipClass = '';
        if (isCompleted) {
            statusText = 'تکمیل شده';
            chipClass = 'mdc-chip mdc-chip--completed';
        } else if (isActive) {
            statusText = 'در حال انجام';
            chipClass = 'mdc-chip mdc-chip--active';
            if (currentEventIndex === -1) {
                currentEventIndex = index;
            }
        } else {
            statusText = 'ایشالا امید جون ایشالا';
            chipClass = 'mdc-chip';
        }

        const descriptionHtml = event.description ? 
            `<div class="timeline-description mdc-typography mdc-typography--body2">${event.description}</div>` : 
            '';

        content.innerHTML = `
            <div class="mdc-card__content">
                <div class="timeline-date mdc-typography mdc-typography--headline6">
                    <span>📅</span>
                    <span>${jalaliDateStr}</span>
                </div>
                <div class="timeline-title mdc-typography mdc-typography--headline5">${event.title}</div>
                ${descriptionHtml}
                <span class="${chipClass} status-badge">${statusText}</span>
            </div>
        `;

        const dot = document.createElement('div');
        dot.className = 'timeline-dot';

        item.appendChild(content);
        item.appendChild(dot);
        timeline.appendChild(item);
    });

    // If no active event found, set to the first upcoming event
    if (currentEventIndex === -1) {
        for (let i = 0; i < timelineEvents.length; i++) {
            if (new Date(timelineEvents[i].date) > now) {
                currentEventIndex = i;
                const item = timeline.children[i];
                item.classList.add('active');
                const content = item.querySelector('.timeline-content');
                content.classList.add('active');
                const dot = item.querySelector('.timeline-dot');
                const badge = item.querySelector('.status-badge');
                if (badge) {
                    badge.className = 'mdc-chip mdc-chip--active status-badge';
                    badge.textContent = 'در حال انجام';
                }
                break;
            }
        }
    }
}

// Format date for display
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        calendar: 'persian'
    };
    return new Intl.DateTimeFormat('fa-IR', options).format(date);
}

// Update timer
function updateTimer() {
    if (currentEventIndex === -1 || currentEventIndex >= timelineEvents.length) {
        const taskNameElement = document.getElementById('taskName');
        if (taskNameElement) {
            taskNameElement.textContent = 'همه رویدادها تکمیل شده';
        }
        return;
    }

    const now = new Date();
    const targetDate = new Date(timelineEvents[currentEventIndex].date);
    
    // If current event has passed, find next one
    if (targetDate <= now) {
        for (let i = currentEventIndex + 1; i < timelineEvents.length; i++) {
            if (new Date(timelineEvents[i].date) > now) {
                currentEventIndex = i;
                // Update UI
                initializeTimeline();
                updateTimer();
                return;
            }
        }
        // All events passed
        const taskNameElement = document.getElementById('taskName');
        if (taskNameElement) {
            taskNameElement.textContent = 'همه رویدادها تکمیل شده';
        }
        return;
    }

    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Convert to Persian digits
    function toPersianDigits(num) {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(num).split('').map(digit => persianDigits[parseInt(digit)]).join('');
    }

    document.getElementById('days').textContent = toPersianDigits(String(days).padStart(2, '0'));
    document.getElementById('hours').textContent = toPersianDigits(String(hours).padStart(2, '0'));
    document.getElementById('minutes').textContent = toPersianDigits(String(minutes).padStart(2, '0'));
    document.getElementById('seconds').textContent = toPersianDigits(String(seconds).padStart(2, '0'));

    const nextEvent = timelineEvents[currentEventIndex];
    const taskNameElement = document.getElementById('taskName');
    if (taskNameElement) {
        taskNameElement.textContent = nextEvent.title;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTimeline();
    updateTimer();
    
    // Update timer every second
    timerInterval = setInterval(updateTimer, 1000);
    
    // Update every minute to check for new events
    setInterval(() => {
        const now = new Date();
        timelineEvents.forEach((event, index) => {
            const eventDate = new Date(event.date);
            if (eventDate <= now && eventDate > new Date(now.getTime() - 60000)) {
                // Event just passed, reinitialize
                initializeTimeline();
            }
        });
    }, 60000);
});

