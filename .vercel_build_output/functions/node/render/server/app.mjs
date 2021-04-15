import {randomBytes, createHash} from "crypto";
import http from "http";
import https from "https";
import zlib from "zlib";
import Stream, {PassThrough, pipeline} from "stream";
import {types} from "util";
import {format, parse, resolve} from "url";
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop$1() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
const subscriber_queue = [];
function writable(value, start = noop$1) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop$1;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update, subscribe: subscribe2};
}
const s$1 = JSON.stringify;
async function render_response({
  options,
  $session,
  page_config,
  status,
  error,
  branch,
  page: page2
}) {
  const css2 = new Set();
  const js = new Set();
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (branch) {
    branch.forEach(({node, loaded, fetched, uses_credentials}) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    if (error) {
      if (options.dev) {
        error.stack = await options.get_stack(error);
      } else {
        error.stack = String(error);
      }
    }
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page: page2,
      components: branch.map(({node}) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = {head: "", html: "", css: ""};
  }
  const links = options.amp ? styles.size > 0 ? `<style amp-custom>${Array.from(styles).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"></script>`;
  } else if (page_config.router || page_config.hydrate) {
    init2 = `<script type="module">
			import { start } from ${s$1(options.entry)};
			start({
				target: ${options.target ? `document.querySelector(${s$1(options.target)})` : "document.body"},
				paths: ${s$1(options.paths)},
				session: ${try_serialize($session, (error2) => {
      throw new Error(`Failed to serialize session data: ${error2.message}`);
    })},
				host: ${page2.host ? s$1(page2.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error)},
					nodes: [
						${branch.map(({node}) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page2.host ? s$1(page2.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page2.path)},
						query: new URLSearchParams(${s$1(page2.query.toString())}),
						params: ${s$1(page2.params)}
					}
				}` : "null"}
			});
		</script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({url, json}) => `<script type="svelte-data" url="${url}">${json}</script>`).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  return {
    status,
    headers,
    body: options.template({head, body})
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error) {
  if (!error)
    return null;
  let serialized = try_serialize(error);
  if (!serialized) {
    const {name, message, stack} = error;
    serialized = try_serialize({name, message, stack});
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
const {Readable} = Stream;
const wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
class Blob {
  constructor(blobParts = [], options = {type: ""}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options.type === void 0 ? "" : String(options.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const {size} = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], {type});
    Object.assign(wm.get(blob), {size: span, parts: blobParts});
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
}
Object.defineProperties(Blob.prototype, {
  size: {enumerable: true},
  type: {enumerable: true},
  slice: {enumerable: true}
});
var fetchBlob = Blob;
class FetchBaseError extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
}
class FetchError extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
}
const NAME = Symbol.toStringTag;
const isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
const isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
const isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
const carriage = "\r\n";
const dashes = "-".repeat(2);
const carriageLength = Buffer.byteLength(carriage);
const getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
const getBoundary = () => randomBytes(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
const INTERNALS$2 = Symbol("Body internals");
class Body {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = Stream.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof Stream) {
      body.on("error", (err) => {
        const error = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const {buffer, byteOffset, byteLength} = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
}
Object.defineProperties(Body.prototype, {
  body: {enumerable: true},
  bodyUsed: {enumerable: true},
  arrayBuffer: {enumerable: true},
  blob: {enumerable: true},
  json: {enumerable: true},
  text: {enumerable: true}
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let {body} = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof Stream)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    if (error instanceof FetchBaseError) {
      throw error;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
const clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let {body} = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof Stream && typeof body.getBoundary !== "function") {
    p1 = new PassThrough({highWaterMark});
    p2 = new PassThrough({highWaterMark});
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
const extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof Stream) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
const getTotalBytes = (request) => {
  const {body} = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
const writeToStream = (dest, {body}) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
const validateHeaderName = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_HTTP_TOKEN"});
    throw err;
  }
};
const validateHeaderValue = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_CHAR"});
    throw err;
  }
};
class Headers extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
}
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = {enumerable: true};
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch (e) {
      return false;
    }
  }));
}
const redirectStatus = new Set([301, 302, 303, 307, 308]);
const isRedirect = (code) => {
  return redirectStatus.has(code);
};
const INTERNALS$1 = Symbol("Response internals");
class Response extends Body {
  constructor(body = null, options = {}) {
    super(body, options);
    const status = options.status || 200;
    const headers = new Headers(options.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options.url,
      status,
      statusText: options.statusText || "",
      headers,
      counter: options.counter,
      highWaterMark: options.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
}
Object.defineProperties(Response.prototype, {
  url: {enumerable: true},
  status: {enumerable: true},
  ok: {enumerable: true},
  redirected: {enumerable: true},
  statusText: {enumerable: true},
  headers: {enumerable: true},
  clone: {enumerable: true}
});
const getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
};
const INTERNALS = Symbol("Request internals");
const isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
class Request extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return format(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
}
Object.defineProperties(Request.prototype, {
  method: {enumerable: true},
  url: {enumerable: true},
  headers: {enumerable: true},
  redirect: {enumerable: true},
  clone: {enumerable: true},
  signal: {enumerable: true}
});
const getNodeRequestOptions = (request) => {
  const {parsedURL} = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let {agent} = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
class AbortError extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
}
const supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response(data, {headers: {"Content-Type": data.typeFull}});
      resolve2(response2);
      return;
    }
    const send = (options.protocol === "https:" ? https : http).request;
    const {signal} = request;
    let response = null;
    const abort = () => {
      const error = new AbortError("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof Stream.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error) {
                reject(error);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = pipeline(response_, new PassThrough(), (error) => {
        reject(error);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: zlib.Z_SYNC_FLUSH,
        finishFlush: zlib.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pipeline(body, zlib.createGunzip(zlibOptions), (error) => {
          reject(error);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pipeline(response_, new PassThrough(), (error) => {
          reject(error);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = pipeline(body, zlib.createInflate(), (error) => {
              reject(error);
            });
          } else {
            body = pipeline(body, zlib.createInflateRaw(), (error) => {
              reject(error);
            });
          }
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = pipeline(body, zlib.createBrotliDecompress(), (error) => {
          reject(error);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function normalize(loaded) {
  if (loaded.error) {
    const error = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return {status: 500, error};
    }
    return {status, error};
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
const s = JSON.stringify;
async function load_node({
  request,
  options,
  route,
  page: page2,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error
}) {
  const {module} = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module.load) {
    const load_input = {
      page: page2,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options.local && url.startsWith(options.paths.assets)) {
          url = url.replace(options.paths.assets, "");
        }
        const parsed = parse(url);
        let response;
        if (parsed.protocol) {
          response = await fetch(parsed.href, opts);
        } else {
          const resolved = resolve(request.path, parsed.pathname);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
          if (asset) {
            if (options.get_static_file) {
              response = new Response(options.get_static_file(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page2.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = {...opts.headers};
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            const rendered = await ssr({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              body: opts.body,
              query: new URLSearchParams(parsed.query || "")
            }, {
              ...options,
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (options.dependencies) {
                options.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                response2.headers.forEach((value, key2) => {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                });
                fetched.push({
                  url,
                  json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape$1(body)}}`
                });
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, receiver);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: {...context}
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error;
    }
    loaded = await module.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
const escaped$2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape$1(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$2) {
      result += escaped$2[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({request, options, $session, status, error}) {
  const default_layout = await options.load_component(options.manifest.layout);
  const default_error = await options.load_component(options.manifest.error);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options,
    route: null,
    page: page2,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options,
      route: null,
      page: page2,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error
    })
  ];
  try {
    return await render_response({
      request,
      options,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router,
        ssr: options.ssr
      },
      status,
      error,
      branch,
      page: page2
    });
  } catch (error2) {
    return {
      status: 500,
      headers: {},
      body: options.dev ? error2.stack : error2.message
    };
  }
}
async function respond({request, options, $session, route}) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options.load_component(id)));
  } catch (error2) {
    return await respond_with_error({
      request,
      options,
      $session,
      status: 500,
      error: error2
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options.ssr,
    router: "router" in leaf ? leaf.router : options.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options.hydrate
  };
  if (options.only_render_prerenderable_pages && !leaf.prerender) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options,
              route,
              page: page2,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: loaded.loaded.redirect
                }
              };
            }
            if (loaded.loaded.error) {
              ({status, error} = loaded.loaded);
            }
          } catch (e) {
            status = 500;
            error = e;
          }
          if (error) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options,
                    route,
                    page: page2,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options,
              $session,
              status,
              error
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      request,
      options,
      $session,
      page_config,
      status,
      error,
      branch: branch && branch.filter(Boolean),
      page: page2
    });
  } catch (error2) {
    return await respond_with_error({
      request,
      options,
      $session,
      status: 500,
      error: error2
    });
  }
}
async function render_page(request, route, options) {
  if (options.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options.hooks.getSession({context: request.context});
  if (route) {
    const response = await respond({
      request,
      options,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (options.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${options.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler({...request, params});
    if (response) {
      if (typeof response !== "object" || response.body == null) {
        return {
          status: 500,
          body: `Invalid response from route ${request.path}; ${response.body == null ? "body is missing" : `expected an object, got ${typeof response}`}`,
          headers: {}
        };
      }
      let {status = 200, body, headers = {}} = response;
      headers = lowercase_keys(headers);
      if (typeof body === "object" && !("content-type" in headers) || headers["content-type"] === "application/json") {
        headers = {...headers, "content-type": "application/json"};
        body = JSON.stringify(body);
      }
      return {status, body, headers};
    }
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function md5(body) {
  return createHash("md5").update(body).digest("hex");
}
async function ssr(incoming, options) {
  if (incoming.path.endsWith("/") && incoming.path !== "/") {
    const q = incoming.query.toString();
    return {
      status: 301,
      headers: {
        location: incoming.path.slice(0, -1) + (q ? `?${q}` : "")
      }
    };
  }
  const context = await options.hooks.getContext(incoming) || {};
  try {
    return await options.hooks.handle({
      request: {
        ...incoming,
        params: null,
        context
      },
      render: async (request) => {
        for (const route of options.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${md5(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options);
      }
    });
  } catch (e) {
    if (e && e.stack) {
      e.stack = await options.get_stack(e);
    }
    console.error(e && e.stack || e);
    return {
      status: 500,
      headers: {},
      body: options.dev ? e.stack : e.message
    };
  }
}
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
const escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({$$});
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, {$$slots = {}, context = new Map()} = {}) => {
      on_destroy = [];
      const result = {title: "", head: "", css: new Set()};
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
var root_svelte_svelte_type_style_lang = "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}";
const css$8 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title;\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n</script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\tNavigated to {title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {stores} = $$props;
  let {page: page2} = $$props;
  let {components} = $$props;
  let {props_0 = null} = $$props;
  let {props_1 = null} = $$props;
  let {props_2 = null} = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title;
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$8);
  {
    stores.page.set(page2);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `Navigated to ${escape(title)}` : ``}</div>` : ``}`;
});
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
const template = ({head, body}) => '<!DOCTYPE html>\r\n<html lang="en">\r\n	<head>\r\n		<meta charset="utf-8" />\r\n		<link rel="icon" href="/favicon.ico" />\r\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\r\n\r\n		<meta name="description" content="Web Designer" />\r\n		<meta name="theme-color" content="#000000" />\r\n\r\n		' + head + '\r\n	</head>\r\n	<body id="svelte">\r\n		' + body + "\r\n	</body>\r\n</html>\r\n";
function init({paths, prerendering}) {
}
const d = decodeURIComponent;
const empty = () => ({});
const manifest = {
  assets: [{file: "favicon.ico", size: 3262, type: "image/vnd.microsoft.icon"}, {file: "file/theophilus_cv.pdf", size: 69421, type: "application/pdf"}, {file: "font/JosefinSans-Bold.ttf", size: 86300, type: "font/ttf"}, {file: "font/JosefinSans-Regular.ttf", size: 87260, type: "font/ttf"}, {file: "font/segoescb.ttf", size: 581252, type: "font/ttf"}, {file: "Images/project/akropol_001.jpeg", size: 259772, type: "image/jpeg"}, {file: "Images/project/akropol_001.mp4", size: 20865222, type: "video/mp4"}, {file: "Images/project/akropol_002.png", size: 1119959, type: "image/png"}, {file: "Images/project/ankara_001.png", size: 537009, type: "image/png"}, {file: "Images/project/ankara_002.png", size: 555723, type: "image/png"}, {file: "Images/project/ankara_003.png", size: 410254, type: "image/png"}, {file: "Images/project/arduino_001.png", size: 288448, type: "image/png"}, {file: "Images/project/arduino_002.png", size: 371850, type: "image/png"}, {file: "Images/project/arduino_003.png", size: 262078, type: "image/png"}, {file: "Images/project/arduino_004.png", size: 251580, type: "image/png"}, {file: "Images/project/arduino_005.png", size: 305814, type: "image/png"}, {file: "Images/project/arduino_006.png", size: 262048, type: "image/png"}, {file: "Images/project/arduino_007.png", size: 301992, type: "image/png"}, {file: "Images/project/arduino_008.png", size: 292532, type: "image/png"}, {file: "Images/project/arduino_009.png", size: 480440, type: "image/png"}, {file: "Images/project/arduino_010.png", size: 983782, type: "image/png"}, {file: "Images/project/arduino_011.png", size: 326782, type: "image/png"}, {file: "Images/project/arduino_012.png", size: 236878, type: "image/png"}, {file: "Images/project/arduino_013.png", size: 314878, type: "image/png"}, {file: "Images/project/arduino_014.png", size: 264871, type: "image/png"}, {file: "Images/project/arduino_015.png", size: 1297114, type: "image/png"}, {file: "Images/project/arduino_016.png", size: 371643, type: "image/png"}, {file: "Images/project/aris_001.pdf", size: 1532981, type: "application/pdf"}, {file: "Images/project/aris_001.png", size: 1362323, type: "image/png"}, {file: "Images/project/bead_001.jpeg", size: 247477, type: "image/jpeg"}, {file: "Images/project/bead_002.jpeg", size: 268602, type: "image/jpeg"}, {file: "Images/project/bead_003.jpeg", size: 308476, type: "image/jpeg"}, {file: "Images/project/bead_004.jpeg", size: 315802, type: "image/jpeg"}, {file: "Images/project/bead_005.jpeg", size: 257304, type: "image/jpeg"}, {file: "Images/project/bead_006.jpeg", size: 257062, type: "image/jpeg"}, {file: "Images/project/bead_007.jpeg", size: 287628, type: "image/jpeg"}, {file: "Images/project/bead_008.jpeg", size: 263584, type: "image/jpeg"}, {file: "Images/project/bead_009.jpeg", size: 318575, type: "image/jpeg"}, {file: "Images/project/bead_010.jpeg", size: 299252, type: "image/jpeg"}, {file: "Images/project/charms_01_01.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_01_02.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_01_03.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_01_04.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_01_05.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_01_06.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_01_07.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_01_08.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_01_09.png", size: 878580, type: "image/png"}, {file: "Images/project/charms_01_10.png", size: 4986346, type: "image/png"}, {file: "Images/project/charms_02_01.png", size: 4986341, type: "image/png"}, {file: "Images/project/charms_02_02.png", size: 4986345, type: "image/png"}, {file: "Images/project/charms_02_03.png", size: 4986341, type: "image/png"}, {file: "Images/project/charms_02_04.png", size: 4986341, type: "image/png"}, {file: "Images/project/charms_02_05.png", size: 4986341, type: "image/png"}, {file: "Images/project/charms_02_06.png", size: 4986341, type: "image/png"}, {file: "Images/project/charms_02_07.png", size: 4986341, type: "image/png"}, {file: "Images/project/charms_02_08.png", size: 4986341, type: "image/png"}, {file: "Images/project/charms_02_09.png", size: 4986341, type: "image/png"}, {file: "Images/project/charms_02_10.png", size: 4986346, type: "image/png"}, {file: "Images/project/charms_03_01.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_03_02.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_03_03.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_03_04.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_03_05.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_03_06.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_03_07.png", size: 4986346, type: "image/png"}, {file: "Images/project/charms_03_08.png", size: 4986342, type: "image/png"}, {file: "Images/project/charms_03_09.png", size: 4986342, type: "image/png"}, {file: "Images/project/connekt_001.png", size: 25588, type: "image/png"}, {file: "Images/project/costar_001.pdf", size: 877013, type: "application/pdf"}, {file: "Images/project/costar_001.png", size: 328324, type: "image/png"}, {file: "Images/project/danfo_001.mp4", size: 7366338, type: "video/mp4"}, {file: "Images/project/danfo_001.pdf", size: 342211, type: "application/pdf"}, {file: "Images/project/danfo_001.png", size: 2600935, type: "image/png"}, {file: "Images/project/faceoff_001.png", size: 267520, type: "image/png"}, {file: "Images/project/faceoff_002.png", size: 138932, type: "image/png"}, {file: "Images/project/faceoff_003.png", size: 254078, type: "image/png"}, {file: "Images/project/faceoff_004.png", size: 269809, type: "image/png"}, {file: "Images/project/faceoff_005.png", size: 286748, type: "image/png"}, {file: "Images/project/faceoff_006.png", size: 283872, type: "image/png"}, {file: "Images/project/faceoff_009.png", size: 284458, type: "image/png"}, {file: "Images/project/faceoff_010.png", size: 268446, type: "image/png"}, {file: "Images/project/faceoff_011.png", size: 285958, type: "image/png"}, {file: "Images/project/flipaxis_001.png", size: 40388, type: "image/png"}, {file: "Images/project/interrogationRoom_001.png", size: 761274, type: "image/png"}, {file: "Images/project/interrogationRoom_002.png", size: 787837, type: "image/png"}, {file: "Images/project/interrogationRoom_003.png", size: 738844, type: "image/png"}, {file: "Images/project/interrogationRoom_004.png", size: 759108, type: "image/png"}, {file: "Images/project/interrogationRoom_005.png", size: 788862, type: "image/png"}, {file: "Images/project/interrogationRoom_006.png", size: 736160, type: "image/png"}, {file: "Images/project/interrogationRoom_007.png", size: 829797, type: "image/png"}, {file: "Images/project/interrogationRoom_008.png", size: 687345, type: "image/png"}, {file: "Images/project/interrogationRoom_009.png", size: 656420, type: "image/png"}, {file: "Images/project/interrogationRoom_010.png", size: 376096, type: "image/png"}, {file: "Images/project/interrogationRoom_011.png", size: 1291637, type: "image/png"}, {file: "Images/project/interrogationRoom_012.png", size: 543683, type: "image/png"}, {file: "Images/project/interrogationRoom_013.png", size: 650478, type: "image/png"}, {file: "Images/project/interrogationRoom_014.png", size: 1020108, type: "image/png"}, {file: "Images/project/interrogationRoom_015.png", size: 617326, type: "image/png"}, {file: "Images/project/interrogationRoom_016.png", size: 996280, type: "image/png"}, {file: "Images/project/lilyCollection_001.png", size: 1412156, type: "image/png"}, {file: "Images/project/lilyCollection_002.png", size: 382125, type: "image/png"}, {file: "Images/project/mvS3V/01.png", size: 690853, type: "image/png"}, {file: "Images/project/mvS3V/Build/3DViewer.asm.code.unityweb", size: 4571598, type: "application/vnd.unity"}, {file: "Images/project/mvS3V/Build/3DViewer.asm.framework.unityweb", size: 90558, type: "application/vnd.unity"}, {file: "Images/project/mvS3V/Build/3DViewer.asm.memory.unityweb", size: 376710, type: "application/vnd.unity"}, {file: "Images/project/mvS3V/Build/3DViewer.data.unityweb", size: 13233583, type: "application/vnd.unity"}, {file: "Images/project/mvS3V/Build/3DViewer.json", size: 454, type: "application/json"}, {file: "Images/project/mvS3V/Build/UnityLoader.js", size: 158247, type: "application/javascript"}, {file: "Images/project/mvS3V/index.html", size: 528, type: "text/html"}, {file: "Images/project/mvTemplateData/FLIPAXIS.png", size: 51658, type: "image/png"}, {file: "Images/project/mvTemplateData/fullscreen.png", size: 345, type: "image/png"}, {file: "Images/project/mvTemplateData/progressEmpty.Dark.png", size: 155, type: "image/png"}, {file: "Images/project/mvTemplateData/progressEmpty.Light.png", size: 159, type: "image/png"}, {file: "Images/project/mvTemplateData/progressFull.Dark.png", size: 137, type: "image/png"}, {file: "Images/project/mvTemplateData/progressFull.Light.png", size: 142, type: "image/png"}, {file: "Images/project/mvTemplateData/style.css", size: 1272, type: "text/css"}, {file: "Images/project/mvTemplateData/UnityProgress.js", size: 1209, type: "application/javascript"}, {file: "Images/project/nimc_001.mp4", size: 8075626, type: "video/mp4"}, {file: "Images/project/nimc_001.png", size: 737581, type: "image/png"}, {file: "Images/project/tin_001.mp4", size: 3078903, type: "video/mp4"}, {file: "Images/project/tin_001.png", size: 961948, type: "image/png"}, {file: "Images/site/bars.svg", size: 783, type: "image/svg+xml"}, {file: "Images/site/close.svg", size: 728, type: "image/svg+xml"}, {file: "Images/site/facebook.svg", size: 361, type: "image/svg+xml"}, {file: "Images/site/favicon.jpg", size: 26818, type: "image/jpeg"}, {file: "Images/site/github.svg", size: 1678, type: "image/svg+xml"}, {file: "Images/site/linkedin.svg", size: 688, type: "image/svg+xml"}, {file: "Images/site/Theophilus.jpg", size: 233963, type: "image/jpeg"}, {file: "Images/site/twitter.svg", size: 855, type: "image/svg+xml"}, {file: "Images/site/whatsapp.svg", size: 1212, type: "image/svg+xml"}],
  layout: "src/routes/$layout.svelte",
  error: "src/routes/$error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/index.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/projects\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/projects.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/breaker\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/breaker.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/contact\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/contact.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/about\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/about.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/blog\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/blog/index.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/blog\/([^/]+?)\/?$/,
      params: (m) => ({slug: d(m[1])}),
      a: ["src/routes/$layout.svelte", "src/routes/blog/[slug].svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/home\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/home.svelte"],
      b: ["src/routes/$error.svelte"]
    }
  ]
};
const get_hooks = (hooks2) => ({
  getContext: hooks2.getContext || (() => ({})),
  getSession: hooks2.getSession || (() => ({})),
  handle: hooks2.handle || (({request, render: render2}) => render2(request))
});
const hooks = get_hooks(user_hooks);
const module_lookup = {
  "src/routes/$layout.svelte": () => Promise.resolve().then(function() {
    return $layout$1;
  }),
  "src/routes/$error.svelte": () => Promise.resolve().then(function() {
    return $error$1;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/projects.svelte": () => Promise.resolve().then(function() {
    return projects;
  }),
  "src/routes/breaker.svelte": () => Promise.resolve().then(function() {
    return breaker;
  }),
  "src/routes/contact.svelte": () => Promise.resolve().then(function() {
    return contact;
  }),
  "src/routes/about.svelte": () => Promise.resolve().then(function() {
    return about;
  }),
  "src/routes/blog/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/blog/[slug].svelte": () => Promise.resolve().then(function() {
    return _slug_;
  }),
  "src/routes/home.svelte": () => Promise.resolve().then(function() {
    return home;
  })
};
const metadata_lookup = {"src/routes/$layout.svelte": {entry: "/./_app/pages\\$layout.svelte-70ff579e.js", css: ["/./_app/assets/pages\\$layout.svelte-463f582e.css"], js: ["/./_app/pages\\$layout.svelte-70ff579e.js", "/./_app/chunks/vendor-9e9bcf26.js"], styles: null}, "src/routes/$error.svelte": {entry: "/./_app/pages\\$error.svelte-5b50eb72.js", css: [], js: ["/./_app/pages\\$error.svelte-5b50eb72.js", "/./_app/chunks/vendor-9e9bcf26.js"], styles: null}, "src/routes/index.svelte": {entry: "/./_app/pages\\index.svelte-15fb3641.js", css: ["/./_app/assets/pageContent-f79eae67.css", "/./_app/assets/pages\\projects.svelte-8665e344.css", "/./_app/assets/pages\\breaker.svelte-7b14cd17.css"], js: ["/./_app/pages\\index.svelte-15fb3641.js", "/./_app/chunks/vendor-9e9bcf26.js", "/./_app/pages\\home.svelte-02d3fb40.js", "/./_app/chunks/pageContent-07a62830.js", "/./_app/pages\\about.svelte-f7bdb116.js", "/./_app/pages\\projects.svelte-b3f4928f.js", "/./_app/pages\\contact.svelte-355a100d.js", "/./_app/pages\\breaker.svelte-875d17dd.js"], styles: null}, "src/routes/projects.svelte": {entry: "/./_app/pages\\projects.svelte-b3f4928f.js", css: ["/./_app/assets/pages\\projects.svelte-8665e344.css", "/./_app/assets/pageContent-f79eae67.css"], js: ["/./_app/pages\\projects.svelte-b3f4928f.js", "/./_app/chunks/vendor-9e9bcf26.js", "/./_app/chunks/pageContent-07a62830.js"], styles: null}, "src/routes/breaker.svelte": {entry: "/./_app/pages\\breaker.svelte-875d17dd.js", css: ["/./_app/assets/pages\\breaker.svelte-7b14cd17.css"], js: ["/./_app/pages\\breaker.svelte-875d17dd.js", "/./_app/chunks/vendor-9e9bcf26.js"], styles: null}, "src/routes/contact.svelte": {entry: "/./_app/pages\\contact.svelte-355a100d.js", css: ["/./_app/assets/pageContent-f79eae67.css"], js: ["/./_app/pages\\contact.svelte-355a100d.js", "/./_app/chunks/vendor-9e9bcf26.js", "/./_app/chunks/pageContent-07a62830.js"], styles: null}, "src/routes/about.svelte": {entry: "/./_app/pages\\about.svelte-f7bdb116.js", css: ["/./_app/assets/pageContent-f79eae67.css"], js: ["/./_app/pages\\about.svelte-f7bdb116.js", "/./_app/chunks/vendor-9e9bcf26.js", "/./_app/chunks/pageContent-07a62830.js"], styles: null}, "src/routes/blog/index.svelte": {entry: "/./_app/pages\\blog\\index.svelte-6761e0b1.js", css: ["/./_app/assets/pageContent-f79eae67.css"], js: ["/./_app/pages\\blog\\index.svelte-6761e0b1.js", "/./_app/chunks/vendor-9e9bcf26.js", "/./_app/chunks/pageContent-07a62830.js"], styles: null}, "src/routes/blog/[slug].svelte": {entry: "/./_app/pages\\blog\\[slug].svelte-07894a49.js", css: ["/./_app/assets/pageContent-f79eae67.css"], js: ["/./_app/pages\\blog\\[slug].svelte-07894a49.js", "/./_app/chunks/vendor-9e9bcf26.js", "/./_app/chunks/pageContent-07a62830.js"], styles: null}, "src/routes/home.svelte": {entry: "/./_app/pages\\home.svelte-02d3fb40.js", css: ["/./_app/assets/pageContent-f79eae67.css"], js: ["/./_app/pages\\home.svelte-02d3fb40.js", "/./_app/chunks/vendor-9e9bcf26.js", "/./_app/chunks/pageContent-07a62830.js"], styles: null}};
async function load_component(file) {
  if (!module_lookup[file]) {
    console.log({file});
  }
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
function render(request, {
  paths = {base: "", assets: "/."},
  local = false,
  dependencies,
  only_render_prerenderable_pages = false,
  get_static_file
} = {}) {
  return ssr({
    ...request,
    host: request.headers["host"]
  }, {
    paths,
    local,
    template,
    manifest,
    load_component,
    target: "#svelte",
    entry: "/./_app/start-7a65c949.js",
    root: Root,
    hooks,
    dev: false,
    amp: false,
    dependencies,
    only_render_prerenderable_pages,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error) => error.stack,
    get_static_file,
    ssr: true,
    router: true,
    hydrate: true
  });
}
var app = ':root {\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;\n}\n\nhtml, body, p {\n  margin: 0;\n}';
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
var navLink_svelte_svelte_type_style_lang = ".nav__block__link.svelte-1drihek{width:100%;text-decoration:none;text-align:center;color:white;display:flex;justify-content:center;align-items:center}.nav__block__link--active.svelte-1drihek{border-width:5px;border-color:orange;border-bottom-style:solid;font-weight:bold}.nav__block__link__item.svelte-1drihek{list-style-type:none;text-transform:capitalize}";
const css$7 = {
  code: ".nav__block__link.svelte-1drihek{width:100%;text-decoration:none;text-align:center;color:white;display:flex;justify-content:center;align-items:center}.nav__block__link--active.svelte-1drihek{border-width:5px;border-color:orange;border-bottom-style:solid;font-weight:bold}.nav__block__link__item.svelte-1drihek{list-style-type:none;text-transform:capitalize}",
  map: `{"version":3,"file":"navLink.svelte","sources":["navLink.svelte"],"sourcesContent":["<script>\\r\\n\\t// export let segment\\r\\n\\timport { navigating, page, session } from '$app/stores'\\r\\n\\r\\n\\t\\r\\n\\texport let name\\r\\n\\texport let link\\r\\n\\t\\r\\n\\tlet page_\\r\\n\\tlink = link===undefined?name:link\\r\\n\\tpage_ = link===\\"\\"?undefined:link\\r\\n\\t$: segment = $page.path.split(\\"/\\")[1] || undefined\\r\\n\\r\\n</script>\\r\\n\\r\\n<style>\\r\\n.nav__block__link{\\r\\n\\twidth: 100%;\\r\\n\\r\\n\\ttext-decoration: none;\\r\\n\\ttext-align: center;\\r\\n\\tcolor: white;\\r\\n\\r\\n\\tdisplay: flex;\\r\\n\\r\\n\\tjustify-content: center;\\r\\n\\talign-items: center;\\r\\n}\\r\\n\\r\\n.nav__block__link--active{\\r\\n\\tborder-width: 5px;\\r\\n\\tborder-color: orange;\\r\\n\\tborder-bottom-style: solid;\\r\\n\\r\\n\\tfont-weight: bold;\\r\\n\\r\\n}\\r\\n\\r\\n.nav__block__link__item{\\r\\n\\tlist-style-type: none;\\r\\n\\ttext-transform: capitalize;\\r\\n}\\r\\n</style>\\r\\n\\r\\n\\r\\n<a class=\\"nav__block__link\\" class:nav__block__link--active={segment === page_} href=\\"/{link}\\">\\r\\n\\t<li class=\\"nav__block__link__item\\">\\r\\n\\t\\t{name}\\r\\n\\t</li>\\r\\n</a>"],"names":[],"mappings":"AAgBA,gCAAiB,CAAC,AACjB,KAAK,CAAE,IAAI,CAEX,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,KAAK,CAEZ,OAAO,CAAE,IAAI,CAEb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,AACpB,CAAC,AAED,wCAAyB,CAAC,AACzB,YAAY,CAAE,GAAG,CACjB,YAAY,CAAE,MAAM,CACpB,mBAAmB,CAAE,KAAK,CAE1B,WAAW,CAAE,IAAI,AAElB,CAAC,AAED,sCAAuB,CAAC,AACvB,eAAe,CAAE,IAAI,CACrB,cAAc,CAAE,UAAU,AAC3B,CAAC"}`
};
const NavLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let segment;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let {name} = $$props;
  let {link} = $$props;
  let page_;
  link = link === void 0 ? name : link;
  page_ = link === "" ? void 0 : link;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  $$result.css.add(css$7);
  segment = $page.path.split("/")[1] || void 0;
  $$unsubscribe_page();
  return `<a class="${[
    "nav__block__link svelte-1drihek",
    segment === page_ ? "nav__block__link--active" : ""
  ].join(" ").trim()}" href="${"/" + escape(link)}"><li class="${"nav__block__link__item svelte-1drihek"}">${escape(name)}</li></a>`;
});
var nav_svelte_svelte_type_style_lang = ".nav.svelte-f73i10{background-color:black;width:100%;position:fixed;top:0}.nav__block.svelte-f73i10{display:flex;height:5rem;max-width:800px;color:white;margin:auto;padding:0}";
const css$6 = {
  code: ".nav.svelte-f73i10{background-color:black;width:100%;position:fixed;top:0}.nav__block.svelte-f73i10{display:flex;height:5rem;max-width:800px;color:white;margin:auto;padding:0}",
  map: `{"version":3,"file":"nav.svelte","sources":["nav.svelte"],"sourcesContent":["<script>\\r\\n\\timport Link from '$lib/navLink.svelte';\\r\\n</script>\\r\\n\\r\\n\\r\\n<nav class=\\"nav\\">\\r\\n\\t<ul class=\\"nav__block\\">\\r\\n\\t\\t<Link name={'home'} link={''} />\\r\\n\\t\\t<Link name={'about'} />\\r\\n\\t\\t<Link name={'projects'} />\\r\\n\\t\\t<Link name={'blog'} />\\r\\n\\t\\t<Link name={'contact'} />\\r\\n\\t</ul>\\r\\n</nav>\\r\\n\\r\\n<style type=\\"text/scss\\">.nav {\\n  background-color: black;\\n  width: 100%;\\n  position: fixed;\\n  top: 0;\\n}\\n\\n.nav__block {\\n  display: flex;\\n  height: 5rem;\\n  max-width: 800px;\\n  color: white;\\n  margin: auto;\\n  /* fix */\\n  padding: 0;\\n}</style>\\r\\n"],"names":[],"mappings":"AAewB,IAAI,cAAC,CAAC,AAC5B,gBAAgB,CAAE,KAAK,CACvB,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,AACR,CAAC,AAED,WAAW,cAAC,CAAC,AACX,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CAEZ,OAAO,CAAE,CAAC,AACZ,CAAC"}`
};
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `<nav class="${"nav svelte-f73i10"}"><ul class="${"nav__block svelte-f73i10"}">${validate_component(NavLink, "Link").$$render($$result, {name: "home", link: ""}, {}, {})}
		${validate_component(NavLink, "Link").$$render($$result, {name: "about"}, {}, {})}
		${validate_component(NavLink, "Link").$$render($$result, {name: "projects"}, {}, {})}
		${validate_component(NavLink, "Link").$$render($$result, {name: "blog"}, {}, {})}
		${validate_component(NavLink, "Link").$$render($$result, {name: "contact"}, {}, {})}</ul>
</nav>`;
});
var footer_svelte_svelte_type_style_lang = '.footer.svelte-16lrg8x.svelte-16lrg8x{background-color:black;color:white}.footer__block.svelte-16lrg8x.svelte-16lrg8x{box-sizing:border-box;max-width:800px;margin:auto;padding:30px;margin:auto}.footer__block__contact.svelte-16lrg8x.svelte-16lrg8x{margin:auto;width:310px}.footer__block__contact__details.svelte-16lrg8x.svelte-16lrg8x{display:inline-block;margin-right:10px}.footer__block__contact__details--value.svelte-16lrg8x.svelte-16lrg8x{margin:0;margin-left:10px}.footer__social.svelte-16lrg8x li.svelte-16lrg8x{flex-shrink:0;width:3em;height:3em;border-radius:1.5em;border-top-right-radius:0.2em;margin:0.25em;background-color:white;background-size:cover;background-position:center;border-width:1px;border-style:solid;border-color:white;box-shadow:0 0 0 rgba(0, 0, 0, 0);transition-property:box-shadow;transition-duration:300ms}.footer__social.svelte-16lrg8x li.svelte-16lrg8x:hover{box-shadow:0 0 1em orange}.facebook.svelte-16lrg8x.svelte-16lrg8x{background-image:url("/Images/site/facebook.svg")}.twitter.svelte-16lrg8x.svelte-16lrg8x{background-image:url("/Images/site/twitter.svg")}.whatsapp.svelte-16lrg8x.svelte-16lrg8x{background-image:url("/Images/site/whatsapp.svg")}.linkedin.svelte-16lrg8x.svelte-16lrg8x{background-image:url("/Images/site/linkedin.svg")}.github.svelte-16lrg8x.svelte-16lrg8x{background-image:url("/Images/site/github.svg")}';
const css$5 = {
  code: '.footer.svelte-16lrg8x.svelte-16lrg8x{background-color:black;color:white}.footer__block.svelte-16lrg8x.svelte-16lrg8x{box-sizing:border-box;max-width:800px;margin:auto;padding:30px;margin:auto}.footer__block__contact.svelte-16lrg8x.svelte-16lrg8x{margin:auto;width:310px}.footer__block__contact__details.svelte-16lrg8x.svelte-16lrg8x{display:inline-block;margin-right:10px}.footer__block__contact__details--value.svelte-16lrg8x.svelte-16lrg8x{margin:0;margin-left:10px}.footer__social.svelte-16lrg8x li.svelte-16lrg8x{flex-shrink:0;width:3em;height:3em;border-radius:1.5em;border-top-right-radius:0.2em;margin:0.25em;background-color:white;background-size:cover;background-position:center;border-width:1px;border-style:solid;border-color:white;box-shadow:0 0 0 rgba(0, 0, 0, 0);transition-property:box-shadow;transition-duration:300ms}.footer__social.svelte-16lrg8x li.svelte-16lrg8x:hover{box-shadow:0 0 1em orange}.facebook.svelte-16lrg8x.svelte-16lrg8x{background-image:url("/Images/site/facebook.svg")}.twitter.svelte-16lrg8x.svelte-16lrg8x{background-image:url("/Images/site/twitter.svg")}.whatsapp.svelte-16lrg8x.svelte-16lrg8x{background-image:url("/Images/site/whatsapp.svg")}.linkedin.svelte-16lrg8x.svelte-16lrg8x{background-image:url("/Images/site/linkedin.svg")}.github.svelte-16lrg8x.svelte-16lrg8x{background-image:url("/Images/site/github.svg")}',
  map: '{"version":3,"file":"footer.svelte","sources":["footer.svelte"],"sourcesContent":["<footer class=\\"footer\\">\\r\\n\\t<div class=\\"footer__block\\">\\r\\n\\t\\t<div class=\\"footer__block__contact\\">\\r\\n\\t\\t\\t<div class=\\"footer__block__contact__details\\">\\r\\n\\t\\t\\t\\t<p>Phone</p>\\r\\n\\t\\t\\t\\t<p>Email</p>\\r\\n\\t\\t\\t\\t<p>Location</p>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t\\t<div class=\\"footer__block__contact__details footer__block__contact__details--value\\">\\r\\n\\t\\t\\t\\t<p>08067397793</p>\\r\\n\\t\\t\\t\\t<p>theophilus.ogbolu@gmail.com</p>\\r\\n\\t\\t\\t\\t<p>Lagos, Nigeria.</p>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\\r\\n\\r\\n\\t\\t<ul class=\\"footer__social\\">\\r\\n\\t\\t\\t<a href=\\"assets/file/theophilus_cv.pdf\\" class=\\"cv btn\\" download>\\r\\n\\t\\t\\t\\t<li>Download CV</li>\\r\\n\\t\\t\\t</a>\\r\\n\\r\\n\\t\\t\\t<a href=\\"https://wa.me/2348067397793/?text=Hello%20Theophilus\\">\\r\\n\\t\\t\\t\\t<li class=\\"whatsapp\\" />\\r\\n\\t\\t\\t</a>\\r\\n\\t\\t\\t<a href=\\"https://m.facebook.com/Pheezie\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">\\r\\n\\t\\t\\t\\t<li class=\\"facebook\\" />\\r\\n\\t\\t\\t</a>\\r\\n\\t\\t\\t<a href=\\"https://twitter.com/Pheezie\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">\\r\\n\\t\\t\\t\\t<li class=\\"twitter\\" />\\r\\n\\t\\t\\t</a>\\r\\n\\t\\t\\t<a\\r\\n\\t\\t\\t\\thref=\\"https://www.linkedin.com/in/theophilus-ogbolu-977385136/\\"\\r\\n\\t\\t\\t\\ttarget=\\"_blank\\"\\r\\n\\t\\t\\t\\trel=\\"noopener noreferrer\\"\\r\\n\\t\\t\\t>\\r\\n\\t\\t\\t\\t<li class=\\"linkedin\\" />\\r\\n\\t\\t\\t</a>\\r\\n\\t\\t\\t<a href=\\"https://github.com/pheezie\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">\\r\\n\\t\\t\\t\\t<li class=\\"github\\" />\\r\\n\\t\\t\\t</a>\\r\\n\\t\\t</ul>\\r\\n\\t</div>\\r\\n</footer>\\r\\n\\r\\n<style type=\\"text/scss\\">.footer {\\n  background-color: black;\\n  color: white;\\n}\\n\\n.footer__block {\\n  box-sizing: border-box;\\n  max-width: 800px;\\n  margin: auto;\\n  padding: 30px;\\n  margin: auto;\\n}\\n\\n.footer__block__contact {\\n  margin: auto;\\n  width: 310px;\\n}\\n\\n.footer__block__contact__details {\\n  display: inline-block;\\n  margin-right: 10px;\\n}\\n\\n.footer__block__contact__details--value {\\n  margin: 0;\\n  margin-left: 10px;\\n}\\n\\n.footer__social li {\\n  flex-shrink: 0;\\n  width: 3em;\\n  height: 3em;\\n  border-radius: 1.5em;\\n  border-top-right-radius: 0.2em;\\n  margin: 0.25em;\\n  background-color: white;\\n  background-size: cover;\\n  background-position: center;\\n  border-width: 1px;\\n  border-style: solid;\\n  border-color: white;\\n  box-shadow: 0 0 0 rgba(0, 0, 0, 0);\\n  transition-property: box-shadow;\\n  transition-duration: 300ms;\\n}\\n.footer__social li:hover {\\n  box-shadow: 0 0 1em orange;\\n}\\n\\n.facebook {\\n  background-image: url(\\"/Images/site/facebook.svg\\");\\n}\\n\\n.twitter {\\n  background-image: url(\\"/Images/site/twitter.svg\\");\\n}\\n\\n.whatsapp {\\n  background-image: url(\\"/Images/site/whatsapp.svg\\");\\n}\\n\\n.linkedin {\\n  background-image: url(\\"/Images/site/linkedin.svg\\");\\n}\\n\\n.github {\\n  background-image: url(\\"/Images/site/github.svg\\");\\n}</style>\\r\\n"],"names":[],"mappings":"AA2CwB,OAAO,8BAAC,CAAC,AAC/B,gBAAgB,CAAE,KAAK,CACvB,KAAK,CAAE,KAAK,AACd,CAAC,AAED,cAAc,8BAAC,CAAC,AACd,UAAU,CAAE,UAAU,CACtB,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,AACd,CAAC,AAED,uBAAuB,8BAAC,CAAC,AACvB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,AACd,CAAC,AAED,gCAAgC,8BAAC,CAAC,AAChC,OAAO,CAAE,YAAY,CACrB,YAAY,CAAE,IAAI,AACpB,CAAC,AAED,uCAAuC,8BAAC,CAAC,AACvC,MAAM,CAAE,CAAC,CACT,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,8BAAe,CAAC,EAAE,eAAC,CAAC,AAClB,WAAW,CAAE,CAAC,CACd,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,KAAK,CACpB,uBAAuB,CAAE,KAAK,CAC9B,MAAM,CAAE,MAAM,CACd,gBAAgB,CAAE,KAAK,CACvB,eAAe,CAAE,KAAK,CACtB,mBAAmB,CAAE,MAAM,CAC3B,YAAY,CAAE,GAAG,CACjB,YAAY,CAAE,KAAK,CACnB,YAAY,CAAE,KAAK,CACnB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAClC,mBAAmB,CAAE,UAAU,CAC/B,mBAAmB,CAAE,KAAK,AAC5B,CAAC,AACD,8BAAe,CAAC,iBAAE,MAAM,AAAC,CAAC,AACxB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,MAAM,AAC5B,CAAC,AAED,SAAS,8BAAC,CAAC,AACT,gBAAgB,CAAE,IAAI,2BAA2B,CAAC,AACpD,CAAC,AAED,QAAQ,8BAAC,CAAC,AACR,gBAAgB,CAAE,IAAI,0BAA0B,CAAC,AACnD,CAAC,AAED,SAAS,8BAAC,CAAC,AACT,gBAAgB,CAAE,IAAI,2BAA2B,CAAC,AACpD,CAAC,AAED,SAAS,8BAAC,CAAC,AACT,gBAAgB,CAAE,IAAI,2BAA2B,CAAC,AACpD,CAAC,AAED,OAAO,8BAAC,CAAC,AACP,gBAAgB,CAAE,IAAI,yBAAyB,CAAC,AAClD,CAAC"}'
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$5);
  return `<footer class="${"footer svelte-16lrg8x"}"><div class="${"footer__block svelte-16lrg8x"}"><div class="${"footer__block__contact svelte-16lrg8x"}"><div class="${"footer__block__contact__details svelte-16lrg8x"}"><p>Phone</p>
				<p>Email</p>
				<p>Location</p></div>
			<div class="${"footer__block__contact__details footer__block__contact__details--value svelte-16lrg8x"}"><p>08067397793</p>
				<p>theophilus.ogbolu@gmail.com</p>
				<p>Lagos, Nigeria.</p></div></div>

		<ul class="${"footer__social svelte-16lrg8x"}"><a href="${"assets/file/theophilus_cv.pdf"}" class="${"cv btn"}" download><li class="${"svelte-16lrg8x"}">Download CV</li></a>

			<a href="${"https://wa.me/2348067397793/?text=Hello%20Theophilus"}"><li class="${"whatsapp svelte-16lrg8x"}"></li></a>
			<a href="${"https://m.facebook.com/Pheezie"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><li class="${"facebook svelte-16lrg8x"}"></li></a>
			<a href="${"https://twitter.com/Pheezie"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><li class="${"twitter svelte-16lrg8x"}"></li></a>
			<a href="${"https://www.linkedin.com/in/theophilus-ogbolu-977385136/"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><li class="${"linkedin svelte-16lrg8x"}"></li></a>
			<a href="${"https://github.com/pheezie"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><li class="${"github svelte-16lrg8x"}"></li></a></ul></div>
</footer>`;
});
var $layout_svelte_svelte_type_style_lang = ".content.svelte-704n8n{background-color:#c8c8c8}.content__block.svelte-704n8n{max-width:800px;margin:auto;margin-top:5rem;background-color:white}";
const css$4 = {
  code: ".content.svelte-704n8n{background-color:#c8c8c8}.content__block.svelte-704n8n{max-width:800px;margin:auto;margin-top:5rem;background-color:white}",
  map: `{"version":3,"file":"$layout.svelte","sources":["$layout.svelte"],"sourcesContent":["<script>\\r\\n\\timport '../app.scss';\\r\\n\\timport Nav from '$lib/nav.svelte';\\r\\n\\timport Footer from '$lib/footer.svelte';\\r\\n</script>\\r\\n\\r\\n\\r\\n<main class=\\"content\\">\\r\\n\\t<Nav />\\r\\n\\t<div class=\\"content__block\\" >\\r\\n\\t\\t<slot />\\r\\n\\t</div>\\r\\n\\t<Footer />\\r\\n</main>\\r\\n\\r\\n<style type=\\"text/scss\\">.content {\\n  background-color: #c8c8c8;\\n}\\n\\n.content__block {\\n  max-width: 800px;\\n  margin: auto;\\n  margin-top: 5rem;\\n  background-color: white;\\n}</style>\\r\\n"],"names":[],"mappings":"AAewB,QAAQ,cAAC,CAAC,AAChC,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAED,eAAe,cAAC,CAAC,AACf,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,gBAAgB,CAAE,KAAK,AACzB,CAAC"}`
};
const $layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<main class="${"content svelte-704n8n"}">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
	<div class="${"content__block svelte-704n8n"}">${slots.default ? slots.default({}) : ``}</div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
</main>`;
});
var $layout$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: $layout
});
const $error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {status} = $$props;
  let {error} = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  return `<h1>${escape(status)}</h1>

<p>${escape(error.message)}</p>


${error.stack ? `<pre>${escape(error.stack)}</pre>` : ``}`;
});
var $error$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: $error
});
var pageImage_svelte_svelte_type_style_lang = "img.svelte-1ghtied{width:100%}";
const css$3 = {
  code: "img.svelte-1ghtied{width:100%}",
  map: '{"version":3,"file":"pageImage.svelte","sources":["pageImage.svelte"],"sourcesContent":["<script>\\r\\n    export let img = \\"img\\"\\r\\n</script>\\r\\n\\r\\n<img src=\\"/Images{img}\\" alt={img} />\\r\\n\\r\\n\\r\\n<style>\\r\\n    img{\\r\\n        width: 100%;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAQI,kBAAG,CAAC,AACA,KAAK,CAAE,IAAI,AACf,CAAC"}'
};
const PageImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {img = "img"} = $$props;
  if ($$props.img === void 0 && $$bindings.img && img !== void 0)
    $$bindings.img(img);
  $$result.css.add(css$3);
  return `<img src="${"/Images" + escape(img)}"${add_attribute("alt", img, 0)} class="${"svelte-1ghtied"}">`;
});
var pageContent_svelte_svelte_type_style_lang = ".content.svelte-7bu769{padding:50px}";
const css$2 = {
  code: ".content.svelte-7bu769{padding:50px}",
  map: '{"version":3,"file":"pageContent.svelte","sources":["pageContent.svelte"],"sourcesContent":["<!-- <script>\\r\\n    export let img = \\"img\\"\\r\\n</script> -->\\r\\n\\r\\n<div class=\\"content\\">\\r\\n    <slot/>\\r\\n</div>\\r\\n\\r\\n\\r\\n<style>\\r\\n    .content{\\r\\n        padding: 50px;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAUI,sBAAQ,CAAC,AACL,OAAO,CAAE,IAAI,AACjB,CAAC"}'
};
const PageContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `

<div class="${"content svelte-7bu769"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Home</title>`, ""}`, ""}

${validate_component(PageImage, "Image").$$render($$result, {img: "/project/akropol_001.jpeg"}, {}, {})}

${validate_component(PageContent, "Content").$$render($$result, {}, {}, {
    default: () => `<h6 class="${"desc"}">Welcome!</h6>

	<div class="${"center"}"><h4><strong>Hi.</strong></h4>
		Welcome to my personal portfolio website.
		<br>I am a web developer / graphics designer based in Lagos. I have a passion for designing
		and I love to create for web and mobile devices.
	</div>

	<div class="${"left"}"><h4><strong>What I can do.</strong></h4>
		<br>
		<strong>Design what you want.</strong>
		<br>
		I like to keep it simple. My goals are focused on details, content and conveying the message that
		you want to send.
		<br>
		<br>
		<strong>Develop what you need.</strong>
		<br>I am a developer, so I know how to create your website to run accross devices using the
		latest technologies available.
	</div>

	<div class="${"right"}"><h4><strong>I can help.</strong></h4>
		I am currently available for freelance work. If you have a project that you want to get started,
		think you need my help with something or just fancy saying hey, then get in touch.
	</div>`
  })}`;
});
var home = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Home
});
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>About</title>`, ""}`, ""}
${validate_component(PageImage, "Image").$$render($$result, {img: "/site/Theophilus.jpg"}, {}, {})}

${validate_component(PageContent, "Content").$$render($$result, {}, {}, {
    default: () => `<h6 class="${"desc"}">this is the about page</h6>
	<div class="${"content about"}"><p>My name is <strong>Theophilus Ogbolu</strong>, and this is the &quot;About Me&quot; stuff...
			<br>
			<br>
			I am a self-taught student of programming and software development, and I spend way too much time
			and money pursuing this interest. My friends and family are concerned for my well-being.
			<br>
			<br>
			In August of 2013 I accepted a position as a professional developer with a startup in Lagos, Nigeria.
			So I get paid to do what I would have been doing anyway, for free.
			<br>
			<br>
			I spend most of my free time working on building my skillset, contributing to Open Source projects,
			and trying to learn as much as I can. There have been many good people who have assited me in learning
			this craft, and I try to pay that forward by helping others who may be newer than I.
			<br>
			<br>
			I have benefited in massive ways from the work of those who took the time to share their know-how
			on the internet. From various bloggers to programming forums, to the now ubiquitous Stack Overow,
			I have, in Borg-like fashion, assimilated the experience and college education of some of the biggest
			(and not so big) names in the technology arena. Shamelessly!
			<br>
			<br>
			When I\u2019m not writing code or designing, I tend to be playing music (my other passion), exploring
			my surroundings, and doing my best to experience life beyond the code editor.
			<br>
			<br></p></div>`
  })}`;
});
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: About
});
var projects_svelte_svelte_type_style_lang = ".project.svelte-1dtkz1d{border-radius:20px;box-shadow:0 0 20px 1px}.project__img.svelte-1dtkz1d{border-radius:20px 20px 0 0;width:100%}.project__details.svelte-1dtkz1d{padding:30px}";
const css$1 = {
  code: ".project.svelte-1dtkz1d{border-radius:20px;box-shadow:0 0 20px 1px}.project__img.svelte-1dtkz1d{border-radius:20px 20px 0 0;width:100%}.project__details.svelte-1dtkz1d{padding:30px}",
  map: `{"version":3,"file":"projects.svelte","sources":["projects.svelte"],"sourcesContent":["<script>\\r\\n\\timport Image from '$lib/pageImage.svelte';\\r\\n\\timport Content from '$lib/pageContent.svelte';\\r\\n\\r\\n\\tlet projects = [\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'web',\\r\\n\\t\\t\\tname: 'Connekt',\\r\\n\\t\\t\\tdesc:\\r\\n\\t\\t\\t\\t'Connekt is a social sharing application that enable users to easily find and connect with other users that are interested in the Products or Services which are being Offered or Requested.',\\r\\n\\t\\t\\timg: 'connekt_001.png',\\r\\n\\t\\t\\tlink: 'http://www.connekt.website'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Logos and Banners',\\r\\n\\t\\t\\tname: 'Lily Collection',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'lilyCollection_001.png'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Logos and Banners',\\r\\n\\t\\t\\tname: 'Flipaxis Logo',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'flipaxis_001.png'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Models, Visualisation and Animation',\\r\\n\\t\\t\\tname: 'Model Viewer - S3V Range Rover L322',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'mvS3V/01.png'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Models, Visualisation and Animation',\\r\\n\\t\\t\\tname: 'Beads',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'bead_003.jpeg'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Models, Visualisation and Animation',\\r\\n\\t\\t\\tname: 'Charms Interior Design',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'charms_01_01.png'\\r\\n\\t\\t},\\r\\n\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Models, Visualisation and Animation',\\r\\n\\t\\t\\tname: 'Ankara with Marvealous Designer',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'ankara_001.png'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Models, Visualisation and Animation',\\r\\n\\t\\t\\tname: 'Bliss',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'faceoff_003.png'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Models, Visualisation and Animation',\\r\\n\\t\\t\\tname: 'Interrogation Room',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'interrogationRoom_005.png'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Models, Visualisation and Animation',\\r\\n\\t\\t\\tname: 'National Identity Management Commission',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'nimc_001.png'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Models, Visualisation and Animation',\\r\\n\\t\\t\\tname: 'Akropol',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'akropol_001.jpeg'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Models, Visualisation and Animation',\\r\\n\\t\\t\\timg: 'This is Nigeria ft. Falz',\\r\\n\\t\\t\\tdesc: 'Fan art',\\r\\n\\t\\t\\timg: 'tin_001.png'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Models, Visualisation and Animation',\\r\\n\\t\\t\\tname: 'Danfo 2.0',\\r\\n\\t\\t\\tdesc: 'How to rig a Vehicle tutorial.',\\r\\n\\t\\t\\timg: 'danfo_001.png'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Electronics',\\r\\n\\t\\t\\tname: 'Arduino Smart Car',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'arduino_001.png'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Others',\\r\\n\\t\\t\\tname: 'Costar Brochure',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'costar_001.png',\\r\\n\\t\\t\\tlink: 'costar_001.pdf'\\r\\n\\t\\t},\\r\\n\\t\\t{\\r\\n\\t\\t\\tcategory: 'Others',\\r\\n\\t\\t\\tname: 'Aris Brochure',\\r\\n\\t\\t\\tdesc: '',\\r\\n\\t\\t\\timg: 'aris_001.png',\\r\\n\\t\\t\\tlink: 'aris_001.pdf'\\r\\n\\t\\t}\\r\\n\\t];\\r\\n</script>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>projects</title>\\r\\n</svelte:head>\\r\\n\\r\\n<Image img=\\"/project/akropol_001.jpeg\\" />\\r\\n\\r\\n<Content>\\r\\n\\t{#each projects as n}\\r\\n\\t\\t<div class=\\"project\\">\\r\\n\\t\\t\\t<img class=\\"project__img\\" src=\\"/Images/project/{n.img}\\" alt={n.name} />\\r\\n\\t\\t\\t<div class=\\"project__details\\">\\r\\n\\t\\t\\t\\t{n.name}\\r\\n\\t\\t\\t\\t<br />\\r\\n\\t\\t\\t\\t{n.desc}\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\\r\\n\\t\\t<br />\\r\\n\\t\\t<br />\\r\\n\\t{/each}\\r\\n</Content>\\r\\n\\r\\n<style type=\\"text/scss\\">.project {\\n  border-radius: 20px;\\n  box-shadow: 0 0 20px 1px;\\n}\\n\\n.project__img {\\n  border-radius: 20px 20px 0 0;\\n  width: 100%;\\n}\\n\\n.project__details {\\n  padding: 30px;\\n}</style>\\r\\n"],"names":[],"mappings":"AAkIwB,QAAQ,eAAC,CAAC,AAChC,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,GAAG,AAC1B,CAAC,AAED,aAAa,eAAC,CAAC,AACb,aAAa,CAAE,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAC5B,KAAK,CAAE,IAAI,AACb,CAAC,AAED,iBAAiB,eAAC,CAAC,AACjB,OAAO,CAAE,IAAI,AACf,CAAC"}`
};
const Projects = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let projects2 = [
    {
      category: "web",
      name: "Connekt",
      desc: "Connekt is a social sharing application that enable users to easily find and connect with other users that are interested in the Products or Services which are being Offered or Requested.",
      img: "connekt_001.png",
      link: "http://www.connekt.website"
    },
    {
      category: "Logos and Banners",
      name: "Lily Collection",
      desc: "",
      img: "lilyCollection_001.png"
    },
    {
      category: "Logos and Banners",
      name: "Flipaxis Logo",
      desc: "",
      img: "flipaxis_001.png"
    },
    {
      category: "Models, Visualisation and Animation",
      name: "Model Viewer - S3V Range Rover L322",
      desc: "",
      img: "mvS3V/01.png"
    },
    {
      category: "Models, Visualisation and Animation",
      name: "Beads",
      desc: "",
      img: "bead_003.jpeg"
    },
    {
      category: "Models, Visualisation and Animation",
      name: "Charms Interior Design",
      desc: "",
      img: "charms_01_01.png"
    },
    {
      category: "Models, Visualisation and Animation",
      name: "Ankara with Marvealous Designer",
      desc: "",
      img: "ankara_001.png"
    },
    {
      category: "Models, Visualisation and Animation",
      name: "Bliss",
      desc: "",
      img: "faceoff_003.png"
    },
    {
      category: "Models, Visualisation and Animation",
      name: "Interrogation Room",
      desc: "",
      img: "interrogationRoom_005.png"
    },
    {
      category: "Models, Visualisation and Animation",
      name: "National Identity Management Commission",
      desc: "",
      img: "nimc_001.png"
    },
    {
      category: "Models, Visualisation and Animation",
      name: "Akropol",
      desc: "",
      img: "akropol_001.jpeg"
    },
    {
      category: "Models, Visualisation and Animation",
      img: "This is Nigeria ft. Falz",
      desc: "Fan art",
      img: "tin_001.png"
    },
    {
      category: "Models, Visualisation and Animation",
      name: "Danfo 2.0",
      desc: "How to rig a Vehicle tutorial.",
      img: "danfo_001.png"
    },
    {
      category: "Electronics",
      name: "Arduino Smart Car",
      desc: "",
      img: "arduino_001.png"
    },
    {
      category: "Others",
      name: "Costar Brochure",
      desc: "",
      img: "costar_001.png",
      link: "costar_001.pdf"
    },
    {
      category: "Others",
      name: "Aris Brochure",
      desc: "",
      img: "aris_001.png",
      link: "aris_001.pdf"
    }
  ];
  $$result.css.add(css$1);
  return `${$$result.head += `${$$result.title = `<title>projects</title>`, ""}`, ""}

${validate_component(PageImage, "Image").$$render($$result, {img: "/project/akropol_001.jpeg"}, {}, {})}

${validate_component(PageContent, "Content").$$render($$result, {}, {}, {
    default: () => `${each(projects2, (n) => `<div class="${"project svelte-1dtkz1d"}"><img class="${"project__img svelte-1dtkz1d"}" src="${"/Images/project/" + escape(n.img)}"${add_attribute("alt", n.name, 0)}>
			<div class="${"project__details svelte-1dtkz1d"}">${escape(n.name)}
				<br>
				${escape(n.desc)}
			</div></div>
		<br>
		<br>`)}`
  })}`;
});
var projects = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Projects
});
const Contact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Contact</title>`, ""}`, ""}
${validate_component(PageImage, "Image").$$render($$result, {img: "/site/Theophilus.jpg"}, {}, {})}

${validate_component(PageContent, "Content").$$render($$result, {}, {}, {
    default: () => `Feel free to contact me with questions or anything else. I will do my best to respond to your
	query as soon as possible.
	<br>
	<br>
	<form method="${"post"}" autoComplete="${"off"}" action="${"https://formspree.io/theophilus.ogbolu@gmail.com"}"><div class="${"inputGroup required"}"><label for="${"name"}">Full Name</label>
			<br>
			<input placeholder="${"Your Name"}" type="${"text"}" id="${"name"}" name="${"name"}" required></div>
		<div class="${"inputGroup required"}"><label for="${"email"}">Email Address</label>
			<br>
			<input placeholder="${"Your Email Address"}" type="${"email"}" id="${"email"}" name="${"email"}" required></div>
		<div class="${"inputGroup required"}"><label for="${"message"}">Message</label>
			<br>
			<textarea placeholder="${"Your Message"}" id="${"message"}" name="${"message"}" required></textarea></div>
		<div class="${"inputGroup submit"}"><input type="${"submit"}" class="${"btn"}" value="${"Send Message"}"></div></form>`
  })}`;
});
var contact = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Contact
});
var breaker_svelte_svelte_type_style_lang = ".breaker.svelte-7jdlf{height:calc(100vh - 5rem);background-color:orange;display:flex}.breaker__title.svelte-7jdlf{color:white;font-size:2em;font-weight:bolder;align-self:center;margin:auto}";
const css = {
  code: ".breaker.svelte-7jdlf{height:calc(100vh - 5rem);background-color:orange;display:flex}.breaker__title.svelte-7jdlf{color:white;font-size:2em;font-weight:bolder;align-self:center;margin:auto}",
  map: '{"version":3,"file":"breaker.svelte","sources":["breaker.svelte"],"sourcesContent":["<script>\\r\\n    export let title = \\"title\\"\\r\\n\\r\\n</script>\\r\\n\\r\\n<div class=\\"breaker\\">\\r\\n    <h1 class=\\"breaker__title\\" >\\r\\n        {title}\\r\\n\\r\\n    </h1>\\r\\n</div>\\r\\n\\r\\n<style type=\\"text/scss\\">.breaker {\\n  height: calc(100vh - 5rem);\\n  background-color: orange;\\n  display: flex;\\n}\\n\\n.breaker__title {\\n  color: white;\\n  font-size: 2em;\\n  font-weight: bolder;\\n  align-self: center;\\n  margin: auto;\\n  /* justify-items: center; */\\n  /* justify-self: center; */\\n  /* justify-content: center; */\\n}</style>"],"names":[],"mappings":"AAYwB,QAAQ,aAAC,CAAC,AAChC,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAC1B,gBAAgB,CAAE,MAAM,CACxB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,eAAe,aAAC,CAAC,AACf,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,IAAI,AAId,CAAC"}'
};
const Breaker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {title = "title"} = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css);
  return `<div class="${"breaker svelte-7jdlf"}"><h1 class="${"breaker__title svelte-7jdlf"}">${escape(title)}</h1>
</div>`;
});
var breaker = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Breaker
});
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Home, "Home").$$render($$result, {}, {}, {})}
${validate_component(Breaker, "Breaker").$$render($$result, {title: "About"}, {}, {})}
${validate_component(About, "About").$$render($$result, {}, {}, {})}
${validate_component(Breaker, "Breaker").$$render($$result, {title: "Projects"}, {}, {})}
${validate_component(Projects, "Projects").$$render($$result, {mini: true}, {}, {})}
${validate_component(Breaker, "Breaker").$$render($$result, {title: "Contact"}, {}, {})}
${validate_component(Contact, "Contact").$$render($$result, {}, {}, {})}


${$$result.head += `${$$result.title = `<title>Home</title>`, ""}`, ""}`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Routes
});
const Blog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Blog</title>`, ""}`, ""}

${validate_component(PageImage, "Image").$$render($$result, {img: "/project/akropol_001.jpeg"}, {}, {})}

${validate_component(PageContent, "Content").$$render($$result, {}, {}, {
    default: () => `Under construction
`
  })}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Blog
});
const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Blog Entry</title>`, ""}`, ""}

${validate_component(PageImage, "Image").$$render($$result, {img: "/project/akropol_001.jpeg"}, {}, {})}

${validate_component(PageContent, "Content").$$render($$result, {}, {}, {
    default: () => `Under construction
`
  })}`;
});
var _slug_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: U5Bslugu5D
});
export {init, render};
