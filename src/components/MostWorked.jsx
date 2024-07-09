// components/MostWorked.jsx
import React from 'react';

function MostWorked({ data }) {
  return (
    <div className="most-worked">
      <h3>Lo más trabajado</h3>
      <ul>
        {data.map(item => (
          <li key={item.label}>
            {item.label}: {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MostWorked;
