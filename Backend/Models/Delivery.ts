import User from "./User";

interface Delivery {
  id: String;
  address: String;
  city: String;
  state: String;
  orderDate: Date;
  country: String;
  expectedDate: Date;
  postalCode: String;
  tel: String;
  tel2: String;
  status: String;
  user: User;
}

export default Delivery;