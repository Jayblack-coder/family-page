import {Typography, Container } from "@mui/material";

export default function Family1() {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Family One
      </Typography>
      <Typography variant="body1">
        This section captures the history, traditions, and achievements of Family One. 
        Explore their journey across generations and their contributions to our legacy.
      </Typography>
    </Container>
  );
}
