let baseUrl = "";
// const { baseUrl } = $.parseJSON(sessionStorage.v2_eGSSPortalParamPrevious);

function fLoadTKOTheme() {
  baseUrl = "";
  //baseUrl = $.parseJSON(sessionStorage.v2_eGSSPortalParamPrevious).baseUrl;
  fCheckIfProduction();
  fStyleTableCodeSelector();
  fStyleSectionHeader();
  fStyleProcedureChecklist();
  fStyleStoredForm();
  fStyleDocumentTips();
  fStyleContentToggle();
  fStyleContentModal();
  fStyleContentModeless();
  fStyleContentOverlay();
  fStyleTableDropdownSelector();
  fStyleTableListSelector();
  fStyleParamSetDefinition();
  fStyleMailerForm();

  fBuildCustomList();
  fBuildCustomIndex();
  fBuildFlexiTable();
  fBuildCustomTable();

  fBuildTopicIndex();
  fStyleSortableTable();
  fStyleFilterableTable();
  fBuildTopicShortcut();
  fStyleModalNotification();
}

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
              $(oTechTipNode_o)
                .children(sColumn_node)
                .children("log[date]")[0]
            ) {
              var sColumn_text = $(oTechTipNode_o)
                .children(sColumn_node)
                .children("log[date]")
                .attr("date");
            } else if ($(oTechTipNode_o).children("issue")[0]) {
              var sColumn_text = $(oTechTipNode_o).children("issue").text();
            }
          } else {
            var sColumn_text = $(oTechTipNode_o)
              .children(sColumn_node)
              .text();
            sColumn_text = sColumn_text
              .replace(/\[/g, "<")
              .replace(/\]/g, ">");
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
                        const cRef_o = $(this)
                          .siblings(".ref-target")
                          .clone();
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

function fClearProcedureChecklist() {
  const iSavedProgress = $("li[id^=step]").find(
    "input[type=checkbox]:checked"
  ).length;
  if (iSavedProgress > 0) {
    const sConfirm =
      "This will delete your saved progress in all the procedures on this page. " +
      "Click OK to continue deleting your saved progress, or click Cancel.";
    const bConfirm = window.confirm(sConfirm);
    if (bConfirm) {
      const sCurrentFile = $("meta[name=Filename]").attr("content");
      $("li[id^=step]").each((cStep_i, cStep_o) => {
        const jStoreKey = `${sCurrentFile}-${$(cStep_o).prop("id")}`;
        const cCheckBox = $(cStep_o)
          .children("input[type=checkbox]")
          .css("background", "#ffffff")
          .prop("disabled", false)
          .prop("checked", false);
        $.jStorage.deleteKey(jStoreKey, 0);
      });
      $("[class|=tip-checklist-procedure]").remove();
    }
  } else {
    alert("There are no saved progress to delete at this time.");
  }
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

function fCreateModalBackground(iActiveButton) {
  const oModalBgr = $("<div />", { id: "modal-bground" }).appendTo($("body"));
  const oModalWrp = $("<div />", { id: "modal-wrapper" }).appendTo($("body"));
  const oModalMsg = $("<span />", { id: "modal-message" }).appendTo(oModalWrp);
  const oModalGht = $("<span />", { id: "modal-csghost" }).appendTo(oModalWrp);
  const oModalBtn = $("<div/>")
    .appendTo(oModalMsg)
    .addClass("modal-button")
    .append(() => {
      if (iActiveButton > 1) {
        return $("<span/>", {
          id: "modal-tpopout",
          text: "Pop-out",
        }).click(function () {
          const sImgPath = $(this)
            .closest("span[id=modal-message]")
            .children("img")
            .attr("src");
          window.open(sImgPath);
        });
      }
    })
    .append(() => {
      if (iActiveButton > 0) {
        return $("<span/>", {
          id: "modal-tclose",
          text: "Close",
        }).click(() => {
          $("#modal-wrapper").fadeOut("fast", () => {
            $("#modal-wrapper").remove();
          });
          $("#modal-bground").fadeOut("slow", () => {
            $("#modal-bground").remove();
          });
        });
      }
    })
    .append(function () {
      if (!iActiveButton || iActiveButton == 0) {
        $(this).css("top", "-16px").css("right", "0px");
        return $("<img />", {
          id: "modal-close",
          src: "../../graphic/close.png",
          click() {
            $("#modal-wrapper").fadeOut("fast", () => {
              $("#modal-wrapper").remove();
            });
            $("#modal-bground").fadeOut("slow", () => {
              $("#modal-bground").remove();
            });
          },
        });
      }
    });

  return oModalMsg;
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

function fStyleAutoSizeImage(rImage) {
  let iImageHeight = rImage.height;
  let iImageWidth = rImage.width;
  const iHeightLimit = $("body").height() * 0.8;
  const iWidthLimit = $("body").width() * 0.8;
  let sLimiter;

  // resize target image depending on size of available real estate
  if (iImageHeight > iHeightLimit) {
    sLimiter = "height";
    iRatio = (parseInt(iHeightLimit) / parseInt(iImageHeight)).toFixed(2);
    iImageHeight = iRatio * iImageHeight;
    iImageWidth = iRatio * iImageWidth;
  }
  if (iImageWidth > iWidthLimit) {
    sLimiter = "width";
    iRatio = (parseInt(iWidthLimit) / parseInt(iImageWidth)).toFixed(2);
    iImageHeight = iRatio * iImageHeight;
    iImageWidth = iRatio * iImageWidth;
  }
  return { height: iImageHeight, width: iImageWidth, limiter: sLimiter };
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

function fStyleContentModal() {
  $(".ref-modal").click(function () {
    let bModalTarget = false;
    const oClicked = $(this);
    const oModalCanvass = fCreateModalBackground(2);
    const cDynamicRef = $('[class|="ref-modal"],[class|="ref-target"]');
    cDynamicRef.each((cRef_i, cRef_o) => {
      if (bModalTarget) {
        fStyleModalLoader($(cRef_o), oModalCanvass);
        return false;
      }
      if ($(cRef_o).is($(oClicked))) {
        bModalTarget = true;
      }
    });
  });
}

function fStyleContentModeless() {
  $(".ref-modeless").click(function () {
    let bModelessTarget = false;
    const oClicked = $(this);
    const oModelessCanvass = fCreateModalBackground(2);
    const cDynamicRef = $('[class|="ref-modeless"],[class|="ref-target"]');
    cDynamicRef.each((cRef_i, cRef_o) => {
      if (bModelessTarget) {
        fStyleModalLoader($(cRef_o), oModelessCanvass);
        return false;
      }
      if ($(cRef_o).is($(oClicked))) {
        bModelessTarget = true;
      }
    });
  });
}

function fStyleContentOverlay() {
  $(".ref-overlay").click(function () {
    let bModalTarget = false;
    const oClicked = $(this);
    const oModalCanvass = fCreateModalBackground(1);
    const cDynamicRef = $('[class|="ref-overlay"],[class|="ref-target"]');
    cDynamicRef.each((cRef_i, cRef_o) => {
      if (bModalTarget) {
        fStyleOverlayLoader($(cRef_o), oModalCanvass);
        return false;
      }
      if ($(cRef_o).is($(oClicked))) {
        bModalTarget = true;
      }
    });
  });
}

function fStyleContentToggle() {
  $(".ref-dynamic").click(function () {
    // scripting this effect gave me the biggest challenge!
    const oClicked = $(this);
    const cDynamicRef = $('[class="ref-dynamic"],[class="ref-target"]');
    let bDynamicTarget = false;
    cDynamicRef.each((cRef_i, cRef_o) => {
      if (bDynamicTarget) {
        $(cRef_o).fadeToggle();
        return false;
      }
      if ($(cRef_o).is($(oClicked))) {
        bDynamicTarget = true;
      }
    });
  });
}

function fStyleDocumentTips() {
  $(".warning, .caution, .note")
    .not('[data-is-styled="true"]')
    .each((i, element) => {
      const sTipLabel = $(element)
        .html()
        .substring(0, $(element).html().indexOf(":") + 1);
      const sTipText = $(element).html().replace(sTipLabel, "");
      $(element).html("");
      const oTipLabel = $("<div>", {
        html: sTipLabel,
      })
        .appendTo(element)
        .addClass(() => `${$(element).attr("class")}-label`);
      const oTipHolder = $("<div>")
        .appendTo(element)
        .addClass(() => `${$(element).attr("class")}-text`);

      const oTipText = $("<span>", {
        html: sTipText,
      }).appendTo(oTipHolder);

      //Mark as processed
      $(element).attr("data-is-styled", "true");
    });

  if ($("#coming-soon").length > 0) {
    $("<img/>", {
      src: "../../theme/graphic/cue_coming.png",
      alt: "Click to Hide",
      click() {
        $(this).hide();
      },
    }).appendTo($("#coming-soon"));
  }
}

function fStyleFilterableTable() {
  const cTable = $("th[class|=filter-header]").not(
    ":has(img[src*=ico_filter])"
  );
  cTable.each((cTable_i, cTable_o) => {
    const oFilterContainer = $("<span />")
      .appendTo(cTable_o)
      .css("padding-left", "10px");
    const oFilter = $("<input/>", {
      type: "text",
      title: "Filter",
      size: 30,
      css: {
        "font-size": "11px",
      },
      keyup() {
        const sSearchString = $(this).val().toLowerCase();
        const cCol = $(this).closest("table").find("tr").has("td");
        cCol.css("display", function () {
          return $(this).text().toLowerCase().indexOf(sSearchString) == -1
            ? "none"
            : "table-row";
        });
      },
      focusout() {
        const sSearchString = $(this).val().toLowerCase();
        const cCol = $(this).closest("table").find("tr").has("td");
        cCol.css("display", function () {
          return $(this).text().toLowerCase().indexOf(sSearchString) == -1
            ? "none"
            : "table-row";
        });
      },
    }).appendTo(oFilterContainer);
    const oFilterIcon = $("<img/>", {
      src: "https://napsapps.egain.services/media-server/public/inline/TMPROD67434354/fafe0023-e05b-4678-aa50-a8cc9093989e/theme_graphic/f792d179-1763-4b57-84cc-0a3028768ea6/ico_filter.gif",
      title: "Filter",
      hspace: 5,
    }).appendTo(oFilterContainer);
  });
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

function fStyleModalLoader(oModalContent, oModalCanvass) {
  // set default state of modal canvass
  oModalCanvass
    .hide()
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
      const cDimension = fStyleAutoSizeImage(rImage);
      oModalCanvass.fadeIn("fast").animate(
        { width: cDimension.width, height: cDimension.height },
        {
          duration: "fast",
          complete() {
            oModalCanvass
              .css("width", () =>
                cDimension.limiter == "height" ? "auto" : "80%"
              )
              .css("height", () =>
                cDimension.limiter == "height" ? "80%" : "auto"
              )
              .css("max-width", () =>
                cDimension.limiter == "height" ? null : rImage.width
              )
              .css("max-height", () =>
                cDimension.limiter == "height" ? rImage.height : null
              )
              .append(
                oImage
                  .fadeTo("fast", 1)
                  .css("max-width", "100%")
                  .css("width", "auto")
                  .css("max-height", "100%")
                  .css("height", "auto")
              )
              .find(".modal-button")
              .show();
          },
        }
      );
    };
  }
  // animation if ref-target's immediate child is not an image
  else {
    oModalCanvass.fadeIn("medium").animate(
      {
        width: oModalContent.css("width")
          ? oModalContent.css("width")
          : oModalContent.width(),
        height: oModalContent.css("height")
          ? oModalContent.css("height")
          : oModalContent.height(),
      },
      {
        duration: "fast",
        complete() {
          oModalCanvass
            .css({ width: "", height: "" })
            .append(
              $(oModalContent)
                .clone(true)
                .removeAttr("id") //added fix to show modal content
                .addClass("modal-content-article")
            )
            .find(".modal-button")
            .show()
            .children("#modal-tpopout")
            .remove();
        },
      }
    );
  }
}

//added function to replace sModalKey
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  return hash;
}

function fStyleModalNotification() {
  const objDate = new Date();
  const intToday = objDate.getDate();
  // const sModalKey = `${$('meta[name=Filename]').attr('content')}_modal`;
  const content = $("div[id|=modal-notification]").text().trim();
  const sModalKey = `modal_${hashString(content)}`;
  const intLastModal = $.jStorage.get(sModalKey);

  if ($("div[id|=modal-notification]").length > 0 && intLastModal != intToday) {
    const oModalCanvass = fCreateModalBackground(2);
    const oModalContent = $("div[id|=modal-notification]");
    fStyleModalLoader(oModalContent, oModalCanvass);

    $.jStorage.set(sModalKey, intToday);
  }
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

function fStyleParamSetDefinition() {
  const cPopup = $("#def-popup, .def-popup");
  cPopup.each((cPopup_i, cPopup_o) => {
    const oTermContainer = $("<div/>", {
      id() {
        return `${$(cPopup_o).find("dl").attr("id")}-container`;
      },
    }).appendTo($(cPopup_o));

    const cTerm = $(cPopup_o).find("dl").find("dt");
    cTerm.each((cTerm_i, cTerm_o) => {
      $("<div/>", {
        mouseover() {
          $(this).fadeTo(0, 0.2);
          const iTop = $(this).position().top + $(this).height();
          $("div .definition").eq(cTerm_i).fadeTo(0, 1).css("top", iTop);
        },
        mouseout() {
          $(this).fadeTo(0, 0);
          $("div .definition").eq(cTerm_i).fadeTo(0, 0);
        },
      })
        .appendTo(oTermContainer)
        .addClass("parameter")
        .fadeTo(0, 0);
    });

    const cDefinition = $(cPopup_o).find("dl").find("dd");
    cDefinition.each((cDefinition_i, cDefinition_o) => {
      $("<div/>", {
        html: $(cDefinition_o).html(),
      })
        .appendTo(oTermContainer)
        .addClass("definition")
        .fadeTo(0, 0);
    });
  });
  cPopup.find("dl").remove();
}

function fStyleProcedureChecklist() {
  const sCurrentFile = $("meta[name=Filename]").attr("content");
  $("div[class=cheklist-procedure]").each(
    (oProcCheckList_i, oProcCheckList_o) => {
      // move the list a bit to give space to the checkbox
      $(oProcCheckList_o).children("ol, ul");

      // for all list items that have an ID:
      // add a checkbox, which when clicked, gets stored (jStorage) and disabled
      // before a clicked checkbox is stored, ask for confirmation from the user.
      const cStep = $(oProcCheckList_o).find("li[id^=step]");
      cStep.each((cStep_i, cStep_o) => {
        const jStoreKey = `${sCurrentFile}-${$(cStep_o).prop("id")}`;
        const bPerformed = $.jStorage.get(jStoreKey, 0);
        $("<input>", {
          type: "checkbox",
          change() {
            if ($(this).prop("checked")) {
              const sConfirm =
                "Please confirm that you have performed this step by clicking OK.\r\n" +
                "If you have not performed this step yet, please click CANCEL.";

              const oConfirm = window.confirm(sConfirm);
              if (oConfirm) {
                $.jStorage.set(jStoreKey, 1);
                $(this).prop("disabled", true);
              } else {
                $(this).prop("checked", false);
              }
            }
          },
        })
          .prependTo($(cStep_o))
          .css("position", "absolute")
          .css("left", -9)
          .prop("checked", () => bPerformed == 1)
          .prop("disabled", () => bPerformed == 1)
          .css("background", () => (bPerformed == 1 ? "pink" : "#ffffff"));
      });

      // check if any of the procedures have been performed already;
      // if so, add a note on how to clear the stored-and-disabled checkboxes
      if ($(oProcCheckList_o).find("input[type=checkbox]:checked").length > 0) {
        $("<span />")
          .prependTo($(oProcCheckList_o))
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

function fStyleSectionHeader() {
  $("h2").each((_, h2) => {
    if (!$(h2).prev().hasClass("section-padding")) {
      $("<div/>").insertBefore($(h2)).addClass("section-padding");
    }
  });
}

function fStyleSortableTable() {
    $("th[class|=sort-header]")
      .closest("table:not([flagged])")
      .each((cSortableTable_i, cSortableTable_o) => {
        $(cSortableTable_o).attr("flagged", "true"); // this is to indicate that table is already sortable
        const cHeader = $(cSortableTable_o)
          .find("th[class|=sort-header]")
          .click(function () {
            // set classname of the clicked header
            $(this).attr("class", function () {
              $(cSortableTable_o)
                .find("th[class|=sort-header]")
                .not($(this))
                .attr("class", "sort-header");
              return $(this).attr("class") == "sort-header-desc"
                ? "sort-header-asc"
                : "sort-header-desc";
            });

            // create cColumnSortable, a collection of string values under the clicked header
            const sType = $(this).attr("data-type")
              ? $(this).attr("data-type")
              : "text";
            const cColumnDefault = $(cSortableTable_o).find(
              `td:nth-child(${$(this).index() + 1})`
            );
            const cColumnSortable = cColumnDefault
              .map((cColumnSortable_i, cColumnSortable_o) => {
                switch (sType) {
                  case "date":
                    // if data type is 'date', convert the date to UTC format
                    // convert the UTC value to 15-character string to prepare for sorting
                    var oDate = new Date($(cColumnSortable_o).text());
                    var sValue = Date.UTC(
                      oDate.getFullYear(),
                      oDate.getMonth(),
                      oDate.getDate()
                    );
                    var iValueLength = 15 - sValue.toString().length;
                    for (let i = 0; i < iValueLength; i++) {
                      sValue = `0${sValue}`;
                    }
                    break;
                  default:
                    var sValue = $(cColumnSortable_o).text();
                    break;
                }
                return `${sValue} oRowIndex:${cColumnSortable_i}`;
              })
              .get();

            // sort cColumnSortable array based on classname of the clicked header
            $(this).attr("class") == "sort-header-desc"
              ? cColumnSortable.sort().reverse()
              : cColumnSortable.sort();

            // rebuild the table based on new order of iRowIndex in cColumnSortable
            const oSortableRow = $(cSortableTable_o)
              .find("tr:has(td)")
              .detach();
            $(cColumnSortable).each((cColumnSortable_i, cColumnSortable_t) => {
              let iRowIndex = cColumnSortable_t.substring(
                cColumnSortable_t.lastIndexOf("oRowIndex")
              );
              iRowIndex = Number(iRowIndex.replace("oRowIndex:", ""));
              oSortableRow.eq(iRowIndex).appendTo($(cSortableTable_o));
            });

            $(cSortableTable_o).find("tr:even").addClass("tr-even");
            $(cSortableTable_o).find("tr:odd").addClass("tr-odd");
          });
        cHeader.eq(0).click();
      });
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
        if ($.jStorage.get($(this).attr("name"))) {
          bRetrievedData = true;
          $(this).data("default-bground", $(this).css("background-color"));
          $(this).css("background", "pink");
          return $.jStorage.get($(this).attr("name"));
        }
        return $(this).val();
      })
      .keyup(function () {
        $.jStorage.set($(this).attr("name"), $(this).val());
        $(this).css("background", $(this).data("default-bground"));
      });

    $(cStoredForm_o)
      .find("select")
      .filter(function () {
        return $(this).attr("name");
      })
      .val(function () {
        if ($.jStorage.get($(this).attr("name"))) {
          bRetrievedData = true;
          $(this).data("default-bground", $(this).css("background-color"));
          $(this).change().css("background", "pink");
          fStyleConditionalEl($(this), $.jStorage.get($(this).attr("name")));
          return $.jStorage.get($(this).attr("name"));
        }
        return $(this).val();
      })
      .change(function () {
        $.jStorage.set($(this).attr("name"), $(this).val());
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
          $.jStorage.get($(this).attr("name")) &&
          $.jStorage.get($(this).attr("name")) == $(cOpt_o).val()
        ) {
          bRetrievedData = true;
          fStyleConditionalEl($(this), $.jStorage.get($(this).attr("name")));
          $(this).prop("checked", "true");
          $(this).css("background", "pink");
        }
      })
      .click(function () {
        $(`input[name="${$(this).attr("name")}"]`).css("background", "");
        const sValue = $(`input[name="${$(this).attr("name")}"]:checked`).val();
        $.jStorage.set($(this).attr("name"), sValue);
        fStyleConditionalEl($(this), $(this).val());
      });

    // this sets the behavior of "toggle" radiobutton
    $(cStoredForm_o)
      .find('input[type="radio"]')
      .filter('[name$="-toggle"]')
      .each(function (cOpt_i, cOpt_o) {
        $(this).css("opacity", 0);
        if (
          $.jStorage.get($(this).attr("name")) &&
          $.jStorage.get($(this).attr("name")) == $(cOpt_o).val()
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
                    $.jStorage.deleteKey($(this).attr("name"));
                    $(this).css("background", "#ffffff");
                  });
                $(cStoredForm_o)
                  .find("select")
                  .each(function (cElement_i, cElement_o) {
                    $(this).val("");
                    $.jStorage.deleteKey($(this).attr("name"));
                    $(this).css("background", "inherit");
                  });
                $(cStoredForm_o)
                  .find('input[type="radio"]')
                  .each(function (cElement_i, cElement_o) {
                    $(this).removeProp("checked");
                    $.jStorage.deleteKey($(this).attr("name"));
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
      const sInputValue = $.jStorage.deleteKey(sInputName);
      location.reload();
    });
  }
}

function fStyleTableCodeSelector() {
  // 1. If #tab-definition or .tab-definition exists, select table segments
  const $tableDefinitions = $("#tab-definition, .tab-definition");

  if ($tableDefinitions.length > 0) {
    $tableDefinitions.each((index, tableDefinition) => {
      const $tables = $(tableDefinition).find("table");

      // Skip if already processed
      if ($tables.attr("data-is-styled") === "true") return;

      // Mark as processed
      $tables.attr("data-is-styled", "true");

      $tables.parent().hide(); // Hide table parent by default

      $tables.each((tableIndex, table) => {
        const $firstCell = $(table).find("td")[0];
        const $button = $("<input/>", {
          type: "button",
          value: $( $firstCell ).text(),
          mouseup() {
            const $parent = $(table).parent();
            if ($parent.css("display") === "none") {
              $tables.parent().hide();
              $(table).parent().fadeIn();
            } else {
              $(table).parent().fadeOut();
            }
          },
        })
          .insertBefore($(tableDefinition).children("div")[0])
          .addClass("selector-part-button");
      });
    });
  }
}


function fStyleTableDropdownSelector() {
  const cTableSet = $("#tab-selector, .tab-selector");
  if (cTableSet.length > 0) {
    cTableSet.each((cTableSet_i, cTableSet_o) => {
      const oSelectorHolder = $("<div/>").insertBefore(
        $(cTableSet_o).children()[0]
      );
      const oSelectorLabel = $("<span/>", {
        text: "Select Table to Display: ",
      })
        .appendTo(oSelectorHolder)
        .addClass("selector-table-label");
      const cTable = $(cTableSet_o)
        .find("table[class=data]")
        .parent("div")
        .hide();
      const oDropDown = $("<select/>")
        .appendTo($(oSelectorHolder))
        .change(function () {
          cTable.hide().eq($(this).find("option:selected").index()).fadeIn();
        });
      cTable.eq(0).fadeIn();

      $(cTableSet_o)
        .find("table")
        .each((cTable_i, cTable_o) => {
          const oTableHolder = $(cTableSet_o)
            .find("table[class=data]")
            .parent("div");
          const sTableTitle = $(cTable_o).find("th[class=head]").text();
          $("<option/>", { text: sTableTitle, value: cTable_i }).appendTo(
            oDropDown
          );
        });
    });
  }
}

function fStyleTableListSelector() {
  const cTableSet = $("#tab-dynamic, .tab-dynamic");

  cTableSet.each((i, set) => {
    const $set = $(set);

    // Skip if already processed
    if ($set.attr("data-is-styled") === "true") return;

    // Mark as processed
    $set.attr("data-is-styled", "true");

    // Hide tables
    $set.find("table.data").parent("div").hide();

    // Create selector UI
    const oSelectorHolder = $("<div/>")
      .prependTo($set)
      .append(
        $("<div/>", { text: "Select Table to Display:" }).addClass(
          "selector-table-label"
        )
      );

    $set.find("table").each((j, table) => {
      const $tableHolder = $set.find("table.data").parent("div");
      const sTableTitle = $(table).find("th.head").text();

      const $option = $("<div/>", {
        text: sTableTitle,
        click() {
          $set
            .find(".selector-table-option-selected")
            .not(this)
            .removeClass("selector-table-option-selected")
            // .addClass("selector-table-option");

          $(this)
            // .removeClass("selector-table-option")
            .addClass("selector-table-option-selected");

          $tableHolder.not($tableHolder.eq(j)).hide();
          $tableHolder.eq(j).fadeToggle();
        },
      })
        .appendTo(oSelectorHolder)
        .addClass("selector-table-option");

      // Auto-select first table
      if (j === 0) $option.click();
    });
  });
}

function fTrackDocumentHistory() {
  let cHistory = null;
  const sCurrentFile = $("meta[name=Filename]").attr("content");
  let sHistory = $.jStorage.get("tko-dochistory", null);
  if (!sHistory) {
    $.jStorage.set("tko-dochistory", sCurrentFile);
  } else {
    rxDelimeter = /-delimiter-/gi;
    cHistory = sHistory.split(rxDelimeter);
    sHistory = "";
    if ($.inArray(sCurrentFile, cHistory) > -1) {
      cHistory.splice($.inArray(sCurrentFile, cHistory), 1);
    } else if (cHistory.length == 5) {
      cHistory.splice(0, 1);
    }
    cHistory.push(sCurrentFile);

    $(cHistory).each((cHistory_i, cHistory_o) => {
      sHistory +=
        cHistory_i < cHistory.length - 1
          ? `${cHistory_o}-delimiter-`
          : cHistory_o;
    });
    $.jStorage.set("tko-dochistory", sHistory);
  }
  return cHistory;
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
// const execute = () => {
//     if (document.getElementById('custom-article-div')) {
//         if (interval) {
//             clearInterval(interval);
//         }
//         fLoadTKOTheme();
//     }
// };
// const interval = setInterval(execute, 100);

/*
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Author: Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under Unlicense:
 *
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to <http://unlicense.org/>
 */

/* global ActiveXObject: false */
/* jshint browser: true */
/*
    http://www.JSON.org/json2.js
    2011-02-23

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'

            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'

        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });

    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/* jslint evil: true, strict: false, regexp: false */

/* members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

let JSON;
if (!JSON) {
  JSON = {};
}

(function () {
  function f(n) {
    // Format integers to have at least two digits.
    return n < 10 ? `0${n}` : n;
  }

  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function (key) {
      return isFinite(this.valueOf())
        ? `${this.getUTCFullYear()}-${f(this.getUTCMonth() + 1)}-${f(
            this.getUTCDate()
          )}T${f(this.getUTCHours())}:${f(this.getUTCMinutes())}:${f(
            this.getUTCSeconds()
          )}Z`
        : null;
    };

    String.prototype.toJSON =
      Number.prototype.toJSON =
      Boolean.prototype.toJSON =
        function (key) {
          return this.valueOf();
        };
  }

  const cx =
    /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  const escapable =
    /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  let gap;
  let indent;
  const meta = {
    // table of character substitutions
    "\b": "\\b",
    "\t": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    '"': '\\"',
    "\\": "\\\\",
  };
  let rep;

  function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    escapable.lastIndex = 0;
    return escapable.test(string)
      ? `"${string.replace(escapable, (a) => {
          const c = meta[a];
          return typeof c === "string"
            ? c
            : `\\u${`0000${a.charCodeAt(0).toString(16)}`.slice(-4)}`;
        })}"`
      : `"${string}"`;
  }

  function str(key, holder) {
    // Produce a string from holder[key].

    let i; // The loop counter.
    let k; // The member key.
    let v; // The member value.
    let length;
    const mind = gap;
    let partial;
    let value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.

    if (
      value &&
      typeof value === "object" &&
      typeof value.toJSON === "function"
    ) {
      value = value.toJSON(key);
    }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.

    if (typeof rep === "function") {
      value = rep.call(holder, key, value);
    }

    // What happens next depends on the value's type.

    switch (typeof value) {
      case "string":
        return quote(value);

      case "number":
        // JSON numbers must be finite. Encode non-finite numbers as null.

        return isFinite(value) ? String(value) : "null";

      case "boolean":
      case "null":
        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce 'null'. The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

      // If the type is 'object', we might be dealing with an object or an array or
      // null.

      case "object":
        // Due to a specification blunder in ECMAScript, typeof null is 'object',
        // so watch out for that case.

        if (!value) {
          return "null";
        }

        // Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        partial = [];

        // Is the value an array?

        if (Object.prototype.toString.apply(value) === "[object Array]") {
          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          length = value.length;
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || "null";
          }

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.

          v =
            partial.length === 0
              ? "[]"
              : gap
              ? `[\n${gap}${partial.join(`,\n${gap}`)}\n${mind}]`
              : `[${partial.join(",")}]`;
          gap = mind;
          return v;
        }

        // If the replacer is an array, use it to select the members to be stringified.

        if (rep && typeof rep === "object") {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === "string") {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        } else {
          // Otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v =
          partial.length === 0
            ? "{}"
            : gap
            ? `{\n${gap}${partial.join(`,\n${gap}`)}\n${mind}}`
            : `{${partial.join(",")}}`;
        gap = mind;
        return v;
    }
  }

  // If the JSON object does not yet have a stringify method, give it one.

  if (typeof JSON.stringify !== "function") {
    JSON.stringify = function (value, replacer, space) {
      // The stringify method takes a value and an optional replacer, and an optional
      // space parameter, and returns a JSON text. The replacer can be a function
      // that can replace values, or an array of strings that will select the keys.
      // A default replacer method can be provided. Use of the space parameter can
      // produce text that is more easily readable.

      let i;
      gap = "";
      indent = "";

      // If the space parameter is a number, make an indent string containing that
      // many spaces.

      if (typeof space === "number") {
        for (i = 0; i < space; i += 1) {
          indent += " ";
        }

        // If the space parameter is a string, it will be used as the indent string.
      } else if (typeof space === "string") {
        indent = space;
      }

      // If there is a replacer, it must be a function or an array.
      // Otherwise, throw an error.

      rep = replacer;
      if (
        replacer &&
        typeof replacer !== "function" &&
        (typeof replacer !== "object" || typeof replacer.length !== "number")
      ) {
        throw new Error("JSON.stringify");
      }

      // Make a fake root object containing our value under the key of ''.
      // Return the result of stringifying the value.

      return str("", { "": value });
    };
  }

  // If the JSON object does not yet have a parse method, give it one.

  if (typeof JSON.parse !== "function") {
    JSON.parse = function (text, reviver) {
      // The parse method takes a text and an optional reviver function, and returns
      // a JavaScript value if the text is a valid JSON text.

      let j;

      function walk(holder, key) {
        // The walk method is used to recursively walk the resulting structure so
        // that modifications can be made.

        let k;
        let v;
        const value = holder[key];
        if (value && typeof value === "object") {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }

      // Parsing happens in four stages. In the first stage, we replace certain
      // Unicode characters with escape sequences. JavaScript handles many characters
      // incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
        text = text.replace(
          cx,
          (a) => `\\u${`0000${a.charCodeAt(0).toString(16)}`.slice(-4)}`
        );
      }

      // In the second stage, we run the text against regular expressions that look
      // for non-JSON patterns. We are especially concerned with '()' and 'new'
      // because they can cause invocation, and '=' because it can cause mutation.
      // But just to be safe, we want to reject all unexpected forms.

      // We split the second stage into 4 regexp operations in order to work around
      // crippling inefficiencies in IE's and Safari's regexp engines. First we
      // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
      // replace all simple value tokens with ']' characters. Third, we delete all
      // open brackets that follow a colon or comma or that begin the text. Finally,
      // we look to see that the remaining characters are only whitespace or ']' or
      // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

      if (
        /^[\],:{}\s]*$/.test(
          text
            .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              "]"
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
        )
      ) {
        // In the third stage we use the eval function to compile the text into a
        // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
        // in JavaScript: it can begin a block or an object literal. We wrap the text
        // in parens to eliminate the ambiguity.

        j = eval(`(${text})`);

        // In the optional fourth stage, we recursively walk the new structure, passing
        // each name/value pair to a reviver function for possible transformation.

        return typeof reviver === "function" ? walk({ "": j }, "") : j;
      }

      // If the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError("JSON.parse");
    };
  }
})();

(function () {
  const /* jStorage version */ JSTORAGE_VERSION = "0.4.12";

  /* detect a dollar object or create one if not found */
  const $ = window.jQuery || window.$ || (window.$ = {});

  /* check for a JSON handling support */
  const JSON = {
    parse:
      (window.JSON && (window.JSON.parse || window.JSON.decode)) ||
      (String.prototype.evalJSON &&
        function (str) {
          return String(str).evalJSON();
        }) ||
      $.parseJSON ||
      $.evalJSON,
    stringify:
      Object.toJSON ||
      (window.JSON && (window.JSON.stringify || window.JSON.encode)) ||
      $.toJSON,
  };

  // Break if no JSON support was found
  if (
    typeof JSON.parse !== "function" ||
    typeof JSON.stringify !== "function"
  ) {
    throw new Error(
      "No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page"
    );
  }

  let /* This is the object, that holds the cached values */
    _storage = {
      __jstorage_meta: {
        CRC32: {},
      },
    };

  /* Actual browser storage (localStorage or globalStorage['domain']) */
  let _storage_service = {
    jStorage: "{}",
  };

  /* DOM element for older IE versions, holds userData behavior */
  let _storage_elm = null;

  /* How much space does the storage take */
  let _storage_size = 0;

  /* which backend is currently used */
  let _backend = false;

  /* onchange observers */
  const _observers = {};

  /* timeout to wait after onchange event */
  let _observer_timeout = false;

  /* last update time */
  let _observer_update = 0;

  /* pubsub observers */
  const _pubsub_observers = {};

  /* skip published items older than current timestamp */
  let _pubsub_last = +new Date();

  /* Next check for TTL */
  let _ttl_timeout;

  /**
   * XML encoding and decoding as XML nodes can't be JSON'ized
   * XML nodes are encoded and decoded if the node is the value to be saved
   * but not if it's as a property of another object
   * Eg. -
   *   $.jStorage.set('key', xmlNode);        // IS OK
   *   $.jStorage.set('key', {xml: xmlNode}); // NOT OK
   */
  const _XMLService = {
    /**
     * Validates a XML node to be XML
     * based on jQuery.isXML function
     */
    isXML(elm) {
      const { documentElement } = elm ? elm.ownerDocument || elm : 0;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    },

    /**
     * Encodes a XML node to string
     * based on http://www.mercurytide.co.uk/news/article/issues-when-working-ajax/
     */
    encode(xmlNode) {
      if (!this.isXML(xmlNode)) {
        return false;
      }
      try {
        // Mozilla, Webkit, Opera
        return new XMLSerializer().serializeToString(xmlNode);
      } catch (E1) {
        try {
          // IE
          return xmlNode.xml;
        } catch (E2) {}
      }
      return false;
    },

    /**
     * Decodes a XML node from string
     * loosely based on http://outwestmedia.com/jquery-plugins/xmldom/
     */
    decode(xmlString) {
      const dom_parser =
        ("DOMParser" in window && new DOMParser().parseFromString) ||
        (window.ActiveXObject &&
          function (_xmlString) {
            const xml_doc = new ActiveXObject("Microsoft.XMLDOM");
            xml_doc.async = "false";
            xml_doc.loadXML(_xmlString);
            return xml_doc;
          });
      let resultXML;
      if (!dom_parser) {
        return false;
      }
      resultXML = dom_parser.call(
        ("DOMParser" in window && new DOMParser()) || window,
        xmlString,
        "text/xml"
      );
      return this.isXML(resultXML) ? resultXML : false;
    },
  };

  /// /////////////////////// PRIVATE METHODS ////////////////////////

  /**
   * Initialization function. Detects if the browser supports DOM Storage
   * or userData behavior and behaves accordingly.
   */
  function _init() {
    /* Check if browser supports localStorage */
    let localStorageReallyWorks = false;
    if ("localStorage" in window) {
      try {
        window.localStorage.setItem("_tmptest", "tmpval");
        localStorageReallyWorks = true;
        window.localStorage.removeItem("_tmptest");
      } catch (BogusQuotaExceededErrorOnIos5) {
        // Thanks be to iOS5 Private Browsing mode which throws
        // QUOTA_EXCEEDED_ERRROR DOM Exception 22.
      }
    }

    if (localStorageReallyWorks) {
      try {
        if (window.localStorage) {
          _storage_service = window.localStorage;
          _backend = "localStorage";
          _observer_update = _storage_service.jStorage_update;
        }
      } catch (E3) {
        /* Firefox fails when touching localStorage and cookies are disabled */
      }
    } else if ("globalStorage" in window) {
      /* Check if browser supports globalStorage */
      try {
        if (window.globalStorage) {
          if (window.location.hostname == "localhost") {
            _storage_service = window.globalStorage["localhost.localdomain"];
          } else {
            _storage_service = window.globalStorage[window.location.hostname];
          }
          _backend = "globalStorage";
          _observer_update = _storage_service.jStorage_update;
        }
      } catch (E4) {
        /* Firefox fails when touching localStorage and cookies are disabled */
      }
    } else {
      /* Check if browser supports userData behavior */
      _storage_elm = document.createElement("link");
      if (_storage_elm.addBehavior) {
        /* Use a DOM element to act as userData storage */
        _storage_elm.style.behavior = "url(#default#userData)";

        /* userData element needs to be inserted into the DOM! */
        document.getElementsByTagName("head")[0].appendChild(_storage_elm);

        try {
          _storage_elm.load("jStorage");
        } catch (E) {
          // try to reset cache
          _storage_elm.setAttribute("jStorage", "{}");
          _storage_elm.save("jStorage");
          _storage_elm.load("jStorage");
        }

        let data = "{}";
        try {
          data = _storage_elm.getAttribute("jStorage");
        } catch (E5) {}

        try {
          _observer_update = _storage_elm.getAttribute("jStorage_update");
        } catch (E6) {}

        _storage_service.jStorage = data;
        _backend = "userDataBehavior";
      } else {
        _storage_elm = null;
        return;
      }
    }

    // Load data from storage
    _load_storage();

    // remove dead keys
    _handleTTL();

    // start listening for changes
    _setupObserver();

    // initialize publish-subscribe service
    _handlePubSub();

    // handle cached navigation
    if ("addEventListener" in window) {
      window.addEventListener(
        "pageshow",
        (event) => {
          if (event.persisted) {
            _storageObserver();
          }
        },
        false
      );
    }
  }

  /**
   * Reload data from storage when needed
   */
  function _reloadData() {
    let data = "{}";

    if (_backend == "userDataBehavior") {
      _storage_elm.load("jStorage");

      try {
        data = _storage_elm.getAttribute("jStorage");
      } catch (E5) {}

      try {
        _observer_update = _storage_elm.getAttribute("jStorage_update");
      } catch (E6) {}

      _storage_service.jStorage = data;
    }

    _load_storage();

    // remove dead keys
    _handleTTL();

    _handlePubSub();
  }

  /**
   * Sets up a storage change observer
   */
  function _setupObserver() {
    if (_backend == "localStorage" || _backend == "globalStorage") {
      if ("addEventListener" in window) {
        window.addEventListener("storage", _storageObserver, false);
      } else {
        document.attachEvent("onstorage", _storageObserver);
      }
    } else if (_backend == "userDataBehavior") {
      setInterval(_storageObserver, 1000);
    }
  }

  /**
   * Fired on any kind of data change, needs to check if anything has
   * really been changed
   */
  function _storageObserver() {
    let updateTime;
    // cumulate change notifications with timeout
    clearTimeout(_observer_timeout);
    _observer_timeout = setTimeout(() => {
      if (_backend == "localStorage" || _backend == "globalStorage") {
        updateTime = _storage_service.jStorage_update;
      } else if (_backend == "userDataBehavior") {
        _storage_elm.load("jStorage");
        try {
          updateTime = _storage_elm.getAttribute("jStorage_update");
        } catch (E5) {}
      }

      if (updateTime && updateTime != _observer_update) {
        _observer_update = updateTime;
        _checkUpdatedKeys();
      }
    }, 25);
  }

  /**
   * Reloads the data and checks if any keys are changed
   */
  function _checkUpdatedKeys() {
    const oldCrc32List = JSON.parse(
      JSON.stringify(_storage.__jstorage_meta.CRC32)
    );
    let newCrc32List;

    _reloadData();
    newCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32));

    let key;
    const updated = [];
    const removed = [];

    for (key in oldCrc32List) {
      if (oldCrc32List.hasOwnProperty(key)) {
        if (!newCrc32List[key]) {
          removed.push(key);
          continue;
        }
        if (
          oldCrc32List[key] != newCrc32List[key] &&
          String(oldCrc32List[key]).substr(0, 2) == "2."
        ) {
          updated.push(key);
        }
      }
    }

    for (key in newCrc32List) {
      if (newCrc32List.hasOwnProperty(key)) {
        if (!oldCrc32List[key]) {
          updated.push(key);
        }
      }
    }

    _fireObservers(updated, "updated");
    _fireObservers(removed, "deleted");
  }

  /**
   * Fires observers for updated keys
   *
   * @param {Array|String} keys Array of key names or a key
   * @param {String} action What happened with the value (updated, deleted, flushed)
   */
  function _fireObservers(keys, action) {
    keys = [].concat(keys || []);

    let i;
    let j;
    let len;
    let jlen;

    if (action == "flushed") {
      keys = [];
      for (const key in _observers) {
        if (_observers.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      action = "deleted";
    }
    for (i = 0, len = keys.length; i < len; i++) {
      if (_observers[keys[i]]) {
        for (j = 0, jlen = _observers[keys[i]].length; j < jlen; j++) {
          _observers[keys[i]][j](keys[i], action);
        }
      }
      if (_observers["*"]) {
        for (j = 0, jlen = _observers["*"].length; j < jlen; j++) {
          _observers["*"][j](keys[i], action);
        }
      }
    }
  }

  /**
   * Publishes key change to listeners
   */
  function _publishChange() {
    const updateTime = (+new Date()).toString();

    if (_backend == "localStorage" || _backend == "globalStorage") {
      try {
        _storage_service.jStorage_update = updateTime;
      } catch (E8) {
        // safari private mode has been enabled after the jStorage initialization
        _backend = false;
      }
    } else if (_backend == "userDataBehavior") {
      _storage_elm.setAttribute("jStorage_update", updateTime);
      _storage_elm.save("jStorage");
    }

    _storageObserver();
  }

  /**
   * Loads the data from the storage based on the supported mechanism
   */
  function _load_storage() {
    /* if jStorage string is retrieved, then decode it */
    if (_storage_service.jStorage) {
      try {
        _storage = JSON.parse(String(_storage_service.jStorage));
      } catch (E6) {
        _storage_service.jStorage = "{}";
      }
    } else {
      _storage_service.jStorage = "{}";
    }
    _storage_size = _storage_service.jStorage
      ? String(_storage_service.jStorage).length
      : 0;

    if (!_storage.__jstorage_meta) {
      _storage.__jstorage_meta = {};
    }
    if (!_storage.__jstorage_meta.CRC32) {
      _storage.__jstorage_meta.CRC32 = {};
    }
  }

  /**
   * This functions provides the 'save' mechanism to store the jStorage object
   */
  function _save() {
    _dropOldEvents(); // remove expired events
    try {
      _storage_service.jStorage = JSON.stringify(_storage);
      // If userData is used as the storage engine, additional
      if (_storage_elm) {
        _storage_elm.setAttribute("jStorage", _storage_service.jStorage);
        _storage_elm.save("jStorage");
      }
      _storage_size = _storage_service.jStorage
        ? String(_storage_service.jStorage).length
        : 0;
    } catch (E7) {
      /* probably cache is full, nothing is saved this way */
    }
  }

  /**
   * Function checks if a key is set and is string or numberic
   *
   * @param {String} key Key name
   */
  function _checkKey(key) {
    if (typeof key !== "string" && typeof key !== "number") {
      throw new TypeError("Key name must be string or numeric");
    }
    if (key == "__jstorage_meta") {
      throw new TypeError("Reserved key name");
    }
    return true;
  }

  /**
   * Removes expired keys
   */
  function _handleTTL() {
    let curtime;
    let i;
    let TTL;
    let CRC32;
    let nextExpire = Infinity;
    let changed = false;
    const deleted = [];

    clearTimeout(_ttl_timeout);

    if (
      !_storage.__jstorage_meta ||
      typeof _storage.__jstorage_meta.TTL !== "object"
    ) {
      // nothing to do here
      return;
    }

    curtime = +new Date();
    TTL = _storage.__jstorage_meta.TTL;

    CRC32 = _storage.__jstorage_meta.CRC32;
    for (i in TTL) {
      if (TTL.hasOwnProperty(i)) {
        if (TTL[i] <= curtime) {
          delete TTL[i];
          delete CRC32[i];
          delete _storage[i];
          changed = true;
          deleted.push(i);
        } else if (TTL[i] < nextExpire) {
          nextExpire = TTL[i];
        }
      }
    }

    // set next check
    if (nextExpire != Infinity) {
      _ttl_timeout = setTimeout(
        _handleTTL,
        Math.min(nextExpire - curtime, 0x7fffffff)
      );
    }

    // save changes
    if (changed) {
      _save();
      _publishChange();
      _fireObservers(deleted, "deleted");
    }
  }

  /**
   * Checks if there's any events on hold to be fired to listeners
   */
  function _handlePubSub() {
    let i;
    let len;
    if (!_storage.__jstorage_meta.PubSub) {
      return;
    }
    let pubelm;
    let _pubsubCurrent = _pubsub_last;
    const needFired = [];

    for (i = len = _storage.__jstorage_meta.PubSub.length - 1; i >= 0; i--) {
      pubelm = _storage.__jstorage_meta.PubSub[i];
      if (pubelm[0] > _pubsub_last) {
        _pubsubCurrent = pubelm[0];
        needFired.unshift(pubelm);
      }
    }

    for (i = needFired.length - 1; i >= 0; i--) {
      _fireSubscribers(needFired[i][1], needFired[i][2]);
    }

    _pubsub_last = _pubsubCurrent;
  }

  /**
   * Fires all subscriber listeners for a pubsub channel
   *
   * @param {String} channel Channel name
   * @param {Mixed} payload Payload data to deliver
   */
  function _fireSubscribers(channel, payload) {
    if (_pubsub_observers[channel]) {
      for (let i = 0, len = _pubsub_observers[channel].length; i < len; i++) {
        // send immutable data that can't be modified by listeners
        try {
          _pubsub_observers[channel][i](
            channel,
            JSON.parse(JSON.stringify(payload))
          );
        } catch (E) {}
      }
    }
  }

  /**
   * Remove old events from the publish stream (at least 2sec old)
   */
  function _dropOldEvents() {
    if (!_storage.__jstorage_meta.PubSub) {
      return;
    }

    const retire = +new Date() - 2000;

    for (
      let i = 0, len = _storage.__jstorage_meta.PubSub.length;
      i < len;
      i++
    ) {
      if (_storage.__jstorage_meta.PubSub[i][0] <= retire) {
        // deleteCount is needed for IE6
        _storage.__jstorage_meta.PubSub.splice(
          i,
          _storage.__jstorage_meta.PubSub.length - i
        );
        break;
      }
    }

    if (!_storage.__jstorage_meta.PubSub.length) {
      delete _storage.__jstorage_meta.PubSub;
    }
  }

  /**
   * Publish payload to a channel
   *
   * @param {String} channel Channel name
   * @param {Mixed} payload Payload to send to the subscribers
   */
  function _publish(channel, payload) {
    if (!_storage.__jstorage_meta) {
      _storage.__jstorage_meta = {};
    }
    if (!_storage.__jstorage_meta.PubSub) {
      _storage.__jstorage_meta.PubSub = [];
    }

    _storage.__jstorage_meta.PubSub.unshift([+new Date(), channel, payload]);

    _save();
    _publishChange();
  }

  /**
   * JS Implementation of MurmurHash2
   *
   *  SOURCE: https://github.com/garycourt/murmurhash-js (MIT licensed)
   *
   * @author <a href='mailto:gary.court@gmail.com'>Gary Court</a>
   * @see http://github.com/garycourt/murmurhash-js
   * @author <a href='mailto:aappleby@gmail.com'>Austin Appleby</a>
   * @see http://sites.google.com/site/murmurhash/
   *
   * @param {string} str ASCII only
   * @param {number} seed Positive integer only
   * @return {number} 32-bit positive integer hash
   */

  function murmurhash2_32_gc(str, seed) {
    let l = str.length;
    let h = seed ^ l;
    let i = 0;
    let k;

    while (l >= 4) {
      k =
        (str.charCodeAt(i) & 0xff) |
        ((str.charCodeAt(++i) & 0xff) << 8) |
        ((str.charCodeAt(++i) & 0xff) << 16) |
        ((str.charCodeAt(++i) & 0xff) << 24);

      k =
        (k & 0xffff) * 0x5bd1e995 +
        ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16);
      k ^= k >>> 24;
      k =
        (k & 0xffff) * 0x5bd1e995 +
        ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16);

      h =
        ((h & 0xffff) * 0x5bd1e995 +
          ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^
        k;

      l -= 4;
      ++i;
    }

    switch (l) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
      /* falls through */
      case 2:
        h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
      /* falls through */
      case 1:
        h ^= str.charCodeAt(i) & 0xff;
        h =
          (h & 0xffff) * 0x5bd1e995 +
          ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16);
    }

    h ^= h >>> 13;
    h =
      (h & 0xffff) * 0x5bd1e995 + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16);
    h ^= h >>> 15;

    return h >>> 0;
  }

  /// /////////////////////// PUBLIC INTERFACE /////////////////////////

  $.jStorage = {
    /* Version number */
    version: JSTORAGE_VERSION,

    /**
     * Sets a key's value.
     *
     * @param {String} key Key to set. If this value is not set or not
     *              a string an exception is raised.
     * @param {Mixed} value Value to set. This can be any value that is JSON
     *              compatible (Numbers, Strings, Objects etc.).
     * @param {Object} [options] - possible options to use
     * @param {Number} [options.TTL] - optional TTL value, in milliseconds
     * @return {Mixed} the used value
     */
    set(key, value, options) {
      _checkKey(key);

      options = options || {};

      // undefined values are deleted automatically
      if (typeof value === "undefined") {
        this.deleteKey(key);
        return value;
      }

      if (_XMLService.isXML(value)) {
        value = {
          _is_xml: true,
          xml: _XMLService.encode(value),
        };
      } else if (typeof value === "function") {
        return undefined; // functions can't be saved!
      } else if (value && typeof value === "object") {
        // clone the object before saving to _storage tree
        value = JSON.parse(JSON.stringify(value));
      }

      _storage[key] = value;

      _storage.__jstorage_meta.CRC32[key] = `2.${murmurhash2_32_gc(
        JSON.stringify(value),
        0x9747b28c
      )}`;

      this.setTTL(key, options.TTL || 0); // also handles saving and _publishChange

      _fireObservers(key, "updated");
      return value;
    },

    /**
     * Looks up a key in cache
     *
     * @param {String} key - Key to look up.
     * @param {mixed} def - Default value to return, if key didn't exist.
     * @return {Mixed} the key value, default value or null
     */
    get(key, def) {
      _checkKey(key);
      if (key in _storage) {
        if (
          _storage[key] &&
          typeof _storage[key] === "object" &&
          _storage[key]._is_xml
        ) {
          return _XMLService.decode(_storage[key].xml);
        }
        return _storage[key];
      }
      return typeof def === "undefined" ? null : def;
    },

    /**
     * Deletes a key from cache.
     *
     * @param {String} key - Key to delete.
     * @return {Boolean} true if key existed or false if it didn't
     */
    deleteKey(key) {
      _checkKey(key);
      if (key in _storage) {
        delete _storage[key];
        // remove from TTL list
        if (
          typeof _storage.__jstorage_meta.TTL === "object" &&
          key in _storage.__jstorage_meta.TTL
        ) {
          delete _storage.__jstorage_meta.TTL[key];
        }

        delete _storage.__jstorage_meta.CRC32[key];

        _save();
        _publishChange();
        _fireObservers(key, "deleted");
        return true;
      }
      return false;
    },

    /**
     * Sets a TTL for a key, or remove it if ttl value is 0 or below
     *
     * @param {String} key - key to set the TTL for
     * @param {Number} ttl - TTL timeout in milliseconds
     * @return {Boolean} true if key existed or false if it didn't
     */
    setTTL(key, ttl) {
      const curtime = +new Date();
      _checkKey(key);
      ttl = Number(ttl) || 0;
      if (key in _storage) {
        if (!_storage.__jstorage_meta.TTL) {
          _storage.__jstorage_meta.TTL = {};
        }

        // Set TTL value for the key
        if (ttl > 0) {
          _storage.__jstorage_meta.TTL[key] = curtime + ttl;
        } else {
          delete _storage.__jstorage_meta.TTL[key];
        }

        _save();

        _handleTTL();

        _publishChange();
        return true;
      }
      return false;
    },

    /**
     * Gets remaining TTL (in milliseconds) for a key or 0 when no TTL has been set
     *
     * @param {String} key Key to check
     * @return {Number} Remaining TTL in milliseconds
     */
    getTTL(key) {
      const curtime = +new Date();
      let ttl;
      _checkKey(key);
      if (
        key in _storage &&
        _storage.__jstorage_meta.TTL &&
        _storage.__jstorage_meta.TTL[key]
      ) {
        ttl = _storage.__jstorage_meta.TTL[key] - curtime;
        return ttl || 0;
      }
      return 0;
    },

    /**
     * Deletes everything in cache.
     *
     * @return {Boolean} Always true
     */
    flush() {
      _storage = {
        __jstorage_meta: {
          CRC32: {},
        },
      };
      _save();
      _publishChange();
      _fireObservers(null, "flushed");
      return true;
    },

    /**
     * Returns a read-only copy of _storage
     *
     * @return {Object} Read-only copy of _storage
     */
    storageObj() {
      function F() {}
      F.prototype = _storage;
      return new F();
    },

    /**
     * Returns an index of all used keys as an array
     * ['key1', 'key2',..'keyN']
     *
     * @return {Array} Used keys
     */
    index() {
      const index = [];
      let i;
      for (i in _storage) {
        if (_storage.hasOwnProperty(i) && i != "__jstorage_meta") {
          index.push(i);
        }
      }
      return index;
    },

    /**
     * How much space in bytes does the storage take?
     *
     * @return {Number} Storage size in chars (not the same as in bytes,
     *                  since some chars may take several bytes)
     */
    storageSize() {
      return _storage_size;
    },

    /**
     * Which backend is currently in use?
     *
     * @return {String} Backend name
     */
    currentBackend() {
      return _backend;
    },

    /**
     * Test if storage is available
     *
     * @return {Boolean} True if storage can be used
     */
    storageAvailable() {
      return !!_backend;
    },

    /**
     * Register change listeners
     *
     * @param {String} key Key name
     * @param {Function} callback Function to run when the key changes
     */
    listenKeyChange(key, callback) {
      _checkKey(key);
      if (!_observers[key]) {
        _observers[key] = [];
      }
      _observers[key].push(callback);
    },

    /**
     * Remove change listeners
     *
     * @param {String} key Key name to unregister listeners against
     * @param {Function} [callback] If set, unregister the callback, if not - unregister all
     */
    stopListening(key, callback) {
      _checkKey(key);

      if (!_observers[key]) {
        return;
      }

      if (!callback) {
        delete _observers[key];
        return;
      }

      for (let i = _observers[key].length - 1; i >= 0; i--) {
        if (_observers[key][i] == callback) {
          _observers[key].splice(i, 1);
        }
      }
    },

    /**
     * Subscribe to a Publish/Subscribe event stream
     *
     * @param {String} channel Channel name
     * @param {Function} callback Function to run when the something is published to the channel
     */
    subscribe(channel, callback) {
      channel = (channel || "").toString();
      if (!channel) {
        throw new TypeError("Channel not defined");
      }
      if (!_pubsub_observers[channel]) {
        _pubsub_observers[channel] = [];
      }
      _pubsub_observers[channel].push(callback);
    },

    /**
     * Publish data to an event stream
     *
     * @param {String} channel Channel name
     * @param {Mixed} payload Payload to deliver
     */
    publish(channel, payload) {
      channel = (channel || "").toString();
      if (!channel) {
        throw new TypeError("Channel not defined");
      }

      _publish(channel, payload);
    },

    /**
     * Reloads the data from browser storage
     */
    reInit() {
      _reloadData();
    },

    /**
     * Removes reference from global objects and saves it as jStorage
     *
     * @param {Boolean} option if needed to save object as simple 'jStorage' in windows context
     */
    noConflict(saveInGlobal) {
      delete window.$.jStorage;

      if (saveInGlobal) {
        window.jStorage = this;
      }

      return this;
    },
  };

  // Initialize jStorage
  _init();
})();

$(document).ready(() => {
  fCreateBIBCookie();
  fLatestFWVer();
  fInpStyle();
  fDivDynamic();
  fDivDynamic2();
  fStyleProcedureChecklist2();
  //   fSetSchemLink();
});

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
/** ********************* */

var bProduction = false;

function fOpenLink1() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "http://connectivity.chloridepower.com/GetFile.asp?flID=412&IsSoftware=Y"
  );
}

function fOpenLink2() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run("msedge " + "http://java.com/en/download/windows-64bit.jsp");
}

/* function fOpenLink3(){
  window.open("https://vertivco.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=b65d05b1-35a7-4869-b2d3-ab1f001a8ad8") } */

function fOpenLink4() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "https://web.microsoftstream.com/embed/video/71f34b79-7328-4fc7-9f9f-45b346ed5fe8?autoplay=false&amp;showinfo=true"
  );
}

function fOpenLink_myCEtv1() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "https://web.microsoftstream.com/embed/video/3e3f9e9b-e188-4ae7-8194-6c219b905e66?autoplay=false&amp;showinfo=true"
  );
}

function fOpenLink_myCEtv2() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "https://web.microsoftstream.com/embed/video/dc86227a-ba0d-4417-9cf3-a44932ff8a3f?autoplay=false&amp;showinfo=true"
  );
}

function fOpenLink_myCEtv3() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "https://web.microsoftstream.com/embed/video/d73e4c64-1c08-4cbf-a579-06f1f05f97e7?autoplay=false&amp;showinfo=true"
  );
}

function fOpenLink_myCEtv4() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "https://web.microsoftstream.com/embed/video/7ede21d3-7225-46da-968b-c1bd87379c49?autoplay=false&amp;showinfo=true"
  );
}

function fOpenLink_myCEtv5() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "https://web.microsoftstream.com/embed/video/d21737ce-72cd-4751-b435-1abda454a91b?autoplay=false&amp;showinfo=true"
  );
}

function fOpenLink_myCEtv6() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "https://web.microsoftstream.com/embed/video/ee0e9b12-70cf-4d0e-ac9c-38790b78206e?autoplay=false&amp;showinfo=true"
  );
}

function fOpenLink_myCEtv7() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "https://web.microsoftstream.com/embed/video/de6f2dc6-9203-4a50-87a1-6fb3177f919f?autoplay=false&amp;showinfo=true"
  );
}

function fOpenLink_myCEtv8() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "https://web.microsoftstream.com/embed/video/d8fb8b7d-bb89-4c36-a1d3-9a6690c4f25d?autoplay=false&amp;showinfo=true"
  );
}

function fOpenLink_myCEtv9() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "https://web.microsoftstream.com/embed/video/4a1d405e-6333-4b94-b3a6-55c85c07ced5?autoplay=false&amp;showinfo=true"
  );
}

function fOpenLink_myCEtv10() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "https://web.microsoftstream.com/embed/video/f3a488d6-5c29-437c-b881-0b136fea4bda?autoplay=false&amp;showinfo=true"
  );
}

function fOpenLink_myCEtv11() {
  const shell = new ActiveXObject("WScript.Shell");
  shell.run(
    "msedge " +
      "https://web.microsoftstream.com/embed/video/75228438-c092-446c-b841-ef5a50f1a167?autoplay=false&amp;showinfo=true"
  );
}

/* function fLaunchFlasher(){
  location.href = "C:/Program Files (x86)/Chloride Power/Flasher/Flasher.4.6.exe" } */

function fLaunchC2oooProg() {
  location.href = "C:/Program Files/C2oooProg/C2oooProg.exe ";
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

function CalcCalib() {
  const inp1 = document.getElementById("input1").value;

  if (isNaN(inp1)) {
    alert("Please enter a numerical value.");
  } else if (inp1 > 8.3) {
    alert("Please enter a value less than 8.3.");
    document.getElementById("result2").value = "";
    document.getElementById("result1").value = "";
  } else if (inp1 < 8.4 && inp1.length > 0) {
    document.getElementById("result2").value = (21.6 * inp1).toFixed(2);
    document.getElementById("result1").value = (
      3932.16 * (1000 / 60 - inp1) -
      65536
    ).toFixed(0);
  } else {
    document.getElementById("result2").value = "";
    document.getElementById("result1").value = "";
  }
}
function CalcCalib2() {
  const inp3 = document.getElementById("input3").value;

  if (isNaN(inp3)) {
    alert("Please enter a numerical value.");
  } else if (inp3 > 180) {
    alert("Please enter a value less than 180.");
    document.getElementById("result3").value = "";
  } else if (inp3 < 181 && inp3.length > 0) {
    document.getElementById("result3").value = (
      182.045 * (360 - inp3) -
      65536
    ).toFixed(0);
  } else {
    document.getElementById("result3").value = "";
  }
}
function CalcCalib3() {
  const inp4 = document.getElementById("input4").value;

  if (isNaN(inp4)) {
    alert("Please enter a numerical value.");
  } else if (inp4 > 8.3) {
    alert("Please enter a value less than 8.3.");
    document.getElementById("result4").value = "";
    document.getElementById("result5").value = "";
  } else if (inp4 < 8.4 && inp4.length > 0) {
    document.getElementById("result5").value = (21.6 * inp4).toFixed(2);
    document.getElementById("result4").value = (3931.16 * inp4).toFixed(0);
  } else {
    document.getElementById("result4").value = "";
    document.getElementById("result5").value = "";
  }
}
function CalcCalib4() {
  const inp5 = document.getElementById("input5").value;

  if (isNaN(inp5)) {
    alert("Please enter a numerical value.");
  } else if (inp5 > 180) {
    alert("Please enter a value less than 180.");
    document.getElementById("result6").value = "";
  } else if (inp5 < 181 && inp5.length > 0) {
    document.getElementById("result6").value = (182.045 * inp5).toFixed(0);
  } else {
    document.getElementById("result6").value = "";
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

function fDivDynamic() {
  if ($(".div-dynamic").length > 0) {
    $(".div-dynamic").each(function (i, val) {
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
                div.filter(src).fadeIn(1000);
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
      });
      index.find("span").eq(0).addClass("selected");
      div.not(":first").css("display", "none");
    });
  }
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
        const bPerformed = $.jStorage.get(jStoreKey, 0);
        $("<input>", {
          type: "checkbox",
          change() {
            if ($(this).prop("checked")) {
              const sConfirm =
                "Please confirm that you have performed this step by clicking OK.\r\n" +
                "If you have not performed this step yet, please click CANCEL.";

              const oConfirm = window.confirm(sConfirm);
              if (oConfirm) {
                $.jStorage.set(jStoreKey, 1);
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

function fStyleDivDropdownSelector() {
  const cTableSet = $(".div-selector");
  if (cTableSet.length > 0) {
    cTableSet.each((cTableSet_i, cTableSet_o) => {
      const oSelectorHolder = $("<div/>").insertBefore(
        $(cTableSet_o).children()[0]
      );
      const oSelectorLabel = $("<span/>", {
        text: "Select content to Display:",
      })
        .appendTo(oSelectorHolder)
        .addClass("selector-table-label");
      // .css('display','block')
      const cTable = $(cTableSet_o)
        .find("div[class=section]")
        .parent("div")
        .hide();
      const oDropDown = $("<select/>")
        .appendTo($(oSelectorHolder))
        .change(function () {
          cTable.hide().eq($(this).find("option:selected").index()).fadeIn();
        });
      cTable.eq(0).fadeIn();

      $(cTableSet_o)
        .find("div[class=section]")
        .each((cTable_i, cTable_o) => {
          const oTableHolder = $(cTableSet_o)
            .find("div[class=section]")
            .parent("div");
          const sTableTitle = $(cTable_o).find("h2").text();
          $("<option/>", { text: sTableTitle, value: cTable_i }).appendTo(
            oDropDown
          );
        });
    });
    $(".div-selector").children("div").css({
      "margin-top": "0px",
      "margin-bottom": "0px",
    });
    $(".div-selector h2").css("border-top", "none");
    $("h2").parent().css({
      "border-top": "none",
    });
    $(".section-padding").remove();
  }
}

function fClearSelect() {
  $("select").each(function () {
    $(this).find("option").eq(0).attr("selected", "selected");
  });
}

function fLibClearTab(tab) {
  tab.find("tr").each(function () {
    $(this).find("td:not(:first)").html("");
  });
}

function fCreateLibSetTable(oSetting, $tab) {
  if (oSetting.length == 1) {
    $($tab).find("td").eq(1).html($(oSetting).find("pnu1510_1").text());
    $($tab).find("td").eq(5).html($(oSetting).find("pnu1510_2").text());
    $($tab).find("td").eq(9).html($(oSetting).find("pnu1510_3").text());
    $($tab).find("td").eq(13).html($(oSetting).find("pnu1510_4").text());
    $($tab).find("td").eq(17).html($(oSetting).find("pnu1510_5").text());
    $($tab).find("td").eq(21).html($(oSetting).find("pnu1510_6").text());

    $($tab).find("td").eq(2).html($(oSetting).find("pnu1511_1").text());
    $($tab).find("td").eq(6).html($(oSetting).find("pnu1511_2").text());
    $($tab).find("td").eq(10).html($(oSetting).find("pnu1511_3").text());
    $($tab).find("td").eq(14).html($(oSetting).find("pnu1511_4").text());
    $($tab).find("td").eq(18).html($(oSetting).find("pnu1511_5").text());
    $($tab).find("td").eq(22).html($(oSetting).find("pnu1511_6").text());

    $($tab).find("td").eq(3).html($(oSetting).find("pnu1513_1").text());
    $($tab).find("td").eq(7).html($(oSetting).find("pnu1513_2").text());
    $($tab).find("td").eq(11).html($(oSetting).find("pnu1513_3").text());
    $($tab).find("td").eq(15).html($(oSetting).find("pnu1513_4").text());
    $($tab).find("td").eq(19).html($(oSetting).find("pnu1513_5").text());
    $($tab).find("td").eq(23).html($(oSetting).find("pnu1513_6").text());
  } else {
    fLibClearTab($tab);
  }
}

function fCreatePNU1530Tab(rating, strNum, arr) {
  const $tab = $("#lib_pnu1530 table");
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
  const p1530Max = p1530maxArr[jQuery.inArray(rating, rateArr)];

  const p1530 =
    arr[parseInt(strNum) - 1] > p1530Max ? p1530Max : arr[parseInt(strNum) - 1];

  // alert(p1530Max)

  $tab.find("td").eq(0).text(strNum);
  $tab.find("td").eq(1).text(p1530);
}

function fLoadSamLibCalc() {
  // fLoadXML(`${baseUrl}custom/libs/tko.libsam.clr`);
  fClearSelect();

  const pnu1530 = [
    220, 440, 660, 880, 1100, 1320, 1540, 1760, 1980, 2200, 2420, 2640,
  ];

  const $tab = $("#lib_setting table");

  $("select").change(() => {
    const sRating = $("select[name=rating]").val();
    const sPnu1605 = $("select[name=pnu1605]").val();
    const sCellNum = $("select[name=cellnum]").val();
    const sStringNum = $("select[name=stringnum]").val();

    if (
      sRating != "" &&
      sPnu1605 != "" &&
      sCellNum != "" &&
      sStringNum != ""
    ) {
      const oSetting = $($oFunctionNode).filter(function () {
        return (
          $(this).attr("rating") == sRating &&
          $(this).attr("pnu1605") == sPnu1605 &&
          $(this).attr("cellnum") == sCellNum &&
          $(this).attr("stringnum") == sStringNum
        );
      });
      fCreateLibSetTable(oSetting, $tab);
      fCreatePNU1530Tab(sRating, sStringNum, pnu1530);
    } else {
      fLibClearTab($tab);
    }
  });

  $("select[name=rating]").change(() => {
    $("select[name=stringnum]").find("option").not(":eq(0)").remove();
    const sRating = $("select[name=rating]").val();

    if (sRating != "") {
      const arrStr = [];
      const oSetting = $($oFunctionNode).filter(function () {
        return $(this).attr("rating") == sRating;
      });

      $(oSetting).each(function () {
        const sStr = $(this).attr("stringnum");
        fUniqueArray(sStr, arrStr);
      });
      fLoadOptions(arrStr, $("select[name=stringnum]"));
    }
  });
}

function fLoadHPLLibCalc() {
  // fLoadXML("tko.libhpl.clr");
  fClearSelect();

  const $tab = $("#lib_setting table");
  const pnu1530 = [300, 500, 700, 800, 900, 1000, 1100, 1200, 1200];

  $("select").change(() => {
    const sRating = $("select[name=rating]").val();
    const sPnu1605 = $("select[name=pnu1605]").val();
    const sCelTemp = $("select[name=celtemp]").val();
    const sStringNum = $("select[name=stringnum]").val();

    if (
      sRating != "" &&
      sPnu1605 != "" &&
      sCelTemp != "" &&
      sStringNum != ""
    ) {
      const oSetting = $($oFunctionNode).filter(function () {
        return (
          $(this).attr("rating") == sRating &&
          $(this).attr("pnu1605") == sPnu1605 &&
          $(this).attr("celtemp") == sCelTemp &&
          $(this).attr("cellnum") == "132" &&
          $(this).attr("stringnum") == sStringNum
        );
      });

      fCreateLibSetTable(oSetting, $tab);
      fCreatePNU1530Tab(sRating, sStringNum, pnu1530);
    } else {
      fLibClearTab($tab);
    }
  });

  $("select[name=rating]").change(() => {
    $("select[name=stringnum]").find("option").not(":eq(0)").remove();
    const sRating = $("select[name=rating]").val();

    if (sRating != "") {
      const arrStr = [];
      const oSetting = $($oFunctionNode).filter(function () {
        return $(this).attr("rating") == sRating;
      });

      $(oSetting).each(function () {
        const sStr = $(this).attr("stringnum");
        fUniqueArray(sStr, arrStr);
      });
      fLoadOptions(arrStr, $("select[name=stringnum]"));
    }
  });
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

function fUniqueArray(text, arr_o) {
  if ($.inArray(text, arr_o) == -1) {
    arr_o.push(text);
  }
}

function fLoadOptions(arr_i, sel_o) {
  sel_o.find("option").not(":first").remove();
  for (j = 0; j < arr_i.length; j++) {
    $("<option />", {
      value: arr_i[j],
      html: arr_i[j],
    }).appendTo(sel_o);
  }
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
