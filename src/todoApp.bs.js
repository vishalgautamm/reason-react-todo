// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var List        = require("bs-platform/lib/js/list.js");
var $$Array     = require("bs-platform/lib/js/array.js");
var React       = require("react");
var Js_boolean  = require("bs-platform/lib/js/js_boolean.js");
var Pervasives  = require("bs-platform/lib/js/pervasives.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var lastId = [0];

function newItem() {
  lastId[0] = lastId[0] + 1 | 0;
  return /* record */[
          /* id */lastId[0],
          /* title */"Click a button",
          /* completed : true */1
        ];
}

var component = ReasonReact.reducerComponent("TodoApp");

function str(prim) {
  return prim;
}

var component$1 = ReasonReact.statelessComponent("TodoItem");

function make(item, _) {
  var newrecord = component$1.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("li", undefined, React.createElement("div", {
                      className: "view"
                    }, React.createElement("input", {
                          className: "toggle",
                          checked: Js_boolean.to_js_boolean(item[/* completed */2]),
                          type: "checkbox",
                          onClick: (function () {
                              console.log("TODO: Implement Check buttton");
                              return /* () */0;
                            })
                        }), React.createElement("label", undefined, item[/* title */1]), React.createElement("button", {
                          className: "destroy"
                        })));
    });
  return newrecord;
}

var TodoItem = /* module */[
  /* component */component$1,
  /* make */make
];

function make$1() {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (param) {
      var items = param[/* state */2][/* items */0];
      var numItems = List.length(items);
      return React.createElement("div", {
                  className: "app"
                }, React.createElement("section", {
                      className: "todoapp"
                    }, React.createElement("header", {
                          className: "header"
                        }, React.createElement("h1", undefined, "todos Reason"), React.createElement("input", {
                              className: "new-todo",
                              placeholder: "What needs to be done"
                            })), React.createElement("section", {
                          className: "main"
                        }, React.createElement("ul", {
                              className: "todo-list"
                            }, $$Array.of_list(List.map((function (item) {
                                        return ReasonReact.element(/* Some */[Pervasives.string_of_int(item[/* id */0])], /* None */0, make(item, /* array */[]));
                                      }), items))))), React.createElement("div", {
                      className: "footer"
                    }, React.createElement("span", {
                          className: "todo-count"
                        }, React.createElement("strong", undefined, Pervasives.string_of_int(numItems)), " todo left")));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[/* items : :: */[
                /* record */[
                  /* id */1,
                  /* title */"Learn ReasonML",
                  /* completed : false */0
                ],
                /* :: */[
                  /* record */[
                    /* id */2,
                    /* title */"Learn ReasonML",
                    /* completed : false */0
                  ],
                  /* :: */[
                    /* record */[
                      /* id */3,
                      /* title */"Learn ReasonML",
                      /* completed : false */0
                    ],
                    /* [] */0
                  ]
                ]
              ]];
    });
  newrecord[/* reducer */12] = (function (_, _$1) {
      return /* NoUpdate */0;
    });
  return newrecord;
}

exports.lastId    = lastId;
exports.newItem   = newItem;
exports.component = component;
exports.str       = str;
exports.TodoItem  = TodoItem;
exports.make      = make$1;
/* component Not a pure module */
