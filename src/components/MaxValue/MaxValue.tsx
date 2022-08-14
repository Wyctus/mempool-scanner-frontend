import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MaxValueProps from "./MaxValueProps";

function MaxValue(props: MaxValueProps) {
  return (
    <Card sx={{ minWidth: 275 }} className={props.className}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Max sent value
        </Typography>
        <Typography variant="h5" component="div">
          {props.value || "-"} ETH
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MaxValue;
