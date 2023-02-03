import { useGetAllUniversities } from "../hooks/useGetAllUniversities";

export const UniversitiesTable = () => {
  const { data, loading } = useGetAllUniversities();

  return (
    <div className="mt-20 grid place-items-center">
      <table className="table-fixed w-11/12">
        <thead>
          <tr>
            <TableHeading />
            <TableHeading>Title</TableHeading>
            <TableHeading>Location</TableHeading>
            <TableHeading>Contact</TableHeading>
            <TableHeading>Programs</TableHeading>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`
                ${index % 2 === 0 && "bg-slate-200"}
                `}
                >
                  <TableData>
                    <div className="rounded-full">
                      <img
                        src={`${process.env.REACT_APP_HOST}/${item.image}`}
                        alt={item.name}
                        height={200}
                        width={200}
                        className="object-cover"
                      />
                    </div>
                  </TableData>
                  <TableData>{item.name}</TableData>
                  <TableData>{item.address}</TableData>
                  <TableData>{item.contact}</TableData>
                  <TableData>{item.degree}</TableData>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

const TableHeading = ({ children }) => {
  return <th className="border-b border-slate-900">{children}</th>;
};

const TableData = ({ children }) => {
  return <td className="text-center">{children}</td>;
};
