 تابع برای ثبت حضور
function registerAttendance() {
    const username = document.getElementById('username').value.trim();

    if (!username) {
        alert('لطفاً نام خود را وارد کنید!');
        return;
    }

     دریافت لیست حضور و غیاب از LocalStorage
    let attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords'))  [];

     بررسی تکراری نبودن نام کاربر
    if (attendanceRecords.some(record = record.name === username)) {
        alert('این نام قبلاً ثبت شده است!');
        return;
    }

     ثبت زمان حضور
    const attendanceTime = new Date().toLocaleString('fa-IR');
    attendanceRecords.push({ name username, time attendanceTime });

     ذخیره در LocalStorage
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));

     نمایش لیست حضور و غیاب
    displayAttendance();
    document.getElementById('username').value = '';  پاک کردن فیلد ورودی
}

 تابع برای نمایش لیست حضور و غیاب
function displayAttendance() {
    const attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords'))  [];
    const attendanceList = document.getElementById('attendanceRecords');

     پاک کردن لیست قبلی
    attendanceList.innerHTML = '';

     نمایش هر رکورد در لیست
    attendanceRecords.forEach(record = {
        const li = document.createElement('li');
        li.textContent = `${record.name} - ${record.time}`;
        attendanceList.appendChild(li);
    });
}

 نمایش لیست حضور و غیاب هنگام بارگذاری صفحه
window.onload = displayAttendance;