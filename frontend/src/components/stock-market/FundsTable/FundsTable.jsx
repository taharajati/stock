import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IoMdClose, IoIosAddCircle } from 'react-icons/io';
import { CgDetailsMore } from 'react-icons/cg';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const FundsTable = () => {
  const [fundsData, setFundsData] = useState([]);
  const [columnsByGroup, setColumnsByGroup] = useState({});
  const [translations, setTranslations] = useState({});
  const [selectedGroup, setSelectedGroup] = useState('summary');  // Default group is 'summary'
  const [groups, setGroups] = useState({});  // Store group names fetched from API
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [openDropdown, setOpenDropdown] = useState({});
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state for the entire component

  useEffect(() => {
    const fetchFundsData = async () => {
      setIsLoading(true);
      try {
        // Fetch columns and translations
        const columnsResponse = await fetch('https://api.optionscreener.ir/api/funds/fund_columns');
        const columnsData = await columnsResponse.json();

        // Extract columns and groups from the response
        const groupedColumns = {};
        Object.keys(columnsData.groupscolumn).forEach(group => {
          groupedColumns[group] = columnsData.groupscolumn[group];
        });

        setColumnsByGroup(groupedColumns);
        setTranslations(columnsData.fields);  // Store translations in state
        setGroups(columnsData.groups);  // Store group names in state

        // Fetch funds data
        const fundsResponse = await fetch('https://api.optionscreener.ir/api/funds');
        const fundsData = await fundsResponse.json();
        if (fundsData && fundsData.funds) {
          setFundsData(fundsData.funds);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading to false when data fetching is done
      }
    };

    fetchFundsData();
  }, []);

  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

  const sortData = (data, criteria, order) => {
    return data.sort((a, b) => {
      const valueA = typeof a[criteria] === 'number' ? a[criteria] : a[criteria]?.toLowerCase();
      const valueB = typeof b[criteria] === 'number' ? b[criteria] : b[criteria]?.toLowerCase();
      return order === 'asc' ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
    });
  };

  const switchGroup = (group) => {
    setSelectedGroup(group);
  };

 // if (isLoading) {
  //  return (
   //   <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    //    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
    //  </div>
  //  );
 // }

  // Prepare columns for DataGrid
  const columns = columnsByGroup[selectedGroup]?.map((column, index) => ({
    field: column,
    headerName: translations[column] || column,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    sortable: true,
    renderCell: (params) => {
      const value = params.value;
      const isNumeric = typeof value === 'number' || !isNaN(Number(value));
      const numericValue = isNumeric ? Number(value) : value;
      return (
        <div style={{ textAlign: 'center', padding: '4px' }}>
          {isNumeric ? numericValue.toLocaleString() : numericValue ?? 'N/A'}
        </div>
      );
    },
  }));

  // Format rows for DataGrid
  const rows = fundsData.map((row, index) => {
    const formattedRow = { id: index }; // Unique ID for each row
    Object.keys(row).forEach((key) => {
      formattedRow[key] = isNaN(Number(row[key])) ? row[key] : Number(row[key]);
    });
    return formattedRow;
  });

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <div className="mx-auto p-4 w-[85%]" dir="rtl">
        {/* Dynamically render buttons based on groups */}
        <div className="mb-4 space-x-4">
          {Object.keys(groups).map((groupKey) => (
            <button
              key={groupKey}
              onClick={() => switchGroup(groupKey)}
              className={`px-4 py-2 rounded-lg font-bold border transition duration-300 ${selectedGroup === groupKey ? 'bg-gold text-navy border-gold scale-105' : 'bg-navy text-gold border-navy hover:bg-gold hover:text-navy hover:border-gold'}`}
            >
              {groups[groupKey]}
            </button>
          ))}
        </div>

        {/* DataGrid Table */}
        <div style={{ height: 650, width: '100%' }} className="bg-navy text-gold border border-gold rounded-lg p-2">
          <DataGrid
            rows={rows || []}
            columns={columns || []}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            sortingOrder={['asc', 'desc']}
            sortModel={[{ field: sortCriteria, sort: sortOrder }]}
            onSortModelChange={(newModel) => {
              const newSortCriteria = newModel[0]?.field || null;
              const newSortOrder = newModel[0]?.sort || 'asc';
              setSortCriteria(newSortCriteria);
              setSortOrder(newSortOrder);
            }}
            sx={{
              direction: 'rtl',
              '& .MuiDataGrid-root': { direction: 'rtl', backgroundColor: '#0A2342', color: '#FFD700', borderColor: '#FFD700' },
              '& .MuiDataGrid-columnHeaders': { backgroundColor: '#061529', color: '#FFD700', textAlign: 'center', borderColor: '#FFD700' },
              '& .MuiDataGrid-cell': { textAlign: 'center', fontFamily: 'inherit', direction: 'ltr', color: '#FFD700', borderColor: '#FFD700' },
              '& .MuiDataGrid-row': { borderColor: '#FFD700' },
              '& .MuiDataGrid-footerContainer': { backgroundColor: '#0A2342', color: '#FFD700', borderColor: '#FFD700' },
              '& .MuiTablePagination-root': { color: '#FFD700' },
              '& .MuiDataGrid-selectedRowCount': { color: '#FFD700' },
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default FundsTable;