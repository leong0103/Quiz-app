import { Grid } from '@mui/material'

interface CenterProp {
  children: React.ReactNode;
}
export default function Center({children}:CenterProp) {
  return (
    <Grid 
      container
      direction="column"
      alignItems="center"
      justifyContent="Center"
      sx={{ minHeight:"100vh"}}
    >
      <Grid item xs={1}>
        {children}
      </Grid>
    </Grid>
  )
}
