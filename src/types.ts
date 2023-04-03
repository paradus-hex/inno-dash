
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string
  profilePicture: string
  sex: 1
  position: string

};

export interface ProductType {
  id: number;
  name: string;
  description: string;
  picture: string;
  type: {
    id: number;
    name: string;
  };
  categories: {
    id: number;
    name: string;
  }[];
  implementationEffortText: string | null;
  investmentEffort: string;
  trl: {
    id: number;
    name: string;
  };
  video: string;
  user: User
  company: Company
  businessModels: {
    id: number;
    name: string
  }[]
}

export interface ProductState {
  isLoading: boolean;
  data: ProductType | null;
  isError: boolean;
  isFulfilled: boolean;
  trls: ProductType['trl'][]
}

export interface Company {
  name: string;
  logo: string;
  address: {
    country: {
      name: string;
    };
    city: {
      name: string;
    };
    street: string;
    house: string;
    zipCode: string;
    longitude: string;
    latitude: string;
  };
}