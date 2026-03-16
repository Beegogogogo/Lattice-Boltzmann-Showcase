const cases = [
  {
    slug: "2d_taylor_green",
    title: "2-D Taylor-Green Vortex",
    dimension: "2D",
    tag: "Taylor-Green family",
    summary: "Periodic decaying-vortex benchmark for checking transient viscous dissipation, symmetry preservation, and field-level agreement with the analytical decay trend.",
    metric: "Decay-rate and L2 field agreement",
    physics: "Periodic incompressible-like vortex decay",
    reference: "Analytical vortex decay with known temporal damping in a periodic box.",
    workflow: "Export velocity or vorticity snapshots and compare the decay against the analytical reference over time.",
    media: "docs/assets/media/2d_taylor_green.mp4",
    note: "A strong first validation panel because the benchmark is compact, classical, and visually clean."
  },
  {
    slug: "2d_poiseuille",
    title: "2-D Poiseuille Flow",
    dimension: "2D",
    tag: "Poiseuille family",
    summary: "Pressure-driven planar channel flow used to verify the recovered steady velocity profile and wall behavior against the known benchmark solution.",
    metric: "Centerline/profile agreement",
    physics: "Planar internal flow with no-slip walls",
    reference: "Steady pressure-driven channel profile with maximum velocity at the centerline.",
    workflow: "Render channel velocity contours and a profile comparison plot for the same case.",
    media: "docs/assets/media/2d_poiseuille.mp4",
    note: "Works best when the field view is paired with a line profile extracted across the channel."
  },
  {
    slug: "2d_driven_cavity",
    title: "2-D Driven Cavity Flow",
    dimension: "2D",
    tag: "Driven-cavity family",
    summary: "Wall-driven recirculating flow used to validate no-slip boundaries, vortex structure formation, and centerline velocity profiles in a closed box.",
    metric: "Centerline velocity and vortex structure",
    physics: "Recirculating lid-driven cavity",
    reference: "No-slip walls with a moving lid and benchmark centerline velocity profiles.",
    workflow: "Export streamlines or vorticity fields together with horizontal and vertical centerline comparisons.",
    media: "docs/assets/media/2d_driven_cavity.mp4",
    note: "This case is effective for showing how the solver handles confined shear-driven recirculation."
  },
  {
    slug: "3d_taylor_green",
    title: "3-D Taylor-Green Vortex",
    dimension: "3D",
    tag: "Taylor-Green family",
    summary: "Three-dimensional periodic vortex decay benchmark for assessing how the solver captures volumetric dissipation and evolving vortical structures.",
    metric: "Energy decay and volumetric field consistency",
    physics: "3D periodic vortex decay",
    reference: "Periodic vortex field with a known dissipation trend used to monitor energy decay and symmetry.",
    workflow: "Render iso-surfaces or planar slices and compare kinetic-energy decay against the reference trend.",
    media: "docs/assets/media/3d_taylor_green.mp4",
    note: "A good bridge from planar verification to truly volumetric flow dynamics."
  },
  {
    slug: "3d_poiseuille",
    title: "3-D Poiseuille Flow",
    dimension: "3D",
    tag: "Poiseuille family",
    summary: "Pressure-driven pipe or duct flow used to verify the volumetric axial velocity profile and wall-normal behavior in three dimensions.",
    metric: "Axial profile recovery",
    physics: "3D internal pressure-driven flow",
    reference: "Steady laminar pipe or duct profile with a smooth maximum at the centerline.",
    workflow: "Combine a volumetric slice view with a radial or transverse profile comparison.",
    media: "docs/assets/media/3d_poiseuille.mp4",
    note: "The 3D counterpart shows whether the internal-flow implementation scales cleanly beyond planar geometry."
  },
  {
    slug: "3d_driven_cavity",
    title: "3-D Driven Cavity Flow",
    dimension: "3D",
    tag: "Driven-cavity family",
    summary: "Three-dimensional lid-driven cavity benchmark for testing recirculating structures, wall treatment, and center-plane velocity behavior in a confined volume.",
    metric: "Center-plane profiles and 3D vortex structure",
    physics: "3D wall-driven recirculating cavity",
    reference: "Closed cavity with moving lid and benchmark center-plane or centerline velocity comparisons.",
    workflow: "Export center-plane slices or vortex-core visuals together with profile comparisons from the cavity interior.",
    media: "docs/assets/media/3d_driven_cavity.mp4",
    note: "This case is well suited for showing how the solver handles fully three-dimensional wall-bounded vortical flow."
  }
];

const caseGroups = [
  { dimension: "2D", containerId: "case-grid-2d" },
  { dimension: "3D", containerId: "case-grid-3d" }
];

function createDetailRow(label, value, isCode = false) {
  const row = document.createElement("div");
  row.className = "detail-row";

  const labelNode = document.createElement("div");
  labelNode.className = "detail-label";
  labelNode.textContent = label;

  const valueNode = document.createElement("div");
  valueNode.className = "detail-value";
  if (isCode) {
    const code = document.createElement("code");
    code.textContent = value;
    valueNode.appendChild(code);
  } else {
    valueNode.textContent = value;
  }

  row.append(labelNode, valueNode);
  return row;
}

function createPlaceholder(caseData) {
  const shell = document.createElement("div");
  shell.className = "case-media-inner";

  const overlay = document.createElement("div");
  overlay.className = "case-media-overlay";
  overlay.innerHTML = `
    <span class="media-badge">media placeholder</span>
    <p class="media-title">${caseData.title}</p>
    <p class="media-note">Add <code>${caseData.media}</code>, or use the same slug with <code>.webm</code>, <code>.gif</code>, or <code>.png</code>.</p>
  `;

  shell.appendChild(overlay);
  return shell;
}

async function attachMedia(container, caseData) {
  const candidates = [
    { path: `assets/media/${caseData.slug}.mp4`, kind: "video", type: "video/mp4" },
    { path: `assets/media/${caseData.slug}.webm`, kind: "video", type: "video/webm" },
    { path: `assets/media/${caseData.slug}.gif`, kind: "image" },
    { path: `assets/media/${caseData.slug}.png`, kind: "image" }
  ];

  for (const asset of candidates) {
    try {
      const response = await fetch(asset.path, { method: "HEAD", cache: "no-store" });
      if (!response.ok) {
        continue;
      }

      const shell = document.createElement("div");
      shell.className = "case-media-inner";

      if (asset.kind === "video") {
        const video = document.createElement("video");
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.controls = true;
        const source = document.createElement("source");
        source.src = asset.path;
        source.type = asset.type;
        video.appendChild(source);
        shell.appendChild(video);
      } else {
        const image = document.createElement("img");
        image.src = asset.path;
        image.alt = `${caseData.title} media`;
        shell.appendChild(image);
      }

      const overlay = document.createElement("div");
      overlay.className = "case-media-overlay";
      overlay.innerHTML = `
        <span class="media-badge">media loaded</span>
        <p class="media-title">${caseData.title}</p>
        <p class="media-note">${caseData.note}</p>
      `;
      shell.appendChild(overlay);

      container.replaceChildren(shell);
      return;
    } catch (_err) {
      // Continue to the next candidate.
    }
  }

  container.replaceChildren(createPlaceholder(caseData));
}

function createCaseCard(caseData) {
  const card = document.createElement("article");
  card.className = "case-card reveal";

  const media = document.createElement("div");
  media.className = "case-media";
  media.appendChild(createPlaceholder(caseData));

  const copy = document.createElement("div");
  copy.className = "case-copy";

  const head = document.createElement("div");
  head.className = "case-head";
  head.innerHTML = `
    <div>
      <p class="case-tag">${caseData.tag}</p>
      <h3>${caseData.title}</h3>
    </div>
    <span class="case-metric">${caseData.metric}</span>
  `;

  const summary = document.createElement("p");
  summary.textContent = caseData.summary;

  const details = document.createElement("div");
  details.className = "case-details";
  details.appendChild(createDetailRow("Physics", caseData.physics));
  details.appendChild(createDetailRow("Reference", caseData.reference));
  details.appendChild(createDetailRow("Workflow", caseData.workflow));
  details.appendChild(createDetailRow("Media slot", caseData.media, true));
  details.appendChild(createDetailRow("Presentation note", caseData.note));

  copy.append(head, summary, details);
  card.append(media, copy);
  attachMedia(media, caseData);

  return card;
}

function renderCases() {
  for (const group of caseGroups) {
    const grid = document.getElementById(group.containerId);
    if (!grid) {
      continue;
    }

    const groupedCases = cases.filter((caseData) => caseData.dimension === group.dimension);
    for (const caseData of groupedCases) {
      grid.appendChild(createCaseCard(caseData));
    }
  }
}

function setupReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  }, {
    threshold: 0.14
  });

  nodes.forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index * 35, 260)}ms`;
    observer.observe(node);
  });
}

renderCases();
setupReveal();
