---
title: "How Vercel Enhances Deployment Experience"
date: "2022-01-01"
---

After deploying to Vercel, try doing the following if you can:

- Create a new branch on your app.
- Make some changes and push to GitHub.
- Create a new pull request (GitHub help page).
- You should see a comment by the vercel bot on the pull request page.
- Try clicking on the Preview URL inside this comment. You should see the changes you just made.

# Develop, Preview, Ship

We’ve just gone through the workflow we call DPS: Develop, Preview, and Ship.

- Develop: We’ve written code in Next.js and used the Next.js development server running to take advantage of its hot reloading feature.
- Preview: We’ve pushed changes to a branch on GitHub, and Vercel created a preview deployment that’s available via a URL. We can share this - preview URL with others for feedback. In addition to doing code reviews, you can do deployment previews.
- Ship: We’ve merged the pull request to main to ship to production.
- We strongly recommend using this workflow when developing Next.js apps — it will help you iterate on your app faster.
