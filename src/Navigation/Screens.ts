enum Screens {
  Blog = 'Blog',
  Gifts = 'Gifts',
  SingleGift = 'SingleGift',
  SingleBlog = 'SingleBlog',
  Profile = 'Profile',
  Login = 'Login',
  Register = 'Register',
  Recover = 'Recover',
  Exchange = 'Exchange',
  SingleExchange = 'SingleExchange',
  MyGiveAways = 'MyGiveAways',
  MyTakings = 'MyTakings',
  TabStack = 'TabStack',
  AddProduct = 'AddProduct',
  MyGiveAwayStack = 'MyGiveAwayStack',
  MyTakingsStack = 'MyTakingsStack',
  MyMessagesStack = 'MyMessagesStack',
  MyMessages = 'MyMessages',
  MyChat = 'MyChat',
  Settings = 'Settings'
  //   Catalog = 'Catalog',
  //   Login = 'Login',
  //   Support = 'Support',
  //   Wish = 'Wish',
  //   Cart = 'Cart',
  //   Otp = 'Otp',
  //   NoInternet = 'NoInternet',
  //   ThirdPartyAuth = 'ThirdPartyAuth',
  //   Profile = 'Profile',
  //   ProfileForm = 'ProfileForm',
  //   MyMachines = 'MyMachines',
  //   MyOrders = 'MyOrders',
  //   InviteFriends = 'InviteFriends',
  //   MyOrdersDetails = 'MyOrdersDetails',
  //   SingleProduct = 'SingleProduct',
  //   SelectCapsules = 'SelectCapsules',
  //   Summary = 'Summary',
  //   ScanType = 'ScanType',
  //   ScanSuccess = 'ScanSuccess',
  //   AddAddress = 'AddAddress',
  //   AddressList = 'AddressList',
  //   MyAddress = 'MyAddress',
  //   NewAddress = 'NewAddress',
  //   MyCards = 'MyCards',
  //   AddCard = 'AddCard',
  //   Forms = 'Forms',
  //   ContentScreen = 'ContentScreen',
  //   Membership = 'Membership',
  //   CheckoutSuccess = 'CheckoutSuccess',
  //   Notifications = 'Notifications',
  //   ServiceCallSuccess = 'ServiceCallSuccess',
}

export type NavigationParams = {
  [Screens.Blog]: undefined;
  [Screens.Gifts]: undefined;
  [Screens.SingleGift]: undefined;
  [Screens.SingleBlog]: undefined;
  [Screens.Profile]: undefined;
  [Screens.Login]: undefined;
  [Screens.Register]: undefined;
  [Screens.Recover]: undefined;
  [Screens.Exchange]: undefined;
  [Screens.SingleExchange]: undefined;
  [Screens.MyGiveAways]: undefined;
  [Screens.MyTakings]: undefined;
  [Screens.AddProduct]: undefined;
  [Screens.MyGiveAwayStack]: undefined;
  [Screens.MyTakingsStack]: undefined;
  [Screens.MyMessagesStack]: undefined;
  [Screens.MyMessages]: undefined;
  [Screens.MyChat]: undefined;
  [Screens.Settings]: undefined;
  [Screens.TabStack]: {name: string};
  //   [Screens.ScanType]: {type: 'GIFT' | 'MACHINE' | 'CARD'};
  //   [Screens.ServiceCallSuccess]: undefined;
  //   [Screens.Packages]: {isComeFromScanScreen: boolean} | undefined;
  //   [Screens.Catalog]: {category: string; productId?: string};
  //   [Screens.Notifications]: undefined;
  //   [Screens.ScanSuccess]: {
  //     machineName: string;
  //     machineImage: string;
  //     gift: boolean;
  //     machineAlreadyAdded: ScannedMachineStatus;
  //     scanBenefit: ScanBenefit | null;
  //     capsuleMethod: CapsuleMethod;
  //   };
  //   [Screens.Tabs]: undefined;
  //   [Screens.CreditCardScanner]: undefined;
  //   [Screens.Home]: {fromScanBenefit: boolean} | undefined;
  //   [Screens.Main]: undefined;
  //   [Screens.SignUp]: undefined;
  //   [Screens.Login]: undefined;
  //   [Screens.Support]: {code: number; machineSupport?: boolean};
  //   [Screens.Wish]: undefined;
  //   [Screens.Cart]:
  //     | {
  //         cartId?: string;
  //         packageId?: string;
  //         selectedProducts?: PackageProduct[] | CartProduct[];
  //       }
  //     | undefined;
  //   [Screens.Otp]: {
  //     newLetterConsent: boolean;
  //     termsOfUseConsent: boolean;
  //     fromSocial?: boolean;
  //   };

  //   [Screens.NoInternet]: undefined;
  //   [Screens.ContentScreen]: {content?: Content; screen: string};
  //   [Screens.ThirdPartyAuth]: undefined;
  //   [Screens.Profile]: undefined;
  //   [Screens.ProfileForm]: {checkout?: boolean} | undefined;
  //   [Screens.MyMachines]: undefined;
  //   [Screens.MyOrders]: undefined;
  //   [Screens.InviteFriends]: {useDiscount: boolean; inviteCode?: string};
  //   [Screens.MyOrdersDetails]: {
  //     progress?: number;
  //     orderDetails?: Orders;
  //     type: 'SUMMARY' | 'ORDERS';
  //     orderId?: string;
  //   };
  //   [Screens.SingleProduct]: {
  //     package: Package;
  //     isEdit?: boolean;
  //     cartId?: string;
  //   };
  //   [Screens.SelectCapsules]: {
  //     requiredAmount: number;
  //     packageItem: Package;
  //     isEdit?: boolean;
  //     cartId?: string;
  //     selectedProducts: {productId: string; quantity: number}[];
  //   };
  //   [Screens.Summary]: undefined;
  //   [Screens.AddAddress]: {
  //     editAddress: boolean;
  //     isCheckout?: boolean;
  //     initialFormValues: AddressFormFields;
  //   };
  //   [Screens.AddressList]: undefined;
  //   [Screens.MyAddress]: {isCheckout?: boolean} | undefined;
  //   [Screens.NewAddress]: {
  //     editAddress: boolean;
  //     isCheckout?: boolean;
  //     geoLocation?: {latitude: number; longitude: number};
  //   };
  //   [Screens.MyCards]: undefined;
  //   [Screens.AddCard]: {
  //     isCheckout?: boolean;
  //     cardNumber?: string;
  //     expiryMonth?: string;
  //     expiryYear?: string;
  //     holderName?: string;
  //   };
  //   [Screens.Forms]: undefined;
  //   [Screens.Membership]: undefined;
  //   [Screens.CheckoutSuccess]: {orderId: string};
};

export default Screens;
