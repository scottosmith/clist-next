import { useState, useEffect, useCallback } from 'react';

const CategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();

      setCategories(data.categories);
    } catch (error) {
      throw error;
    }
  }, [setCategories]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <select
      onChange={e => setSelectedCategory(e.target.value)}
      value={selectedCategory}
    >
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
};

export default CategorySelector;
