import { useState, useEffect, forwardRef } from 'react';

const CategorySelector = forwardRef((props, ref) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();

      setCategories(data.categories);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <select ref={ref}>
      <option key="no-cat-selected" value="">
        Select a Category
      </option>
      {categories &&
        categories.map(category => (
          <option key={category.CategoryID} value={category.Abbreviation}>
            {category.Description}
          </option>
        ))}
    </select>
  );
});

export default CategorySelector;
