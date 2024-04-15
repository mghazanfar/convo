import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { IFormValues } from "../form";
import { Edit } from "@mui/icons-material";
import Modal from "../modal";

interface IRecordsTable {
  items: IFormValues[];
  loading: boolean;
  onDelete: (title: string) => void;
  onEdit: (title: string) => void;
}

export default function RecordsTable({
  items,
  loading,
  onDelete,
  onEdit,
}: IRecordsTable) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 300 }} elevation={2}>
      {!loading && (
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Upvote count</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(({ title, upvotesCount, date }, index) => (
              <TableRow
                key={title + index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                data-testid={title + index}
              >
                <TableCell align="left" component="th" scope="row">
                  {title}
                </TableCell>
                <TableCell align="left">{upvotesCount}</TableCell>
                <TableCell align="left">{date}</TableCell>
                <TableCell align="left">
                  <Box
                    display={"flex"}
                    flex={1}
                    justifyContent={"space-between"}
                  >
                    <Modal type={1} data={{ title }} />
                    <IconButton onClick={() => onEdit(title)}>
                      <Edit />
                    </IconButton>
                    <Modal type={2} data={{ title }} onDelete={onDelete} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {loading && (
        <Box
          display={"flex"}
          justifyContent={"center"}
          sx={{ minHeight: 200 }}
          alignItems={"center"}
        >
          <CircularProgress data-testid="loading" title="Searching..." />
        </Box>
      )}
    </TableContainer>
  );
}
