import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import tree from "../../assets/tree.jpg"; // ✅ import the image

export default function About() {
  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        // minHeight: "100vh",
        py: { xs: 4, md: 8 },
      }}
    >
      {/* 🔹 Hero Section with background image and gradient overlay */}
      {/* linear-gradient(rgba(10,61,98,0.7), rgba(10,61,98,0.7)), */}
      <Box
  sx={{
    position: "relative",
    backgroundImage: ` url(${tree})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "white",
    textAlign: "center",
    py: { xs: 10, md: 14 },
    px: 2,
    mt: "-64px",   // ✅ pull the hero up under the navbar
    zIndex: 0,
  }}
>

      {/* <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${tree})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          py: { xs: 8, md: 12 },
          px: 2,
          borderRadius: 0,
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.3)",
        }}
      > */}
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            mb: 2,
            textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
            fontSize: { xs: "2rem", md: "2.8rem" },
          }}
        >
          About the Nmelonye Family
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: "800px",
            mx: "auto",
            opacity: 0.95,
            fontSize: { xs: "1rem", md: "1.2rem" },
            textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
          }}
        >
          Preserving our ancestry, celebrating our shared heritage, and passing
          on the story of generations.
        </Typography>
      </Box>

      {/* 🔹 Main Content Section */}
      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 6 } }}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 2, color: "#0A3D62" }}
          >
            Our Story
          </Typography>
          <Typography
  variant="body1"
  sx={{
    color: "#333",
    fontSize: { xs: "0.95rem", md: "1.05rem" },
    lineHeight: 1.8,
  }}
>
  The <strong>Nmelonye family</strong> is a Nigerian lineage whose rich
  history has been chronicled in the book{" "}
  <em>
    “From Nise to Arondizuogu to the World: Nmelonye Family History
    1819–2004.”
  </em>{" "}
  This genealogy traces our roots from 1819 to 2004, connecting our
  ancestral home in <strong>Nise, Anambra State</strong> to{" "}
  <strong>Arondizuogu, Imo State</strong>.

  {" "}The book was meticulously researched and written by an illustrious
  great-grandson of Nmelonye himself,{" "}
  <Box
    component="span"
    sx={{
      color: "#0A3D62",
      fontWeight: "bold",
      fontSize: "1.05em",
      px: 0.5,
      borderRadius: 1,
      backgroundColor: "rgba(25,118,210,0.08)",
    }}
  >
    Rev. Fr. Prof. Innocent I. Asouzu
  </Box>
  , whose dedication to preserving our family's history has made this
  project possible. Published by Cheedal Global Prints, the book preserves
  the legacy of our forefather, <strong>Nmelonye</strong>, whose courage
  and journey laid the foundation for generations to come.
</Typography>
<Box
  sx={{
    mt: 3,
    p: 2,
    borderLeft: "5px solid #1976d2",
    bgcolor: "#f5f9ff",
    borderRadius: 1,
  }}
>
  <Typography
    variant="body1"
    sx={{
      fontStyle: "italic",
      color: "#0A3D62",
      fontWeight: 500,
    }}
  >
    “This family history project is inspired by the remarkable work of
    Rev. Fr. Prof. Innocent I. Asouzu, whose research and documentation
    preserved the story of the Nmelonye family for future generations.”
  </Typography>
</Box>
          <Divider sx={{ my: 4 }} />

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 2, color: "#0A3D62" }}
          >
            The Journey of Our Ancestor
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#333",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.8,
            }}
          >
            Nmelonye, originally from Nise, migrated to Arondizuogu due to a
            family dispute and the natural search for a better life. There, he found a new home, got married to his wife Mmaku from Neni, and built a
            lineage that continues to grow in unity and strength. His story is a
            testament to resilience, adaptability, and the enduring spirit of
            family.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 2, color: "#0A3D62" }}
          >
            The Pillars of the Nmelonye Dynasty
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              color: "#333",
            }}
          >
            From his union came six remarkable offsprings, five of which formed the
            roots of the families that carry our name today:
          </Typography>

          <Grid container spacing={2}>
            {[
              "Agosi Nmelonye – who died in battle in his youth, without any offspring.",
              "Nwankwo Nmelonye – the progenitor of the Nwankwo family.",
              "Asouzu Nmelonye – the progenitor of the Asouzu lineage.",
              "Udorji Nmelonye – the progenitor of the Udorji family.",
              "Okoli Nmelonye – the progenitor of the Okoli family.",
              "Anyaga Nmelonye – a daughter, who married a Chief from Kalabari in present-day Rivers State.",
            ].map((desc, index) => (
              <Grid item xs={12} key={index}>
                <Typography
                  variant="body1"
                  sx={{
                    pl: 2,
                    borderLeft: "4px solid #1976d2",
                    color: "#444",
                    fontSize: { xs: "0.95rem", md: "1rem" },
                  }}
                >
                  {desc}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
