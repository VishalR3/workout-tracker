import PropTypes from "prop-types";
import { NavigateNext } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

const ListItemRow = ({ primary, handleClick }) => {
  return (
    <ListItem
      sx={{
        backgroundColor: "#E6E6E6",
        mb: "10px",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <ListItemText
        primary={primary}
        primaryTypographyProps={{
          fontSize: "1rem",
        }}
      />
      <ListItemIcon sx={{ justifyContent: "flex-end" }}>
        <NavigateNext color="primary" />
      </ListItemIcon>
    </ListItem>
  );
};

ListItemRow.propTypes = {
  primary: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default ListItemRow;
