import React, { useState } from 'react';

export default function GeneralTimetableForm({ yearsSections, labSummary }) {
  const [selectedYears, setSelectedYears] = useState(["1", "2", "3"]);
  const [coreSubjects, setCoreSubjects] = useState({});
  const [subjectHours, setSubjectHours] = useState({});
  const [rooms, setRooms] = useState({});
  const [teacherName, setTeacherName] = useState({});
  const [optionalSubjects, setOptionalSubjects] = useState({});
  const [optionalHours, setOptionalHours] = useState({});
  const [optionalTeachers, setOptionalTeachers] = useState({});
  const [showOptional, setShowOptional] = useState({});
  const [lang, setLang] = useState('');
  const [finalOutput, setFinalOutput] = useState(null);
  const [previewPayload, setPreviewPayload] = useState(null);
  const [loading, setLoading] = useState(false);

  const buildFinalPayload = () => {
    const numSubjects = {};
    const subjectInput = {};
    const hoursInput = {};

    for (const year in coreSubjects) {
      numSubjects[year] = coreSubjects[year]?.length || 0;
      subjectInput[year] = coreSubjects[year];
      const hours = coreSubjects[year].map((_, i) => subjectHours[`${year}-${i}`] || 0);
      hoursInput[year] = Math.max(...hours);
    }

    const optional_subject = {};
    const optional_subject_hours = {};
    const optional_subject_teacher = {};

    for (const year in optionalSubjects) {
      optional_subject[year] = optionalSubjects[year] || [];
      optional_subject_hours[year] = optionalHours[year] || [];
      optional_subject_teacher[year] = optionalTeachers[year] || [];
    }

    const finalLang = {};
    for (const year in yearsSections) {
      finalLang[year] = lang || "lang";
    }

    const finalRooms = Object.values(rooms).flat();

    const payload = {
      years_sections: yearsSections,
      lab_summary: labSummary,
      num_subjects: numSubjects,
      lang: finalLang,
      num_classrooms: finalRooms.length,
      subject_input: subjectInput,
      hours_input: hoursInput,
      teacher_name: teacherName,
      optional_subject,
      optional_subject_hours,
      optional_subject_teacher,
      rooms: finalRooms
    };

    return payload;
  };

  const handleGenerateTimetable = () => {
    const payload = buildFinalPayload();
    setPreviewPayload(payload);
  };

  const handleSubmitToBackend = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/generate_timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(previewPayload),
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setFinalOutput(data);
      } catch (jsonErr) {
        console.error("Invalid JSON response:", text);
        alert("Backend did not return valid JSON. Check console.");
      }
    } catch (err) {
      alert('Error generating timetable: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addOptionalEntry = (year) => {
    setOptionalSubjects(prev => ({
      ...prev,
      [year]: [...(prev[year] || []), '']
    }));
    setOptionalHours(prev => ({
      ...prev,
      [year]: [...(prev[year] || []), 0]
    }));
    setOptionalTeachers(prev => ({
      ...prev,
      [year]: [...(prev[year] || []), '']
    }));
    setShowOptional(prev => ({
      ...prev,
      [year]: [...(prev[year] || []), true]
    }));
  };

  const stopOptionalEntry = (year, index) => {
    setShowOptional(prev => {
      const updated = [...(prev[year] || [])];
      updated[index] = false;
      return { ...prev, [year]: updated };
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">General Timetable Inputs</h2>
      <label className="block font-semibold">Language Subject</label>
      <input
        className="border p-2 w-full mb-4"
        onChange={e => setLang(e.target.value)}
        placeholder="e.g. Hindi"
      />

      {selectedYears.map(year => (
        <div key={year} className="border rounded p-4 mb-6">
          <h3 className="text-lg font-bold">Year {year}</h3>
          <label className="block font-semibold mt-2">Number of Core Subjects</label>
          <input
            type="number"
            className="border p-2 w-full"
            onBlur={(e) => {
              const count = Number(e.target.value);
              const subs = Array.from({ length: count }, () => '');
              setCoreSubjects(prev => ({ ...prev, [year]: subs }));
            }}
          />

          {coreSubjects[year]?.map((_, i) => (
            <div key={i} className="flex items-center gap-3 my-2">
              <input
                className="border p-2 flex-1"
                placeholder={`Subject ${i + 1} name`}
                onChange={e => {
                  const updated = [...coreSubjects[year]];
                  updated[i] = e.target.value;
                  setCoreSubjects(prev => ({ ...prev, [year]: updated }));
                }}
              />
              <input
                type="number"
                className="border p-2 w-24"
                placeholder="Hours"
                onChange={e => {
                  setSubjectHours(prev => ({
                    ...prev,
                    [`${year}-${i}`]: Number(e.target.value)
                  }));
                }}
              />
            </div>
          ))}

          <label className="block font-semibold mt-4">Number of Classrooms</label>
          <input
            type="number"
            className="border p-2 w-full"
            onBlur={(e) => {
              const count = Number(e.target.value);
              const rm = Array.from({ length: count }, () => '');
              setRooms(prev => ({ ...prev, [year]: rm }));
            }}
          />

          {rooms[year]?.map((_, i) => (
            <input
              key={i}
              className="border p-2 w-full my-1"
              placeholder={`Classroom ${i + 1} name`}
              onChange={e => {
                const updated = [...rooms[year]];
                updated[i] = e.target.value;
                setRooms(prev => ({ ...prev, [year]: updated }));
              }}
            />
          ))}

          <h4 className="block font-semibold mt-4">Optional Subjects (Languages)</h4>
          {(showOptional[year] || []).map((show, index) => show && (
            <div key={index} className="my-4">
              <input
                className="border p-2 w-full"
                placeholder="Optional subject name"
                onChange={(e) => {
                  const updated = [...(optionalSubjects[year] || [])];
                  updated[index] = e.target.value;
                  setOptionalSubjects(prev => ({ ...prev, [year]: updated }));
                }}
              />
              <input
                type="number"
                className="border p-2 w-full mt-2"
                placeholder="Optional subject hours"
                onChange={(e) => {
                  const updated = [...(optionalHours[year] || [])];
                  updated[index] = Number(e.target.value);
                  setOptionalHours(prev => ({ ...prev, [year]: updated }));
                }}
              />
              <input
                className="border p-2 w-full mt-2"
                placeholder="Optional subject teacher name"
                onChange={(e) => {
                  const updated = [...(optionalTeachers[year] || [])];
                  updated[index] = e.target.value;
                  setOptionalTeachers(prev => ({ ...prev, [year]: updated }));
                }}
              />
              <div className="mt-2">
                <label className="block font-semibold">Do you want to add optional subject (language)?</label>
                <select
                  className="border p-2 w-full"
                  onChange={(e) => {
                    if (e.target.value === 'yes') {
                      addOptionalEntry(year);
                    } else {
                      stopOptionalEntry(year, index);
                    }
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => addOptionalEntry(year)}
          >
            Start Adding Optional Subject
          </button>

          {(() => {
            const numSubjects = coreSubjects[year]?.length || 0;
            const numSections = yearsSections?.[year]?.length || 1;
            const product = numSubjects * numSections;
            const numTeachers = Math.ceil(product / 2);

            return (
              <>
                <h4 className="font-semibold mt-4">
                  Enter {numTeachers} Teacher Name{numTeachers !== 1 ? 's' : ''}
                </h4>
                {[...Array(numTeachers)].map((_, idx) => (
                  <input
                    key={idx}
                    className="border p-2 w-full my-1"
                    placeholder={`Teacher ${idx + 1}`}
                    onChange={(e) => {
                      const updated = teacherName[year] || [];
                      updated[idx] = e.target.value;
                      setTeacherName(prev => ({ ...prev, [year]: updated }));
                    }}
                  />
                ))}
              </>
            );
          })()}
        </div>
      ))}

      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleGenerateTimetable}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Final Timetable'}
      </button>

      {previewPayload && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-bold text-green-700 mb-2">Payload Preview (Before Submit)</h3>
          <pre className="whitespace-pre-wrap text-sm overflow-x-auto max-h-96">
            {JSON.stringify(previewPayload, null, 2)}
          </pre>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmitToBackend}
          >
            Submit to Backend
          </button>
        </div>
      )}

      {finalOutput && (
        <div className="mt-6 bg-gray-50 p-4 rounded border border-gray-300">
          <h3 className="text-lg font-bold text-blue-700 mb-2">Final Timetable Output</h3>
          {Array.isArray(finalOutput?.timetable) ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border border-gray-400">
                <thead>
                  <tr>
                    {finalOutput.timetable[0].map((_, colIdx) => (
                      <th key={colIdx} className="border px-4 py-2 bg-gray-200 text-sm">
                        Period {colIdx + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {finalOutput.timetable.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((cell, colIdx) => (
                        <td key={colIdx} className="border px-4 py-2 text-sm">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap text-sm overflow-x-auto max-h-96">
              {JSON.stringify(finalOutput, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}