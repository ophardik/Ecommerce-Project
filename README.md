# E-commerce Platform

MERN storefront: authentication, product browsing and categories, cart and
checkout, with PDF invoice generation and transactional email.

## Stack

Node.js · Express · MongoDB (Mongoose) · React · JWT · bcrypt · multer ·
nodemailer · pdfkit / easyinvoice

## What it does

- **Accounts** — JWT auth with bcrypt-hashed passwords.
- **Catalogue** — products and categories, with image upload handled by multer.
- **Orders** — checkout generates a PDF invoice and emails it via nodemailer.

## Layout

```
index.js         server entry
connection.js    MongoDB connection
routes/          REST endpoints
controller/      request handlers
model/           Mongoose schemas
client/          React front end
```

## Running it

```bash
npm install
cp .env.example .env
npm run dev
```
