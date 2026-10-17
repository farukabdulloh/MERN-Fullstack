# EMS Backend Deployment Notes

## Status

The backend source has been adjusted for Vercel's Express function model and employee profile photos now use Cloudinary. No Vercel deployment was started, and no deployment URL or Vercel runtime logs were available in this workspace, so production behavior is not confirmed.

## Errors and root causes

### `FUNCTION_INVOCATION_FAILED`

- **Evidence available:** the employee routes created `uploads/` synchronously during module import. The folder is ignored by Git, so it may not exist in the deployment bundle; a Vercel function's application filesystem is read-only. That makes the import-time `mkdirSync()` a concrete candidate for a function initialization failure.
- **Other deployment mismatch:** the backend entry point awaited MongoDB before starting an HTTP listener. It now exports the Express app for Vercel and keeps the listener for local development only.
- **Attribution limit:** Vercel build and runtime logs were not available, so the reported invocation failure cannot be attributed conclusively to one of these code paths. The changes address both identified deployment mismatches.
- **Related reliability issue:** if `MONGODB_URI` was missing or invalid, the helper suppressed the connection error. API requests could then run without a database connection and fail later with less useful errors.
- **Deployment configuration to verify:** because the Vercel config and package manifest are in `server/`, set the Vercel project's **Root Directory** to `server`. If Vercel is building from the repository root, it will not use `server/vercel.json` as its project configuration.

## Fixes made

- Export the Express app as the module's default export so Vercel can invoke it.
- Start an HTTP listener only for local development (`VERCEL` is not `1`); local startup still waits for MongoDB.
- Replace employee upload disk storage with Multer memory storage, so the function does not write profile photos to the deployed filesystem.
- Upload employee photo buffers to the Cloudinary `ems/employees` folder and save Cloudinary's HTTPS `secure_url` to `Employee.profileImage` for both employee creation and photo replacement.
- Return an explicit `502` JSON error if Cloudinary is unconfigured, rejects an upload, or fails to return a secure URL. Provider errors are not logged or returned verbatim.
- Connect to MongoDB in the API request middleware on Vercel, reuse an already-open connection, and propagate failures to Express rather than swallowing them.
- Check for a missing `MONGODB_URI` with a safe error message that does not include a credential value.
- Existing frontend `getImageUrl` already accepts absolute HTTPS URLs, so no frontend or schema changes were needed. Existing photos stored as local `uploads/...` paths are not migrated by this change.

## Files changed

- `server/server.js`
- `server/config/db.js`
- `server/routes/employeesRoutes.js`
- `server/controller/employeeController.js`
- `server/services/cloudinary.js` (new)
- `server/package.json`
- `server/package-lock.json`
- `DEPLOYMENT_NOTES.md`

## Checks

- JavaScript syntax checks for all changed backend JavaScript modules: passed.
- `npm ls --depth=0`: passed after the install aligned local `inngest` and `nodemailer` with the manifest and added Cloudinary.
- `npm install cloudinary`: completed and updated the dependency manifest and lockfile. npm reported three high severity audit findings; unrelated dependency upgrades were not applied.
- A direct check with empty Cloudinary settings returned the expected safe missing-configuration error without attempting a network upload.
- Cloudinary upload integration test: not run. No Cloudinary credentials were available for a real upload, so upload success is not claimed.
- `git diff --check`: passed; it reports an existing line-ending warning on a user-modified frontend file.
- Local/API runtime checks: `GET /` returned `200 Server is running`; employee API requests and photo uploads require configured MongoDB and Cloudinary.
- Production endpoint/runtime check: pending; no URL was supplied and deployment was not run.

## Environment variables

Configure these names in Vercel Project Settings → Environment Variables for the appropriate environments. Do not commit `.env` or copy its values into this file.

- `MONGODB_URI`
- `JWT_SECRET`
- `SMTP_USER`
- `SMTP_PASS`
- `SENDER_EMAIL`
- `ADMIN_EMAIL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

`PORT` is supplied by the local process or platform; it is not a secret to configure manually in Vercel.

## Manual steps still needed

1. In Vercel, confirm **Root Directory** is `server`, then redeploy the project.
2. Add the environment variable names above with newly issued values. Confirm MongoDB Atlas Network Access allows the Vercel deployment to reach the database.
3. Open the deployment's Functions/runtime logs if the invocation still fails and use the first startup/import/runtime exception to continue diagnosis.
4. After deployment, request `/` and verify it returns `Server is running`; then test one safe API path (for example an unauthenticated login request with no real credentials) and confirm it returns an expected application response rather than a function error.
5. Configure the three Cloudinary variables above in Vercel Project Settings → Environment Variables. Do not paste their values into chat or commit them.
6. Test employee create/update with a photo after deployment and confirm the returned `employee.profileImage` is an HTTPS Cloudinary URL. No upload has been tested against a real Cloudinary account yet.
7. Existing employee photos with `uploads/...` paths need a separate migration/re-upload if they should be available after deployment; this implementation only handles new and replaced photos.
8. Rotate MongoDB, JWT, and SMTP credentials if any of the old values were ever exposed. Use only the new values in Vercel; do not paste them into chat or logs.

## Lessons

- A local Express server commonly calls `app.listen()`. On Vercel, the platform owns the HTTP listener and invokes the exported app for each request.
- Serverless instances can be reused, so database connections should be reused when already open. Connection errors should be propagated instead of hidden.
- A successful source build does not confirm the function runs. Confirm the deployed URL and inspect runtime logs separately.
- A serverless function's local filesystem is not durable storage. Files that must persist need a database or object storage service.
