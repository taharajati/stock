import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { MdDateRange } from "react-icons/md";

const GroupPostDetail = () => {
  const { groupId } = useParams(); // Extract the group ID from the URL
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [postDetails, setPostDetails] = useState(null); // To store post details
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [selectedCategory, setSelectedCategory] = useState(location.state?.selectedCategory || null); // Set selected category from state

  // Fetch the group post detail by category and post ID
  const fetchGroupPostDetail = (categoryId, postId = null) => {
    const url = `https://api.optionscreener.ir/api/blog/educational_groups/detail?item_id=${categoryId}` +
      (postId ? `&post_id=${postId}` : '');

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPostDetails(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching group post detail:', error);
        setIsLoading(false);
      });
  };

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

  // Fetch data on component load
  useEffect(() => {
    if (groupId) {
      fetchGroupPostDetail(groupId); // Fetch the first post in the group
    }
  }, [groupId]);

  const handleNavigation = (postId) => {
    if (postId) {
      fetchGroupPostDetail(groupId, postId); // Fetch the next or previous post
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId); // Update selected category
    navigate(`/group/${categoryId}`, { state: { selectedCategory: categoryId } }); // Navigate with the updated state
  };

  // Show loading spinner when the page is loading
  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  if (!postDetails) {
    return (
      <div className="text-center mt-8 text-lg font-semibold text-red-500">
        هیچ پستی یافت نشد.
      </div>
    );
  }

  const { content, title, author_name, published_date_jalali, tags_fa, like_count, replies_count, is_first, is_last, previous_post_id, next_post_id } = postDetails;

  return (
    <div className="md:flex-row px-6 py-4 gap-4">
      {/* Image at the top */}
      <div className="w-full mb-6">
        <img
          src={postDetails.image_url || 'YOUR_IMAGE_URL_HERE'}
          alt="Post image"
          className="w-full h-auto rounded shadow-lg"
        />
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
                  className={`rounded-lg shadow hover:scale-105 transition-all cursor-pointer p-4 text-center ${
                    selectedCategory === category.unique_id
                      ? 'bg-slate-200 text-white' // Apply a different style when selected
                      : 'bg-white text-gray-800'
                  }`}
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
          <h1 className="text-3xl font-extrabold mb-4 text-right">{title}</h1>
          <p className="text-gray-600 mb-4 text-right">نویسنده: {author_name}</p>

          {/* Like and Comment Count */}
          <div className="flex items-start my-3" dir="ltr">
            <div className="flex items-center space-x-2 mx-2 text-gray-700">
              <i className="text-red-500 mx-1">
                <IoIosHeartEmpty size={30} />
              </i>
              <span className="text-sm">{like_count}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <i className="fas fa-comments text-blue-500 mx-1">
                <GoComment size={30} />
              </i>
              <span className="text-sm">{replies_count}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 ml-auto" dir='rtl'>
              <span className="text-sm text-gray-600 mx-1">
                <MdDateRange size={30} />
              </span>
              <span className="text-sm text-gray-600" >
                {published_date_jalali}
              </span>
            </div>
          </div>

          {/* Post Content */}
          <div className="bg-gray-50 p-6 rounded shadow-lg mb-6">
            <div
              dangerouslySetInnerHTML={{ __html: content }} // Render HTML content
              className="text-right leading-relaxed space-y-6"
            />
          </div>

          {/* Tags Section */}
          <div className="mt-6 text-right">
            <h3 className="text-xl font-semibold mb-2" dir="rtl">
              برچسب‌ها:
            </h3>
            <div className="flex flex-wrap gap-3">
              {tags_fa?.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-sm text-blue-800 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <br />
          <hr
            style={{
              borderWidth: 6,
              height: 5,
            }}
          />
          {/* Navigation Buttons */}
          <div className="flex my-3 items-center w-full justify-between">
            {/* Previous Post button */}
            <button
              className={`px-6 py-2 bg-[color:var(--color-primary)] text-white font-semibold rounded hover:bg-gray-400 transition-all ${is_first ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !is_first && handleNavigation(previous_post_id)}
              disabled={is_first}
            >
              پست قبلی
            </button>

            {/* Next Post button */}
            <button
              className={`px-6 py-2 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-bg-variant)] text-white font-semibold rounded transition-all ${is_last ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !is_last && handleNavigation(next_post_id)}
              disabled={is_last}
            >
              پست بعدی
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GroupPostDetail;
