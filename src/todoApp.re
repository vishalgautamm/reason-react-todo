type todo = {
  id: int,
  title: string,
  editing: bool,
  completed: bool
};

/* Filter State */
type filterState =
  | All
  | Active
  | Completed;

type state = {
  items: list(todo),
  filter: filterState
};

let str = ReasonReact.stringToElement;

let pluralize = (str, ending, n) => str ++ (n === 1 ? "" : ending);

let pluralizeItems = pluralize("item", "s");

let valueFromEvent = evt : string => (
                                       evt
                                       |> ReactEventRe.Form.target
                                       |> ReactDOMRe.domElementToObj
                                     )##value;

type action =
  | AddItem(string)
  | ToggleItem(int)
  | DeleteItem(todo)
  | Clear
  | All
  | Reset;

module Input = {
  let component = ReasonReact.reducerComponent("Input");
  let make = (~onSubmit, _) => {
    ...component,
    initialState: () => "",
    reducer: (newText, _text) => ReasonReact.Update(newText),
    render: self =>
      <input
        _type="text"
        className="new-todo"
        placeholder="Write something to do"
        onChange=(_evt => self.send(valueFromEvent(_evt)))
        onKeyDown=(
          _evt =>
            if (ReactEventRe.Keyboard.key(_evt) == "Enter") {
              onSubmit(self.state);
              self.send("");
            }
        )
        value=self.state
      />
  };
};

module TodoItem = {
  let component = ReasonReact.statelessComponent("TodoItem");
  let completed = item => item.completed ? "completed" : "";
  let make = (~item, ~onToggle, ~onDelete, children) => {
    ...component,
    render: (_) =>
      <li className=(completed(item))>
        <div className="view">
          <input
            _type="checkbox"
            className="toggle"
            checked=(Js.Boolean.to_js_boolean(item.completed))
            onClick=(_evt => onToggle())
          />
          <label> (str(item.title)) </label>
          <button className="destroy" onClick=(_evt => onDelete()) />
        </div>
      </li>
  };
};

let component = ReasonReact.reducerComponent("TodoApp");

let newItem =
  (
    () => {
      let lastId = ref(-1);
      title => {
        lastId := lastId^ + 1;
        {id: lastId^, title, completed: false, editing: false};
      };
    }
  )
    ();

/* Reducer function  */
let reducer = (action, {items, filter}) =>
  switch action {
  | AddItem(text) =>
    ReasonReact.Update({items: [newItem(text), ...items], filter: All})
  | ToggleItem(id) =>
    items
    |> List.map(item =>
         item.id === id ? {...item, completed: ! item.completed} : item
       )
    |> (items => ReasonReact.Update({items, filter}))
  | DeleteItem(todo) =>
    items
    |> List.filter(item => item.id !== todo.id)
    |> (items => ReasonReact.Update({items, filter}))
  | Clear =>
    items
    |> List.filter(item => item.completed == false)
    |> (items => ReasonReact.Update({items, filter}))
  | All => ReasonReact.Update({items, filter})
  | Reset =>
    items
    |> List.filter(item => item.completed == true)
    |> (items => ReasonReact.Update({items, filter}))
  };

/* Main Function */
let make = (_) => {
  ...component,
  initialState: () => {items: [], filter: All},
  reducer: (action, {items, filter}) => reducer(action, {items, filter}),
  render: self => {
    let numItems =
      self.state.items |> List.filter(item => ! item.completed) |> List.length;
    <div>
      <section className="todoapp">
        <header className="header">
          <h1> (str("todos Reason")) </h1>
          <Input onSubmit=(text => self.send(AddItem(text))) />
        </header>
        /* Main Application -- Start */
        <section className="main">
          <ul className="todo-list">
            (
              self.state.items
              |> List.map(item =>
                   <TodoItem
                     key=(string_of_int(item.id))
                     onToggle=(_event => self.send(ToggleItem(item.id)))
                     onDelete=(_event => self.send(DeleteItem(item)))
                     item
                   />
                 )
              |> Array.of_list
              |> ReasonReact.arrayToElement
            )
          </ul>
        </section>
        /* Main Application -- End */
        <div className="footer">
          <span className="todo-count">
            <strong>
              (str(string_of_int(numItems) ++ " " ++ pluralizeItems(numItems)))
            </strong>
            (str(" left"))
          </span>
          <ul className="filters">
            <li key="key-all">
              <a
                className="selected"
                href="#"
                onClick=(_event => self.send(All))>
                (str("All"))
              </a>
            </li>
            <li key="key-completed">
              <a className="" href="#" onClick=(_event => self.send(Reset))>
                (str("Reset"))
              </a>
            </li>
          </ul>
          <button
            className="clear-completed" onClick=(_event => self.send(Clear))>
            (str("Clear Completed "))
          </button>
        </div>
      </section>
    </div>;
  }
};