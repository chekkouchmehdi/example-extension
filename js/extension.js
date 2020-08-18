(function() {
  class ExampleExtension extends window.Extension {
    constructor() {
      super('{{example-extension}}');                                                                       // <--- example-extension is the id of your extension please modify it here and in the manifest and the folder name
      this.addMenuEntry('{{Example Extension}}');                                                           // <--- Example Extension is the name appeared in the Menu modify it with your extension name


      if (!window.Extension.prototype.hasOwnProperty('load')) {
        this.load();
      }
    }
                                                                                                        // <--- Loading function is mandatory
    load() {                                                                                               
      this.content = '';
      return fetch(`/extensions/${this.id}/views/content.html`)
        .then((res) => res.text())
        .then((text) => {
          this.content = text;
        })
        .catch((e) => console.error('Failed to fetch content:', e));
    }
                                                                                                        // <--- Show function edit here your js code
    show() {                                                                                              
      this.view.innerHTML = this.content;

      const key =
        document.getElementById('extension-example-extension-form-key');
      const value =
        document.getElementById('extension-example-extension-form-value');
      const submit =
        document.getElementById('extension-example-extension-form-submit');
      const pre =
        document.getElementById('extension-example-extension-response-data');

      submit.addEventListener('click', () => {
        window.API.postJson(
          `/extensions/${this.id}/api/example-api`,
          {[key.value]: value.value}
        ).then((body) => {
          pre.innerText = JSON.stringify(body, null, 2);
        }).catch((e) => {
          pre.innerText = e.toString();
        });
      });
    }
  }

  new ExampleExtension();
})();
