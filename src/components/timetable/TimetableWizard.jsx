import React, { useState } from 'react';
import GeneralTimetableForm from './GeneralTimetableForm.jsx';

export default function LabAndFinalTimetableWizard() {
  const [yearsSections, setYearsSections] = useState({});
  const [labsPerSections, setLabsPerSections] = useState({});
  const [subjectsPerYear, setSubjectsPerYear] = useState({});
  const [labSummary, setLabSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSectionsInput = (year, sections) => {
    const secArr = sections.split(',').map(s => s.trim().toUpperCase());
    setYearsSections(prev => ({ ...prev, [year]: secArr }));

    const labsInit = {};
    secArr.forEach(sec => (labsInit[sec] = 4));
    setLabsPerSections(prev => ({ ...prev, ...labsInit }));
  };

  const handleSubjectsInput = (year, subjects) => {
    const subArr = subjects.split(',').map(s => s.trim());
    setSubjectsPerYear(prev => ({ ...prev, [year]: subArr }));
  };

  const handleLabCountChange = (section, count) => {
    setLabsPerSections(prev => ({ ...prev, [section]: Number(count) }));
  };

  const generateLabTimetable = async () => {
    const payload = {
      years_sections: yearsSections,
      labs_per_sections: labsPerSections,
      subjects_per_year: subjectsPerYear,
    };

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/generate_lab_timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server did not return JSON');
      }

      const data = await res.json();
      setLabSummary(data);
    } catch (err) {
      alert('Lab generation failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Step 1: Lab Timetable Input</h2>

      {[1, 2, 3].map(year => (
        <div key={year} className="mb-4">
          <label className="block font-semibold">Year {year} Sections (comma-separated)</label>
          <input className="border p-2 w-full" onBlur={e => handleSectionsInput(year, e.target.value)} />

          <label className="block font-semibold mt-2">Subjects for Year {year}</label>
          <input className="border p-2 w-full" onBlur={e => handleSubjectsInput(year, e.target.value)} />
        </div>
      ))}

      {Object.entries(yearsSections).map(([year, sections]) => (
        <div key={year} className="mt-4">
          <h4 className="font-bold">Labs Per Section (Year {year})</h4>
          {sections.map(section => (
            <div key={section} className="flex items-center space-x-2">
              <label>{section}</label>
              <input
                type="number"
                defaultValue={4}
                className="border p-1"
                onChange={e => handleLabCountChange(section, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={generateLabTimetable}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Lab Timetable'}
      </button>

      {labSummary.length > 0 && (
        <>
          <div className="mt-8">
            <h3 className="text-lg font-semibold">Lab Timetable Summary</h3>
            <table className="w-full border mt-2 text-sm">
              <thead>
                <tr>
                  <th>Year</th><th>Day</th><th>Time</th><th>Section</th><th>Subject</th><th>Batch</th>
                </tr>
              </thead>
              <tbody>
                {labSummary.map((item, i) => (
                  <tr key={i} className="text-center">
                    <td>{item.Year}</td><td>{item.Day}</td><td>{item.Time}</td>
                    <td>{item.Section}</td><td>{item.Subject}</td><td>{item.Batch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Step 2: Final Timetable Generation</h2>
            <GeneralTimetableForm
              yearsSections={yearsSections}
              labSummary={labSummary}
            />
          </div>
        </>
      )}
    </div>
  );
}