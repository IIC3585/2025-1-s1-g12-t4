class AccordionItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: block;
          border-bottom: 1px solid #ccc;
        }
        .header {
          background: #f1f1f1;
          padding: 10px;
          cursor: pointer;
          user-select: none;
        }
        .content {
          display: none;
          padding: 10px;
        }
        :host([open]) .content {
          display: block;
        }
      </style>
      <div class="header"></div>
      <div class="content"><slot></slot></div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._header = this.shadowRoot.querySelector('.header');
    this._header.textContent = this.getAttribute('title') || 'Untitled';
    this._header.addEventListener('click', () => this.toggle());
  }

  toggle() {
    const parent = this.closest('accordion');
    if (parent && parent.hasAttribute('single')) {
      parent.closeAll();
    }
    this.toggleAttribute('open');
  }

  close() {
    this.removeAttribute('open');
  }

  open() {
    this.setAttribute('open', '');
  }
}

class Accordion extends HTMLElement {
  constructor() {
    super();
  }

  closeAll() {
    this.querySelectorAll('accordion-item').forEach(item => item.close());
  }
}

customElements.define('accordion-item', AccordionItem);
customElements.define('accordion', Accordion);
