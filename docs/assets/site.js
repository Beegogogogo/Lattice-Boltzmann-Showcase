const cases = [
  {
    slug: "2d_taylor_green",
    title: "2-D Taylor-Green Vortex",
    family: "taylor_green",
    dimension: "2D",
    tag: "Taylor-Green family",
    metric: "Decay-rate and L2 field agreement",
    descriptionHtml: `
      <p>
        The 2-D Taylor-Green vortex is a canonical transient benchmark for viscous flow solvers.
        It starts from a smooth periodic velocity field in which counter-rotating vortices fill the domain,
        and the subsequent evolution is governed by viscous dissipation while the analytical spatial structure is preserved.
      </p>
      <p>
        This makes the case useful for checking whether a solver captures the correct decay of vortex amplitude over time
        without contamination from complex boundaries or geometry effects. In the expressions below,
        <code>u_0</code> is the initial velocity scale, <code>s=2\\pi/L</code> is the domain wavenumber,
        and <code>\\nu</code> denotes the kinematic viscosity that controls the decay rate.
      </p>
    `,
    equationTitle: "Analytical benchmark field",
    equation: `
\\[
u_x(x,y,t)=u_0 \\sin(sx)\\cos(sy)\\exp\\left(-2s^2\\nu t\\right)
\\]
\\[
u_y(x,y,t)=-u_0 \\cos(sx)\\sin(sy)\\exp\\left(-2s^2\\nu t\\right)
\\]
\\[
s=\\frac{2\\pi}{L}, \\qquad \\nu=\\text{kinematic viscosity}
\\]
`,
    media: "docs/assets/media/2d_taylor_green.mp4",
    details: []
  },
  {
    slug: "2d_poiseuille",
    title: "2-D Poiseuille Flow",
    family: "poiseuille",
    dimension: "2D",
    tag: "Poiseuille family",
    metric: "Centerline/profile agreement",
    description: "Pressure-driven planar channel flow used to verify the recovered steady velocity profile and wall behavior against the known benchmark solution.",
    physics: "Planar internal flow with no-slip walls",
    reference: "Steady pressure-driven channel profile with maximum velocity at the centerline.",
    equationTitle: "Reference velocity profile",
    equation: `
\\[
u(y)=U_{\\max}\\left(1-\\left(\\frac{2y}{H}\\right)^2\\right)
\\]
`,
    workflow: "Render channel velocity contours and a profile comparison plot for the same case.",
    media: "docs/assets/media/2d_poiseuille.mp4",
    note: "Works best when the field view is paired with a line profile extracted across the channel."
  },
  {
    slug: "2d_driven_cavity",
    title: "2-D Driven Cavity Flow",
    family: "driven_cavity",
    dimension: "2D",
    tag: "Driven-cavity family",
    metric: "Centerline velocity and vortex structure",
    description: "Wall-driven recirculating flow used to validate no-slip boundaries, vortex structure formation, and centerline velocity profiles in a closed box.",
    physics: "Recirculating lid-driven cavity",
    reference: "No-slip walls with a moving lid and benchmark centerline velocity profiles.",
    equationTitle: "Governing equations and lid boundary",
    equation: `
\\[
\\nabla\\cdot \\mathbf{u}=0,
\\qquad
\\rho(\\mathbf{u}\\cdot\\nabla)\\mathbf{u}=-\\nabla p+\\mu\\nabla^2\\mathbf{u}
\\]
\\[
\\mathbf{u}(x,H)=(U_{lid},0),
\\qquad
\\mathbf{u}|_{\\text{other walls}}=0
\\]
`,
    workflow: "Export streamlines or vorticity fields together with horizontal and vertical centerline comparisons.",
    media: "docs/assets/media/2d_driven_cavity.mp4",
    note: "This case is effective for showing how the solver handles confined shear-driven recirculation."
  },
  {
    slug: "3d_taylor_green",
    title: "3-D Taylor-Green Vortex",
    family: "taylor_green",
    dimension: "3D",
    mediaFit: "contain",
    mediaAspectRatio: "666 / 795",
    tag: "Taylor-Green family",
    metric: "Energy decay and volumetric field consistency",
    description: "Three-dimensional periodic vortex benchmark for assessing how the solver captures volumetric structure, dissipation, and symmetry in a canonical transient flow.",
    physics: "3D periodic vortex decay",
    reference: "Classical Taylor-Green initial condition with monitored kinetic-energy decay.",
    equationTitle: "Initial condition and monitored quantity",
    equation: `
\\[
u(x,y,z,0)=U_0\\sin(x)\\cos(y)\\cos(z),
\\qquad
v(x,y,z,0)=-U_0\\cos(x)\\sin(y)\\cos(z),
\\qquad
w=0
\\]
\\[
E_k(t)=\\frac{1}{2}\\int_{\\Omega}\\lVert\\mathbf{u}\\rVert^2\\,d\\Omega
\\]
`,
    workflow: "Render iso-surfaces or planar slices and compare kinetic-energy decay against the reference trend.",
    media: "docs/assets/media/3d_taylor_green.mp4",
    note: "A good bridge from planar verification to truly volumetric flow dynamics."
  },
  {
    slug: "3d_poiseuille",
    title: "3-D Poiseuille Flow",
    family: "poiseuille",
    dimension: "3D",
    tag: "Poiseuille family",
    metric: "Axial profile recovery",
    description: "Pressure-driven pipe or duct flow used to verify the volumetric axial velocity profile and wall-normal behavior in three dimensions.",
    physics: "3D internal pressure-driven flow",
    reference: "Steady laminar pipe profile with a smooth maximum at the centerline.",
    equationTitle: "Reference pipe profile",
    equation: `
\\[
u(r)=U_{\\max}\\left(1-\\left(\\frac{r}{R}\\right)^2\\right)
\\]
`,
    workflow: "Combine a volumetric slice view with a radial or transverse profile comparison.",
    media: "docs/assets/media/3d_poiseuille.mp4",
    note: "The 3D counterpart shows whether the internal-flow implementation scales cleanly beyond planar geometry."
  },
  {
    slug: "3d_driven_cavity",
    title: "3-D Driven Cavity Flow",
    family: "driven_cavity",
    dimension: "3D",
    tag: "Driven-cavity family",
    metric: "Center-plane profiles and 3D vortex structure",
    description: "Three-dimensional lid-driven cavity benchmark for testing recirculating structures, wall treatment, and center-plane velocity behavior in a confined volume.",
    physics: "3D wall-driven recirculating cavity",
    reference: "Closed cavity with moving lid and benchmark center-plane or centerline velocity comparisons.",
    equationTitle: "Governing equations and moving-lid boundary",
    equation: `
\\[
\\nabla\\cdot \\mathbf{u}=0,
\\qquad
\\rho(\\mathbf{u}\\cdot\\nabla)\\mathbf{u}=-\\nabla p+\\mu\\nabla^2\\mathbf{u}
\\]
\\[
\\mathbf{u}(x,y,H)=(U_{lid},0,0),
\\qquad
\\mathbf{u}|_{\\text{other walls}}=0
\\]
`,
    workflow: "Export center-plane slices or vortex-core visuals together with profile comparisons from the cavity interior.",
    media: "docs/assets/media/3d_driven_cavity.mp4",
    note: "This case is well suited for showing how the solver handles fully three-dimensional wall-bounded vortical flow."
  }
];

const caseFamilies = [
  {
    id: "taylor_green",
    title: "Taylor-Green Vortex",
    description: "2D and 3D periodic vortex-decay benchmarks for transient viscous dissipation."
  },
  {
    id: "poiseuille",
    title: "Poiseuille Flow",
    description: "2D and 3D pressure-driven internal-flow benchmarks for profile recovery."
  },
  {
    id: "driven_cavity",
    title: "Driven Cavity Flow",
    description: "2D and 3D wall-driven recirculation benchmarks for enclosed-domain validation."
  }
];

const MEDIA_VERSION = "20260316-20";

function createPlaceholder(caseData) {
  const shell = document.createElement("div");
  shell.className = "case-media-inner";
  return shell;
}

async function attachMedia(container, caseData) {
  const candidates = [
    { path: `assets/media/${caseData.slug}.mp4?v=${MEDIA_VERSION}`, kind: "video", type: "video/mp4" },
    { path: `assets/media/${caseData.slug}.webm?v=${MEDIA_VERSION}`, kind: "video", type: "video/webm" },
    { path: `assets/media/${caseData.slug}.gif?v=${MEDIA_VERSION}`, kind: "image" },
    { path: `assets/media/${caseData.slug}.png?v=${MEDIA_VERSION}`, kind: "image" }
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
  if (caseData.mediaFit === "contain") {
    media.classList.add("case-media--contain");
  }
  if (caseData.mediaAspectRatio) {
    media.style.aspectRatio = caseData.mediaAspectRatio;
  }
  media.appendChild(createPlaceholder(caseData));

  const copy = document.createElement("div");
  copy.className = "case-copy";

  const head = document.createElement("div");
  head.className = "case-head";
  head.innerHTML = `
    <div>
      <h3>${caseData.title}</h3>
    </div>
  `;

  const descriptionLabel = document.createElement("p");
  descriptionLabel.className = "case-section-label";
  descriptionLabel.textContent = "Case description";

  const description = document.createElement("div");
  description.className = "case-description";
  if (caseData.descriptionHtml) {
    description.innerHTML = caseData.descriptionHtml;
  } else {
    description.textContent = caseData.description;
  }

  const equationCard = document.createElement("div");
  equationCard.className = "case-equation-card";
  equationCard.innerHTML = `
    <p class="case-section-label">${caseData.equationTitle}</p>
    <div class="equation-block case-equation-block">${caseData.equation}</div>
  `;

  copy.append(head, descriptionLabel, description, equationCard);
  card.append(media, copy);
  attachMedia(media, caseData);

  return card;
}

function renderCases() {
  const stack = document.getElementById("case-family-stack");
  if (!stack) {
    return;
  }

  const dimensionOrder = { "2D": 0, "3D": 1 };

  for (const family of caseFamilies) {
    const familyCases = cases
      .filter((caseData) => caseData.family === family.id)
      .sort((left, right) => dimensionOrder[left.dimension] - dimensionOrder[right.dimension]);

    const familyGroup = document.createElement("section");
    familyGroup.className = "case-family-group reveal";

    const familyHead = document.createElement("div");
    familyHead.className = "case-family-head";
    familyHead.innerHTML = `
      <p class="case-family-kicker">Benchmark family</p>
      <h3>${family.title}</h3>
      <p>${family.description}</p>
    `;

    const familyGrid = document.createElement("div");
    familyGrid.className = "family-case-grid";

    for (const caseData of familyCases) {
      familyGrid.appendChild(createCaseCard(caseData));
    }

    familyGroup.append(familyHead, familyGrid);
    stack.appendChild(familyGroup);
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

async function renderPage() {
  renderCases();

  if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
    await window.MathJax.typesetPromise();
  }

  setupReveal();
}

renderPage();
