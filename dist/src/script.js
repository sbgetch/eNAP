// ------------------------------
// UI refs
// ------------------------------
const htmlInput = document.getElementById("htmlInput");
const previewBtn = document.getElementById("previewBtn");
const charCount = document.getElementById("charCount");
const statusBadge = document.getElementById("statusBadge");
const statusText = document.getElementById("statusText");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");
const previewCardTitle = document.getElementById("previewCardTitle");

// ------------------------------
// Shadow DOM Setup
// ------------------------------
const host = document.querySelector(".custom-article-content");

const emptyStateHTML = `
  <style>
    .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 40px;
    text-align: center;
    gap: 12px;
  }
  .empty-icon {
    width: 48px;
    height: 48px;
    background: var(--surface2);
    border: 1px dashed var(--border-light);
    border-radius: 12px;
    display: grid;
    place-items: center;
    color: var(--text-muted);
    margin-bottom: 4px;
  }
  .empty-title {
    font-size: 14px;
    font-weight: 600;
    color: #888;
  }
  .empty-sub {
    font-size: 12px;
    color: #aaa;
    max-width: 240px;
    line-height: 22px;
  }
  </style>
  <div class="empty-state">
    <div class="empty-icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" 
           stroke="currentColor" stroke-width="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    </div>
    <div class="empty-title">No content yet</div>
    <div class="empty-sub">Paste your eGain article HTML in the editor and click Render Preview</div>
  </div>
`;

if (!host.shadowRoot) {
  host.attachShadow({ mode: "open" });
}

let container = host.shadowRoot.querySelector("#shadow-container");
if (!container) {
  container = document.createElement("div");
  container.id = "shadow-container";
  container.innerHTML = emptyStateHTML;
  host.shadowRoot.appendChild(container);
}

// ------------------------------
// Inject External CSS into Shadow DOM
// ------------------------------
async function injectExternalCSS(hrefs) {
  // accept both a single string and an array
  const files = Array.isArray(hrefs) ? hrefs : [hrefs];

  await Promise.all(
    files.map(async (href) => {
      try {
        // skip if already injected
        if (host.shadowRoot.querySelector(`style[data-href="${href}"]`)) return;

        const response = await fetch(href);
        if (!response.ok) throw new Error(`Cannot load CSS: ${href}`);

        const cssText = await response.text();

        const style = document.createElement("style");
        style.setAttribute("data-href", href); // used as unique key
        style.textContent = cssText;
        host.shadowRoot.prepend(style);
      } catch (err) {
        console.error(`injectExternalCSS: failed to load "${href}"`, err);
      }
    })
  );
}

// ------------------------------
// Run functions written in title
// ------------------------------
function runTitleFunctions(root) {
  const el = root.querySelector("#custom-article-div");
  if (!el) return;

  const titles = el.getAttribute("title");
  if (!titles) return;

  const fnNames = titles.includes(";")
    ? titles
        .split(";")
        .map((n) => n.trim())
        .filter((n) => n.length > 0)
    : [titles.trim()];

  fnNames.forEach((fnName) => {
    const fn = window[fnName];

    if (typeof fn !== "function") {
      console.warn(`runTitleFunctions: "${fnName}" not found on window.`);
      return;
    }

    try {
      fn();
    } catch (err) {
      console.error(`runTitleFunctions: "${fnName}" threw an error —`, err);
      showToast(`Error in ${fnName}: ${err.message}`);
    }
  });
}

// ------------------------------
// Prepend base URL to all images
// ------------------------------
function fixImageSrc(root, baseUrl) {
  if (!root) return;

  const imgs = root.querySelectorAll("img");

  imgs.forEach((img) => {
    const srcAttr = img.getAttribute("src");

    if (srcAttr && srcAttr.startsWith("/")) {
      img.setAttribute("src", baseUrl + srcAttr);
    }

    // Append styles instead of overriding
    const existingStyle = img.getAttribute("style") || "";
    const appendStyle = "max-width: 100%; height: auto;";

    img.setAttribute("style", existingStyle ? existingStyle.trim().replace(/;?$/, "; ") + appendStyle : appendStyle);
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
  bindEgCustomEvents(host.shadowRoot);
  runTitleFunctions(host.shadowRoot);
}

// ------------------------------
// Handle eGain custom event attributes
// eg-custom-event-onclick="fnName()"
// ------------------------------
function bindEgCustomEvents(root) {
  const eventMap = {
    "eg-custom-event-onclick": "click",
    "eg-custom-event-onmouseover": "mouseover",
    "eg-custom-event-onmouseout": "mouseout",
  };

  Object.entries(eventMap).forEach(([attr, domEvent]) => {
    root.querySelectorAll(`[${attr}]`).forEach((el) => {
      const expression = el.getAttribute(attr);
      if (!expression) return;

      el.addEventListener(domEvent, function () {
        try {
          // Use Function so `this` refers to the element
          new Function(expression).call(this);
        } catch (err) {
          console.warn(`${attr}: Failed to execute "${expression}"`, err);
        }
      });
    });
  });
}

// ------------------------------
// Button Event (with UI hooks)
// ------------------------------
document.getElementById("previewBtn").addEventListener("click", async () => {
  const html = document.getElementById("htmlInput").value;

  if (!html.trim()) {
    showToast("Paste some HTML first");
    return;
  }

  // Try to extract a title for the card chrome
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  // const titleEl = tempDiv.querySelector("h1, h2, title");
  // previewCardTitle.textContent = titleEl ? titleEl.textContent.trim().slice(0, 60) : "Article Preview";

  // Specify your CSS file path here
  const cssFile = ["./css/tko-main.min.css"];

  await renderArticle(html, cssFile);

  statusBadge.classList.add("active");
  statusText.textContent = "Live";
  showToast("Preview rendered");
});

// ------------------------------
// Editor Area
// ------------------------------
const lineNumbers = document.getElementById("lineNumbers");

function updateLineNumbers() {
  const lines = htmlInput.value.split("\n").length;
  const current = lineNumbers.children.length;

  if (lines > current) {
    for (let i = current + 1; i <= lines; i++) {
      const span = document.createElement("span");
      span.textContent = i;
      lineNumbers.appendChild(span);
    }
  } else if (lines < current) {
    while (lineNumbers.children.length > lines) {
      lineNumbers.removeChild(lineNumbers.lastChild);
    }
  }
}

// Sync scroll
htmlInput.addEventListener("scroll", () => {
  lineNumbers.scrollTop = htmlInput.scrollTop;
});

htmlInput.addEventListener("input", () => {
  updateLineNumbers();
  // your existing char count / preview logic
});

// Tab key support
htmlInput.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    const start = htmlInput.selectionStart;
    const end = htmlInput.selectionEnd;
    htmlInput.value = htmlInput.value.substring(0, start) + "  " + htmlInput.value.substring(end);
    htmlInput.selectionStart = htmlInput.selectionEnd = start + 2;
    updateLineNumbers();
  }
});

// Init with 1 line
updateLineNumbers();

// ------------------------------
// Char count
// ------------------------------
htmlInput.addEventListener("input", () => {
  const len = htmlInput.value.length;
  charCount.textContent = len === 0 ? "0 chars" : `${len.toLocaleString()} chars`;
});

// ------------------------------
// Ctrl+Enter shortcut
// ------------------------------
htmlInput.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    previewBtn.click();
  }
});

// ------------------------------
// Clear
// ------------------------------
clearBtn.addEventListener("click", () => {
  htmlInput.value = "";
  charCount.textContent = "0 chars";

  // Remove injected article CSS so it doesn't bleed into empty state
  const shadowStyle = host.shadowRoot.querySelector("#shadow-style");
  if (shadowStyle) shadowStyle.remove();

  // Swap back to empty state
  container.innerHTML = emptyStateHTML;

  statusBadge.classList.remove("active");
  statusText.textContent = "No preview";
  previewCardTitle.textContent = "Article Preview";
  showToast("Editor cleared");
});

// ------------------------------
// Copy
// ------------------------------
copyBtn.addEventListener("click", () => {
  if (!htmlInput.value) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(htmlInput.value).then(() => showToast("Copied to clipboard"));
  } else {
    htmlInput.select();
    document.execCommand("copy");
    showToast("Copied to clipboard");
  }
});

// ------------------------------
// Toast helper
// ------------------------------
let toastTimer;
function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ------------------------------
// Resize handle
// ------------------------------
const resizeHandle = document.getElementById("resizeHandle");
const leftPanel = document.getElementById("leftPanel");
let isResizing = false;

function isMobile() {
  return window.innerWidth <= 800;
}

// ── Drag start (mouse + touch) ──
resizeHandle.addEventListener("mousedown", (e) => {
  isResizing = true;
  resizeHandle.classList.add("dragging");
  document.body.style.userSelect = "none";
  document.body.style.cursor = isMobile() ? "row-resize" : "col-resize";
});

resizeHandle.addEventListener(
  "touchstart",
  (e) => {
    isResizing = true;
    resizeHandle.classList.add("dragging");
    document.body.style.userSelect = "none";
  },
  { passive: true }
);

// ── Drag move ──
document.addEventListener("mousemove", (e) => {
  if (!isResizing) return;

  if (isMobile()) {
    // vertical: drag the left-panel height
    const newHeight = Math.min(Math.max(e.clientY, 120), window.innerHeight - 120);
    leftPanel.style.height = newHeight + "px";
  } else {
    // horizontal: drag the left-panel width
    const newWidth = Math.min(Math.max(e.clientX, 280), window.innerWidth - 400);
    leftPanel.style.width = newWidth + "px";
  }
});

document.addEventListener(
  "touchmove",
  (e) => {
    if (!isResizing) return;
    const touch = e.touches[0];

    if (isMobile()) {
      const newHeight = Math.min(Math.max(touch.clientY, 120), window.innerHeight - 120);
      leftPanel.style.height = newHeight + "px";
    } else {
      const newWidth = Math.min(Math.max(touch.clientX, 280), window.innerWidth - 400);
      leftPanel.style.width = newWidth + "px";
    }
  },
  { passive: true }
);

// ── Drag end ──
function stopResize() {
  if (!isResizing) return;
  isResizing = false;
  resizeHandle.classList.remove("dragging");
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
}

document.addEventListener("mouseup", stopResize);
document.addEventListener("touchend", stopResize);

// ── On window resize: clear inline styles so CSS media query takes over ──
window.addEventListener("resize", () => {
  leftPanel.style.width = "";
  leftPanel.style.height = "";
});

// ── Theme toggle ──
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});
