import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function UserTable({excelData,loading}) {

    const [itemSelecionado,setItemSelecionando] = React.useState([])

    if(excelData.length === 0 && loading){
        return "carregando..."
    }

function countClientOccurrences(data) {
  const clientCount = new Map();

  data.forEach((row) => {
    const clientName = row['Nome Cliente'];
    if (clientCount.has(clientName)) {
      clientCount.set(clientName, clientCount.get(clientName) + 1);
    } else {
      clientCount.set(clientName, 1);
    }
  });

  return clientCount;
}

const clientOccurrences = countClientOccurrences(excelData);

const visualizado = (data) => {
  const exists = itemSelecionado.some(item => item === data);
  if (exists) {
    const filteredItems = itemSelecionado.filter(item => item !== data);
    setItemSelecionando(filteredItems);
  } else {
    setItemSelecionando([...itemSelecionado, data]);
  }
}


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID Comanda</TableCell>
            <TableCell align="right">Data da Comanda</TableCell>
            <TableCell align="right">Data de Execução</TableCell>
            <TableCell align="left">Nome Cliente</TableCell>
            <TableCell align="right">Raça</TableCell>
             <TableCell align="right">Espécie</TableCell>
            <TableCell align="right">Nome Animal</TableCell>
            <TableCell align="right">Serviço</TableCell>
             <TableCell align="right">Quantidade</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {excelData
  .filter((row, index, self) => {
    return self.findIndex((r) => r['ID Cliente'] === row['ID Cliente']) === index;
  })
  .map((row, index) => (
    <TableRow
     onClick={()=>visualizado(row['ID Cliente'])}
      key={index}
      sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:itemSelecionado[index] === row['ID Cliente'] ? 'green':"",cursor:"pointer"  }}
    >
      <TableCell component="th" scope="row">
        {row['ID Comanda']}
      </TableCell>
      <TableCell align="right">{row['Data da Comanda']}</TableCell>
      <TableCell align="right">{row['Data de Execução']}</TableCell>
      <TableCell align="left">{row['Nome Cliente']}</TableCell>
      <TableCell align="right">{row['Raça']}</TableCell>
      <TableCell align="right">{row['Espécie']}</TableCell>
      <TableCell align="right">{row['Nome Animal']}</TableCell>
      <TableCell align="right">{row['Serviço']}</TableCell>
       <TableCell align="right">{clientOccurrences.get(row['Nome Cliente'])}</TableCell>
    </TableRow>
  ))
}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
