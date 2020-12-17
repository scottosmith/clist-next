import { useState, useEffect, forwardRef } from 'react';

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
    <select ref={ref}>
      <option key="no-area-selected" value="">
        Select an Area
      </option>
      {areas &&
        areas.map(area => (
          <option key={area.AreaID} value={area.Hostname}>
            {area.ShortDescription} - {area.Region}
          </option>
        ))}
    </select>
  );
});

export default AreaSelector;
