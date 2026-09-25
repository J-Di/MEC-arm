/* Shared navigation for the project pages. To add a page, add one entry here
   and link to it from its parent page. The parent sets its breadcrumb depth. */
const sitePages = [
  { id: "electrical", label: "Electrical", path: "electrical/" },
  { id: "electrical-hardware", label: "Hardware", path: "electrical/hardware/", parent: "electrical" },
  { id: "esc", label: "Joint ESC", path: "electrical/hardware/esc/", parent: "electrical-hardware" },
  { id: "esc-drive", label: "Motor drive", path: "electrical/hardware/esc/motor-drive.html", parent: "esc" },
  { id: "esc-feedback", label: "Sensing & feedback", path: "electrical/hardware/esc/feedback.html", parent: "esc" },
  { id: "esc-protection", label: "Protection", path: "electrical/hardware/esc/protection.html", parent: "esc" },
  { id: "esc-comms", label: "Communication", path: "electrical/hardware/esc/communication.html", parent: "esc" },
  { id: "power-board", label: "Power & coordination board", path: "electrical/hardware/power-board/", parent: "electrical-hardware" },
  { id: "power-distribution", label: "Power distribution", path: "electrical/hardware/power-board/distribution.html", parent: "power-board" },
  { id: "power-interfaces", label: "System interfaces", path: "electrical/hardware/power-board/interfaces.html", parent: "power-board" },
  { id: "firmware", label: "Firmware", path: "electrical/firmware/", parent: "electrical" },
  { id: "firmware-foc", label: "FOC", path: "electrical/firmware/foc.html", parent: "firmware" },
  { id: "firmware-position", label: "Joint position control", path: "electrical/firmware/position.html", parent: "firmware" },
  { id: "firmware-can", label: "CAN protocol", path: "electrical/firmware/can.html", parent: "firmware" },
  { id: "mechanical", label: "Mechanical", path: "mechanical/" },
  { id: "structure", label: "Arm structure", path: "mechanical/structure/", parent: "mechanical" },
  { id: "gearboxes", label: "Cycloidal gearboxes", path: "mechanical/gearboxes/", parent: "mechanical" },
  { id: "gearbox-design", label: "Gearbox design", path: "mechanical/gearboxes/design.html", parent: "gearboxes" },
  { id: "gearbox-testing", label: "Gearbox testing", path: "mechanical/gearboxes/testing.html", parent: "gearboxes" },
  { id: "joints", label: "Joint assemblies", path: "mechanical/joints/", parent: "mechanical" },
  { id: "joint-waist", label: "Waist", path: "mechanical/joints/waist.html", parent: "joints" },
  { id: "joint-shoulder", label: "Shoulder & elbow", path: "mechanical/joints/shoulder-elbow.html", parent: "joints" },
  { id: "joint-wrist", label: "Wrist", path: "mechanical/joints/wrist.html", parent: "joints" },
  { id: "gripper", label: "Gripper", path: "mechanical/gripper/", parent: "mechanical" },
  { id: "software", label: "Software", path: "software/" },
  { id: "host", label: "Raspberry Pi host", path: "software/host/", parent: "software" },
  { id: "host-architecture", label: "Host architecture", path: "software/host/architecture.html", parent: "host" },
  { id: "motion", label: "Motion planning", path: "software/motion/", parent: "software" },
  { id: "kinematics", label: "Kinematics", path: "software/motion/kinematics.html", parent: "motion" },
  { id: "trajectories", label: "Trajectories", path: "software/motion/trajectories.html", parent: "motion" },
  { id: "tools", label: "Testing tools", path: "software/tools/", parent: "software" }
];

const pageMap = new Map(sitePages.map(page => [page.id, page]));
const root = document.body.dataset.root;
const currentId = document.body.dataset.page;
const href = path => root + path;
const chain = [];
for (let node = pageMap.get(currentId); node; node = pageMap.get(node.parent)) chain.unshift(node);

document.getElementById("site-header").innerHTML = `<div class="container nav-wrap">
  <a class="brand" href="${href('index.html')}" aria-label="MEC-Arm home"><img class="brand-logo" src="${href('assets/MEC_Logo.svg')}" alt="" width="38" height="50"></a>
  <nav aria-label="Main navigation"><a href="${href('index.html')}">Overview</a><a href="${href('electrical/')}">Electrical</a><a href="${href('mechanical/')}">Mechanical</a><a href="${href('software/')}">Software</a></nav>
  <a class="nav-github" id="repo-nav" href="#repository">GitHub ↗</a></div>`;

function renderTree(parent, depth = 0) {
  return sitePages.filter(p => p.parent === parent).map(p => {
    const active = p.id === currentId;
    const open = chain.some(n => n.id === p.id);
    const children = open ? renderTree(p.id, depth + 1) : "";
    return `<li><a class="side-link depth-${Math.min(depth, 3)}${active ? ' active' : ''}" ${active ? 'aria-current="page"' : ''} href="${href(p.path)}">${p.label}</a>${children ? `<ul>${children}</ul>` : ''}</li>`;
  }).join("");
}
document.getElementById("docs-sidebar").innerHTML = `<p class="sidebar-label">PROJECT MAP</p><a class="sidebar-home" href="${href('index.html')}">← Project overview</a><ul class="side-tree">${renderTree(undefined)}</ul>`;
document.getElementById("breadcrumbs").innerHTML = `<a href="${href('index.html')}">MEC-Arm</a>${chain.map((node, index) => `<span aria-hidden="true">/</span>${index === chain.length - 1 ? `<span aria-current="page">${node.label}</span>` : `<a href="${href(node.path)}">${node.label}</a>`}`).join("")}`;
document.getElementById("site-footer").innerHTML = `<div class="container footer-inner"><div class="footer-brand"><img class="footer-logo" src="${href('assets/MEC_Logo.svg')}" alt="MEC-Arm logo" width="29" height="39"><div><strong>MEC-Arm</strong><p>Mechanical × Electrical Collaboration</p></div></div><p><a href="${href('index.html')}">Project overview ↑</a></p></div>`;

/* Standard project Pages URLs are OWNER.github.io/REPOSITORY/.
   Set repoUrl if you use a custom domain. */
const repoUrl = "https://github.com/J-Di/MEC-arm";
const host = window.location.hostname;
const repoName = window.location.pathname.split("/").filter(Boolean)[0];
const owner = host.endsWith(".github.io") ? host.slice(0, -".github.io".length) : "";
const destination = repoUrl || (owner && repoName ? `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repoName)}` : "");
const repoLink = document.getElementById("repo-nav");
if (destination) { repoLink.href = destination; repoLink.target = "_blank"; repoLink.rel = "noopener noreferrer"; }
else repoLink.hidden = true;
