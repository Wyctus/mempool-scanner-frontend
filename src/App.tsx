/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AddressFrequency from "./components/AddressFrequency/AddressFrequency";
import { AddressFrequencyI } from "./components/AddressFrequency";
import { GasPrice } from "./components/GasPrice";
import { css } from "@emotion/react";
import { MethodFrequency, MethodFrequencyI } from "./components/MethodFrequency";
import { MaxValue } from "./components/MaxValue";

const socket = io("localhost:4042");

const gasPriceStyle = css`
  width: calc(100% / 3);
`;

const tableStyle = css`
  width: 50%;
`;

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>();
  const [toAddreses, setToAddresses] = useState<AddressFrequencyI[]>([]);
  const [fromAddreses, setFromAddresses] = useState<AddressFrequencyI[]>([]);
  const [methods, setMethods] = useState<MethodFrequencyI[]>([]);
  const [gasPrices, setGasPrices] = useState<{ time: string; value: number }[]>([]);
  const [maxFeesPerGas, setMaxFeesPerGas] = useState<{ time: string; value: number }[]>([]);
  const [maxPriorityFeesPerGas, setMaxPriorityFeesPerGas] = useState<{ time: string; value: number }[]>([]);
  const [maxValue, setMaxValue] = useState<number>();

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("mempoolUpdate", (data) => {
      setLastUpdate(new Date().toISOString());
      setToAddresses(data.topToAddresses);
      setFromAddresses(data.topFromAddresses);
      setMethods(data.topMethods);
      setMaxValue(data.maxValue);

      setGasPrices((old) => [...old, { time: new Date().toLocaleTimeString(), value: data.avgGasPrice }]);
      setMaxFeesPerGas((old) => [...old, { time: new Date().toLocaleTimeString(), value: data.avgMaxFeePerGas }]);
      setMaxPriorityFeesPerGas((old) => [...old, { time: new Date().toLocaleTimeString(), value: data.avgMaxPriorityFeePerGas }]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("mempoolUpdate");
    };
  }, []);

  return (
    <div>
      <div
        css={css`
          position: fixed;
          right: 10px;
          top: 10p;
          background-color: #bdbdbd;
          border: 1px solid black;
          padding: 5px;
          z-index: 10;
        `}
      >
        <p>Connected: {"" + isConnected}</p>
        <p>Last update: {lastUpdate || "-"}</p>
      </div>

      <CssBaseline />
      <Container maxWidth="xl">
        <Typography variant="h2" component="div" gutterBottom>
          Mempool scanner
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <AddressFrequency rows={toAddreses} title="Top 10 recipient addresses" css={tableStyle} />
          <AddressFrequency rows={fromAddreses} title="Top 10 sender addresses" css={tableStyle} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <GasPrice title="Gas price (legacy)" values={gasPrices} css={gasPriceStyle} />
          <GasPrice title="Max Priority Fee Per Gas (EIP1559)" values={maxPriorityFeesPerGas} css={gasPriceStyle} />
          <GasPrice title="Max Fee Per Gas (EIP1559)" values={maxFeesPerGas} css={gasPriceStyle} />
        </Box>

        <MethodFrequency
          rows={methods}
          css={css`
            margin-bottom: 10px;
          `}
        />
        <MaxValue value={maxValue} />
      </Container>
    </div>
  );
}

export default App;
