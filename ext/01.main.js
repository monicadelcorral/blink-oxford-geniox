oxfApp.config.tagDropdown = "block_dropdown";
oxfApp.config.tagTextCenter = "block_text_center";
oxfApp.config.tagTextUpCenter = "block_text_up_center";
oxfApp.config.tagTextUpLeft = "block_text_up_left";
oxfApp.config.tagBackgroundColorHelp = "home_help_background_color_";
oxfApp.config.tagBorderColorHelp = " home_help_border_color_";

// Get template

oxfApp.getTemplate = function (templateName) {
  switch (templateName) {
    case "1_rectangle":
      return ["1col ox-grid--lowerheight", 1];
      break;
    case "1_left_1_square_right":
      return ["2items", 2];
      break;
    case "1_square_left_1_right":
      return ["2items-reverse", 2];
      break;
    case "2_rectangle":
      return ["2col ox-grid--lowerheight", 2];
      break;
    case "2_left_1_right":
      return ["3items-reverse", 3];
      break;
    case "1_left_2_right":
      return ["3items", 3];
      break;
    case "3rectangle":
      return ["3col ox-grid--lowerheight", 3];
      break;
    case "3_rectangle":
      return ["3col ox-grid--lowerheight", 3];
      break;
    case "3_square":
      return ["3col", 3];
      break;
    case "4_square":
      return ["4col ox-grid--lowerheight", 4];
      break;
    case "4_rectangle":
      return ["4items", 4];
      break;
    case "1_square_left_4_right":
      return ["5items", 5];
      break;
    case "1_rectangle_left_4_right":
      return ["5items-bis", 5];
      break;
    case "6_rectangle":
      return ["6items", 6];
      break;
    case "1_left_2_centre_4right":
      return ["7items", 7];
      break;
    case "1_left_8_right":
      return ["9items", 9];
      break;
    case "12_square":
      return ["12items", 12];
      break;
    case "template1": //OLD
      return ["7items", 7];
      break;
    case "template2": //OLD
      return ["2items-reverse", 2];
      break;
    case "5_square": //NEW
      return ["5items-square", 5];
      break;
    case "4_rectangle_inline": //NEW
      return ["4items-nowrap", 4];
      break;
    default:
      return [
        oxfApp.config.templateDefault,
        oxfApp.config.templateDefaultTotal,
      ];
  }
};

// Get text align
oxfApp.getTextAlign = function (array) {
  if (array.indexOf(oxfApp.config.tagTextCenter) >= 0) {
    return "ox-ta-center";
  } else if (array.indexOf(oxfApp.config.tagTextUpCenter) >= 0) {
    return "ox-ta-center-up";
  } else if (array.indexOf(oxfApp.config.tagTextUpLeft) >= 0) {
    return "ox-ta-left-up";
  } else {
    return "";
  }
};

oxfApp.createBarAbove = function () {
  return "";
};

oxfApp.createSearchBar = function () {
  var barSearch =
    '<div class="ox-searchbar"><div class="ox-container"><div class="ox-searchbar__inner"><div class="ox-searchform"><label class="ox-searchform__field"><input type="text" class="ox-searchform__field__input ox--js-triggersearch" placeholder="' +
    oxfApp.text.oxford_zona_recursos_2020_searchPlaceHolder +
    '"><span class="ox-searchform__field__button"></span></label><div class="ox-searchform__results"><div class="ox-searchform__results__inner ox--js-resultslist"></div></div></div></div></div></div>';

  return barSearch;
};

oxfApp.blockDropdown = function (block) {
  var data = oxfApp.courseData;
  $.each(data.units, function (i, unit) {
    var unitInd = i;
    var isBeforeYouStart = unitInd === oxfApp.beforeYouStartUnit;
    if (!isBeforeYouStart) {
      var unitTags = unit.tags,
        unitTagsArray =
          typeof unitTags !== "undefined" ? unitTags.split(" ") : [];
      $.each(unitTagsArray, function (index, value) {
        value = value.toLowerCase();

        if (oxfApp.startsWith(value, oxfApp.config.nBlockBox)) {
          //nBlocks
          var isDropdown =
            unitTagsArray.indexOf(oxfApp.config.tagDropdown) >= 0;

          if (isDropdown) {
            var currentBlockID = "ox-nblock-" + unitInd;
            var isShown = oxfApp.getBoolean(
                oxfApp.storage.getItem(currentBlockID)
              ),
              visibleClass = isShown ? "ox-visible" : "",
              toggleButtonText = isShown
                ? oxfApp.text.oxford_zona_recursos_2020_hide
                : oxfApp.text.oxford_zona_recursos_2020_show,
              toggleButton =
                '<button class="ox-link ox--js-toggleBlock" data-text-shown="' +
                oxfApp.text.oxford_zona_recursos_2020_hide +
                '" data-text-hidden="' +
                oxfApp.text.oxford_zona_recursos_2020_show +
                '">' +
                toggleButtonText +
                "</button>";

            $("#" + currentBlockID)
              .addClass("ox-module--togglable")
              .addClass(visibleClass)
              .find(".ox-module__header")
              .append(toggleButton);
          }
        } else if (oxfApp.startsWith(value, oxfApp.config.nBlockBoxContent)) {
          //nBlocks content
          var unitID = unit.id;
          var textAlign = oxfApp.getTextAlign(unitTagsArray);
          $('.ox-card__inner[data-unitid="' + unitID + '"]').addClass(
            textAlign
          );
        }
      });
    }
  });
};

oxfApp.loadHomeGeniox = function () {
  $(".ox-module--header").after(oxfApp.createSearchBar());

  var $moduleFLoatingBubble = $("#ox-module-bys");

  var tagsCover = oxfApp.courseData.units[0].subunits[0].tags,
    tagsCoverArray =
      typeof tagsCover !== "undefined" ? tagsCover.split(" ") : [];

  var backgroundColor = "#e1f4f3";
  var borderColor = "#e1f4f3";

  $.each(tagsCoverArray, function (index, value) {
    value = value.toLowerCase();

    if (oxfApp.startsWith(value, oxfApp.config.tagBackgroundColorHelp)) {
      backgroundColor = value.replace(
        oxfApp.config.tagBackgroundColorHelp,
        "#"
      );
    }
    if (oxfApp.startsWith(value, oxfApp.config.tagBorderColorHelp)) {
      borderColor = value.replace(oxfApp.config.tagBorderColorHelp, "#");
    }
  });

  var styleNode = document.createElement("style");
  var styleText = document.createTextNode("#ox-module-bys:not(.ox-visible) {background-color: "+ backgroundColor +"; border-color: "+ borderColor +"}");
  styleNode.appendChild(styleText);
  document.getElementsByTagName("head")[0].appendChild(styleNode);

  var $floatingBubbleButton = $moduleFLoatingBubble.find(".ox--js-toggleBlock");
  $moduleFLoatingBubble
    .addClass("ox-floatingbubble")
    .removeClass("ox-module--togglable");

  $floatingBubbleButton
    .addClass("ox--js-toggleBubble")
    .removeClass("ox--js-toggleBlock")
    .attr("data-text-shown", "Volver")
    .wrapAll(
      '<div class="ox-floatingbubble__footer"><div class="ox-container"></div></div>'
    );

  var $scrollable = $(".ox-page");

  $scrollable.scroll(function () {
    var st = $(this).scrollTop();
    document.documentElement.style.setProperty("--st", st + "px");
  });

  //Dropdown functionality
  oxfApp.blockDropdown();
};

//----------------------------------//
//                                  //
//  Document Ready                  //
//                                  //
//----------------------------------//

$(document).ready(function () {
  var intervalLoadHome = setInterval(initGeniox, 250);

  function initGeniox() {
    var coverID = oxfApp.config.coverID;

    if (coverID && oxfApp.courseData !== "") {
      var isBookCover = idclase.toString() === coverID;

      if (isBookCover) {
        oxfApp.loadHomeGeniox();
      }
      clearInterval(intervalLoadHome);
    }
  }

  $("body").on("click", ".ox--js-toggleBubble", function (e) {
    e.preventDefault();

    var block = $(this).closest(".ox-floatingbubble"),
      shown = block.hasClass("ox-visible"),
      text = shown
        ? $(this).attr("data-text-hidden")
        : $(this).attr("data-text-shown");

    if (shown) {
      block.removeClass("ox-visible");
      $("body").removeClass("ox-bubbleVisible");
    } else {
      block.addClass("ox-visible");
      $("body").addClass("ox-bubbleVisible");
    }

    $(this).text(text);
  });
});
