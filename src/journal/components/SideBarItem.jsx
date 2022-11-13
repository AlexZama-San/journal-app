import { TurnedInNot } from "@mui/icons-material"
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch} from "react-redux"
import { startActiveNote } from "../../store/journal/thunks"

export const SideBarItem = ({title = '',body,id,date,imageUrl = []}) => {
    const dispatch = useDispatch()
    const newTitle = useMemo (() => {
        return title.length > 17 ? title.substring(0, 17) + '...' : title
    },[title])

    const activeNote = () => {
        const note = {
            title,
            body,
            id,
            date,
            imageUrl
        }
        dispatch(startActiveNote(note))
    }
  return (
            <ListItem disablePadding>
                <ListItemButton onClick={activeNote}>
                    <ListItemIcon>
                        <TurnedInNot />
                    </ListItemIcon>
                    <Grid>
                        <ListItemText primary={newTitle}/>
                        <ListItemText secondary={body}/>
                    </Grid>
                </ListItemButton>
            </ListItem>
        )
    }
