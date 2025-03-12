document.addEventListener("keydown", function (event) {
  if (event.altKey && event.code === "KeyN") {
    event.preventDefault();

    if (!window.location.href.includes("claude.ai")) {
      return;
    }

    const chatIdMatch = window.location.pathname.match(/\/chat\/([\w-]+)/);
    const chatId = chatIdMatch ? chatIdMatch[1] : null;

    if (chatId) {
      window.location.href = "https://claude.ai/new";
      chrome.storage.local.get(["orgId"], function (result) {
        const orgId = result.orgId;
        if (!orgId) {
          console.error(
            "No organisation ID provided. Click the extension icon to provide one.",
          );
          return;
        }

        fetch(
          `https://claude.ai/api/organizations/${orgId}/chat_conversations/${chatId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        ).catch(() => {
          console.error("Failed with chatId:", chatId);
        });
      });
    } else {
      console.log("No chat ID present.");
      return;
    }
  }
});
