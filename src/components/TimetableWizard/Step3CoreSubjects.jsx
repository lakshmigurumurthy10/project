import React, { useState } from 'react';

const Step3CoreSubjects = ({ formData, updateForm, next, prev }) => {
  const [subjects, setSubjects] = useState({});

  const handleSubjectEntry = (year, index, field, value) => {
    const current = subjects[year] || [];
    current[index] = { ...current[index], [field]: field === 'hours' ? Number(value) : value };
    setSubjects(prev => ({ ...prev, [year]: current }));
  };

  const handleSubmit = () => {
    updateForm('coreSubjects', subjects);
    next();
  };

  return (
    <div>
      <h2>Step 3: Core Subject Details</h2>
      {Object.keys(formData.coreSubjectMeta).map(year => {
        const count = formData.coreSubjectMeta[year].count || 0;
        return (
          <div key={year}>
            <h4>Year {year}</h4>
            {[...Array(count)].map((_, i) => (
              <div key={i}>
                <input
                  type="text"
                  placeholder={`Subject ${i + 1} name`}
                  onBlur={e => handleSubjectEntry(year, i, 'name', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Weekly hours"
                  onBlur={e => handleSubjectEntry(year, i, 'hours', e.target.value)}
                />
              </div>
            ))}
          </div>
        );
      })}
      <button onClick={prev}>Back</button>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default Step3CoreSubjects;