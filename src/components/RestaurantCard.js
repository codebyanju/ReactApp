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
    <div className="flex flex-col w-70 bg-gray-100 rounded-md p-4 gap-2 h-[400px] hover:bg-gray-200 group">
      {/* Image */}
      <img
        className="rounded-md h-[240px] w-full object-cover object-center "
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      ></img>

      {/* Name */}
      <h3 className="text-lg font-semibold truncate" title={name}>
        {name}
      </h3>

      {/* Stars, Time */}
      <div className="flex text-md gap-2">
        <p className="flex gap-1">
          <img
            className="w-5 bg-gray-100 group-hover:bg-gray-200"
            alt="star"
            src="https://www.svgrepo.com/show/315891/star-gold-orange.svg"
          ></img>
          {avgRating}
        </p>
        <p>•</p>

        <p>{deliveryTimeAlias}</p>
      </div>
      {/* Cuisines */}
      <h4 className="font-normal truncate text-[rgba(2,6,12,0.6)]">
        {cuisines.join(", ")}
      </h4>

      {/* COst */}
      <p className="font-normal text-[rgba(2,6,12,0.6)]">{costForTwo}</p>
    </div>
  );
};

export default RestaurantCard;

export const withPromotedCard = (Component) => {
  return (props) => {
    return (
      <div>
        <label className="bg-gray-900 text-white p-1.5 rounded-md absolute text-xs">
          Promoted
        </label>
        <Component {...props} />
      </div>
    );
  };
};

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
