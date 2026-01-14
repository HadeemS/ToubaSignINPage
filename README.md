# Touba African Hair Braiding - Client Sign-In Page

A beautiful, futuristic pink-themed, mobile-first client sign-in page for hair salons. This page captures client information (name, email, phone) and sends it directly to your email using Web3Forms - completely free with no backend required!

## ✨ Features

- 📱 **Mobile-First Design** - Optimized for all devices, especially mobile phones
- 🎨 **Futuristic Pink Design** - Beautiful, girly design with animated pink background effects
- 📧 **Web3Forms Integration** - Free form submission service (no backend needed)
- 📱 **QR Code Generator** - Easy access via QR code scanning
- 📊 **Simple Analytics** - Track form interactions (stored locally)
- ✅ **Form Validation** - Real-time validation with helpful error messages
- 🚀 **GitHub Pages Ready** - Deploy instantly with zero configuration
- 💰 **100% Free** - No costs, no subscriptions, no credit card required

## 🚀 Quick Start

### Step 1: Get Your Web3Forms Access Key

1. Visit [https://web3forms.com](https://web3forms.com)
2. Enter your email address
3. Click "Get Your Access Key"
4. Check your email and copy the access key

### Step 2: Configure the Access Key

1. Open `script.js`
2. Find the line: `const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY';`
3. Replace `'YOUR_ACCESS_KEY'` with your actual access key from Web3Forms
4. Save the file

```javascript
// Example:
const WEB3FORMS_ACCESS_KEY = 'abc123def456ghi789';
```

### Step 3: Deploy to GitHub Pages

This project is **100% ready for GitHub Pages** - just push your files and enable Pages!

#### Option A: Using GitHub Web Interface (Easiest)

1. **Create a new repository on GitHub**
   - Go to [github.com](https://github.com) and click "New repository"
   - Name it (e.g., `ToubaSignINPage` or `salon-signin`)
   - Make it **Public** (required for free GitHub Pages)
   - Don't initialize with README (we already have one)

2. **Upload all files**
   - Click "uploading an existing file"
   - Drag and drop these files:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `README.md`
     - `.nojekyll` (important!)
     - `.gitignore` (optional)
   - Click "Commit changes"

3. **Enable GitHub Pages**
   - Go to your repository **Settings** tab
   - Click **Pages** in the left sidebar
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch (or **master** if that's your default)
   - Select **/ (root)** folder
   - Click **Save**

4. **Your site is live!**
   - Wait 1-2 minutes for GitHub to build
   - Visit: `https://yourusername.github.io/repository-name`
   - Example: `https://johndoe.github.io/ToubaSignINPage`

#### Option B: Using Git Command Line (Recommended)

```bash
# 1. Initialize git repository
git init

# 2. Add all files
git add .

# 3. Commit files
git commit -m "Initial commit: Touba African Hair Braiding sign-in page"

# 4. Create repository on GitHub first, then add remote
# Replace 'yourusername' and 'repository-name' with your actual values
git remote add origin https://github.com/yourusername/repository-name.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

Then follow **steps 3-4 from Option A** to enable GitHub Pages in Settings.

#### ✅ Verify Deployment

After enabling GitHub Pages:
- Check the **Actions** tab in your repository - you should see a workflow running
- Wait 1-2 minutes, then visit your site URL
- The site should load with the pink animated background!

#### 🔧 Troubleshooting GitHub Pages

**Site not loading?**
- Make sure repository is **Public** (not Private)
- Check that `.nojekyll` file is in the root directory
- Verify `index.html` is in the root (not in a subfolder)
- Wait 2-3 minutes after enabling Pages

**404 Error?**
- Make sure you're using the correct URL format: `https://username.github.io/repo-name`
- Check repository name matches exactly (case-sensitive)
- Verify Pages is enabled in Settings → Pages

**Styling not working?**
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for errors (F12)
- Verify all files were uploaded correctly

## 📋 File Structure

```
ToubaSignINPage/
│
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Form handling, Web3Forms integration, QR code
├── README.md           # This file
└── .gitignore          # Git ignore file (optional)
```

## 🎨 Customization

### Change Salon Name

1. Open `index.html`
2. Find `<h1>Touba Hair Salon</h1>`
3. Replace with your salon name

### Change Colors

1. Open `styles.css`
2. Find the `:root` section at the top
3. Modify the color variables:

```css
:root {
    --primary-color: #d4a574;      /* Main brand color */
    --primary-dark: #b8925f;       /* Darker shade for hover */
    --secondary-color: #f5f1eb;    /* Background color */
    /* ... other colors ... */
}
```

### Customize Logo

Replace the SVG logo in `index.html` (inside the `.logo` div) with your own logo or image:

```html
<div class="logo">
    <img src="your-logo.png" alt="Salon Logo" style="width: 60px; height: 60px;">
</div>
```

## 📊 Analytics

The page includes simple analytics that track:
- Page views
- Form field interactions
- Form submissions (success/error)
- QR code usage

### View Analytics Data

Open browser console (F12) and run:
```javascript
exportAnalytics()
```

This will download a JSON file with all tracked events.

### Upgrade to Advanced Analytics (Free Options)

#### Google Analytics (Free)
1. Create account at [Google Analytics](https://analytics.google.com)
2. Get your Measurement ID (e.g., `G-XXXXXXXXXX`)
3. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

4. Uncomment the Google Analytics section in `script.js` (around line 250)

#### Plausible Analytics (Free Tier Available)
1. Sign up at [Plausible Analytics](https://plausible.io)
2. Add script to `index.html`:

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## 🔧 Advanced Features

### Add More Form Fields

1. Add input field in `index.html`:
```html
<div class="form-group">
    <label for="appointment">Appointment Type</label>
    <select id="appointment" name="appointment">
        <option value="">Select...</option>
        <option value="haircut">Haircut</option>
        <option value="color">Color</option>
        <option value="styling">Styling</option>
    </select>
</div>
```

2. Add to `script.js` in the `formData` object (around line 120)
3. Add validation if needed

### Customize Email Subject/Format

Edit the `web3formsData` object in `script.js` (around line 130):

```javascript
const web3formsData = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `New Client Sign-In: ${formData.name}`,  // Customize subject
    // ... rest of the data
};
```

### Add Auto-Reset After Success

The form already resets after 5 seconds. To change the delay, modify the `setTimeout` in `script.js` (around line 165):

```javascript
setTimeout(() => {
    form.reset();
    successMessage.classList.remove('show');
}, 5000); // Change 5000 to your desired milliseconds
```

## 🐛 Troubleshooting

### Form Not Submitting

1. **Check Web3Forms Access Key**: Make sure you've replaced `YOUR_ACCESS_KEY` in `script.js`
2. **Check Browser Console**: Open Developer Tools (F12) and look for errors
3. **Verify Network**: Check if the Web3Forms API is accessible
4. **Check Email**: Make sure you're checking the email associated with your Web3Forms account

### QR Code Not Showing

1. **Check Internet Connection**: QR code library loads from CDN
2. **Check Browser Console**: Look for JavaScript errors
3. **Try Hard Refresh**: Press Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### Styling Issues on Mobile

1. **Clear Browser Cache**: Old CSS might be cached
2. **Check Viewport Meta Tag**: Ensure it's present in `index.html`
3. **Test on Real Device**: Browser dev tools might not show all mobile quirks

## 🔒 Privacy & Security

- **No Data Storage**: Form data is only sent to your email via Web3Forms
- **No Cookies**: This page doesn't use cookies (except for analytics if you add Google Analytics)
- **HTTPS Required**: GitHub Pages automatically provides HTTPS
- **Client-Side Only**: All code runs in the browser, no server-side processing

## 📱 Mobile Optimization Tips

- The page is fully responsive and mobile-first
- Form inputs use `font-size: 16px` to prevent iOS zoom on focus
- Touch-friendly button sizes (minimum 44x44px)
- Optimized for portrait and landscape orientations

## 🎯 Best Practices

1. **Test Before Deploying**: Always test the form with your Web3Forms key before going live
2. **Monitor Submissions**: Check your email regularly for form submissions
3. **Update Regularly**: Keep your salon information and branding up to date
4. **Backup Your Code**: Use GitHub to version control your changes

## 📞 Support

- **Web3Forms Support**: [https://web3forms.com/docs](https://web3forms.com/docs)
- **GitHub Pages Docs**: [https://docs.github.com/pages](https://docs.github.com/pages)
- **QR Code Library**: [https://github.com/davidshimjs/qrcodejs](https://github.com/davidshimjs/qrcodejs)

## 📄 License

This project is free to use for any purpose, commercial or personal.

## 🙏 Credits

- **Web3Forms** - Free form submission service
- **QRCode.js** - QR code generation library
- **Google Fonts** - Poppins font family
- **GitHub Pages** - Free hosting

---

**Made with ❤️ for hair salons everywhere**

Need help? Check the troubleshooting section or review the code comments for detailed explanations.

