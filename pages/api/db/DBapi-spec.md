#Database API
Database relies on mongoose for shema validation and ObjectID generation for mongoDB entries.

##Project Api Routes
**Get all projects**
GET - /api/db/projects

**Create project**
POST - /api/db/projects/add

**Get, Update, Delete project**
GET - /api/db/projects/[projectID]
UPDATE - /api/db/projects/[projectID]
DELETE - /api/db/projects/[projectID]
