import React from 'react';
import Attachment from '../../components/attachment';
import UserTable from '../../components/userTable';


function App() {

  const [excelData, setExcelData] = React.useState([]);
  const [loading, setloading] = React.useState(false);

  return (
   <div>
    <Attachment  setExcelData={setExcelData} setloading={setloading}/>
    <UserTable loading={loading} excelData={excelData}/>
   </div>

  )
}

export default App;
