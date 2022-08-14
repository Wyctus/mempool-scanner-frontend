import MethodFrequencyProps from "./MethodFrequencyProps";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function MethodFrequency(props: MethodFrequencyProps) {
  return (
    <Box className={props.className}>
      <Typography variant="h5">Top 10 used methods</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Frequency</TableCell>
              <TableCell>Method hash</TableCell>
              <TableCell>Contact address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={`${row.value.hash}|${row.value.contract}|${row.frequency}`}>
                <TableCell component="th" scope="row">
                  {row.frequency}
                </TableCell>
                <TableCell>{row.value.hash}</TableCell>
                <TableCell>{row.value.contract}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {props.rows.length === 0 ? "There is no data yet." : null}
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MethodFrequency;
