/* GitHub project Pages URLs are OWNER.github.io/REPOSITORY/.
   This gives the site a working repository link without hard-coding an owner.
   If you later add a custom domain, set repoUrl below explicitly. */
const repoUrl = "";
const host = window.location.hostname;
const repoName = window.location.pathname.split("/").filter(Boolean)[0];
const owner = host.endsWith(".github.io") ? host.slice(0, -".github.io".length) : "";
const inferredUrl = owner && repoName ? `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repoName)}` : "";
const destination = repoUrl || inferredUrl;
if (destination) {
  for (const id of ["repo-nav", "repo-cta"]) {
    const link = document.getElementById(id);
    link.href = destination;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
} else {
  document.getElementById("repo-nav").hidden = true;
  document.getElementById("repo-cta").hidden = true;
}
