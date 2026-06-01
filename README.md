This is a small [Next.js](https://nextjs.org/) app used to check the current branch, commit, build date, and response time for supported service environments.

## Getting Started

Install dependencies and run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the app by modifying files under `app/`. The page auto-updates as you edit the code.

[Route handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint is implemented in `app/api/hello/route.js`.

The application uses the App Router and server-side fetches to read each environment's `/ping` endpoint.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [App Router Documentation](https://nextjs.org/docs/app) - learn more about the routing model used in this app.

## Notes

The current supported applications and environments are defined in `utils/CccdApp.js` and `utils/CduiApp.js`.
