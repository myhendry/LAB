### TODOS

- [ ] Framer Motion
- [ ] Supabase
  - [ ] Supabase Auth
  - [ ] Supabase CRUD
- [ ] Text Search
- [ ] Like Project
- [ ] Group ID search (Find in Array)
- [ ] Images
- [ ] Next-GraphQL
- [ ] SWR Infinite Pagination - Backend (Cursor-Based)
- [ ] SWR Infinite Pagination - Frontend (Cursor-Based)
- [ ] Next-Auth HOC
- [ ] Nextjs with Firebase
- [ ] Next-Auth Roles
- [ ] Admin
- [ ] React-Three-Fiber

- [ ] [Rust WASM](https://medium.com/@a7ul/using-rust-modules-for-javascript-web-development-part-i-e6dec27df7b2)
- [x] SWR Infinite Pagination - Backend (Offset-Based: Skip & Limit)
- [x] SWR Infinite Pagination - Frontend (Offset-Based)
- [x] Tailwind Width
- [x] Design Modal
- [x] Tailwind Table Formatting
- [x] Modal Delete
- [x] CreatePortal Modal
- [x] List Cascade Delete
- [x] List Sort Data
- [x] Nextjs with Mongoose
- [x] Solidity Deployment to Rinkeby
- [x] CRUD Comments
- [x] Cascade Delete Project & Comments
- [x] Tags
- [x] Change Git Remote
- [x] Formik Custom Field
- [x] GetStaticProps & GetStaticPath
- [x] Nextjs-Redux
- [x] Redux Typings
- [x] Formik Form CRUD Comments

- [ ] Docker
- [ ] Github Actions

[Vercel Next Examples](https://github.com/vercel/next.js/tree/canary/examples)

[How to build stunning 3D scenes with React Three Fiber](https://varun.ca/modular-webgl/) \

[LAB TODOS](#todos)

[GITHUB REFERENCE CODES](#github_reference_codes)

[VIM SHORTCUT](#vim)

[NEXTJS AND TAILWINDCSS](#tailwind)

[FORMIK AND TAILWINDCSS](#formik)

[ELECTRON AND TAILWINDCSS](#electron)

[MONGODB](#mongodb)

[SOLIDITY](#solidity)

[DATE-FNS](#date-fns)

[SOCKET](#socket)

[GLOB PATTERNS](#glob)

<a href="https://en.wikipedia.org/wiki/List_of_HTTP_status_codes" target="_blank">HTTP STATUS CODE</a>

[TERMINAL NPM, GIT & HEROKU](#terminal)

[MARKDOWN](#markdown)

[BETTER COMMENTS](#comments)

[WEBPACK AND BABEL](#webpack)

[BIT, BYTE, ASCII, EXTENDED ASCII, UNICODE](#bit)

[TYPESCRIPT](#typescript)

[TROUBLESHOOT](#troubleshoot)

### VIM

```
SHIFT + OPTION + <- OR ->

ciw // cut word

yiw // yank (copy) word

viwp // replace word under cursor

diw // delete word

y$ // copy all selected

p // paste

CTRL + CMD + SPACE // emojis

OPTION + CMD + F // Find and Replace Word
CMD + ENTER // Replace All Instances of Word
ENTER // Replace One Instance of Word

CMD + SPACE // Spotlight
CMD + TAB // Choose Apps
CMD + SHIFT + P
CMD + W   // Close Tab
CMD + K + W // Close All Opened Tabs

CMD + K + E     // Fold Explorer Tabs
CMD + SHIFT + E // Go to Explorer
CMD + SHIFT + O // List All Properties, Functions and Methods

OPTION + CMD + F  // Find and Replace in File
CMD + ENTER  // Replace All  OR ENTER // Replace One by One

TAB             // Github Copilot Accept Suggestion
CTRL + ENTER    // Github Copilot See Suggestions

w       // Move Word
e or E  // Move End of Word
b       // Move Back

Fold Selected     // Option + Cmd + [
Unfold Selected   // Option + Cmd + ]
Fold All          // Cmd + K, Cmd + 0
Unfold All        // Cmd + K Cmd + J

OPTION + 1 or 2 or 3... // to choose Opened Tab

CMD + O   // Go to Definition
CMD + I   // Navigate Back

```

### GITHUB REFERENCE CODES

[Twitter Clone Equimper](https://github.com/EQuimper/twitter-clone-with-graphql-reactnative) \
[BookIt Abbas](https://github.com/ghulamabbas2/bookit) \
[Youtube Clone John Anh](https://youtube.com/playlist?list=PL9a7QRYt5fqnxmxDMglzfv9v47IygFkDe) \
[Facebook Clone Socket.io Dev Lama](https://youtu.be/HggSXt1Hzfk) \
[Nextjs Page Transitions with Framer Motion](https://github.com/wrongakram/nextjs-page-transitions) \
[SWR with Pagination](https://github.com/Dey-Sumit/useSWR-Tutorial/tree/main) \
[Next-Auth Typescript](https://github.com/nextauthjs/next-auth-typescript-example)

### MONGODB

_Version 1_

```
import { MongoClientOptions } from "mongodb";
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as MongoClientOptions;

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).

  // todo global._mongoClientPromise
  //@ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    //@ts-ignore
    global._mongoClientPromise = client.connect();
  }
  //@ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise as Promise<MongoClient>;

```

_Version 2_

```
import mongoose, { ConnectOptions } from "mongoose";

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  mongoose
    .connect(
      process.env.MONGODB_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        ignoreUndefined: true,
      } as ConnectOptions
    )
    .then((res) => {
      console.log(
        "Connected to Distribution API Database - Initial Connection"
      );
    })
    .catch((err) => {
      console.log(
        `Initial Distribution API Database connection error occured -`,
        err
      );
    });
};

export default dbConnect;

```

### TAILWIND

[Setup Nextjs with Tailwindcss](https://tailwindcss.com/docs/guides/nextjs) \
[Official Tailwind UI Components](https://tailwindui.com) \
[Free Tailwind Components](https://dev.to/narottam04/free-tailwind-components-for-your-next-project-2gka)

[Meraki UI](https://merakiui.com) \

**Tailwind Intellisense not working**
[https://stackoverflow.com/questions/61343447/my-tailwind-css-intellisense-plugin-just-isnt-working-on-my-vscode]

CTRL + SHIFT + P to bring up the command palette

Search for "Output: Focus on Output View"

In the Output View, search for tailwindcss-intellisense

### TYPESCRIPT

[YouTube No BS Typescript](https://youtu.be/ixCxoFAoOps) \
[Github No BS Typescript](https://github.com/jherr/no-bs-ts)
[https://blog.logrocket.com/how-to-use-react-context-with-typescript/]

(#4)

// Object use interface
// Function use type

### Interfaces vs Types

The current answers and the official documentation are outdated. And for those new to TypeScript, the terminology used isn't clear without examples. Below is a list of up-to-date differences.

1. Objects / Functions
   Both can be used to describe the shape of an object or a function signature. But the syntax differs.

Interface

```
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}
Type alias

type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;
```

2. Other Types
   Unlike an interface, the type alias can also be used for other types such as primitives, unions, and tuples.

```
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];
```

3. Extend
   Both can be extended, but again, the syntax differs. Additionally, note that an interface and type alias are not mutually exclusive. An interface can extend a type alias, and vice versa.

Interface extends interface
[https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript]

```
interface PartialPointX { x: number; }
interface Point extends PartialPointX { y: number; }
Type alias extends type alias

type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };
Interface extends type alias

type PartialPointX = { x: number; };
interface Point extends PartialPointX { y: number; }
Type alias extends interface

interface PartialPointX { x: number; }
type Point = PartialPointX & { y: number; };
```

4. Implements
   A class can implement an interface or type alias, both in the same exact way. Note however that a class and interface are considered static blueprints. Therefore, they can not implement / extend a type alias that names a union type.

```
interface Point {
  x: number;
  y: number;
}

class SomePoint implements Point {
  x = 1;
  y = 2;
}

type Point2 = {
  x: number;
  y: number;
};

class SomePoint2 implements Point2 {
  x = 1;
  y = 2;
}

type PartialPoint = { x: number; } | { y: number; };

// FIXME: can not implement a union type
class SomePartialPoint implements PartialPoint {
  x = 1;
  y = 2;
}
```

5. Declaration merging
   Unlike a type alias, an interface can be defined multiple times, and will be treated as a single interface (with members of all declarations being merged).

```
// These two declarations become:
// interface Point { x: number; y: number; }
interface Point { x: number; }
interface Point { y: number; }

const point: Point = { x: 1, y: 2 };
```

#### TS Primitive Types

    string
    number
    boolean
    object: { x: string, y: number }
    array: number[]

    enum
    any
    null
    undefined
    unknown
    optional: (x?: number) => void
    union: number | string
    symbol
    bigint

#### Function

```
  enum Level {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
  }

  export function arrayMutate(numbers: number[], mutate: (v: number) => number, , level: Level, name: string, repeat: boolean): number { }

  const arrayMutate = (numbers: number[], mutate: (v: number) => number, , level: Level, name: string, repeat: boolean): number => { }
```

#### Function return Function

```
  type MutationFunction = (v: number) => number;

  const createAdder = (num: number): MutationFunction => {
    return (val: number) => num + val;
  }

  const addOne = createAdder(1);
  console.log(addOne(50));           // Returns 56
```

#### Function Overloading

```
  interface Coordinate {
  x: number;
  y: number;
}

function parseCoordinate(str: string): Coordinate;
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === "string") {
    (arg1 as string).split(",").forEach((str) => {
      const [key, value] = str.split(":");
      coord[key as "x" | "y"] = parseInt(value, 10);
    });
  } else if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as Coordinate),
    };
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}

console.log(parseCoordinate(10, 20));
console.log(parseCoordinate({ x: 52, y: 35 }));
console.log(parseCoordinate("x:12,y:22"));
```

### OPTIONALS IN TYPESCRIPT

```
function printIngredient(quantity: string, ingredient: string, extra?: string) {
  console.log(`${quantity} ${ingredient} ${extra ? ` ${extra}` : ""}`);
}

printIngredient("1C", "Flour");
printIngredient("1C", "Sugar", "something more");

interface User {
  id: string;
  info?: {
    email?: string;
  };
}

function getEmail(user: User): string {
  if (user.info) {
    return user.info.email!;
  }
  return "";
}

function getEmailEasy(user: User): string {
  return user?.info?.email ?? "";
}

function addWithCallback(x: number, y: number, callback?: () => void) {
  console.log([x, y]);
  callback?.();
}

```

### TUPLES

// Tuples can be different type. Arrays are of the same type

```
type ThreeDCoordinate = [x: number, y: number, z: number];

function add3DCoordinate(
  c1: ThreeDCoordinate,
  c2: ThreeDCoordinate
): ThreeDCoordinate {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]];
}

console.log(add3DCoordinate([0, 100, 0], [10, 20, 30]));

function simpleStringState(
  initial: string
): [() => string, (v: string) => void] {
  let str: string = initial;
  return [
    () => str,
    (v: string) => {
      str = v;
    },
  ];
}

const [str1getter, str1setter] = simpleStringState("hello");
const [str2getter, str2setter] = simpleStringState("jack");
console.log(str2getter());
console.log(str1getter());
str1setter("goodbye");
console.log(str1getter());
console.log(str2getter());
```

### FORMIK

[Tailwind Labs Youtube Videos](https://www.youtube.com/watch?v=pONeWAzDsQg&ab_channel=TailwindLabs)

[Demo Tailwind Form](https://tailwindcss-custom-forms.netlify.app/)

```
import useSWR, { trigger } from "swr";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  FieldArray,
  FormikProps,
  FieldHookConfig,
} from "formik";
import * as Yup from "yup";

import Layout from "../components/Layout";

type Pet = {
  nickname: string;
  type: string;
};

interface MyFormValues {
  name: string;
  password: string;
  email: string;
  country: string;
  description: string;
  categories: string[];
  preference: string;
  district: number | null;
  brand: string;
  age: number;
  isTop: boolean;
  dateTop: string;
  risk: "";
  pets: Pet[];
}

interface OtherProps {
  label: string;
}

const MyCustomInput = (props: OtherProps & FieldHookConfig<string>) => {
  const [field] = useField(props);
  return (
    <div className="my-2">
      <label>{props.label}</label>
      <br />
      <input
        {...field}
        className="ml-3"
        type={props.type}
        placeholder={props.placeholder}
      />
      <ErrorMessage
        name={props.name}
        component="div"
        className="text-red-700"
      />
    </div>
  );
};

const DemoForm = () => {
  const initialValues: MyFormValues = {
    name: "",
    password: "",
    country: "",
    email: "",
    description: "",
    categories: [],
    preference: "",
    brand: "",
    age: 0,
    risk: "",
    district: null,
    isTop: false,
    dateTop: "",
    pets: [
      {
        nickname: "",
        type: "cat",
      },
    ],
  };
  return (
    <Layout>
      <h1>Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Project Name is required")
            .min(2, "Minimum 2 characters needed"),
          country: Yup.string().required().min(2),
          age: Yup.number().required().min(0).max(10),
          pets: Yup.array().of(
            Yup.object({
              nickname: Yup.string().required("Pet needs a nickname"),
            })
          ),
          isTop: Yup.boolean().oneOf([true]),
          //todo: risk validation not working
          risk: Yup.array(Yup.string().oneOf(["High", "Medium", "Low"])).min(1),
        })}
        onSubmit={async (
          values,
          { setSubmitting, resetForm, setFieldError }
        ) => {
          setSubmitting(true);
          console.log(values);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          isValidating,
          errors,
          values,
        }: FormikProps<MyFormValues>) => (
          <Form>
            <div>
              <Field name="name" type="text" placeholder="Name" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="mt-2">
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                cols="40"
              />
            </div>
            <MyCustomInput
              name="country"
              type="text"
              label="Country"
              placeholder="Country"
            />
            <div className="mt-1 mb-2">
              <Field name="email" type="email" />
            </div>
            <div>
              <Field name="password" type="password" />
            </div>
            <div className="my-2">
              <Field name="dateTop" type="date" />
            </div>
            <div>
              <Field name="age" type="number" />
              <ErrorMessage
                name="age"
                component="div"
                className="text-red-700"
              />
            </div>
            <div>
              <Field name="isTop" type="checkbox" />
              <label className="mx-2">TOP</label>
              <ErrorMessage
                name="isTop"
                component="div"
                className="text-red-700"
              />
            </div>
            <div>
              <Field
                name="risk"
                value="High"
                type="checkbox"
                className="mr-2"
              />
              <Field
                name="risk"
                value="Medium"
                type="checkbox"
                className="mr-2"
              />
              <Field name="risk" value="Low" type="checkbox" className="mr-2" />
              <label className="mx-2">Risk</label>
              <ErrorMessage
                name="risk"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="my-2">
              <Field as="select" name="brand">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </Field>
            </div>
            <div>
              <Field name="categories" type="checkbox" value="soccer" />
              <label className="mx-2">Soccer</label>
              <Field name="categories" type="checkbox" value="tennis" />
              <label className="mx-2">Tennis</label>
              <Field name="categories" type="checkbox" value="rugby" />
              <label className="mx-2">Rugby</label>
            </div>
            <div>
              <Field name="preference" type="radio" value="very high" />
              <label className="mx-2">Very High</label>
              <Field name="preference" type="radio" value="high" />
              <label className="mx-2">High</label>
              <Field name="preference" type="radio" value="average" />
              <label className="mx-2">Average</label>
            </div>
            <div className="my-2">
              <FieldArray name="pets">
                {(arrayHelpers) => (
                  <div>
                    <h1>FieldArray</h1>
                    <button
                      onClick={() =>
                        arrayHelpers.push({
                          nickname: "",
                          type: "frog",
                        })
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
                    >
                      Add Pet
                    </button>
                    {values.pets.map((pet: Pet, index: number) => {
                      return (
                        <div key={index}>
                          <Field
                            type="text"
                            placeholder="Nickname"
                            name={`pets.${index}.nickname`}
                          />
                          <ErrorMessage
                            name={`pets.${index}.nickname`}
                            component="div"
                            className="text-red-700"
                          />
                          <Field as="select" name={`pets.${index}.type`}>
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="frog">Frog</option>
                          </Field>
                          <button
                            onClick={() =>
                              arrayHelpers.push({
                                nickname: "",
                                type: "frog",
                              })
                            }
                            className="ml-3 text-2xl"
                          >
                            +
                          </button>
                          <button
                            onClick={() => arrayHelpers.remove(index)}
                            className="ml-3"
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="submit"
              disabled={isSubmitting || isValidating}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default DemoForm;

```

### DATE FNS

```
       import { formatDistanceToNow } from "date-fns";

       <span className="text-xs text-gray-400 block">
          {formatDistanceToNow(new Date(video.createdAt!), {
            addSuffix: true,
          })}
        </span>
```

### ELECTRON

[Electron React Boilerplate](https://github.com/amilajack/erb-tailwind-example)

[Github Udemy Brad Traversy - Electron from Scratch](https://github.com/bradtraversy/electron-course-files)

### SOLIDITY

```
// SPDX-License-Identifier: GPL-3.0;    // OR
// SPDX-License-Identifier: MIT;

pragma solidity ^0.8.7;                 // OR
pragma solidity >= 0.8.0 <= 0.9.0;

contract Token {

    /*
     access classifiers:
        public - all can access
        external - Cannot be accessed internally, only externally
        internal - only this contract and contracts deriving from it can access
        private - can be accessed only from this contract
    */

    string private name = "H Token";    // data type | visibility | variable name
    uint public quantity = 800;           // need to use semicolon to close the expression
    uint256 totalSupply = 100000;       // use CamelCasing
    bool public show = true;
    address public minter;
    mapping(address => uint) public balances;

    // array - pop, push, length
    uint32[] public myArray;                    // Variable Size Array
    uint[3] public myFixedArray = [1, 2, 3];    // Fixed Size Array

    function push(uint number) public {
        myArray.push(number);
    }

    function remove(uint i) public {
        delete myArray[i];
    }               // delete does not change the length of the array, it only sets the item at that position to 0

    // Abstract contract - contains at least one function without any implementation. Such a contract is used as a base contract. Derived contract will implement the abstract function and use the existing functions as and when required

     // Approach 1 - using abstract contract
     // abstract - base
     // Parse Error: Function, Variable, Struct or Modifier declaration expected
     abstract contract XX {
         // since the function has no implementation, we should mark it as virtual
         function y() public view virtual returns(string memory);
     }

     // derive
     contract ZZ is XX {
         function y() public override view returns(string memory) {
             return 'Hello';
        }
    }

     // Approach 2 - using abstract contract
     // abstract - base
     contract W {
         // since the function has no implementation, we should mark it as virtual
         function y() public view virtual returns(string memory) {};
     }

     // derive
     contract U is W {
         function y() public override view returns(string memory) {
             return 'Hello';
        }
    }


    event Sent(address from, address to, uint amount); // to emit - only event does not have visibility

    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);

        balance[receiver] += amount;
    }

    function send(address receiver, uint amount) public {
        require(msg.sender == minter);

        balance[msg.sender] -= amount;

        balance[receiver] += amount;

        emit Sent(msg.sender, receiver, amount);
     }

    /*
        multi line comment
    */

    // Solidity Keywords
    variable (string, integer, boolean, address, mapping, array), function, abstract, variable
    visibility modifier: public, private, internal, external
    returns
    view
    modifier
    require(msg.sender == owner);
    msg.sender
    abstract
    virtual & override


    constructor() {
        // special function that gets called immediately upon deployment

        minter = msg.sender;
        balances[msg.sender] = 10000;
    }
}

truffle init

truffle(ganache)> Ctrl+C or Ctrl+D or .exit

truffle test

truffle compile

truffle deploy --reset

truffle migrate --reset

web3.eth.getAccounts().then(function(a){ accounts = a ;})

const accounts = await web3.eth.getAccounts()

accounts

k = await KryptoBird.deployed()
k.name()
k.symbol()

truffle(development)> todoList.taskCount()
<BN: 0>
truffle(development)> taskCount = await todoList.taskCount()
undefined
truffle(development)> taskCount.toNumber()
0


```

## MultiSig Wallet

[Youtube Code MultiSig Wallet](https://youtu.be/8ja72g_Dac4) \
[Github Spencer MultiSig Wallet Full Stack](https://github.com/SpencerMiller23/Ethereum-MultiSigWallet/blob/main/contracts/MultiSigWallet.sol) \

SOLIDITY FAQ & TROUBLESHOOT

**Remix compilation fails with Source file requires different compiler version**
// Make sure your pragma solidity ^0.8.7; is correct

**compilerMetadata is modifying/artifacts/NAME_OF_CONTRACT.json**
// Go to Setting in the bottom of the page General settings and uncheck 'Generate contract metadata.'

**TypeError: soljson.Pointer_stringify is not a function**
rm -rf node_modules
npm i

**Decomposing a BigNumber in Truffle Console**
(https://www.preciouschicken.com/blog/posts/decomposing-a-bignumber-in-truffle-console/)

### SOCKET

```
## Socket.io
[Chat App using Socket.io](https://github.com/safak/youtube/tree/chat-app)

socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.
```

<img src="https://github.com/myhendry/code/blob/main/images/socket_server.jpeg" width=50% height=50%>
<img src="https://github.com/myhendry/code/blob/main/images/socket_client.jpeg" width=50% height=50%>

### GLOB

```
/welcome* : anything in THIS folder or URL section, that starts with "/welcome" and ends before next "/" like /welcomePage.

/welcome** : any URL, that starts with "/welcome" including sub-folders and sub-sections of URL pattern like /welcome/section2/section3/ or /welcomePage/index.

/welcome/* : any file, folder or section inside welcome (before next "/") like /welcome/index.

/welcome/** : any files, folders, sections, sub-folders or sub-sections inside welcome.

In other words one asterisk * ends before next "/", two asterisks ** have no limits.
```

### TERMINAL

```
lsof -i:8080
kill -9 <PID 30268>

npm i <package>
npm i -D <package>
npm uninstall <package>
npm outdate // update packages

git add .
git commit -m 'i am a message'
git push

git log --oneline // can also be used to determine version pushed

git checkout <xxx>
git checkout main

git revert <xxx>
SHIFT + :; wq; ENTER

git reset <xxx> // preserve working files

git reset <xxx> --hard // remove working files

git checkout -f <xxx>
git commit -a
git push

git checkout -b <branch> // shortcut. create new branch and checkout to new branch

git branch <branch> // see above for shortcut
git branch -d <branch> // see above for shortcut

On MAIN, git merge <branch>

Manual Edit
git add .
git commit // No need for message

heroku login
heroku create <name>
git push heroku main

// using git pull

git pull

Please enter a commit message to explain why this merge is necessary, especially if it merges an updated upstream into a topic branch

press "i" (i for insert)
write your merge message
press "esc" (escape)
write ":wq" (write & quit)
then press enter

git push

// RENAME GITHUB REPOSITORY

rename github repo

git remote set-url origin  // Update git remote

// MULTIPLE GIT REPO

git remote add <id> <url.git>
git push <id>

git push --set-upstream origin <branch>

# COLLABORATION

git clone <repo> <name>
git remote -v
git pull origin main
git checkout -b <new_branch_name>
--add content--
git add .
git commit -m '<message>'
git push <new_branch_name>
--go to github page--
Click on button 'Compare and Pull Request'
Enter Message and Click on button 'Create Pull Request'
If No Conflicts, can Click on 'Merge Request'
Can 'Delete Branch' After Merge


// RENAME FILE AND DIRECTORY

mv new_name old_name            // Rename Directory
mv file_name ~/Desktop          // Move a File to New Location
mv -R directory_name ~/Desktop  // Move a Directory to New Location

mv -T /home/user/oldname /home/user/newname
That will rename the directory if the destination doesn't exist or if it exists but it's empty. Otherwise it will give you an error.

If you do this instead:

mv /home/user/oldname /home/user/newname
One of two things will happen:

If /home/user/newname doesn't exist, it will rename /home/user/oldname to /home/user/newname
If /home/user/newname exists, it will move /home/user/oldname into /home/user/newname, i.e. /home/user/newname/oldname

// EXPO

Warning: Invalid version react-native@0.64.2 for expo sdkVersion 43.0.0. Use react-native@0.64.3

expo doctor                       // OR
npx react-native upgrade 0.64.3
```

### MARKDOWN

```
// Headers

# This is an <h1> tag
## This is an <h2> tag
###### This is an <h6> tag

// Emphasis

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_

// Code Snippet
```

```

// Lists
//  Unordered

* Item 1
* Item 2
  * Item 2a
  * Item 2b

// Ordered

1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b

// Images

![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)

// External Links

http://github.com - automatic!
[GitHub](http://github.com)

// Blockquotes

As Kanye West said:

> We're living the future so
> the present is our past.

// Inline Code

I think you should use an
`<addr>` element here instead.

// Tables

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column

// Internal Links
```

Github automatically parses anchor tags out of your headers. So you can do the following:

[Custom foo description](#foo)

# Foo

In the above case, the Foo header has generated an anchor tag with the name foo

Note: just one # for all heading sizes, no space between # and anchor name, anchor tag names must be lowercase, and delimited by dashes if multi-word.

[click on this link](#my-multi-word-header)

### My Multi Word Header

Drop all the punctuation marks and replace the spaces with hyphens. This works for Github but with some other markdown editors like for example at hashnode.com, you have to replace the punctuation marks with hyphens.

```
[app.js](#appjs-file)
[script.js](#scriptjs-file)
[One, two, three](#one-two-three)

# app.js File
Some text

# script.js File
Some text

# One, two, three
Some text
```

### COMMENTS

```
//*     Important
//!     Deprecated
//?    Question
//TODO    Todo
//@params    Parameters
```

### WEBPACK

[Learn Webpack and Babel](https://youtu.be/MpGLUVbqoYQ) \
[Github - Webpack Demp App](https://github.com/Colt/webpack-demo-app) \

test: /\.css$/. is using Regex

Use order in webpack.config.js is important eg use: ["style-loader", "css-loader"]

in above example, css-loader will be run first followed by style-loader

css-loader -> translate css to js

style-loader -> inject js into html <script> tag

[CSS vs SCSS vs SASS](https://www.educba.com/sass-vs-scss/)

SASS is Syntactically Awesome Style Sheets and is an extension of CSS, which provides the features of nested rules, inheritance, Mixins, whereas SCSS is Sassy Cascaded Style Sheets which is similar to that of CSS and fills the gaps and incompatibilities between CSS and SASS. It was licensed under the MIT license.

```
// Inside webpack.config.js

 const path = require("path");
 const common = require("webpack.common");
 const merge = require("webpack-merge");
 const HtmlWebpackPlugin = require("html-webpack-plugin");
 const CleanWebPackPlugin = require("clean-webpack-plugin");
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpage-plugin");
 const TerserPlugin = require("terser-webpack-plugin");
 // need to install relevant needed dependencies package


 module.exports = (merge(common, {
  mode: "development",
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js"
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
  },
  output: {
    filename: "main.[contentHash].js",    // create content hash using md5 such that filename is main.jjoijfoasdfaf.js...
    path: path.resolve(__dirname, "dist") // this is to prevent caching by the browser. to generate new html whose script is linked...
  },                                      // use webpack plugin to generate new html
  plugins: [new HtmlWebpackPlugin({
    template: "./src/template.html"
  }),
  MiniCssExtractPlugin(
  {
    filename: "[name].[contentHash].css"
  }
  ),
  new CleanWebpackPlugin()
  ],                                    // Add Plugins
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [                            // Add Loaders in webpack.dev.js
          "style-loader",   // 3. Inject styles into DOM
          "css-loader",     // 2. Turns css into commmonjs
          "sass-loader"     // 1. Turns sass into css
        ]
      },
      {
        test: /\.scss$/,
        use: [                            // Add Loaders in webpack.prod.js
          MiniCssExtractPlugin.loader,   // 3. Inject styles into DOM
          "css-loader",     // 2. Turns css into commmonjs
          "sass-loader"     // 1. Turns sass into css
        ]
      },
      {
         test: /\.html$/,
         use: ["html-loader"]
      },
      {
         test:/\/(svg|png|jpg|gif)$/,
         use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"
          },
      },
    ]
  }
 })

// Using Bootstrap SCSS
// Inside main.scss

 $primary: teal;  // to customize bootstrap color
 $danger: purple;
 @import "~bootstrap/scss/bootstrap";

 can also merge the webpack config files using webpack-merge

```

### BIT

### BIT, BYTE, ASCII, EXTENDED ASCII, UNICODE

[Explainer Video on Bit, Byte, Ascii, Extended Ascii and Unicode](https://www.youtube.com/watch?v=5aJKKgSEUnY&ab_channel=TheTechTrain)

<img src="https://github.com/myhendry/code/blob/main/images/bits.jpg" width=50% height=50%>
  
### TROUBLESHOOT

---

**Property 'ul' does not exist on type 'JSX.IntrinsicElements'**

```
rm -rf node_modules

npm i
```

---

**Type '{ useUnifiedTopology: boolean; useNewUrlParser: boolean; }' has no properties in common with type 'MongoClientOptions'.ts(2559)**

```
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as MongoClientOptions
```

---

**Property '\_mongoClientPromise' does not exist on type 'false'.**

```
if ((!global as any)._mongoClientPromise) {
```

# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).

**JSON Web Token (JWT) benefits over a database session token**

The main difference is the session storage size and lookup work required from the server:

On the server side, JWT stores a single key in memory (or in config file) - called secret key. That key has two purposes, it enables creating new encrypted tokens and it also functions like a master key that "opens all locks", in practice it verifies all tokens. As a result the server responds much faster to auth requests, because it doesn't matter if you have two or two million users logged in - the same number of records (one, that server key) will be used to authenticate all client requests.

Traditional authentication that stores user sessions in a database, creates a record in the db for every single user, which results in multiple keys. So if you have two million users logged in, the server will create two million records and with each client request the server needs to locate the relevant session record in the database\*.

JWT leaves it up to the client side to store and handle the entire session/user object. It actually makes much more sense because every client handles their own data only, so it doesn't cause heavy lifting for the client side either.

As for what you wrote in your last paragraph, it's not just db calls that we save here. JWT is actually much more scalable because of its independent and lightweight nature, it doesn't fail as auth requests pile up and it allows the server to handle auth accross devices and services without managing sessions on the server side.

Security wise though, db sessions arguably have the upper hand: they can be more secure because of that latency, and are also less vulnerable to session hijacking after user logout.

\*The db stored sessions method can be optimized with effective caching and by storing only the session id (as opposed to the entire user object) in a fast key/value server such as Redis. That said, I would still choose JWT method over db for most cases.
