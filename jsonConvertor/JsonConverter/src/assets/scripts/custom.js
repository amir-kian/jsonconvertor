
function OpenTextModal() {
    debugger;
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();

}

function CloseAllActiveModals() {
    $('.modal').modal('hide');
}
function OpenPlaceholderModal(event) {
    debugger;
    if (event.target.innerHTML == "]" || event.target.innerHTML == "[")
        return;
    const element = $(event.target).closest('[data-index]');
    // get the value of the data-index attribute
    const formulaIndex = element.attr('data-index');
    var x = event.target.innerHTML;
    //  console.log('event:',event);
    document.getElementById('FormulaIndex').value = formulaIndex;
    document.getElementById('placeHolderIndex').value = x;
    debugger;
    //set placeHolder value
    const myObject = JSON.parse(document.getElementById('Formula').value);
    const secondPropertyItem = myObject[formulaIndex]?.Value?.Properties[x - 1] || "";
    document.getElementById('PlaceHoldercomment').value = secondPropertyItem.Name;

    var myModal = new bootstrap.Modal(document.getElementById('Placeholder'));
    myModal.show();

}
function removeInput(index) {
    debugger;
    $("#formula" + index + "").remove();

}
function callSelect2() {
    debugger;
    $('.select2').select2();
}
/*
نمایش و ست محتوا دیوکناری فرمول
*/
function changeShowFormula(id, text) {

    var resultText = "";
    for (var i = 0; i < text.length; i++) {
        resultText += `<span>${text.charAt(i)}</span>`;
    }
    document.getElementById("showFormula" + id).innerHTML = resultText;
    FormatShowFormula(id);
}
function FormatShowFormula(id) {
    var addclass = ""
    var val = $("#showFormula" + id).children().each(function (index) {
        // console.log( index + ": " + $( this ).text() );
        if ($(this).text() == '[' || $(this).text() == ']') {
            if (addclass == "") {
                addclass = "ColoredText"
            }
            else {
                addclass = "";
            }
        }
        if ($(this).text() == '[' || $(this).text() == ']') {
            $(this).addClass("ColoredText");

        } else {
            $(this).addClass(addclass);
        }


    });//end foreach
    var str = $("#showFormula" + id).html();
    //var regex = /\[(.*?)\]/g;
    var regex = /<span class="ColoredText"\>\[(.*?)\]\<\/span\>/g;
    var match = str.match(regex);
    console.log('match:', match);

    $("#showFormula" + id).html(str.replace(regex, '<a class="red" onclick="OpenPlaceholderModal(event)" data-index="' + id + '">[$1]</a>'));



}

function ShowResult(jsonString) {
    document.getElementById('mappedResult').innerHTML = jsonString;

}
function GetPlaceHoderIndex() {
    return document.getElementById("placeHolderIndex").value;
}
function GetFormulaIndex() {
    return document.getElementById("FormulaIndex").value;
}

function beautifyJSON() {
    var ugly = document.getElementById('mappedResult').value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('mappedResult').innerHTML = pretty;
}

function SortTable(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function filterTable(filterValue) {
    debugger;
    const table = document.getElementById("filtertable");
    const rows = table.rows;

    for (let i = 1; i < rows.length; i++) {
      const cellValue = rows[i].cells[0].textContent.toLowerCase();
      if (cellValue.includes(filterValue.toLowerCase())) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }


