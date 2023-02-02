import {
  Card,
  CloseButton,
  Container,
  Grid,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

function FormCard({ children }) {
  const router = useRouter();

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
          <Card
            style={{
              paddingTop: "0px",
              position: "relative",
              marginLeft: "auto",
              marginRight: "auto",
              minHeight: "500px",
              maxHeight: "calc(100vh - 120px)",
              overflow: "auto",
              width: "70%",
            }}
            shadow="md"
            mt="80px"
            withBorder
          >
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FormCard;
