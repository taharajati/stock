import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-theme-main text-theme py-16 mt-12 rtl" style={{fontFamily: 'Vazir, tahoma, Arial, sans-serif'}}>
      <div className="w-full px-3">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-2 text-theme-accent" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 12h2v9H2v-9zm3-8h2v17H5V4zm3 4h2v13H8V8zm3-4h2v17h-2V4zm3 8h2v9h-2v-9zm3-8h2v17h-2V4z" />
              </svg>
              <h3 className="text-xl font-bold text-theme-accent">تحلیل بورس</h3>
            </div>
            <p className="text-theme-accent2 mb-6 leading-relaxed">
              تحلیل بورس بزرگ‌ترین شرکت ارائه‌دهنده محصولات مبتنی بر تحلیل بنیادی در بازار سرمایه ایران است. محصولات این شرکت توسط تیمی متخصص از تحلیلگران بازار سرمایه و متخصصین فناوری اطلاعات پشتیبانی می‌شوند.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-2 space-x-reverse">
              <a href="#" className="bg-theme-accent3 w-10 h-10 rounded-full flex items-center justify-center hover:bg-theme-accent hover:text-theme-accent3 transition duration-300">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              <a href="#" className="bg-theme-accent3 w-10 h-10 rounded-full flex items-center justify-center hover:bg-theme-accent hover:text-theme-accent3 transition duration-300">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14 0-.21-.005-.418-.015-.628.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                </svg>
              </a>
              <a href="#" className="bg-theme-accent3 w-10 h-10 rounded-full flex items-center justify-center hover:bg-theme-accent hover:text-theme-accent3 transition duration-300">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" className="bg-theme-accent3 w-10 h-10 rounded-full flex items-center justify-center hover:bg-theme-accent hover:text-theme-accent3 transition duration-300">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-theme-accent">دسترسی سریع</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-theme-accent2 hover:text-theme-accent transition duration-300">خانه</Link>
              </li>
              <li>
                <Link to="/prices" className="text-theme-accent2 hover:text-theme-accent transition duration-300">قیمت‌ها</Link>
              </li>
              <li>
                <Link to="/academy" className="text-theme-accent2 hover:text-theme-accent transition duration-300">آکادمی</Link>
              </li>
              <li>
                <Link to="/articles" className="text-theme-accent2 hover:text-theme-accent transition duration-300">مقاله‌ها</Link>
              </li>
              <li>
                <Link to="/about" className="text-theme-accent2 hover:text-theme-accent transition duration-300">درباره ما</Link>
              </li>
              <li>
                <Link to="/contact" className="text-theme-accent2 hover:text-theme-accent transition duration-300">تماس با ما</Link>
              </li>
              <li>
                <Link to="/login" className="text-theme-accent2 hover:text-theme-accent transition duration-300">ورود</Link>
              </li>
              <li>
                <Link to="/register" className="text-theme-accent2 hover:text-theme-accent transition duration-300">ثبت‌ نام</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Products */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-theme-accent">محصولات</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/products/fundamental" className="text-theme-accent2 hover:text-theme-accent transition duration-300">تحلیل بنیادی</Link>
              </li>
              <li>
                <Link to="/products/nav" className="text-theme-accent2 hover:text-theme-accent transition duration-300">تحلیل NAV</Link>
              </li>
              <li>
                <Link to="/products/shareholders" className="text-theme-accent2 hover:text-theme-accent transition duration-300">سهامداران</Link>
              </li>
              <li>
                <Link to="/products/codal" className="text-theme-accent2 hover:text-theme-accent transition duration-300">کدال پلاس</Link>
              </li>
              <li>
                <Link to="/products/portfolio" className="text-theme-accent2 hover:text-theme-accent transition duration-300">سبد پیشنهادی</Link>
              </li>
              <li>
                <Link to="/products/options" className="text-theme-accent2 hover:text-theme-accent transition duration-300">اختیار معامله</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-theme-accent">تماس با ما</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-theme-accent2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-theme-accent2">
                  تهران، خیابان ولیعصر، بالاتر از میدان ونک، ساختمان بورس، طبقه ۴، واحد ۴۰۱
                </span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-theme-accent2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-theme-accent2 dir-ltr">۰۲۱-۸۸۶۵۴۳۲۱</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-theme-accent2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-theme-accent2">info@tahlilbourse.ir</span>
              </li>
              <li className="mt-8">
                <Link 
                  to="/contact" 
                  className="inline-block bg-theme-accent hover:bg-theme-accent2 text-theme-accent3 py-3 px-6 rounded-lg transition duration-300 font-bold"
                >
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-theme-accent2 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-sm text-theme-accent2">
              &copy; {currentYear} تحلیل بورس - تمامی حقوق محفوظ است
            </div>
            <div className="text-sm text-theme-accent2">
              <span>طراحی و توسعه توسط تیم تحلیل بورس</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;