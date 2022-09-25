import React from 'react'
import { Box, Typography } from "@mui/material"

export const Balance = () => {
  return (
    <Box className="balance" sx={{
      width: "100%",
      my: "24px"
    }}>
      <Typography variant="h4">YOUR BALANCE</Typography>
      <Typography variant="h2">$250</Typography>
    </Box>
  )
}
