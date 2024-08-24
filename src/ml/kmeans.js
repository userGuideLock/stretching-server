const fs = require('fs');
const path = require('path');
const { euclideanDistance } = require('./utils');

// JSON 파일에서 KMeans 모델 데이터 로드
const kmeansData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../constant/kmeans_model.json'),
    'utf8',
  ),
);

function predictCluster(encodedNewDataPoint) {
  const distances = kmeansData.cluster_centers_.map((center) =>
    euclideanDistance(center, encodedNewDataPoint),
  );
  return distances.indexOf(Math.min(...distances));
}

module.exports = {
  predictCluster,
  kmeansData,
};
