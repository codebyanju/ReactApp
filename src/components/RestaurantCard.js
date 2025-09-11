import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  // console.log("resData info", resData.info);

  const {
    name,
    cloudinaryImageId,
    avgRating,
    cuisines,
    costForTwo,
    sla: { slaString: deliveryTimeAlias }, // sla
  } = resData?.info;

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
      <p>{deliveryTimeAlias}</p>
    </div>
  );
};

export default RestaurantCard;

//Navigate to restaurant menu page on click of restaurant card

// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();

{
  /* <div
  className="res-card"
  onClick={() => {
    onHit(resData?.info?.id);
    navigate("/res/" + resData?.info?.id);
  }}
>
  <h3>{name}</h3>
  <h4>{cuisines.join(", ")}</h4>
  <p>{deliveryTimeAlias}</p>
  ...
</div>; */
}
