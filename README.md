# 💛 Save the Date Memory Game — Bhavana & Mahender

An interactive 3-page memory card game using your beautiful blue & cream templates!

---

## 📁 Files in This Folder

✅ **Already Included** (ready to upload):
- `index.html` — Main game page
- `style.css` — Styling matching your templates
- `script.js` — Game logic (5 pairs / 10 cards)
- `template1.png` — Welcome screen (with your names)
- `template2.png` — Game board (with 10 yellow card slots)
- `template3.png` — Save the Date reveal background

🎯 **You Need To Add**:
- `audio1.mp3` — Your background music
- `image1.jpg` to `image5.jpg` — **Only 5 images needed** (template has 5 pairs / 10 slots)

---

## 🎮 How It Works

### **Page 1: Welcome (template1)**
- Shows your "Bhavana & Mahender" cover
- Hint message + animated "Start the Game" button
- Click to begin → music starts playing

### **Page 2: Game (template2)**
- 10 cards positioned **exactly** on the yellow placeholders
- 5 pairs to match (using image1 to image5)
- Live moves & timer counter at top
- Mute/unmute button in corner
- Cards flip with smooth animation
- Match found → glow effect
- Last match → firecracker celebration 🎆

### **Page 3: Save the Date (template3)**
- Auto-shows when all pairs matched
- Confetti animation 🎊
- Beautiful invite card with:
  - 🕉️ श्री गणेशाय नमः
  - **Bhavana & Mahender**
  - **1st July 2026**
  - **Om Convention Hall, Narsingi, Hyderabad**
- WhatsApp share button to forward to others

---

## 🚀 Deploy to GitHub Pages (Easy Steps)

### **Step 1: Create Repository**
1. Go to [github.com](https://github.com) → Sign in
2. Click **"+"** (top right) → **"New repository"**
3. Name it: `save-the-date` (or anything)
4. Make it **Public**
5. Click **Create repository**

### **Step 2: Upload All Files**
1. Click **"Add file"** → **"Upload files"**
2. Drag & drop:
   - `index.html`, `style.css`, `script.js`
   - `template1.png`, `template2.png`, `template3.png`
   - `audio1.mp3` (your audio)
   - `image1.jpg` through `image5.jpg` (your 5 photos)
3. Scroll down → Click **"Commit changes"**

### **Step 3: Enable GitHub Pages**
1. Go to **Settings** (top right of repo)
2. Click **Pages** (left sidebar)
3. Under **Source**, select **main** branch → click **Save**
4. Wait 1-2 minutes
5. Refresh — your live link appears! 🎉

### **Step 4: Share!**
Your game URL: `https://YOUR-USERNAME.github.io/save-the-date/`

Send via WhatsApp:
> *"💛 We have a surprise for you! Play this little game to reveal our wedding date! ✨"*

---

## 🖼️ Image Specifications

### For the 5 memory cards (image1.jpg - image5.jpg):
- **Aspect ratio**: Portrait (3:4) works best since cards are taller than wide
- **Size**: 400×600 px recommended
- **File size**: Keep under 200 KB each for fast loading
- **Suggestions**:
  - `image1.jpg` — Bride photo
  - `image2.jpg` — Groom photo
  - `image3.jpg` — Ring 💍
  - `image4.jpg` — Broom 🧹 (traditional)
  - `image5.jpg` — Your logo/monogram or favorite couple photo

💡 **Tip**: Use [TinyPNG.com](https://tinypng.com) to compress images for free.

---

## 🎵 Audio File

- **Filename**: `audio1.mp3`
- **Recommended duration**: 2-3 minutes (loops automatically)
- **Recommended size**: Under 3 MB
- **Style suggestion**: Soft instrumental, romantic, or traditional Indian music

---

## 📱 Mobile Tips

- The template is designed for **landscape orientation** (16:9)
- A small hint appears on mobile suggesting landscape view
- Works perfectly when phone is rotated sideways
- Cards align precisely with the yellow placeholders

---

## ✏️ Customize Text

To change any text on the invite page, edit `index.html`:

```html
<h1 class="invite-title">Save the Date</h1>
<div class="invite-names">
    <span class="name">Bhavana</span>
    <span class="amp">&</span>
    <span class="name">Mahender</span>
</div>
<p class="invite-date">1<sup>st</sup> July 2026</p>
<p class="invite-venue">Om Convention Hall<br/>Narsingi, Hyderabad</p>
```

---

## 🎨 Colors (Already Matching Your Templates)

- **Light blue**: #c5dde8 (background)
- **Cream yellow**: #f0d989 (cartouche)
- **Olive green**: #5d6f23 (text)
- **Gold**: #c89855 (accents)

---

## 🔧 Troubleshooting

**Cards not aligned with yellow boxes?**
- Make sure you're viewing in landscape (template is 16:9)
- The cards are positioned with percentages so they should align automatically

**Music not playing?**
- Browsers block autoplay until user clicks
- Music will start after clicking "Start the Game"
- User can also click 🔊 to unmute

**Want a different image for pairs?**
- Edit `script.js` line 7-12 and change the `cardImages` array

---

## 🎉 Final Checklist Before Sharing

- [ ] All 3 templates uploaded (template1/2/3.png)
- [ ] audio1.mp3 uploaded
- [ ] All 5 images uploaded (image1 to image5.jpg)
- [ ] HTML/CSS/JS files uploaded
- [ ] GitHub Pages enabled
- [ ] Tested on your phone (landscape)
- [ ] Tested clicking through all 3 pages
- [ ] Shared with a test friend before sending to all guests

---

**Congratulations again, Bhavana & Mahender! 💛 Wishing you a beautiful wedding!** 🌿✨
