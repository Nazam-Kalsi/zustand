
import { useState } from "react";
import "./App.css";
import { useCounter } from "./store/counter";
import { useUser } from "./store/user";

function App() {
  
  const [val, setVal] = useState<string>('');
  const count = useCounter((state) => state.count);
  const increment = useCounter((state) => state.inc);
  const decrement = useCounter((state) => state.dec);
  const user = useUser((state) => state.user);
  // const isLogedIn = useUser.getState().getLogedInStatus();
  const isLogedIn = useUser(state => state.isLogedIn);
  const logIn = useUser(state => state.setLogin);
  const logout = useUser(state => state.setLogout);
  const updateUser = useUser(state => state.updateUser);
  
  return (
    <div className="flex justify-center min-h-screen gap-2">
      <pre  > {JSON.stringify(user, null, 2)} </pre>
      
      <div>
      <div className="flex items-center justify-center gap-2">
        <button className='border py-2 px-4 rounded-lg' onClick={decrement}>-</button>
        count is {count}
        <button className='border py-2 px-4 rounded-lg' onClick={increment}>+</button>
      </div>
      
      <p> Status: {isLogedIn.toString()} </p>
      <div className="space-x-4">        
      <button className="border px-4 py-2 rounded-md" onClick={logIn}>Login</button>
      <button className="border px-4 py-2 rounded-md" onClick={logout}>Logout</button>
        </div>
        <div>          
          <input className="border px-4 py-2 rounded-md" type='text' value={val} onChange={(e) => setVal(e.target.value)} />
          <button className="border px-4 py-2 rounded-md" onClick={() => updateUser((user) => {
            user.name.firstName=val
          })}>Update first name</button>
        </div>
        
      </div>
    </div>
  );
}

export default App;

