# Multer for File Uploads: Allows users to upload files, such as images or documents, with validation and size restrictions

Multer can be added to the existing Express project to support file uploads such as images or documents without changing the overall structure of the application. Since the project already separates routes, controllers, and middleware, Multer fits naturally as another middleware that handles multipart/form-data requests. It can be configured in its own file, where storage settings are defined and basic rules are applied, such as limiting file size and allowing only certain file types like images or PDFs.

After setting it up, Multer can be used in specific routes, such as the POST endpoint for creating a file. It should be placed before the controller so that the uploaded file is processed first and attached to the request object. Inside the controller, the file information (like filename or path) can be accessed through req.file and saved together with other data, such as title and content. This makes it easy to keep both file data and metadata organized.

It is also important to handle errors properly. If a user uploads a file that is too large or not allowed, the system should return a clear error message. By adding Multer this way, the project can support file uploads while still keeping the same clean structure and flow as the rest of the code.


## Milestone 2
In this project, I added a new component called Multer to support file uploads. The main purpose of this feature is to allow users to upload images or documents through the API. I created a separate endpoint /api/v1/upload so it does not affect the existing file CRUD functions. This helps keep the project structure clean and organized.

Multer is used as middleware, which fits well with the current Express design. It handles multipart/form-data requests and processes the uploaded file before passing it to the controller. I also added validation rules, such as limiting file size to 5MB and allowing only specific file types like JPG, PNG, and PDF. This improves security and prevents invalid uploads.

The uploaded file is stored in a local uploads folder, and the server returns useful information such as filename, path, and size. I also updated Swagger documentation so the new endpoint can be tested easily in the browser.

Overall, this component improves the functionality of the project and demonstrates how middleware can be used to extend an API without breaking existing features.