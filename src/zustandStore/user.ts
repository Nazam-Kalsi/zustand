import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { persist,createJSONStorage } from "zustand/middleware";
type UserT = {
  name: {
    firstName: string;
    lastName: string;
  };
  age: number;
  contact: {
    email: string;
    phone: {
      countryCode: string;
      number: string;
    };
  };
  address: {
    home: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
};

type Action = {
  updateUser: (updater: (user:UserT) => void) => void;
  setLogin: () => void;
  setLogout: () => void,
  // get function not subscribed to change, it is recomended to access the state variables
  // these are just to get the data getter are only useful outside React components or inside actions,  just to get eh value for processing
  getUser: () => UserT;
  getLogedInStatus: () => boolean
};

type State = {
  user: UserT;
  isLogedIn: boolean;
};

const initialState =  {
  user: {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    age: 28,
    contact: {
      email: "john.doe@example.com",
      phone: {
        countryCode: "+1",
        number: "1234567890",
      },
    },
    address: {
      home: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
      },
    },
    preferences: {
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
    },
  },
  isLogedIn: false,
}

const store = immer(
  combine(
    initialState,
    (set, get):Action => ({
      updateUser: (updater) =>
        set((state) => {
          updater(state.user);
          return state;
        }),
      getUser: () => get().user,
      setLogin: () =>
        set(() => {
          return { isLogedIn: true };
        }),
      setLogout: () => set(() => ({ isLogedIn: false })),
      getLogedInStatus: () => get().isLogedIn,
    }),
  ),
);

export const useUser = create<State & Action>()(
  persist(store, {
    name: 'user',
    storage: createJSONStorage(() => localStorage),    
  })
);
