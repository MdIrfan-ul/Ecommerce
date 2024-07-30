import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import style from "./star.module.css";


// Component for rendering stars
const RenderStars = ({rating}) => {
    const validRating = Math.max(0, Math.min(5, parseFloat(rating) || 0));
    const fullStars = Math.floor(validRating);
    const halfStar = validRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className={style.star} />
        ))}
        {halfStar && <FaStarHalfAlt className={style.star} />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} className={style.star} />
        ))}
      </>
    );
  };

  export {RenderStars};