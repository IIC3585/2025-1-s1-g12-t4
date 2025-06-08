import { LitElement, html } from "lit";
import { subscriptionCardStyles } from "./subscription-card-styles.js";
class SubscriptionCardLit extends LitElement {
  static styles = [subscriptionCardStyles];

  // (Re)Renderiza el componente con los atributos
  static properties = {
    title: { type: String },
    price: { type: String },
    period: { type: String },
    visits: { type: String },
    features: { type: Array }, // JSON a Array automáticamente con type: Array
    featured: { type: Boolean, reflect: true }, // Sincroniza atributo HTML con propiedad JS
  };

  constructor() {
    super();
    this.title = "Plan";
    this.price = "0";
    this.period = "mes";
    this.visits = "0";
    this.features = [];
    this.featured = false;
  }

  render() {
    const { title, price, period, visits, features, featured } = this;

    return html`
      <div class="card">
        ${featured ? html`<div class="badge">Recomendado</div>` : ""}

        <div class="title">${title}</div>
        <div class="visits">${visits} visitas mensuales</div>

        <div class="price-container">
          <span class="price">$<span>${price}</span></span>
          <span class="period">/${period}</span>
        </div>

        <div class="features">
          ${features.map(
            (feature) => html`
              <div class="feature">
                <div class="check"></div>
                <span>${feature}</span>
              </div>
            `
          )}
        </div>

        <button class="button" @click="${this._handleClick}">Comenzar</button>
      </div>
    `;
  }

  _handleClick() {
    const event = new CustomEvent("subscription-selected", {
      detail: {
        title: this.title,
        price: this.price,
        period: this.period,
        visits: this.visits,
      },
      bubbles: true, // Permite que el evento se propague hasta el document
      composed: true, // Permite que el evento cruce el Shadow DOM
    });
    this.dispatchEvent(event);
  }
}

customElements.define("subscription-card-lit", SubscriptionCardLit);
