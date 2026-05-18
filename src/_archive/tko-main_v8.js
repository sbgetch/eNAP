// v8 a

//Verified
const TKO_FUNCTIONS = [
  { fn: fStyleModalNotification, target: "shadow" },
  { fn: fStyleDocumentTips, target: "shadow" },
  { fn: fStyleFilterableTable, target: "shadow" },
  { fn: fStyleTableListSelector, target: "shadow" },
  { fn: fStyleTableCodeSelector, target: "shadow" },
  { fn: fStyleSortableTable, target: "shadow" },
  { fn: fStyleSectionHeader, target: "shadow" },
  { fn: fStyleContentToggle, target: "both" },
  { fn: fStyleContentModal, target: "shadow" },
  { fn: fStyleContentModeless, target: "shadow" },
  { fn: fStyleContentOverlay, target: "shadow" },
  { fn: fStyleAnnotations, target: "shadow" },
  { fn: fDivDynamic, target: "shadow" },
  { fn: fStyleDivDropdownSelector, target: "shadow" },
  { fn: fStyleTableDropdownSelector, target: "shadow" },
  { fn: fStyleParamSetDefinition, target: "shadow" },
];

function fLoadTKOTheme() {
  baseUrl = "";
  const host = document.querySelector(".custom-article-content");

  TKO_FUNCTIONS.forEach(({ fn, target }) => {
    if (target === "light" || target === "both") fn(document);
    if ((target === "shadow" || target === "both") && host?.shadowRoot)
      fn(host.shadowRoot);
  });


  //Pending

  // fCheckIfProduction();
  // fStyleProcedureChecklist();
  // fStyleStoredForm();
  // fStyleMailerForm();
  // fBuildCustomList();
  // fBuildCustomIndex();
  // fBuildFlexiTable();
  // fBuildCustomTable();

  // fBuildTopicIndex();
  // fBuildTopicShortcut();
}

var bProduction = false;

// Added helper function to replace sModalKey
function hashModalKey(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  return hash;
}

function fStyleModalNotification(root) {
  if (!root) return;

  const todayKey = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const modalContentEl = root.querySelector("div[id^='modal-notification']");
  if (!modalContentEl) return;

  const content = modalContentEl.textContent.trim();
  const sModalKey = `modal${hashModalKey(content)}`;

  // Load modal states from localStorage
  const modalStates = JSON.parse(localStorage.getItem("modalStates") || "{}");
  const lastShown = modalStates[sModalKey];

  if (lastShown !== todayKey) {
    const oModalCanvass = fCreateModalBackground(2);
    fStyleModalLoader(modalContentEl, oModalCanvass);

    modalStates[sModalKey] = todayKey;
    localStorage.setItem("modalStates", JSON.stringify(modalStates));
  }
}

// Helper
function fCreateModalBackground(iActiveButton) {
  // Append modal globally to body
  const oModalBgr = document.createElement("div");
  oModalBgr.id = "modal-bground";
  document.body.appendChild(oModalBgr);

  const oModalWrp = document.createElement("div");
  oModalWrp.id = "modal-wrapper";
  document.body.appendChild(oModalWrp);

  const oModalMsg = document.createElement("span");
  oModalMsg.id = "modal-message";
  oModalWrp.appendChild(oModalMsg);

  const oModalGht = document.createElement("span");
  oModalGht.id = "modal-csghost";
  oModalWrp.appendChild(oModalGht);

  const oModalBtn = document.createElement("div");
  oModalBtn.classList.add("modal-button");
  oModalMsg.appendChild(oModalBtn);

  // Pop-out button
  if (iActiveButton > 1) {
    const btnPopout = document.createElement("span");
    btnPopout.id = "modal-tpopout";
    btnPopout.textContent = "Pop-out";
    btnPopout.addEventListener("click", () => {
      const img = oModalMsg.querySelector("img");
      if (img) window.open(img.src);
    });
    oModalBtn.appendChild(btnPopout);
  }

  // Close button
  if (iActiveButton > 0) {
    const btnClose = document.createElement("span");
    btnClose.id = "modal-tclose";
    btnClose.textContent = "Close";
    btnClose.addEventListener("click", () => {
      oModalWrp.remove();
      oModalBgr.remove();
    });
    oModalBtn.appendChild(btnClose);
  }

  // Top-right close image for iActiveButton == 0
  if (!iActiveButton || iActiveButton === 0) {
    const imgClose = document.createElement("img");
    imgClose.id = "modal-close";
    imgClose.src = "../../graphic/close.png";
    imgClose.addEventListener("click", () => {
      oModalWrp.remove();
      oModalBgr.remove();
    });
    oModalBtn.appendChild(imgClose);
  }

  return oModalMsg;
}

// Helper
function fStyleModalLoader(oModalContent, oModalCanvass) {
  // Clear old content but keep the buttons intact
  Array.from(oModalCanvass.children)
    .filter((c) => !c.classList.contains("modal-button"))
    .forEach((c) => oModalCanvass.removeChild(c));

  if (
    oModalContent.children.length > 0 &&
    oModalContent.children[0].tagName.toLowerCase() === "img"
  ) {
    // If content starts with image
    const img = oModalContent.children[0].cloneNode(true);
    img.removeAttribute("style");
    img.classList.add("tko-modal-image"); // responsive CSS handles sizing
    oModalCanvass.appendChild(img);
  } else {
    // If content is text or other HTML
    const clone = oModalContent.cloneNode(true);
    clone.removeAttribute("id");
    if (clone.classList.contains("ref-target")) clone.classList.add("visible");
    clone.classList.add("modal-content-article");
    oModalCanvass.appendChild(clone);

    const btnPopout = oModalCanvass.querySelector("#modal-tpopout");
    if (btnPopout) btnPopout.remove();
  }

  // Show modal with CSS-driven animation
  document.getElementById("modal-bground").classList.add("tko-show");
  document.getElementById("modal-wrapper").classList.add("tko-show");
  oModalCanvass.classList.add("tko-show");
}

function fStyleDocumentTips(root) {
  if (!root) return;

  // Select elements with class warning, caution, or note that are not styled yet
  const tips = root.querySelectorAll(".warning, .caution, .note");
  tips.forEach((element) => {
    if (element.dataset.isStyled === "true") return; // idempotent

    const html = element.innerHTML;
    const colonIndex = html.indexOf(":");
    const sTipLabel = colonIndex > -1 ? html.substring(0, colonIndex + 1) : "";
    const sTipText = colonIndex > -1 ? html.substring(colonIndex + 1) : html;

    element.innerHTML = ""; // clear existing content

    // Create label div
    const oTipLabel = document.createElement("div");
    oTipLabel.className = `${element.className}-label`;
    oTipLabel.innerHTML = sTipLabel;
    element.appendChild(oTipLabel);

    // Create text holder div
    const oTipHolder = document.createElement("div");
    oTipHolder.className = `${element.className}-text`;
    element.appendChild(oTipHolder);

    // Add text span
    const oTipText = document.createElement("span");
    oTipText.innerHTML = sTipText;
    oTipHolder.appendChild(oTipText);

    // Mark element as styled
    element.dataset.isStyled = "true";
  });
}

function fStyleFilterableTable(root) {
  if (!root) return;

  const ths = Array.from(
    root.querySelectorAll('th[class^="filter-header"]')
  ).filter(
    (th) => !th.querySelector('img[src*="ico_filter"]') && !th.dataset.isStyled
  );

  ths.forEach((th) => {
    // Create container span with class for CSS
    const span = document.createElement("span");
    span.className = "tko-filter-container";
    th.appendChild(span);

    // Create input
    const input = document.createElement("input");
    input.type = "text";
    input.title = "Filter";
    input.size = 30;
    span.appendChild(input);

    // Create filter icon
    const img = document.createElement("img");
    img.src =
      "https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/fafe0023-e05b-4678-aa50-a8cc9093989e/theme_graphic/f792d179-1763-4b57-84cc-0a3028768ea6/ico_filter.gif";
    img.title = "Filter";
    span.appendChild(img);

    // Event handler
    const filterRows = () => {
      const search = input.value.toLowerCase();
      const rows = th.closest("table").querySelectorAll("tr");
      rows.forEach((row) => {
        if (row.querySelector("td")) {
          row.style.display = row.textContent.toLowerCase().includes(search)
            ? "table-row"
            : "none";
        }
      });
    };

    input.addEventListener("keyup", filterRows);
    input.addEventListener("focusout", filterRows);

    // Mark as styled
    th.dataset.isStyled = "true";
  });
}

function fStyleSectionHeader(root) {
  if (!root) return;

  const headers = root.querySelectorAll("h2");
  headers.forEach((h2) => {
    const prev = h2.previousElementSibling;
    if (!prev || !prev.classList.contains("section-padding")) {
      const div = document.createElement("div");
      div.className = "section-padding";
      h2.parentNode.insertBefore(div, h2);
    }
  });
}

function fStyleSortableTable(root) {
  if (!root) return;

  const tables = Array.from(root.querySelectorAll("table")).filter(
    (table) =>
      table.querySelector("th[class^='sort-header']") &&
      !table.hasAttribute("data-flagged")
  );

  tables.forEach((table) => {
    table.setAttribute("data-flagged", "true"); // mark table as processed

    const headers = Array.from(
      table.querySelectorAll("th[class^='sort-header']")
    );

    headers.forEach((th, idx) => {
      th.addEventListener("click", () => {
        // toggle classes
        headers.forEach((h) => {
          if (h !== th) h.className = "sort-header";
        });
        th.className =
          th.className === "sort-header-desc"
            ? "sort-header-asc"
            : "sort-header-desc";

        const type = th.getAttribute("data-type") || "text";

        // collect sortable column data
        const rows = Array.from(table.querySelectorAll("tr")).filter((tr) =>
          tr.querySelector("td")
        );
        const sortable = rows.map((row, i) => {
          const cell = row.children[idx];
          let value;
          if (type === "date") {
            const date = new Date(cell.textContent);
            value = Date.UTC(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            );
            value = value.toString().padStart(15, "0");
          } else {
            value = cell.textContent;
          }
          return { value, index: i };
        });

        // sort
        sortable.sort((a, b) =>
          a.value.localeCompare(b.value, undefined, { numeric: true })
        );
        if (th.className === "sort-header-desc") sortable.reverse();

        // reorder rows
        rows.forEach((row) => row.remove());
        sortable.forEach((obj) => table.appendChild(rows[obj.index]));

        // stripe rows
        Array.from(table.querySelectorAll("tr")).forEach((tr, i) => {
          tr.classList.toggle("tr-even", i % 2 === 0);
          tr.classList.toggle("tr-odd", i % 2 === 1);
        });
      });
    });

    // trigger first click to initialize sorting
    if (headers[0]) headers[0].click();
  });
}

function fStyleTableCodeSelector(root) {
  if (!root) return;

  const tableDefinitions = root.querySelectorAll(
    "#tab-definition, .tab-definition"
  );

  tableDefinitions.forEach((tableDefinition) => {
    const tables = tableDefinition.querySelectorAll("table");

    tables.forEach((table) => {
      // Skip if already processed
      if (table.dataset.isStyled === "true") return;

      table.dataset.isStyled = "true"; // mark as processed

      const parentDiv = table.parentElement;
      if (parentDiv) parentDiv.style.display = "none"; // hide table parent

      const firstCell = table.querySelector("td");
      if (!firstCell) return;

      // Create button
      const button = document.createElement("input");
      button.type = "button";
      button.value = firstCell.textContent.trim();
      button.classList.add("selector-part-button");

      button.addEventListener("mouseup", () => {
        if (!parentDiv) return;

        const isHidden =
          !parentDiv.offsetParent || parentDiv.style.display === "none";
        // Hide all tables first
        tables.forEach((tbl) => {
          if (tbl.parentElement) tbl.parentElement.style.display = "none";
        });

        parentDiv.style.display = isHidden ? "block" : "none";
      });

      // Insert button before the first child of the container
      if (tableDefinition.firstElementChild) {
        tableDefinition.insertBefore(button, tableDefinition.firstElementChild);
      } else {
        tableDefinition.appendChild(button);
      }
    });
  });
}

function fStyleTableListSelector(root) {
  if (!root) return;

  const tableSets = root.querySelectorAll("#tab-dynamic, .tab-dynamic");

  tableSets.forEach((set) => {
    if (set.dataset.isStyled === "true") return;
    set.dataset.isStyled = "true";

    // Get only the direct <div> children of .tab-dynamic that have a <table.data>
    const tableParents = Array.from(set.children).filter(
      (child) => child.querySelector(":scope > table.data")
    );

    // Hide them by default
    tableParents.forEach((p) => (p.style.display = "none"));

    // Create selector UI container
    const selectorHolder = document.createElement("div");
    selectorHolder.classList.add("selector-table-holder");

    const label = document.createElement("div");
    label.classList.add("selector-table-label");
    label.textContent = "Select Table to Display:";
    selectorHolder.appendChild(label);

    set.prepend(selectorHolder);

    // Extract the <table> elements from the direct children only
    const tables = tableParents.map((p) => p.querySelector(":scope > table"));
    tables.forEach((table, index) => {
      if (!table) return;

      const tableParent = table.parentElement;
      const titleCell = table.querySelector("th.head");
      if (!tableParent || !titleCell) return;

      const option = document.createElement("div");
      option.classList.add("selector-table-option");
      option.textContent = titleCell.textContent.trim();

      option.addEventListener("click", () => {
        // Deselect others
        selectorHolder
          .querySelectorAll(".selector-table-option")
          .forEach((opt) => opt.classList.remove("selector-table-option-selected"));

        option.classList.add("selector-table-option-selected");

        // Show only the selected one
        tableParents.forEach((p, idx) => {
          p.style.display = idx === index ? "block" : "none";
        });
      });

      selectorHolder.appendChild(option);

      // Auto-select first table
      if (index === 0) option.click();
    });
  });
}


function fStyleContentModal(root) {
  if (!root) return;

  root.querySelectorAll(".ref-modal").forEach((modal) => {
    if (modal.dataset.isStyled) return; // skip if already processed

    modal.dataset.isStyled = "true"; // mark as processed
    modal.addEventListener("click", () => {
      let found = false;
      const oModalCanvass = fCreateModalBackground(2);

      root.querySelectorAll(".ref-modal, .ref-target").forEach((ref) => {
        if (found && ref.classList.contains("ref-target")) {
          fStyleModalLoader(ref, oModalCanvass);
          found = false;
        }
        if (ref === modal) found = true;
      });
    });
  });
}

function fStyleContentModeless(root) {
  if (!root) return;

  root.querySelectorAll(".ref-modeless").forEach((modeless) => {
    if (modeless.dataset.isStyled) return; // skip if already processed
    modeless.dataset.isStyled = "true"; // mark as processed

    modeless.addEventListener("click", () => {
      let found = false;
      const oModelessCanvass = fCreateModalBackground(2);
      root.querySelectorAll(".ref-modeless, .ref-target").forEach((ref) => {
        if (found && ref.classList.contains("ref-target")) {
          fStyleModalLoader(ref, oModelessCanvass);
          found = false;
        }
        if (ref === modeless) found = true;
      });
    });
  });
}

function fStyleContentOverlay(root) {
  if (!root) return;

  root.querySelectorAll(".ref-overlay").forEach((overlay) => {
    if (overlay.dataset.isStyled) return; // skip if already processed
    overlay.dataset.isStyled = "true"; // mark as processed

    overlay.addEventListener("click", () => {
      let found = false;
      const oOverlayCanvass = fCreateModalBackground(1);
      root.querySelectorAll(".ref-overlay, .ref-target").forEach((ref) => {
        if (found && ref.classList.contains("ref-target")) {
          fStyleOverlayLoader(ref, oOverlayCanvass);
          found = false;
        }
        if (ref === overlay) found = true;
      });
    });
  });
}

function fStyleContentToggle(root) {
  if (!root) return;

  root.querySelectorAll(".ref-dynamic").forEach((dynamic) => {
    // Skip if already wired
    if (dynamic.dataset.toggleAttached === "true") return;
    dynamic.dataset.toggleAttached = "true";

    dynamic.addEventListener("click", () => {
      let found = false;
      root.querySelectorAll(".ref-dynamic, .ref-target").forEach((ref) => {
        if (found && ref.classList.contains("ref-target")) {
          ref.classList.toggle("visible");
          found = false;
        }
        if (ref === dynamic) {
          found = true;
        }
      });
    });
  });
}

// from tko.000.js
function fStyleAnnotations(root) {
  if (!root) return;

  // Select any element with a class containing "annotation"
  root.querySelectorAll("[class*='annotation']").forEach((annotation) => {
    annotation.querySelectorAll("*[id^='annotation-']").forEach((node) => {
      // Skip if we already inserted a span.def
      if (node.querySelector(":scope > .def")) return;

      // Extract the last character of the id
      const noteChar = node.id.slice(-1);

      // Create the span.def element
      const defSpan = document.createElement("span");
      defSpan.className = "def";
      defSpan.textContent = noteChar;

      // Insert it before the existing content (without overwriting innerHTML)
      node.insertBefore(defSpan, node.firstChild);
    });
  });
}

function fDivDynamic(root) {
  if (!root) return;

  root.querySelectorAll(".div-dynamic").forEach((container, i) => {
    // Prevent duplicate quick-box creation
    if (container.previousElementSibling?.classList.contains("quick-box")) {
      return; // already processed
    }

    const divs = Array.from(container.children);

    // Create quick-box before container
    const quickBox = document.createElement("div");
    quickBox.classList.add("quick-box");
    container.parentNode.insertBefore(quickBox, container);

    // Add label
    const label = document.createElement("div");
    label.classList.add("label");
    label.textContent = "Select Content to Display:";
    quickBox.appendChild(label);

    // Add index container
    const indexBox = document.createElement("div");
    indexBox.classList.add("icon-index");
    quickBox.appendChild(indexBox);

    // Create index links
    divs.forEach((div, j) => {
      const title = div.children[0]?.textContent || `Item ${j + 1}`;
      div.dataset.linkId = `link_${i}_${j}`;

      const link = document.createElement("div");
      link.textContent = title;
      link.classList.add("index-link");
      link.dataset.target = div.dataset.linkId;

      link.addEventListener("click", () => {
        indexBox
          .querySelectorAll(".selected")
          .forEach((el) => el.classList.remove("selected"));
        divs.forEach((d) => (d.style.display = "none"));
        div.style.display = "block";
        link.classList.add("selected");
      });

      indexBox.appendChild(link);
    });

    // Initial state
    const firstLink = indexBox.querySelector("div");
    if (firstLink) firstLink.classList.add("selected");
    divs.forEach((d, idx) => {
      d.style.display = idx === 0 ? "block" : "none";
    });
  });
}

function fStyleDivDropdownSelector(root) {
  if (!root) return;

  const selectors = root.querySelectorAll(".div-selector");

  selectors.forEach((selector) => {
    // Prevent duplicate dropdown creation (idempotent)
    if (selector.querySelector(".selector-table-label")) {
      return;
    }

    const children = Array.from(selector.children);
    if (children.length === 0) return;

    // Create holder div before first child
    const holder = document.createElement("div");
    selector.insertBefore(holder, children[0]);

    // Label
    const label = document.createElement("span");
    label.textContent = "Select content to Display:";
    label.classList.add("selector-table-label");
    holder.appendChild(label);

    // Dropdown
    const dropdown = document.createElement("select");
    holder.appendChild(dropdown);

    // Find sections and their parent divs
    const sectionDivs = Array.from(
      selector.querySelectorAll("div.section")
    ).map((sec) => sec.parentElement);

    // Initially hide all
    sectionDivs.forEach((div) => {
      div.style.display = "none";
    });

    // Populate dropdown options
    sectionDivs.forEach((div, idx) => {
      const title =
        div.querySelector("h2")?.textContent.trim() || `Section ${idx + 1}`;
      const option = document.createElement("option");
      option.value = idx;
      option.textContent = title;
      dropdown.appendChild(option);
    });

    // Show first by default
    if (sectionDivs.length > 0) {
      sectionDivs[0].style.display = "block";
    }

    // Change handler
    dropdown.addEventListener("change", (e) => {
      const index = e.target.selectedIndex;
      sectionDivs.forEach((div, i) => {
        div.style.display = i === index ? "block" : "none";
      });
    });
  });

  // Apply the global cleanup styles
  root.querySelectorAll(".div-selector > div").forEach((div) => {
    div.style.marginTop = "0px";
    div.style.marginBottom = "0px";
  });

  root.querySelectorAll(".div-selector h2").forEach((h2) => {
    h2.style.borderTop = "none";
  });

  root.querySelectorAll("h2").forEach((h2) => {
    if (h2.parentElement) {
      h2.parentElement.style.borderTop = "none";
    }
  });

  root.querySelectorAll(".section-padding").forEach((el) => {
    el.remove();
  });
}

function fStyleTableDropdownSelector(root) {
  if (!root) return;

  const tableSets = root.querySelectorAll("#tab-selector, .tab-selector");

  tableSets.forEach((tableSet) => {
    // Prevent duplicate dropdown creation (idempotent)
    if (tableSet.querySelector(".selector-table-label")) {
      return;
    }

    const children = Array.from(tableSet.children);
    if (children.length === 0) return;

    // Create holder before first child
    const holder = document.createElement("div");
    tableSet.insertBefore(holder, children[0]);

    // Label
    const label = document.createElement("span");
    label.textContent = "Select Table to Display: ";
    label.classList.add("selector-table-label");
    holder.appendChild(label);

    // Dropdown
    const dropdown = document.createElement("select");
    holder.appendChild(dropdown);

    // Find tables with class=data and their parent divs
    const tableDivs = Array.from(tableSet.querySelectorAll("table.data")).map(
      (tbl) => tbl.parentElement
    );

    // Hide all by default
    tableDivs.forEach((div) => {
      div.style.display = "none";
    });

    // Populate dropdown options
    tableDivs.forEach((div, idx) => {
      const title =
        div.querySelector("th.head")?.textContent.trim() || `Table ${idx + 1}`;
      const option = document.createElement("option");
      option.value = idx;
      option.textContent = title;
      dropdown.appendChild(option);
    });

    // Show first table by default
    if (tableDivs.length > 0) {
      tableDivs[0].style.display = "block";
    }

    // Change handler
    dropdown.addEventListener("change", (e) => {
      const index = e.target.selectedIndex;
      tableDivs.forEach((div, i) => {
        div.style.display = i === index ? "block" : "none";
      });
    });
  });
}

function fStyleParamSetDefinition(root) {
  if (!root) return;

  const popups = root.querySelectorAll("#def-popup, .def-popup");

  popups.forEach((popup) => {
    if (popup.dataset.isStyled === "true") return;
    popup.dataset.isStyled = "true";

    const dl = popup.querySelector("dl");
    if (!dl) return;

    const termContainer = document.createElement("div");
    termContainer.className = "tko-popup-container";
    popup.appendChild(termContainer);

    const terms = dl.querySelectorAll("dt");
    terms.forEach((term, i) => {
      const parameterDiv = document.createElement("div");
      parameterDiv.className = "parameter";
      parameterDiv.style.opacity = 0;

      parameterDiv.addEventListener("mouseover", () => {
        parameterDiv.style.opacity = 0.2;

        const def = termContainer.querySelectorAll(".definition")[i];
        if (def) {
          const rect = parameterDiv.getBoundingClientRect();
          const parentRect = termContainer.getBoundingClientRect();
          def.style.top =
            rect.top - parentRect.top + parameterDiv.offsetHeight + "px";
          def.style.display = "block";
        }
      });

      parameterDiv.addEventListener("mouseout", () => {
        parameterDiv.style.opacity = 0;
        const def = termContainer.querySelectorAll(".definition")[i];
        if (def) {
          def.style.display = "none";
        }
      });

      termContainer.appendChild(parameterDiv);
    });

    const definitions = dl.querySelectorAll("dd");
    definitions.forEach((def) => {
      const defDiv = document.createElement("div");
      defDiv.className = "definition";
      defDiv.innerHTML = def.innerHTML;
      defDiv.style.display = "none";
      termContainer.appendChild(defDiv);
    });

    // Clean up original dl
    dl.remove();
  });
}

// tko.m22.js
function fCalcLoadTest(tabID) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;
  const table = root.querySelector(`table#${tabID}`);
  if (!table) return;

  // Helper: get numeric input by name
  function getInput(name) {
    const el = table.querySelector(`input[name=${name}]`);
    return el ? parseFloat(el.value) : NaN;
  }

  // Read all values
  const values = {
    line_ab0: getInput("line_ab0"),
    line_bc0: getInput("line_bc0"),
    line_ca0: getInput("line_ca0"),
    line_ab50: getInput("line_ab50"),
    line_bc50: getInput("line_bc50"),
    line_ca50: getInput("line_ca50"),
    line_ab100: getInput("line_ab100"),
    line_bc100: getInput("line_bc100"),
    line_ca100: getInput("line_ca100"),
  };

  const arrLoad0 = [values.line_ab0, values.line_bc0, values.line_ca0];
  const arrLoad50 = [values.line_ab50, values.line_bc50, values.line_ca50];
  const arrLoad100 = [values.line_ab100, values.line_bc100, values.line_ca100];

  const vHi0 = Math.max(...arrLoad0);
  const vHi50 = Math.max(...arrLoad50);
  const vHi100 = Math.max(...arrLoad100);

  const vLo0 = Math.min(...arrLoad0);
  const vLo50 = Math.min(...arrLoad50);
  const vLo100 = Math.min(...arrLoad100);

  const vAveNL = (values.line_ab0 + values.line_bc0 + values.line_ca0) / 3;
  const vAveFL =
    (values.line_ab100 + values.line_bc100 + values.line_ca100) / 3;
  const vAveREG = ((vAveNL - vAveFL) / vAveNL) * 100;

  const vBal0 = ((vHi0 - vLo0) / vLo0) * 100;
  const vBal50 = ((vHi50 - vLo50) / vLo50) * 100;
  const vBal100 = ((vHi100 - vLo100) / vLo100) * 100;

  // Validation
  if (isNaN(vAveNL) || isNaN(vAveFL) || isNaN(vAveREG)) {
    alert("Please enter a valid number.");
    return;
  }

  // Helper: update span
  function updateSpan(selector, text) {
    const el = table.querySelector(selector);
    if (el) {
      el.textContent = text;
      el.style.fontWeight = "bold";
    }
  }

  // Update outputs
  updateSpan("span.out_nl", `${vAveNL.toFixed(1)} V`);
  updateSpan("span.out_fl", `${vAveFL.toFixed(1)} V`);
  updateSpan("span.out_reg", `${vAveREG.toFixed(1)} %`);

  updateSpan("span.out_hi0", `${vHi0} V`);
  updateSpan("span.out_hi50", `${vHi50} V`);
  updateSpan("span.out_hi100", `${vHi100} V`);

  updateSpan("span.out_lo0", `${vLo0} V`);
  updateSpan("span.out_lo50", `${vLo50} V`);
  updateSpan("span.out_lo100", `${vLo100} V`);

  updateSpan("span.out_bal0", `${vBal0.toFixed(1)} %`);
  updateSpan("span.out_bal50", `${vBal50.toFixed(1)} %`);
  updateSpan("span.out_bal100", `${vBal100.toFixed(1)} %`);
}

// Immediately called helper function to set EventListeners
function fAttachCalcCalibListeners() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;

  // Map input IDs to handler functions
  const bindings = [
    { id: "input1", handler: CalcCalib },
    { id: "input3", handler: CalcCalib2 },
    { id: "input4", handler: CalcCalib3 },
    { id: "input5", handler: CalcCalib4 },
  ];

  bindings.forEach(({ id, handler }) => {
    const input = root.getElementById(id);
    if (input && !input.dataset.listenerAttached) {
      input.addEventListener("keyup", handler);
      // Mark as wired to avoid duplicate attachment
      input.dataset.listenerAttached = "true";
    }
  });
}

function CalcCalib() {
  const root = document.querySelector(".custom-article-content")?.shadowRoot;
  if (!root) return;

  const input = root.getElementById("input1")?.value;
  if (!input) return;

  if (isNaN(input)) {
    alert("Please enter a numerical value.");
  } else if (input > 8.3) {
    alert("Please enter a value less than 8.3.");
    root.getElementById("result2").value = "";
    root.getElementById("result1").value = "";
  } else if (input < 8.4 && input.length > 0) {
    root.getElementById("result2").value = (21.6 * input).toFixed(2);
    root.getElementById("result1").value = (
      3932.16 * (1000 / 60 - input) -
      65536
    ).toFixed(0);
  } else {
    root.getElementById("result2").value = "";
    root.getElementById("result1").value = "";
  }
}

function CalcCalib2() {
  const root = document.querySelector(".custom-article-content")?.shadowRoot;
  if (!root) return;

  const input = root.getElementById("input3")?.value;
  if (!input) return;

  if (isNaN(input)) {
    alert("Please enter a numerical value.");
  } else if (input > 180) {
    alert("Please enter a value less than 180.");
    root.getElementById("result3").value = "";
  } else if (input < 181 && input.length > 0) {
    root.getElementById("result3").value = (
      182.045 * (360 - input) -
      65536
    ).toFixed(0);
  } else {
    root.getElementById("result3").value = "";
  }
}

function CalcCalib3() {
  const root = document.querySelector(".custom-article-content")?.shadowRoot;
  if (!root) return;

  const input = root.getElementById("input4")?.value;
  if (!input) return;

  if (isNaN(input)) {
    alert("Please enter a numerical value.");
  } else if (input > 8.3) {
    alert("Please enter a value less than 8.3.");
    root.getElementById("result4").value = "";
    root.getElementById("result5").value = "";
  } else if (input < 8.4 && input.length > 0) {
    root.getElementById("result5").value = (21.6 * input).toFixed(2);
    root.getElementById("result4").value = (3931.16 * input).toFixed(0);
  } else {
    root.getElementById("result4").value = "";
    root.getElementById("result5").value = "";
  }
}

function CalcCalib4() {
  const root = document.querySelector(".custom-article-content")?.shadowRoot;
  if (!root) return;

  const input = root.getElementById("input5")?.value;
  if (!input) return;

  if (isNaN(input)) {
    alert("Please enter a numerical value.");
  } else if (input > 180) {
    alert("Please enter a value less than 180.");
    root.getElementById("result6").value = "";
  } else if (input < 181 && input.length > 0) {
    root.getElementById("result6").value = (182.045 * input).toFixed(0);
  } else {
    root.getElementById("result6").value = "";
  }
}

function z25_fCalculateActivePower() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;
  const n1 = root.getElementById("num1");
  const n2 = root.getElementById("num2");
  const output = root.getElementById("output");

  if (!n1 || !n2 || !output) return;

  const val1 = parseFloat(n1.value);
  const val2 = parseFloat(n2.value);

  if (isNaN(val1) || isNaN(val2)) {
    output.innerHTML = "<strong>Invalid input</strong>";
  } else {
    output.innerHTML = `<strong>${(val1 * val2).toFixed(2)} kW</strong>`;
  }
}

function z25_clearInput() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;
  const n1 = root.getElementById("num1");
  const n2 = root.getElementById("num2");
  const output = root.getElementById("output");

  if (n1) n1.value = "";
  if (n2) n2.value = "";
  if (output) output.innerHTML = "";
}

// Reset button for z25 Calculator
function z25_ResetButton(divId) {
  fClearSelect();
  fLibClearTab(divId);
}

// Helper
function fClearSelect() {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  root.querySelectorAll("select").forEach((sel) => {
    sel.selectedIndex = 0; // reset to first option
  });
}

// Helper
function fLibClearTab(divId) {
  if (!divId) return;
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;
  const table = root.querySelector(`${divId} table`);

  table.querySelectorAll("tr").forEach((tr) => {
    tr.querySelectorAll("td:not(:first-child)").forEach((td) => {
      td.textContent = "";
    });
  });
}

// Helper
function fCreateLibSetTable(oSetting, divId) {
  if (!divId) return;

  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;
  const table = root.querySelector(`${divId} table`);

  if (!oSetting) {
    fLibClearTab(divId);
    return;
  }

  const cells = table.querySelectorAll("td");
  if (cells.length < 24) return; // safeguard

  // fill pnu1510
  oSetting.pnu1510.forEach((val, i) => {
    const cell = cells[1 + i * 4];
    if (cell) cell.textContent = val;
  });

  // fill pnu1511
  oSetting.pnu1511.forEach((val, i) => {
    const cell = cells[2 + i * 4];
    if (cell) cell.textContent = val;
  });

  // fill pnu1513
  oSetting.pnu1513.forEach((val, i) => {
    const cell = cells[3 + i * 4];
    if (cell) cell.textContent = val;
  });
}

// Helper
function fCreatePNU1530Tab(rating, strNum, arr) {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  const tab = root.querySelector("#lib_pnu1530 table");
  if (!tab) return;

  const rateArr = [
    "250",
    "300",
    "400",
    "400E",
    "500",
    "600",
    "625",
    "750",
    "800",
    "1000",
    "1100",
    "1200",
    "1250",
  ];
  const p1530maxArr = [
    651, 781, 1042, 1042, 1302, 1563, 1628, 1953, 2083, 2604, 2865, 3125, 3255,
  ];

  const idx = rateArr.indexOf(rating);
  if (idx === -1) return;

  const p1530Max = p1530maxArr[idx];
  const baseVal = arr[parseInt(strNum, 10) - 1];
  const finalVal = Math.min(baseVal, p1530Max);

  const cells = tab.querySelectorAll("td");
  if (cells[0]) cells[0].textContent = strNum;
  if (cells[1]) cells[1].textContent = finalVal;
}

// Helper
function fUniqueArray(text, arr) {
  if (!arr.includes(text)) {
    arr.push(text);
  }
}

// Helper
function fLoadOptions(arr, sel) {
  if (!sel) return;
  sel
    .querySelectorAll("option:not(:first-child)")
    .forEach((opt) => opt.remove());

  arr.forEach((val) => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    sel.appendChild(opt);
  });
}

// Immediately called function for specific article/s
function z25_fLoadSamLibCalc() {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  fClearSelect();

  const pnu1530 = [
    220, 440, 660, 880, 1100, 1320, 1540, 1760, 1980, 2200, 2420, 2640,
  ];
  const divId = "#lib_setting"; // table Div ID
  if (!divId) return;

  // generic change handler
  root.querySelectorAll("select").forEach((sel) => {
    // prevent duplicate listeners
    sel.removeEventListener("change", handleGenericChange);
    sel.addEventListener("change", handleGenericChange);
  });

  function handleGenericChange() {
    const sRating = root.querySelector("select[name=rating]")?.value;
    const sPnu1605 = root.querySelector("select[name=pnu1605]")?.value;
    const sCellNum = root.querySelector("select[name=cellnum]")?.value;
    const sStringNum = root.querySelector("select[name=stringnum]")?.value;

    if (sRating && sPnu1605 && sCellNum && sStringNum) {
      const oSetting = samsungBatterySettings.find(
        (st) =>
          st.rating === sRating &&
          st.pnu1605 === sPnu1605 &&
          st.cellnum === sCellNum &&
          st.stringnum === sStringNum
      );
      fCreateLibSetTable(oSetting, divId);
      fCreatePNU1530Tab(sRating, sStringNum, pnu1530);
    } else {
      fLibClearTab(divId);
    }
  }

  // rating-specific handler
  const ratingSelect = root.querySelector("select[name=rating]");
  if (ratingSelect) {
    ratingSelect.removeEventListener("change", handleRatingChange);
    ratingSelect.addEventListener("change", handleRatingChange);
  }

  function handleRatingChange() {
    const stringSelect = root.querySelector("select[name=stringnum]");
    if (!stringSelect) return;

    // clear existing options except first
    stringSelect
      .querySelectorAll("option:not(:first-child)")
      .forEach((opt) => opt.remove());

    const selectedRating = ratingSelect.value;
    if (selectedRating) return;

    const arrStr = [];
    samsungBatterySettings
      .filter((st) => st.rating === sRating)
      .forEach((st) => fUniqueArray(st.stringnum, arrStr));
    fLoadOptions(arrStr, stringSelect);
  }
}

// Immediately called function for specific article/s
function z25_fLoadHplLibCalc() {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  fClearSelect();

  const pnu1530 = [300, 500, 700, 800, 900, 1000, 1100, 1200, 1200];
  const divId = "#lib_setting"; // table Div ID
  if (!divId) return;

  // generic change handler
  root.querySelectorAll("select").forEach((sel) => {
    // prevent duplicate listeners
    sel.removeEventListener("change", handleGenericChange);
    sel.addEventListener("change", handleGenericChange);
  });

  function handleGenericChange() {
    const sRating = root.querySelector("select[name=rating]")?.value;
    const sPnu1605 = root.querySelector("select[name=pnu1605]")?.value;
    const sCelTemp = root.querySelector("select[name=celtemp]")?.value;
    const sStringNum = root.querySelector("select[name=stringnum]")?.value;

    if (sRating && sPnu1605 && sCelTemp && sStringNum) {
      const oSetting = hplBatterySettings.find(
        (st) =>
          st.rating === sRating &&
          st.pnu1605 === sPnu1605 &&
          st.celtemp === sCelTemp &&
          st.cellnum === "132" &&
          st.stringnum === sStringNum
      );
      fCreateLibSetTable(oSetting, divId);
      fCreatePNU1530Tab(sRating, sStringNum, pnu1530);
    } else {
      fLibClearTab(divId);
    }
  }

  // rating-specific handler
  const ratingSelect = root.querySelector("select[name=rating]");
  if (ratingSelect) {
    ratingSelect.removeEventListener("change", handleRatingChange);
    ratingSelect.addEventListener("change", handleRatingChange);
  }

  function handleRatingChange() {
    const stringSelect = root.querySelector("select[name=stringnum]");
    if (!stringSelect) return;

    // clear existing options except first
    stringSelect
      .querySelectorAll("option:not(:first-child)")
      .forEach((opt) => opt.remove());

    const selectedRating = ratingSelect.value;
    if (!selectedRating) return;

    const arrStr = [];
    hplBatterySettings
      .filter((st) => st.rating === selectedRating)
      .forEach((st) => fUniqueArray(st.stringnum, arrStr));

    fLoadOptions(arrStr, stringSelect);
  }
}

// Immediately called function for specific article/s to run attachVoltLockoutListener()
function fCalcVoltLockout() {
  attachVoltLockoutListener(".lock_byp_volt", ".lock_out_volt", 480);
  attachVoltLockoutListener(".lock_byp_volt2", ".lock_out_volt2", 208);
  attachVoltLockoutListener(".lock_byp_volt3", ".lock_out_volt3", 575);
  attachVoltLockoutListener(".lock_byp_volt4", ".lock_out_volt4", 600);
}

// Simplified function for fCalcVoltLockout, fCalcVoltLockout2, fCalcVoltLockout3, fCalcVoltLockout4
function attachVoltLockoutListener(inputSelector, outputSelector, threshold) {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  const inputs = root.querySelectorAll(inputSelector);
  if (!inputs.length) return;

  inputs.forEach((input) => {
    // Remove old listeners to ensure idempotency
    input.removeEventListener("click", handleClick);
    input.removeEventListener("keyup", handleKeyup);

    input.addEventListener("click", handleClick);
    input.addEventListener("keyup", handleKeyup);

    function handleClick() {
      input.value = "";
    }

    function handleKeyup() {
      const table = input.closest("table");
      if (!table) return;

      const lockout = table.querySelector(outputSelector);
      if (!lockout) return;

      const val = input.value.trim();

      if (isNaN(val)) {
        alert("Please enter a valid number.");
        input.value = "";
        lockout.textContent = "";
        return;
      }

      if (val === "") {
        input.closest("td")?.nextElementSibling?.remove();
        lockout.textContent = "";
        return;
      }

      const bypval = parseFloat(val);
      let outval;
      if (bypval >= threshold) {
        outval = bypval - 0.05 * bypval;
      } else {
        outval = bypval + 0.05 * bypval;
      }

      lockout.textContent = `${outval.toFixed(2)} VAC`;
    }
  });
}

// function fClearProcedureChecklist() {
//   const host = document.querySelector(".custom-article-content");
//   const root = host?.shadowRoot || document;

//   const articleDiv = root.querySelector("#custom-article-div");
//   if (!articleDiv) return;

//   const articleId = articleDiv.getAttribute("data-article-id");
//   if (!articleId) return;

//   const checkedBoxes = root.querySelectorAll("li[id^=step] input[type=checkbox]:checked");

//   if (checkedBoxes.length === 0) {
//     alert("There are no saved progress to delete at this time.");
//     return;
//   }

//   const confirmMsg =
//     "This will delete your saved progress in all the procedures on this page. " +
//     "Click OK to continue deleting your saved progress, or click Cancel.";

//   if (!window.confirm(confirmMsg)) return;

//   // Clear the array stored under this articleId
//   localStorage.removeItem(articleId);

//   // Reset all step checkboxes
//   root.querySelectorAll("li[id^=step] input[type=checkbox]").forEach((checkbox) => {
//     checkbox.checked = false;
//     checkbox.disabled = false;
//   });

//   // Remove tips
//   root.querySelectorAll(".tip-checklist-procedure").forEach((tip) => tip.remove());
// }



// function fStyleProcedureChecklist() {
//   const host = document.querySelector(".custom-article-content");
//   const root = host?.shadowRoot || document;

//   const articleDiv = root.querySelector("#custom-article-div");
//   const articleId = articleDiv?.getAttribute("data-article-id");
//   if (!articleId) return;

//   // load performed steps from storage
//   const performedSteps = JSON.parse(localStorage.getItem(articleId) || "[]");

//   root.querySelectorAll("div.cheklist-procedure").forEach((checklistDiv) => {
//     const steps = checklistDiv.querySelectorAll("li[id^=step]");

//     steps.forEach((step) => {
//       const stepId = step.id;
//       const performed = performedSteps.includes(stepId);

//       // avoid duplicating checkboxes if function runs again
//       if (step.querySelector("input[type=checkbox]")) return;

//       const checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = performed;
//       checkbox.disabled = performed;

//       checkbox.addEventListener("change", () => {
//         if (checkbox.checked) {
//           const confirmMsg =
//             "Please confirm that you have performed this step by clicking OK.\r\n" +
//             "If you have not performed this step yet, please click CANCEL.";
//           if (window.confirm(confirmMsg)) {
//             // update storage array
//             if (!performedSteps.includes(stepId)) {
//               performedSteps.push(stepId);
//               localStorage.setItem(articleId, JSON.stringify(performedSteps));
//             }
//             checkbox.disabled = true;
//           } else {
//             checkbox.checked = false;
//           }
//         }
//       });

//       step.prepend(checkbox);
//     });

//     // only insert the info tip once
//     const alreadyHasTip = checklistDiv.querySelector(".tip-checklist-procedure");
//     if (!alreadyHasTip && checklistDiv.querySelector("input[type=checkbox]:checked")) {
//       const tipWrapper = document.createElement("span");
//       const tip = document.createElement("span");
//       tip.textContent =
//         "The checked checkboxes identify the steps that you have performed.";
//       tip.classList.add("tip-checklist-procedure");

//       tipWrapper.prepend(tip);
//       checklistDiv.prepend(tipWrapper);
//     }
//   });
// }



/**********************************************************************************************************/
/**********************************************************************************************************/
/**********************************************************************************************************/

function fBuildCustomList() {
  if ($("div[id|=custom-list]").length > 0) {
    const sFileName = $("meta[name=Filename]").attr("content");
    const cCustomList = $("div[id|=custom-list]");
    const cCustomListPipe = [];

    cCustomList.each((cCustomList_i, cCustomList_o) => {
      const oCustomListIndex = $(cCustomList_o).addClass("index");
      const cCustomListFilter = $(cCustomList_o)
        .children("span.filter")
        .remove();
      const cCustomListSource = $(cCustomList_o)
        .children("span.source")
        .remove();
      const cCustomListOrder = $(cCustomList_o).children("span.order").remove();
      const cCustomListField = $(cCustomList_o).children("span").remove();
      const oLoadMessage = fStyleLoadingIndicator($(cCustomList_o));

      // store the collections as data to the table object
      // these data will be collected later by fBuildCustomList_scope
      $(cCustomList_o).data("filter", cCustomListFilter);
      $(cCustomList_o).data("source", cCustomListSource);
      $(cCustomList_o).data("order", cCustomListOrder);
      $(cCustomList_o).data("field", cCustomListField);
      $(cCustomList_o).data("loading", oLoadMessage);
      cCustomListPipe.push($(cCustomList_o).attr("id"));

      // scope the content of each custom-list
      fBuildCustomList_scope(cCustomListPipe);
    });
  }
}

function fBuildCustomList_build(
  oCustomList,
  cCustomListNode,
  cCustomListField,
  oLoadMessage,
  cCustomListPipe
) {
  const iHangingIndent = 15;
  if (cCustomListNode.length > 0) {
    const cCustomListSplice = cCustomListNode.splice(0, 2);
    $(cCustomListSplice).each((cCustomListSplice_i, cCustomListSplice_o) => {
      const oCustomListRow = $("<div/>")
        .appendTo(oCustomList)
        .addClass("index-link-container")
        .css("margin-left", iHangingIndent)
        .hide();

      $(cCustomListField).each((cCustomListField_i, cCustomListField_o) => {
        const sCustomListField_type = $(cCustomListField_o).attr("class");
        const sCustomListField_node = $(cCustomListField_o).attr("title");
        let sCustomListField_text = $(cCustomListSplice_o)
          .children(sCustomListField_node)
          .text();
        sCustomListField_text = sCustomListField_text
          .replace(/\[/g, "<")
          .replace(/\]/g, ">");

        const oCustomListColumn = $("<span/>", {
          html: fTransformNode(
            $(cCustomListSplice_o),
            sCustomListField_type,
            sCustomListField_node,
            sCustomListField_text
          ),
          title() {
            // if text was trimmed, add title attribute to column
            if (
              $.trim(sCustomListField_text).length <
              $.trim(
                $(cCustomListSplice_o).children(sCustomListField_node).text()
              ).length
            ) {
              return $(cCustomListSplice_o)
                .children(sCustomListField_node)
                .text();
            }
          },
        })
          .appendTo(oCustomListRow)
          .addClass("custom-index-detail");
      });
      // if topic is 'wip', either highlight it or remove it, depending on whether environment is production or not
      if ($(cCustomListSplice_o).closest("topic[wip]")[0]) {
        bProduction
          ? null
          : oCustomListRow.find("span").css("background", "yellow");
        if (
          $($(cCustomListSplice_o).closest("topic[wip]")[0])
            .attr("wip")
            .toLowerCase()
            .indexOf("new") >= 0
        ) {
          bProduction ? oCustomListRow.find("a").removeAttr("href") : null;
        }
      }
    });

    setTimeout(() => {
      fBuildCustomList_build(
        oCustomList,
        cCustomListNode,
        cCustomListField,
        oLoadMessage,
        cCustomListPipe
      );
    }, 15);
  } else {
    oLoadMessage.remove();
    fStyleMultiColumnIndex(oCustomList);
    oCustomList.hide();
    oCustomList.find(".index-link-container").show();
    oCustomList.fadeIn("fast", () => {
      fBuildCustomList_scope(cCustomListPipe);
    });
    fBuildTopicShortcut();
  }
}

function fBuildCustomList_scope(cCustomListPipe) {
  if (cCustomListPipe[0]) {
    // collect the data stored in the custom-list object
    const oCustomList = $(`#${cCustomListPipe.splice(0, 1)}`);
    const oLoadMessage = oCustomList.data("loading");
    const cCustomListFilter = oCustomList.data("filter");
    const cCustomListSource = oCustomList.data("source");
    const cCustomListOrder = oCustomList.data("order");
    const cCustomListField = oCustomList.data("field");

    const cCustomListScope = fScopeCollection(
      oCustomList,
      cCustomListFilter,
      cCustomListSource,
      cCustomListOrder
    );
    fBuildCustomList_build(
      oCustomList,
      cCustomListScope,
      cCustomListField,
      oLoadMessage,
      cCustomListPipe
    );
  }
}

function fScopeCollection(oScopeObj, cScopeFilter, cScopeSource, cScopeOrder) {
  // collect the data stored in the custom-list object
  // try to build cScopeNode based on cScopeFilter first because cScopeFilter usually returns a smaller collection
  // if cScopeNode is built based on cScopeSource first, the collection is larger; hence, the script runs slower
  let cScopeNode = $();
  $(cScopeFilter).each((cScopeFilter_i, cScopeFilter_o) => {
    const sScopeNode = $(cScopeFilter_o).attr("title");
    const sScopeText = $(cScopeFilter_o).text();
    cScopeNode = cScopeNode.add(
      $($oDocRoot)
        .find(sScopeNode)
        .filter(function () {
          return (
            $(this).text().toLowerCase().indexOf(sScopeText.toLowerCase()) > -1
          );
        })
        .closest("topic")
    );
  });
  $(cScopeSource).each((cScopeSource_i, cScopeSource_o) => {
    const sScopeNode = $(cScopeSource_o).attr("title");
    const sScopeText = $(cScopeSource_o).text();
    cScopeNode = $(cScopeFilter)[0]
      ? $(cScopeNode)
          .find(sScopeNode)
          .filter(function () {
            return (
              $(this).text().toLowerCase().indexOf(sScopeText.toLowerCase()) >
              -1
            );
          })
          .closest("topic")
      : cScopeNode.add(
          $($oDocRoot)
            .find(sScopeNode)
            .filter(function () {
              return (
                $(this).text().toLowerCase().indexOf(sScopeText.toLowerCase()) >
                -1
              );
            })
            .closest("topic")
        );
  });

  if (cScopeOrder) {
    const bOrderAscend = cScopeOrder.text().toLowerCase().indexOf("desc") == -1;
    cScopeNode.sort((a, b) => {
      const A = $(a).children(cScopeOrder.attr("title")).text().toLowerCase();
      const B = $(b).children(cScopeOrder.attr("title")).text().toLowerCase();
      if (bOrderAscend) {
        if (A < B) {
          return -1;
        }
        if (A > B) {
          return 1;
        }
        return 0;
      }
      if (A > B) {
        return -1;
      }
      if (A < B) {
        return 1;
      }
      return 0;
    });
  }

  return cScopeNode;
}

function fBuildCustomIndex() {
  if ($("div[id|=custom-index]").length > 0) {
    const iHangingIndent = 15;
    const oCustomIndex = $("div[id|=custom-index]").addClass("index");
    const oCustomFilter = $("div[id|=custom-filter]").children("span").remove();
    const cCustomField = $("div[id|=custom-index]").children("span").remove();
    const sFileName = $("meta[name=Filename]").attr("content");
    const oLoadMessage = $("<div/>")
      .appendTo($("div[id|=custom-index]"))
      .append(
        $("<img/>", {
          src: "../../theme/graphic/cue_loading.gif",
          align: "middle",
          hspace: 10,
        })
      )
      .append(
        $("<span/>", { text: "Loading index, this may take a while..." })
      );

    oLoadMessage.remove();
    const oFileNode = $($oDocRoot)
      .find(`link:contains(${sFileName})`)
      .parent("topic");
    const cChildNode =
      oCustomFilter.length > 0
        ? oFileNode.children(
            `topic:has(${oCustomFilter.attr(
              "class"
            )}:contains(${oCustomFilter.text()}))`
          )
        : oFileNode.children("topic");
    const cChildNode_skip = oFileNode.children(":not(topic)");
    const cChildNode_sort = cChildNode
      .map(function () {
        return `${$(this)
          .children(cCustomField.attr("class"))
          .text()}oRowIndex:${$(this).index()}`;
      })
      .get()
      .sort();

    $(cChildNode_sort).each((cChildNode_i, cChildNode_t) => {
      const iRowIndex = Number(
        cChildNode_t
          .substring(cChildNode_t.lastIndexOf("oRowIndex:"))
          .replace("oRowIndex:", "")
      );
      const cChildNode_o = oFileNode.children().eq(iRowIndex);
      const oLinkContainter = $("<div/>")
        .appendTo(oCustomIndex)
        .css("margin-left", iHangingIndent)
        .addClass("index-link-container");

      $(cCustomField).each((cCustomField_i, cCustomField_o) => {
        const sNodeName = $(cCustomField_o).attr("class");
        let oElement;
        if (sNodeName == "title") {
          oElement = $("<a/>", {
            href: $(cChildNode_o).children("link").text(),
            text: $(cChildNode_o).children("title").text(),
          });
          fSetHyperlinkAttr(oElement);
        } else {
          oElement = $("<span/>", {
            text: $(cChildNode_o).children(sNodeName).text(),
          });
        }
        oElement.appendTo(oLinkContainter).addClass("custom-index-detail");
      });
    });
    fStyleMultiColumnIndex(oCustomIndex);
  }
}

function fBuildFlexiTable() {
  if ($("div[id|=custom-table]").not("[flagged]")[0]) {
    const sFileName = $("meta[name=Filename]").attr("content");
    const cFlexiTable = $("div[id|=custom-table]")
      .not("[flagged]")
      .attr("flagged", "true");
    const cFlexiPipe = [];

    cFlexiTable.each((cFlexiTable_i, cFlexiTable_o) => {
      const oFlexiContainer = $(cFlexiTable_o).addClass("table-index");
      const cFlexiFilter = $(cFlexiTable_o).children("span.filter").remove();
      const cFlexiSource = $(cFlexiTable_o).children("span.source").remove();
      const cFlexiHeader = $(cFlexiTable_o).children("span.header").remove();
      const cFlexiOrder = $(cFlexiTable_o).children("span.order").remove();
      const cFlexiField = $(cFlexiTable_o).children("span").remove();
      const oLoadMessage = fStyleLoadingIndicator($(cFlexiTable_o));

      // create the generic table, based on the cFlexiField collection
      const sColumn_label = cFlexiField
        .map(function () {
          return $(this).text();
        })
        .get()
        .join(", ");
      const sColumn_type = cFlexiField
        .map(function () {
          return $(this).attr("class");
        })
        .get()
        .join(", ");
      const oFlexiTable = fGenericBuildTable(
        $(cFlexiTable_o),
        sColumn_label,
        sColumn_type
      );

      // store the collections as data to the table object
      // these data will be collected later by BuildFlexiPipe
      oFlexiTable.data("filter", cFlexiFilter);
      oFlexiTable.data("source", cFlexiSource);
      oFlexiTable.data("field", cFlexiField);
      oFlexiTable.data("loading", oLoadMessage);
      oFlexiTable.hide().find("tr th").addClass("sort-header");
      cFlexiPipe.push($(cFlexiTable_o).attr("id"));

      // if cFlexiHeader exists, create a table header/banner
      if (cFlexiHeader[0]) {
        oFlexiTable.prepend(
          $("<tr />").append(
            $("<th>", {
              html: cFlexiHeader.text(),
              colspan: cFlexiField.length,
            })
              .addClass(cFlexiHeader.attr("title"))
              .addClass("head")
          )
        );
      }
    });

    // scope the content of each table
    fBuildFlexiTable_scope(cFlexiPipe);
  }
}

function fBuildFlexiTable_build(
  oFlexiTable,
  cFlexiNode,
  cFlexiField,
  oLoadMessage,
  cFlexiPipe
) {
  if (cFlexiNode.length > 0) {
    const cFlexiSplice = cFlexiNode.splice(0, 10);
    $(cFlexiSplice).each((cFlexiSplice_i, cFlexiSplice_o) => {
      const oFlexiRow = $("<tr/>").appendTo(oFlexiTable);
      $(cFlexiField).each((cFlexiField_i, cFlexiField_o) => {
        const sFlexiField_type = $(cFlexiField_o).attr("class");
        const sFlexiField_node = $(cFlexiField_o).attr("title");
        var sFlexiField_text;
        // is sFlexiField_node equal to 'revision', and is there at least 1 log entry under it?
        // if so, set sFlexiField_text to the date attribute of revision log in index position 0
        // else, set sFlexiField_text to the value of the sFlexiField_node's node
        if (sFlexiField_node == "revision") {
          if (
            $(cFlexiSplice_o).children(sFlexiField_node)[0] &&
            $(cFlexiSplice_o)
              .children(sFlexiField_node)
              .children("log[date]")[0]
          ) {
            var sFlexiField_text = $(cFlexiSplice_o)
              .children(sFlexiField_node)
              .children("log[date]")
              .attr("date");
          } else if ($(cFlexiSplice_o).children("issue")[0]) {
            sFlexiField_text = $(cFlexiSplice_o).children("issue").text();
          }
        } else {
          sFlexiField_text = $(cFlexiSplice_o)
            .children(sFlexiField_node)
            .text();
          sFlexiField_text = sFlexiField_text
            .replace(/\[/g, "<")
            .replace(/\]/g, ">");
        }

        const oFlexiColumn = $("<td/>", {
          valign: "top",
          html: fTransformNode(
            cFlexiSplice_o,
            sFlexiField_type,
            sFlexiField_node,
            sFlexiField_text
          ),
          title() {
            // if text was trimmed, add title attribute to column
            if (
              $.trim(sFlexiField_text).length <
              $.trim($(cFlexiSplice_o).children(sFlexiField_node).text()).length
            ) {
              return $(cFlexiSplice_o).children(sFlexiField_node).text();
            }
          },
        }).appendTo(oFlexiRow);

        // if topic is 'wip', either highlight it or remove it, depending on whether environment is production or not
        if ($(cFlexiSplice_o).closest("topic[wip]")[0]) {
          bProduction
            ? null
            : oFlexiRow.find("a, span").css("background", "yellow");
          if (
            $($(cFlexiSplice_o).closest("topic[wip]")[0])
              .attr("wip")
              .toLowerCase()
              .indexOf("new") >= 0
          ) {
            bProduction ? oFlexiColumn.remove() : null;
          }
        }
      });
    });

    setTimeout(() => {
      fBuildFlexiTable_build(
        oFlexiTable,
        cFlexiNode,
        cFlexiField,
        oLoadMessage,
        cFlexiPipe
      );
    }, 15);
  } else {
    // when content for current table has completely loaded:
    // 1. remove the loading message
    // 2. sort the content of the table
    // 3. fadeIn the table
    oLoadMessage.remove();
    oFlexiTable.find("th[class|=sort-header]")[0].click();
    oFlexiTable.find("th[class|=sort-header]")[0].click();

    if (oFlexiTable.find("td").length == 0) {
      const cusTableNote = $("<span>").html(
        `There is no active ${$(oFlexiTable)
          .find("th")
          .eq(0)
          .text()} for this product at the moment.`
      );
      const emptyMessage = $("<div/>")
        .addClass("note")
        .insertAfter($(oFlexiTable))
        .hide()
        .append($("<div/>").text("Note:").addClass("note-label"))
        .append($("<div/>").html(cusTableNote).addClass("note-text"))
        .css("max-width", "470px");
      $(emptyMessage).fadeIn("fast", () => {});
      setTimeout(() => {
        if (cFlexiPipe.length == 0) {
          fBuildTopicShortcut();
        } else {
          fBuildFlexiTable_scope(cFlexiPipe);
        }
      }, 20);
    } else {
      oFlexiTable.fadeIn("fast", () => {
        // if there's no more object in the cFlexiPipe, add topic shortcut as needed
        // otherwise, continue to build table based on object in the cFlexiPipe
        setTimeout(() => {
          if (cFlexiPipe.length == 0) {
            fBuildTopicShortcut();
          } else {
            fBuildFlexiTable_scope(cFlexiPipe);
          }
        }, 20);
      });
    }
  }
}

function fBuildFlexiTable_scope(cFlexiPipe) {
  if (cFlexiPipe[0]) {
    // collect the data stored in the custom-list object
    const oFlexiTable = $(`#${cFlexiPipe.splice(0, 1)}`).children("table");
    const oLoadMessage = oFlexiTable.data("loading");
    const cFlexiFilter = oFlexiTable.data("filter");
    const cFlexiSource = oFlexiTable.data("source");
    const cFlexiOrder = oFlexiTable.data("order");
    const cFlexiField = oFlexiTable.data("field");

    const cFlexiNodeScope = fScopeCollection(
      oFlexiTable,
      cFlexiFilter,
      cFlexiSource,
      cFlexiOrder
    );
    fBuildFlexiTable_build(
      oFlexiTable,
      cFlexiNodeScope,
      cFlexiField,
      oLoadMessage,
      cFlexiPipe
    );
  }
}

function fBuildCustomTable() {
  if ($("div[id|=techtip]").length > 0) {
    const cTechTip = $("div[id|=techtip]");
    const sFileName = $("meta[name=Filename]").attr("content");

    cTechTip.each((cTechTip_i, cTechTip_o) => {
      const sTechTip_type = $(cTechTip_o).attr("id").replace("techtip-", "");
      const cFilter = $(cTechTip_o).children("span.filter").remove();
      const cColumn = $(cTechTip_o).children("span").remove();
      const oLoadMessage = $("<div/>")
        .appendTo($(cTechTip_o))
        .append(
          $("<img/>", {
            src: "../../theme/graphic/cue_loading.gif",
            align: "middle",
            hspace: 10,
          })
        )
        .append(
          $("<span/>", { text: "Loading index, this may take a while..." })
        );

      oLoadMessage.remove();
      const sColumn_label = cColumn
        .map(function () {
          return $(this).text();
        })
        .get()
        .join(", ");
      const sColumn_type = cColumn
        .map(function () {
          return $(this).attr("class");
        })
        .get()
        .join(", ");
      const oTechTipTable = fGenericBuildTable(
        $(cTechTip_o),
        sColumn_label,
        sColumn_type
      );
      $(oTechTipTable).find("tr th").addClass("sort-header");

      let oTechTipNode = $($oDocRoot);
      $(cFilter).each((cFilter_i, cFilter_o) => {
        const sFilter_node = $(cFilter_o).attr("title");
        const sFilter_text = $(cFilter_o).text();
        oTechTipNode = oTechTipNode
          .find(`${sFilter_node}:contains('${sFilter_text}')`)
          .parent("topic");
      });

      oTechTipNode = oTechTipNode
        .find(`applicability:contains('${sFileName}')`)
        .siblings(`type:contains(${sTechTip_type})`)
        .parent("topic");

      $(oTechTipNode).each((oTechTipNode_i, oTechTipNode_o) => {
        const oTechTipRow = $("<tr/>").appendTo(oTechTipTable);
        $(cColumn).each((cColumn_i, cColumn_o) => {
          const sColumn_type = $(cColumn_o).attr("class");
          const sColumn_node = $(cColumn_o).attr("title");
          // is sColumn_node equal to 'revision', and is there at least 1 log entry under it?
          // if so, set sColumn_text to the date attribute of revision log in index position 0
          // else, set sColumn_text to the value of the sColumn_mnde's node
          if (sColumn_node == "revision") {
            if (
              $(oTechTipNode_o).children(sColumn_node)[0] &&
              $(oTechTipNode_o).children(sColumn_node).children("log[date]")[0]
            ) {
              var sColumn_text = $(oTechTipNode_o)
                .children(sColumn_node)
                .children("log[date]")
                .attr("date");
            } else if ($(oTechTipNode_o).children("issue")[0]) {
              var sColumn_text = $(oTechTipNode_o).children("issue").text();
            }
          } else {
            var sColumn_text = $(oTechTipNode_o).children(sColumn_node).text();
            sColumn_text = sColumn_text.replace(/\[/g, "<").replace(/\]/g, ">");
          }

          let oColumn_val;
          const oTechTipCol = $("<td/>", {
            valign: "top",
            html() {
              // if class contains 'trim', trim the text to the desired length
              if (sColumn_type.indexOf("trim-") > -1) {
                const iLimit = sColumn_type
                  .substring(sColumn_type.indexOf("trim-"))
                  .replace("trim-", "");
                sColumn_text = fGenericShortenText(sColumn_text, iLimit);
              }
              // if class contains 'link', create oColumn_val, which is a link object
              if (sColumn_type.indexOf("link") > -1) {
                if (
                  $(oTechTipNode_o).children(sColumn_node).siblings("link")
                    .length > 0
                ) {
                  const sFileType = $(oTechTipNode_o)
                    .children(sColumn_node)
                    .siblings("link")
                    .text()
                    .substring(
                      $(oTechTipNode_o)
                        .children(sColumn_node)
                        .siblings("link")
                        .text()
                        .lastIndexOf(".")
                    )
                    .toUpperCase();
                  if (
                    sFileType != ".PNG" &&
                    sFileType != ".GIF" &&
                    sFileType != ".JPG"
                  ) {
                    oColumn_val = $("<a/>", {
                      href: $(oTechTipNode_o)
                        .children(sColumn_node)
                        .siblings("link")
                        .text(),
                      html: sColumn_text,
                    });
                  } else {
                    oColumn_val = $("<span/>", {
                      html: sColumn_text,
                      click() {
                        const oModalCanvass = fCreateModalBackground(2);
                        const cRef_o = $(this).siblings(".ref-target").clone();
                        fStyleModalLoader(cRef_o, oModalCanvass);
                      },
                    }).addClass("ref-modal");
                  }
                }
              }
              // if current column is 'description', check if there is a corresponding sibling link node;
              // if there is none, create oColumn_val, which is a link object that points to 'supersededby'
              if (
                sColumn_node == "description" &&
                $(oTechTipNode_o).children(sColumn_node).siblings("link")
                  .length == 0 &&
                $(oTechTipNode_o)
                  .children(sColumn_node)
                  .siblings("supersededby").length > 0
              ) {
                oColumn_val = $("<a/>", {
                  href: $(oTechTipNode_o)
                    .children(sColumn_node)
                    .siblings("supersededby")
                    .text(),
                  html: sColumn_text,
                });
              }
              // if oColumn_val exists and it a link object, add the correct target attribute
              // if oColumn_val is a span and class is 'ref-modal', set the 'ref-target' object
              // else set sColumn_text as oColumn_val
              if (oColumn_val && $(oColumn_val).is("a")) {
                oColumn_val.attr("target", () => {
                  const sFileType = oColumn_val
                    .attr("href")
                    .substring(oColumn_val.attr("href").lastIndexOf(".") + 1)
                    .toUpperCase();
                  return sFileType == "HTM" ? "_self" : "_blank";
                });
              } else if (
                oColumn_val &&
                $(oColumn_val).is("span") &&
                $(oColumn_val).attr("class") == "ref-modal"
              ) {
                const sFileName = $(oTechTipNode_o)
                  .children(sColumn_node)
                  .siblings("link")
                  .text();
                oColumn_val = $("<span/>", {
                  html: oColumn_val,
                });
                oColumnImgHolder = $("<span/>")
                  .addClass("ref-target")
                  .appendTo(oColumn_val);
                const oColumnImg = $("<img/>", {
                  src: sFileName,
                }).appendTo(oColumnImgHolder);
              } else {
                oColumn_val = sColumn_text;
              }

              return oColumn_val;
            },
            title() {
              // if text was trimmed, add title attribute to column
              if (
                $.trim(sColumn_text).length <
                $.trim($(oTechTipNode_o).children(sColumn_node).text()).length
              ) {
                return $(oTechTipNode_o).children(sColumn_node).text();
              }
            },
          }).appendTo(oTechTipRow);
        });
      });
    });
  }
}

function fBuildTopicIndex() {
  // 1. Get sFileName = name of current file based on Filename meta tag
  // 2. Get cFileNode = topic node(s) where sFileName appears
  // 3. Get cChildNode = subtopic(s) under the current topic
  // 4. Create oIndexHolder = div that will hold the index
  // 5. Create the index by looping through cChildNode
  //   cChildNode may need be hidden, so script does just that
  if ($("div[id|=index]").length > 0) {
    const oIndex = $("div[id|=index]").addClass("index").hide();
    const sFileName = $("meta[name=Filename]").attr("content");
    const cFileNode = $($oDocRoot)
      .find(`link:contains(${sFileName})`)
      .parent("topic, doc");
    const cChildNode = cFileNode.find("topic");
    const iHangingIndent = 15;

    const oIndexHolder = $("<div/>", {
      text() {
        return cFileNode.prop("tagName") == "topic"
          ? "IN THIS SECTION:"
          : "WHAT'S INSIDE:";
      },
    })
      .appendTo(oIndex)
      .addClass("label");

    cChildNode.each(function (cChildNode_i, cChildNode_o) {
      const iChildLevel = $(this).parentsUntil(cFileNode).length + 1;

      if (
        iChildLevel > 1 &&
        $(cChildNode_o).children("hide").text() == "true"
      ) {
        /* do nothing: do not write link */
      } else if ($(cChildNode_o).parents("collection-techtip").length == 0) {
        const oLinkContainter = $("<div/>")
          .appendTo(oIndex)
          .append(
            $("<a/>", {
              href: $(cChildNode_o).children("link").text(),
              text: $(cChildNode_o).children("title").text(),
            }).css({
              background() {
                // is topic a wip, or descendant of a wip that is a new section ?
                // if so, and env is non-prod, highlight the appropriate wips
                if (
                  $(cChildNode_o).attr("wip") ||
                  ($(cChildNode_o).closest("topic[wip]").length > 0 &&
                    $(cChildNode_o)
                      .closest("topic[wip]")
                      .attr("wip")
                      .toLowerCase()
                      .indexOf("new") >= 0)
                ) {
                  return bProduction
                    ? $(this).css("background-color")
                    : "yellow";
                }
              },
              marginLeft() {
                return iChildLevel * iHangingIndent;
              },
            })
          )
          .addClass("index-link-container")
          .css({
            // is topic a wip that is a new section, or decendant of a wip that is a new section ?
            // if so, and env is prod, hide the topic (in effect, all descendants of the wip-new)
            display() {
              if (
                ($(cChildNode_o).attr("wip") &&
                  $(cChildNode_o).attr("wip").toLowerCase().indexOf("new") >=
                    0) ||
                ($(cChildNode_o).closest("topic[wip]").length > 0 &&
                  $(cChildNode_o)
                    .closest("topic[wip]")
                    .attr("wip")
                    .toLowerCase()
                    .indexOf("new") >= 0)
              ) {
                return bProduction ? "none" : $(this).css("display");
              }
            },
          });

        fSetHyperlinkAttr(oLinkContainter.children("a"));
      }
    });
    fStyleMultiColumnIndex(oIndex);
    oIndex.fadeIn("fast");
  }
}

function fBuildTopicShortcut() {
  // jqXHR is to ensure all elements are already loaded on the page
  const iScrollHeight = $("body").prop("scrollHeight");
  if (
    $("h2").length > 1 &&
    (iScrollHeight * 3) / 5 > screen.height &&
    !$("#shortcut")[0]
  ) {
    var iHangingIndent = 15;
    var oShortcutContainer = $("<div/>", {
      id: "shortcut",
    })
      .insertAfter("h1")
      .hide();
    const oShortcut = $("<span/>", {
      id: "ref-shortcut",
      text: "On this Page:",
    })
      .appendTo(oShortcutContainer)
      .addClass("label");

    $("h2").each((cHeader_i, cHeader_o) => {
      const oQuickTop = $("<img/>", {
        src: `${baseUrl}custom/css/graphic/cue_top.png`,
        title: "Back to top of page",
        click() {
          $("html, body").animate({ scrollTop: "0px" }, 300);
        },
      })
        .appendTo($(cHeader_o))
        .addClass("quick-top");
    });
  }

  $("h2").each((cHeader_i, cHeader_o) => {
    const oLinkHolder = $("<div/>").appendTo(oShortcutContainer);
    const oLink = $("<span/>", {
      text: $(cHeader_o).text(),
      click() {
        $("html, body").animate(
          { scrollTop: $(cHeader_o).parent("div.section").offset().top },
          300
        );
      },
    })
      .appendTo(oLinkHolder)
      .css("margin-left", iHangingIndent)
      .addClass("selector-shortcut-option");
  });
  oShortcutContainer ? oShortcutContainer.fadeIn() : null;
}

function fCheckIfProduction() {
  const sFilePath = window.location.pathname;
  bProduction = sFilePath.toLowerCase().indexOf("tkoclient") >= 0;
  $bProduction = bProduction;
}



function fCreateLoadingIndicator(oLoadTarget) {
  const oLoadMessage = $("<span />")
    .appendTo(oLoadTarget)
    .append(
      $("<img />", {
        src: "../../theme/graphic/cue_loading.gif",
        align: "middle",
        hspace: 10,
        vspace: 15,
      })
    )
    .append($("<span />", { text: "Loading, please wait..." }))
    .append($("<span />", { id: "loading-extra-text" }));
  return oLoadMessage;
}

function fGenericBuildTable(oTarget, sColumn, sColumnType) {
  const oTable = $("<table/>").appendTo(oTarget);
  const oHeaderRow = $("<tr/>").appendTo(oTable);

  const cColumn = sColumn.split(", ");
  const cColumnType = sColumnType.split(", ");
  $(cColumn).each((cColumn_i, cColumn_s) => {
    const oHeaderColumn = $("<th/>", {
      text: cColumn_s,
    })
      .appendTo(oHeaderRow)
      .attr("data-type", cColumnType[cColumn_i]);
  });

  return oTable;
}

function fGenericBuildHyperLink(sNodeText, sNodeLink) {
  const oLink = $("<a/>", {
    text: sNodeText,
    href: sNodeLink,
  });
  return oLink;
}

function fGenericShortenText(sNodeText, iLength) {
  let sText = $.trim(sNodeText);
  if (sText.length > iLength) {
    sText = sText.substring(0, iLength - 3);
    sText = $.trim(sText.substring(0, sText.lastIndexOf(" ")));
    sText += "...";
  }
  return sText;
}

function fLoadMailerActiveX(oForm) {
  const rgxTo = new RegExp("[a-zA-Z0-9.-]*@[a-zA-Z0-9.-]*[a-zA-Z0-9.-]*", "i");
  const rgxCc = new RegExp(
    "[^b]cc=*?[a-zA-Z0-9.-]*@[a-zA-Z0-9.-]*[a-zA-Z0-9.-]*",
    "i"
  );
  const rgxBc = new RegExp(
    "bcc=*?[a-zA-Z0-9.-]*@[a-zA-Z0-9.-]*[a-zA-Z0-9.-]*",
    "i"
  );
  const rgxSj = new RegExp("subject[^;&]*", "i");
  const oFormPost = unescape(oForm.prop("action"));
  const sFormTo = oFormPost.match(rgxTo)
    ? oFormPost.match(rgxTo).toString()
    : null;
  const sFormCc = oFormPost.match(rgxCc)
    ? oFormPost
        .match(rgxCc)
        .toString()
        .replace(/[^b]cc=/i, "")
    : null;
  const sFormBc = oFormPost.match(rgxBc)
    ? oFormPost.match(rgxBc).toString().replace(/bcc=/i, "")
    : null;
  const sFormSj = oFormPost.match(rgxSj)
    ? oFormPost
        .match(rgxSj)
        .toString()
        .replace(/subject=/i, "")
    : null;

  if (window.ActiveXObject) {
    objO = new ActiveXObject("Outlook.Application");
    objNS = objO.GetNameSpace("MAPI");
    objMl = objO.CreateItem(0);

    // If the sbumit button has a class, and classname starts with 'f' (for 'function')
    // then set the value of sFormExtra to the classname.
    // Assume that a function with that classname exists, and invoke it.
    const sFormExtra =
      oForm.find("input[type=submit]").attr("class") &&
      oForm.find("input[type=submit]").attr("class").substring(0, 1) == "f"
        ? oForm.find("input[type=submit]").attr("class")
        : null;
    sFormExtra ? window[sFormExtra](oForm) : null;

    // Get the stored data from oForm via $.data();
    // this may the original data stored by fStyleMailderForm,
    // or the re-processed data by window[sFormExtra]
    const oFormData = oForm.data("data");

    oFormData
      .find("td")
      .css("background-color", $("td").css("background-color"))
      .css("border", $("td").css("border"))
      .css("font-family", $("td").css("font-family"))
      .css("font-size", $("td").css("font-size"))
      .css("padding", $("td").css("padding"));

    sFormTo ? (objMl.To = sFormTo) : null;
    sFormCc ? (objMl.Cc = sFormCc) : null;
    sFormBc ? (objMl.Bcc = sFormBc) : null;
    sFormSj ? (objMl.Subject = sFormSj) : null;
    objMl.HTMLBody = oFormData[0].outerHTML;
    objMl.Display();
  }
  location.reload();
}

function fSelectObjText(element) {
  if ($(`#${element}`)[0]) {
    if (document.body.createTextRange) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(element));
      range.select();
    } else if (window.getSelection) {
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(document.getElementById(element));
      selection.removeAllRanges();
      selection.addRange(range);
    }
  } else if (document.body.createTextRange) {
    var range = document.body.createTextRange();
    range.collapse(true);
    range.select();
  } else {
    var selection = window.getSelection();
    selection.removeAllRanges();
  }
}

function fSetHyperlinkAttr(oLink) {
  let sLinkFileType = oLink.attr("href");
  sLinkFileType = sLinkFileType
    .substring(sLinkFileType.lastIndexOf("."))
    .toUpperCase();
  sLinkFileType.indexOf(".HTM") > -1
    ? oLink.attr("target", "_self")
    : oLink.attr("target", "_blank");
  return oLink;
}

function fSetModalMessage(i) {
  $("#modal-notification").length > 0
    ? $("#modal-notification").remove()
    : null; // do nothing

  return (oMessage = $("<div />", {
    id: "modal-notification",
    html() {
      if (i == 1) {
        return (oHTML =
          "<strong>This form uses ActiveX control.</strong> " +
          "When submitting this form, a security pop-up may appear&mdash;select YES to allow interaction and run the webscript. " +
          "A draft email will then open in Microsoft Outlook containing the data that you are submitting. " +
          "Be sure to review this draft email and confirm all information and attachments are correct. " +
          "After verifying all information, send the email. ");
      }
    },
  }));
}

function fStyleConditionalEl($this, $val) {
  if ($this.attr("name").toLowerCase().indexOf("conditional") >= 0) {
    let cOption;
    switch ($this.prop("type")) {
      case "select-one":
        cOption = $this.children("option");
        break;
      default:
        cOption = $("body").find(`[name$=${$this.attr("name")}]`);
        break;
    }

    cOption.each((cOption_i, cOption_o) => {
      $(`#conditional-${$(cOption_o).val()}`).hide();
    });
    $(`#conditional-${$val}`).show();
  }
}

function fStyleLoadingIndicator(obj) {
  return $("<div/>")
    .appendTo(obj)
    .append(
      $("<img/>", {
        src: "../../theme/graphic/cue_loading.gif",
        align: "middle",
        hspace: 10,
      })
    )
    .append($("<span/>", { text: "Loading content, please wait..." }));
}

function fStyleMailerForm() {
  $("form[name=mailer-form]").each((cMailer_i, cMailer_o) => {
    $(cMailer_o).on("submit", () => {
      let bSubmit = true;
      // sets required fields: those whose names are prefixed with "required-"
      // if form is submitted with a required field unaccomplished, display reminder
      const cRequired = $(cMailer_o)
        .find("[name|=required]:visible")
        .each((cRequired_i, cRequired_o) => {
          if (
            (isNaN($(cRequired_o).val()) && $(cRequired_o).val().length <= 1) ||
            (!isNaN($(cRequired_o).val()) && $(cRequired_o).val() == 0)
          ) {
            alert(`Please enter a value in ${$(cRequired_o).attr("title")}.`);
            const sDefaultBground = $(cRequired_o).css("background-color");
            $(cRequired_o)
              .focus()
              .css("background", "yellow")
              .on("key", function () {
                $(this).css("background", sDefaultBground);
              });
            bSubmit = false;
            return false;
          }
        });
      if (!bSubmit) {
        return false;
      }
      // if all required fields are accomplished, build the form
      let sFormAction = unescape($(cMailer_o).prop("action"));
      const oFormData = $("<table />");
      const cInput = $(cMailer_o)
        .find("input, textarea, select")
        .filter(function () {
          return !!$(this).attr("name");
        })
        .filter(":visible")
        .each((cInput_i, cInput_o) => {
          // write the form in HTML table format
          const oDataRow = oFormData.append(() => {
            if (
              $(cInput_o).prop("type") != "radio" &&
              $(cInput_o).prop("type") != "select-one"
            ) {
              return $("<tr />")
                .append($("<td />", { text: $(cInput_o).attr("title") }))
                .append(
                  $("<td />", {
                    html: $.trim($(cInput_o).val()).replace(
                      /\r\n|\r|\n/g,
                      "<br />"
                    ),
                  })
                );
            }
            if ($(cInput_o).prop("type") == "select-one") {
              return $("<tr />")
                .append($("<td />", { text: $(cInput_o).attr("title") }))
                .append(
                  $("<td />", {
                    text() {
                      if (
                        $(cInput_o).children("option:selected").val().length > 2
                      ) {
                        return $(cInput_o).children("option:selected").text();
                      }
                    },
                  })
                );
            }
            if ($(cInput_o).prop("checked") == true) {
              return $("<tr />")
                .append($("<td />", { text: $(cInput_o).attr("title") }))
                .append(
                  $("<td />", {
                    text: $(`label[for=${$(cInput_o).attr("id")}]`).text(),
                  })
                );
            }
          });
          // this replaces the subject line with provided info, as needed
          const rgxInpt = new RegExp(`#${$(cInput_o).attr("title")}#`, "gi");
          sFormAction = sFormAction.replace(rgxInpt, $(cInput_o).val());
        });
      $(cMailer_o).prop("action", sFormAction);
      $(cMailer_o).data("data", oFormData);
      const oModalCanvass = fCreateModalBackground(1);
      const oModalMessage = fSetModalMessage(1);
      const oModalContent = oModalMessage.appendTo($("body")).append(
        $("<span />")
          .append(
            $("<input />", {
              type: "button",
              value: "Continue",
              click() {
                const oParent = $(this).parent().empty();
                const oLoadMessage = fCreateLoadingIndicator(oParent);
                fLoadMailerActiveX($(cMailer_o));
                $("#modal-close, #modal-tclose").click();
              },
            })
          )
          .css("text-align", "center")
          .css("display", "block")
          .css("margin-top", "20")
      );

      fStyleModalLoader(oModalContent, oModalCanvass);
      // if ActiveX is present, form will use fLoadMailerActiveX
      // else, just submit as regular mail
      if (window.ActiveXObject) {
        return false;
      }
      $("#modal-close, #modal-tclose").click();
    });
  });
}

function fStyleMultiColumnIndex(oIndex) {
  const iIndexColumn = parseInt(
    oIndex.attr("id").substring(oIndex.attr("id").lastIndexOf("-") + 1)
  );
  if ($.isNumeric(iIndexColumn) && iIndexColumn > 1) {
    const iIndexRow = Math.ceil(
      oIndex.children("div.index-link-container").length / iIndexColumn
    );
    const iSliceStart = 0;
    const iSliceEnd = iIndexRow;

    for (let i = 0; i < iIndexColumn; i++) {
      const iCount = oIndex.children("div.index-link-container").length;
      const oIndexColumn = $("<div/>")
        .appendTo(oIndex)
        .addClass("index-column");
      const cIndexRow = oIndex
        .children("div.index-link-container")
        .slice(iSliceStart, iSliceEnd)
        .detach()
        .appendTo(oIndexColumn);
    }

    // this extra line prevents oIndex from collapsing (CSS)
    $("<div/>").appendTo(oIndex).css("clear", "both");
  }
}

function fStyleOverlayLoader(oModalContent, oModalCanvass) {
  // set default state of modal canvass
  oModalCanvass
    .hide()
    .css("min-width", "20px")
    .css("min-height", "20px")
    .find(".modal-button")
    .hide();

  // animation if ref-target's immediate child is image
  if (
    $(oModalContent).children("img").length > 0 &&
    $(oModalContent).children("img").index() == 0
  ) {
    const oImage = $(oModalContent).children("img").clone();
    const rImage = new Image();
    rImage.src = oImage.attr("src");
    // this onload is to address cross-browser idiosyncracies
    oImage.get(0).onload = function () {
      oModalCanvass.fadeIn("fast").animate(
        { width: oModalContent.width(), height: oModalContent.height() },
        {
          duration: "fast",
          complete() {
            oModalCanvass
              .append(oImage.fadeTo("fast", 1))
              .find(".modal-button")
              .show();
          },
        }
      );
    };
  }
}



function fStyleStoredForm() {
  $("div[class=stored-form]").each((cStoredForm_i, cStoredForm_o) => {
    // required: the input element needs to have an id
    // this sets the behavior of each input field based on its type.
    // if input is text or textarea, save data to cookie as you type,
    // if input is select or file, save data to cookie upon selection,
    // if input is select, fShowRelationField will show related data fields.
    // regarldess of input type, the background color changes to white.
    // background-color change is to remove color of retrieved cookie data.
    let bRetrievedData = false;
    $(cStoredForm_o)
      .find('input[type="text"], input[type="file"], textarea')
      .filter(function () {
        return $(this).attr("name");
      })
      .val(function () {
        if (localStorage.getItem($(this).attr("name"))) {
          bRetrievedData = true;
          $(this).data("default-bground", $(this).css("background-color"));
          $(this).css("background", "pink");
          return localStorage.getItem($(this).attr("name"));
        }
        return $(this).val();
      })
      .keyup(function () {
        localStorage.setItem($(this).attr("name"), $(this).val());
        $(this).css("background", $(this).data("default-bground"));
      });

    $(cStoredForm_o)
      .find("select")
      .filter(function () {
        return $(this).attr("name");
      })
      .val(function () {
        if (localStorage.getItem($(this).attr("name"))) {
          bRetrievedData = true;
          $(this).data("default-bground", $(this).css("background-color"));
          $(this).change().css("background", "pink");
          fStyleConditionalEl(
            $(this),
            localStorage.getItem($(this).attr("name"))
          );
          return localStorage.getItem($(this).attr("name"));
        }
        return $(this).val();
      })
      .change(function () {
        localStorage.setItem($(this).attr("name"), $(this).val());
        $(this).css("background", $(this).data("default-bground"));
        fStyleConditionalEl($(this), $(this).val());
      });

    $(cStoredForm_o)
      .find('input[type="radio"]')
      .filter(function () {
        return $(this).attr("name");
      })
      .each(function (cOpt_i, cOpt_o) {
        if (
          localStorage.getItem($(this).attr("name")) &&
          localStorage.getItem($(this).attr("name")) == $(cOpt_o).val()
        ) {
          bRetrievedData = true;
          fStyleConditionalEl(
            $(this),
            localStorage.getItem($(this).attr("name"))
          );
          $(this).prop("checked", "true");
          $(this).css("background", "pink");
        }
      })
      .click(function () {
        $(`input[name="${$(this).attr("name")}"]`).css("background", "");
        const sValue = $(`input[name="${$(this).attr("name")}"]:checked`).val();
        localStorage.setItem($(this).attr("name"), sValue);
        fStyleConditionalEl($(this), $(this).val());
      });

    // this sets the behavior of "toggle" radiobutton
    $(cStoredForm_o)
      .find('input[type="radio"]')
      .filter('[name$="-toggle"]')
      .each(function (cOpt_i, cOpt_o) {
        $(this).css("opacity", 0);
        if (
          localStorage.getItem($(this).attr("name")) &&
          localStorage.getItem($(this).attr("name")) == $(cOpt_o).val()
        ) {
          $(cStoredForm_o)
            .find(`label[for="${$(cOpt_o).attr("id")}"]`)
            .addClass("stored");
        }
      })
      .click(function () {
        const sChecked = $(this).attr("id");
        const cRadio = $(cStoredForm_o)
          .find(`[name="${$(this).attr("name")}"]`)
          .each((cRadio_i, cRadio_o) => {
            $(cStoredForm_o)
              .find(`label[for="${$(cRadio_o).attr("id")}"]`)
              .removeClass();
          });
        $(cStoredForm_o)
          .find(`label[for="${$(this).attr("id")}"]`)
          .addClass("checked");
      });

    // if bRetrievedData is true, then create an option to clear the stored data.
    if (bRetrievedData) {
      var oRetrievedData = $("<span />", {
        text: "The fields highlighted below contain information saved from your last session. To clear the stored data, ",
      })
        .prependTo($(cStoredForm_o))
        .css("background", "pink")
        .css("display", "inline-block")
        .css("padding", "5px 10px")
        .append(
          $("<a />", {
            text: "click here.",
            href: "javascript: void(0)",
            click() {
              const bErase = confirm(
                "Do you really want to clear all data from this form?\t"
              );
              if (bErase) {
                $(cStoredForm_o)
                  .find('input[type="text"], input[type="file"], textarea')
                  .each(function (cElement_i, cElement_o) {
                    $(this).val("");
                    localStorage.removeItem($(this).attr("name"));
                    $(this).css("background", "#ffffff");
                  });
                $(cStoredForm_o)
                  .find("select")
                  .each(function (cElement_i, cElement_o) {
                    $(this).val("");
                    localStorage.removeItem($(this).attr("name"));
                    $(this).css("background", "inherit");
                  });
                $(cStoredForm_o)
                  .find('input[type="radio"]')
                  .each(function (cElement_i, cElement_o) {
                    $(this).removeProp("checked");
                    localStorage.removeItem($(this).attr("name"));
                    $(this).css("background", "inherit");
                  });
                $(cStoredForm_o)
                  .find('input[type="radio"]')
                  .filter('[name$="-toggle"]')
                  .each((cElement_i, cElement_o) => {
                    $(cStoredForm_o)
                      .find(`label[for="${$(cElement_o).attr("id")}"]`)
                      .removeClass();
                  });
                oRetrievedData.remove();
              }
            },
          })
        );
    }
  });
}

function fDeleteStoredData() {
  const bErase = confirm(
    "Do you really want to clear all data from the form?\t"
  );
  if (bErase) {
    const cInput = $(":input").each((cInput_i, cInput_o) => {
      const sInputName = $(cInput_o).attr("name");
      const sInputValue = localStorage.removeItem(sInputName);
      location.reload();
    });
  }
}

function fTransformNode(
  oXmlNode,
  sNodeField_type,
  sNodeField_node,
  sNodeField_text
) {
  let oHtmNode;
  // if class contains 'trim', trim the text to the desired length
  if (sNodeField_type.indexOf("trim-") > -1) {
    const iLimit = sNodeField_type
      .substring(sNodeField_type.indexOf("trim-"))
      .replace("trim-", "");
    sNodeField_text = fGenericShortenText(sNodeField_text, iLimit);
  }

  // if class contains 'link', prepare the oHtmNode
  // if link is a graphic file, create ref-modal and ref-target
  // if link is non-graphic, create a regular link object
  if (sNodeField_type.indexOf("link") > -1) {
    if ($(oXmlNode).children(sNodeField_node).siblings("link")[0]) {
      const sFileType = $(oXmlNode)
        .children(sNodeField_node)
        .siblings("link")
        .text()
        .substring(
          $(oXmlNode)
            .children(sNodeField_node)
            .siblings("link")
            .text()
            .lastIndexOf(".")
        )
        .toUpperCase();
      if (sFileType != ".PNG" && sFileType != ".GIF" && sFileType != ".JPG") {
        oHtmNode = $("<a/>", {
          href: $(oXmlNode).children(sNodeField_node).siblings("link").text(),
          html: sNodeField_text,
          target() {
            return sFileType == ".HTM" ? "_self" : "_blank";
          },
        });
      } else {
        oHtmNode = $("<span />")
          .append(
            $("<span />", {
              html: sNodeField_text,
              click() {
                const oModalCanvass = fCreateModalBackground(2);
                const cRef_o = $(this).siblings(".ref-target").clone();
                fStyleModalLoader(cRef_o, oModalCanvass);
              },
            }).addClass("ref-modal")
          )
          .append(
            $("<span />")
              .addClass("ref-target")
              .append(
                $("<img />", {
                  src: $(oXmlNode)
                    .children(sNodeField_node)
                    .siblings("link")
                    .text(),
                })
              )
          );
      }
    }
  }

  // if current column is 'description', check if there's supersededby info
  if (
    sNodeField_node == "description" &&
    $(oXmlNode).children(sNodeField_node).siblings("supersededby")[0]
  ) {
    oHtmNode = $("<a />", {
      href: $(oXmlNode)
        .children(sNodeField_node)
        .siblings("supersededby")
        .text(),
      html: sNodeField_text,
    });
  }

  return oHtmNode || sNodeField_text;
}

function fBuildPartsButton() {
  xml = $.get("../../custom/tools/parts-doc.clr", (data) => {
    if (data.documentElement) {
      $xmlDoc = $(data.documentElement);
    } else {
      $xmlDoc = $.parseXML(data);
      $xmlDoc = $($xmlDoc);
    }

    fCreatePartsButton($xmlDoc.children("prt_list"));
  });

  function fCreatePartsButton(xml) {
    const docArr = fCreatePartsDocArr(xml);
    const sDocCode = $("meta[name=Filename]")
      .attr("content")
      .substr(0, 3)
      .toLowerCase();
    const bInArray = $.inArray(sDocCode, docArr) > 0;

    if (bInArray) {
      const button = $("<span/>", {
        id: "menu-button-part",
        text: "Parts Search",
        mousedown() {
          $(this).attr("class", "menu-button-select");
        },
        mouseup() {
          $(this).attr("class", "menu-button");
          location.href = "../../tko.parts.htm";
        },
      }).addClass("menu-button");

      if ($("#menu-button-favorite").length > 0) {
        $(button).insertAfter("#menu-button-favorite");
      } else {
        $(button).insertAfter("#menu-button-map");
      }
    }

    function fCreatePartsDocArr(xml) {
      const doc = $(xml).find("document");
      const arr = [];
      $(doc).each(function () {
        arr.push($(this).attr("name").toLowerCase());
      });
      return arr;
    }
  }
}

// $(document).ready(() => {
//   fCreateBIBCookie();
//   fLatestFWVer();
//   fInpStyle();
//   fDivDynamic();
//   fDivDynamic2();
//   fStyleProcedureChecklist2();
//   //   fSetSchemLink();
// });

/** ********************** */
function flaunchFlashUtil() {
  const sFlashUtilPath64 =
    "file:////C:/Program Files (x86)/Chloride Power/Flasher/Flasher.4.6.exe";
  const sFlashUtilPath32 =
    "file:////C:/Program Files/Chloride Power/Flasher/Flasher.4.6.exe";

  $.get(sFlashUtilPath64, (data) => {
    top.location.href = sFlashUtilPath64;
  }).fail(() => {
    $.get(sFlashUtilPath32, (data) => {
      top.location.href = sFlashUtilPath32;
    }).fail(() => {
      alert(
        "Flash Utility is currently not installed. You will be directed to the installation folder instead."
      );
      window.open("../../Flash/NFT/MUN_LCD");
    });
  });
}

let upsSize = "";
let modelNum = "";
let stringCnt = "";
let prevTable = "";

function updateList(target, param) {
  const sel = $(target);
  sel.empty();
  $(param).each(function () {
    sel.append($("<option>").attr("value", this.val).text(this.text));
  });
}

function updateModelList(param) {
  switch (param) {
    case "KVA225":
      var arr = [
        { val: 0, text: "" },
        { val: "16HX550FR", text: "16HX550FR" },
        { val: "16HX800FR", text: "16HX800FR" },
        { val: "16HX925FR", text: "16HX925FR" },
        { val: "UPS12300MR", text: "UPS12-300MR" },
        { val: "UPS12350MR", text: "UPS12-350MR" },
        { val: "UPS12400MR", text: "UPS12-400MR" },
        { val: "UPS12490MR", text: "UPS12-490MR" },
        { val: "UPS12540MR", text: "UPS12-540MR" },
        { val: "UPS12620MR", text: "UPS12-620MR" },
        { val: "4DHR6500", text: "4DHR6500" },
        { val: "UPS31HR5000", text: "31HR5000" },
        { val: "HR3500ET", text: "HR3500ET" },
        { val: "UPSDEKAHR4000", text: "HR4000" },
        { val: "HR5500ET", text: "HR5500ET" },
        { val: "HR7500ET", text: "HR7500ET" },
        { val: "HX400", text: "HX400" },
        { val: "ENERSYSHX505", text: "HX505" },
        { val: "S12V300FR", text: "S12V300FR" },
        { val: "S12V370FR", text: "S12V370FR" },
        { val: "S12V500FR", text: "S12V500FR" },
        { val: "S6V740FR", text: "S6V740FR" },
      ];
      break;

    case "KVA250":
      var arr = [
        { val: 0, text: "" },
        { val: "16HX550FR", text: "16HX550FR" },
        { val: "16HX800FR", text: "16HX800FR" },
        { val: "16HX925FR", text: "16HX925FR" },
        { val: "HX300FR", text: "HX300-FR" },
        { val: "HX330FR", text: "HX330-FR" },
        { val: "HX400FR", text: "HX400-FR" },
        { val: "HX505FR", text: "HX505-FR" },
        { val: "UPS12300MR", text: "UPS12-300MR" },
        { val: "UPS12350MR", text: "UPS12-350MR" },
        { val: "UPS12400MR", text: "UPS12-400MR" },
        { val: "UPS12490MR", text: "UPS12-490MR" },
        { val: "UPS12540MR", text: "UPS12-540MR" },
        { val: "UPS6620MR", text: "UPS6-620MR" },
        { val: "4DHR6500", text: "4DHR6500" },
        { val: "HR3500ET", text: "HR3500ET" },
        { val: "HR5500ET", text: "HR5500ET" },
        { val: "HR7500ET", text: "HR7500ET" },
        { val: "S12V300FR", text: "S12V300FR" },
        { val: "S12V370FR", text: "S12V370FR" },
        { val: "S12V500FR", text: "S12V500FR" },
        { val: "S6V740FR", text: "S6V740FR" },
      ];
      break;

    case "KVA300":
      var arr = [
        { val: 0, text: "" },
        { val: "16HX550FR", text: "16HX550FR" },
        { val: "16HX800FR", text: "16HX800FR" },
        { val: "16HX925FR", text: "16HX925FR" },
        { val: "HX300FR", text: "HX300-FR" },
        { val: "HX330FR", text: "HX330-FR" },
        { val: "HX400FR", text: "HX400-FR" },
        { val: "HX505FR", text: "HX505-FR" },
        { val: "HX540FR", text: "HX540-FR" },
        { val: "UPS12300MR", text: "UPS12-300MR" },
        { val: "UPS12350MR", text: "UPS12-350MR" },
        { val: "UPS12400MR", text: "UPS12-400MR" },
        { val: "UPS12490MR", text: "UPS12-490MR" },
        { val: "UPS12540MR", text: "UPS12-540MR" },
        { val: "UPS6620MR", text: "UPS6-620MR" },
        { val: "4DHR6500", text: "4DHR6500" },
        { val: "UPS31HR5000", text: "31HR5000" },
        { val: "HR3500ET", text: "HR3500ET" },
        { val: "HR4000ET", text: "HR4000ET" },
        { val: "HR5500ET", text: "HR5500ET" },
        { val: "HR7500ET", text: "HR7500ET" },
        { val: "S12V300FR", text: "S12V300FR" },
        { val: "S12V370FR", text: "S12V370FR" },
        { val: "S12V500FR", text: "S12V500FR" },
        { val: "S6V740FR", text: "S6V740FR" },
      ];
      break;

    case "KVA400":
      var arr = [
        { val: 0, text: "" },
        { val: "16HX550FR", text: "16HX550FR" },
        { val: "16HX800FR", text: "16HX800FR" },
        { val: "16HX925FR", text: "16HX925FR" },
        { val: "HX300FR", text: "HX300-FR" },
        { val: "HX330FR", text: "HX330-FR" },
        { val: "HX400FR", text: "HX400-FR" },
        { val: "HX505FR", text: "HX505-FR" },
        { val: "HX540FR", text: "HX540-FR" },
        { val: "UPS12300MR", text: "UPS12-300MR" },
        { val: "UPS12350MR", text: "UPS12-350MR" },
        { val: "UPS12400MR", text: "UPS12-400MR" },
        { val: "UPS12490MR", text: "UPS12-490MR" },
        { val: "UPS12540MR", text: "UPS12-540MR" },
        { val: "UPS6620MR", text: "UPS6-620MR" },
        { val: "4DHR6500", text: "4DHR6500" },
        { val: "HR3500ET", text: "HR3500ET" },
        { val: "HR5500ET", text: "HR5500ET" },
        { val: "HR7500ET", text: "HR7500ET" },
        { val: "S12V300FR", text: "S12V300FR" },
        { val: "S12V370FR", text: "S12V370FR" },
        { val: "S12V500FR", text: "S12V500FR" },
        { val: "S6V740FR", text: "S6V740FR" },
      ];
      break;

    case "KVA500":
      var arr = [
        { val: 0, text: "" },
        { val: "16HX550FR", text: "16HX550FR" },
        { val: "16HX800FR", text: "16HX800FR" },
        { val: "16HX925FR", text: "16HX925FR" },
        { val: "3AVR9523FR", text: "3AVR95-23FR" },
        { val: "HX300FR", text: "HX300-FR" },
        { val: "HX330FR", text: "HX330-FR" },
        { val: "HX400FR", text: "HX400-FR" },
        { val: "HX505FR", text: "HX505-FR" },
        { val: "HX540FR", text: "HX540-FR" },
        { val: "UPS12300MR", text: "UPS12-300MR" },
        { val: "UPS12350MR", text: "UPS12-350MR" },
        { val: "UPS12400MR", text: "UPS12-400MR" },
        { val: "UPS12490MR", text: "UPS12-490MR" },
        { val: "UPS12540MR", text: "UPS12-540MR" },
        { val: "UPS6620MR", text: "UPS6-620MR" },
        { val: "4DHR6500", text: "4DHR6500" },
        { val: "HR3500ET", text: "HR3500ET" },
        { val: "HR5500ET", text: "HR5500ET" },
        { val: "HR7500ET", text: "HR7500ET" },
        { val: "S12V300FR", text: "S12V300FR" },
        { val: "S12V370FR", text: "S12V370FR" },
        { val: "S12V500FR", text: "S12V500FR" },
        { val: "S6V740FR", text: "S6V740FR" },
      ];
      break;

    case "KVA600":
      var arr = [
        { val: 0, text: "" },
        { val: "16HX550FR", text: "16HX550FR" },
        { val: "16HX800FR", text: "16HX800FR" },
        { val: "16HX925FR", text: "16HX925FR" },
        { val: "HX300FR", text: "HX300-FR" },
        { val: "HX330FR", text: "HX330-FR" },
        { val: "HX400FR", text: "HX400-FR" },
        { val: "HX505FR", text: "HX505-FR" },
        { val: "HX540FR", text: "HX540-FR" },
        { val: "UPS12300MR", text: "UPS12-300MR" },
        { val: "UPS12350MR", text: "UPS12-350MR" },
        { val: "UPS12400MR", text: "UPS12-400MR" },
        { val: "UPS12490MR", text: "UPS12-490MR" },
        { val: "UPS12540MR", text: "UPS12-540MR" },
        { val: "UPS6620MR", text: "UPS6-620MR" },
        { val: "4DHR6500", text: "4DHR6500" },
        { val: "HR3500ET", text: "HR3500ET" },
        { val: "HR5500ET", text: "HR5500ET" },
        { val: "HR7500ET", text: "HR7500ET" },
        { val: "S12V300FR", text: "S12V300FR" },
        { val: "S12V370FR", text: "S12V370FR" },
        { val: "S12V500FR", text: "S12V500FR" },
        { val: "S6V740FR", text: "S6V740FR" },
      ];
      break;
    default:
      var arr = [{ val: 0, text: "" }];
  }

  updateList("#batModelNum", arr);

  const def = [{ val: 0, text: "" }];
  updateList("#batStringCnt", def);

  upsSize = param;
  modelNum = "";
  stringCnt = "";
  displayTable();
}

function updateStringList(param) {
  if (param == 0) {
    var arr = [{ val: 0, text: "" }];
  } else {
    var arr = [
      { val: 0, text: "" },
      { val: 1, text: "1 String" },
      { val: 2, text: "2 String" },
      { val: 3, text: "3 String" },
      { val: 4, text: "4 String" },
    ];
  }

  updateList("#batStringCnt", arr);

  modelNum = param;
  stringCnt = "";
  displayTable();
}

function updateStringCnt(param) {
  stringCnt = param;
  displayTable();
}

function displayTable() {
  if (upsSize == "" || modelNum == "" || stringCnt == "" || stringCnt == 0) {
    if (prevTable != "") {
      document.getElementById(prevTable).style.display = "none";
    }
    document.getElementById("emptySettings").style.display = "";
    prevTable = "emptySettings";
  } else {
    if (prevTable != "") {
      document.getElementById(prevTable).style.display = "none";
    }
    document.getElementById(upsSize + modelNum + stringCnt).style.display = "";
    prevTable = upsSize + modelNum + stringCnt;
  }
}

function fCreateBIBCookie() {
  const date = new Date();
  const coChecker = "true";
  date.setTime(date.getTime() + 300 * 1000);
  const expires = `; expires=${date.toGMTString()}`;

  document.cookie = `${"BIBdoc=" + "j1"}${expires}; path = /`;
  document.cookie = `BIBpage=${$("meta[name=Filename]").attr(
    "content"
  )}${expires}; path = /`;
}

function fLatestFWVer() {
  const ver = "V112";
  $(".fwver").text(ver);
}

function fOpenLink_4661() {
  window.open("https://applications.liebert.com/bspweb/frmModelSelect.asp");
}
function fBuildDataForTxt($form) {
  const header = $form.children(".site_info").find("input");
  const inp = $form.children(".data").find("input");
  let txtdata = "";

  $(header).each(function () {
    const name = $(this).attr("title");
    const val = $(this).val();
    const data = `${name}: ${val}<br/><br/>`;
    txtdata += data;
  });
  $(inp).each(function () {
    const name = $(this).attr("title");
    const val = $(this).val();
    const data = `${name}: ${val}<br/>`;
    txtdata += data;
  });
  return txtdata;
}

function fExporttoCSV() {
  if ($("#siteid").val() == "" || $("#tagnum").val() == "") {
    alert("Please enter a valid Site ID and Tag Number.");
  } else {
    const date = fReturnDate();
    const filename = `site${$("#siteid").val()}_tag${$(
      "#tagnum"
    ).val()}_${date}`;
    const data = fBuildDataForTxt($(".stored-form"));
    // var $div = $('<div />', {text:data}).appendTo('.stored-form')

    const IEwindow = window.open();
    IEwindow.document.write(data);
    IEwindow.document.close();
    IEwindow.document.execCommand("SaveAs", true, `${filename}_exls1.txt`);
    IEwindow.close();
  }
}

function fInpStyle() {
  const inp = $(".inp_form").css({
    width: "75px",
  });
  $(inp).click(function () {
    // var val1 = $(this).val()
    $(this).val("");
    // alert(val1)
  });
}
function fReturnDate() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!
  const yy = today.getFullYear().toString().substr(2, 2);

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  const d = mm.toString() + dd.toString() + yy.toString();
  return d;
}

function fDivDynamic2() {
  if ($(".div-dynamic2").length > 0) {
    $(".div-dynamic2").each(function (i, val) {
      const div = $(this).children("div");
      const linkholder = $("<div />")
        .insertBefore($(this))
        .addClass("quick-box");
      const label = $("<div />")
        .text("Select Content to Display:")
        .appendTo($(linkholder))
        .addClass("label")
        .css({ width: "180px" });
      const index = $("<div />").appendTo($(linkholder)).addClass("icon-index");

      $(div).each(function () {
        const title = $(this).children().eq(0).text();
        const link = $(this).attr("id", `link_${i}_${$(this).index()}`);
        $("<div />")
          .html(
            $("<span />", {
              text: title,
              href: `#${$(this).attr("id")}`,
            })
              .click(function () {
                index.find(".selected").removeClass("selected");
                const src = $(this).attr("href");
                div.filter(src).fadeIn(500);
                div.not(src).hide();
                $(this).addClass("selected");
              })
              .css({
                "padding-left": "17px",
                "text-decoration": "underline",
                cursor: "pointer",
              })
          )
          .appendTo(index);
        $(this)
          .find("a[href^=#link]")
          .click(function () {
            index.find(".selected").removeClass("selected");
            const src = $(this).attr("href");
            div.filter(src).fadeIn(500);
            div.not(src).hide();
            $(index)
              .find("span")
              .filter(function () {
                return $(this).attr("href") == src;
              })
              .addClass("selected");
          });
      });
      index.find("span").eq(0).addClass("selected");
      div.not(":first").css("display", "none");
    });
  }
}

function fStyleProcedureChecklist2() {
  const sCurrentFile = $("meta[name=Filename]").attr("content");
  $("div[class=checklist-procedure2]").each(
    (oProcCheckList2_i, oProcCheckList2_o) => {
      // move the list a bit to give space to the checkbox
      $(oProcCheckList2_o).children("ol, ul");

      // for all list items that have an ID:
      // add a checkbox, which when clicked, gets stored (jStorage) and disabled
      // before a clicked checkbox is stored, ask for confirmation from the user.
      const cStep = $(oProcCheckList2_o).find("li[id^=step]");
      cStep.each((cStep_i, cStep_o) => {
        const jStoreKey = `${sCurrentFile}-${$(cStep_o).prop("id")}`;
        const bPerformed = localStorage.getItem(jStoreKey) ?? 0;
        $("<input>", {
          type: "checkbox",
          change() {
            if ($(this).prop("checked")) {
              const sConfirm =
                "Please confirm that you have performed this step by clicking OK.\r\n" +
                "If you have not performed this step yet, please click CANCEL.";

              const oConfirm = window.confirm(sConfirm);
              if (oConfirm) {
                localStorage.setItem(jStoreKey, 1);
                $(this).prop("disabled", true);
              } else {
                $(this).prop("checked", false);
              }
            }
          },
        })
          .prependTo($(cStep_o))
          .css("position", "absolute")
          .css("left", -5)
          .prop("checked", () => bPerformed == 1)
          .prop("disabled", () => bPerformed == 1)
          .css("background", () => (bPerformed == 1 ? "pink" : "#ffffff"));
      });

      // check if any of the procedures have been performed already;
      // if so, add a note on how to clear the stored-and-disabled checkboxes
      if (
        $(oProcCheckList2_o).find("input[type=checkbox]:checked").length > 0
      ) {
        $("<span />")
          .prependTo($(oProcCheckList2_o))
          .append(
            $("<span />", {
              html: "The highlighted checkboxes identify the steps that you have performed.",
            })
              .css("background", "pink")
              .css("padding", "5px")
              .css("white-space", "nowrap")
              .addClass("tip-checklist-procedure")
          );
      }
    }
  );
}

function fCalcPNU1530() {
  fClearSelect();
  $("input").val("");

  $("select#rating").change(() => {
    fCalcPNU1530Val();
    // fCalcPNU1402Val()
  });

  $("input#padc").keyup(function () {
    if (!isNaN($(this).val())) {
      fCalcPNU1530Val();
      // fCalcPNU1402Val()
    } else {
      $(this).val("");
    }
  });

  function fCalcPNU1530Val() {
    const inpRateArr = $("#rating").val().split("_");
    const inpRate = parseInt(inpRateArr[0]);
    const inpMaxAmp = parseInt(inpRateArr[1]);
    const inpPADC = parseInt($("input#padc").val());

    const error = $("<td />", {
      html: `The entered value must not exceed <strong>${inpMaxAmp}</strong> for ${inpRate}kVA.`,
    }).css({
      color: "red",
      "font-size": "0.9em",
      "font-style": "italic",
      "background-color": "transparent",
      display: "none",
    });

    $("#padc").closest("tr").find("td").not(":eq(0)").remove();
    if (inpPADC != "") {
      const val = inpPADC * 10;
      if (!isNaN(val) && inpMaxAmp >= inpPADC) {
        $("#pnu1530").html(`<strong>${val}</strong>`);
        $("input#ADC").removeAttr("disabled");
      } else if (inpPADC > inpMaxAmp) {
        $(error).appendTo($("#padc").closest("tr")).fadeIn("fast");
        $("#pnu1530").html("");
        $("input#ADC").attr("disabled", "disabled");
        $("#pnu1402").html("");
      } else {
        $("#pnu1530").html("");
        $("input#ADC").attr("disabled", "disabled");
        $("#pnu1402").html("");
      }
    }
  }
}

function fCalcPNU1402() {
  fClearSelect();
  $("input").val("");

  $("#ADC, #p1530").keyup(() => {
    $("#ADC").closest("tr").find("td").not(":eq(0)").remove();

    if ($("#ADC").val() != "" && $("#p1530").val() != "") {
      const vADC = parseInt($("#ADC").val());
      const vP1530 = parseInt($("#p1530").val());
      const error = $("<td />", {
        html: `The entered value must not exceed <strong>${
          vP1530 / 10
        }</strong>.`,
      }).css({
        color: "red",
        "font-size": "0.9em",
        "font-style": "italic",
        "background-color": "transparent",
        display: "none",
      });
      const val = (vADC * 1000) / vP1530;
      if (vADC <= vP1530) {
        $("#pnu1402").html(`<strong>${val.toFixed(0)}</strong>`);
      } else if (vADC > vP1530) {
        $(error).appendTo($("#ADC").closest("tr")).fadeIn("fast");
        $("#pnu1402").html("");
      } else {
        $("#pnu1402").html("");
      }
    }
  });
}

function fImgOverLay() {
  const cImgLay = $("[class|=lay]");
  const cRefModal = $(".ref-modal")
    .filter(function () {
      return $(this).siblings(".ref-target").find("[class|=lay]")[0];
    })
    .css({
      background: "none",
      "padding-right": "0px",
    });

  if ($("#lay-board").length > 0) {
    const imgDiv = $("#lay-board")
      .clone()
      .addClass("imgLayBrd")
      .removeAttr("id");
    $(imgDiv).prependTo(cImgLay.closest("div"));
  }

  // calculate size and position of overlay
  $(cImgLay).ready(() => {
    $(cImgLay).load(function () {
      const layClass = $(this).attr("class");
      const xpos = parseInt(
        layClass.substring(
          layClass.substring().indexOf("-") + 1,
          layClass.substring().indexOf("_") + 1
        )
      );
      const ypos = parseInt(
        layClass.substring(layClass.substring().indexOf("_") + 1)
      );
      const layWidth = $(this).width();
      const wImgBrd = $(this).prev("img").width();
      const hImgBrd = $(this).prev("img").height();
      const widthRatio = layWidth / wImgBrd;
      $(this)
        .css({
          position: "absolute",
          top: `${(100 * xpos) / hImgBrd}%`,
          left: `${(100 * ypos) / wImgBrd}%`,
          width: `${100 * widthRatio}%`,
        })
        .closest("div")
        .css({
          position: "relative",
          "max-width": "600px",
        })
        .closest(".ref-target")
        .css({
          margin: "0",
          position: "relative",
          "max-width": wImgBrd,
        })
        .closest("#modal-message")
        .css({
          width: "auto",
          "padding-top": "0px",
          "padding-bottom": "0px",
        });
    });
  });
}
