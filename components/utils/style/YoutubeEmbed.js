import { Box } from '@material-ui/core';
import React from 'react';


const YoutubeEmbed = ({youtubeId,classes}) => {
    return (
        <Box    
          className={classes.video}
          style={{
            position: "relative",
            paddingBottom: "56.25%" /* 16:9 */,
            paddingTop: 25,
            height: 0
          }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            frameBorder="0"
          />
        </Box>
      );
}

export default YoutubeEmbed
