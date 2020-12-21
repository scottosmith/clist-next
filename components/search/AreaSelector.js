import { useState, useEffect, forwardRef } from 'react';
import { Select } from '@chakra-ui/react';

const AreaSelector = forwardRef((props, ref) => {
  const [areas, setAreas] = useState([]);

  const getAreas = async () => {
    try {
      const response = await fetch('/api/areas');
      const data = await response.json();

      setAreas(data.areas);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAreas();
  }, []);

  return (
    <Select ref={ref} variant="outline" size="md" tabIndex="1" fontSize="sm">
      <option key="no-area-selected" value="">
        Select an Area
      </option>
      {areas &&
        areas.map(area => (
          <option key={area.AreaID} value={area.Hostname}>
            {area.ShortDescription} - {area.Region}
          </option>
        ))}
    </Select>
  );
});

export default AreaSelector;
