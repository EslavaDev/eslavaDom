/** @jsx eslavaDom */
function eslavaDom(type, props, ...args) {
    const children = args.length ? [].concat(...args) : null;
    return {
      type,
      props: props || {},
      children
    };
  }
  function setBooleanProp(node, name, value) {
    if (value) {
      node.setAttribute(name, value);
      node[name] = true;
    } else {
      node[name] = false;
    }
  }
  function isEventProp(name) {
    return /^on/.test(name);
  }
  function setProp(node, name, value) {
    if (name === "className") {
      name = "class";
    } else if (typeof value === "boolean") {
      setBooleanProp(node, name, value);
    }
  
    node.setAttribute(name, value);
  }
  function setAttributes(node, props = {}) {
    if (!props) {
      return;
    }
    Object.keys(props)
      .filter(prop => !isEventProp(prop))
      .forEach(name => setProp(node, name, props[name]));
  }
  
  function createElement (node) {
      if (typeof node.type === "function") {
        return createElement(node.type(node.props));
      }
      if (typeof node.type === "object") {
        return createElement(node.type);
      }
      if (typeof node === "string" || typeof node === "number") {
        return document.createTextNode(node);
      }
  
      const element = document.createElement(node.type);
      setAttributes(element, node.props);
  
      node.children &&
      node.children
        .map(createElement)
        .forEach(child => element.appendChild(child));
      return element
  }
  
  const Menu = () => (
      <ul>
          <li>daniel</li>
          <li>eslava</li>
      </ul>
  )
  
  document.getElementById("app").appendChild(createElement(<Menu />));
  document.getElementById("app").appendChild(createElement(<h1>ayuda</h1>));