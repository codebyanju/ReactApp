import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  // console.log("resData info", resData.info);

  const {
    name,
    cloudinaryImageId,
    avgRating,
    cuisines,
    costForTwo,
    sla: something = {},
  } = resData?.info;

  const { slaString: deliveryTime } = something;

  // const { slaString: deliveryTime } = sla

  return (
    <div className="res-card">
      <img
        className="res-logo"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      ></img>
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <p>{avgRating} stars</p>
      <p>{costForTwo}</p>
      <p>{deliveryTime}</p>
    </div>
  );
};

export default RestaurantCard;
