# Google Sheets Setup for GLP-1 RA 360™

## Overview
The application sends data to a Google Sheets document with 2 sheets:
- **Sheet1**: GLP-1 RA 360™ Risk Score Test Results
- **Sheet2**: Contact Form Data (Get Started Modal)

## Google Apps Script Code

You need to update your Google Apps Script to handle both sheets. Here's the complete script:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    console.log('Received data:', data);
    
    // Open the spreadsheet (replace with your spreadsheet ID)
    const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
    
    // Determine which sheet to use based on the data
    let sheet;
    let headers;
    let values;
    
    if (data.sheetName === 'Sheet2' || data.source === 'Get Started Modal') {
      // Contact Form Data (Sheet 2)
      sheet = spreadsheet.getSheetByName('Sheet2') || spreadsheet.insertSheet('Sheet2');
      
      headers = [
        'Timestamp',
        'First Name',
        'Last Name', 
        'Phone',
        'Email',
        'Source'
      ];
      
      values = [
        data.timestamp,
        data.firstName || '',
        data.lastName || '',
        data.phone || '',
        data.email || '',
        data.source || 'Get Started Modal'
      ];
      
    } else {
      // Risk Score Test Data (Sheet 1 - default)
      sheet = spreadsheet.getSheetByName('Sheet1') || spreadsheet.getActiveSheet();
      if (sheet.getName() !== 'Sheet1') {
        sheet.setName('Sheet1');
      }
      
      headers = [
        'Timestamp',
        'Name',
        'Phone',
        'Q1: GLP-1 RA 360™ Medication',
        'Q2: Duration of Use',
        'Q3: Weight Changes',
        'Q4: Weakness/Fatigue',
        'Q5: Strength Training',
        'Q6: Protein Intake',
        'Q7: Body Composition',
        'Q8: Side Effects',
        'Q9: Appetite Level',
        'Q10: Medical Conditions',
        'Q11: Immediate Goal',
        'Q12: EXIT Flags',
        'Q13: TRANSFORM Flags',
        'Q14: BASE Flags',
        'Total Score',
        'Base Category',
        'Final Category',
        'Triggered Flags',
        'Contact Requested'
      ];
      
      values = [
        data.timestamp,
        data.name || '',
        data.phone || '',
        data.q1 || '',
        data.q2 || '',
        data.q3 || '',
        data.q4 || '',
        data.q5 || '',
        data.q6 || '',
        data.q7 || '',
        data.q8 || '',
        data.q9 || '',
        data.q10 || '',
        data.q11 || '',
        data.q12 || '',
        data.q13 || '',
        data.q14 || '',
        data.totalScore || '',
        data.baseCategory || '',
        data.finalCategory || '',
        Array.isArray(data.triggeredFlags) ? data.triggeredFlags.join(', ') : (data.triggeredFlags || ''),
        data.contactRequested ? 'YES' : 'NO'
      ];
    }
    
    // Add headers if this is the first row OR force update headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    } else {
      // Check if we need to update headers (for existing sheets)
      const currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      if (currentHeaders.length !== headers.length || currentHeaders[currentHeaders.length - 1] !== 'Contact Requested') {
        // Clear first row and add new headers
        sheet.getRange(1, 1, 1, sheet.getLastColumn()).clear();
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
    }
    
    // Add the data
    sheet.appendRow(values);
    
    console.log('Data added successfully to', sheet.getName());
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully',
        sheet: sheet.getName()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Setup Steps

### 1. Create Google Sheets Document
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "GLP-1 RA 360™ Risk Score Test Results"
4. The script will automatically create Sheet1 and Sheet2

### 2. Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Replace the default code with the script above
4. Replace `YOUR_SPREADSHEET_ID` with your actual spreadsheet ID
5. Save the project

### 3. Deploy the Script
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set execute as "Me"
4. Set access to "Anyone"
5. Click "Deploy"
6. Copy the web app URL

### 4. Update Environment Variable
Add the web app URL to your `.env` file:
```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Data Structure

### Sheet1 (Risk Score Test Results)
- Timestamp
- Name
- Phone
- Q1-Q14 (All question responses)
  - Q1: GLP-1 RA 360™ Medication
  - Q2: Duration of Use
  - Q3: Weight Changes
  - Q4: Weakness/Fatigue
  - Q5: Strength Training
  - Q6: Protein Intake
  - Q7: Body Composition
  - Q8: Side Effects
  - Q9: Appetite Level
  - Q10: Medical Conditions
  - Q11: Immediate Goal
  - Q12: EXIT Flags
  - Q13: TRANSFORM Flags
  - Q14: BASE Flags
- Total Score
- Base Category
- Final Category
- Triggered Flags
- **Contact Requested** (YES/NO) - Shows if user wants to be contacted

### Sheet2 (Contact Form Data)
- Timestamp
- First Name
- Last Name
- Phone (with +91 format)
- Email
- Source

## Testing
1. Take the risk score test - data should appear in Sheet1
2. Click "Get Started" and fill the form - data should appear in Sheet2
3. Check the Apps Script logs for any errors

## Troubleshooting
- Check the Apps Script execution logs
- Verify the spreadsheet ID is correct
- Ensure the web app is deployed with correct permissions
- Test the URL in your browser (should return JSON)