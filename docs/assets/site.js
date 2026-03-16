const cases = [
  {
    slug: "2d_taylor_green",
    title: "2-D Taylor-Green Vortex",
    tag: "Analytic decay",
    summary: "A periodic decaying-vortex benchmark that checks whether the simulated velocity field follows the exact viscous Taylor-Green decay in both shape and amplitude.",
    metric: "Velocity-field L2 error and decay-rate agreement",
    physics: "Weakly compressible Navier-Stokes verification in a periodic box",
    equation: "\\(u=U_0\\cos(kx)\\sin(ky)e^{-2\\nu k^2 t},\\; v=-U_0\\sin(kx)\\cos(ky)e^{-2\\nu k^2 t}\\)",
    workflow: "Run the Taylor-Green testcase, export velocity snapshots, and compare them against the analytical reference solution over time.",
    media: "docs/assets/media/2d_taylor_green.mp4",
    note: "Strong opening case because the vortex movie, the decay law, and the regression metric all tell the same verification story."
  },
  {
    slug: "2d_poiseuille",
    title: "2-D Poiseuille Flow",
    tag: "Profile recovery",
    summary: "Pressure-driven channel flow used to compare the recovered velocity profile with an analytic or semi-analytic reference.",
    metric: "Profile agreement",
    physics: "Channel flow, possibly power-law rheology",
    equation: "\\(u_y(x) \\propto (H/2)^{(n+1)/n} - |H/2-x|^{(n+1)/n}\\)",
    workflow: "Export centerline or field evolution frames and annotate the recovered profile.",
    media: "docs/assets/media/2d_poiseuille.mp4",
    note: "Works well with a split view: simulated field on one side and analytic profile on the other."
  },
  {
    slug: "gaussian_hill",
    title: "Gaussian Hill Diffusion",
    tag: "Scalar transport",
    summary: "A Gaussian scalar field is transported and diffused, then compared with the analytical advection-diffusion solution.",
    metric: "Transport error trend",
    physics: "Advection-diffusion verification",
    equation: "\\(\\partial_t \\phi + \\mathbf{u}\\cdot\\nabla\\phi = D\\nabla^2\\phi\\)",
    workflow: "Export scalar snapshots with a fixed color map and compare the spread rate over time.",
    media: "docs/assets/media/gaussian_hill.mp4",
    note: "A clean case for showing how numerical diffusion compares with the analytical spreading rate."
  },
  {
    slug: "curved_boundary",
    title: "Curved Boundary Reconstruction",
    tag: "Geometry accuracy",
    summary: "Boundary-node distances and local normals are checked against known geometry to quantify reconstruction fidelity.",
    metric: "Distance and angle error",
    physics: "Curved boundary treatment",
    equation: "\\(d = \\min_{\\Gamma} \\|\\mathbf{x}-\\mathbf{x}_\\Gamma\\|\\)",
    workflow: "Render geometry overlays or normal vectors at several refinement levels.",
    media: "docs/assets/media/curved_boundary.png",
    note: "Best presented with annotations that show the reconstructed interface, normals, and local error."
  },
  {
    slug: "mass_conservation",
    title: "Mass Conservation in Lid-Driven Cavity",
    tag: "Conservation law",
    summary: "Tracks total mass through time to reveal whether the solver stays stable under moving-wall forcing.",
    metric: "Relative mass drift",
    physics: "Continuity monitoring",
    equation: "\\(M(t)=\\int_\\Omega \\rho(\\mathbf{x},t)\\,d\\Omega\\)",
    workflow: "Plot total mass over time and optionally pair it with the cavity field evolution.",
    media: "docs/assets/media/mass_conservation.mp4",
    note: "This is more about credibility than visual drama, so a combined plot-plus-flow layout works best."
  },
  {
    slug: "particle_sed2",
    title: "Particle Settling",
    tag: "Fluid-particle coupling",
    summary: "Settling-particle motion is compared against validation data through velocity history and transient response.",
    metric: "Velocity-history agreement",
    physics: "Fluid-particle interaction",
    equation: "\\(m_p\\, d\\mathbf{u}_p/dt = \\mathbf{F}_d + \\mathbf{F}_g + \\cdots\\)",
    workflow: "Export both the particle trajectory view and the time-history plot for the same clip.",
    media: "docs/assets/media/particle_sed2.mp4",
    note: "Usually one of the most persuasive cases for non-specialist audiences because the motion is immediate."
  },
  {
    slug: "bulk_viscosity",
    title: "Bulk Viscosity via Acoustic Damping",
    tag: "Wave attenuation",
    summary: "Acoustic energy decay is used to infer damping behavior and estimate effective bulk-viscosity trends.",
    metric: "Energy decay fit",
    physics: "Acoustic damping",
    equation: "\\(E(t) \\sim E_0\\exp(-2\\eta k^2 t)\\)",
    workflow: "Pair the wavefield animation with a semilog energy-decay plot.",
    media: "docs/assets/media/bulk_viscosity.mp4",
    note: "A short wave movie plus a fitted slope panel communicates the result much better than raw fields alone."
  },
  {
    slug: "boundary_rotation",
    title: "Rotated Boundary Conditions",
    tag: "Orientation robustness",
    summary: "The same physical setup is rotated to check whether transformed solutions remain consistent across orientations.",
    metric: "Rotation-consistency check",
    physics: "Boundary-condition invariance",
    equation: "\\(\\mathbf{x}' = \\mathbf{R}(\\theta)\\,\\mathbf{x}\\)",
    workflow: "Show the baseline and rotated cases side by side with identical visual scaling.",
    media: "docs/assets/media/boundary_rotation.mp4",
    note: "A before-and-after comparison makes the invariance claim easy to understand visually."
  }
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
    valueNode.innerHTML = value;
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

function renderCases() {
  const grid = document.getElementById("case-grid");
  if (!grid) {
    return;
  }

  for (const caseData of cases) {
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
    details.appendChild(createDetailRow("Equation", `<span class="inline-equation">${caseData.equation}</span>`));
    details.appendChild(createDetailRow("Workflow", caseData.workflow));
    details.appendChild(createDetailRow("Media slot", caseData.media, true));
    details.appendChild(createDetailRow("Presentation note", caseData.note));

    copy.append(head, summary, details);
    card.append(media, copy);
    grid.appendChild(card);

    attachMedia(media, caseData);
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
