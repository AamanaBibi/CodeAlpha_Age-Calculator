document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    const dateError = document.getElementById('dateError');
    const themeToggle = document.getElementById('themeToggle');
    
    // Play creepy sound on hover
    calculateBtn.addEventListener('mouseenter', function() {
        const whispers = ['whisper1', 'whisper2', 'whisper3'];
        const whisper = whispers[Math.floor(Math.random() * whispers.length)];
        // In a real implementation, you would play an audio file here
        console.log('Playing creepy sound:', whisper);
    });
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('lightMode', isLightMode);
        themeToggle.textContent = isLightMode ? '☾' : '☽';
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('lightMode') === 'true') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☾';
    }
    
    calculateBtn.addEventListener('click', function() {
        const day = parseInt(document.getElementById('birthDay').value);
        const month = parseInt(document.getElementById('birthMonth').value);
        const year = parseInt(document.getElementById('birthYear').value);
        
        // Validate inputs
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            showError();
            return;
        }
        
        const birthDate = new Date(year, month, day);
        const today = new Date();
        
        // Check if date is valid and not in the future
        if (isNaN(birthDate.getTime())) {
            showError();
            return;
        }
        
        if (birthDate > today) {
            dateError.textContent = "The future is forbidden to mortal eyes";
            showError();
            return;
        }
        
        // If validation passes, hide error and calculate age
        hideError();
        
        const age = calculateAge(birthDate, today);
        displayAge(age);
        
        // Show effects for birthdays
        if (age.months === 0 && age.days === 0) {
            createConfetti();
            document.getElementById('additionalInfo').innerHTML = 
                `<span class="milestone">THE STARS ALIGN! YOUR ANNIVERSARY OF PAIN HAS COME!</span>`;
        } else if (age.months === 0 && age.days === 1) {
            document.getElementById('additionalInfo').innerHTML = 
                `<span class="milestone">YOUR TORMENT DAY PASSED YESTERDAY...</span> The cosmos mock your tardiness`;
        } else if (age.months === 11 && age.days >= 25) {
            const daysLeft = 30 - age.days + 1;
            document.getElementById('additionalInfo').innerHTML = 
                `<span class="milestone">Only ${daysLeft} days until your next suffering anniversary</span> The hourglass drains...`;
        } else {
            showAdditionalInfo(age, birthDate, today);
        }
        
        // Show result with animation
        resultDiv.classList.add('show');
        
        // Random creepy message
        const messages = [
            "Time flows like blood from a wound",
            "Each second brings you closer to the abyss",
            "The clock never stops ticking...",
            "Your days are numbered, mortal",
            "The sands of time are stained red"
        ];
        setTimeout(() => {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            const info = document.getElementById('additionalInfo');
            info.innerHTML += `<br><br><em>${randomMessage}</em>`;
        }, 1000);
    });
    
    function showError() {
        dateError.classList.add('show');
        resultDiv.classList.remove('show');
        // Shake animation for error
        document.querySelector('.input-group').style.animation = 'shake 0.5s';
        setTimeout(() => {
            document.querySelector('.input-group').style.animation = '';
        }, 500);
    }
    
    function hideError() {
        dateError.classList.remove('show');
    }
    
    function calculateAge(birthDate, currentDate) {
        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();
        
        if (days < 0) {
            months--;
            const lastDayOfMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                0
            ).getDate();
            days += lastDayOfMonth;
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        return { years, months, days };
    }
    
    function displayAge(age) {
        document.getElementById('years').textContent = age.years;
        document.getElementById('months').textContent = age.months;
        document.getElementById('days').textContent = age.days;
    }
    
    function showAdditionalInfo(age, birthDate, today) {
        const nextBirthday = new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );
        
        if (nextBirthday < today) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        
        const daysUntilNextBirthday = Math.ceil(
            (nextBirthday - today) / (1000 * 60 * 60 * 24)
        );
        
        const info = `You've endured approximately ${Math.floor(
            (today - birthDate) / (1000 * 60 * 60 * 24)
        )} days of existence. <span class="milestone">${daysUntilNextBirthday} days</span> until your next temporal reckoning.`;
        
        document.getElementById('additionalInfo').innerHTML = info;
    }
    
    function createConfetti() {
        const container = document.querySelector('.container');
        const colors = ['#8b0000', '#b22222', '#5c0000', '#ff0000', '#450000'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = -10 + 'px';
            confetti.style.width = Math.random() * 6 + 3 + 'px';
            confetti.style.height = Math.random() * 6 + 3 + 'px';
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.style.animation = 'confettiFall ' + (Math.random() * 3 + 2) + 's linear forwards';
            }, 0);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
});

function spawnGhosts() {
    const container = document.querySelector('.container');
    if (!container) return;
    for (let i = 0; i < 4; i++) {
        const ghost = document.createElement('div');
        ghost.className = 'ghost';
        ghost.style.left = (Math.random() * 90) + '%';
        ghost.style.animationDuration = (Math.random() * 8 + 8) + 's';
        ghost.style.opacity = (Math.random() * 0.2 + 0.13).toFixed(2);
        ghost.style.zIndex = 1;
        container.appendChild(ghost);
        ghost.addEventListener('animationend', () => ghost.remove());
    }
}
setInterval(spawnGhosts, 3500);
document.addEventListener('DOMContentLoaded', spawnGhosts);