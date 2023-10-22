import React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import * as XLSX from 'xlsx';

import { Container } from './styles';




function Attachment({setExcelData,setloading}) {

  const [fileName, setFileName] = React.useState('');
 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(e.target.files[0].name)
    setloading(true)

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        const sheetName = workbook.SheetNames[0]; // Assume you're reading the first sheet
        const sheet = workbook.Sheets[sheetName];

        // Parse the sheet data into a JSON object
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        setExcelData(jsonData);
      };

      reader.readAsBinaryString(file);
    }
  };

  
  return (
    <Container>
      
          {fileName === "" && <InputLabel htmlFor="file-input">Anexar arquivo</InputLabel>}
          <Input
            id="file-input"
            type="file"
            accept=".xlsx, .xls"
            style={{ display: 'none',padding:"20%" }}
            onChange={handleFileChange}
          />
          <InputAdornment position="end">
            <IconButton component="label" htmlFor="file-input">
              <AttachFileIcon />
            </IconButton>
          </InputAdornment>
        <span>{fileName.length >= 13 ?
        fileName.substring(0,13) + '...':fileName
        }</span>
     
      
        
    </Container>

  );
}

export default Attachment;
