function getDocumentTitle(vm: any) {
  const { documentTitle } = vm;
  if (documentTitle) {
    return typeof documentTitle === "function" ? documentTitle.call(vm) : documentTitle;
  }
}

export default {
  created() {
    const DEFAULT_DOCUMENT_TITLE = "reptrack";
    const documentTitle = getDocumentTitle(this);
    if (documentTitle) {
      console.log("im in");
      document.title = `${DEFAULT_DOCUMENT_TITLE} - ${documentTitle}`;
    } else {
      console.log("im not in");
      document.title = DEFAULT_DOCUMENT_TITLE;
    }
  }
};
