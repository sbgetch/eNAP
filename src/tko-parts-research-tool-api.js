let prt_oTimer;
// let prt_oFilteredParts = null;
const partsResearchToolData = [
  // ...(Array.isArray(partsResearchToolData_1) ? partsResearchToolData_1 : []),
  // ...(Array.isArray(partsResearchToolData_2) ? partsResearchToolData_2 : []),
  // ...(Array.isArray(partsResearchToolData_3) ? partsResearchToolData_3 : []),
  // ...(Array.isArray(partsResearchToolData_4) ? partsResearchToolData_4 : []),
  // ...(Array.isArray(partsResearchToolData_5) ? partsResearchToolData_5 : []),
  // ...(Array.isArray(partsResearchToolData_6) ? partsResearchToolData_6 : []),
];

function fLoadPartResearchTool() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  fStyleFilterableTable(root);
  fStyleSortableTable(root);
  fStyleDocumentTips(root);
  fStyleContentModeless(root);
  fStyleContentModal(root);
  fStyleContentToggle(root);

  fSelectorProduct_Create();
}

function addEventOncePrt(el, event, handler) {
  const key = `data-init-${event}`;
  if (el.hasAttribute(key)) return;
  el.addEventListener(event, handler);
  el.setAttribute(key, "1");
}

async function fSelectorProduct_Create() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const selector = root.querySelector("#selector");
  if (!selector) return;

  if (root.querySelector("#product-selector")) return;

  const oModalContent = fStatusIndicator_Modal_2();
  const oModalCanvass = fCreateModalBackground(-1);

  const modal = fStyleModalLoader(oModalContent, oModalCanvass);

  try {
    const products = await prtApiCached("/products");

    if (!Array.isArray(products) || products.length === 0) {
      selector.textContent = "You do not have access to any of the parts databases at this time.";
      return;
    }

    const select = document.createElement("select");
    select.id = "product-selector";

    addEventOncePrt(select, "change", () => {
      const bom = root.querySelector("#bom");
      if (bom) bom.innerHTML = "";

      root.querySelector("#segment-selector")?.remove();
      root.querySelector("#type-selector")?.remove();

      if (select.value) {
        fSelectorSegment_Create(select.value);
      }
    });

    const defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.textContent = "-- select a product --";
    select.appendChild(defaultOpt);

    products.forEach((item) => {
      const opt = document.createElement("option");
      opt.textContent = item.product_name;
      opt.value = item.id;
      select.appendChild(opt);
    });

    selector.appendChild(select);
  } catch (err) {
    console.error("Failed loading products", err);
    selector.textContent = "Failed to load products.";
  } finally {
    modal.wrapper?.remove();
    modal.bground?.remove();
    document.querySelector("#modal-notification")?.remove();
  }
}

async function fSelectorSegment_Create(sProductId) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const selector = root.querySelector("#selector");
  if (!selector) return;

  let cSegmentNode = [];

  const oModalContent = fStatusIndicator_Modal_2();
  const oModalCanvass = fCreateModalBackground(-1);

  const modal = fStyleModalLoader(oModalContent, oModalCanvass);

  try {
    const segments = await prtApiCached(`/products/${sProductId}/segments`);

    if (!Array.isArray(segments) || segments.length === 0) {
      console.warn("No segments found for product:", sProductId);
      return;
    }

    cSegmentNode = segments.map((seg) => ({
      id: seg.id,
      name: seg.name,
    }));

    if (cSegmentNode.length > 1) {
      // idempotency guard — prevent duplicate select
      if (root.querySelector("#segment-selector")) return;

      const select = document.createElement("select");
      select.id = "segment-selector";

      addEventOncePrt(select, "change", () => {
        const bom = root.querySelector("#bom");
        if (bom) bom.innerHTML = "";

        root.querySelector("#type-selector")?.remove();

        if (select.value) {
          const oSearchOptionBox = document.createElement("span");
          oSearchOptionBox.id = "type-selector";
          selector.appendChild(oSearchOptionBox);

          const oModalContent = fStatusIndicator_Modal();
          const oModalCanvass = fCreateModalBackground(-1);

          const modal = fStyleModalLoader(oModalContent, oModalCanvass);

          (async () => {
            try {
              await fSelectorProduct_Load(sProductId, select.value);
            } finally {
              modal.wrapper?.remove();
              modal.bground?.remove();
            }
          })();
        }
      });

      const defaultOpt = document.createElement("option");
      defaultOpt.value = "";
      defaultOpt.textContent = "-- select a filter --";
      select.appendChild(defaultOpt);

      cSegmentNode.forEach((segment) => {
        const opt = document.createElement("option");
        opt.textContent = segment.name;
        opt.value = segment.id;
        select.appendChild(opt);
      });

      selector.appendChild(select);
      select.focus();
    } else {
      // only one segment — skip straight to loading
      const bom = root.querySelector("#bom");
      if (bom) bom.innerHTML = "";

      root.querySelector("#type-selector")?.remove();

      const oSearchOptionBox = document.createElement("span");
      oSearchOptionBox.id = "type-selector";
      selector.appendChild(oSearchOptionBox);

      const oModalContent = fStatusIndicator_Modal();
      const oModalCanvass = fCreateModalBackground(-1);

      const modal = fStyleModalLoader(oModalContent, oModalCanvass);

      (async () => {
        try {
          await fSelectorProduct_Load(sProductId, cSegmentNode[0].id);
        } finally {
          modal.wrapper?.remove();
          modal.bground?.remove();
        }
      })();
    }
  } catch (err) {
    console.error("Failed loading segments", err);
    return;
  } finally {
    modal.wrapper?.remove();
    modal.bground?.remove();
    document.querySelector("#modal-notification")?.remove();
  }
}

async function fSelectorProduct_Load(sProductId, sSegmentId) {
  const payload = await prtApiCached(`/products/${sProductId}/segments/${sSegmentId}/parts`);

  if (!payload?.segments) return;

  const oFilteredParts = payload.segments[sSegmentId]?.parts || [];

  fSelectorType_Create(oFilteredParts);

  document.querySelector("#modal-notification").remove();
}

function fSelectorType_Create(oFilteredParts) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const oSearchOptionBox = root.querySelector("#type-selector");
  if (!oSearchOptionBox) return;

  // idempotency guard — prevent duplicate type selectors
  if (oSearchOptionBox.querySelector("span")) return;

  function createTypeOption({ text, value, id = null }) {
    const span = document.createElement("span");
    span.textContent = text;
    if (id) span.id = id;

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.value = value;
    radio.name = "type-selector";
    span.prepend(radio);

    addEventOncePrt(span, "click", () => {
      fSelectorType_Load(value, oFilteredParts);
    });

    return span;
  }

  oSearchOptionBox.appendChild(createTypeOption({ text: "Assembly Browser", value: "browser" }));
  oSearchOptionBox.appendChild(createTypeOption({ text: "Quick Search", value: "search", id: "quick-search" }));
}

function fSelectorType_Load(sTypeSelected, oFilteredParts) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  // uncheck all radios, check the selected one
  root.querySelectorAll("#type-selector input[type='radio']").forEach((radio) => {
    radio.checked = radio.value === sTypeSelected;
  });

  clearTimeout(prt_oTimer);
  cSearchResult = [];

  const bom = root.querySelector("#bom");
  if (bom) bom.innerHTML = "";

  root.querySelector("#search-box")?.remove();

  switch (sTypeSelected) {
    case "browser":
      setTimeout(() => {
        fComponentCollection_Scope(oFilteredParts);
      }, 10);
      break;
    default:
      fSearchBox_Create(oFilteredParts);
      break;
  }
}

function fComponentCollection_Scope(oFilteredParts, sSearch, cRemove, sClass, iCompQty) {
  clearTimeout(prt_oTimer);
  cSearchResult = [];

  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const bom = root.querySelector("#bom");

  if (Array.isArray(cRemove) && cRemove.length > 0) {
    cRemove.forEach((el) => {
      if (el instanceof HTMLElement) el.remove();
    });
  }

  if (sSearch) {
    if (sSearch.length < 3) {
      alert("Please enter at least 3 characters.");
      return;
    }

    // Only wipe #bom on fresh search, not on explode/implode
    if (!cRemove && bom) bom.innerHTML = "";

    const oCompBox = fComponentBox_Create("#bom", sClass || "exploded");

    // Always scan the full parts list for both explode and implode
    // Explode: needs all parts to find children (by parent field)
    // Implode: needs all parts to find parents (by number field)
    const cCompChild = oFilteredParts;

    const oLoadMessage = fStatusIndicator_Loading(oCompBox);

    setTimeout(() => {
      fComponentCollection_Explode(oFilteredParts, oLoadMessage, sSearch, cCompChild, 0, cRemove, sClass, iCompQty);
    }, 500);
  } else {
    if (bom) bom.innerHTML = "";
    const oCompBox = fComponentBox_Create("#bom");
    const oLoadMessage = fStatusIndicator_Loading(oCompBox);

    setTimeout(() => {
      fComponentCollection_Explode(oFilteredParts, oLoadMessage, sSearch, oFilteredParts, 0, cRemove, sClass, iCompQty);
    }, 500);
  }
}

function fComponentCollection_Explode(oFilteredParts, oLoadMessage, sSearch, cCompChild, iSegmentStart, cRemove, sClass, iCompQty) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const iSegmentSlice = 50;

  const loadingExtraText = root.querySelector("#loading-extra-text");
  if (loadingExtraText) {
    const sLoadPercent = ((iSegmentStart / cCompChild.length) * 100).toFixed(0);
    loadingExtraText.textContent = ` (${sLoadPercent} %) `;
  }

  if (sSearch) {
    if (iSegmentStart < cCompChild.length) {
      const iSegmentEnd = iSegmentStart + iSegmentSlice;
      const cSegment = cCompChild.slice(iSegmentStart, iSegmentEnd);

      if (cRemove) {
        if (sClass === "exploded") {
          // Find parts whose parent array includes the clicked assembly number
          const cSegmentResult = cSegment.filter((part) => {
            const parents = Array.isArray(part.parent) ? part.parent : part.parent != null ? [String(part.parent)] : [];
            return parents.includes(String(sSearch));
          });
          cSearchResult.push(...cSegmentResult);
        }

        if (sClass === "imploded") {
          if (iSegmentStart === 0) {
            // Step 1: find the clicked part itself and grab its parent array
            const oClickedPart = oFilteredParts.find((part) => {
              if (iCompQty) {
                return String(part.number) === String(sSearch) && String(part.quantity) === String(iCompQty);
              }
              return String(part.number) === String(sSearch);
            });

            // cCompParent is now a flat array of parent number strings
            cCompParent = oClickedPart
              ? Array.isArray(oClickedPart.parent)
                ? oClickedPart.parent.map(String)
                : oClickedPart.parent != null
                ? [String(oClickedPart.parent)]
                : []
              : [];
          }

          // Step 2: find parts whose number is in cCompParent
          const cSegmentResult = cSegment.filter((part) => {
            const idx = cCompParent.indexOf(String(part.number));
            if (idx !== -1) {
              // Remove to avoid duplicates, matching legacy splice behavior
              cCompParent.splice(idx, 1);
              return true;
            }
            return false;
          });
          cSearchResult.push(...cSegmentResult);
        }
      } else {
        // Plain search box — filter by selected column
        const sSearchColumn = root.querySelector("#search-column-var")?.value;
        const cSegmentResult = cSegment.filter((part) =>
          String(part[sSearchColumn] || "")
            .toUpperCase()
            .includes(sSearch.trim().toUpperCase())
        );
        cSearchResult.push(...cSegmentResult);
      }

      prt_oTimer = setTimeout(() => {
        fComponentCollection_Explode(oFilteredParts, oLoadMessage, sSearch, cCompChild, iSegmentEnd, cRemove, sClass, iCompQty);
      }, 10);
    } else {
      // All segments processed — render results
      clearTimeout(prt_oTimer);
      if (oLoadMessage?.parentNode) oLoadMessage.remove();

      if (cRemove) {
        const sListType = sClass === "exploded" ? " Components " : " - Where Used ";
        fComponentBox_AddHeader(cSearchResult, sSearch + sListType, oFilteredParts);
      } else {
        fComponentBox_AddHeader(cSearchResult, "Search Results ", oFilteredParts);
      }
    }
  } else {
    // No search — browser mode, show model numbers
    if (iSegmentStart < cCompChild.length) {
      const iSegmentEnd = iSegmentStart + iSegmentSlice;
      const cSegmentResult = cCompChild.slice(iSegmentStart, iSegmentEnd).filter((part) => part.modelno === true);
      cSearchResult.push(...cSegmentResult);

      prt_oTimer = setTimeout(() => {
        fComponentCollection_Explode(oFilteredParts, oLoadMessage, sSearch, cCompChild, iSegmentEnd, cRemove, sClass, iCompQty);
      }, 10);
    } else {
      clearTimeout(prt_oTimer);
      if (oLoadMessage?.parentNode) oLoadMessage.remove();

      const productSelector = root.querySelector("#product-selector");
      const sProductName = productSelector?.options[productSelector.selectedIndex]?.text || "";
      fComponentBox_AddHeader(cSearchResult, sProductName + " Model Numbers ", oFilteredParts);
    }
  }
}

function fSearchBox_Create(oFilteredParts) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const oSearchContainer = root.querySelector("#type-selector");
  if (!oSearchContainer) return;

  // idempotency guard
  if (root.querySelector("#search-box")) return;

  const oSearchCriteriaBox = document.createElement("span");
  oSearchCriteriaBox.id = "search-box";

  const oSearchCriteriaVar = document.createElement("span");
  oSearchCriteriaVar.id = "search-criteria-var";

  const oSearchVarStr = document.createElement("input");
  oSearchVarStr.id = "search-varstring";
  oSearchVarStr.type = "text";
  addEventOncePrt(oSearchVarStr, "keyup", (e) => {
    if (e.keyCode === 13) {
      fComponentCollection_Scope(oFilteredParts, oSearchVarStr.value);
    }
  });

  const oColumnVar = document.createElement("select");
  oColumnVar.id = "search-column-var";
  addEventOncePrt(oColumnVar, "keyup", (e) => {
    if (e.keyCode === 13) {
      fComponentCollection_Scope(oFilteredParts, oSearchVarStr.value);
    }
  });

  [
    { value: "number", text: "Part Number" },
    { value: "description", text: "Description" },
  ].forEach(({ value, text }) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = text;
    oColumnVar.appendChild(opt);
  });

  const oSearchImg = document.createElement("img");
  oSearchImg.id = "search-ico";
  oSearchImg.title = "Search";
  oSearchImg.src = tkoIcons.search;
  addEventOncePrt(oSearchImg, "click", () => {
    fComponentCollection_Scope(oFilteredParts, oSearchVarStr.value);
  });

  oSearchCriteriaVar.appendChild(oSearchVarStr);
  oSearchCriteriaVar.appendChild(oColumnVar);
  oSearchCriteriaBox.appendChild(oSearchCriteriaVar);
  oSearchCriteriaBox.appendChild(oSearchImg);
  oSearchContainer.appendChild(oSearchCriteriaBox);

  oSearchVarStr.focus();
}

function fComponentBox_Create(oCanvass, sClass) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  sClass = sClass || "exploded";
  const iCompCounter = root.querySelectorAll("[class*='component-']").length;

  const oCompBox = document.createElement("div");
  oCompBox.classList.add(`component-${sClass}-${iCompCounter}`);

  const oCanvassEl = root.querySelector(oCanvass);
  if (oCanvassEl) oCanvassEl.prepend(oCompBox);

  return oCompBox;
}

function fComponentBox_AddHeader(cCompChild, sSearch, oFilteredParts) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const oCompBox = root.querySelector("#bom [class*='component-']");
  if (!oCompBox) return;

  oCompBox._prt_filteredParts = oFilteredParts;

  // header
  const oCompHeader = document.createElement("div");
  oCompHeader.classList.add("header");

  // title
  const oCompTitle = document.createElement("div");
  oCompTitle.classList.add("header-title");

  const oTitleSpan = document.createElement("span");
  oTitleSpan.textContent = sSearch;

  const oModelCount = document.createElement("span");
  oModelCount.classList.add("model-count");

  oCompTitle.appendChild(oTitleSpan);
  oCompTitle.appendChild(oModelCount);
  oCompHeader.appendChild(oCompTitle);

  // labels
  const oCompLabel = document.createElement("div");
  oCompLabel.classList.add("label");

  [
    { text: "Number", cls: "number" },
    { text: "Description", cls: "description" },
    { text: "Item #", cls: "item" },
    { text: "Qty.", cls: "quantity" },
    { text: "Use?", cls: "info" },
  ].forEach(({ text, cls }) => {
    const span = document.createElement("span");
    span.textContent = text;
    span.classList.add(cls);
    oCompLabel.appendChild(span);
  });

  oCompHeader.appendChild(oCompLabel);
  oCompBox.appendChild(oCompHeader);

  // details
  const oCompDetails = document.createElement("div");
  oCompDetails.classList.add("details");
  oCompBox.appendChild(oCompDetails);

  // sort parts by part number, store original index
  const cCompChildSorted = cCompChild.map((part, i) => `${part.number} oRowIndex:${i}`).sort();

  const oFilterContainer = fFilterComponentBox_Create(oCompTitle);
  const oCloseContainer = fCloseComponentBox_Create(oCompTitle);

  fComponentBox_AddPagination(oCompDetails, cCompChild, cCompChildSorted);
}

function fComponentBox_AddPagination(oCompDetails, cCompChild, cCompChildSorted) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const iLines = 100;
  const oCompBox = oCompDetails.closest("[class*='component-']");
  const iPageFlip = Math.ceil(cCompChildSorted.length / iLines);

  if (!oCompDetails.previousElementSibling?.classList.contains("pagination") && iPageFlip > 1) {
    const oPagination = document.createElement("span");
    oPagination.textContent = "Pages: ";
    oPagination.classList.add("pagination");
    oPagination.dataset.totalLines = cCompChildSorted.length;
    oCompDetails.insertAdjacentElement("afterend", oPagination);

    for (let i = 1; i <= iPageFlip; i++) {
      const cCompScope = cCompChildSorted.splice(0, iLines);
      const oPageSelect = document.createElement("span");
      oPageSelect.textContent = i;

      addEventOncePrt(oPageSelect, "click", () => {
        oPagination.querySelectorAll("span").forEach((s) => s.classList.remove("selected"));
        oPageSelect.classList.add("selected");
        fCloseComponentBox_Scope(oPageSelect);

        const oLoadingIndicator = fBuildLoadingIndicator(oCompDetails);

        // defer AddItem so the browser paints the loading indicator first
        setTimeout(() => {
          oLoadingIndicator.remove();
          oCompDetails.innerHTML = "";
          fComponentBox_AddItem(cCompScope, oCompDetails, cCompChild);
          fComponentBox_EmptyCheck(oCompBox);
        }, 100);
      });

      oPagination.appendChild(oPageSelect);
    }

    // trigger first page
    oPagination.querySelectorAll("span")[0].click();
  } else {
    // const oLoadingIndicator = fBuildLoadingIndicator(oCompDetails);

    // oLoadingIndicator.remove();
    fBuildLoadingIndicator(oCompDetails);
    fComponentBox_AddItem(cCompChildSorted, oCompDetails, cCompChild);
    fComponentBox_EmptyCheck(oCompBox);
    // defer AddItem so the browser paints the loading indicator first
    // setTimeout(() => {
    // }, 100);
  }
}

function fComponentBox_AddItem(cCompChildSorted, oCompDetails, cCompChild, iSlice) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const iSliceAdd = 20;
  const iSliceFloor = iSlice || 0;
  const iSliceCeil = iSliceFloor + iSliceAdd;
  const cForWriting = cCompChildSorted.slice(iSliceFloor, iSliceCeil);

  cForWriting.forEach((entry) => {
    const oForWriting = entry.toString();
    const iRowIndex = Number(oForWriting.substring(oForWriting.lastIndexOf("oRowIndex")).replace("oRowIndex:", ""));
    const part = cCompChild[iRowIndex];

    const bModel = part.modelno === true;
    const sDrawing = part.drawing || "";
    const bDrawing = sDrawing && !["", "NONE", "CLOSE ACCOUNT", "SEE INFO BELOW", "SEE CATALOG"].includes(sDrawing);

    const oCompLine = document.createElement("div");
    oCompLine.classList.add(part.assembly ? "line-assy" : "line-item");

    // key
    const oKey = document.createElement("span");
    oKey.classList.add("key");
    oKey.textContent = part.assembly ? "+" : "";
    oCompLine.appendChild(oKey);

    // number
    const oNum = document.createElement("span");
    oNum.classList.add("number");
    oNum.innerHTML = (part.number || "").trim().replace(/\[/g, "<").replace(/\]/g, ">");
    addEventOncePrt(oNum, "click", () => fComponentBox_ClickItem(oNum, "exploded"));
    oCompLine.appendChild(oNum);

    // description
    const oDsc = document.createElement("span");
    oDsc.classList.add("description");
    oDsc.textContent = part.description || "";
    addEventOncePrt(oDsc, "click", () => fComponentBox_ClickItem(oDsc, "exploded"));
    oCompLine.appendChild(oDsc);

    // item
    const oItm = document.createElement("span");
    oItm.classList.add("item");
    oItm.textContent = part.item || "";
    addEventOncePrt(oItm, "click", () => fComponentBox_ClickItem(oItm, "exploded"));
    oCompLine.appendChild(oItm);

    // quantity
    const oQty = document.createElement("span");
    oQty.classList.add("quantity");
    oQty.textContent = part.quantity || "";
    addEventOncePrt(oQty, "click", () => fComponentBox_ClickItem(oQty, "exploded"));
    oCompLine.appendChild(oQty);

    // use
    const oUse = document.createElement("span");
    oUse.classList.add(bModel ? "info-model" : "info-part");
    oUse.innerHTML = bModel ? "&nbsp;" : "?";
    oUse.title = bModel ? "" : "Where Used?";
    addEventOncePrt(oUse, "click", () => {
      bModel ? fComponentBox_ClickItem(oUse, "exploded") : fComponentBox_ClickItem(oUse, "imploded");
    });
    oCompLine.appendChild(oUse);

    oCompDetails.appendChild(oCompLine);

    // update model counter
    const oModelCounter = oCompDetails.closest("[class*='component-']").querySelector(".model-count");
    const oPagination = oCompDetails.parentElement.querySelector(".pagination");

    if (oPagination) {
      const oSelected = oPagination.querySelector(".selected");
      const iSelectedPage = oSelected ? Number(oSelected.textContent) : 1;
      const iCompFloor = iSelectedPage === 1 ? 1 : (iSelectedPage - 1) * 100 + 1;
      const iCompCeil =
        iSelectedPage === 1
          ? oCompDetails.querySelectorAll("div[class*='line-']").length
          : oCompDetails.querySelectorAll("div[class*='line-']").length + iCompFloor - 1;
      const iTotalLines = Number(oPagination.dataset.totalLines);
      oModelCounter.innerHTML = `&nbsp;(Showing ${iCompFloor}-${iCompCeil} of ${iTotalLines} records)`;
    } else if (oCompDetails.querySelectorAll("div[class*='line-']").length > 0) {
      oModelCounter.innerHTML = `&nbsp;(${oCompDetails.querySelectorAll("div[class*='line-']").length} records)`;
    }
  });

  if (cCompChildSorted.length > iSliceCeil) {
    prt_oTimer = setTimeout(() => {
      fComponentBox_AddItem(cCompChildSorted, oCompDetails, cCompChild, iSliceCeil);
    }, 10);
  } else {
    clearTimeout(prt_oTimer);
    oCompDetails.closest("[class*='component-']").querySelector(".loading-indicator")?.remove();
  }
}

// helpers
function fFilterComponentBox_Create(oBox) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const oFilterContainer = document.createElement("span");
  oFilterContainer.classList.add("filter-holder");

  const oFilterIconBox = document.createElement("span");

  const oFilterIcon = document.createElement("img");
  oFilterIcon.src = tkoIcons.filter;
  oFilterIcon.title = "Filter the items in the current list";
  oFilterIcon.classList.add("filter-icon");

  addEventOncePrt(oFilterIcon, "click", () => {
    const oFilterBox = oFilterIcon.closest("[class*='component-']").querySelector(".filter-text");
    if (!oFilterBox) {
      const oFilterTextBox = document.createElement("span");
      oFilterTextBox.classList.add("filter-text");

      const oFilter = document.createElement("input");
      oFilter.type = "text";
      oFilter.title = "Filter the items in the current list";
      oFilter.size = 30;

      addEventOncePrt(oFilter, "keyup", () => {
        const sSearchString = oFilter.value.toLowerCase();
        const cCompLine = oFilterIcon.closest("[class*='component-'], [id*='assembly']").querySelectorAll("[class*='line-']");
        cCompLine.forEach((line) => {
          line.style.display = line.textContent.toLowerCase().includes(sSearchString) ? "block" : "none";
        });
      });

      oFilterTextBox.appendChild(oFilter);
      oFilterContainer.prepend(oFilterTextBox);
      oFilter.focus();
    } else {
      oFilterBox.remove();
      const cCompLine = oFilterIcon.closest("[class*='component-'], [id*='assembly']").querySelectorAll("[class*='line-']");
      cCompLine.forEach((line) => (line.style.display = "block"));
    }
  });

  oFilterIconBox.appendChild(oFilterIcon);
  oFilterContainer.appendChild(oFilterIconBox);
  oBox.appendChild(oFilterContainer);

  return oFilterContainer;
}

function fCloseComponentBox_Create(oBox) {
  const oCloseContainer = document.createElement("span");
  oCloseContainer.classList.add("close-button");

  const oCloseIcon = document.createElement("img");
  oCloseIcon.src = tkoIcons.close;
  oCloseIcon.title = "Close Window";

  addEventOncePrt(oCloseIcon, "click", () => {
    fCloseComponentBox_Scope(oCloseIcon, true);
  });

  oCloseContainer.appendChild(oCloseIcon);
  oBox.appendChild(oCloseContainer);

  return oCloseContainer;
}

function fCloseComponentBox_Scope(obj, bSelfIncl) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const oObjClass = obj.closest("[class*='component-']")?.getAttribute("class") || "";
  const iCompLevel = Number(oObjClass.substring(oObjClass.lastIndexOf("-") + 1));

  const cRemove = [...root.querySelectorAll("[class*='component-']")].filter((el) => {
    const sClass = el.getAttribute("class") || "";
    const iClass = Number(sClass.substring(sClass.lastIndexOf("-") + 1));
    return bSelfIncl ? iClass >= iCompLevel : iClass > iCompLevel;
  });

  cRemove.forEach((el) => fCloseComponentBox_Close(el));
}

function fCloseComponentBox_Close(oComRemove) {
  oComRemove.style.transition = "height 0.2s";
  oComRemove.style.overflow = "hidden";
  oComRemove.style.height = oComRemove.offsetHeight + "px";

  requestAnimationFrame(() => {
    oComRemove.style.height = "0px";
    oComRemove.addEventListener("transitionend", () => oComRemove.remove(), { once: true });
  });
}

function fBuildLoadingIndicator(oTarget) {
  const oLoadingIndicator = document.createElement("div");
  oLoadingIndicator.classList.add("loading-indicator");

  const oLoadingWrapper = document.createElement("div");
  oLoadingWrapper.classList.add("wrapper");
  oLoadingWrapper.style.opacity = "0.1";

  const oTable = document.createElement("table");
  const oTr = document.createElement("tr");
  const oTd = document.createElement("td");

  const oImg = document.createElement("img");
  oImg.src = tkoIcons.loading;
  oTd.appendChild(oImg);
  oTr.appendChild(oTd);
  oTable.appendChild(oTr);
  oLoadingIndicator.appendChild(oLoadingWrapper);
  oLoadingIndicator.appendChild(oTable);
  oTarget.appendChild(oLoadingIndicator);

  return oLoadingIndicator;
}

function fComponentBox_EmptyCheck(oCompBox) {
  const oDetails = oCompBox.querySelector(".details");
  if (oDetails && oDetails.children.length === 0) {
    const oSpan = document.createElement("span");
    oSpan.classList.add("description");
    oSpan.textContent = "No record found for the search criteria.";
    oDetails.appendChild(oSpan);
  }
}

function fComponentBox_ClickItem(obj, sClass) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const oDetails = obj.closest(".details");
  if (oDetails) {
    oDetails.querySelectorAll("[class$='-exploded'], [class$='-imploded']").forEach((el) => {
      el.className = el.className.replace("-exploded", "").replace("-imploded", "");
    });
  }

  const oLine = obj.closest("[class*='line-']");
  if (oLine) oLine.className += `-${sClass}`;

  const oCompBox = obj.closest("[class*='component-']");
  const sObjClass = oCompBox?.className || "";
  const iCompLevel = Number(sObjClass.substring(sObjClass.lastIndexOf("-") + 1));

  // safely collect components to remove
  const cRemove = [...root.querySelectorAll("[class*='component-']")].filter((el) => {
    const sClass = el.className || "";
    const iClass = Number(sClass.substring(sClass.lastIndexOf("-") + 1));
    return iClass > iCompLevel;
  });

  // ensure prt_oFilteredParts is always an array
  const oOwningCompBox = [...root.querySelectorAll("[class*='component-']")].find((el) => el._prt_filteredParts);
  const parts = oOwningCompBox?._prt_filteredParts || [];

  const oKey = oLine?.querySelector(".key");
  const sSearch = oLine?.querySelector(".number")?.textContent || "";
  const iCompQty = oLine?.querySelector(".quantity")?.textContent || "";

  if (sClass === "imploded" || (sClass === "exploded" && oKey?.textContent.trim() !== "")) {
    fComponentCollection_Scope(parts, sSearch, cRemove, sClass, iCompQty);
  } else {
    cRemove.forEach((el) => fCloseComponentBox_Close(el));
  }
}

function fStatusIndicator_Modal() {
  // in light DOM
  document.querySelector("#modal-notification")?.remove();

  const oModalContent = document.createElement("div");
  oModalContent.id = "modal-notification";
  oModalContent.textContent = "Loading the parts database of the selected product, please wait...";
  oModalContent.style.width = "auto";
  oModalContent.style.textAlign = "center";
  document.body.appendChild(oModalContent);

  return oModalContent;
}

// newly added
function fStatusIndicator_Modal_2() {
  // in light DOM
  document.querySelector("#modal-notification")?.remove();

  const oModalContent = document.createElement("div");
  oModalContent.id = "modal-notification";

  const oImg = document.createElement("img");
  oImg.src = tkoIcons.loading;
  oImg.style.display = "inline";
  oImg.style.verticalAlign = "middle";
  oImg.style.margin = "0 10px";

  const oSpan = document.createElement("span");
  oSpan.textContent = "Loading, please wait...";
  oSpan.style.width = "auto";
  oSpan.style.textAlign = "center";

  oModalContent.appendChild(oSpan);
  oModalContent.appendChild(oImg);

  document.body.appendChild(oModalContent);

  return oModalContent;
}

function fStatusIndicator_Loading(oLoadTarget) {
  const oLoadMessage = document.createElement("div");

  const oImg = document.createElement("img");
  oImg.src = tkoIcons.loading;
  oImg.style.verticalAlign = "middle";
  oImg.style.margin = "15px 10px";

  const oSpan = document.createElement("span");
  oSpan.textContent = "Searching parts database, please wait...";

  const oExtraText = document.createElement("span");
  oExtraText.id = "loading-extra-text";

  oLoadMessage.appendChild(oImg);
  oLoadMessage.appendChild(oSpan);
  oLoadMessage.appendChild(oExtraText);
  oLoadTarget.appendChild(oLoadMessage);

  return oLoadMessage;
}

// API HELPERS
const PRT_API_BASE = "http://localhost:8080/api";

async function prtApi(path, options = {}) {
  const url = `${PRT_API_BASE}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = res.headers.get("content-type");

  let json = null;

  if (contentType?.includes("application/json")) {
    json = await res.json();
  } else {
    const text = await res.text();
    throw new Error(`Non-JSON response from ${url}: ${text}`);
  }

  if (!res.ok) {
    throw new Error(json?.message || `API error ${res.status} (${url})`);
  }

  return json?.data ?? json;
}

const prtCache = {};

async function prtApiCached(path, options = {}) {
  const key = path;

  if (prtCache[key]) {
    return prtCache[key];
  }

  const data = await prtApi(path, options);
  prtCache[key] = data;

  return data;
}
