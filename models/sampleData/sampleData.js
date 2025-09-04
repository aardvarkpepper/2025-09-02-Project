// createdAt is added at time of creation.
const userArray = [
  {
    "username": "User Alpha",
    "email": "useralpha@users.com",
    "password": "useralpha"  
  },
  {
    "username": "User Bravo",
    "email": "userbravo@users.com",
    "password": "userbravo"
  },
  {
    "username": "User Charlie",
    "email": "usercharlie@users.com",
    "password": "usercharlie"  
  },
]

// api/users/register
// User created successfully: {
//   username: 'User Alpha',
//   email: 'useralpha@users.com',
//   password: '$2b$10$Wi.zkTv640KIvt0GD5h1OePpO.8qmR9sWcUqrEcZ.AaJjdXIuPUyS',
//   _id: new ObjectId('68b9745430b2b0196b0834d0'),
//   createdAt: 2025-09-04T11:13:24.909Z,
//   __v: 0
// }

//api/users/login
//{
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY4Yjk3NDU0MzBiMmIwMTk2YjA4MzRkMCIsInVzZXJuYW1lIjoiVXNlciBBbHBoYSJ9LCJpYXQiOjE3NTY5ODQ5NDcsImV4cCI6MTc1Njk4ODU0N30.z0Lf8W9OjXgNtpR5uRSQLnSrdZaTULaXoyv5zDQjHaI",
//     "user": {
//         "username": "User Alpha",
//         "email": "useralpha@users.com"
//     }
// }

// User created successfully: {
//   username: 'User Bravo',
//   email: 'userbravo@users.com',
//   password: '$2b$10$XwEJLwXTgMcSki0u34E4leFZdG0rp7RqZNSczq64MLrwcWGTn5vd.',
//   _id: new ObjectId('68b976a7bb294522aedb9796'),
//   createdAt: 2025-09-04T11:23:19.704Z,
//   __v: 0
// }


// must populate "user" with user object IDs.  Pull from samples.
const projectArray = [
  {
    "name": "Project Name 1",
    "description": "Project Description 1",
    "user": "68b9745430b2b0196b0834d0"
  },
  {
    "name": "Project Name 2",
    "description": "Project Description 2",
    "user": "68b9745430b2b0196b0834d0"
  },
  {
    "name": "Project Name 3",
    "description": "Project Description 3",
    "user": "placeholder"
  },
]

/**
 * {
    "name": "Project Name 1",
    "description": "Project Description 1",
    "user": "68b9745430b2b0196b0834d0",
    "_id": "68b97e9dbb294522aedb9799",
    "createdAt": "2025-09-04T11:57:17.839Z",
    "__v": 0
}
        {
        "_id": "68b97ee2bb294522aedb979b",
        "name": "Project Name 2",
        "description": "Project Description 2",
        "user": "68b9745430b2b0196b0834d0",
        "createdAt": "2025-09-04T11:58:26.627Z",
        "__v": 0
    }
 */

// must populate ""project"" with "project" object IDs.  Pull from samples.
const taskArray = [
  {
    "title": "Task Title 1",
    "description": "Task Description 1",
    "status": "to do", // test for enum / runValidators failure; change "To Do" after
    "project": "placeholder"
  },
  {
    "title": "Task Title 2",
    "description": "Task Description 2",
    "status": "In Progress",
    "project": "placeholder"
  },
  {
    "title": "Task Title 3",
    "description": "Task Description 3",
    "status": "Done",
    "project": "placeholder"
  },
]