## Reflection

Planning data models and API endpoints mostly reactive based on assignment rather than proactive.  The assignment gives a defined structure that's consistent (within my limited experience) with a subset of best practices, which defines relationships between users, projects, and tasks.  The information each model needs is provided by the assignment; routes required are provided by assignment.

The assignment has a deliberately limited scope and will not be deployed in production.  Considering limited time available, the assignment is graded on defined parameters, contrasted to a more responsive development environment that uses data and feedback from users to progress through design iterations.

For example, typically any data tracked would include a date, as metrics reports would want to track when users made their account, say to track changes in behavior depending on season, economy, economic changes by nation and/or region, economic changes by field, marketing campaigns including marketing of rival products, etc.

## Organization: Projects and Tasks

Projects and Tasks use unorthodox routing in this project, per assignment instructions.

'Projects' and 'Tasks' are not analogous to 'Categories' and 'Products', as products do not necessarily correspond to exactly one category.  So, POST operations to create a new product typically do not operate through POST /api/categories/:categoryId/products; rather typical would be POST /products.

A 'Task', however, belongs to exactly one 'Project'.  POST /api/projects/:projectId/tasks is essentially an operation on a project (adding a task).

In this assignment, we create a 'Tasks' child router of the 'Projects' router, using { mergeParams: true } to pass along parent parameters.  But the routing is unorthodox.  We are told to go through projects for POST and GET, but through tasks (not projects) for PUT and DELETE.

If modification of a task is essentially on a project (arguably deletion), then routing should all go through projects.

Where data is independent of one another with only potential relations, then there may be 'category', 'product', and 'products by category' (the last operating through category, as a category operation).

Where data is not independent, separating 'task' from 'project' (though a task must always have a project) is odd.

Inconsistency and lack of organizational structure are issues for maintaining and building on existing code, and for users of the API.

As is, I think I may build separate routes and controllers for tasks (independent) and tasks (child of project).  Could consolidate controllers in a single controller, perhaps, later.

## Contributors

Mariia mentioned using enum in Mongoose schema, and { mergeParams: true }

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
https://expressjs.com/en/guide/routing.html

## Note to Self

See /gitignore/README.md for additional notes.  When reviewing, see all assignments and documentation in this module.



