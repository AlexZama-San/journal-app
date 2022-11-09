import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"

export const SideBar = ({drawerWith}) => {
  return (
    <Box
        component='nav'
        sx={{
            width: { sm: `${drawerWith}px` },
            flexShrink: { sm: 0 },
        }}>
            <Drawer
            variant="permanent"
            open={true}
            sx={{
                display: { xs: 'block'},
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWith },
            }}
            >
            <Toolbar>
                <Typography variant="h6" noWrap component='div'>
                    Alex Rojas
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    ['Enero','Febrero','Marzo','Abril'].map(text => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid>
                                    <ListItemText primary={text}/>
                                    <ListItemText secondary='texto de relleno'/>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

            </Drawer>

    </Box>
  )
}
