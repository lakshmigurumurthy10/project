import React, { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
`;

const Button = styled.button`
  background-color: #00d9f5;
  color: #000;
  padding: 0.75rem 1.5rem;
  border: none;
  margin-top: 1rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const Container = styled.div`
  color: #fff;
`;

const SectionBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const PreviewBox = styled.div`
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.08);
  padding: 1.5rem;
  border-radius: 16px;
`;

const StyledTable = styled.table`
  width: 100%;
  margin-top: 1.5rem;
  font-size: 0.95rem;
  text-align: center;
  border-collapse: collapse;

  th, td {
    padding: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  th {
    background-color: rgba(255, 255, 255, 0.1);
    color: #00d9f5;
  }

  td {
    background-color: rgba(255, 255, 255, 0.05);
  }

  tr:nth-child(even) td {
    background-color: rgba(255, 255, 255, 0.07);
  }
`;

export default function GeneralTimetableForm({ yearsSections, labSummary }) {
  const [selectedYears] = useState(["1", "2", "3"]);
  const [coreSubjects, setCoreSubjects] = useState({});
  const [subjectHours, setSubjectHours] = useState({});
  const [rooms, setRooms] = useState({});
  const [teacherName, setTeacherName] = useState({});
  const [optionalSubjects, setOptionalSubjects] = useState({});
  const [optionalHours, setOptionalHours] = useState({});
  const [optionalTeachers, setOptionalTeachers] = useState({});
  const [lang, setLang] = useState('');
  const [showOptional, setShowOptional] = useState({});
  const [finalOutput, setFinalOutput] = useState(null);
  const [previewPayload, setPreviewPayload] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateTimetable = () => {
    const num_subjects = {};
    const hours_input = {};
    const subject_input = {};
    const teacher_obj = {};
    const lang_obj = {};
    const optional_subject = {};
    const optional_subject_hours = {};
    const optional_subject_teacher = {};
    let allRooms = [];

    selectedYears.forEach(year => {
      const subs = coreSubjects[year] || [];
      const teacherList = teacherName[year] || [];
      const classRooms = rooms[year] || [];

      num_subjects[year] = subs.length;
      hours_input[year] = subs.length > 0 ? subjectHours[`${year}-0`] || 0 : 0;
      subject_input[year] = subs;
      teacher_obj[year] = teacherList;
      lang_obj[year] = lang || '';

      if (optionalSubjects[year]) {
        optional_subject[year] = [optionalSubjects[year]];
        optional_subject_hours[year] = [optionalHours[year] || 0];
        optional_subject_teacher[year] = [optionalTeachers[year] || ''];
      }

      allRooms = allRooms.concat(classRooms);
    });

    const payload = {
      years_sections: yearsSections,
      lab_summary: labSummary,
      num_subjects,
      lang: lang_obj,
      num_classrooms: allRooms.length,
      subject_input,
      hours_input,
      teacher_name: teacher_obj,
      optional_subject,
      optional_subject_hours,
      optional_subject_teacher,
      rooms: allRooms
    };

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
      } catch {
        alert("Backend did not return valid JSON.");
      }
    } catch (err) {
      alert('Error generating timetable: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="text-2xl font-bold mb-4">General Timetable Inputs</h2>

      <label>Language Subject</label>
      <Input onChange={e => setLang(e.target.value)} placeholder="e.g. Hindi" />

      {selectedYears.map(year => (
        <SectionBox key={year}>
          <h3 className="text-xl font-semibold mb-2">Year {year}</h3>

          <label>Number of Core Subjects</label>
          <Input
            type="number"
            onBlur={(e) => {
              const count = Number(e.target.value);
              const subs = Array.from({ length: count }, () => '');
              setCoreSubjects(prev => ({ ...prev, [year]: subs }));
            }}
          />

          {coreSubjects[year]?.map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem' }}>
              <Input
                placeholder={`Subject ${i + 1} name`}
                onChange={e => {
                  const updated = [...coreSubjects[year]];
                  updated[i] = e.target.value;
                  setCoreSubjects(prev => ({ ...prev, [year]: updated }));
                }}
              />
              <Input
                type="number"
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

          <label>Number of Classrooms</label>
          <Input
            type="number"
            onBlur={(e) => {
              const count = Number(e.target.value);
              const rm = Array.from({ length: count }, () => '');
              setRooms(prev => ({ ...prev, [year]: rm }));
            }}
          />

          {rooms[year]?.map((_, i) => (
            <Input
              key={i}
              placeholder={`Classroom ${i + 1} name`}
              onChange={e => {
                const updated = [...rooms[year]];
                updated[i] = e.target.value;
                setRooms(prev => ({ ...prev, [year]: updated }));
              }}
            />
          ))}

          <label>Do you want to add optional subject (language)?</label>
          <Select
            onChange={(e) => {
              const value = e.target.value;
              setShowOptional(prev => ({ ...prev, [year]: value === 'yes' }));
              if (value === 'no') {
                setOptionalSubjects(prev => ({ ...prev, [year]: '' }));
                setOptionalHours(prev => ({ ...prev, [year]: 0 }));
                setOptionalTeachers(prev => ({ ...prev, [year]: '' }));
              }
            }}
          >
            <option value="">-- Select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>

          {showOptional[year] && (
            <>
              <Input
                placeholder="Optional subject name"
                onChange={(e) => setOptionalSubjects(prev => ({ ...prev, [year]: e.target.value }))}
              />
              <Input
                type="number"
                placeholder="Optional subject hours"
                onChange={(e) => setOptionalHours(prev => ({ ...prev, [year]: Number(e.target.value) }))}
              />
              <Input
                placeholder="Optional subject teacher name"
                onChange={(e) => setOptionalTeachers(prev => ({ ...prev, [year]: e.target.value }))}
              />
            </>
          )}

          {(() => {
            const numSubjects = coreSubjects[year]?.length || 0;
            const numSections = yearsSections?.[year]?.length || 1;
            const product = numSubjects * numSections;
            const numTeachers = Math.ceil(product / 2);

            return (
              <>
                <h4 className="font-semibold mt-4">Enter {numTeachers} Teacher Name{numTeachers !== 1 ? 's' : ''}</h4>
                {[...Array(numTeachers)].map((_, idx) => (
                  <Input
                    key={idx}
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
        </SectionBox>
      ))}

      <Button onClick={handleGenerateTimetable} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Final Timetable'}
      </Button>

      {previewPayload && (
        <PreviewBox>
          <h3 className="text-lg font-bold text-teal-300 mb-2">Payload Preview (Before Submit)</h3>
          <pre className="whitespace-pre-wrap text-sm overflow-x-auto max-h-96">
            {JSON.stringify(previewPayload, null, 2)}
          </pre>
          <Button onClick={handleSubmitToBackend}>Submit to Backend</Button>
        </PreviewBox>
      )}

      {finalOutput && (
  <PreviewBox>
    <h3 className="text-lg font-bold text-blue-400 mb-2">Final Timetable Output</h3>

    {Array.isArray(finalOutput?.student_timetable) ? (
      finalOutput.student_timetable.map((sectionData, index) => (
        <div key={index} className="mb-10">
          <h4 className="text-xl font-semibold mb-2 text-teal-300">
            Year {sectionData.year} – Section {sectionData.section}
          </h4>

          <StyledTable>
            <thead>
              <tr>
                <th>Day</th>
                {[
                  "8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00",
                  "12:00-13:00", "13:00-14:00", "14:00-15:00",
                  "15:00-16:00", "16:00-17:00"
                ].map((slot, i) => (
                  <th key={i}>{slot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sectionData.table_data.map((dayData, dayIdx) => (
                <tr key={dayIdx}>
                  <td><strong>{dayData.Day}</strong></td>
                  {[
                    "8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00",
                    "12:00-13:00", "13:00-14:00", "14:00-15:00",
                    "15:00-16:00", "16:00-17:00"
                  ].map((slot, slotIdx) => (
                    <td key={slotIdx}>
                      {dayData[slot] || "--"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </div>
      ))
    ) : (
      <pre>{JSON.stringify(finalOutput, null, 2)}</pre>
    )}
  </PreviewBox>
)}

    </Container>
  );
}
