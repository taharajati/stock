import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Filter08 = ({ setFilterValue }) => {
  const [watchpoints, setWatchpoints] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedTab, setSelectedTab] = useState('');
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDetailEditPopupOpen, setIsDetailEditPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [selectedWatchpoint, setSelectedWatchpoint] = useState(null);
  const [newWatchpoint, setNewWatchpoint] = useState({ name: '', instruments: '' });
  const [newInstrument, setNewInstrument] = useState('');
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [editName, setEditName] = useState('');


  const fetchWatchpoints = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    axios.get('https://api.optionscreener.ir/api/user_screener/', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      const data = response.data.data;
      setWatchpoints(data);
      const uniqueCategories = [...new Set(data.map(wp => wp.name))];
      setCategories(uniqueCategories);
    })
    .catch(error => {
      console.error("Error fetching watchpoints:", error);
    });
  };

  useEffect(() => {
    fetchWatchpoints();
  }, []);

  const handleTabClick = (category) => {
    if (selectedTab === category || category === "نمایش همه") {
      setSelectedTab('');
      setSelectedInstruments([]);
      setFilterValue([]); // Reset filter to show all
    } else {
      setSelectedTab(category);
      const selectedWatchpoint = watchpoints.find(wp => wp.name === category);
      if (selectedWatchpoint) {
        setSelectedInstruments(selectedWatchpoint.list_of_instruments);
        setFilterValue(selectedWatchpoint.list_of_instruments);
      }
    }
  };

  const handleInstrumentToggle = (instrumentId) => {
    const updatedInstruments = selectedInstruments.includes(instrumentId)
      ? selectedInstruments.filter(id => id !== instrumentId) // Remove if already selected
      : [...selectedInstruments, instrumentId]; // Add if not selected

    setSelectedInstruments(updatedInstruments);
    setFilterValue(updatedInstruments); // Update filter value with the new list of instruments
  };
  const openEditPopup = () => setIsEditPopupOpen(true);

  const closeEditPopup = () => setIsEditPopupOpen(false);

const openEditDetailPopup = (watchpoint) => {
  setSelectedWatchpoint(watchpoint);
  setEditName(watchpoint.name); // Set the initial name in the input
  setIsDetailEditPopupOpen(true);
};

  const closeDetailEditPopup = () => {
    setIsDetailEditPopupOpen(false);
    setSelectedWatchpoint(null);
  };
  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => {
    setIsAddPopupOpen(false);
    setNewWatchpoint({ name: '', instruments: '' });
  };

  const handleAddWatchpoint = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    axios.post('https://api.optionscreener.ir/api/user_screener/', 
      { name: newWatchpoint.name },
      { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      closeAddPopup(); 
      fetchWatchpoints(); // Refetch watchpoints after adding
    })
    .catch(error => {
      console.error("Error adding watchpoint:", error);
    });
  };

  const handleAddInstrument = () => {
    if (!newInstrument) {
      console.error("No instrument provided");
      return; 
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    axios.post('https://api.optionscreener.ir/api/user_screener/instrument', {
      instrument_id: newInstrument,
      screener_id: selectedWatchpoint.id // Assuming screener_id is the watchpoint id
    }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      closeAddPopup(); // Optionally close the popup if it was open
      fetchWatchpoints(); // Refetch watchpoints after adding instrument
      setNewInstrument(''); // Reset the input field
    })
    .catch(error => {
      console.error("Error adding instrument:", error);
    });
  };

  const handleDeleteInstrument = (instrumentId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    axios.delete('https://api.optionscreener.ir/api/user_screener/instrument', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        instrument_id: instrumentId,
        screener_id: selectedWatchpoint.id // Assuming screener_id is the watchpoint id
      }
    })
    .then(response => {
      fetchWatchpoints(); // Refetch watchpoints after deleting instrument
    })
    .catch(error => {
      console.error("Error deleting instrument:", error);
    });
  };

  const handleDeleteWatchpoint = async (watchpointId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }
    try {
      const response = await fetch(`https://api.optionscreener.ir/api/user_screener/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ screener_id: watchpointId.$oid }),
      });

      if (response.ok) {
        fetchWatchpoints(); // Refetch watchpoints after deleting
      } else {
        console.error('Failed to delete watchpoint', await response.json());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
// Function to handle watchpoint name edit with both `name` and `screener_id`
const handleEditWatchpointName = (editName) => {
  console.log("Updated Watchpoint Name:", editName);

  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No access token found');
    return;
  }

  axios.put('https://api.optionscreener.ir/api/user_screener/', {
    name: editName.name,
    screener_id: editName._id.$oid
  }, {
    headers: { Authorization: `Bearer ${token}` },
    
  })
  .then(response => {
    fetchWatchpoints(); // Refetch watchpoints after editing
    setEditName(''); // Reset the input field
    closeDetailEditPopup(); // Close the edit popup
  })
  .catch(error => {
    console.error("Error editing watchpoint name:", error);
  });
};

  return (
    <div className="my-3 mr-6 text-right">
      <div className="flex items-center flex-row-reverse justify-normal">
        <div className="text-lg font-bold ml-4">: دیدبان شخصی </div>
        <div className="flex space-x-4 mx-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleTabClick(category)}
              className={`text-sm px-2 ${selectedTab === category ? 'font-bold text-[color:var(--color-bg-variant)] border-b-2 border-[color:var(--color-text)]' : 'text-gray-400'}`}
            >
              {category}
            </button>
          ))} 
          <button
            onClick={() => handleTabClick("نمایش همه")}
            className={`text-sm px-2 ${!selectedTab ? 'font-bold text-[color:var(--color-bg-variant)] border-b-2 border-[color:var(--color-text)]' : 'text-gray-400'}`}
          >
            نمایش همه
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={openEditPopup} className="flex items-center space-x-1 text-sm text-gold">
          <span><FaEdit className='text-gold scale-125' />
          </span>
          </button>
          <button onClick={openAddPopup} className="flex items-center space-x-1 text-sm text-gold">
            <span><IoIosAddCircle className='text-gold scale-125' />
            </span>
          </button>
        </div>
      </div>

      {/* Main Edit Popup */}
      {isEditPopupOpen && (
 <div className="fixed -inset-x-[2000px] inset-y-[-20000px] flex items-center mr-[1200px] mt-[150px] justify-center bg-black bg-opacity-30 z-50 ">
    <div className="bg-white w-[900px] max-h-[370px] p-4 rounded-lg shadow-lg overflow-y-scroll">
      <button onClick={closeEditPopup} className="text-gray-500 top-2 right-2">X</button>
      <h2 className="text-lg font-semibold">ویرایش دیده‌بان</h2>
      <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"/>

      <table className="w-full mt-4 " dir='rtl'>
        <thead>
          <tr className="text-right text-gray-500">
            <th>نام</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {watchpoints.map((wp) => (
            <tr key={wp.id} className="text-right border-t">
              <td>{wp.name}</td>
              <td>
                <button
                  onClick={() => openEditDetailPopup(wp)}
                >
<IoIosAddCircle className='text-[color:var(--color-primary)] scale-125 my-2' />                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteWatchpoint(wp._id)} >
                <MdDelete className='text-red-500 scale-125 my-2'/>

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={closeEditPopup} className="px-4 py-2 bg-gray-300 rounded">انصراف</button>
      </div>
    </div>
  </div>
)}

    

       {/* Add Popup for Watchpoint */}
       {isAddPopupOpen && (
       <div className="fixed -inset-x-[2000px] inset-y-[-20000px] flex items-center mr-[1200px] mt-[200px] justify-center bg-black bg-opacity-30 z-50">
    <div className="bg-white w-[900px] p-4 h-[280px]  rounded-lg shadow-lg">
            <button onClick={closeAddPopup} className="text-gray-500">X</button>
            <h2 className="text-lg font-semibold">اضافه کردن دیده‌بان جدید</h2>
            <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"/>

            <input
              type="text"
              placeholder="نام دیده‌بان"
              value={newWatchpoint.name}
              onChange={(e) => setNewWatchpoint({ ...newWatchpoint, name: e.target.value })}
              className="border rounded p-2 w-full mt-2 text-right"
            />
            <div className="flex justify-between mt-4">
              <button onClick={closeAddPopup} className="px-4 py-2  rounded border text--[color:var(--color-bg-variant)] border-[color:var(--color-bg-variant)]">انصراف</button>
              <button onClick={handleAddWatchpoint} className="px-4 py-2 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-bg-variant)] text-white rounded">افزودن دیده‌بان</button>
            </div>
          </div>
        </div>
      )}

    {/* Detail Edit Popup for selected Watchpoint */}
{selectedWatchpoint && (
  <div className="fixed -inset-x-[2000px] inset-y-[-20000px] flex items-center mr-[1200px] mt-[150px] justify-center bg-black bg-opacity-30 z-50 ">
    <div className="bg-white w-[900px] max-h-[370px] p-4 rounded-lg shadow-lg overflow-y-scroll">
      <button onClick={() => setSelectedWatchpoint(null)} className="text-gray-500">X</button>

      {/* Editable Name Field */}
      <h2 className="text-lg font-semibold mt-4">ویرایش نام</h2>
      <input
  type="text"
  value={editName}
  onChange={(e) => setEditName(e.target.value)}
  className="border rounded p-2 w-full mt-2"
  placeholder="نام جدید واچ پوینت"
/>
      <button

onClick={() => handleEditWatchpointName(selectedWatchpoint, editName)} 
       className="mt-2 px-4 py-2 bg-gold hover:bg-navy hover:text-gold text-navy rounded font-bold border border-gold transition">
        ذخیره نام
      </button>

      <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />

      <div className="mt-4">
        <h3>لیست ابزارها</h3>
        <ul>
          {selectedWatchpoint.list_of_instruments.map(instrument => (
            <li key={instrument} className="flex justify-between border-b py-2">
              <span>{instrument}</span>
              <button onClick={() => handleDeleteInstrument(selectedWatchpoint, instrument)} className="text-red-500">حذف</button>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-4">افزودن ابزار جدید</h2>
        <input
          type="text"
          placeholder="نام ابزار جدید"
          value={newInstrument}
          onChange={(e) => setNewInstrument(e.target.value)}
          className="border rounded p-2 w-full mt-2"
        />
        <button onClick={() => handleAddInstrument(selectedWatchpoint)} className="mt-4 px-4 py-2 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-bg-variant)] text-white rounded">افزودن ابزار</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Filter08;
