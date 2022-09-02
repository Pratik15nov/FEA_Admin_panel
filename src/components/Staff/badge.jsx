import Chip from "@mui/material/Chip";
import TableCell from "@mui/material/TableCell";

export default function Badge(props) {
  return (
    <TableCell width="50%" component="th" scope="row">
      {props.row.name}
      <>
        <Chip label="All Check" onClick={() => props.onChange()} />
        <Chip label="None" />{" "}
      </>
    </TableCell>
  );
}
