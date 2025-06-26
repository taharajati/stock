import { useMemo } from 'react';

const useColumnClasses = (column, condition) => {
  return useMemo(() => {
    // شرط یا وضعیت خاص برای تنظیم کلاس‌ها
    if (condition) {
      return `special-class ${column.className || ''}`;
    }
    return column.className || '';
  }, [column, condition]);
};

export default useColumnClasses;
