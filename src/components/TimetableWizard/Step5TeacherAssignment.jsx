import React, { useState } from 'react';

const Step5TeacherAssignment = ({ formData, updateForm, next, prev }) => {
  const [teacherMap, setTeacherMap] = useState({});

  const handleTeacherInput = (year, index, name) => {
    const current = teacherMap[year] || [];
    current[index] = name;
    setTeacherMap(prev => ({ ...prev, [year]: current }));
  };

  const handleSubmit = () => {
    updateForm('teachers', teacherMap);
    next();
  };

  return (
    <div>
      <h2>Step 5: Assign Teachers</h2>
      {Object.keys(formData.labTimetable).map(year => (
        <div key={year}>
          <h4>Year {year}</h4>
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Teacher ${i + 1}`}
              onBlur={e => handleTeacherInput(year, i, e.target.value)}
            />
          ))}
        </div>
      ))}
      <button onClick={prev}>Back</button>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default Step5TeacherAssignment;
