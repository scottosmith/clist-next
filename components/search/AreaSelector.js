import { useState, useEffect, useCallback } from 'react';

const AreaSelector = ({ selectedArea, setSelectedArea }) => {
  const [areas, setAreas] = useState([]);

  const getAreas = useCallback(async () => {
    try {
      const response = await fetch('/api/areas');
      const data = await response.json();

      setAreas(data.areas);
    } catch (error) {
      throw error;
    }
  }, [setAreas]);

  useEffect(() => {
    getAreas();
  }, [getAreas]);

  return (
    <select
      onChange={e => setSelectedArea(e.target.value)}
      value={selectedArea}
    >
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
};

export default AreaSelector;
