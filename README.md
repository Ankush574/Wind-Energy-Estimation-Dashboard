# 🌬️ Wind Energy Estimation Dashboard

A comprehensive web-based tool for calculating and visualizing wind power potential. Built with modern web technologies, it provides accurate calculations based on established physics formulas and presents results through interactive visualizations.

## 📐 Formula

The dashboard uses the standard wind power equation:

```
P = 0.5 × ρ × A × V³ × Cp
```

Where:
- **P** = Power output (Watts)
- **ρ** (rho) = Air density (kg/m³) - typically 1.225 at sea level
- **A** = Swept area of blades (m²) = πr², where r is blade radius
- **V** = Wind speed (m/s)
- **Cp** = Power coefficient (efficiency factor)

## ✨ Features

- **Accurate Calculations**: Physics-based wind power estimation using standard formulas
- **Input Validation**: Smart form validation including Betz limit verification (0.593)
- **Interactive Charts**: Powered by Chart.js for responsive, animated visualizations
- **Power vs Wind Speed**: Visual representation showing the cubic relationship
- **Efficiency Analysis**: Color-coded efficiency ratings compared to the theoretical Betz limit
  - 🔴 Low (< 30%): Red
  - 🟡 Medium (30-60%): Amber
  - 🟢 High (> 60%): Green
- **Dark/Light Theme**: Toggle between themes with preference saved in browser
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Print/Export**: Save results as PDF using browser print functionality
- **Educational Content**: Comprehensive information about wind energy principles

## 📂 Project Structure

```
Wind-Energy-Estimation-Dashboard/
├── index.html          # Home page with navigation and hero section
├── calculator.html     # Calculator page with form and results
├── graphs.html         # Large-format charts page
├── info.html           # Educational information about wind energy
├── about.html          # About page with project details
├── style.css           # Global styling with theme variables
├── script.js           # Core JavaScript functionality
└── README.md           # This file
```

## 📄 Pages

### 🏠 Home (index.html)
Landing page with overview, key features, and quick navigation to the calculator.

### 🧮 Calculator (calculator.html)
Interactive calculator with:
- **Inputs**: Wind Speed, Blade Radius, Air Density, Power Coefficient
- **Validation**: Real-time validation with Betz limit checks
- **Results**: Power output (W and kW), swept area, efficiency percentage
- **Chart**: Power vs Wind Speed visualization
- **Actions**: Calculate, Reset, Print/Save PDF

### 📊 Graphs (graphs.html)
Comprehensive visualizations:
- **Power vs Wind Speed**: Shows cubic relationship between speed and power
- **Efficiency Analysis**: Doughnut chart comparing typical turbine efficiency to Betz limit

### ℹ️ Info (info.html)
Educational content covering:
- Wind power basics
- Detailed formula explanation
- Betz limit concept
- Key parameters and their effects
- Environmental benefits
- Practical applications

### 👥 About (about.html)
Project information including:
- Feature overview
- Technologies used
- Page descriptions
- Future enhancement ideas
- Developer information

## 🚀 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ankush574/Wind-Energy-Estimation-Dashboard.git
   cd Wind-Energy-Estimation-Dashboard
   ```

2. **Open in browser**:
   - Simply open `index.html` in any modern web browser
   - No build process or server required
   - All files are static HTML/CSS/JS

3. **Or use a local server** (optional):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve
   ```
   Then navigate to `http://localhost:8000`

## 🛠️ Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with CSS variables for theming
- **JavaScript (ES6+)**: Core logic and interactivity
- **Chart.js**: Data visualization library (loaded from CDN)

## 💡 Usage Example

1. Navigate to the Calculator page
2. Enter the following values:
   - Wind Speed: 10 m/s
   - Blade Radius: 50 m (100m diameter)
   - Air Density: 1.225 kg/m³ (default)
   - Power Coefficient: 0.4 (default)
3. Click "Calculate"
4. View results:
   - Power output in Watts and Kilowatts
   - Swept area
   - Efficiency vs Betz limit
   - Interactive chart showing power across wind speeds

## 🔮 Future Enhancements / TODO

- [ ] Integration with live weather APIs for real-time wind data
- [ ] Location-based default parameters (altitude, typical wind speeds)
- [ ] Export calculations to CSV/Excel format
- [ ] Historical data comparison and trends
- [ ] Multiple turbine configuration comparison
- [ ] Economic analysis (cost per kWh, ROI calculations)
- [ ] Advanced visualizations (3D models, wind rose diagrams)
- [ ] Multi-language support
- [ ] User accounts for saving calculations
- [ ] Mobile app version

## 📊 Key Constants

- **Betz Limit**: 0.593 (59.3%) - Theoretical maximum efficiency
- **Default Air Density**: 1.225 kg/m³ (sea level, 15°C)
- **Typical Cp Range**: 0.35 - 0.45 for modern turbines

## 🌍 Live Preview

Check the project here: [Wind Energy Dashboard](https://gorgeous-marzipan-9e321e.netlify.app)

## 👨‍💻 Developer

Developed by **Ankush** 🚀

## 📄 License

This is an educational project. Feel free to use the calculator for learning purposes, project planning, or research. For production use or large-scale installations, please consult with certified wind energy professionals.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## ⭐ Acknowledgments

- Wind energy formulas based on standard physics equations
- Betz limit theory by Albert Betz (1919)
- Chart.js for excellent visualization capabilities
