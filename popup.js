document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(["orgId"], function (result) {
    if (result.orgId) {
      document.getElementById("orgId").value = result.orgId;
    }
  });

  document.getElementById("saveBtn").addEventListener("click", function () {
    const orgId = document.getElementById("orgId").value;
    chrome.storage.local.set({ orgId: orgId }, function () {
      const status = document.getElementById("status");
      status.textContent = "Organization ID saved!";
      setTimeout(function () {
        status.textContent = "";
      }, 2000);
    });
  });
});
