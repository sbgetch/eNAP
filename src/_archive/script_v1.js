// ------------------------------
// Shadow DOM Setup
// ------------------------------
const host = document.querySelector(".custom-article-content");

if (!host.shadowRoot) {
  host.attachShadow({ mode: "open" });
}

let container = host.shadowRoot.querySelector("#shadow-container");
if (!container) {
  container = document.createElement("div");
  container.id = "shadow-container";
  host.shadowRoot.appendChild(container);
}

// ------------------------------
// Inject External CSS into Shadow DOM
// ------------------------------
async function injectExternalCSS(href) {
  try {
    // check if already injected
    if (host.shadowRoot.querySelector(`link[href="${href}"]`)) return;

    const response = await fetch(href);
    if (!response.ok) throw new Error(`Cannot load CSS: ${href}`);

    const cssText = await response.text();

    let style = host.shadowRoot.querySelector("#shadow-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "shadow-style";
      host.shadowRoot.prepend(style);
    }

    style.textContent = cssText;
  } catch (err) {
    console.error(err);
  }
}

// ------------------------------
// Run functions written in title
// ------------------------------
function runTitleFunctions(root) {
  const el = root.querySelector("#custom-article-div");
  if (!el) return;

  const titles = el.getAttribute("title");
  if (!titles) return;

  titles.split(";").forEach((name) => {
    const fnName = name.trim();
    const fn = window[fnName];

    if (typeof fn === "function") {
      fn();
    } else {
      console.warn(`Function "${fnName}" not found on window.`);
    }
  });
}

// ------------------------------
// Prepend base URL to all images
// ------------------------------
function fixImageSrc(root, baseUrl) {
  const imgs = root.querySelectorAll("img");
  imgs.forEach((img) => {
    const srcAttr = img.getAttribute("src"); // raw value
    if (srcAttr && srcAttr.startsWith("/")) {
      img.setAttribute("src", baseUrl + srcAttr);
    }
  });
}

// ------------------------------
// Render Article in Shadow DOM
// ------------------------------
async function renderArticle(html, cssFile) {
  if (cssFile) await injectExternalCSS(cssFile);

  container.innerHTML = html;

  // Fix image src
  fixImageSrc(host.shadowRoot, "https://vertiv.egain.cloud");

  runTitleFunctions(host.shadowRoot);
}

// ------------------------------
// Button Event
// ------------------------------
document.getElementById("previewBtn").addEventListener("click", async () => {
  const html = document.getElementById("htmlInput").value;

  // Specify your CSS file path here
  const cssFile = "./css/tko.doc-gen_workspace.css";

  await renderArticle(html, cssFile);
});
