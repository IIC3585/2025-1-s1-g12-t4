import { LitElement, html, css } from "lit";

class AccordionItemLit extends LitElement {
  static properties = {
    title: { type: String },
    open: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: block;
      border-bottom: 1px solid #ccc;
    }
    .header {
      background: #4338ca;
      color: white;
      padding: 10px;
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
    }
    .header:hover {
      background: #3730a3;
    }
    .arrow {
      margin-right: 10px;
      transition: transform 0.2s ease;
    }
    :host([open]) .arrow {
      transform: rotate(90deg);
    }
    .content {
      display: none;
      padding: 10px;
      background: #f3f4f6;
    }
    :host([open]) .content {
      display: block;
    }
  `;

  constructor() {
    super();
    this.title = "Untitled";
    this.open = false;
  }

  render() {
    return html`
      <div class="header" @click="${this.toggle}">
        <span class="arrow">▶</span>
        <span class="title">${this.title}</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }

  toggle() {
    const parent = this.closest('accordion-container-lit');
    if (parent && parent.hasAttribute('single')) {
      parent.closeAll();
    }
    this.open = !this.open;
  }

  close() {
    this.open = false;
  }

  openItem() {
    this.open = true;
  }
}

class AccordionContainerLit extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow: hidden;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }

  closeAll() {
    this.querySelectorAll('accordion-item-lit').forEach(item => item.close());
  }
}

customElements.define('accordion-item-lit', AccordionItemLit);
customElements.define('accordion-container-lit', AccordionContainerLit);