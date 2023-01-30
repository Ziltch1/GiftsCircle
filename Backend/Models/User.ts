import Gift from "./Gift";

interface User {
  id: String;
  firstname: String;
  lastname: String;
  gender: String;
  placeOfResidence: String;
  tel: String;
  state: String;
  dob: String;
  email: String;
  Events: Event[];
}

export default User;
