import TextField from "@mui/material/TextField";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, IconButton } from "@mui/material";
import { styles } from "./StyledComponents";
// last Link with add icon and the remaining with remove icon
const ExtendableLinkFields = ({ links, pushLink, removeLink, onLinkChange }) => {
  let styling = { ...styles.center };
  return (
    <>
      {links.map((value, index) => (
        <div style={styling}>
          <TextField
            sx={{ flex: 1 }}
            defaultValue={value}
            onChange={(event) => {onLinkChange(index, event.target.value)}}
            placeholder={"Link " + (Number(index) + 1)}
            type="text"
          />
          {links.length - 1 === index ? (
            <IconButton onClick={() => {pushLink("")}}>
              <AddCircleOutlineIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => {removeLink(index)}}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
        </div>
      ))}
    </>
  );
};

export default ExtendableLinkFields;
