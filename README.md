# Verify Kash 🕵️🎂

This is a responsive, interactive, static web application designed as a personalized birthday experience. 

## How to Deploy

Because this app is built purely with **HTML, CSS, and Vanilla JavaScript** (no build step required), deploying it is incredibly fast and completely free on platforms like Vercel, Netlify, or GitHub Pages.

### Option 1: Deploy to Vercel (Recommended)
Vercel is extremely fast and configured automatically for this project.

1. Create a free account at [Vercel](https://vercel.com/).
2. You can either:
   - **Using Git**: Push this folder to a GitHub repository, then click "Add New Project" in Vercel and import your repository.
   - **Using Vercel CLI**: Open your terminal in this folder and type:
     ```bash
     npm i -g vercel
     vercel
     ```
3. Follow the prompts (use default settings). Vercel will instantly give you a live URL!

### Option 2: Deploy to Netlify
Netlify is another excellent free host for static sites.

1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Simply drag and drop this entire project folder into your browser window.
3. Netlify will upload the files and instantly give you a live URL.

### Option 3: GitHub Pages
If you use GitHub, you can host it directly from your repo.

1. Push this code to a GitHub repository.
2. Go to your repository **Settings** -> **Pages**.
3. Under "Build and deployment", set the **Source** to `Deploy from a branch` and select your `main` branch.
4. Click Save. Within a few minutes, your site will be live at `https://[username].github.io/[repo-name]/`.

### Option 4: Deploy to Render
Render is another powerful platform that supports one-click deployments. This project includes a `render.yaml` blueprint.

1. Create a free account at [Render](https://render.com/).
2. Go to the Dashboard and click **New +** -> **Blueprint**.
3. Connect your GitHub repository containing this code.
4. Render will automatically detect the `render.yaml` file, set it up as a blazing-fast Static Site, and deploy it for you!

## Running Locally

If you just want to run it on your own computer to test:

```bash
# If you have Node.js installed:
npx serve .
```

Then open `http://localhost:3000` in your browser.
