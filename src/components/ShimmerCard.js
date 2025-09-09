const ShimmerItem = () => (
  <div className="shimmer-card">
    <div className="shimmer-logo"></div>
  </div>
);

// 1st way - Array.map
const ShimmerCard = () => {
  return (
    <div className="shimmer-container">
      {[...Array(20)].map((_, i) => (
        <ShimmerItem key={i} />
      ))}
    </div>
  );
};

// 2nd way - Array.from
const ShimmerCard1 = () => {
  return (
    <div className="shimmer-container">
      {Array.from({ length: 20 }, (_, i) => (
        <ShimmerItem key={i} />
      ))}
    </div>
  );
};

export default ShimmerCard;
