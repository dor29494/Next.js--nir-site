import React, { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: "7px",
    direction: "ltr",

    "& .ck-editor__editable_inline": {
      minHeight: "250px",
      maxHeight: "400px",
      overflowY: "scroll",
    },
  },
}));

const Editor = ({ callback, dataBody }) => {
  const [data, setData] = useState("");
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CKEditor
        editor={ClassicEditor}
        data={dataBody}
        //   onChange={ ( event, editor ) => {
        //     const data = editor.getData();
        //     callback(event,data);
        // } }
        onChange={(event, editor) => {
          const data = editor.getData();
          callback(data);
        }}
      />
      <Box dangerouslySetInnerHTML={{ __html: data }} />
    </Box>
  );
};

export default Editor;
