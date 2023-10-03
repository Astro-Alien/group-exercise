export default class MyGroup extends HTMLElement {
    #clickhandler;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        this.shadowRoot.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(result => result.text());
        await this.load();
    }
    async disconnectedCallback() {
        this.shadowRoot.removeEventListener("click",this.#clickhandler);
        this.#clickhandler = null;
    }

    load() {
        return new Promise(async () =>{
            this.#clickhandler = this.#click.bind(this);
            this.shadowRoot.addEventListener("click",this.#clickhandler);
        })
    }



    async #click(event) {
        const button = event.composedPath()[0];
        const content = this.shadowRoot.querySelector("#my-content");

        if (button.dataset.state === "close") {
            button.dataset.state = "open";
            content.hidden = false;
            return;
        }

        button.dataset.state = "close";
        content.hidden = true;
    }
}
customElements.define("my-group", MyGroup);