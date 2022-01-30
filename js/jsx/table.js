function getTabel(objectKeys, objectList) {
  let tempObjectKeys = objectKeys.map((ele) => ele.replace("_", " "));
  var templet = `
    <table class="table">
        <thead>
            <tr>
                ${tempObjectKeys.map((elem) => `<th>${elem}</th>`).join("")}
            </tr>
        </thead>
        <tbody>
            ${objectList
              .map(
                (elem) =>
                  `<tr>${objectKeys
                    .map((key) => `<td>${elem[key]}</td>`)
                    .join("")}</tr>`
              )
              .join("")}
        </tbody>
    </table>
    `;

  return templet;
}

export { getTabel };
