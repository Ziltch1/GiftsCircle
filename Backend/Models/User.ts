
interface User {
  id: string;
  firstname: string;
  lastname: string;
  gender: string;
  placeOfResidence: string;
  tel: string;
  state: string;
  dob: string;
  email: string;
  password: string,
  Events: Event[];
}

export default User;
