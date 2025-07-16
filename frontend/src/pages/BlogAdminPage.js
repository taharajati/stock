import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ADMIN_PASSWORD = 'admin1234'; // رمز ورود ثابت

function BlogAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const [form, setForm] = useState({
    title: '',
    content: '',
    summary: '',
    published_date: '',
    published_date_jalali: '',
    author: { username: '', name: '' },
    tags: [],
    title_image: '',
    show: true
  });
  const [selectedTag, setSelectedTag] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState('');

  // Authors list (static for now)
  const authorOptions = [
    { name: 'علی محمدی', username: 'alim' },
    { name: 'سارا احمدی', username: 'saraa' },
    { name: 'محمد رضایی', username: 'mreza' }
  ];

  // Tags state
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    fetchArticles();
    fetchTags();
  }, []);

  async function fetchArticles() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/blog/posts');
      if (!res.ok) throw new Error('خطا در دریافت مقالات');
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTags() {
    try {
      const res = await fetch('/api/blog/tags');
      if (!res.ok) throw new Error('خطا در دریافت تگ‌ها');
      const data = await res.json();
      let tagsFlat = [];
      if (Array.isArray(data) && data.length && Array.isArray(data[0].tags)) {
        // Case: [{ tags: [...] }]
        tagsFlat = data[0].tags.map(tag => ({ name_fa: tag, _id: tag }));
      } else if (Array.isArray(data)) {
        // Case: [{_id, name_fa, ...}, ...]
        tagsFlat = data.map(tag => ({ name_fa: tag.name_fa, _id: tag._id || tag.name_fa }));
      }
      setTagOptions(tagsFlat);
    } catch (err) {
      // Silent fail
    }
  }

  function openAddModal() {
    setEditArticle(null);
    setForm({
      title: '',
      content: '',
      summary: '',
      published_date: '',
      published_date_jalali: '',
      author: { username: '', name: '' },
      tags: [],
      title_image: '',
      show: true
    });
    setShowModal(true);
  }

  function openEditModal(article) {
    setEditArticle(article);
    setForm({
      ...article,
      author: article.author || { username: '', name: '' },
      tags: article.tags || []
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditArticle(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith('author.')) {
      setForm({
        ...form,
        author: { ...form.author, [name.split('.')[1]]: value }
      });
    } else if (name === 'tags') {
      setForm({ ...form, tags: value.split(',').map(t => t.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const method = editArticle ? 'PUT' : 'POST';
      const url = editArticle ? `/api/blog/posts/${editArticle._id}` : '/api/blog/posts';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('خطا در ذخیره مقاله');
      closeModal();
      fetchArticles();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('آیا مطمئن هستید؟')) return;
    try {
      const res = await fetch(`/api/blog/posts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('خطا در حذف مقاله');
      fetchArticles();
    } catch (err) {
      alert(err.message);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 rtl">
        <form
          className="bg-white p-8 rounded-2xl shadow-xl border-2 border-gold flex flex-col items-center w-full max-w-xs animate-modalpop"
          onSubmit={e => {
            e.preventDefault();
            if (password === ADMIN_PASSWORD) {
              setIsAuthenticated(true);
              setPasswordError('');
            } else {
              setPasswordError('رمز ورود اشتباه است!');
            }
          }}
        >
          <h2 className="text-2xl font-bold mb-6 text-navy">ورود به مدیریت مقالات</h2>
          <input
            type="password"
            className="w-full border-2 border-gold/40 rounded-lg px-4 py-2 mb-4 focus:border-gold focus:ring-2 focus:ring-gold/30 transition text-center"
            placeholder="رمز ورود"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
          />
          {passwordError && <div className="text-red-500 mb-2 text-sm">{passwordError}</div>}
          <button
            type="submit"
            className="w-full bg-gold text-navy py-2 rounded-xl font-bold hover:bg-gold-dark transition"
          >
            ورود
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 rtl">
      <h1 className="text-3xl font-bold mb-8 text-center">مدیریت مقالات</h1>
      <button
        className="mb-6 px-6 py-2 bg-gold text-navy rounded-lg font-bold hover:bg-gold-dark"
        onClick={openAddModal}
      >
        افزودن مقاله جدید
      </button>
      {loading ? (
        <div className="text-center text-gray-500">در حال بارگذاری...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-center">
            <thead>
              <tr className="bg-gold text-navy">
                <th className="py-2 px-3">عنوان</th>
                <th className="py-2 px-3">نویسنده</th>
                <th className="py-2 px-3">تاریخ</th>
                <th className="py-2 px-3">وضعیت</th>
                <th className="py-2 px-3">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article._id} className="border-b">
                  <td className="py-2 px-3 font-bold">{article.title}</td>
                  <td className="py-2 px-3">{article.author?.name}</td>
                  <td className="py-2 px-3">{article.published_date_jalali}</td>
                  <td className="py-2 px-3">{article.show ? 'فعال' : 'غیرفعال'}</td>
                  <td className="py-2 px-3 flex gap-2 justify-center">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => openEditModal(article)}
                    >ویرایش</button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(article._id)}
                    >حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fadein ">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto relative border-2 border-gold animate-modalpop">
            <button
              className="absolute top-3 left-3 text-gray-400 hover:text-red-500 text-2xl transition-colors duration-200"
              onClick={closeModal}
              aria-label="بستن"
            >
              ×
            </button>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-extrabold text-navy mb-1">
                {editArticle ? 'ویرایش مقاله' : 'افزودن مقاله جدید'}
              </h2>
              <div className="h-1 w-16 bg-gold mx-auto rounded-full mb-2"></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full border-2 border-gold/40 rounded-lg px-4 py-2 focus:border-gold focus:ring-2 focus:ring-gold/30 transition"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="عنوان مقاله"
                required
              />
              <div className="flex gap-2">
                {/* Author dropdown */}
                <select
                  className="flex-1 border-2 border-gold/40 rounded-lg px-4 py-2 focus:border-gold focus:ring-2 focus:ring-gold/30 transition"
                  name="author.name"
                  value={form.author.name}
                  onChange={e => {
                    const selected = authorOptions.find(a => a.name === e.target.value);
                    setForm({
                      ...form,
                      author: selected ? { ...selected } : { username: '', name: '' }
                    });
                  }}
                  required
                >
                  <option value="">انتخاب نویسنده</option>
                  {authorOptions.map(a => (
                    <option key={a.username} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  className="flex-1 border-2 border-gold/40 rounded-lg px-4 py-2 focus:border-gold focus:ring-2 focus:ring-gold/30 transition"
                  name="published_date"
                  value={form.published_date}
                  onChange={handleChange}
                  placeholder="تاریخ انتشار (میلادی)"
                  type="date"
                  required
                />
                <input
                  className="flex-1 border-2 border-gold/40 rounded-lg px-4 py-2 focus:border-gold focus:ring-2 focus:ring-gold/30 transition"
                  name="published_date_jalali"
                  value={form.published_date_jalali}
                  onChange={handleChange}
                  placeholder="تاریخ انتشار (جلالی)"
                  required
                />
              </div>
              {/* Tag selection with add button */}
              <div className="flex gap-2 items-center">
                <select
                  className="flex-1 border-2 border-gold/40 rounded-lg px-4 py-2 focus:border-gold focus:ring-2 focus:ring-gold/30 transition"
                  value={selectedTag}
                  onChange={e => setSelectedTag(e.target.value)}
                >
                  <option value="">انتخاب تگ</option>
                  {tagOptions.filter(tag => !form.tags.includes(tag.name_fa)).map(tag => (
                    <option key={tag._id} value={tag.name_fa}>{tag.name_fa}</option>
                  ))}
                </select>
                <button
                  type="button"
                  className="px-4 py-2 bg-gold text-navy rounded-lg font-bold hover:bg-gold-dark transition"
                  onClick={() => {
                    if (selectedTag && !form.tags.includes(selectedTag)) {
                      setForm({ ...form, tags: [...form.tags, selectedTag] });
                      setSelectedTag('');
                    }
                  }}
                  disabled={!selectedTag || form.tags.includes(selectedTag)}
                >
                  افزودن تگ
                </button>
              </div>
              {/* Selected tags as chips */}
              <div className="flex flex-wrap gap-2 mb-2">
                {form.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-gold text-navy px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow border border-gold/50"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-red-600 hover:text-red-900 text-lg"
                      onClick={() => setForm({ ...form, tags: form.tags.filter(t => t !== tag) })}
                      aria-label="حذف تگ"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {/* Image upload */}
              <div>
                <label className="block font-bold mb-1">عکس شاخص مقاله:</label>
                {form.title_image && (
                  <div className="mb-2 flex items-center gap-2">
                    <img src={form.title_image} alt="عکس شاخص" className="w-24 h-16 object-cover rounded border" />
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-900 text-lg font-bold"
                      onClick={() => setForm({ ...form, title_image: '' })}
                    >
                      حذف عکس
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="upload-image"
                    className="cursor-pointer px-5 py-2 bg-gold text-navy rounded-lg font-bold shadow hover:bg-gold-dark transition border-2 border-gold/60"
                  >
                    {imageUploading ? 'در حال آپلود...' : 'انتخاب عکس'}
                  </label>
                  <input
                    id="upload-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async e => {
                      const file = e.target.files[0];
                      if (!file) return;
                      setImageUploading(true);
                      setImageError('');
                      const formData = new FormData();
                      formData.append('image', file);
                      try {
                        const res = await fetch('/api/blog/upload', {
                          method: 'POST',
                          body: formData
                        });
                        const data = await res.json();
                        if (!res.ok || !data.url) throw new Error(data.error || 'خطا در آپلود عکس');
                        setForm({ ...form, title_image: data.url });
                      } catch (err) {
                        setImageError(err.message);
                      } finally {
                        setImageUploading(false);
                      }
                    }}
                    disabled={imageUploading}
                  />
                  {/* نمایش نام فایل انتخاب شده */}
                  {imageUploading === false && form.title_image === '' && (
                    <span className="text-gray-500 text-sm">هیچ عکسی انتخاب نشده</span>
                  )}
                </div>
                {imageError && <div className="text-red-500 mt-1">{imageError}</div>}
              </div>
              <textarea
                className="w-full border-2 border-gold/40 rounded-lg px-4 py-2 focus:border-gold focus:ring-2 focus:ring-gold/30 transition min-h-[60px]"
                name="summary"
                value={form.summary}
                onChange={handleChange}
                placeholder="خلاصه مقاله"
              />
              {/* Content editor */}
              <div>
                <label className="block font-bold mb-1">متن کامل مقاله:</label>
                <ReactQuill
                  value={form.content}
                  onChange={value => setForm({ ...form, content: value })}
                  className="mb-4 bg-white rtl-quill"
                  theme="snow"
                  style={{ minHeight: 120, direction: 'rtl', textAlign: 'right' }}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-bold">وضعیت نمایش:</label>
                <select
                  name="show"
                  value={form.show}
                  onChange={e => setForm({ ...form, show: e.target.value === 'true' })}
                  className="border-2 border-gold/40 rounded-lg px-2 py-1 focus:border-gold focus:ring-2 focus:ring-gold/30 transition"
                >
                  <option value="true">فعال</option>
                  <option value="false">غیرفعال</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-navy py-3 rounded-xl font-extrabold text-lg shadow hover:bg-gold-dark transition"
              >
                ذخیره
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogAdminPage; 