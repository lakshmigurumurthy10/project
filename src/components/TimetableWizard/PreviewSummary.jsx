
const PreviewSummary = ({ formData, prev }) => {
  return (
    <div>
      <h2>Final Preview</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <button onClick={prev}>Back</button>
    </div>
  );
};

export default PreviewSummary;
