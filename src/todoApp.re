/* ========================================================== */
/* Declaring State */
type item = {
  id: int,
  title: string,
  completed: bool
};

type state = {items: list(item)};

let lastId = 0;

let newItem = () => {
  let lastId = lastId + 1;
  {id: lastId, title: "Click a button", completed: true};
};

/* ========================================================== */
/* Components  */
let component = ReasonReact.reducerComponent("TodoApp");

let str = ReasonReact.stringToElement;

module TodoItem = {
  let component = ReasonReact.statelessComponent("TodoItem");
  let make = (~item, children) => {
    ...component,
    render: self =>
      <li>
        <div className="view">
          <input
            className="toggle"
            checked=(Js.Boolean.to_js_boolean(item.completed))
            onClick=(evt => Js.log("TODO: Implement Check buttton"))
            _type="checkbox"
          />
          <label> (str(item.title)) </label>
          <button className="destroy" />
        </div>
      </li>
  };
};

let make = children => {
  ...component,
  initialState: () => {
    items: [
      {id: 1, title: "Learn ReasonML", completed: false},
      {id: 2, title: "Learn ReasonML", completed: false},
      {id: 3, title: "Learn ReasonML", completed: false}
    ]
  },
  reducer: ((), _) => ReasonReact.NoUpdate,
  render: ({state: {items}}) => {
    let numItems = List.length(items);
    <div className="app">
      <section className="todoapp">
        <header className="header">
          <h1> (str("todos Reason")) </h1>
          <input className="new-todo" placeholder="What needs to be done" />
        </header>
        <section className="main">
          <ul className="todo-list">
            (
              items
              |> List.map(item =>
                   <TodoItem key=(string_of_int(item.id)) item />
                 )
              |> Array.of_list
              |> ReasonReact.arrayToElement
            )
          </ul>
        </section>
      </section>
      <div className="footer">
        <span className="todo-count">
          <strong> (str(string_of_int(numItems))) </strong>
          (str(" todo left"))
        </span>
      </div>
    </div>;
  }
};