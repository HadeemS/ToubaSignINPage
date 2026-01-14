# Quick GitHub Pages Deployment Guide

## 🚀 Deploy in 3 Steps

### 1. Create GitHub Repository
- Go to [github.com/new](https://github.com/new)
- Name: `ToubaSignINPage` (or any name you like)
- Make it **Public** ✅
- Click "Create repository"

### 2. Upload Files
**Option A: Web Upload**
- Click "uploading an existing file"
- Drag & drop: `index.html`, `styles.css`, `script.js`, `.nojekyll`, `README.md`
- Click "Commit changes"

**Option B: Git Commands**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
- Go to repository **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: **main** / **root**
- Click **Save**

### 4. Your Site is Live! 🎉
Visit: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME`

---

## ⚙️ Important Notes

- ✅ Repository must be **Public** for free GitHub Pages
- ✅ `.nojekyll` file is included (prevents Jekyll processing)
- ✅ All file paths are relative (works on GitHub Pages)
- ✅ No build process needed - pure HTML/CSS/JS

## 🔑 Don't Forget!

Before deploying, update your Web3Forms access key in `script.js`:
```javascript
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY';
```

Get your free key at: [web3forms.com](https://web3forms.com)

