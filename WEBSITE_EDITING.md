# Editing the MEC-Arm website

The website is plain HTML, CSS, and JavaScript in the repository's `docs/` folder. GitHub Pages publishes that folder from `main`. There is no npm install, generator, or build command.

## Where things live

| File or folder | Edit it to change… |
| --- | --- |
| `docs/index.html` | The compact homepage text, project status lists, and the three documentation cards. |
| `docs/styles.css` | Colors, spacing, type, cards, sidebar, and mobile layout. Sitewide color variables are at the top. |
| `docs/electrical/` | Electrical landing page, hardware boards and subsystems, and firmware pages. |
| `docs/mechanical/` | Structure, gearbox, joint, and gripper pages. |
| `docs/software/` | Host, motion, and testing-tool pages. |
| `docs/docs.js` | Shared header, sidebar, breadcrumbs, and the list of project pages (`sitePages`). |
| `docs/assets/MEC_Logo.svg` | The supplied logo used in the header, footer, homepage, and favicon. |

Each documentation topic is a real `.html` file. For example, the ESC sensing page is `docs/electrical/hardware/esc/feedback.html`. A folder's landing page is its `index.html`, such as `docs/electrical/hardware/esc/index.html`.

## Update existing text

Open the page's `.html` file in an editor. Its `<h1>` is the page title. Paragraphs and lists in `<main class="docs-content">` are the visible content. The current descriptions are starting points; replace them with your design notes, images, tables, and measured results as the project develops. Keep planned values distinct from measured results.

On the homepage, edit the introductory paragraphs, the three lists in `<section class="status-band">`, and the three cards in `<section class="documentation">`. To update a milestone, move its `<li>…</li>` to the appropriate list. The small status label on an individual topic page is inside `<span class="status-pill">…</span>`.

The homepage's GitHub link is directly in `docs/index.html`. The GitHub link on documentation pages is set by `repoUrl` near the bottom of `docs/docs.js`.

To add an image, place it in `docs/assets/` and use a relative path from the page. From `docs/index.html` that looks like `<img src="assets/photo.jpg" alt="A description">`. From `docs/electrical/index.html`, use `../assets/photo.jpg`.

## Add a new topic page

Example: add a PWM page under the ESC.

1. Copy `docs/electrical/hardware/esc/feedback.html` to `docs/electrical/hardware/esc/pwm.html`.
2. Edit its `<title>`, `<h1>`, description, status, and main content. Give its `<body>` a unique `data-page="esc-pwm"`. Keep `data-root="../../../"` because it is three folders below `docs/`.
3. Add this entry to the `sitePages` array in `docs/docs.js` next to the other ESC pages:

   ```js
   { id: "esc-pwm", label: "PWM", path: "electrical/hardware/esc/pwm.html", parent: "esc" },
   ```

4. Add a card linking to it in `docs/electrical/hardware/esc/index.html`, following one of the existing `<a class="topic-card">` examples.

The sidebar and breadcrumbs are built from `sitePages`. Use a unique `id`, make `parent` the ID of its containing topic, and make `path` relative to `docs/`. For a page at another depth, `data-root` needs one `../` for each folder between the page and `docs/`.

## Preview and publish

You can open `docs/index.html` in a browser for a quick local preview. All page links are relative.

After editing, run from the repository root:

```bash
git add docs WEBSITE_EDITING.md
git commit -m "Update project website"
git push
```

Check **Settings → Pages** if the site does not update. It should publish from `main` and `/docs`. Browser caches may take a few minutes to refresh; `Ctrl+Shift+R` reloads the current version.
