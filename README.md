# 📊 Class Check

A modern, responsive web application to help students track their class attendance and maintain the required 75% eligibility for exams.

## ✨ Features

- 🎯 **Real-time Attendance Tracking** - Mark present/absent for each class
- 📈 **Visual Progress Bars** - See your attendance percentage at a glance
- 🔔 **Eligibility Status** - Know if you're eligible for exams (75%+ required)
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 💾 **Auto-save** - Data automatically saved to browser storage
- 🌙 **Dark Theme Footer** - Modern, professional design
- 📊 **Statistics Dashboard** - Track average attendance across subjects
- 🔄 **Offline Support** - Works without internet connection
- 🚀 **PWA Ready** - Install as a mobile app

## 🚀 Quick Start

### Option 1: Live Demo
Visit the deployed application: [https://student-attendance-tracker.vercel.app](https://student-attendance-tracker.vercel.app)

### Option 2: Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/sushil3050-ctrl/Class-Check.git
   cd Class-Check
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve . -p 3000
   
   # Or use VS Code Live Server extension
   ```

3. Open [http://localhost:8000](http://localhost:8000) in your browser

## 📱 How to Use

1. **Add Subjects**: Click "Add Subject" to add up to 7 subjects
2. **Mark Attendance**: Use "Present" or "Absent" buttons for each class
3. **Track Progress**: Watch your attendance percentage update in real-time
4. **Check Eligibility**: Green status means you're eligible (75%+), red means you need more classes
5. **View Statistics**: See your average attendance across all subjects

## 🎯 Attendance Rules

- **Minimum Required**: 75% attendance for exam eligibility
- **Classes Needed**: App calculates how many more consecutive classes you need to attend
- **Real-time Updates**: All calculations happen instantly as you mark attendance

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: LocalStorage (browser-based)
- **Design**: Responsive CSS Grid & Flexbox
- **Icons**: Unicode Emojis
- **PWA**: Service Worker & Manifest

## 📁 Project Structure

```
class-check/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # Main JavaScript logic
├── script.min.js       # Minified production version
├── style.min.css       # Minified production styles
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── assets/            # Icons and images
└── README.md          # This file
```

## 🎨 Features in Detail

### Subject Management
- Add up to 7 subjects
- Delete subjects with confirmation
- Subject name validation (max 25 characters)
- No duplicate subjects allowed

### Attendance Tracking
- Mark present/absent for each class
- Automatic percentage calculation
- Visual progress bars with color coding
- Classes needed indicator

### Data Persistence
- Automatic save to browser localStorage
- Data survives browser restarts
- Export/Import functionality (in production version)

### User Experience
- Toast notifications for actions
- Loading screen with animation
- Keyboard shortcuts (ESC to close modal, Ctrl+N for new subject)
- Mobile-optimized interface
- Accessibility features (ARIA labels, semantic HTML)

## 🔧 Customization

### Colors & Theme
Edit the CSS variables in `style.css`:
```css
:root {
    --primary-color: #6366f1;
    --success-color: #10b981;
    --danger-color: #ef4444;
    /* ... */
}
```

### Attendance Threshold
Change the 75% requirement in `script.js`:
```javascript
const THRESHOLD = 75; // Change this value
```

### Maximum Subjects
Modify the limit in `script.js`:
```javascript
const MAX_SUBJECTS = 7; // Change this value
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### GitHub Pages
1. Enable Pages in repository settings
2. Select `main` branch
3. Deploy at `https://username.github.io/Class-Check`

### Netlify
1. Connect GitHub repository
2. Deploy as static site
3. Automatic deployments on push

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Sushil RK**
- GitHub: [@sushil3050-ctrl](https://github.com/sushil3050-ctrl)
- Project: [Class Check](https://github.com/sushil3050-ctrl/Class-Check)

## ⭐ Support

If you find this project helpful, please consider giving it a ⭐ on GitHub!

---

**Made with ❤️ for students everywhere!**
