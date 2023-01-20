import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

export default function UniversityCard({
  title,
  img,
  location,
  id,
  departments,
}) {
  return (
    <Link to={`/university/${id}`}>
      <div className="text-slate-600 border overflow-hidden shadow-sm uni-card-animate hover:cursor-pointer transition-all hover:scale-105 flex rounded-lg bg-slate-100">
        <img alt="the university" className="uni-card-image" src={img} />
        <div className="ml-6 my-3">
          <p className="text-3xl font-bold">{title}</p>
          <p className="text-xs mb-8 font-bold flex items-center">
            <MdLocationOn className="text-red-500" />
            {location}
          </p>
          <p className="mb-1 pb-1 w-fit text-sm font-bold border-b border-slate-400">
            Departments
          </p>
          <ul>
            {departments?.map((item) => (
              <li className="text-xs">{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
