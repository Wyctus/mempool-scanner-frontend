import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AddressFrequencyProps from "./AddressFrequencyProps";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function AddressFrequency(props: AddressFrequencyProps) {
  return (
    <Box className={props.className}>
      <Typography variant="h5">{props.title}</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Frequency</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={`${row.value}|${row.frequency}`}>
                <TableCell component="th" scope="row">
                  {row.frequency}
                </TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {props.rows.length === 0 ? "There is no data yet." : null}
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AddressFrequency;
