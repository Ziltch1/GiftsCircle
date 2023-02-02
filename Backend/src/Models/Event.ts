import Gift from "./Gift";
import User from "./User";

interface Event {
  id: String;
  title: String;
  category: String;
  venue: String;
  date: Date;
  time: Date;
  timezone: String;
  image: String;
  descCeleb: String;
  summary: String;
  descSummary: String;
  published: Boolean;
  applyDonation: Boolean;
  percentDonation: Number;
  owner: User;
  gifts: Gift[];
}

export default Event;