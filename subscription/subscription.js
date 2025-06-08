// Template
const template = document.createElement("template");
template.innerHTML = `
  <div class="card">
    <div class="badge" style="display: none;">Recomendado</div>

    <div class="title" id="title"></div>
    <div class="visits" id="visits"></div>

    <div class="price-container">
      <span class="price">$<span id="price"></span></span>
      <span class="period">/<span id="period"></span></span>
    </div>

    <div class="features" id="features"></div>

    <button class="button" id="button">Comenzar</button>
  </div>
`;

// Custom Element
class SubscriptionCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }); // Shadow DOM

    // Agregar estilos
    const styleLink = document.createElement("link");
    styleLink.setAttribute("rel", "stylesheet");
    styleLink.setAttribute("href", "subscription-card-styles.css");
    this.shadowRoot.appendChild(styleLink);

    this.shadowRoot.appendChild(template.content.cloneNode(true)); // Clonar template en DOM

    // Referencias a elementos
    this.elements = {
      title: this.shadowRoot.getElementById("title"),
      visits: this.shadowRoot.getElementById("visits"),
      price: this.shadowRoot.getElementById("price"),
      period: this.shadowRoot.getElementById("period"),
      features: this.shadowRoot.getElementById("features"),
      button: this.shadowRoot.getElementById("button"),
      badge: this.shadowRoot.querySelector(".badge"),
    };

    this.elements.button.addEventListener("click", this.handleClick.bind(this)); // Evento click
  }

  // Ejecutar cuando el elemento se conecta al DOM
  connectedCallback() {
    this.render();
  }

  // Ejecutar cuando cambian atributos
  static get observedAttributes() {
    return ["title", "price", "period", "visits", "features", "featured"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    // Obtenemos valores
    const title = this.getAttribute("title") || "Plan";
    const price = this.getAttribute("price") || "0";
    const period = this.getAttribute("period") || "mes";
    const visits = this.getAttribute("visits") || "0";
    const featuresStr = this.getAttribute("features") || "[]";
    const featured = this.hasAttribute("featured");

    // Actualizamos contenido
    this.elements.title.textContent = title;
    this.elements.price.textContent = price;
    this.elements.period.textContent = period;
    this.elements.visits.textContent = `${visits} visitas mensuales`;

    // Mostramos borde destacado si aplica
    if (featured) {
      this.elements.badge.style.display = "block";
    } else {
      this.elements.badge.style.display = "none";
    }

    // Renderizar características
    this.renderFeatures(featuresStr);
  }

  renderFeatures(featuresStr) {
    try {
      const features = JSON.parse(featuresStr);
      this.elements.features.innerHTML = "";

      features.forEach((feature) => {
        const div = document.createElement("div");
        div.className = "feature";
        div.innerHTML = `
          <div class="check"></div>
          <span>${feature}</span>
        `;
        this.elements.features.appendChild(div);
      });
    } catch (error) {
      console.error("Error parsing features:", error);
    }
  }

  handleClick() {
    const event = new CustomEvent("subscription-selected", {
      detail: {
        title: this.getAttribute("title"),
        price: this.getAttribute("price"),
        period: this.getAttribute("period"),
        visits: this.getAttribute("visits"),
      },
      bubbles: true,
    });

    this.dispatchEvent(event);
  }
}

customElements.define("subscription-card", SubscriptionCard);
