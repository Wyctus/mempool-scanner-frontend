import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { GasPriceChart } from "../GasPriceChart";
import GasPriceProps from "./GasPriceProps";

function GasPrice(props: GasPriceProps) {
  return (
    <Card sx={{ minWidth: 275 }} className={props.className}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h5" component="div">
          {props.values.length > 0
            ? props.values[props.values.length - 1].value.toFixed(1)
            : "-"}
        </Typography>
        <GasPriceChart values={props.values} />
      </CardContent>
    </Card>
  );
}

export default GasPrice;
