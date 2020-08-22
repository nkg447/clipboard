const textarea = document.getElementsByTagName("textarea")[0];

fetch("/get")
  .then((req) => req.text())
  .then((data) => (textarea.value = data));

let timeoutId;
$("textarea").on("input propertychange change", function () {
  console.log("Textarea Change");
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function () {
    // Runs 1 second (1000 ms) after the last change
    saveToDB();
  }, 1000);
});

function saveToDB() {
  console.log("Saving to the db");
  let data = textarea.value;
  console.log(data);
  fetch("/save", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ data }), // body data type must match "Content-Type" header
  });
}
