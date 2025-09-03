## Reflection

Planning data models and API endpoints mostly reactive based on assignment rather than proactive.  The assignment gives a defined structure that's consistent (within my limited experience) with a subset of best practices, which defines relationships between users, projects, and tasks.  The information each model needs is provided by the assignment; routes required are provided by assignment.

The assignment has a deliberately limited scope and will not be deployed in production.  Considering limited time available, the assignment is graded on defined parameters, contrasted to a more responsive development environment that uses data and feedback from users to progress through design iterations.

For example, typically any data tracked would include a date, as metrics reports would want to track when users made their account, say to track changes in behavior depending on season, economy, economic changes by nation and/or region, economic changes by field, marketing campaigns including marketing of rival products, etc.

## Contributors

Mariia mentioned using enum in Mongoose schema.

## Routes / API Endpoints

### api/users
POST /api/users/register 
POST /api/users/login

### api/projects
POST /api/projects
GET /api/projects
GET /api/projects/:id
PUT /api/projects/:id
DELETE /api/projects/:id

### api/tasks
POST /api/projects/:projectId/tasks
GET /api/projects/:projectId/tasks
PUT /api/tasks/:taskId
DELETE /api/tasks/:taskId

### Buildables

## References

https://mongoosejs.com/docs/validation.html

## Note to Self

See /gitignore/README.md for additional notes.



