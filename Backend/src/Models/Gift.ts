import Event from "./Event";
import GiftItem from "./GiftItem";
import User from "./User";

interface Gift {
  id: String;
  gift: GiftItem;
  enableContribution: Boolean;
  purchased: Boolean;
  quantity: Number;
  purchasedBy: User;
  status: String;
  complimentaryGift: String;
  amountPaid: Number;
  event: Event;
}

export default Gift;
