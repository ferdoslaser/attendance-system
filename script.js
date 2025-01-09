// تنظیمات Google Sheets API
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // ID شیت رو اینجا وارد کنید
const SHEET_NAME = 'Sheet1'; // اسم Sheet رو اینجا وارد کنید
const CLIENT_EMAIL = 'YOUR_SERVICE_ACCOUNT_EMAIL'; // ایمیل Service Account
const PRIVATE_KEY = 'YOUR_PRIVATE_KEY'; // کلید خصوصی از فایل JSON

// تابع برای ثبت حضور
async function registerAttendance() {
    const username = document.getElementById('username').value.trim();

    if (!username) {
        alert('لطفاً نام خود را وارد کنید!');
        return;
    }

    // ثبت زمان حضور
    const attendanceTime = new Date().toLocaleString('fa-IR');

    // ارسال داده به Google Sheet
    const data = [[username, attendanceTime]];
    await appendDataToSheet(data);

    alert('حضور شما ثبت شد!');
    document.getElementById('username').value = ''; // پاک کردن فیلد ورودی
    displayAttendance();
}

// تابع برای ارسال داده به Google Sheet
async function appendDataToSheet(data) {
    const { google } = require('googleapis');
    const sheets = google.sheets('v4');

    const authClient = new google.auth.JWT({
        email: CLIENT_EMAIL,
        key: PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    await authClient.authorize();

    const request = {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:B`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: { values: data },
        auth: authClient,
    };

    await sheets.spreadsheets.values.append(request);
}

// تابع برای نمایش لیست حضور و غیاب
async function displayAttendance() {
    const { google } = require('googleapis');
    const sheets = google.sheets('v4');

    const authClient = new google.auth.JWT({
        email: CLIENT_EMAIL,
        key: PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    await authClient.authorize();

    const request = {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:B`,
        auth: authClient,
    };

    const response = await sheets.spreadsheets.values.get(request);
    const attendanceRecords = response.data.values || [];

    const attendanceList = document.getElementById('attendanceRecords');
    attendanceList.innerHTML = ''; // پاک کردن لیست قبلی

    attendanceRecords.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record[0]} - ${record[1]}`;
        attendanceList.appendChild(li);
    });
}

// نمایش لیست حضور و غیاب هنگام بارگذاری صفحه
window.onload = displayAttendance;
