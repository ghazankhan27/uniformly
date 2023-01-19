export const ChangeButton = ({ children, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        px-2 py-1
        text-${color}-600
        `}
    >
      {children}
    </button>
  );
};
