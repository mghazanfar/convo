import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";
import RecordsTable from "../table";
import { IFormValues } from "../form";
import { ChangeEvent, useEffect, useState } from "react";

interface ITableWithActions {
  data: IFormValues[];
  onDelete: (title: string) => void;
  onEdit: (title: string) => void;
}

export const TableWithActions = ({
  data,
  onDelete,
  onEdit,
}: ITableWithActions) => {
  const [sortBy, setSortBy] = useState(2);
  const [searchValue, setSearchValue] = useState("");
  const [loadingForSearch, setLoadingForSearch] = useState(false);

  const getSortedData = () => {
    if (sortBy === 2) {
      let sorted = [...data].sort(function (a, b) {
        return (new Date(a.date) as any) - (new Date(b.date) as any);
      });
      return sorted;
    } else {
      let sorted = [...data].sort(function (a, b) {
        return b.upvotesCount - a.upvotesCount;
      });
      return sorted;
    }
  };

  const getSearchData = () => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  useEffect(() => {
    if (searchValue.length > 3) {
      setLoadingForSearch(true);
    }
    const delayDebounceFunction = setTimeout(() => {
      setLoadingForSearch(false);
    }, 1000);

    return () => clearTimeout(delayDebounceFunction);
  }, [searchValue]);

  const handleSearch = (e: ChangeEvent<any>) => {
    const searchText = e.target.value;
    setSearchValue(searchText);
  };

  return (
    <Box p={4} borderRadius={4} boxShadow={6}>
      <TextField
        placeholder="Search record with at least 3 characters"
        fullWidth
        margin="normal"
        onChange={handleSearch}
        value={searchValue}
        disabled={data.length < 2}
      />
      <Box display={"flex"} alignItems={"center"} my={3}>
        <Box mr={2}>
          <Typography>Sort by</Typography>
        </Box>
        <ButtonGroup aria-label="Basic button group">
          <Button
            variant={sortBy === 1 ? "contained" : "outlined"}
            onClick={() => setSortBy(1)}
            disableRipple={sortBy === 1}
          >
            Most upvoted
          </Button>
          <Button
            variant={sortBy === 2 ? "contained" : "outlined"}
            onClick={() => setSortBy(2)}
            disableRipple={sortBy === 2}
          >
            Most Recent
          </Button>
        </ButtonGroup>
      </Box>
      <RecordsTable
        items={searchValue.length > 2 ? getSearchData() : getSortedData()}
        loading={loadingForSearch}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </Box>
  );
};
