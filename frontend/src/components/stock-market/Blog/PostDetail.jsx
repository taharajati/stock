import React, { useState, useEffect } from 'react';
import {useLocation, useParams, useNavigate } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { MdDateRange } from "react-icons/md";

const PostDetail = () => {
  const { uniqueId } = useParams(); // Get uniqueId from URL
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();

  const postImage = location.state?.image; // تصویر پست از state


  // Fetch Post Details
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`https://api.optionscreener.ir/api/blog/?post=${uniqueId}`);
        const data = await response.json();
        setPost(data.data[0]); // Assuming the data is in the "data" array
      } catch (error) {
        console.error('Error fetching post details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostDetails();
  }, [uniqueId]);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.optionscreener.ir/api/blog/educational_groups');
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center mt-8 text-lg font-semibold text-red-500">
        خطا در بارگذاری پست
      </div>
    );
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId); // Update selected category
    navigate(`/group/${categoryId}`, { state: { selectedCategory: categoryId } }); // Navigate with the updated state
  };

  return (
    <div className="md:flex-row px-6 py-4 gap-4">
      {/* Image at the top */}
      <div className="w-full mb-6">
        <img
          src={postImage || 'default_image_url'} // نمایش تصویر
          alt="Post Image"
          className="w-full h-auto rounded shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row px-6 py-6 gap-6">
        {/* Categories Section */}
        <div className="w-full md:w-1/4 p-6 rounded-lg shadow-lg">
          <div className="bg-white p-6">
            <h3 className="text-xl font-semibold text-white text-center border-b-4 border-[color:var(--color-text)] bg-[color:var(--color-bg-variant)] py-3 rounded-md">
              دسته بندی ها
            </h3>
            {categories.map((category) => (
              <div
                key={category.unique_id}
                onClick={() => handleCategorySelect(category.unique_id)}
                className="rounded-lg shadow hover:scale-105 transition-all cursor-pointer p-4 text-center"
              >
                <span className="text-gray-800 font-semibold text-lg">
                  {category.name_fa}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Post Content Section */}
        <div className="w-full md:w-3/4 bg-white p-6 rounded shadow-lg" dir="rtl">
          <h1 className="text-3xl font-extrabold mb-4 text-right">{post.title}</h1>
          <p className="text-gray-600 mb-4 text-right">نویسنده: {post.author_name}</p>
          <div className="flex mx-2 space-x-2 text-gray-700 items-center" dir="ltr">
            <span className="text-sm text-gray-600 mx-1">
              <MdDateRange size={30} />
            </span>
            <span className="text-sm text-gray-600" dir="rtl">
              {post.published_date_jalali}
            </span>
          </div>

          {/* Like and Comment Count */}
          <div className="flex items-start my-3" dir="ltr">
            <div className="flex items-center space-x-2 mx-2 text-gray-700">
              <i className="text-red-500 mx-1">
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
          </div>

          {/* Post Content */}
          <div className="bg-gray-50 p-6 rounded shadow-lg mb-6">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }} // Render HTML content
              className="text-right leading-relaxed space-y-6"
            />
          </div>

          {/* Tags Section */}
          <div className="mt-6 text-right">
            <h3 className="text-xl font-semibold mb-2" dir="rtl">
              برچسب‌ها:
            </h3>
            <div className="flex flex-wrap gap-3">
              {post.tags_fa.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-sm text-blue-800 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
