import React from 'react';
import { Link } from 'react-router-dom';

function TermsPage() {
  return (
    <div className="py-16 rtl">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">شرایط و قوانین استفاده از سرویس</h1>
              <Link 
                to="/login"
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                بازگشت به صفحه ورود
              </Link>
            </div>

            <div className="prose prose-blue max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">۱. پذیرش شرایط</h2>
                <p className="text-gray-600 mb-4">
                  با استفاده از سرویس تحلیل بورس، شما موافقت می‌کنید که این شرایط و قوانین را پذیرفته‌اید. اگر با هر بخشی از این شرایط موافق نیستید، لطفاً از استفاده از سرویس خودداری کنید.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">۲. تعریف سرویس</h2>
                <p className="text-gray-600 mb-4">
                  سرویس تحلیل بورس یک پلتفرم آنلاین است که به کاربران امکان دسترسی به تحلیل‌های بازار سرمایه، داده‌های مالی و ابزارهای تحلیلی را می‌دهد. این سرویس شامل موارد زیر است:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>تحلیل‌های بنیادی و تکنیکال</li>
                  <li>داده‌های مالی شرکت‌ها</li>
                  <li>ابزارهای تحلیلی و نمودارها</li>
                  <li>خبرنامه و اطلاع‌رسانی‌های بازار</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">۳. مسئولیت‌های کاربر</h2>
                <p className="text-gray-600 mb-4">
                  کاربران موظفند موارد زیر را رعایت کنند:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>ارائه اطلاعات صحیح و به‌روز در زمان ثبت‌نام</li>
                  <li>حفظ امنیت حساب کاربری و رمز عبور</li>
                  <li>استفاده قانونی از سرویس و عدم نقض حقوق دیگران</li>
                  <li>عدم استفاده از سرویس برای اهداف غیرقانونی</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">۴. محدودیت‌های استفاده</h2>
                <p className="text-gray-600 mb-4">
                  کاربران مجاز به انجام موارد زیر نیستند:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>دسترسی غیرمجاز به بخش‌های مختلف سرویس</li>
                  <li>استفاده از ربات‌ها یا روش‌های خودکار برای جمع‌آوری داده‌ها</li>
                  <li>توزیع یا فروش اطلاعات و تحلیل‌های ارائه شده</li>
                  <li>ایجاد اختلال در عملکرد سرویس</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">۵. مسئولیت‌های ما</h2>
                <p className="text-gray-600 mb-4">
                  ما متعهد به موارد زیر هستیم:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>ارائه سرویس با کیفیت و به‌روز</li>
                  <li>حفاظت از اطلاعات شخصی کاربران</li>
                  <li>پشتیبانی فنی و پاسخگویی به سؤالات</li>
                  <li>بهبود مستمر خدمات و امکانات</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">۶. محدودیت مسئولیت</h2>
                <p className="text-gray-600 mb-4">
                  تحلیل‌ها و اطلاعات ارائه شده در این سرویس صرفاً جنبه راهنمایی داشته و مسئولیت تصمیم‌گیری‌های سرمایه‌گذاری بر عهده کاربر است. ما هیچ گونه مسئولیتی در قبال زیان‌های احتمالی ناشی از استفاده از این اطلاعات نداریم.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">۷. تغییرات شرایط</h2>
                <p className="text-gray-600 mb-4">
                  ما حق تغییر این شرایط و قوانین را در هر زمان محفوظ می‌داریم. تغییرات از طریق اعلان در سایت یا ارسال ایمیل به کاربران اطلاع‌رسانی خواهد شد.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">۸. تماس با ما</h2>
                <p className="text-gray-600 mb-4">
                  برای هرگونه سؤال یا پیشنهاد در مورد این شرایط و قوانین، می‌توانید از طریق ایمیل زیر با ما در تماس باشید:
                </p>
                <a href="mailto:support@tahlilbors.com" className="text-blue-600 hover:text-blue-700">
                  support@tahlilbors.com
                </a>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsPage; 