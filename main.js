function getNameRecordTab() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Attempt to get the 'NameRecord' sheet
  var nameTab = ss.getSheetByName('NameRecord');
  
  // If the 'NameRecord' sheet doesn't exist, create it
  if (!nameTab) {
    nameTab = ss.insertSheet('NameRecord');
  }
  
  return nameTab;
}

function anonymizeColumn() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var nameTab = getNameRecordTab();; //Creates a sheet to store reversal data
  var range = sheet.getActiveRange();
  var values = range.getValues();
  
  // Loop through each cell in the selected range
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {
      var name = values[i][j];

      // Skip blank cells
      if (name === "" || name === null) continue;

      var anonymizedName = generateUUID();
      // Record the name and its anonymized version in 'NameRecord' tab
      nameTab.appendRow([name, anonymizedName]);
      
      // Amend the name in the original cell to its anonymized version
      values[i][j] = anonymizedName;
    }
  }
  
  // Write back the anonymized names to the original range
  range.setValues(values);
}

function deAnonymizeColumn() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var nameTab = ss.getSheetByName('NameRecord'); //Replace 'NameRecord' with the name of your record tab
  var range = sheet.getActiveRange();
  var values = range.getValues();
  
  // Loop through each cell in the selected range
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {
      var anonymousName = values[i][j];
      
       // Skip blank cells
      if (anonymousName === "" || anonymousName === null) continue;

      // Find the anonymized name in 'NameRecord' tab and get the original name
      var data = nameTab.getDataRange().getValues();
      for (var k = 0; k < data.length; k++) {
        if (data[k][1] === anonymousName) {
          var originalName = data[k][0];
          break;
        }
      }
      
      // Amend the anonymized name in the original cell to its original version
      if (originalName) {
        values[i][j] = originalName;
      } else {
        //SpreadsheetApp.getUi().alert('No original name found for ' + anonymousName);
      }
    }
  }
  
  // Write back the original names to the original range
  range.setValues(values);
}

// A simple function to generate a UUID v4
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.floor(Math.random() * 16);
    var v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
      .addItem('Anonymize Column', 'anonymizeColumn')
      .addItem('De-Anonymize Column', 'deAnonymizeColumn')
      .addToUi();
}