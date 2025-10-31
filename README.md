# اسنپ بوس | Snappboos

یک وب‌سایت مدرن با تایم‌لاین و تایمر شمارش معکوس.

## ویژگی‌ها

- ✅ تایم‌لاین زیبا با 8 مرحله
- ✅ تایمر شمارش معکوس برای مرحله بعدی
- ✅ طراحی مدرن و ریسپانسیو
- ✅ انیمیشن‌های روان و جذاب
- ✅ سازگار با GitHub Pages

## راه‌اندازی در GitHub Pages

1. این پروژه را در یک repository جدید در GitHub آپلود کنید
2. به Settings > Pages بروید
3. Source را روی `main` (یا `master`) branch تنظیم کنید
4. Root directory را روی `/root` تنظیم کنید
5. Save کنید

وب‌سایت شما در آدرس `https://username.github.io/repository-name` در دسترس خواهد بود.

## سفارشی‌سازی

### تغییر تاریخ‌ها و مراحل

فایل `script.js` را باز کنید و آرایه `timelineEvents` را ویرایش کنید:

```javascript
const timelineEvents = [
    {
        date: '2024-12-15T10:00:00',  // تاریخ و زمان
        title: 'عنوان مرحله',
        description: 'توضیحات مرحله'
    },
    // ...
];
```

### تغییر رنگ‌ها

فایل `styles.css` را باز کنید و متغیرهای CSS در قسمت `:root` را ویرایش کنید.

## ساختار فایل‌ها

```
snpboos/
├── index.html      # صفحه اصلی
├── styles.css      # استایل‌های CSS
├── script.js       # منطق تایمر و تایم‌لاین
└── README.md       # این فایل
```

## پشتیبانی از مرورگرها

این وب‌سایت با تمام مرورگرهای مدرن سازگار است:
- Chrome
- Firefox
- Safari
- Edge

