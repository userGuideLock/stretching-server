const fs = require('fs');
const path = require('path');

// JSON 파일에서 인코더 데이터 로드
const encoderData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../constant/encoder.json'), 'utf8'),
);

function oneHotEncode(dataPoint) {
  const encoded = [];
  for (let i = 0; i < dataPoint.length; i++) {
    const value = dataPoint[i];
    const categories = encoderData.categories[i];
    const oneHot = Array(categories.length).fill(0);
    const index = categories.indexOf(value);
    if (index !== -1) {
      oneHot[index] = 1;
    }
    encoded.push(...oneHot);
  }
  return encoded;
}

module.exports = {
  oneHotEncode,
  encoderData,
};
