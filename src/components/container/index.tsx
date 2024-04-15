import { Box, Grid } from "@mui/material";
import { Form } from "../form";
import { TableWithActions } from "../table-with-actions";
import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../../store/items";

const inititalValues = {
  title: "",
  upvotesCount: "",
  date: "",
};

export const Container = () => {
  const { items: data, updateItems } = useContext(ItemsContext);
  const [editValue, setEditValue] = useState(inititalValues);

  const handleDelete = (title: string) => {
    const dataAfterDelete = [...data].filter(
      (item: any) => item.title !== title
    );

    updateItems(dataAfterDelete);
  };

  const handleEdit = (title: string) => {
    const itemToEdit = data.filter((item) => item.title === title)[0];
    setEditValue(itemToEdit);
  };

  useEffect(() => {
    updateItems([...data].map((item, index) => ({ ...item, id: index })));
  }, [data, updateItems]);

  const onEdit = (updatedValues: any) => {
    setEditValue(inititalValues);
    const valueToUpdateIndex = data.findIndex(
      (item) => item.id === updatedValues.id
    );
    const values = [...data];
    values[valueToUpdateIndex] = updatedValues;
    updateItems(values);
  };

  return (
    <Box p={8} test-id="app-container">
      <Box display={"flex"} justifyContent={"center"} mb={2}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYseGHD4jSdmHO83qQORRds3bOQSPY2m75ZL1Qrxk0uA&s"
          height={150}
          width={150}
          alt="logo"
        />
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Form
            onSubmit={(item) => {
              updateItems([...data.concat(item)]);
            }}
            editValue={editValue}
            handleEdit={onEdit}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <TableWithActions
            data={data}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
