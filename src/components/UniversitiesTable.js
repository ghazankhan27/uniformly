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
            if (index % 2 !== 0) {
              return (
                <tr className="bg-slate-200">
                  <td className="text-center">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                      href={item.url}
                    >
                      {item.title}
                    </a>
                  </td>
                  <TableBody>{item.location}</TableBody>
                  <TableBody>{item.ranking}</TableBody>
                </tr>
              );
            }
            return (
              <tr>
                <td className="text-center">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                    href={item.url}
                  >
                    {item.title}
                  </a>
                </td>
                <TableBody>{item.location}</TableBody>
                <TableBody>{item.ranking}</TableBody>
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

const TableBody = ({ children }) => {
  return <td className="text-center">{children}</td>;
};
