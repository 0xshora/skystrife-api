import { config } from "./mud.config.js";
import materialLabels from "./materials.json";
import { fetchRecords } from "./fetchRecords.js";

const fs = require('fs');
const path = require('path');

// JSONデータをファイルに書き出す関数
function saveDataToFile(data, filename) {
    const filePath = path.join(__dirname, filename);
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Failed to write file:', err);
        } else {
            console.log('Data written to file:', filename);
        }
    });
}

export async function getRankings() {

  const { records } = await fetchRecords([config.tables.MatchPlayer]);


  const playerMap = records.reduce((map: Record<string, Record<string, string>>, record) => {
    const { matchEntity, playerEntity, playerAddress } = record.fields;
    if (!map[matchEntity]) {
      map[matchEntity] = {};  // matchEntity がまだ存在しない場合は新しいオブジェクトを初期化
    }
    map[matchEntity][playerEntity] = playerAddress;  // playerEntity をキーとして playerAddress を保存
    return map;
  }, {});

  console.log(playerMap);

  console.log("playerMap Done");

  const rankingRecords = await fetchRecords([config.tables.MatchRanking]);
  const rankings = rankingRecords.records.map(
    (record) => {
      console.log(record.fields);
      const {matchEntity, value} = record.fields;
      const playerAddresses = value.map((playerEntity) => playerMap[matchEntity][playerEntity]);
      return playerAddresses;
      });

    console.log(rankings);

  try {
      saveDataToFile(rankings, 'rankings.json');
  } catch (error) {
      console.error('Error processing data:', error);
  }

  return rankings;
}
