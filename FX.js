// Function to create a reactive node
function createReactiveNode() {
    const DOM = []; // Track associated DOM nodes for this dynamic object
  
    const node = new Proxy(
      {
        value: null, // Main value for the node
        attr: {}, // Attribute bindings for the node
        DOM // List of associated DOM nodes
      },
      {
        get(target, prop) {
          if (prop === "$") {
            // Return a proxy for DOM querying
            return new Proxy({}, {
              get(_, domProp) {
                return bindDOM(domProp, target); // Handle dot notation (e.g., $.body.section)
              },
              apply(_, __, args) {
                return bindDOM(args[0], target); // Handle function-like queries (e.g., $('body > section'))
              }
            });
          }
          return target[prop];
        },
        set(target, prop, value) {
          if (prop === "value") {
            // Update the main value and associated DOM nodes
            target.value = value;
            updateDOMValues(target);
          } else if (prop === "attr") {
            // Update attributes and associated DOM nodes
            target.attr = value;
            updateDOMAttributes(target);
          } else {
            target[prop] = value; // For other properties
          }
          return true;
        }
      }
    );
  
    return node;
  }
  
  // Function to bind a DOM element to a reactive node
  function bindDOM(selector, node) {
    const elements = document.querySelectorAll(selector); // Support multiple DOM nodes
    elements.forEach((element) => {
      if (!node.DOM.includes(element)) {
        node.DOM.push(element);
  
        // Attach event listener to sync DOM changes back to the dynamic object
        const eventType = inferEventType(element);
        element.addEventListener(eventType, () => {
          node.value = getElementValue(element);
        });
      }
    });
  
    return node; // Return the node for further chaining
  }
  
  // Function to update DOM values (e.g., innerHTML, value)
  function updateDOMValues(node) {
    node.DOM.forEach((element) => {
      const type = inferBindingType(element);
      updateDOM(element, type, node.value);
    });
  }
  
  // Function to update DOM attributes
  function updateDOMAttributes(node) {
    node.DOM.forEach((element) => {
      Object.entries(node.attr).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    });
  }
  
  // Helper to infer the DOM binding type
  function inferBindingType(element) {
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") return "value";
    if (element.tagName === "SELECT") return "selectedIndex";
    if (element.type === "checkbox" || element.type === "radio") return "checked";
    return "innerHTML"; // Default binding
  }
  
  // Helper to infer event type for syncing DOM changes
  function inferEventType(element) {
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") return "input";
    if (element.tagName === "SELECT") return "change";
    if (element.type === "checkbox" || element.type === "radio") return "change";
    return "input"; // Default event type
  }
  
  // Helper to get the value of a DOM element
  function getElementValue(element) {
    const type = inferBindingType(element);
    if (type === "value") return element.value;
    if (type === "checked") return element.checked;
    if (type === "selectedIndex") return element.selectedIndex;
    return element.innerHTML; // Default value
  }
  
  // Root fx object
  const fx = new Proxy({}, {
    get(target, prop) {
      if (!target[prop]) {
        target[prop] = createReactiveNode();
      }
      return target[prop];
    }
  });
  