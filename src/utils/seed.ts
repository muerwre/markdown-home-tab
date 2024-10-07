// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.seedBrowserData = async () => {
  await browser.storage.sync.clear();
  await browser.storage.sync.set({
    "MarkdownEditorContainerMarkdownEditorContainerd87f6e7b-d21e-462e-9f15-a61da9178282":
      "d123",
    "MarkdownEditorContainerMarkdownEditorContainer8ea3f663-9c16-4d53-b0cc-25f47adae2b2":
      "d456",
    dockview_persistance_layout: {
      grid: {
        root: {
          type: "branch",
          data: [
            {
              type: "leaf",
              data: {
                views: ["d87f6e7b-d21e-462e-9f15-a61da9178282"],
                activeView: "d87f6e7b-d21e-462e-9f15-a61da9178282",
                id: "1",
                hideHeader: true,
              },
              size: 960,
            },
            {
              type: "leaf",
              data: {
                views: ["8ea3f663-9c16-4d53-b0cc-25f47adae2b2"],
                activeView: "8ea3f663-9c16-4d53-b0cc-25f47adae2b2",
                id: "2",
                hideHeader: true,
              },
              size: 960,
            },
          ],
          size: 437,
        },
        width: 1920,
        height: 437,
        orientation: "HORIZONTAL",
      },
      panels: {
        "d87f6e7b-d21e-462e-9f15-a61da9178282": {
          id: "d87f6e7b-d21e-462e-9f15-a61da9178282",
          contentComponent: "default",
          params: { title: "", locked: true },
        },
        "8ea3f663-9c16-4d53-b0cc-25f47adae2b2": {
          id: "8ea3f663-9c16-4d53-b0cc-25f47adae2b2",
          contentComponent: "default",
          params: { title: "", locked: true },
        },
      },
      activeGroup: "2",
    },
  });
};
