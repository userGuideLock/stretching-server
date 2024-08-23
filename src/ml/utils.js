function euclideanDistance(point1, point2) {
  return Math.sqrt(
    point1.reduce(
      (sum, value, index) => sum + Math.pow(value - point2[index], 2),
      0,
    ),
  );
}

module.exports = {
  euclideanDistance,
};
