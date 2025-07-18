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
              <h3 className="text-xl font-bold text-theme-accent">لادیس</h3>
            </div>
            <p className="text-theme-accent2 mb-6 leading-relaxed">
              ما در لادیس به دنبال ارائه بهترین ابزارها برای تسهیل فرآیند تحلیل و سرمایه گذاری برای افراد حقیقی و حقوقی هستیم.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="bg-theme-accent3 w-10 h-10 rounded-full flex items-center justify-center hover:bg-theme-accent hover:text-theme-accent3 transition duration-300">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/>
                </svg>
              </a>
              {/* Telegram */}
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="bg-theme-accent3 w-10 h-10 rounded-full flex items-center justify-center hover:bg-theme-accent hover:text-theme-accent3 transition duration-300">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.036 16.569l-.398 4.013c.57 0 .816-.244 1.113-.54l2.664-2.537 5.522 4.033c1.012.557 1.73.264 1.98-.936l3.594-16.84c.327-1.513-.547-2.104-1.527-1.74l-21.6 8.32c-1.48.57-1.46 1.38-.252 1.75l5.522 1.726 12.81-8.07c.6-.39 1.15-.17.7.25z"/>
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
                <Link to="/#products" className="text-theme-accent2 hover:text-theme-accent transition duration-300">تحلیل بنیادی</Link>
              </li>
              <li>
                <Link to="/#products" className="text-theme-accent2 hover:text-theme-accent transition duration-300">تحلیل NAV</Link>
              </li>
              <li>
                <Link to="/#products" className="text-theme-accent2 hover:text-theme-accent transition duration-300">سهامداران</Link>
              </li>
              <li>
                <Link to="/#products" className="text-theme-accent2 hover:text-theme-accent transition duration-300">کدال پلاس</Link>
              </li>
              <li>
                <Link to="/#products" className="text-theme-accent2 hover:text-theme-accent transition duration-300">سبد پیشنهادی</Link>
              </li>
              <li>
                <Link to="/#products" className="text-theme-accent2 hover:text-theme-accent transition duration-300">اختیار معامله</Link>
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
                <span className="text-theme-accent2">تهران - میرداماد</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-theme-accent2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-theme-accent2 dir-ltr">09303605214</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-theme-accent2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-theme-accent2"></span>
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
              &copy; {currentYear} لادیس - تمامی حقوق محفوظ است
            </div>
            <div className="text-sm text-theme-accent2">
              <span>طراحی و توسعه توسط تیم لادیس</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;