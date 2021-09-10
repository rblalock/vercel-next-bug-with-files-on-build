# Vercel Deployment Bug with Files Downloaded at Build Time

This repo is meant to reproduce a bug where files downloaded at build time are not included in the deployment in NextJS 11 + Vercel.

## Here's the original Vercel Support Ticket Verbiage for Reference / Context:

---

I spent several hours debugging this and here is the list of things I came across and what I had to do to get this NextJS app deployed on Vercel again:

- I upgraded our web app to NextJS 11 latest.
- Tested locally, everything works fine. Tested with `vercel dev` locally too just because sometimes I can catch some things npm run dev (next dev) does not
- Deployed
- A small read-only SQLite db file that we pull down at build time cannot be found in the file system.

Before upgrading to NextJS 11, this has never been a problem. The build step would pull down the file, and it would be present when deployed and used in some of the APIs we have (in pages/api/...).

I tried a bazillion things. The files were being put in a path (I don't recall the exact path) but it was something like /..../vercel0/data/filehere.sqlite

And it was indeed there but the functions could no longer read from this.

In the end, I downgraded to NextJS 10 and everything is now working as it should. I'm not really sure how to troubleshoot this further.

---

## Sample Code Explanations

This repo is meant to be as close as possible to a product app that does very similar things with a read-only SQLite file that gets downloaded at build time.

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


