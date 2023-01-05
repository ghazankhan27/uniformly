export const InputField = ({ label, options }) => {
  return (
    <div className="grid">
      <p className="text-sm font-semibold">{label}</p>
      <input
        style={{ width: 400 }}
        className="outline outline-1 outline-slate-200 focus:outline-slate-500 rounded py-1 px-2"
        {...options}
      />
    </div>
  );
};
