# Vercel Deployment Bug with Files Downloaded at Build Time

This repo is meant to reproduce a bug where files downloaded at build time are not included in the deployment in NextJS 11 + Vercel.

This repo is meant to be as close as possible to a product app that does very similar things with a read-only SQLite file that gets downlaoded at build time.

`scripts/downloadDb.js` Downloads the SQLite zip at build time (ref. package.json run scripts)

`pages/api/test` has a sample query, import db helper, DB init, etc. that can be used for this reproduction case.

## Reproduce the problem

1. Locally, run `npm run download-db && npm run dev` to test locally.
2. When running the app, visit `/api/test` to run the code in question.  It should work locally.
3. Deploy on Vercel.
4. Visit `/api/test` on the new deployed version to demonstrate the problem, you should see the error mentioned below.

### Error when deployed

```bash
[GET] /api/test
20:12:23:14
.....ERROR........: Cannot open database because the directory does not exist
```

If you do some file inspection / logging / etc. the file is not present.


