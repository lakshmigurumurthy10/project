import React, { useState } from 'react';

const Step4AdditionalSubjects = ({ formData, updateForm, next, prev }) => {
  const [extraSubjects, setExtraSubjects] = useState({});

  const handleExtra = (year, subject, hours, sectionTeachers) => {
    setExtraSubjects(prev => ({
      ...prev,
      [year]: [
        ...(prev[year] || []),
        { name: subject, hours: Number(hours), teachers: sectionTeachers }
      ]
    }));
  };

  const handleSubmit = () => {
    updateForm('additionalSubjects', extraSubjects);
    next();
  };

  return (
    <div>
      <h2>Step 4: Additional Subjects</h2>
      {Object.keys(formData.labTimetable).map(year => {
        const sections = formData.labTimetable[year] || [];
        const sectionTeachers = {};
        return (
          <div key={year}>
            <h4>Year {year}</h4>
            <label>Additional Subject:</label>
            <input id={`sub-${year}`} placeholder="Subject name" />
            <input id={`hrs-${year}`} type="number" placeholder="Hours" />
            {sections.map(section => (
              <div key={section}>
                <label>{`Teacher for section ${section}`}</label>
                <input
                  onBlur={e => {
                    sectionTeachers[section] = e.target.value;
                  }}
                />
              </div>
            ))}
            <button onClick={() => {
              const s = document.getElementById(`sub-${year}`).value;
              const h = document.getElementById(`hrs-${year}`).value;
              handleExtra(year, s, h, sectionTeachers);
            }}>Add Subject</button>
          </div>
        );
      })}
      <button onClick={prev}>Back</button>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default Step4AdditionalSubjects;
