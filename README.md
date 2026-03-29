# Hardware Manager (Part 2 of 3) Overview

Full-stack app utilizing React and TypeScript to demonstrate type-safe patterns of user interaction and reactive design.

## Using the Software

Install dependencies with npm:

```sh
npm install
```

Compile TypeScript and run the dev server with Vite:

```sh
npm run dev
```

Format and lint with Prettier and ESLint (respectively):

```sh
# format
npm run format

# lint
npm run lint
```

You can watch a demo of the software running on the dev server here:

> [Software Demo Video](http://youtube.link.goes.here)

## Web Pages

`/`: Root url leads to authentication if user not signed in. Users can use Google OAuth to login to the app

`/dashboard`: Landing page for the different management pages. Defaults to inventory view. The collapsible sidebar serves as the global navigation in mobile and web views. It also includes a global search bar.

`/dashboard/inventory`: Shows a filterable gallery of product cards.

`/dashboard/products/${productId}/<edit>`: \The base products URL shows a table of filterable products and an option to add a new product. You can view details with the `productId` in the URL. An additional `/edit` leads to a page where you can edit the given product.

`/dashboard/categories/${categoryId}/<edit>`: The base categories URL shows a table of categories and an option to add a new child category. You can view details with the `categoryId` in the URL. An additional `/edit` leads to a page where you can edit the given category.

`/dashboard/manufacturers/${manufacturerId}/<edit>`: The base manufacturers URL shows a table of manufacturers and an option to add a new manufacturer. You can view details with the `manufacturerId` in the URL. An additional `/edit` leads to a page where you can edit the given manufacturer.

`/dashboard/users`: A makeshift way to manage users and revoke access (Firestore and Authentication rules haven't been set up)

## Development Environment

### Development Tools

- Visual Studio Code on Fedora Workstation 43
- TypeScript 5
- Node.js/ Vite.js
- Prettier & ESLint
- TanStack Dev Tools

### Frontend

- React TypeScript
- TanStack Form, Query, Routing, and Table
- Zod Validation
- Tailwind CSS & Shadcn

### Backend

- Firebase Authentication
- Firebase Hosting
- Firebase App Check

## Useful Websites

{Make a list of websites that you found helpful in this project}

- [vite.js](https://vite.dev)
- [react.gg | Fireship.dev](https://fireship.dev/c/react)
- [React + TypeScript | Fireshi.dev](https://fireship.dev/c/react-with-typescript)
- [TanStack Docs](https://tanstack.com/)
- [shadcn](https://ui.shadcn.com/)
- [Firebase Docs](https://firebase.google.com/docs)

## Future Work

- Redirect common name params to the proper route (i.e. `manufacturer/nvidia` should redirect to the NVIDIA details page)
- This entire project uses static data, the third part of this project will implement the backend with FireStore and TanStack Query
