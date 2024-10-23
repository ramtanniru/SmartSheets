const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const sheets = google.sheets('v4');
const spreadsheetId = '17YHixTSgZSrs9AriFdBjX5Zn9dbxGHzjZomBrnSDGkM';

function getAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  return new google.auth.GoogleAuth({ credentials, scopes: SCOPES }).getClient();
}

async function fetchSheetData() {
  const auth = await getAuth();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A2:G',
    auth,
  });
  
  return response.data.values.map((row, index) => ({
    id: index + 1,
    name: row[0],
    role: row[1],
    team: row[2],
    status: row[3],
    age: parseInt(row[4]),
    avatar: row[5],
    email: row[6]
  }));
}

async function updateSheetData(dbData) {
  const auth = await getAuth();
  const formattedData = dbData.map(row => [row.name, row.role, row.team, row.status, parseInt(row.age), row.avatar, row.email]);
  
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Sheet1!A2:G',
    valueInputOption: 'RAW',
    resource: { values: formattedData },
    auth,
  });
}

module.exports = { fetchSheetData, updateSheetData };
