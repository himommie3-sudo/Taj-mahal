# 🌍 Digital World Clock

A beautiful, interactive digital clock displaying real-time across multiple time zones worldwide.

## ✨ Features

### 🕐 Time Display
- **Digital Clock**: Shows time in HH:MM:SS format
- **Analog Clock**: Visual representation with hour, minute, and second hands
- **Date Display**: Shows weekday, month, and day for each timezone
- **UTC Offset**: Displays the UTC offset for each timezone
- **24/12 Hour Toggle**: Switch between 24-hour and 12-hour (AM/PM) format

### 🌐 Timezone Support
- **20+ Major Timezones**: New York, Los Angeles, London, Paris, Tokyo, Sydney, Dubai, Singapore, Hong Kong, Mumbai, Bangkok, Mexico City, São Paulo, Cairo, Istanbul, Moscow, Beijing, Toronto, Vancouver, and more
- **Easy Selection**: Interactive checkboxes to select/deselect timezones
- **Automatic Sorting**: Timezones sorted by UTC offset (West to East)
- **Real-time Updates**: All clocks update every second

### 🎮 Interactive Controls
- ⏰ **Toggle Format**: Switch between 12-hour and 24-hour display
- 🌐 **Show All Zones**: Display all 20+ available timezones at once
- 🔄 **Reset Default**: Return to the default 3 timezones (New York, London, Tokyo)
- ☑️ **Custom Selection**: Choose exactly which timezones to display

### 📊 Information Panel
- **UTC Time**: Current time in UTC
- **Zone Count**: Number of selected timezones
- **Server Time**: Local server time reference

## 🚀 How to Use

### Getting Started
1. Open `world-clock.html` in your web browser
2. The clock will display default timezones: New York, London, and Tokyo
3. All clocks will update in real-time every second

### Selecting Timezones
1. Scroll to the "Select Time Zones to Display" section
2. Check or uncheck timezones to customize your view
3. The clock cards will update instantly
4. Timezones are automatically sorted by UTC offset

### Changing Display Format
1. Click the **"Toggle 12/24 Hour"** button to switch format
2. Times will update to show 12-hour (with AM/PM) or 24-hour format
3. Current format is displayed in the settings panel

### Quick Actions
- **Show All Zones**: Displays all 20+ available timezones
- **Reset Default**: Returns to New York, London, and Tokyo
- **Custom Selection**: Click individual timezone checkboxes

## 🛠️ Technical Details

### Technology Stack
- **HTML5**: Semantic markup and structure
- **CSS3**: Beautiful gradients, animations, and responsive design
- **JavaScript**: Real-time clock calculations and timezone handling
- **Intl API**: Native browser internationalization for accurate timezone conversion

### Architecture

#### Clock Card Components
- **Analog Clock**: SVG-like representation with rotating hands
- **Digital Display**: Real-time formatted time
- **Date Information**: Weekday, month, and day
- **UTC Offset**: Calculated offset from UTC

#### Key Functions
- `updateClockTime(tz)`: Updates time for specific timezone
- `updateAnalogClock(tz, hours, minutes, seconds)`: Rotates analog clock hands
- `toggleTimezone(tz)`: Adds/removes timezone from selection
- `toggleFormat()`: Switches between 12 and 24-hour format
- `getTimezoneOffset(tz)`: Calculates UTC offset dynamically

#### Timezone Database
The application includes 20 major world cities:
- Americas: New York, Los Angeles, Mexico City, Toronto, Vancouver, São Paulo
- Europe: London, Paris, Istanbul, Moscow, Cairo
- Asia-Pacific: Tokyo, Sydney, Dubai, Singapore, Hong Kong, Mumbai, Bangkok, Beijing

## 🎨 Design Features

### Visual Elements
- 🎨 **Gradient Background**: Smooth blue gradient backdrop
- 💳 **Card-based Layout**: Each timezone in a beautiful card with hover effects
- ⏱️ **Analog Clocks**: Traditional clock face with numbered positions
- ✨ **Animations**: Smooth transitions and glowing text effects
- 📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop

### Color Scheme
- Primary: Deep blue (#1e3c72, #2a5298)
- Accent: Purple gradient (#667eea, #764ba2)
- Hands: Dark blue (hour/minute), Red (seconds)
- Background: Light gradient with shadows

## 📱 Responsive Design

- **Desktop**: Multi-column grid layout with 300px+ cards
- **Tablet**: Adaptive grid columns
- **Mobile**: Single-column layout for easy viewing
- **Touch-friendly**: Large clickable areas and buttons

## 🌐 Browser Compatibility

✅ Works on all modern browsers:
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

**Requirements**: Browser must support Intl DateTimeFormat API for timezone conversion

## 💡 Usage Tips

1. **Travel Planning**: Keep track of time in multiple cities
2. **Global Teams**: Monitor working hours across different regions
3. **Conference Scheduling**: Find optimal meeting times
4. **Learning**: Understand UTC offsets and timezone differences
5. **Customization**: Select only the zones relevant to you

## 📁 File Structure

```
world-clock/
├── world-clock.html    # Main HTML structure and styling
├── world-clock.js      # JavaScript functionality and timezone logic
└── README.md           # This documentation file
```

## ⚙️ Customization

### Adding New Timezones

Edit the `timezones` array in `world-clock.js`:

```javascript
this.timezones = [
    { name: 'City Name', tz: 'Continent/City', city: 'Abbreviation' },
    // ... more timezones
];
```

### Changing Default Selection

Modify the `selectedTimezones` array:

```javascript
this.selectedTimezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
```

### Styling Customization

Edit CSS variables in `world-clock.html`:
- Background gradients
- Card colors and shadows
- Font sizes and colors
- Animation speeds

## 🔧 Technical Notes

### Timezone Conversion
The application uses the browser's native `Intl.DateTimeFormat` API for accurate timezone conversion. This ensures:
- ✅ Daylight Saving Time (DST) handling
- ✅ Accurate UTC offsets
- ✅ No external dependencies
- ✅ Cross-browser compatibility

### Performance
- **Efficient Updates**: Single interval update loop
- **Minimal Redraws**: Only necessary DOM updates
- **No Libraries**: Pure vanilla JavaScript
- **Optimized CSS**: GPU-accelerated transforms

### Data Accuracy
- Real-time system clock based
- UTC offset calculations updated every second
- Automatic DST adjustment
- No external API calls required

## 🎓 Learning Resources

This project demonstrates:
- JavaScript ES6 classes and OOP
- DOM manipulation and event handling
- CSS Grid and Flexbox layouts
- CSS animations and transitions
- Intl API for internationalization
- Responsive web design
- Date/Time manipulation in JavaScript

## 📚 Credits

Built with vanilla HTML5, CSS3, and JavaScript

Inspired by the need for global time awareness

---

**Enjoy tracking time around the world! 🌍🕐**

For suggestions or improvements, feel free to create an issue in the repository.

## 🚀 Getting Started Quickly

1. Download the files
2. Open `world-clock.html` in your browser
3. Start tracking multiple timezones!

No installation or build process required - it runs directly in your browser!

---

### Supported Timezones

| Region | Cities |
|--------|--------|
| **Americas** | New York, Los Angeles, Mexico City, Toronto, Vancouver, São Paulo |
| **Europe** | London, Paris, Istanbul, Moscow, Cairo |
| **Asia-Pacific** | Tokyo, Sydney, Dubai, Singapore, Hong Kong, Mumbai, Bangkok, Beijing |

*More timezones can be easily added by editing the timezone database in the JavaScript file.*
