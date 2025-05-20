import React, { useState } from 'react';

const Step2ClassroomSetup = ({ formData, updateForm, next, prev }) => {
  const [meta, setMeta] = useState({});

  const handleYearInput = (year, field, value) => {
    setMeta(prev => ({
      ...prev,
      [year]: {
        ...prev[year],
        [field]: field === 'count' ? Number(value) : value
      }
    }));
  };

  const handleClassroomChange = (year, index, value) => {
    const classrooms = meta[year]?.classrooms || [];
    classrooms[index] = value;
    setMeta(prev => ({
      ...prev,
      [year]: {
        ...prev[year],
        classrooms
      }
    }));
  };

  const handleSubmit = () => {
    updateForm('coreSubjectMeta', meta);
    next();
  };

  return (
    <div>
      <h2>Step 2: Core Subject + Classroom Setup</h2>
      {Object.keys(formData.labTimetable).map(year => (
        <div key={year}>
          <h4>Year {year}</h4>
          <label>Number of core subjects:</label>
          <input type="number" onChange={e => handleYearInput(year, 'count', e.target.value)} />
          <label>Number of classrooms:</label>
          <input type="number" onChange={e => handleYearInput(year, 'numRooms', e.target.value)} />
          {[...Array(meta[year]?.numRooms || 0)].map((_, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Classroom ${idx + 1}`}
              onBlur={e => handleClassroomChange(year, idx, e.target.value)}
            />
          ))}
        </div>
      ))}
      <button onClick={prev}>Back</button>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default Step2ClassroomSetup;

