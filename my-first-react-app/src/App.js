import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from "react";
import "./index.css";
import BtnModule from "./components/Button/button.jsx";
import "./styles.scss";
import styled, { ThemeProvider } from "styled-components";
import Cat from "./assets/images/cat.jpg";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { Routes, Route, Link, useParams, Outlet } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Theme, { theme } from "./styles/theme.jsx";
import ProductCard from "./components/ProductListing/ProductListing.jsx";

function WithoutJSX() {
  const withoutJSX = React.createElement(
    "div",
    null,
    "React without JSX Hello World"
  );
  return withoutJSX;
}

function WithJSX() {
  return <div>React with JSX Hello World</div>;
}

function Component() {
  return <div>A React Component</div>;
}

function Variables() {
  const productTitle = "Milk";
  const productPrice = 29.99;
  return (
    <div>
      Component with Variables: {productTitle}: {productPrice} -{" "}
      {productPrice > 20 ? "Expensive" : "Cheap"}
    </div>
  );
}

function Props(props) {
  console.log(props);
  return (
    <div>
      {props.title}: {props.price}$ - {props.price > 20 ? "Expensive" : "Cheap"}
    </div>
  );
}

function ButtonClick() {
  function handleClick() {
    console.log("Button Clicked");
  }
  return (
    <div>
      <h2>Button Click</h2>
      <button onClick={handleClick}>React Event: Click Me</button>;
    </div>
  );
}

function BtnClickWithValues() {
  function handleClick(param) {
    console.log(param);
  }
  return (
    <div>
      <h2>Button Click With Values</h2>
      <button onClick={() => handleClick("Hello")}>
        Click with params: Click Me
      </button>
    </div>
  );
}

function UseState() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div>
      <h2>useState</h2>
      <input
        placeholder="Saving to useState: First Name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        placeholder="Saving to useState: Last Name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <div>
        {firstName} {lastName}
      </div>
    </div>
  );
}

function CountWithUseState() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Count with useState</h3>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <div>Count: {count}</div>
    </div>
  );
}

function Map() {
  const products = [
    { id: 0, title: "Milk", price: 29.99 },
    { id: 1, title: "Bread", price: 9.99 },
    { id: 2, title: "Eggs", price: 4.99 },
  ];

  return (
    <div>
      <h2>Using Map on an array</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title}: {product.price}$
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConditionalRendering() {
  const products = [
    { id: 0, title: "Bread", price: 19.99, isOnSale: true },
    { id: 1, title: "Milk", price: 29.99, isOnSale: false },
    { id: 2, title: "Cheese", price: 35.99, isOnSale: false },
    { id: 3, title: "Water", price: 15.99, isOnSale: true },
  ];

  return (
    <div>
      <h2>Conditional Rendering</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title}: {product.price}$
            {product.isOnSale ? <div>On Sale</div> : <div>Not on Sale</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShortCircuit() {
  const products = [
    { id: 0, title: "Bread", price: 19.99, isOnSale: true },
    { id: 1, title: "Milk", price: 29.99, isOnSale: false },
    { id: 2, title: "Cheese", price: 35.99, isOnSale: false },
    { id: 3, title: "Water", price: 15.99, isOnSale: true },
  ];
  return (
    <div>
      <h2>Short Circuit if you dont need the else in an if statement</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title}: {product.price}$
            {product.isOnSale && <div>On Sale</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Styling() {
  return (
    <div>
      <h2>Styling CSS</h2>
      <div className="firstClass">Red Text</div>
    </div>
  );
}

function Sass() {
  return (
    <div>
      <h2>Styling with Sass</h2>
      <h6>Red Text</h6>
    </div>
  );
}

const Button = styled.button`
  background-color: var(--color-primary);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-secondary);
  }
`;
function StyledComponent() {
  return (
    <div>
      <h2>Styled Component</h2>
      <Button>Hello</Button>
    </div>
  );
}

const Item = styled.li`
  color: ${(props) =>
    props.isOnSale ? "var(--color-primary)" : "var(--color-secondary)"};
  font-weight: ${(props) => (props.isOnSale ? "bold" : "normal")};
`;
function StyledComponentWithProps() {
  const products = [
    { id: 0, title: "Bread", price: 19.99, isOnSale: true },
    { id: 1, title: "Milk", price: 29.99, isOnSale: false },
    { id: 2, title: "Cheese", price: 35.99, isOnSale: false },
    { id: 3, title: "Water", price: 15.99, isOnSale: true },
  ];
  return (
    <div>
      <h2>Styled Component with Props</h2>
      <ul>
        {products.map((product) => (
          <Item key={product.id} isOnSale={product.isOnSale}>
            {product.title}: {product.price}$
          </Item>
        ))}
      </ul>
    </div>
  );
}

const BaseButton = styled.button`
  background-color: white;
  border: 2px solid black;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  transition: background-color linear 400ms;

  &:hover {
    background-color: black;
    color: white;
  }
`;
const PrimaryButton = styled(BaseButton)`
  background-color: var(--color-primary);
  color: var(--color-secondary);
`;
function PrimaryBaseButton() {
  return (
    <div>
      <h2>Styling a BaseButton</h2>
      <PrimaryButton>Primary Button</PrimaryButton>
    </div>
  );
}

const FunctionStyledComponent = styled.div`
  height: 100px;
  width: 100px;
  background-color: ${(props) => (props.isActive ? "green" : "red")};
`;
function FunctionInStyledComponent() {
  const isActive = false;
  const itsActive = isActive ? "Active" : "Not Active";
  return (
    <div>
      <h2>Function in Styled Component</h2>
      <FunctionStyledComponent isActive={isActive}>
        {itsActive}
      </FunctionStyledComponent>
    </div>
  );
}

const ThemeButton = styled.button`
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.secondary};
`;
function ThemeBtn() {
  return (
    <div>
      <h2>A button using theme styling</h2>
      <ThemeButton>Styled Button</ThemeButton>
    </div>
  );
}

function Image() {
  return (
    <div>
      <h2>Image by Import</h2>
      <img src={Cat} alt="Cat" />
      <h2>Image by Referencing</h2>
      <img src={require("./assets/images/cat.jpg")} alt="Cat" />
    </div>
  );
}

function UseEffect1() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("Component Mounted");
  });
  function increment() {
    setCounter(counter + 1);
  }

  function decrement() {
    setCounter(counter - 1);
  }

  return (
    <div>
      <h2>useEffect Run Every Time Component is Rendered</h2>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
      <div>Counter: {counter}</div>
    </div>
  );
}

function UseEffect2() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  function onIncrementCounter() {
    setCounter(counter + 1);
  }

  function onDecrementCounter() {
    setCounter(counter - 1);
  }

  return (
    <div>
      <h2>useEffect Run Only the First Time Component is Rendered</h2>
      <button onClick={onDecrementCounter}>Decrement</button>
      <button onClick={onIncrementCounter}>Increment</button>
      <div>Counter: {counter}</div>
    </div>
  );
}

function UseEffect3() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("useEffect has run");
  }, [counter]); // Watching the `counter` variable

  function onIncrementCounter() {
    setCounter(counter + 1);
  }

  function onDecrementCounter() {
    setCounter(counter - 1);
  }

  console.log("Component has rendered");

  return (
    <div>
      <h2>useEffect Run Only When the Counter Changes</h2>
      <button onClick={onDecrementCounter}>-</button>
      <button onClick={onIncrementCounter}>+</button>

      <div>Counter: {counter}</div>
    </div>
  );
}

function UseEffectCleanUp() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Start the timer when the component mounts
    const timerId = setInterval(() => {
      // Update the counter
      setCounter((prevCounter) => prevCounter + 1);
      console.log("Counting");
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div>
      <div>Counter: {counter}</div>
    </div>
  );
}
function CallUseEffectCleanUp() {
  const [showComponent, setShowComponent] = useState(true);

  function onButtonClick() {
    setShowComponent(false);
  }

  // Render the component
  return (
    <div>
      <h2>Stop Counter With useState & Clean up</h2>

      {showComponent ? <UseEffectCleanUp /> : null}
      <button onClick={onButtonClick}>
        {showComponent ? "Stop Counting" : "Counting Stopped"}
      </button>
    </div>
  );
}

const initialState = { count: 0 };
function UseReducer(state, action) {
  // These are actions that can be dispatched
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    case "addAmount":
      return { count: state.count + action.payload };
    case "subtractAmount":
      return { count: state.count - action.payload };
    default:
      throw new Error();
  }
}
function CallUseReducer() {
  const [state, dispatch] = useReducer(UseReducer, initialState);
  return (
    <div>
      <h2>useReducer</h2>
      <div>Count: {state.count}</div>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "subtractAmount", payload: 10 })}>
        Subtract 10
      </button>
      <button onClick={() => dispatch({ type: "addAmount", payload: 10 })}>
        Add 10
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

const initialState2 = { cart: [], total: 0 };
const products = [
  {
    id: 0,
    title: "Milk",
    price: 19.99,
    discountedPrice: 19.99,
  },
  {
    id: 1,
    title: "Bread",
    price: 12.99,
    discountedPrice: 12.99,
  },
  {
    id: 2,
    title: "Cheese",
    price: 25.99,
    discountedPrice: 25.99,
  },
];
function UseReducerShoppingCart(state, action) {
  let productIndex;
  let newTotal;
  let cart;

  switch (action.type) {
    // Adding a product
    case "addProduct":
      // Create a new cart so we don't mutate our state
      cart = [...state.cart];
      // Get the product index
      productIndex = cart.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIndex === -1) {
        // If productIndex is -1, it doesn't exist so we add it
        cart.push({ ...action.payload, quantity: 1 });
      } else {
        // The product does exist so we increase the quantity
        // We do not want to mutate quantity so we are creating a new array with
        // quantity incremented.
        cart = [
          ...cart.slice(0, productIndex),
          { ...cart[productIndex], quantity: cart[productIndex].quantity + 1 },
          ...cart.slice(productIndex + 1),
        ];
      }
      // Set the new total so we don't have to keep calculating it
      newTotal = cart.reduce((currentTotal, product) => {
        currentTotal += product.discountedPrice * product.quantity;
        return currentTotal;
      }, 0);
      return { ...state, cart: cart, total: newTotal };

    // Removing a product
    case "removeProduct":
      cart = [...state.cart];
      // Get the product index
      productIndex = cart.findIndex(
        (product) => product.id === action.payload.id
      );
      // If the product index is not -1 then it exists
      if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
          // Remove 1 from quantity is quantity is higher than 1
          // We do not want to mutate cart so we recreate it
          cart = [
            ...cart.slice(0, productIndex),
            {
              ...cart[productIndex],
              quantity: cart[productIndex].quantity - 1,
            },
            ...cart.slice(productIndex + 1),
          ];
        } else {
          // Remove the item entirely if quantity is going to be 0
          cart = [
            ...cart.slice(0, productIndex),
            ...cart.slice(productIndex + 1),
          ];
        }
      }
      // Set the new total so we don't have to keep calculating it
      newTotal = cart.reduce((currentTotal, product) => {
        currentTotal += product.discountedPrice * product.quantity;
        return currentTotal;
      }, 0);
      return { ...state, cart: cart, total: newTotal };

    // Clearing a cart
    case "clearCart":
      return { cart: [], total: 0 };

    default:
      return state;
  }
}
function CallUseReducerShoppingCart() {
  const [state, dispatch] = useReducer(UseReducerShoppingCart, initialState2);
  return (
    <div>
      <h2>Shopping Cart with useReducer</h2>
      {products.map((product) => (
        <div key={product.id}>
          <button
            onClick={() => dispatch({ type: "addProduct", payload: product })}
          >
            Add {product.title}
          </button>
          <button
            onClick={() =>
              dispatch({ type: "removeProduct", payload: product })
            }
          >
            Remove {product.title}
          </button>
        </div>
      ))}
      <div>
        <hr />
        <button onClick={() => dispatch({ type: "clearCart" })}>
          Clear cart
        </button>
        <button onClick={() => dispatch({ type: "getTotal" })}>
          Get total
        </button>
      </div>
      <div>{state.total}</div>
      <hr />
      <div>
        {state.cart.map((product) => (
          <div key={product.id}>
            {product.quantity} - {product.title} - {product.discountedPrice}
          </div>
        ))}
      </div>
    </div>
  );
}

const ThemeContext = createContext();
function UseContext() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>
        <MyUseContextComponent />
      </div>
    </ThemeContext.Provider>
  );
}
function MyUseContextComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <div>The display mode is {theme}</div>
      <button onClick={toggleTheme}>Change theme</button>
    </div>
  );
}

const useProductsStore = create((set) => ({
  count: 0,
  addOne: () => set((state) => ({ count: state.count + 1 })),
  removeOne: () => set((state) => ({ count: state.count - 1 })),
  clearCount: () => set({ count: 0 }),
}));
function CallUseProductsStore() {
  const count = useProductsStore((state) => state.count);
  const addOne = useProductsStore((state) => state.addOne);
  const removeOne = useProductsStore((state) => state.removeOne);
  const clearCount = useProductsStore((state) => state.clearCount);

  return (
    <div>
      <h2>Using Zustand State Management</h2>
      <div>Count: {count}</div>
      <button onClick={removeOne}>Click me to remove</button>
      <button onClick={addOne}>Click me to add</button>
      <button onClick={clearCount}>Click me to clear</button>
    </div>
  );
}

const useProductsStore2 = create((set) => ({
  count: 0,
  addOne: () => set((state) => ({ count: state.count + 1 })),
  removeOne: () => set((state) => ({ count: state.count - 1 })),
  clearCount: () => set({ count: 0 }),
}));
function CallUseProductsStore2WithShallow() {
  const { count, addOne, removeOne, clearCount } = useProductsStore2(
    (state) => ({
      count: state.count,
      addOne: state.addOne,
      removeOne: state.removeOne,
      clearCount: state.clearCount,
    }),
    shallow
  );

  return (
    <div>
      <h2>Using Zustand State Management with Shallow</h2>
      <div>Count: {count}</div>
      <button onClick={removeOne}>Click me to remove</button>
      <button onClick={addOne}>Click me to add</button>
      <button onClick={clearCount}>Click me to clear</button>
    </div>
  );
}

function LinksWithinApp() {
  return (
    <div>
      <h2>Layout & Links within the App</h2>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
// Our header component that gets used in our <Layout> component
function Header() {
  return (
    <header>
      <div>Header with Logo and nav</div>
      <Nav />
    </header>
  );
}
// Our footer component that gets used in our <Layout> component
function Footer() {
  return <footer>Website footer</footer>;
}
function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/product/1">Product with ID: 1</Link>
        </li>
        <li>
          <Link to="/product/2">Product with ID: 2</Link>
        </li>
      </ul>
    </nav>
  );
}
function Home() {
  return <div>Home</div>;
}
function Products() {
  return <div>Products</div>;
}
function Product() {
  let params = useParams();
  console.log(params);
  // Logs the id of whichever product page you are on e.g.
  // {id: '1'} or {id: '2'}
  return <div>Individual product page: {params.id}</div>;
}
function RouteNotFound() {
  return <div>Page not found</div>;
}

const urlAPI = "https://jsonplaceholder.typicode.com/posts";
function FetchDataApi() {
  const [posts, setPosts] = useState([]);
  // State for holding our loading state
  const [isLoading, setIsLoading] = useState(false);
  // State for holding our error state
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        // Reset the error state in case there as an error previously
        setIsError(false);
        // Turn on the loading state each time we do an API call
        setIsLoading(true);
        const response = await fetch(urlAPI);
        const json = await response.json();
        setPosts(json);
        // Clear the loading state once we've successfully got our data
        setIsLoading(false);
      } catch (error) {
        // Clear the loading state if we get an error and then
        // set our error state to true
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, []);

  if (isLoading) {
    return <div>Loading posts</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const twoPosts = posts.slice(0, 2);
  return (
    <div>
      <h2>Fetching Data from an API</h2>
      {twoPosts.map((post) => (
        <div>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

function Post() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }, [id]);

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  console.log(data);

  return (
    <div>
      <div>userId: {data.userId}</div>
      <div>id: {data.id}</div>
      <div>title: {data.title}</div>
      <div>body: {data.body}</div>
    </div>
  );
}
function NewNav() {
  return (
    <div>
      <h2>Params To Route Fetch Single Item API</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post/1">Post with ID: 1</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
function ParamToRoute() {
  return (
    <div>
      <NewNav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="post/:id" element={<Post />} />
      </Routes>
    </div>
  );
}

function usePerson() {
  const [firstName, setFirstName] = useState("");

  function greetPerson() {
    console.log(`Hello ${firstName}`);
  }
  return { setFirstName, greetPerson };
}
function CallUsePerson() {
  const { greetPerson, setFirstName } = usePerson();
  useEffect(() => {
    setFirstName("Ola");
    greetPerson();
  }, [setFirstName, greetPerson]);

  return (
    <div>
      <h2>Create Own Hook</h2>
      <div>Check the console</div>
    </div>
  );
}

function useApi(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedData = await fetch(url);
        const json = await fetchedData.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url]);
  return { data, isLoading, isError };
}
function FetchDataApi2() {
  const { data, isLoading, isError } = useApi(
    "https://jsonplaceholder.typicode.com/todos"
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h2>Custom Hook Fetching Data from an API</h2>
      <div>Data loaded</div>
    </div>
  );
}

function ControlledForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");

  // This function is called when our form's `onSubmit` event
  // is called, which happens when you press the Submit button
  function onFormSubmit(event) {
    // We must call the `event.preventDefault()` method otherwise our page
    // will reload and we usually don't want that with a SPA
    event.preventDefault();
    // We can now use our states as a payload in an API call
    const body = {
      firstName,
      lastName,
      city,
    };

    // Basic fetch example
    fetch("http://www.example.com", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  function onFirstNameChange(event) {
    setFirstName(event.target.value);
  }
  function onLastNameChange(event) {
    setLastName(event.target.value);
  }
  function onCityChange(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <h2>Controlled Form</h2>
      <form onSubmit={onFormSubmit}>
        {/* Label added for 'first-name' */}
        <label htmlFor="first-name">First name</label>
        <input
          name="first-name"
          value={firstName}
          placeholder="Your first name"
          onChange={onFirstNameChange}
        />
        {/* Label added for 'last-name' */}
        <label htmlFor="last-name">Last name</label>
        <input
          name="last-name"
          value={lastName}
          placeholder="Your last name"
          onChange={onLastNameChange}
        />
        {/* Label added for 'city' */}
        <label htmlFor="city">City</label>
        <input
          name="city"
          value={city}
          placeholder="Your city"
          onChange={onCityChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

function ReactHookFormRegister() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div>
      <h2>React Hook Form - Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="First Name" {...register("firstName")} />
        <input placeholder="Last Name" {...register("lastName")} />
        <select {...register("role")}>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="admin">Admin</option>
          <option value="other">Other</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
}

function ReactHookFormValidate() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div>
      <h2>React Hook Form - Validate</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="First Name"
          {...register("firstName", {
            required: true,
            minLength: 3,
            maxLength: 30,
          })}
        />
        <input
          type="number"
          placeholder="Age"
          {...register("age", { required: true, min: 18, max: 200 })}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

function YupValidation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div>
      <h2>Yup Validation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="First Name" {...register("firstName")} />
        <p>{errors.firstName?.message}</p>
        <input placeholder="Age" {...register("age")} />
        <p>{errors.age?.message}</p>
        <input type="submit" />
      </form>
    </div>
  );
}
const schema = yup
  .object({
    firstName: yup
      .string()
      .min(3, "Your first name should be at least 3 characters.")
      .max(10, "Your first name cannot be longer than 10 characters.")
      .required("Please enter your first name"),
    age: yup
      .number()
      .min(18, "Your age must be 18 or higher")
      .max(100, "Your age must be 100 or lower")
      .typeError("Your age must be a number"),
  })
  .required();

// This is a parent component that uses ProductCard
function ProductList() {
  // A simple addToCart function that logs the index of the product being added
  function addToCart(productIndex) {
    console.log("Adding product to cart:", productIndex);
    // Here you would add logic to actually add the product to your cart state or context
  }

  return (
    <div>
      <ProductCard
        index={0}
        title="Milk"
        description="Fresh milk that was locally sourced."
        price={9.99}
        onAddToCartClick={addToCart}
      />
    </div>
  );
}

function App() {
  return (
    <div>
      <WithoutJSX />
      <br />
      <WithJSX />
      <br />
      <Component />
      <br />
      <Variables />
      <div>
        <h2>Component With Props</h2>
        <ul>
          <li>
            <Props title="Milk" price={29.99} />
          </li>
          <li>
            <Props title="Bread" price={9.99} />
          </li>
          <li>
            <Props title="Eggs" price={4.99} />
          </li>
        </ul>
      </div>
      <ButtonClick />
      <br />
      <BtnClickWithValues />
      <br />
      <br />
      <UseState />
      <br />
      <CountWithUseState />
      <br />
      <Map />
      <br />
      <ConditionalRendering />
      <br />
      <ShortCircuit />
      <br />
      <Styling />
      <br />
      <BtnModule />
      <br />
      <Sass />
      <br />
      <StyledComponent />
      <br />
      <StyledComponentWithProps />
      <br />
      <PrimaryBaseButton />
      <br />
      <FunctionInStyledComponent />
      <br />
      <ThemeBtn />
      <br />
      <Image />
      <br />
      <UseEffect1 />
      <br />
      <UseEffect2 />
      <br />
      <UseEffect3 />
      <br />
      <CallUseEffectCleanUp />
      <br />
      <CallUseReducer />
      <br />
      <CallUseReducerShoppingCart />
      <br />
      <UseContext />
      <br />
      <CallUseProductsStore />
      <br />
      <CallUseProductsStore2WithShallow />
      <br />
      <LinksWithinApp />
      <br />
      <FetchDataApi />
      <br />
      <ParamToRoute />
      <br />
      <CallUsePerson />
      <br />
      <FetchDataApi2 />
      <br />
      <ControlledForm />
      <br />
      <ReactHookFormRegister />
      <br />
      <ReactHookFormValidate />
      <br />
      <YupValidation />
      <br />
      <ProductList />
    </div>
  );
}

export default App;
