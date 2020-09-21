### Summary

A demo project showcasing a simple blog application built using next.js. The project supports basic CRUD and authentication.

### To run the project

0. Make sure you have node.js and yarn installed.

1. Run ```yarn install```

2. Create ```.env``` based on ```.env.example```

3. Run ```yarn sync``` which will create schema in the database based on ```PG_DATABASE``` env. Make sure that at least one row of category is inserted to category table (category id is required when creating a blog post).

4. Run ```yarn start```

5. Open browser and go to ```http://localhost:{PORT_IN_ENV}/api/``` where there will be a user interface for exploration.

### Tips

Clicking ```Authorize``` button in swagger will allow the access token (recevied from```/auth/login```) to be placed on authorization header.

