// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#007AFF' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#007AFF',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        }
    },
    retina_detect: true
});

// Jarvis Assistant
const jarvis = document.getElementById('jarvis');
const jarvisMessage = document.getElementById('jarvis-message');
let isJarvisVisible = false;

jarvis.addEventListener('click', () => {
    if (!isJarvisVisible) {
        jarvisMessage.style.display = 'block';
        isJarvisVisible = true;
        setTimeout(() => {
            jarvisMessage.style.display = 'none';
            isJarvisVisible = false;
        }, 5000);
    }
});

// File Upload Handling
const uploadBox = document.getElementById('upload-box');
const fileUpload = document.getElementById('file-upload');
const uploadStatus = document.getElementById('upload-status');

uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '#007AFF';
    uploadBox.style.backgroundColor = 'rgba(0, 122, 255, 0.1)';
});

uploadBox.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadBox.style.borderColor = '#007AFF';
    uploadBox.style.backgroundColor = 'transparent';
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
});

uploadBox.addEventListener('click', () => {
    fileUpload.click();
});

fileUpload.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        uploadStatus.innerHTML = `<p>Processing: ${file.name}</p>`;
        
        // Simulate file processing and update accuracy
        setTimeout(() => {
            const newAccuracy = (Math.random() * (99 - 90) + 90).toFixed(1);
            updateAccuracy(newAccuracy);
            uploadStatus.innerHTML = `<p>Successfully processed: ${file.name}</p>`;
            updateChart('temperature'); // Update chart with new data
        }, 2000);
    }
}

// Update Accuracy Display
function updateAccuracy(value) {
    const accuracyValue = document.getElementById('accuracy-value');
    const accuracyCircle = document.querySelector('.accuracy-circle');
    const meterBar = document.querySelector('.meter-bar');

    accuracyValue.textContent = `${value}%`;
    accuracyCircle.style.background = `conic-gradient(#007AFF ${value}%, #e0e0e0 0)`;
    meterBar.style.setProperty('--meter-value', `${value}%`);
}

// Chart.js Configuration
let climateChart;

function initChart() {
    const ctx = document.getElementById('climateChart').getContext('2d');
    climateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Global Temperature Anomaly (°C)',
                data: [0.87, 0.99, 0.92, 0.85, 0.98, 1.02, 0.84, 0.89],
                borderColor: '#007AFF',
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Global Climate Data'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

// Update Chart Data
function updateChart(dataType) {
    let newData;
    let label;
    
    switch(dataType) {
        case 'temperature':
            newData = [0.87, 0.99, 0.92, 0.85, 0.98, 1.02, 0.84, 0.89];
            label = 'Global Temperature Anomaly (°C)';
            break;
        case 'emissions':
            newData = [32.1, 32.8, 33.2, 34.0, 34.5, 33.4, 34.8, 35.1];
            label = 'CO2 Emissions (Gt)';
            break;
        case 'predictions':
            newData = [35.5, 36.2, 36.8, 37.5, 38.1, 38.8, 39.4, 40.0];
            label = 'Predicted CO2 Emissions (Gt)';
            break;
    }

    climateChart.data.datasets[0].data = newData;
    climateChart.data.datasets[0].label = label;
    climateChart.update();
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', initChart); 