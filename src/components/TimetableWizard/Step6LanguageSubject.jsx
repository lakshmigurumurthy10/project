
import React, { useState } from 'react';

const Step6LanguageSubject = ({ formData, updateForm, next, prev }) => {
  const [langs, setLangs] = useState({});

  const handleLangInput = (year, lang) => {
    setLangs(prev => ({ ...prev, [year]: lang }));
  };

  const handleSubmit = () => {
    updateForm('languageSubjects', langs);
    next();
  };

  return (
    <div>
      <h2>Step 6: Language Subject</h2>
      {Object.keys(formData.labTimetable).map(year => (
        <div key={year}>
          <label>Language Subject for Year {year} (or 'none'):</label>
          <input onBlur={e => handleLangInput(year, e.target.value)} />
        </div>
      ))}
      <button onClick={prev}>Back</button>
      <button onClick={handleSubmit}>Preview</button>
    </div>
  );
};

export default Step6LanguageSubject;
