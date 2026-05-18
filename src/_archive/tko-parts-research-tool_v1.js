let prt_oTimer;
// let prt_oFilteredParts = null;
const partsResearchToolData = [
  ...(Array.isArray(partsResearchToolData_1) ? partsResearchToolData_1 : []),
  ...(Array.isArray(partsResearchToolData_2) ? partsResearchToolData_2 : []),
  ...(Array.isArray(partsResearchToolData_3) ? partsResearchToolData_3 : []),
  ...(Array.isArray(partsResearchToolData_4) ? partsResearchToolData_4 : []),
  ...(Array.isArray(partsResearchToolData_5) ? partsResearchToolData_5 : []),
  ...(Array.isArray(partsResearchToolData_6) ? partsResearchToolData_6 : []),
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

function fSelectorProduct_Create() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const selector = root.querySelector("#selector");
  if (!selector) return;

  // idempotency guard — prevent duplicate select
  if (root.querySelector("#product-selector")) return;

  // validate data
  if (!Array.isArray(partsResearchToolData)) {
    selector.textContent = "Invalid data source.";
    return;
  }

  // filter products that have parts and sort by product name
  const cPartsEnabled = partsResearchToolData
    .filter((item) => item.segments && Object.values(item.segments).some((seg) => Array.isArray(seg.parts) && seg.parts.length > 0))
    .sort((a, b) => (a.product_name || "").toLowerCase().localeCompare((b.product_name || "").toLowerCase()));

  if (cPartsEnabled.length > 0) {
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

    cPartsEnabled.forEach((item) => {
      const opt = document.createElement("option");
      opt.textContent = item.product_name;
      opt.value = item.product_id; // using product_id as identifier
      select.appendChild(opt);
    });

    selector.appendChild(select);
  } else {
    selector.textContent = "You do not have access to any of the parts databases at this time. Please check with your TKO Regional Administrator.";
  }
}

function fSelectorSegment_Create(sProductId) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const selector = root.querySelector("#selector");
  if (!selector) return;

  // find the matching product by product_id
  const oProduct = partsResearchToolData.find((item) => item.product_id === sProductId);
  if (!oProduct || !oProduct.segments || Object.keys(oProduct.segments).length === 0) return;

  // segments is now an object
  const cSegmentNode = Object.entries(oProduct.segments).map(([segId, seg]) => ({
    id: segId,
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
        Promise.resolve(fStyleModalLoader(oModalContent, oModalCanvass)).then(() => {
          setTimeout(() => {
            fSelectorProduct_Load(sProductId, select.value);
          }, 1500);
        });
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
    Promise.resolve(fStyleModalLoader(oModalContent, oModalCanvass)).then(() => {
      setTimeout(() => {
        fSelectorProduct_Load(sProductId, cSegmentNode[0].id);
      }, 1500);
    });
  }
}

function fSelectorProduct_Load(sProductId, sSegmentId) {
  // find the matching product by product_id
  const oProduct = partsResearchToolData.find((item) => item.product_id === sProductId);
  if (!oProduct || !oProduct.segments || Object.keys(oProduct.segments).length === 0) return;

  // filter parts by segment_id
  const oFilteredParts = oProduct.segments[sSegmentId]?.parts || [];

  fSelectorType_Create(oFilteredParts);

  // modal cleanup — in light DOM, to be revisited when modal functions are refactored
  const modalWrapper = document.querySelector("#modal-wrapper");
  if (modalWrapper) {
    modalWrapper.style.transition = "opacity 0.2s";
    modalWrapper.style.opacity = "0";
    setTimeout(() => modalWrapper.remove(), 200);
  }

  const modalBground = document.querySelector("#modal-bground");
  if (modalBground) {
    modalBground.style.transition = "opacity 0.4s";
    modalBground.style.opacity = "0";
    setTimeout(() => modalBground.remove(), 400);
  }

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
  oSearchImg.title = "Filter";
  oSearchImg.src =
    "data:image/gif;base64,R0lGODlhDQANAOYAADan1Pv7+zhlqz1wtjmUzTl8wDmExTmMyfr6+jlttPz8/MnW55/K5MnU5XaZymG53KGswWas11ml1Ozs7zNXmaWwxMfQ4UuWzaHD4SI6aGB2ofL190h/wNTf7WaBskJsr+3y9oGOqKbN5pKu1G25z4e02uXu8StJglym1UFzt1lrjUB6vZnH1Tl1u3KWyT1fnsXN27vO5eXq8Fqe0Ze53JKqz4Os1nO7z+Tr8pLG1D1orZSZoaPB31N6tvb3+H+u2DVSiH6p1VW02lOh0zx3vJ7B4KfK5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEcALAAAAAANAA0AAAdugEeCgzkkNyyDiUdCAI0AD4pHEgQoIgxDBBGJRgczPgoBIBcHiT8GGAoyEwElBkWDNgU0ASYbAUEFPIMxLRw4CAgdK0SJCwMJKQ4uxyODDR8CPQLTOjWDFi8UHoIQFYkwQCcakYMhGSrkiTvpg4EAOw==";
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
function fStatusIndicator_Modal() {
  // in light DOM
  document.querySelector("#modal-notification")?.remove();

  const oModalContent = document.createElement("div");
  oModalContent.id = "modal-notification";
  oModalContent.textContent = "Loading the parts database of the selected product, please wait...";
  oModalContent.style.width = "370px";
  oModalContent.style.textAlign = "center";
  document.body.appendChild(oModalContent);

  return oModalContent;
}

function fStatusIndicator_Loading(oLoadTarget) {
  const oLoadMessage = document.createElement("div");

  const oImg = document.createElement("img");
  oImg.src =
    "data:image/gif;base64,R0lGODlhHgAeAOZ/AOTk5Hp6etnZ2c3NzcbFxtHR0b29vfr6+qqpqpmYmdzc3FVXVY2NjcnJyba1tt/e34ODg4qJiubm5vT09Pb39vj5+K6trsHCwfDw8PLz8ujo6ODg4PHy8Z6enqalpvLy8mtsa/T29Orq6u7u7rKxsuzs7Pb59mRmZJWVldbW1qGhoZGRkdTU1Lu6u+zu7HZ2duHi4XBycObo5u7w7urs6szLzOjq6OTm5NjY2G1vbd7g3ry7vNjX2ODe4Lu8u2dpZ8C+wLSztKuqq5+fn9PV08/Qz5eWl/v9+/z9/P3+/fv8+/z//Pr7+vr8+uLi4vn6+fj6+OPj4/z8/OLh4v39/d3d3cfHx/7+/sTDxOfn5+Xl5ePi4+Pk49PT07CvsM/Pz+np6dXW1eTj5N3e3YiIiOLj4nd4d+vr64eHh8fIx19gX5ubm+/v79vc23d3d7CwsH9/f5OUk7+/v8TFxJycnPn8+X5+fvv++6inqKOjo9vb2/7//v3//f////z+/P///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE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";
  oImg.setAttribute("align", "middle");
  oImg.setAttribute("hspace", "10");
  oImg.setAttribute("vspace", "15");

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

function fFilterComponentBox_Create(oBox) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const oFilterContainer = document.createElement("span");
  oFilterContainer.classList.add("filter-holder");

  const oFilterIconBox = document.createElement("span");

  const oFilterIcon = document.createElement("img");
  oFilterIcon.src =
    "data:image/gif;base64,R0lGODlhDAAKAOYAAAAAAP///2JiZICAglBQUUJCQ2BgYVpaW1dXWO3t7s7Oz8LCw7a2t6+vsJ2dnpqam4+PkICAgX1+f2hpaqSlplZXV/n6+ubn5+Tl5dvc3NXW1tLT08/Q0L2+vqipqW5wb+3v7v39/fv7+/r6+u3t7erq6tPT09LS0sTExMDAwL+/v7i4uK6urqurq6ioqKWlpaOjo6Kiop+fn5ycnJubm5qampmZmZOTk46Ojnd3d2RkZFtbW1lZWVVVVVNTU0lJSUZGRjw8PCoqKicnJxoaGhgYGAQEBP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEcALAAAAAAMAAoAAAdcgAwoJgopDRQPODkCPxIcCSIjJBgqNjo9RS0DJyQhFhcrNz5FMUcuHwslIBo0PEUyR7EvEysZHTtEM7G7MBUbLEQ1u8MEKg5Bw8MIHhFAybsHEAZCz7EEBUNGw4EAOw==";
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
  oCloseIcon.src =
    "data:image/gif;base64,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";
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
  oImg.src =
    "data:image/gif;base64,R0lGODlhHgAeAOZ/AOTk5Hp6etnZ2c3NzcbFxtHR0b29vfr6+qqpqpmYmdzc3FVXVY2NjcnJyba1tt/e34ODg4qJiubm5vT09Pb39vj5+K6trsHCwfDw8PLz8ujo6ODg4PHy8Z6enqalpvLy8mtsa/T29Orq6u7u7rKxsuzs7Pb59mRmZJWVldbW1qGhoZGRkdTU1Lu6u+zu7HZ2duHi4XBycObo5u7w7urs6szLzOjq6OTm5NjY2G1vbd7g3ry7vNjX2ODe4Lu8u2dpZ8C+wLSztKuqq5+fn9PV08/Qz5eWl/v9+/z9/P3+/fv8+/z//Pr7+vr8+uLi4vn6+fj6+OPj4/z8/OLh4v39/d3d3cfHx/7+/sTDxOfn5+Xl5ePi4+Pk49PT07CvsM/Pz+np6dXW1eTj5N3e3YiIiOLj4nd4d+vr64eHh8fIx19gX5ubm+/v79vc23d3d7CwsH9/f5OUk7+/v8TFxJycnPn8+X5+fvv++6inqKOjo9vb2/7//v3//f////z+/P///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlE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";
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
