const ShimmerItem = () => (
  <div className="flex flex-col w-70 bg-gray-100 rounded-md p-4 gap-2 h-[400px] animate-pulse">
    {/* Image placeholder */}
    <div className="h-[240px] w-full bg-gray-300 rounded-md"></div>

    {/* Title placeholder */}
    <div className="h-6 w-3/4 bg-gray-300 rounded"></div>

    {/* Small text placeholder */}
    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
  </div>
);

// 1st way - Array.map
const ShimmerCard = () => (
  <div className="flex flex-wrap gap-3 justify-center p-2 max-w-8/10 mx-auto py-3">
    {[...Array(12)].map((_, i) => (
      <ShimmerItem key={i} />
    ))}
  </div>
);

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
