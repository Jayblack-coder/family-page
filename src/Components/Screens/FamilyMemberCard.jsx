import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const FamilyMemberCard = ({ member }) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 340,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 3,
        transition: ".3s",
        "&:hover": {
          boxShadow: 8,
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={member.image || "https://via.placeholder.com/400"}
        alt={`${member.firstName} ${member.surname}`}
        sx={{
          height: 260,
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          {member.isDeceased && "✝ "}
          {member.firstName} {member.middleName} {member.surname}
        </Typography>

        <Typography textAlign="center" mb={2}>
          <strong>Status:</strong>{" "}
          {member.isDeceased ? (
            <span
              style={{
                color: "#d32f2f",
                fontWeight: "bold",
              }}
            >
              ✝ Deceased
            </span>
          ) : (
            <span
              style={{
                color: "#2e7d32",
                fontWeight: "bold",
              }}
            >
              Living
            </span>
          )}
        </Typography>

        {member.isDeceased && member.dateOfDeath && (
          <Typography textAlign="center" mb={2}>
            <strong>Date of Death:</strong>{" "}
            {new Date(member.dateOfDeath).toLocaleDateString("en-GB")}
          </Typography>
        )}

        <Typography><strong>Surname:</strong> {member.surname}</Typography>

        <Typography><strong>Firstname:</strong> {member.firstName}</Typography>

        <Typography><strong>Middlename:</strong> {member.middleName}</Typography>

        <Typography><strong>Parents:</strong> {member.parents}</Typography>

        <Typography><strong>Family Status:</strong> {member.familyStatus}</Typography>

        <Typography><strong>Generation:</strong> {member.generation}</Typography>

        <Typography><strong>Date of Birth:</strong> {member.dateOfBirth}</Typography>

        <Typography><strong>Spouse:</strong> {member.spouse}</Typography>

        <Typography><strong>City:</strong> {member.cityOfResidence}</Typography>

        <Typography><strong>Offspring:</strong> {member.offspring}</Typography>
      </CardContent>
    </Card>
  );
};

export default FamilyMemberCard;