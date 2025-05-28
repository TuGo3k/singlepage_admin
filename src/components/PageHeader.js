const PageHeader = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold mb-4 border-b pb-2">{title}</h1>
      <div className="bg-white rounded-lg shadow p-6 border">
        {children}
      </div>
    </div>
  );
};

export default PageHeader; 