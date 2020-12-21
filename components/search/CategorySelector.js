import { useState, useEffect, forwardRef } from 'react';
import { Select } from '@chakra-ui/react';

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
    <Select ref={ref} variant="outline" size="md" tabIndex="2" fontSize="sm">
      <option key="no-cat-selected" value="">
        Select a Category
      </option>
      {categories &&
        categories.map(category => (
          <option key={category.CategoryID} value={category.Abbreviation}>
            {category.Description}
          </option>
        ))}
    </Select>
  );
});

export default CategorySelector;
