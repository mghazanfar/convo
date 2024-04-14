import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, IconButton } from "@mui/material";
import { Delete, RemoveRedEye } from "@mui/icons-material";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  title: string;
  type: 1 | 2;
  onDelete?: (title: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, title, type, onDelete } = props;

  const handleClose = () => {
    type === 2 && onDelete && onDelete(title);
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box minWidth={300} minHeight={200}>
        <DialogTitle>
          {type === 2
            ? `Are you sure you want to delete ${title}?`
            : `Here we show the details for Item with title "${title}"!`}
        </DialogTitle>
        {type === 2 ? (
          <Box p={3} display={"flex"} justifyContent={"space-around"}>
            <Button color="error" variant="contained" onClick={handleClose}>
              Delete
            </Button>
            <Button color="primary" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        ) : (
          <List sx={{ pt: 0 }}>
            <ListItem disableGutters key={title}>
              <ListItemButton onClick={() => handleListItemClick(title)}>
                <ListItemText
                  primary={"Title:"}
                  secondary={title}
                  sx={{ marginLeft: 12 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Box>
    </Dialog>
  );
}

interface IModal {
  type: 1 | 2;
  data: { title: string };
  onDelete?: (title: string) => void;
}

export default function Modal({ type, data, onDelete }: IModal) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        {type === 2 ? <Delete /> : <RemoveRedEye />}
      </IconButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        title={data.title}
        type={type}
        onDelete={onDelete}
      />
    </div>
  );
}
