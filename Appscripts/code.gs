function onEdit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const range = sheet.getDataRange().getValues().slice(1);

  const data = range.map((row,idx) => ({
    id: idx+1,
    name: row[0],
    role: row[1],
    team: row[2],
    status: row[3],
    age: row[4],
    avatar: row[5],
    email: row[6]
  }));

  const url = "https://superjoin-be.onrender.com/sync/sheet-to-db"; 

  // Options for the HTTP request
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(data),
    muteHttpExceptions: true  // Optional: This helps in debugging, capturing all HTTP responses including errors
  };

  // Send data to the API
  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log("Hi",response.getContentText());  // Log the response for debugging
  } catch (error) {
    Logger.log("Error: " + error.toString()); 
  }
}
