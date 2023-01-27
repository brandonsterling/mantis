import { Container, Grid, Paper } from "@mantine/core";
import React from "react";

function FormCard({ children }) {
  return (
    <div
      style={{
        height: "100%",

        // overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <div
          style={{
            flexGrow: 2,
          }}
        >
          <Paper
            style={{
              position: "relative",
              marginLeft: "auto",
              marginRight: "auto",
              minHeight: "500px",
              maxHeight: "calc(100vh - 120px)",
              overflow: "auto",
              width: "75%",
            }}
            shadow="md"
            mt="80px"
            withBorder
          >
            <Grid m="0">{children}</Grid>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default FormCard;
