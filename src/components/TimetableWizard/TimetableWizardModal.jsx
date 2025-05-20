
import React, { useState } from 'react';

// Step Components (Assuming each is in ./TimetableWizard/)
// import Step1 from '../'
import Step1LabTimetable from '../TimetableWizard/Step1LabTimetable';
import Step2ClassroomSetup from '../TimetableWizard/Step2ClassroomSetup';
import Step3CoreSubjects from '../TimetableWizard/Step3CoreSubjects';
import Step4AdditionalSubjects from '../TimetableWizard/Step4AdditionalSubjects';
import Step5TeacherAssignment from '../TimetableWizard/Step5TeacherAssignment';
import Step6LanguageSubject from '../TimetableWizard/Step6LanguageSubject';
import PreviewSummary from '../TimetableWizard/PreviewSummary';

const TimetableWizardPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    labTimetable: {},       // year => [sections]
    labSubjects: {},        // year => [labSubjects]
    labCounts: {},          // year => { section => labCount }
    coreSubjectMeta: {},    // year => { count, classrooms: [] }
    coreSubjects: {},       // year => [{ name, hours }]
    additionalSubjects: {}, // year => [{ name, hours, teachers: { section: teacher } }]
    teachers: {},           // year => [teachers]
    languageSubjects: {},   // year => string | 'none'
  });

  const next = () => setStep(prev => Math.min(prev + 1, 7));
  const prev = () => setStep(prev => Math.max(prev - 1, 1));

  const updateForm = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: { ...prev[key], ...value }
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1LabTimetable formData={formData} updateForm={updateForm} next={next} />;
      case 2:
        return <Step2ClassroomSetup formData={formData} updateForm={updateForm} next={next} prev={prev} />;
      case 3:
        return <Step3CoreSubjects formData={formData} updateForm={updateForm} next={next} prev={prev} />;
      case 4:
        return <Step4AdditionalSubjects formData={formData} updateForm={updateForm} next={next} prev={prev} />;
      case 5:
        return <Step5TeacherAssignment formData={formData} updateForm={updateForm} next={next} prev={prev} />;
      case 6:
        return <Step6LanguageSubject formData={formData} updateForm={updateForm} next={next} prev={prev} />;
      case 7:
        return <PreviewSummary formData={formData} prev={prev} />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="wizard-container">
      <h1>Timetable Generator Wizard</h1>
      <div className="step-content">
        {renderStep()}
      </div>
    </div>
  );
};

export default TimetableWizardPage;
