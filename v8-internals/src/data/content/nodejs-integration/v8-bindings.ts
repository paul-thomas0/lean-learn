import type { Section } from '../../../types';

export const v8BindingsSections: Section[] = [
  {
    id: 'node-v8-bindings',
    title: 'V8 Bindings & N-API',
    content: [
      {
        type: 'text',
        content:
          "Node.js is fundamentally a C++ application that embeds V8. The bridge between JavaScript and native C++ code is built on V8's **C++ API** — a rich set of classes and functions for creating JavaScript values, defining functions, managing memory, and handling exceptions from C++. Understanding this binding layer reveals how Node.js built-in modules work under the hood and how native addons extend the runtime.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'V8 Isolates and Contexts',
      },
      {
        type: 'text',
        content:
          "A `v8::Isolate` represents an isolated instance of the V8 engine. Each Isolate has its own heap memory, garbage collector, and compilation infrastructure. No JavaScript objects or handles can be shared between Isolates without explicit serialization. Node.js typically creates one Isolate for the main thread (and one per worker thread). Within an Isolate, a `v8::Context` provides a separate global object and built-in objects. Contexts allow multiple independent JavaScript environments within the same Isolate — this is how Node.js's `vm` module creates sandboxed execution environments.",
      },
      {
        type: 'code',
        language: 'cpp',
        code: `#include <v8.h>
using namespace v8;

// Creating a context and running JavaScript from C++
void RunInContext(Isolate* isolate) {
  // HandleScope manages the lifetime of Local handles on the stack
  HandleScope handle_scope(isolate);

  // Create a new context (fresh global object)
  Local<Context> context = Context::New(isolate);

  // Enter the context — required before creating JS values
  Context::Scope context_scope(context);

  // Compile and run a JavaScript string
  Local<String> source =
      String::NewFromUtf8(isolate, "'Hello' + ' World'").ToLocalChecked();
  Local<Script> script = Script::Compile(context, source).ToLocalChecked();
  Local<Value> result = script->Run(context).ToLocalChecked();

  // Convert result to a C++ string
  String::Utf8Value utf8(isolate, result);
  printf("%s\\n", *utf8);  // "Hello World"
}`,
        caption:
          'Using V8 API to create a context, compile JavaScript, and extract the result in C++',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Handles and Handle Scopes',
      },
      {
        type: 'text',
        content:
          "V8 uses a **handle** system to reference JavaScript objects from C++ code. Handles are necessary because V8's garbage collector can move objects in memory. There are two main handle types: `Local<T>` handles are stack-allocated and automatically freed when their enclosing `HandleScope` is destroyed. `Global<T>` (and `Persistent<T>`) handles live on the heap and survive beyond a single `HandleScope` — they must be explicitly disposed. A `HandleScope` must be active on the stack before creating any `Local` handles; it acts as a container that bulk-frees all locals when it goes out of scope.",
      },
      {
        type: 'key-concept',
        title: 'Handle Types',
        content:
          "**Local<T>** — Short-lived, stack-allocated. Automatically garbage-collected when the enclosing HandleScope exits. Used for most operations.\n\n**Global<T>** — Long-lived, heap-allocated. Persists across HandleScopes. Must be manually `Reset()` to release. Used for caching values that need to survive beyond a single function call.\n\n**HandleScope** — Creates a scope for Local handles. All Locals created within it are freed when it destructs. Nesting HandleScopes in long loops prevents handle table overflow.\n\n**EscapableHandleScope** — Like HandleScope, but allows one Local handle to be \"escaped\" to the enclosing scope, useful when a function needs to return a newly created Local handle.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Exposing C++ Functions to JavaScript',
      },
      {
        type: 'code',
        language: 'cpp',
        code: `#include <node.h>
using namespace v8;

// C++ function that will be callable from JavaScript
void Add(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  // Type-check arguments
  if (args.Length() < 2 || !args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Expected two numbers").ToLocalChecked()));
    return;
  }

  double a = args[0].As<Number>()->Value();
  double b = args[1].As<Number>()->Value();

  // Set the return value
  args.GetReturnValue().Set(Number::New(isolate, a + b));
}

// Module initialization — register the function
void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "add", Add);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)`,
        caption:
          'A traditional V8-API native addon: the Add function is exposed to JavaScript as exports.add()',
      },
      {
        type: 'heading',
        level: 2,
        text: 'N-API (Node-API): The Stable ABI',
      },
      {
        type: 'text',
        content:
          "**Node-API** (formerly N-API) is a C API that provides an **ABI-stable** interface for building native addons. Unlike the raw V8 C++ API, Node-API does not expose V8 internals — it wraps them behind an opaque, version-independent interface. This means addons compiled with Node-API work across different Node.js versions (and even different V8 versions) without recompilation. Node-API handles are represented as `napi_value` (an opaque pointer), and all operations go through `napi_*` functions. The `node-addon-api` package provides a C++ wrapper around Node-API for more ergonomic development.",
      },
      {
        type: 'code',
        language: 'cpp',
        code: `#include <node_api.h>

// N-API version of the Add function
napi_value Add(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value args[2];
  napi_get_cb_info(env, info, &argc, args, NULL, NULL);

  double a, b;
  napi_get_value_double(env, args[0], &a);
  napi_get_value_double(env, args[1], &b);

  napi_value result;
  napi_create_double(env, a + b, &result);
  return result;
}

// Module initialization
napi_value Init(napi_env env, napi_value exports) {
  napi_value fn;
  napi_create_function(env, NULL, 0, Add, NULL, &fn);
  napi_set_named_property(env, exports, "add", fn);
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)`,
        caption:
          'The same addon using Node-API (N-API) — ABI-stable, no V8 headers needed',
      },
      {
        type: 'comparison',
        leftTitle: 'Raw V8 C++ API',
        rightTitle: 'Node-API (N-API)',
        leftContent:
          'Direct access to V8 internals (Isolate, Context, HandleScope). Maximum performance and flexibility. Tightly coupled to V8 version — addons must be recompiled for each Node.js major version. Requires deep understanding of V8 memory model.',
        rightContent:
          'ABI-stable across Node.js versions — compile once, run on many versions. Slightly more verbose API. No direct V8 access — uses opaque napi_value handles. Recommended for all new native addons. The node-addon-api C++ wrapper provides ergonomic syntax similar to raw V8 API.',
      },
      {
        type: 'info',
        variant: 'tip',
        title: 'Modern Alternatives to Native Addons',
        content:
          "Before writing a native addon, consider alternatives. **WebAssembly (Wasm)** runs in V8 at near-native speed and is portable across all JavaScript runtimes — no compilation step needed. **Foreign Function Interface (FFI)** libraries like `ffi-napi` or `koffi` let you call shared library functions from JavaScript without writing any C/C++. Native addons are still the best choice when you need deep integration with Node.js internals, access to V8-specific features, or peak performance with complex data structures.",
      },
    ],
  },
];
