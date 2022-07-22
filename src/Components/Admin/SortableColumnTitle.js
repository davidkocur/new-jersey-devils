import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const SortableColumnTitle = ({ children, sort, columnName, disabled }) => {
  const [sortProp, desc] = sort?.split(":") ?? [];

  const style = {
    px: 2,
    py: 1.4,
    borderRadius: "0",
    textTransform: "none",
    ".MuiButton-endIcon": {
      visibility: sortProp === columnName ? "visible" : "hidden",
    },
  };

  return (
    <Link
      to={
        sortProp !== columnName ? `?sort=${columnName}` : !desc ? `?sort=${columnName}:desc` : "./"
      }
      component={RouterLink}
    >
      <Button
        variant="text"
        color={sortProp === columnName ? "primary" : "neutral"}
        disabled={disabled}
        sx={style}
        endIcon={desc ? <ArrowDropDown fontSize="large" /> : <ArrowDropUp fontSize="large" />}
      >
        {children}
      </Button>
    </Link>
  );
};

export default SortableColumnTitle;
