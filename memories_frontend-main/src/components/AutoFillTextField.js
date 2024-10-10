import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";

export default function AutoFillTextField({ tags, setTags }) {
  const handleAutocompleteChange = (event, value) => {
    console.log(value);
    setTags(value);
  };

  return (
    <FormControl
      variant="standard"
      fullWidth
      style={{ marginTop: "8px", marginBottom: "8px" }}
    >
      <Autocomplete
        multiple
        freeSolo
        id="tags-filled"
        options={[]}
        value={tags}
        onChange={handleAutocompleteChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search By Tags"
              style={{ color: "black" }}
            />
          </>
        )}
      />
    </FormControl>
  );
}
