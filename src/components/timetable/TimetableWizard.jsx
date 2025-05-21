import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import GeneralTimetableForm from './GeneralTimetableForm.jsx';

const WizardContainer = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 16px;
  max-width: 900px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

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

export default function LabAndFinalTimetableWizard() {
  const [step, setStep] = useState(0);
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
      subjects_per_year: subjectsPerYear
    };

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/generate_lab_timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server did not return JSON');
      }

      const data = await res.json();
      setLabSummary(data);
      setStep(2); // ✅ Auto move to next step after receiving response
    } catch (err) {
      alert('Lab generation failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WizardContainer>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <StepBox
            key="step1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Step 1: Year-wise Inputs</h2>
            {[1, 2, 3].map(year => (
              <div key={year}>
                <label>Year {year} Sections (comma-separated)</label>
                <Input onBlur={e => handleSectionsInput(year, e.target.value)} />
                <label>Subjects for Year {year}</label>
                <Input onBlur={e => handleSubjectsInput(year, e.target.value)} />
              </div>
            ))}
            <Button onClick={() => setStep(1)}>Next</Button>
          </StepBox>
        )}

        {step === 1 && (
          <StepBox
            key="step2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Step 2: Labs Per Section</h2>
            {Object.entries(yearsSections).map(([year, sections]) => (
              <div key={year}>
                <h4 className="font-semibold">Year {year}</h4>
                {sections.map(section => (
                  <div key={section} className="mb-2">
                    <label>{section}</label>
                    <Input
                      type="number"
                      defaultValue={4}
                      onChange={e => handleLabCountChange(section, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ))}
            <Button onClick={generateLabTimetable} disabled={loading}>
              {loading ? 'Generating...' : 'Generate Lab Timetable'}
            </Button>
          </StepBox>
        )}

        {step === 2 && (
          <StepBox
            key="step3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Step 3: Lab Timetable Summary</h2>
            <StyledTable>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Section</th>
                  <th>Subject</th>
                  <th>Batch</th>
                </tr>
              </thead>
              <tbody>
                {labSummary.map((item, i) => (
                  <tr key={i}>
                    <td>{item.Year}</td>
                    <td>{item.Day}</td>
                    <td>{item.Time}</td>
                    <td>{item.Section}</td>
                    <td>{item.Subject}</td>
                    <td>{item.Batch}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
            <Button onClick={() => setStep(3)} className="mt-6">Next</Button>
          </StepBox>
        )}

        {step === 3 && (
          <StepBox
            key="step4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Step 4: Final Timetable</h2>
            <GeneralTimetableForm
              yearsSections={yearsSections}
              labSummary={labSummary}
            />
          </StepBox>
        )}
      </AnimatePresence>
    </WizardContainer>
  );
}
