# 🚀 Quick Start Guide - Risk Score Test Integration

## ✅ Integration Complete!

The GLP-1 RA 360™ Risk Score Test has been successfully integrated into your application.

## 🎯 What You Need to Do Now

### Step 1: Test It Locally (2 minutes)

```bash
# Start the development server
npm run dev
```

Then:
1. Open http://localhost:5173
2. Click the green "Take the GLP-1 RA 360™ Risk Score Test" button
3. Answer a few questions
4. See your results
5. Click "Back to Home"
6. Test browser back button ✅

### Step 2: Set Up Google Sheets (Optional, 5 minutes)

**Only if you want to collect user responses:**

1. Go to https://script.google.com
2. Click "New Project"
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(Object.keys(data));
    }
    
    sheet.appendRow(Object.values(data));
    
    return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click "Deploy" → "New deployment"
5. Select "Web app"
6. Execute as: "Me"
7. Who has access: "Anyone"
8. Click "Deploy"
9. Copy the URL

10. Create `.env` file in your project root:

```bash
VITE_GOOGLE_SCRIPT_URL=paste_your_url_here
```

11. Restart dev server: `npm run dev`

### Step 3: Clean Up (1 minute)

Delete the old folder (no longer needed):

```bash
rm -rf src/Risk-Score
```

## 🎨 What Changed

### Files Added:
- `src/pages/RiskScoreTest/index.tsx` - Main test page
- `src/pages/RiskScoreTest/ResultPage.tsx` - Results page
- `src/pages/RiskScoreTest/questionsConfig.ts` - Questions
- `src/pages/RiskScoreTest/scoring.ts` - Logic (untouched)
- `src/pages/RiskScoreTest/types.ts` - TypeScript types

### Files Modified:
- `src/App.tsx` - Added route
- `src/components/landing/HeroSection.tsx` - Added navigation

### Theme Applied:
- ✅ ReLiv Blue (#004aad) - Primary buttons, headings
- ✅ Wellness Green (#8bc34a) - Success states, CTAs
- ✅ Sora font - Headings
- ✅ DM Sans font - Body text

## 🧪 Testing Checklist

Quick tests to run:

- [ ] Click "Take the GLP-1 RA 360™ Risk Score Test" button
- [ ] Answer questions (progress bar updates)
- [ ] Submit contact form
- [ ] See results page
- [ ] Click "Back to Home" (top left)
- [ ] Browser back button works
- [ ] Test on mobile (responsive)

## 📱 Mobile Test

Open on your phone:
1. Get your local IP: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
2. Visit `http://YOUR_IP:5173` on phone
3. Test the flow

## 🚀 Deploy

When ready to deploy:

```bash
# Build for production
npm run build

# Preview build
npm run preview
```

Then deploy the `dist` folder to your hosting service.

## 🆘 Need Help?

### Button doesn't work?
- Check browser console for errors
- Ensure React Router is installed: `npm list react-router-dom`

### Styles look wrong?
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Restart dev server

### Google Sheets not working?
- Check `.env` file exists
- Verify URL is correct
- Check Google Apps Script is deployed with "Anyone" access

## 📚 Full Documentation

See `RISK_SCORE_INTEGRATION.md` for complete details.

---

**You're all set!** 🎉

The integration is complete and ready to use. Just test it locally, optionally set up Google Sheets, and you're good to go!
