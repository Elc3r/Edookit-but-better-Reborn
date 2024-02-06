// ==UserScript==
// @name        Edookit, but better
// @description Vylepšení některých stránek Eddokitu.
// @match        *://*.edookit.net/evaluation/*
// ==/UserScript==
/*
$( document ).ready(function() {

  var cnt = 0;
  var sum = 0;

  $( ".summary-list").each(function( index ) {
    cnt = 0;
    sum = 0;

    $("span", this).each(function(index) {
      var isOverall = $(this).html().includes("font-size:140%");

      if ($(this).attr("title") != undefined || isOverall) {
        var znamka = $(this).text().replace(", ","").replace("Nehodnoceno","N/A");

        var znamka2 = "";
        if (znamka.includes("(dnes)")) { znamka2 = " <i>d</i>"; znamka = znamka.replace("(dnes)", "");}
        if (znamka.includes("(včera)")) { znamka2 = " <i>v</i>"; znamka = znamka.replace("(včera)", "");}

        if (znamka.charAt(0) == "1") {znamka = "<span style='color:#008C00;'>" + znamka + "</span>"; if (!isOverall) {cnt++; sum+=1;}}
        if (znamka.charAt(0) == "2") {znamka = "<span style='color:#C79810;'>" + znamka + "</span>"; if (!isOverall) {cnt++; sum+=2;}}
        if (znamka.charAt(0) == "3") {znamka = "<span style='color:#FF7400;'>" + znamka + "</span>"; if (!isOverall) {cnt++; sum+=3;}}
        if (znamka.charAt(0) == "4") {znamka = "<span style='color:#FF1A00;'>" + znamka + "</span>"; if (!isOverall) {cnt++; sum+=4;}}
        if (znamka.charAt(0) == "5") {znamka = "<span style='color:#CC0000;'>" + znamka + "</span>"; if (!isOverall) {cnt++; sum+=5;}}

        var title = "";
        if (!isOverall)
          var title = ("[" + $(this).attr("title").replace("<p>"," ").replace("</p>"," ") + "]").replace("[, ","[").replace("[","").replace("]","");

        var newHtml = "";
        if (isOverall)
          newHtml = "<b style='display:inline-block;width: 32px;border-radius:4px;background-color:#eee;'>" + znamka + znamka2 + "</b>" + title + "<br/>";
        else
          newHtml = "<b style='display:inline-block;width: 32px;'>" + znamka + znamka2 + "</b>" + title + "<br/>";

        $(this).html(newHtml);
      }
    });

    var bgColor = "black";
    if (Math.round(sum/cnt) == 1) bgColor = "#008C00";
    if (Math.round(sum/cnt) == 2) bgColor = "#C79810";
    if (Math.round(sum/cnt) == 3) bgColor = "#FF7400";
    if (Math.round(sum/cnt) == 4) bgColor = "#FF1A00";
    if (Math.round(sum/cnt) == 5) bgColor = "#CC0000";

    if (cnt > 0) {
      $(this).html("<div style='display: inline-block; margin: 0 0 8px 0; padding: 3px 4px; background-color:" + bgColor + ";color:white;font-weight:bold; border-radius:4px;'>⌀ " 
        + Math.round(sum*100/cnt)/100 + "</div><br/>" + $(this).html());
    }
  });

});
*/

$(document).ready(function () {

  $(".summary-list").each(function (index) {
      var cnt = 0;
      var sum = 0;
      var weightedSum = 0;
      var totalWeight = 0;

      $("span", this).each(function (index) {
          var isOverall = $(this).html().includes("font-size:140%");

          if ($(this).attr("title") != undefined || isOverall) {
              var znamka = $(this).text().replace(", ", "").replace("Nehodnoceno", "N/A");

              var znamka2 = "";
              if (znamka.includes("(dnes)")) {
                  znamka2 = " <i>d</i>";
                  znamka = znamka.replace("(dnes)", "");
              }
              if (znamka.includes("(včera)")) {
                  znamka2 = " <i>v</i>";
                  znamka = znamka.replace("(včera)", "");
              }

              if (znamka.charAt(0) == "1") {
                  znamka = "<span style='color:#008C00;'>" + znamka + "</span>";
                  if (!isOverall) {
                      var weight = getWeight($(this));
                      cnt++;
                      sum += 1;
                      weightedSum += 1 * weight;
                      totalWeight += weight;
                  }
              }
              if (znamka.charAt(0) == "2") {
                  znamka = "<span style='color:#C79810;'>" + znamka + "</span>";
                  if (!isOverall) {
                      var weight = getWeight($(this));
                      cnt++;
                      sum += 2;
                      weightedSum += 2 * weight;
                      totalWeight += weight;
                  }
              }
              if (znamka.charAt(0) == "3") {
                  znamka = "<span style='color:#FF7400;'>" + znamka + "</span>";
                  if (!isOverall) {
                      var weight = getWeight($(this));
                      cnt++;
                      sum += 3;
                      weightedSum += 3 * weight;
                      totalWeight += weight;
                  }
              }
              if (znamka.charAt(0) == "4") {
                  znamka = "<span style='color:#FF1A00;'>" + znamka + "</span>";
                  if (!isOverall) {
                      var weight = getWeight($(this));
                      cnt++;
                      sum += 4;
                      weightedSum += 4 * weight;
                      totalWeight += weight;
                  }
              }
              if (znamka.charAt(0) == "5") {
                  znamka = "<span style='color:#CC0000;'>" + znamka + "</span>";
                  if (!isOverall) {
                      var weight = getWeight($(this));
                      cnt++;
                      sum += 5;
                      weightedSum += 5 * weight;
                      totalWeight += weight;
                  }
              }

              var title = "";
              if (!isOverall)
                  var title = ("[" + $(this).attr("title").replace("<p>", " ").replace("</p>", " ") + "]").replace("[, ", "[").replace("[", "").replace("]", "");

              var newHtml = "";
              if (isOverall)
                  newHtml = "<b style='display:inline-block;width: 45px;border-radius:4px;background-color:#eee;'>" + znamka + znamka2 + "</b>" + title + "<br/>";
              else
                  newHtml = "<b style='display:inline-block;width: 45px;'>" + znamka + znamka2 + "</b>" + title + "<br/>";

              $(this).html(newHtml);
          }
      });

      var bgColor = "black";
      if (cnt > 0) {
          var average = Math.round(sum * 100 / cnt) / 100; // Aritmetický průměr
          var weightedAverage = Math.round(weightedSum * 100 / totalWeight) / 100; // Váhový průměr
          if (average <= 1.5) bgColor = "#008C00";
          else if (average <= 2.5) bgColor = "#C79810";
          else if (average <= 3.5) bgColor = "#FF7400";
          else if (average <= 4.5) bgColor = "#FF1A00";
          else bgColor = "#CC0000";

          $(this).html("<div style='display: inline-block; margin: 0 0 8px 0; padding: 3px 4px; background-color:" + bgColor + ";color:white;font-weight:bold; border-radius:4px;'>⌀ "
              + "Průměr: " + average + " | Váhový průměr: " + weightedAverage + "</div><br/>" + $(this).html());
      }
  });

  function getWeight(element) {
      var weightString = $(element).attr("title");
      if (weightString !== undefined) {
          var weightMatch = weightString.match(/Váha: (\d+)/);
          if (weightMatch !== null && weightMatch.length === 2) {
              return parseInt(weightMatch[1]);
          }
      }
      return 1; // Výchozí váha pokud není specifikována
  };

  // Přidání CSS stylů
  $("<style>")
  .prop("type", "text/css")
  .html(`
      table.coursesEvaluation > tbody > tr > th {color:#ccc;}
      table.coursesEvaluation > tbody > tr > td {padding-top: 6px;}
      .summary-list {font-size: 12pt !important; font-weight:normal !important;}
  `)
  .appendTo("head");
  
  // Odstraní nativní Průběžný průměr
  $(".evalArcContainer").remove();

});
