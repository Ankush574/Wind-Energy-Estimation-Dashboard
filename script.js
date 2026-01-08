// ========================================
// Constants
// ========================================
const BETZ_LIMIT = 0.593; // Theoretical maximum efficiency
const DEFAULT_AIR_DENSITY = 1.225; // kg/m³ at sea level
const DEFAULT_CP = 0.4; // Typical power coefficient

// ========================================
// Theme Toggle
// ========================================
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

// ========================================
// Wind Power Calculation
// ========================================
function calculatePower(windSpeed, bladeRadius, airDensity, powerCoefficient) {
  // Calculate swept area: A = π * r²
  const sweptArea = Math.PI * Math.pow(bladeRadius, 2);
  
  // Calculate power: P = 0.5 × ρ × A × V³ × Cp
  const power = 0.5 * airDensity * sweptArea * Math.pow(windSpeed, 3) * powerCoefficient;
  
  return {
    power: power, // in Watts
    area: sweptArea // in m²
  };
}

// ========================================
// Form Validation
// ========================================
function validateInputs(windSpeed, bladeRadius, airDensity, powerCoefficient) {
  const errors = [];
  
  if (!windSpeed || windSpeed <= 0) {
    errors.push('Wind speed must be greater than 0');
  }
  
  if (!bladeRadius || bladeRadius <= 0) {
    errors.push('Blade radius must be greater than 0');
  }
  
  if (!airDensity || airDensity <= 0) {
    errors.push('Air density must be greater than 0');
  }
  
  if (!powerCoefficient || powerCoefficient < 0 || powerCoefficient > 1) {
    errors.push('Power coefficient must be between 0 and 1');
  }
  
  // Check Cp against Betz limit
  if (powerCoefficient >= BETZ_LIMIT) {
    const confirmed = confirm(
      `Warning: Power coefficient (${powerCoefficient}) meets or exceeds the Betz limit (${BETZ_LIMIT}).\n\n` +
      'The Betz limit is the theoretical maximum efficiency for wind turbines. ' +
      'Values at or above this limit are not physically possible.\n\n' +
      'Do you want to continue with this value anyway?'
    );
    if (!confirmed) {
      errors.push('Power coefficient validation failed');
    }
  }
  
  return errors;
}

// ========================================
// Result Display
// ========================================
function updateResult(power, sweptArea, powerCoefficient) {
  const resultsContainer = document.getElementById('resultsContainer');
  if (!resultsContainer) return;
  
  // Show results container
  resultsContainer.style.display = 'block';
  
  // Calculate values
  const powerKW = power / 1000;
  const efficiency = (powerCoefficient / BETZ_LIMIT) * 100;
  
  // Format power output with thousands separators
  const powerWattsFormatted = power.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  const powerKWFormatted = powerKW.toLocaleString(undefined, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  });
  
  const areaFormatted = sweptArea.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  const efficiencyFormatted = efficiency.toFixed(1);
  
  // Update result displays
  document.getElementById('powerWatts').textContent = powerWattsFormatted;
  document.getElementById('powerKW').textContent = powerKWFormatted;
  document.getElementById('sweptArea').textContent = areaFormatted;
  document.getElementById('efficiency').textContent = efficiencyFormatted;
  
  // Apply color coding to efficiency card
  const efficiencyCard = document.getElementById('efficiency').closest('.result-card');
  if (efficiencyCard) {
    efficiencyCard.classList.remove('efficiency-low', 'efficiency-medium', 'efficiency-high');
    
    if (efficiency < 30) {
      efficiencyCard.classList.add('efficiency-low');
    } else if (efficiency < 60) {
      efficiencyCard.classList.add('efficiency-medium');
    } else {
      efficiencyCard.classList.add('efficiency-high');
    }
  }
}

// ========================================
// Chart Generation
// ========================================
function generatePowerVsSpeedData(bladeRadius, airDensity, powerCoefficient) {
  const data = [];
  const labels = [];
  
  // Generate data for wind speeds from 0 to 25 m/s
  for (let v = 0; v <= 25; v += 1) {
    labels.push(v);
    const result = calculatePower(v, bladeRadius, airDensity, powerCoefficient);
    data.push(result.power / 1000); // Convert to kW
  }
  
  return { labels, data };
}

function renderPowerChart(canvasId, bladeRadius, airDensity, powerCoefficient) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  // Destroy existing chart if it exists
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  
  const chartData = generatePowerVsSpeedData(bladeRadius, airDensity, powerCoefficient);
  
  const ctx = canvas.getContext('2d');
  canvas.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: 'Power Output (kW)',
        data: chartData.data,
        borderColor: '#0066cc',
        backgroundColor: 'rgba(0, 102, 204, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: 'Power Output vs Wind Speed',
          font: { size: 16, weight: 'bold' }
        },
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Power: ${context.parsed.y.toFixed(2)} kW`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Wind Speed (m/s)',
            font: { size: 14, weight: 'bold' }
          },
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Power (kW)',
            font: { size: 14, weight: 'bold' }
          },
          beginAtZero: true,
          grid: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    }
  });
}

function renderEfficiencyChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  // Destroy existing chart if it exists
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  
  const ctx = canvas.getContext('2d');
  canvas.chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Typical Turbine (40%)', 'Best Modern Turbine (45%)', 'Theoretical Loss (14.3%)', 'Unused (0.7%)'],
      datasets: [{
        data: [40, 5, 14.3, 0.7],
        backgroundColor: [
          '#ffc107',
          '#28a745',
          '#dc3545',
          '#6c757d'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: 'Efficiency Distribution (vs Betz Limit)',
          font: { size: 16, weight: 'bold' }
        },
        legend: {
          display: true,
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        }
      }
    }
  });
}

// ========================================
// Calculator Form Handler
// ========================================
function handleCalculation(event) {
  event.preventDefault();
  
  // Get form values
  const windSpeed = parseFloat(document.getElementById('windSpeed').value);
  const bladeRadius = parseFloat(document.getElementById('bladeRadius').value);
  const airDensity = parseFloat(document.getElementById('airDensity').value);
  const powerCoefficient = parseFloat(document.getElementById('powerCoefficient').value);
  
  // Validate inputs
  const errors = validateInputs(windSpeed, bladeRadius, airDensity, powerCoefficient);
  
  if (errors.length > 0) {
    alert('Validation Error:\n\n' + errors.join('\n'));
    return;
  }
  
  // Calculate power
  const result = calculatePower(windSpeed, bladeRadius, airDensity, powerCoefficient);
  
  // Update results display
  updateResult(result.power, result.area, powerCoefficient);
  
  // Render chart with current parameters
  renderPowerChart('powerChart', bladeRadius, airDensity, powerCoefficient);
}

// ========================================
// Reset Form
// ========================================
function resetForm() {
  const form = document.getElementById('calculatorForm');
  if (form) {
    form.reset();
    // Reset to default values
    document.getElementById('airDensity').value = DEFAULT_AIR_DENSITY;
    document.getElementById('powerCoefficient').value = DEFAULT_CP;
  }
  
  const resultsContainer = document.getElementById('resultsContainer');
  if (resultsContainer) {
    resultsContainer.style.display = 'none';
  }
}

// ========================================
// Print Handler
// ========================================
function handlePrint() {
  window.print();
}

// ========================================
// Initialize Default Charts (for graphs page)
// ========================================
function initializeDefaultCharts() {
  // Default parameters for demonstration
  const defaultRadius = 50; // meters
  const defaultAirDensity = DEFAULT_AIR_DENSITY;
  const defaultCp = DEFAULT_CP;
  
  // Render Power vs Speed chart if on graphs page
  if (document.getElementById('powerVsSpeedChart')) {
    renderPowerChart('powerVsSpeedChart', defaultRadius, defaultAirDensity, defaultCp);
  }
  
  // Render Efficiency chart if on graphs page
  if (document.getElementById('efficiencyChart')) {
    renderEfficiencyChart('efficiencyChart');
  }
}

// ========================================
// DOM Content Loaded
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  initTheme();
  
  // Theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Calculator form
  const calculatorForm = document.getElementById('calculatorForm');
  if (calculatorForm) {
    calculatorForm.addEventListener('submit', handleCalculation);
  }
  
  // Reset button
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetForm);
  }
  
  // Print button
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', handlePrint);
  }
  
  // Initialize default charts for graphs page
  initializeDefaultCharts();
});
