import { Box, Button, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

export interface IFormValues {
  title: string;
  upvotesCount: number;
  date: string;
  id: number;
}

interface IForm {
  onSubmit: (item: IFormValues) => any;
  handleEdit: (item: IFormValues) => any;
  editValue: { title: string; upvotesCount: any; date: any };
}

const inititalValues = {
  title: "",
  upvotesCount: "",
  date: "",
};

export const Form = ({ onSubmit, editValue, handleEdit }: IForm) => {
  const [values, setValues] = useState(inititalValues as any);
  const formCanSubmit =
    editValue.title.length > 0
      ? editValue.title.length > 3 &&
        editValue.upvotesCount > 0 &&
        editValue.date.length > 3
      : values.title.length > 3 &&
        values.upvotesCount > 0 &&
        values.date.length > 3;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    editValue.title.length > 0 ? handleEdit(values) : onSubmit(values);
    setValues(inititalValues);
  };

  useEffect(() => {
    if (editValue.title.length > 0) {
      setValues(editValue);
    }
  }, [editValue]);

  return (
    <Box
      p={4}
      borderRadius={4}
      boxShadow={6}
      component={"form"}
      onSubmit={handleSubmit}
      data-testid="form"
    >
      <Typography>Add record</Typography>
      <TextField
        fullWidth
        margin="normal"
        placeholder="Enter title..."
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
        name="title"
      />
      <TextField
        fullWidth
        margin="normal"
        placeholder="Enter upvotes number between 0 to 100"
        type="number"
        value={values.upvotesCount}
        onChange={(e) => {
          console.log(e.target);
          setValues({ ...values, upvotesCount: e.target.value });
        }}
        name="upvotes-count"
      />
      <TextField
        fullWidth
        margin="normal"
        placeholder="Enter Date"
        type="date"
        value={values.date}
        onChange={(e) => setValues({ ...values, date: e.target.value })}
        name="date"
      />
      <Box mt={2}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={!formCanSubmit}
          type="submit"
          test-id="submit-form"
          name="submit"
        >
          {editValue.title ? "Save Edits " : "Add Data"}
        </Button>
      </Box>
    </Box>
  );
};
