import jsonTaiwan from "../data/taiwan.json";
import jsonFinalTimeSeriesData from "../data/finalTimeSeriesData.json";

function getPercentHTMLString({ intChild, intParent }) {
  let finalString = "";
  if (intChild && intParent) {
    const percent = ((intChild * 100) / intParent).toFixed(2);
    if (percent > 5) {
      finalString = `<span style="color: red;">${percent}%</span>`;
    } else {
      finalString = `${percent}%`;
    }
  } else {
    finalString = "0%";
  }
  return finalString;
}

function generateGlobalTable() {
  let table = "";
  table += `
  <button id="btn-toggle">顯示/隱藏</button>
  <table id="dataTable-now" class="dataTable-virus display responsive nowrap">
      <thead>
            <tr>
                <th>Country</th>
                <th>Confirmed</th>
                <th>NewCon.</th>
                <th>NewCon.</th>
                <th>Deaths</th>
                <th>NewDea.</th>
                <th>NewDea.</th>
                <th>Recovered</th>
            </tr>
        </thead>
        <tbody>
        `;

  /* loop over each object in the array to create rows*/
  jsonFinalTimeSeriesData.forEach((item) => {
    table += `<tr>
    <td>${item.region}</td>
    <td>${item.confirmed}</td>
    <td>${item.newConfirmed}</td>
    <td>${getPercentHTMLString({
      intChild: item.newConfirmed,
      intParent: item.confirmed,
    })}</td>
    <td>${item.deaths}</td>
    <td>${item.newDeaths}</td>
    <td>${getPercentHTMLString({
      intChild: item.newDeaths,
      intParent: item.deaths,
    })}</td>
    <td>${item.recovered}</td>
    </tr>`;
  });
  table += "</tbody></table>";
  $("#dataTable").html(table);
  $(`#dataTable-now`).DataTable({
    order: [
      [2, "desc"],
      [3, "desc"],
    ],
    lengthMenu: [
      [8, 12],
      [8, 12],
    ],
    responsive: true,
    language: {
      search: "搜尋:",
      info: "_START_ - _END_ / _TOTAL_",
      paginate: {
        previous: "<",
        next: ">",
      },
    },
  });
  $("#btn-toggle").click(function () {
    $("#dataTable-now_wrapper").toggle();
  });
  $("#btn-toggle").click();
}

function generateTaiwanTable() {
  let table = "";
  table += `
  <button id="btn-toggle">顯示/隱藏</button>
  <table id="dataTable-now" class="dataTable-virus display responsive nowrap">
      <thead>
            <tr>
                <th>月份</th>    
                <th>縣市</th>
                <th>性別</th>
                <th>國籍</th>
                <th>年齡層</th>
                <th>病例數</th>
            </tr>
        </thead>
        <tbody>
        `;

  /* loop over each object in the array to create rows*/
  jsonTaiwan
    .filter((item) => item["確定病名"] === "嚴重特殊傳染性肺炎")
    .forEach((item) => {
      table += `<tr>
    <td>${item["發病月份"]}</td>
    <td>${item["縣市"]}</td>
    <td>${item["性別"]}</td>
    <td>${item["國籍"]}</td>
    <td>${item["年齡層"]}</td>
    <td>${item["確定病例數"]}</td>
    </tr>`;
    });
  table += "</tbody></table>";
  $("#dataTable").html(table);
  $(`#dataTable-now`).DataTable({
    order: [[0, "desc"]],
    responsive: true,
    lengthMenu: [
      [8, 12],
      [8, 12],
    ],
    language: {
      search: "搜尋:",
      info: "_START_ - _END_ / _TOTAL_",
      paginate: {
        previous: "<",
        next: ">",
      },
    },
  });
  $("#btn-toggle").click(function () {
    $("#dataTable-now_wrapper").toggle();
  });
  $("#btn-toggle").click();
}

export { generateGlobalTable, generateTaiwanTable };
