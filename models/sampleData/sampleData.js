// createdAt is added at time of creation.
const userArray = [
  {
    username: 'User Alpha',
    email: 'useralpha@users.com',
    password: 'useralpha',  
  },
  {
    username: 'User Bravo',
    email: 'userbravo@users.com',
    password: 'userbravo',  
  },
  {
    username: 'User Charlie',
    email: 'usercharlie@users.com',
    password: 'usercharlie',  
  },
]

// must populate 'user' with user object IDs.  Pull from samples.
const projectArray = [
  {
    name: 'Project Name 1',
    description: 'Project Description 1',
    user: 'placeholder'
  },
  {
    name: 'Project Name 2',
    description: 'Project Description 2',
    user: 'placeholder'
  },
  {
    name: 'Project Name 3',
    description: 'Project Description 3',
    user: 'placeholder'
  },
]

// must populate 'project' with project object IDs.  Pull from samples.
const taskArray = [
  {
    title: 'Task Title 1',
    description: 'Task Description 1',
    status: 'to do', // test for enum / runValidators failure; change 'To Do' after
    project: 'placeholder'
  },
  {
    title: 'Task Title 2',
    description: 'Task Description 2',
    status: 'In Progress',
    project: 'placeholder'
  },
  {
    title: 'Task Title 3',
    description: 'Task Description 3',
    status: 'Done',
    project: 'placeholder'
  },
]