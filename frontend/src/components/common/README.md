# کامپوننت‌های مشترک

این پوشه شامل کامپوننت‌های قابل استفاده مجدد برای بهبود تجربه کاربری است.

## کامپوننت‌های موجود

### 1. SkeletonLoader.jsx
کامپوننت‌های Skeleton برای نمایش حالت بارگذاری:

```jsx
import { TableSkeleton, ChartSkeleton, CardSkeleton, FilterSkeleton, NewsSkeleton } from './SkeletonLoader';

// استفاده در جدول
{loading ? <TableSkeleton rows={8} columns={6} /> : <YourTable />}

// استفاده در نمودار
{loading ? <ChartSkeleton /> : <YourChart />}
```

### 2. FormComponents.jsx
کامپوننت‌های بهبود یافته برای فرم‌ها:

```jsx
import { FormInput, FormTextarea, FormButton, Alert } from './FormComponents';

// Input با validation
<FormInput
  label="ایمیل"
  name="email"
  type="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  placeholder="example@email.com"
  required
  loading={loading}
/>

// Button با loading state
<FormButton
  type="submit"
  loading={loading}
  variant="primary"
  size="lg"
>
  ارسال
</FormButton>

// Alert برای نمایش پیام‌ها
<Alert
  type="success"
  message="عملیات با موفقیت انجام شد"
  show={showAlert}
  onClose={() => setShowAlert(false)}
/>
```

### 3. LoadingSpinner.jsx
کامپوننت‌های مختلف برای نمایش loading:

```jsx
import { FullPageSpinner, InlineSpinner, ButtonSpinner } from './LoadingSpinner';

// Spinner تمام صفحه
<FullPageSpinner text="در حال بارگذاری..." />

// Spinner درون خطی
<InlineSpinner size="sm" color="blue" />

// Spinner برای دکمه‌ها
<ButtonSpinner size="sm" />
```

### 4. Toast.jsx
سیستم نمایش پیام‌های موقت:

```jsx
import { useToast, ToastContainer } from './Toast';

function MyComponent() {
  const { toasts, showSuccess, showError, removeToast } = useToast();

  const handleSubmit = async () => {
    try {
      await submitData();
      showSuccess('داده‌ها با موفقیت ذخیره شد');
    } catch (error) {
      showError('خطا در ذخیره داده‌ها');
    }
  };

  return (
    <div>
      {/* محتوای کامپوننت */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
```

## ویژگی‌های کلیدی

### Skeleton Loader
- انیمیشن pulse برای نمایش بارگذاری
- انواع مختلف برای جدول، نمودار، کارت و فیلتر
- قابل تنظیم برای تعداد ردیف‌ها و ستون‌ها

### Form Components
- اعتبارسنجی real-time
- نمایش خطاها با آیکون
- حالت loading برای input ها
- دکمه‌های بهبود یافته با spinner
- Alert های زیبا با آیکون

### Loading Spinner
- اندازه‌های مختلف (sm, md, lg, xl)
- رنگ‌های مختلف
- Spinner تمام صفحه
- Spinner درون خطی
- Spinner مخصوص دکمه‌ها

### Toast System
- نمایش خودکار و محو شدن
- انواع مختلف (success, error, warning, info)
- قابلیت بستن دستی
- مدیریت چندین toast همزمان
- انیمیشن‌های نرم

## نحوه استفاده

1. کامپوننت مورد نظر را import کنید
2. props مناسب را تنظیم کنید
3. در صورت نیاز، state و event handler ها را اضافه کنید

## نکات مهم

- همه کامپوننت‌ها از Tailwind CSS استفاده می‌کنند
- برای استفاده از آیکون‌ها، react-icons نصب شده است
- کامپوننت‌ها responsive هستند
- انیمیشن‌ها با CSS transitions پیاده‌سازی شده‌اند 