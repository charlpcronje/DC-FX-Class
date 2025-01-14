# FX - Effects 

## Overview
The `FX` short `Effects` system is a dynamic and reactive JavaScript framework for managing objects and their interaction with DOM elements. It provides:
- Dynamic object creation.
- Seamless two-way binding between JavaScript objects and DOM nodes.
- Intuitive DOM selection using the `$` property.
- Support for single and multiple DOM nodes with attribute and value management.

## Features
1. **Dynamic Object Creation**
   - Objects are dynamically created as properties are accessed.
   - Example:
     ```javascript
     fx.user.name; // Automatically creates fx.user.name
     ```

2. **Two-Way Binding**
   - **Value Binding**:
     - Updates DOM content (`innerHTML`, `value`, etc.).
     - Example:
       ```javascript
       fx.user.name.value = "John"; // Updates DOM nodes
       ```
   - **Attribute Binding**:
     - Updates DOM attributes (e.g., `id`, `class`, `style`).
     - Example:
       ```javascript
       fx.user.name.attr = { id: "name", class: "highlight" };
       ```

3. **DOM Selection with `$`**
   - **Dot Notation**:
     ```javascript
     fx.section.$.body.div; // Binds to <div> inside <body>
     ```
   - **Function-Like Syntax**:
     ```javascript
     fx.section.$('body > div'); // Binds to <div> using a query selector
     ```

4. **Multiple DOM Nodes**
   - Bind a single object to multiple DOM nodes.
   - Example:
     ```javascript
     fx.items.$('ul > li'); // Binds all <li> elements in <ul>
     fx.items.value = "Item"; // Updates all <li> elements
     ```

## Usage Examples

### Basic Usage
```javascript
fx.user.name.$('#username'); // Binds to an input field
fx.user.name.value = "John Doe"; // Sets the input value
```

### Attribute Binding
```javascript
fx.header.$.body.header;
fx.header.attr = { id: "main-header", class: "large" }; // Updates attributes
```

### Multiple DOM Nodes
```javascript
fx.list.$('ul > li');
fx.list.value = "List Item"; // Updates all <li> elements
```

### Fine-Grained Control
```javascript
fx.list.DOM[0].attr = { id: "item-1" }; // Updates only the first <li>
```

# **FX System Specification**

The `FX` system is a dynamic, reactive, and developer-friendly system for managing JavaScript objects and their interaction with DOM elements. It is designed to:
1. Automatically create dynamic objects and nested structures on-the-fly.
2. Enable seamless two-way data binding between JavaScript objects and DOM nodes.
3. Provide intuitive syntax for selecting DOM elements (`$`) and managing their values and attributes.
4. Handle single or multiple DOM nodes associated with a dynamic object.

---

## **Core Features**

### **1. Dynamic Object Creation**
- **Description**: Objects under `fx` are created dynamically as properties are accessed. If a property does not exist, it is automatically initialized as a reactive node.
- **Example**:
  ```javascript
  fx.user.name; // Creates a dynamic object for fx.user.name
  ```

### **2. Two-Way Binding with DOM**
- **Value Binding**:
  - The `value` property of a dynamic object updates the content of associated DOM elements (e.g., `innerHTML`, `value`).
  - Changes in the DOM (e.g., user input) automatically update the `value` property of the dynamic object.
- **Attribute Binding**:
  - The `attr` property manages DOM attributes as an object of key-value pairs.
  - All associated DOM nodes are updated with the specified attributes.

- **Examples**:
  ```javascript
  fx.user.name.value = "John"; // Updates DOM nodes bound to fx.user.name
  fx.user.name.attr = { id: "user-name", class: "highlight" }; // Updates attributes
  ```

### **3. DOM Selection with `$`**
- **Description**: Use the `$` property to dynamically select DOM nodes. It supports:
  - **Dot Notation**: For nested DOM selection.
    ```javascript
    fx.section.$.body.div; // Binds to a <div> inside <body>
    ```
  - **Function-Like Syntax**: For custom or complex query selectors.
    ```javascript
    fx.section.$('body > div'); // Binds to a <div> inside <body>
    ```

### **4. Handling Multiple DOM Nodes**
- **Description**: A single dynamic object can bind to multiple DOM nodes (e.g., `querySelectorAll`).
- **Default Behavior**: Updates apply to all associated DOM nodes.
- **Fine-Grained Control**: Access specific nodes using the `DOM` array.
  ```javascript
  fx.items.$('ul > li'); // Binds to all <li> elements in <ul>
  fx.items.DOM[0].attr = { id: "item-1" }; // Updates only the first <li>
  ```

### **5. Resilient Design**
- Automatically handles missing properties, invalid DOM queries, and updates to prevent errors.
- Updates are localized to the `value` and `attr` properties, ensuring no unnecessary broadcasts.

Ah, I see now—you’re asking about using **closures** in the `FX` system to manage reusable functions or API calls while keeping the `FX` dynamic object structure intact. Specifically, you want to define methods within the `FX` structure (like `fx.get.users`) and later reference or reuse them dynamically.

Here’s how this can be implemented and used, step-by-step:


## **Using Closures with FX**

### **Goal**
- Define reusable methods or closures inside the `FX` system.
- Allow these methods to access and manipulate `FX` data directly.
- Dynamically reference and call these methods later.

---

## **Example: API Call in FX**

### **Define API Call as a Closure**
```javascript
fx.get = {};
fx.get.users = async function () {
  const response = await fetch('https://api.example.com/users');
  const data = await response.json();
  fx.data.users.value = data; // Store the result in fx.data.users
  fx.data.users.$('#userList'); // Bind to a DOM node
};
```

Here:
1. `fx.get.users` is a reusable closure that makes an API call.
2. It stores the retrieved data in `fx.data.users`.
3. It binds the data to a DOM node (e.g., `#userList`).

### **Call the Method Dynamically**
```javascript
await fx.get.users(); // Fetches and binds user data
```

### **Reuse the Closure**
```javascript
const getUsers = fx.get.users; // Dynamically reference the method
await getUsers(); // Fetches and binds user data again
```

---

### **Vanilla JavaScript Equivalent**

```javascript
// Define the reusable method
const getUsers = async function () {
  const response = await fetch('https://api.example.com/users');
  const data = await response.json();

  // Store the result
  const userListDiv = document.querySelector('#userList');
  if (userListDiv) {
    userListDiv.innerHTML = JSON.stringify(data, null, 2); // Bind to the DOM
  }
};

// Call the method
await getUsers();

// Reuse the method
const fetchUsersAgain = getUsers;
await fetchUsersAgain();
```

---

## **Dynamic Closure Example with Parameters**

### **Define a Closure with Arguments**
```javascript
fx.get.userById = async function (id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  const data = await response.json();
  fx.data.selectedUser.value = data; // Store the user data
  fx.data.selectedUser.$('#userDetail'); // Bind to a DOM node
};
```

### **Call the Method Dynamically**
```javascript
await fx.get.userById(123); // Fetches and binds user data for user 123
```

### **Reuse the Closure**
```javascript
const fetchUserById = fx.get.userById;
await fetchUserById(456); // Fetches and binds user data for user 456
```

---

## **Vanilla JavaScript Equivalent**

```javascript
const getUserById = async function (id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  const data = await response.json();

  // Store the result
  const userDetailDiv = document.querySelector('#userDetail');
  if (userDetailDiv) {
    userDetailDiv.innerHTML = JSON.stringify(data, null, 2); // Bind to the DOM
  }
};

// Call the method
await getUserById(123);

// Reuse the method
const fetchUserAgain = getUserById;
await fetchUserAgain(456);
```

---

## **How FX Simplifies Closure Use**

1. **Encapsulation**:
   - Closures defined in `FX` (`fx.get.users`) automatically integrate with the reactive system, allowing easy manipulation of `FX` data and DOM updates.

2. **Reusability**:
   - Methods like `fx.get.users` or `fx.get.userById` can be dynamically referenced and reused.

3. **Dynamic Data Management**:
   - Results from API calls can be directly stored in `FX` nodes (`fx.data.users.value`) and immediately reflected in the DOM (`fx.data.users.$('#userList')`).

4. **Consistency**:
   - The `FX` structure keeps closures, reactive data, and DOM bindings within the same system, reducing boilerplate.

---

## **Additional Examples**

### **Combining Closures and Data Manipulation**
```javascript
fx.get.userByName = async function (name) {
  const response = await fetch(`https://api.example.com/users?name=${name}`);
  const data = await response.json();
  fx.data.filteredUsers.value = data; // Store filtered users
  fx.data.filteredUsers.$('#filteredUserList'); // Bind to a DOM node
};

// Use it dynamically
await fx.get.userByName("John");
const fetchUsersByName = fx.get.userByName;
await fetchUsersByName("Jane");
```

### **Defining Closures for Complex DOM Updates**
```javascript
fx.update.dom = function () {
  fx.data.users.DOM.forEach((userDiv) => {
    userDiv.style.color = "blue"; // Apply styles to bound DOM elements
  });
};
// Dynamically call the method
fx.update.dom();
```

## **Core Components**

### **1. FX Root Object**
- **Description**: The global `fx` object is a `Proxy` that dynamically initializes properties as reactive nodes when accessed.

### **2. Reactive Node**
- **Properties**:
  - `value`: The main content associated with the node, reflected in the DOM.
  - `attr`: An object representing DOM attributes (e.g., `id`, `class`, `style`).
  - `DOM`: An array of associated DOM nodes.
  - `$`: A property for DOM selection, supporting both dot notation and query strings.

### **3. DOM Update Functions**
- **`updateDOMValues`**: Updates the `value` binding for all associated DOM nodes.
- **`updateDOMAttributes`**: Updates the `attr` bindings for all associated DOM nodes.

### **4. Helpers**
- **`inferBindingType`**: Determines how to bind the `value` to a DOM node (e.g., `innerHTML`, `value`, `checked`).
- **`inferEventType`**: Determines which event to listen for to sync DOM changes (e.g., `input`, `change`).

## Architecture
- **Root Object**: `fx`
- **Reactive Node Properties**:
  - `value`: Main data binding for DOM content.
  - `attr`: Key-value pairs for DOM attributes.
  - `DOM`: Array of associated DOM nodes.
  - `$`: DOM selection property.

## License
MIT