window.onload = () => {
  const converter = new showdown.Converter();
  const pad = document.querySelector("#pad");
  const markdownArea = document.querySelector("#markdown");

  pad.addEventListener("keydown", function (e) {
    if (e.keyCode === 9) {
      var start = this.selectionStart;
      var end = this.selectionEnd;

      var target = e.target;
      var value = target.value;

      target.value = value.substring(0, start) + "\t" + value.substring(end);

      this.selectionStart = this.selectionEnd = start + 1;

      e.preventDefault();
    }
  });

  var previousMarkdownValue;

  const convertTextAreaToMarkdown = () => {
    const markdownText = pad.value;
    previousMarkdownValue = markdownText;
    const html = converter.makeHtml(markdownText);
    markdownArea.innerHTML = html;
  };

  setInterval(() => {
    if (previousMarkdownValue != pad.value) {
      convertTextAreaToMarkdown();
    }
  }, 1000);

  pad.addEventListener("input", convertTextAreaToMarkdown);

  if (document.location.pathname.length > 1) {
    var documentName = document.location.pathname.substring(1);
    sharejs.open(documentName, "text", function (error, doc) {
      doc.attach_textarea(pad);
      convertTextAreaToMarkdown();
    });
  }

  convertTextAreaToMarkdown();
};
