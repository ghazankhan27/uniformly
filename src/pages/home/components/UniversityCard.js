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
          <p className="text-sm font-bold">Departments</p>
          <ul className="border-t border-slate-400 mt-1 pt-1">
            {departments?.map((item) => (
              <li className="text-xs">{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
