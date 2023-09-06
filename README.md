
# Google Sheets Anonymisation Script

## Overview

This script provides functionalities for anonymising and de-anonymising columns in a Google Sheet. It is written in Google Apps Script, a scripting language for automating tasks across Google's Apps suite.

The script will create a sheet named NameRecord that will be used to hold the infomation allowing for the reversal if needed.

## Functions

### `getNameRecordTab()`

- **Purpose**: Gets or creates a 'NameRecord' sheet in the active Google Spreadsheet.
- **Returns**: The 'NameRecord' sheet.

### `anonymiseColumn()`

- **Purpose**: Anonymises the content of the currently selected cells in the active sheet.
- **Side Effects**: Appends original and anonymised names to the 'NameRecord' sheet.

### `deAnonymiseColumn()`

- **Purpose**: De-anonymises the content of the currently selected cells in the active sheet, based on the records in the 'NameRecord' sheet.
- **Side Effects**: Modifies the content of the selected cells with their original names.

### `generateUUID()`

- **Purpose**: Generates a universally unique identifier (UUID) v4.
- **Returns**: A string representing the UUID.

### `onOpen()`

- **Purpose**: Creates a custom menu in the Google Sheets UI to trigger the anonymisation and de-anonymisation functions.

## Usage

1. Open the Google Sheet you want to work with.
2. Copy the script into an appscript associated with the Google Sheet you wan to work with.
3. Close and re open the workbook to allow the `onOpen` function to run.
4. Click on the Custom Menu added by the `onOpen` function.  This will be next to the Help Menu.
5. Choose to either anonymise or de-anonymise the selected column (s).

## Limitations

- Anonymisation is not cryptographically secure. It is suitable for obfuscating data but should not be considered completely secure.
- If the 'NameRecord' sheet is modified or deleted, the ability to de-anonymise data may be lost.

## Contributing

Feel free to fork this script and make your own changes. Pull requests are also welcome.

