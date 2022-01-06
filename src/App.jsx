import React, { useState } from "react"
import { CssBaseline, Paper, Container, Grid, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b56576',
      light: '#EAAC8B',
      dark: '#355070'
    },
    success: {
      main: '#6D597A',
      light: '#EAAC8B',
      dark: '#355070'
    },
    error: {
      main: '#780000'
    }
  }
})

function App() {

  const [todos, setTodos] = useState([
    {
      title: "Learn HTML / CSS",
      complete: true
    },
    {
      title: "Learn JS",
      complete: false
    },
    {
      title: "Sold my soul",
      complete: false
    },
    {
      title: "Desparate",
      complete: true
    },
  ])

  const [newTodo, setNewTodo] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [indexToDelete, setIndexToDelete] = useState(-1)

  const addTodo = () => {
    const tmpArr = todos
    tmpArr.push({
      title: newTodo,
      complete: false
    })
    setTodos(tmpArr)
    setNewTodo('')
  }

  const confirmDeleteTodo = (index) => {
    setIndexToDelete(index)
    setShowDialog(true)
  }

  const deleteTodo = () => {
    const tmpArr = todos
    tmpArr.splice(indexToDelete, 1)
    setTodos([...tmpArr])
    setShowDialog(false)
    setIndexToDelete(-1)
  }

  const toggleTodo = (index) => {
    const tmpArr = todos
    tmpArr[index].complete = !tmpArr[index].complete
    setTodos([...tmpArr])
  }

  const closeDialog = () => {
    setShowDialog(false)
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component='main' maxWidth='lg'>
          <Grid container justifyContent='center' alignItems='center'
            sx={{
              height: '100vh',
              bgcolor: '#22223b'
            }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Paper elevation={8} sx={{ backgroundColor: "#eee", padding: "1rem" }}>
                <Typography variant='h4' noWrap={true} component='h5' align='center' gutterBottom={true}>
                  ToDo App
                </Typography>

                <Grid container direction='row'>
                  <TextField
                    variant='outlined'
                    label='New Todo'
                    size='small'
                    value={newTodo}
                    onChange={(e) => { setNewTodo(e.target.value) }}
                    sx={{
                      flexGrow: 1,
                      marginRight: '.5rem'
                    }} />
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={!newTodo}
                    onClick={addTodo}>
                    ADD
                  </Button>
                </Grid>

                <List>
                  {todos.length > 0 &&
                    todos.map((todo, index) => {
                      return (
                        <ListItem key={index}
                          secondaryAction={
                            <React.Fragment>
                              <IconButton onClick={() => confirmDeleteTodo(index)}>
                                <DeleteIcon color='error' />
                              </IconButton>

                              <IconButton onClick={() => toggleTodo(index)}>
                                {todo.complete ?
                                  <CheckBoxIcon color='success' />
                                  :
                                  <CheckBoxOutlineBlankOutlinedIcon />
                                }
                              </IconButton>
                            </React.Fragment>
                          }>
                          <ListItemText
                            primary={todo.title}
                            secondary={todo.complete ? 'complete' : 'incomplete'} />
                        </ListItem>)
                    })}
                  {todos.length === 0 && (
                    <ListItem>
                      <ListItemText primary='No todos yet...' />
                    </ListItem>
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Dialog
          open={showDialog}
          onClose={closeDialog}>
          <DialogTitle>
            Confirm deleting
          </DialogTitle>
          <DialogContent>
            <DialogContentText component='div'>
              Are you sure you want to delete
              <Typography variant='h6' component='p'>
                {indexToDelete >= 0 && todos[indexToDelete].title}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='error' onClick={deleteTodo}>Yes</Button>
            <Button variant='contained' color='inherit' onClick={closeDialog}>No</Button>
          </DialogActions>
        </Dialog>


      </ThemeProvider>
    </div>
  )
}

export default App
