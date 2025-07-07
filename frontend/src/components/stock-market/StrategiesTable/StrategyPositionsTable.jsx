import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const StrategyPositionsTable = () => {
  const { url } = useParams();
  const [data, setData] = useState([]);
  const [explanation, setExplanation] = useState('');
  const [columnNames, setColumnNames] = useState({});
  const [columnColors, setColumnColors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.optionscreener.ir/api/strategies/${url}/auto`);
        const result = await response.json();

        if (result.data) {
          setData(Array.isArray(result.data) ? result.data : []);
          setColumnNames(result.column_names || {});
          setColumnColors(result.column_colors || {});
          setExplanation(result.explanation || '');
        } else {
          setError('Invalid data format received');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch positions');
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const handleGoBack = () => {
    navigate('/StrategiesTable');
  };

  // Prepare columns for DataGrid
  const columns = Object.entries(columnNames).map(([key, label]) => ({
    field: key,
    headerName: label,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    sortable: true,
    filterable: true,
    type: key.toLowerCase().includes('price') || key.toLowerCase().includes('number') ? 'number' : 'string', // Specify number type for numeric fields
    renderCell: (params) => {
      const value = params.value;
      const isNumeric = typeof value === 'number' || !isNaN(Number(value));
      const numericValue = isNumeric ? Number(value) : value;

      // Apply custom color logic
      let cellColor = 'black'; // Default color
      if (isNumeric && numericValue < 0) {
        cellColor = 'red'; // Negative values in red
      } else if (columnColors[key] === 'green') {
        cellColor = '#155724'; // Green for specified column color
      } else if (columnColors[key] === 'red') {
        cellColor = '#721c24'; // Red for specified column color
      }
      const color =
      columnColors[key] === 'green'
        ? '#d4edda'
        : columnColors[key] === 'red'
        ? '#f8d7da'
        : 'white';

    const textColor =
      columnColors[key] === 'green' || columnColors[key] === 'red'
        ? '#155724'
        : 'black';
        
      return (
        <div
          style={{
            backgroundColor: color,
            color: cellColor,
            padding: '4px',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          {isNumeric ? numericValue.toLocaleString() : numericValue ?? 'N/A'}
        </div>
      );
    },
  }));

  // Format rows for DataGrid
  const rows = data.map((row, index) => {
    const formattedRow = { id: index }; // Unique ID for each row
    Object.keys(row).forEach((key) => {
      formattedRow[key] = isNaN(Number(row[key])) ? row[key] : Number(row[key]);
    });
    return formattedRow;
  });

  if (loading) return  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
</div>;
  if (error) return <div className="text-center">{error}</div>;

  return (
    <div className="mx-auto p-4 w-[85%]" dir="rtl">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="bg-gold text-navy py-1 px-3 rounded-lg mb-4 border border-gold font-bold hover:bg-navy hover:text-gold transition"
      >
        بازگشت به لیست استراتژی ها
      </button>

      {/* Explanation */}
      {explanation && (
        <div className="mb-4 p-4 bg-navy border border-gold rounded-lg text-gold">
          <p>{explanation}</p>
        </div>
      )}

      {/* DataGrid Table */}
      <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={rows || []}
          columns={columns || []}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{
            direction: 'rtl', // Set table direction to RTL
            '& .MuiDataGrid-root': {
              direction: 'rtl', // RTL for the entire table wrapper
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f0f0f0',
              textAlign: 'center',
              lineHeight: '2.5',
            },
            '& .MuiDataGrid-cell': {
              textAlign: 'center', // Keep cell content centered
              fontFamily: 'inherit',
              direction: 'ltr', // Set rows' direction to LTR
            },
            '& .MuiDataGrid-row': {},
          }}
        />
      </div>
    </div>
  );
};

export default StrategyPositionsTable;
