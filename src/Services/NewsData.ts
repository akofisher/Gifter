export interface ProductDataInterface {
  id: string | number;
  category: string;
  category_id: string | number;
  title: string;
  description: string;
  owner: string;
  ownerNumber: string | number;
  giftOrExchange: number,
  giftedOrExchanged: number,
  images: string[];
}
export interface BlogDataInterface {
  id: number;
  title: string;
  description: string;
  date: string;
  images: string[];
}
export interface UserDataInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  avatar?: { url?: string };
  stats?: {
    giving: number;
    exchanging: number;
    exchanged: number;
    given: number;
  };
  createdAt: string;
  updatedAt: string;
};


export interface CategoryInterface {
  id: string | number,
  name: string 
}
export interface Chats {
chat_id: string |number;
user_id: string |number;
guestUser_id: string |number;
guest_firstName: string,
guest_lastName: string,
guest_image: string,
}
export interface Messages {
id: string |number;
message_id: string | number;
message: string;
sent_in: string | number;
seen_at: string |number;
}
