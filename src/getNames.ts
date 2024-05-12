import { config } from "./mud.config.js";
import materialLabels from "./materials.json";
import { fetchRecords } from "./fetchRecords.js";

const fs = require('fs');
const path = require('path');

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

export async function getNames() {
  const { records } = await fetchRecords([config.tables.Name]);

  const names = records.map((record) => {
    const name = record.fields;
    return name;
  });

  try {
      saveDataToFile(names, 'names.json');
  } catch (error) {
      console.error('Error processing data:', error);
  }

  return names;
}
