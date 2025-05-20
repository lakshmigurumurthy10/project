import React, { useState } from 'react';

const Step1LabTimetable = ({ updateForm, next }) => {
  const [years] = useState(['1', '2', '3']);
  const [labTimetable, setLabTimetable] = useState({});
  const [labSubjects, setLabSubjects] = useState({});
  const [labCounts, setLabCounts] = useState({});

  const handleSectionInput = (year, sectionsCSV) => {
    const sections = sectionsCSV.split(',').map(s => s.trim());
    setLabTimetable(prev => ({ ...prev, [year]: sections }));
    setLabCounts(prev => ({
      ...prev,
      [year]: Object.fromEntries(sections.map(section => [section, 0]))
    }));
  };

  const handleLabCount = (year, section, count) => {
    setLabCounts(prev => ({
      ...prev,
      [year]: { ...prev[year], [section]: Number(count) }
    }));
  };

  const handleSubjects = (year, subjectsCSV) => {
    setLabSubjects(prev => ({ ...prev, [year]: subjectsCSV.split(',').map(s => s.trim()) }));
  };

  const handleSubmit = () => {
    updateForm('labTimetable', labTimetable);
    updateForm('labSubjects', labSubjects);
    updateForm('labCounts', labCounts);
    next();
  };

  return (
    <div>
      <h2>Step 1: Lab Timetable Setup</h2>
      {years.map(year => (
        <div key={year}>
          <h4>Year {year}</h4>
          <label>Enter Sections (comma-separated):</label><br />
          <input type="text" onBlur={e => handleSectionInput(year, e.target.value)} /><br />
          {labTimetable[year]?.map(section => (
            <div key={section}>
              <label>No. of labs for section {section}:</label>
              <input type="number" onBlur={e => handleLabCount(year, section, e.target.value)} />
            </div>
          ))}
          <label>Lab Subjects (comma-separated):</label>
          <input type="text" onBlur={e => handleSubjects(year, e.target.value)} />
        </div>
      ))}
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};
export default Step1LabTimetable;
