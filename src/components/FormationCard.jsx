import { Link } from 'react-router-dom'
import { FaStar, FaUsers, FaClock, FaLevelUpAlt } from 'react-icons/fa'

export const FormationCard = ({
  id,
  title,
  description,
  image,
  level,
  duration,
  participants,
  rating,
  price,
}) => {
  return (
    <Link to={`/formations/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <FaLevelUpAlt size={14} />
              <span>{level}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock size={14} />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaUsers size={14} />
              <span>{participants}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span className="text-sm font-semibold">{rating}</span>
            </div>
            <span className="font-bold text-primary">{price} DA</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
