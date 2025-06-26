import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import i1 from '../../../assets/stock-market/i1.png'; // Background image
import i2 from '../../../assets/stock-market/i2.png'; // Background image
import i3 from '../../../assets/stock-market/i3.png'; // Background image
import i4 from '../../../assets/stock-market/i4.png'; // Background image
import { IoIosHeartEmpty } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { MdDateRange } from "react-icons/md";

const Blog = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  // Loading state

  const [navigation, setNavigation] = useState({
    is_first: false,
    is_last: false,
    previous_post_id: null,
    next_post_id: null,
  });
  const [sortBy, setSortBy] = useState('publish_date_asc'); // Default sorting by ascending publish date
  const navigate = useNavigate();

  const images = [i1, i2, i3, i4]; // مسیر تصاویر شما
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch Categories
  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching categories
    fetch('https://api.optionscreener.ir/api/blog/educational_groups')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data || []);
        setIsLoading(false); // Set loading to false once the data is fetched
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setIsLoading(false); // Set loading to false if an error occurs
      });
  }, []);

  // Fetch Posts
  const fetchPosts = (sort_by = 'publish_date_asc') => {
    setIsLoading(true); // Set loading to true when fetching posts
    fetch(`https://api.optionscreener.ir/api/blog/blogposts?sort_by=${sort_by}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data || []);
        setIsLoading(false); // Set loading to false once the data is fetched
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setIsLoading(false); // Set loading to false if an error occurs
      });
  };

  // Fetch posts when the component mounts or `sortBy` changes
  useEffect(() => {
    fetchPosts(sortBy);
  }, [sortBy]);

  // Handle Sorting Change
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  // Fetch Tags
  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching tags
    fetch('https://api.optionscreener.ir/api/blog/tags')
      .then((response) => response.json())
      .then((data) => {
        setTags(data.data || []);
        setIsLoading(false); // Set loading to false once the data is fetched
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
        setIsLoading(false); // Set loading to false if an error occurs
      });
  }, []);

  const handlePostClick = (postId, postImage) => {
    // انتقال uniqueId و تصویر به PostDetail از طریق state
    navigate(`/post/${postId}`, {
      state: { image: postImage }
    });
  };
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);  // Track the selected category
    navigate(`/group/${categoryId}`, { state: { selectedCategory: categoryId } });
  };
  


  const handleImageChange = (index) => {
    setCurrentIndex(index);
  };


  return (
    <>
      <div className="flex flex-col ">
     {/* Header */}
     <div className="relative w-full h-[60vh] md:h-[650px] overflow-hidden rounded-t-lg">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            } object-cover`} // تغییر به object-cover برای پر کردن فضا
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleImageChange(index)}
            className={`w-4 h-4 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row px-6 py-6 gap-6">
          {/* Categories Section */}
          <div className="w-full md:w-1/4  p-6 rounded-lg shadow-lg">
            <div className="bg-white  p-6">
            <h3 className="text-xl font-semibold text-white text-center border-b-4 border-[color:var(--color-text)] bg-[color:var(--color-bg-variant)] py-3 rounded-md">
              دسته بندی ها
            </h3>
            {categories.map((category) => (
                <div
                  key={category.unique_id}
                  onClick={() => handleCategorySelect(category.unique_id)}
                  className=" rounded-lg shadow hover:scale-105 transition-all cursor-pointer p-4 text-center"
                >
                  <span className="text-gray-800 font-semibold text-lg">
                    {category.name_fa}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Posts Section */}
          <div className="w-full md:w-3/4 space-y-6 "  dir="rtl">
            {/* Sorting */}
            <div className="flex flex-wrap gap-4 mb-6">
              {['publish_date_asc', 'publish_date_dec', 'likes_asc', 'likes_dec', 'replies_asc', 'replies_dec'].map((sortOption) => (
                <button
                  key={sortOption}
                  onClick={() => handleSortChange(sortOption)}
                  className={`px-5 py-2 rounded-lg transition duration-200 ${
                    sortBy === sortOption
                      ? 'bg-[color:var(--color-bg-variant)] text-white'
                      : 'bg-slate-500 hover:bg-[color:var(--color-bg-variant)] text-white'
                  }`}
                >
                  {sortOption === 'publish_date_dec' && 'آخرین مطلب'}
                  {sortOption === 'publish_date_asc' && 'قدیمی ترین'}
                  {sortOption === 'likes_asc' && 'لایک‌ها (صعودی)'}
                  {sortOption === 'likes_dec' && 'لایک‌ها (نزولی)'}
                  {sortOption === 'replies_asc' && 'پاسخ‌ها (صعودی)'}
                  {sortOption === 'replies_dec' && 'پاسخ‌ها (نزولی)'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {posts.map((post, index) => (
    <div
      key={post._id.$oid}
      onClick={() => handlePostClick(post.unique_id, images[index])}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer"
    >
      {/* Post Image and Content Container */}
      <div className="flex flex-row-reverse items-start">
        {/* Post Image */}
        <div className="w-32 h-32 ml-4">
          <img
            src={images[index]} // استفاده از index برای هم‌خوانی تصویر با پست
            alt={post.title} // عنوان تصویر
            className="w-full h-full object-cover rounded-lg" // تنظیم تصویر به صورت cover و با گوشه‌های گرد
          />
        </div>

        {/* Post Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
          <p className="text-sm text-gray-600">نویسنده: {post.author_name}</p>
          <div className="flex items-center mt-3 space-x-4 text-sm text-gray-700">
            <div className="flex flex-wrap gap-3 mt-3">
              {post.tags_fa.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-300 text-sm px-3 py-1 rounded-full text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-start mt-3" dir="ltr">
            <div className="flex items-center space-x-2 mx-2 text-gray-700">
              <i className="fas fa-heart text-red-500 mx-1">
                <IoIosHeartEmpty size={30} />
              </i>
              <span className="text-sm">{post.like_count}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <i className="fas fa-comments text-blue-500 mx-1">
                <GoComment size={30} />
              </i>
              <span className="text-sm">{post.replies_count}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 ml-auto" dir="rtl">
              <span className="text-sm text-gray-600 mx-1">
                <MdDateRange size={30} />
              </span>
              <span className="text-sm text-gray-600">{post.published_date_jalali}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
