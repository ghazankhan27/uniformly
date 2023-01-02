import React from "react";

export const UniversitiesTable = ({ data }) => {
  return (
    <div className="mt-10">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <TableHeading>Title</TableHeading>
            <TableHeading>Location</TableHeading>
            <TableHeading>Ranking</TableHeading>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr
                key={index}
                className={`
                ${index % 2 === 0 && "bg-slate-200"}
                `}
              >
                <TableData>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                    href={item.url}
                  >
                    {item.title}
                  </a>
                </TableData>
                <TableData>{item.location}</TableData>
                <TableData>{item.ranking}</TableData>
              </tr>
            );
          })}
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
