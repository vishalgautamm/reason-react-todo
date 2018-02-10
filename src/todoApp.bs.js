// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var List        = require("bs-platform/lib/js/list.js");
var $$Array     = require("bs-platform/lib/js/array.js");
var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var React       = require("react");
var Js_boolean  = require("bs-platform/lib/js/js_boolean.js");
var Pervasives  = require("bs-platform/lib/js/pervasives.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

function str(prim) {
  return prim;
}

function pluralize(str, ending, n) {
  var match = +(n === 1);
  return str + (
          match !== 0 ? "" : ending
        );
}

function pluralizeItems(param) {
  return pluralize("item", "s", param);
}

function valueFromEvent(evt) {
  return evt.target.value;
}

var component = ReasonReact.reducerComponent("Input");

function make(onSubmit, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return React.createElement("input", {
                  className: "new-todo",
                  placeholder: "Write something to do",
                  type: "text",
                  value: self[/* state */2],
                  onKeyDown: (function (_evt) {
                      if (_evt.key === "Enter") {
                        Curry._1(onSubmit, self[/* state */2]);
                        return Curry._1(self[/* send */4], "");
                      } else {
                        return 0;
                      }
                    }),
                  onChange: (function (_evt) {
                      return Curry._1(self[/* send */4], _evt.target.value);
                    })
                });
    });
  newrecord[/* initialState */10] = (function () {
      return "";
    });
  newrecord[/* reducer */12] = (function (newText, _) {
      return /* Update */Block.__(0, [newText]);
    });
  return newrecord;
}

var Input = /* module */[
  /* component */component,
  /* make */make
];

var component$1 = ReasonReact.statelessComponent("TodoItem");

function completed(item) {
  var match = item[/* completed */2];
  if (match !== 0) {
    return "completed";
  } else {
    return "";
  }
}

function make$1(item, onToggle, onDelete, _) {
  var newrecord = component$1.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("li", {
                  className: completed(item)
                }, React.createElement("div", {
                      className: "view"
                    }, React.createElement("input", {
                          className: "toggle",
                          checked: Js_boolean.to_js_boolean(item[/* completed */2]),
                          type: "checkbox",
                          onClick: (function () {
                              return Curry._1(onToggle, /* () */0);
                            })
                        }), React.createElement("label", undefined, item[/* title */1]), React.createElement("button", {
                          className: "destroy",
                          onClick: (function () {
                              return Curry._1(onDelete, /* () */0);
                            })
                        })));
    });
  return newrecord;
}

var TodoItem = /* module */[
  /* component */component$1,
  /* completed */completed,
  /* make */make$1
];

var component$2 = ReasonReact.reducerComponent("TodoApp");

var lastId = [-1];

function newItem(title) {
  lastId[0] = lastId[0] + 1 | 0;
  return /* record */[
          /* id */lastId[0],
          /* title */title,
          /* completed : false */0
        ];
}

function make$2() {
  var newrecord = component$2.slice();
  newrecord[/* render */9] = (function (self) {
      var numItems = List.length(List.filter((function (item) {
                    return 1 - item[/* completed */2];
                  }))(self[/* state */2][/* items */0]));
      var finishedItems = List.length(List.filter((function (item) {
                    return item[/* completed */2];
                  }))(self[/* state */2][/* items */0]));
      return React.createElement("div", {
                  className: "app"
                }, React.createElement("section", {
                      className: "todoapp"
                    }, React.createElement("header", {
                          className: "header"
                        }, React.createElement("h1", undefined, "todos Reason"), ReasonReact.element(/* None */0, /* None */0, make((function (text) {
                                    return Curry._1(self[/* send */4], /* AddItem */Block.__(0, [text]));
                                  }), /* array */[]))), React.createElement("section", {
                          className: "main"
                        }, React.createElement("ul", {
                              className: "todo-list"
                            }, $$Array.of_list(List.map((function (item) {
                                        return ReasonReact.element(/* Some */[Pervasives.string_of_int(item[/* id */0])], /* None */0, make$1(item, (function () {
                                                          return Curry._1(self[/* send */4], /* ToggleItem */Block.__(1, [item[/* id */0]]));
                                                        }), (function () {
                                                          return Curry._1(self[/* send */4], /* DeleteItem */Block.__(2, [item]));
                                                        }), /* array */[]));
                                      }), self[/* state */2][/* items */0]))))), React.createElement("div", {
                      className: "footer"
                    }, React.createElement("span", {
                          className: "todo-count"
                        }, React.createElement("strong", undefined, Pervasives.string_of_int(numItems) + (" " + pluralizeItems(numItems))), " todo left"), React.createElement("div", undefined, React.createElement("strong", undefined, Pervasives.string_of_int(finishedItems)), " Todos completed")));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* items : [] */0];
    });
  newrecord[/* reducer */12] = (function (action, param) {
      var items = param[/* items */0];
      switch (action.tag | 0) {
        case 0 : 
            return /* Update */Block.__(0, [/* record */[/* items : :: */[
                          newItem(action[0]),
                          items
                        ]]]);
        case 1 : 
            var id = action[0];
            var items$1 = List.map((function (item) {
                    var match = +(item[/* id */0] === id);
                    if (match !== 0) {
                      return /* record */[
                              /* id */item[/* id */0],
                              /* title */item[/* title */1],
                              /* completed */1 - item[/* completed */2]
                            ];
                    } else {
                      return item;
                    }
                  }), items);
            return /* Update */Block.__(0, [/* record */[/* items */items$1]]);
        case 2 : 
            var todo = action[0];
            var items$2 = List.filter((function (item) {
                      return +(item[/* id */0] !== todo[/* id */0]);
                    }))(items);
            return /* Update */Block.__(0, [/* record */[/* items */items$2]]);
        
      }
    });
  return newrecord;
}

exports.str            = str;
exports.pluralize      = pluralize;
exports.pluralizeItems = pluralizeItems;
exports.valueFromEvent = valueFromEvent;
exports.Input          = Input;
exports.TodoItem       = TodoItem;
exports.component      = component$2;
exports.newItem        = newItem;
exports.make           = make$2;
/* component Not a pure module */
