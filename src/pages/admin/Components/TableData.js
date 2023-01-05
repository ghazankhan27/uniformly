export const TableData = ({ children, _class, colspan }) => {
  return (
    <td
      colSpan={colspan}
      className={`
        text-center 
        `}
    >
      {children}
    </td>
  );
};
