function initializeCards() {
    const cards = document.querySelectorAll('.falling-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: Array.from({length: 101}, (_, i) => i / 100)
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const ratio = entry.intersectionRatio; // Visibility ratio
            if (ratio > 0) {
                // Element is in view, move to original position
                entry.target.style.transform = `translateZ(0) translateY(${(1 - ratio) * -200}px)`;
                entry.target.style.opacity = `${ratio}`;
            } else {
                // Element is out of view, move upwards and fade out
                entry.target.style.transform = `translateZ(300px) translateY(-200px)`;
                entry.target.style.opacity = '0';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
}

window.addEventListener('load', () => {
    initializeCards();
});

/*for 2nd section - importing chaing in stars number starts*/
    const numberDisplay = document.getElementById('numberDisplay');
    const increaseButton = document.getElementById('increaseButton');
    const stars = document.querySelectorAll('.star');
    let animationId;
    let currentNumber = 0;
    let targetNumber = 0;

    function generateRandomNumber() {
    return Math.floor(Math.random() * 999) + 1;
}

    function animateNumber() {
    if (currentNumber < targetNumber) {
    currentNumber += Math.ceil((targetNumber - currentNumber) / 10);
} else if (currentNumber > targetNumber) {
    currentNumber -= Math.ceil((currentNumber - targetNumber) / 10);
}
    numberDisplay.textContent = currentNumber;
    updateStarRating();
    if (currentNumber !== targetNumber) {
    animationId = requestAnimationFrame(animateNumber);
}
}

function updateStarRating() {
    const rating = Math.min(Math.floor(currentNumber / 200) + 1, 5);
    stars.forEach((star, index) => {
        star.style.color = index < rating ? '#ffd700' : '#ccc';
        // Adding pulsing effect class when the star is active
        if (index < rating) {
            star.classList.add('pulsing');
            // Remove the class after animation ends to reset
            setTimeout(() => {
                star.classList.remove('pulsing');
            }, 2000);  // Duration of the pulse animation
        }
    });
}

    function startNumberAnimation() {
    targetNumber = generateRandomNumber();
    animationId = requestAnimationFrame(animateNumber);
}

    function stopNumberAnimation() {
    targetNumber = 0;
    animationId = requestAnimationFrame(animateNumber);
}

    function increaseNumber() {
    const increment = Math.floor(Math.random() * 151) + 50;
    targetNumber = Math.min(targetNumber + increment, 999);
    animationId = requestAnimationFrame(animateNumber);
}

    increaseButton.addEventListener('click', increaseNumber);

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startNumberAnimation();
        } else {
            stopNumberAnimation();
        }
    });
}, {threshold: 0.1});

    observer.observe(numberDisplay);

/*for 2nd section - importing chaing in stars number ends*/


/*adding dummy section starts*/
// document.addEventListener('DOMContentLoaded', function() {
//     const newDiv = document.createElement('div');
//     newDiv.className = 'bg-white shadow-md rounded-lg p-6 m-4';
//     newDiv.innerHTML = `
//         <h2 class='text-2xl font-bold text-gray-800 mb-4'>Smart Home Assistant</h2>
//         <p class='text-gray-700 mb-4'>Revolutionize your living space with our cutting-edge Smart Home Assistant. This innovative device offers:</p>
//         <ul class='list-disc list-inside mb-4 text-gray-600'>
//             <li>Voice-activated controls for all your smart devices</li>
//             <li>AI-powered energy optimization</li>
//             <li>Seamless integration with popular smart home ecosystems</li>
//             <li>Advanced security features with facial recognition</li>
//         </ul>
//         <p class='text-gray-700 mb-4'>Experience the future of home automation today!</p>
//         <button class='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300'>
//             Learn More
//         </button>
//     `;
//
//     document.body.insertAdjacentElement('beforeend', newDiv);
// });
/*adding dummy section ends*/



/* 4th section starts*/
const section = document.querySelector('.headerOverallContainer');
const colorPicker = document.getElementById('colorPicker');
const colorCanvas = document.querySelector('.color-canvas');
const colorSlider = document.querySelector('.color-slider');
const colorDisplay = document.querySelector('.selected-color');
const colorValue = document.querySelector('.color-value');
const autoChangeToggle = document.getElementById('autoChangeToggle');
let colorChangeInterval;
let isAutoChanging = true;

// Create color canvas
const canvasCtx = colorCanvas.getContext('2d');
const canvasWidth = 150;
const canvasHeight = 70;
colorCanvas.width = canvasWidth;
colorCanvas.height = canvasHeight;

// Create color slider
const sliderCtx = colorSlider.getContext('2d');
const sliderWidth = 150;
const sliderHeight = 10;
colorSlider.width = sliderWidth;
colorSlider.height = sliderHeight;

let currentHue = 0;

function drawColorCanvas() {
    canvasCtx.fillStyle = `hsl(${currentHue}, 100%, 50%)`;
    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    const whiteGradient = canvasCtx.createLinearGradient(0, 0, canvasWidth, 0);
    whiteGradient.addColorStop(0, 'rgba(255,255,255,1)');
    whiteGradient.addColorStop(1, 'rgba(255,255,255,0)');
    canvasCtx.fillStyle = whiteGradient;
    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    const blackGradient = canvasCtx.createLinearGradient(0, 0, 0, canvasHeight);
    blackGradient.addColorStop(0, 'rgba(0,0,0,0)');
    blackGradient.addColorStop(1, 'rgba(0,0,0,1)');
    canvasCtx.fillStyle = blackGradient;
    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawColorSlider() {
    const gradient = sliderCtx.createLinearGradient(0, 0, sliderWidth, 0);
    for (let i = 0; i <= 360; i += 60) {
        gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
    }
    sliderCtx.fillStyle = gradient;
    sliderCtx.fillRect(0, 0, sliderWidth, sliderHeight);
}

function updateColor(x, y) {
    const imageData = canvasCtx.getImageData(x, y, 1, 1).data;
    const color = rgbToHex(imageData[0], imageData[1], imageData[2]);
    colorDisplay.style.backgroundColor = color;
    colorValue.value = color;
    colorPicker.value = color;
    updateButtonColors(color);
}

function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function getContrastColor(hexColor) {
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);
    let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

function updateButtonColors(color) {
    const buttons = document.querySelectorAll('.colorButton');
    const primaryColor = color || generateRandomColor();
    const secondaryColor = getContrastColor(primaryColor);
    buttons.forEach(button => {
        button.style.transition = "background-color 0.3s ease, color 0.3s ease";
        button.style.backgroundColor = primaryColor;
        button.style.color = secondaryColor;
    });
    colorDisplay.style.backgroundColor = primaryColor;
    colorValue.value = primaryColor;
}

function startColorChange() {
    if (isAutoChanging) {
        updateButtonColors();
        colorChangeInterval = setInterval(() => {
            if (isAutoChanging) {
                const randomColor = generateRandomColor();
                updateButtonColors(randomColor);
                colorDisplay.style.backgroundColor = randomColor;
                colorValue.value = randomColor;
            }
        }, 2000);
    }
}

function stopColorChange() {
    clearInterval(colorChangeInterval);
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

colorCanvas.addEventListener('mousedown', function (e) {
    isAutoChanging = false;
    autoChangeToggle.textContent = 'Auto Change: Off';
    stopColorChange();
    const rect = colorCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    updateColor(x, y);
});

colorSlider.addEventListener('click', function (e) {
    isAutoChanging = false;
    autoChangeToggle.textContent = 'Auto Change: Off';
    stopColorChange();
    const rect = colorSlider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    currentHue = (x / sliderWidth) * 360;
    drawColorCanvas();
});

autoChangeToggle.addEventListener('click', function () {
    isAutoChanging = !isAutoChanging;
    this.textContent = isAutoChanging ? 'Auto Change: On' : 'Auto Change: Off';
    if (isAutoChanging) {
        startColorChange();
    } else {
        stopColorChange();
    }
});

const colorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (isAutoChanging) {
                startColorChange();
            }
        } else {
            stopColorChange();
        }
    });
}, {threshold: 0.1});

colorObserver.observe(section);

// Initial setup
drawColorSlider();
drawColorCanvas();
updateButtonColors(colorPicker.value);
/* 4th section ends*/



/* 5th section starts */(function() {
    const productSection = document.getElementById('product-section-5');
    const productSkeleton = document.getElementById('product-skeleton');
    const productContent = document.getElementById('product-content');
    const productStars = document.getElementById('product-stars');
    const refreshButton = document.getElementById('refresh-button');

    function showProductContent() {
        productSkeleton.classList.add('hidden');
        productContent.classList.remove('hidden');
        animateProductStars();
    }

    function animateProductStars() {
        productStars.classList.add('star-pulse');
        setTimeout(() => {
            productStars.classList.remove('star-pulse');
        }, 500);
    }

    function refreshContent() {
        productSkeleton.classList.remove('hidden');
        productContent.classList.add('hidden');
        productStars.classList.remove('star-pulse');

        setTimeout(() => {
            showProductContent();
        }, 800); // Simulating 1.5s loading time
    }

    let isRefreshing = false;

    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isRefreshing) {
                isRefreshing = true;
                refreshContent();
                setTimeout(() => {
                    isRefreshing = false;
                }, 2000); // Prevent rapid re-triggering
            }
        });
    }, { threshold: 0.1 });

    productObserver.observe(productSection);

    // Add event listener for refresh button
    refreshButton.addEventListener('click', () => {
        if (!isRefreshing) {
            isRefreshing = true;
            refreshContent();
            setTimeout(() => {
                isRefreshing = false;
            }, 2000); // Prevent rapid re-triggering
        }
    });
})();
/* 5th section ends */