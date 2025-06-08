class AccordionItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const styleLink = document.createElement("link");
    styleLink.setAttribute("rel", "stylesheet");
    styleLink.setAttribute("href", "accordion.css");
    this.shadowRoot.appendChild(styleLink);
    
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="header">
        <span class="arrow">▶</span>
        <span class="title"></span>
      </div>
      <div class="content"><slot></slot></div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._header = this.shadowRoot.querySelector('.header');
    this._titleEl = this.shadowRoot.querySelector('.title');
    this._arrow = this.shadowRoot.querySelector('.arrow');

    this._titleEl.textContent = this.getAttribute('title') || 'Untitled';

    this._header.addEventListener('click', () => this.toggle());
  }

  toggle() {
    const parent = this.closest('accordion-container');
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
customElements.define('accordion-container', Accordion);
