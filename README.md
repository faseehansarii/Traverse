# Traverse

An Airbnb-style listings platform. You can sign up, list your own place, and leave reviews on places you've stayed. Everything from auth to the database schema to the deployment.

## Live Demo
https://traverse-homes.up.railway.app/

## Core Features
- Session-based authentication with Passport.js (local strategy), passwords hashed and salted via `passport-local-mongoose`
- Sessions persisted in MongoDB with `connect-mongo` so logins survive a server restart/redeploy
- Custom authorization middleware, route-level checks for `isLoggedIn` and `isOwner` before any create/edit/delete runs
- Server-side schema validation with Joi, bad listing/review payloads get rejected before they touch the database
- Full CRUD on listings, with image upload handled via Multer straight to Cloudinary
- One-to-many relational schema in MongoDB: listings reference their owner and their reviews via Mongoose `ref` + `populate`
- Cascading delete, removing a listing also removes its associated reviews so nothing orphaned is left in the database
- Review ownership enforced server-side, only a review's author or the listing owner can delete it
- Centralized async error handling, wrapped route handlers so a rejected promise hits one error handler instead of crashing the server
- MVC structure, routes only wire URLs to controllers, controllers hold the logic, models define the schema

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- EJS + ejs-mate (templating)
- Passport.js (authentication)
- Multer + Cloudinary (image upload/storage)
- Joi (server-side validation)
- Bootstrap 5 (UI)
- Deployed on Railway

I wanted a project that actually forced me to deal with auth, ownership checks, file uploads, and a real relational-ish schema (listings ↔ reviews ↔ users).
