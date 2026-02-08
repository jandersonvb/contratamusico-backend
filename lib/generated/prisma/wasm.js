
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.0.0
 * Query Engine version: 5dbef10bdbfb579e07d35cc85fb1518d357cb99e
 */
Prisma.prismaVersion = {
  client: "6.0.0",
  engine: "5dbef10bdbfb579e07d35cc85fb1518d357cb99e"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  passwordHash: 'passwordHash',
  firstName: 'firstName',
  lastName: 'lastName',
  phone: 'phone',
  city: 'city',
  state: 'state',
  userType: 'userType',
  role: 'role',
  profileImageKey: 'profileImageKey',
  resetToken: 'resetToken',
  resetTokenExpiry: 'resetTokenExpiry',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MusicianProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  category: 'category',
  bio: 'bio',
  location: 'location',
  priceFrom: 'priceFrom',
  experience: 'experience',
  equipment: 'equipment',
  availability: 'availability',
  rating: 'rating',
  ratingCount: 'ratingCount',
  eventsCount: 'eventsCount',
  satisfactionRate: 'satisfactionRate',
  responseTime: 'responseTime',
  isFeatured: 'isFeatured',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PortfolioItemScalarFieldEnum = {
  id: 'id',
  musicianProfileId: 'musicianProfileId',
  type: 'type',
  fileKey: 'fileKey',
  title: 'title',
  description: 'description',
  date: 'date',
  location: 'location',
  genre: 'genre',
  createdAt: 'createdAt'
};

exports.Prisma.GenreScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug'
};

exports.Prisma.InstrumentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug'
};

exports.Prisma.MusicianGenreScalarFieldEnum = {
  musicianProfileId: 'musicianProfileId',
  genreId: 'genreId'
};

exports.Prisma.MusicianInstrumentScalarFieldEnum = {
  musicianProfileId: 'musicianProfileId',
  instrumentId: 'instrumentId'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  musicianProfileId: 'musicianProfileId',
  clientId: 'clientId',
  rating: 'rating',
  content: 'content',
  date: 'date',
  event: 'event',
  createdAt: 'createdAt'
};

exports.Prisma.BookingScalarFieldEnum = {
  id: 'id',
  musicianProfileId: 'musicianProfileId',
  clientId: 'clientId',
  eventDate: 'eventDate',
  eventType: 'eventType',
  message: 'message',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PlanScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  monthlyPrice: 'monthlyPrice',
  yearlyPrice: 'yearlyPrice',
  badge: 'badge',
  isMusicianPlan: 'isMusicianPlan',
  isClientPlan: 'isClientPlan',
  maxPhotos: 'maxPhotos',
  maxVideos: 'maxVideos',
  hasSpotlight: 'hasSpotlight',
  hasStatistics: 'hasStatistics',
  hasWhatsapp: 'hasWhatsapp',
  createdAt: 'createdAt'
};

exports.Prisma.PlanFeatureScalarFieldEnum = {
  id: 'id',
  planId: 'planId',
  text: 'text',
  available: 'available',
  highlight: 'highlight'
};

exports.Prisma.FAQItemScalarFieldEnum = {
  id: 'id',
  question: 'question',
  answer: 'answer',
  category: 'category',
  createdAt: 'createdAt'
};

exports.Prisma.FavoriteScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  musicianProfileId: 'musicianProfileId',
  createdAt: 'createdAt'
};

exports.Prisma.ConversationScalarFieldEnum = {
  id: 'id',
  clientId: 'clientId',
  musicianProfileId: 'musicianProfileId',
  lastMessageAt: 'lastMessageAt',
  createdAt: 'createdAt'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  conversationId: 'conversationId',
  senderId: 'senderId',
  content: 'content',
  isRead: 'isRead',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationPreferenceScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  emailBookings: 'emailBookings',
  emailMessages: 'emailMessages',
  emailReviews: 'emailReviews',
  emailNews: 'emailNews',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubscriptionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  planId: 'planId',
  stripeSubscriptionId: 'stripeSubscriptionId',
  stripeCustomerId: 'stripeCustomerId',
  status: 'status',
  currentPeriodStart: 'currentPeriodStart',
  currentPeriodEnd: 'currentPeriodEnd',
  cancelAtPeriodEnd: 'cancelAtPeriodEnd',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentHistoryScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  amount: 'amount',
  currency: 'currency',
  status: 'status',
  stripePaymentId: 'stripePaymentId',
  description: 'description',
  createdAt: 'createdAt'
};

exports.Prisma.ContactMessageScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  phone: 'phone',
  subject: 'subject',
  message: 'message',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  email: 'email',
  passwordHash: 'passwordHash',
  firstName: 'firstName',
  lastName: 'lastName',
  phone: 'phone',
  city: 'city',
  state: 'state',
  profileImageKey: 'profileImageKey',
  resetToken: 'resetToken'
};

exports.Prisma.MusicianProfileOrderByRelevanceFieldEnum = {
  category: 'category',
  bio: 'bio',
  location: 'location',
  experience: 'experience',
  equipment: 'equipment',
  availability: 'availability',
  responseTime: 'responseTime'
};

exports.Prisma.PortfolioItemOrderByRelevanceFieldEnum = {
  fileKey: 'fileKey',
  title: 'title',
  description: 'description',
  date: 'date',
  location: 'location',
  genre: 'genre'
};

exports.Prisma.GenreOrderByRelevanceFieldEnum = {
  name: 'name',
  slug: 'slug'
};

exports.Prisma.InstrumentOrderByRelevanceFieldEnum = {
  name: 'name',
  slug: 'slug'
};

exports.Prisma.ReviewOrderByRelevanceFieldEnum = {
  content: 'content',
  date: 'date',
  event: 'event'
};

exports.Prisma.BookingOrderByRelevanceFieldEnum = {
  eventType: 'eventType',
  message: 'message',
  status: 'status'
};

exports.Prisma.PlanOrderByRelevanceFieldEnum = {
  title: 'title',
  description: 'description',
  badge: 'badge'
};

exports.Prisma.PlanFeatureOrderByRelevanceFieldEnum = {
  text: 'text'
};

exports.Prisma.FAQItemOrderByRelevanceFieldEnum = {
  question: 'question',
  answer: 'answer',
  category: 'category'
};

exports.Prisma.MessageOrderByRelevanceFieldEnum = {
  content: 'content'
};

exports.Prisma.SubscriptionOrderByRelevanceFieldEnum = {
  stripeSubscriptionId: 'stripeSubscriptionId',
  stripeCustomerId: 'stripeCustomerId',
  status: 'status'
};

exports.Prisma.PaymentHistoryOrderByRelevanceFieldEnum = {
  currency: 'currency',
  status: 'status',
  stripePaymentId: 'stripePaymentId',
  description: 'description'
};

exports.Prisma.ContactMessageOrderByRelevanceFieldEnum = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  phone: 'phone',
  subject: 'subject',
  message: 'message'
};
exports.UserType = exports.$Enums.UserType = {
  CLIENT: 'CLIENT',
  MUSICIAN: 'MUSICIAN'
};

exports.UserRole = exports.$Enums.UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.PortfolioItemType = exports.$Enums.PortfolioItemType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO'
};

exports.Prisma.ModelName = {
  User: 'User',
  MusicianProfile: 'MusicianProfile',
  PortfolioItem: 'PortfolioItem',
  Genre: 'Genre',
  Instrument: 'Instrument',
  MusicianGenre: 'MusicianGenre',
  MusicianInstrument: 'MusicianInstrument',
  Review: 'Review',
  Booking: 'Booking',
  Plan: 'Plan',
  PlanFeature: 'PlanFeature',
  FAQItem: 'FAQItem',
  Favorite: 'Favorite',
  Conversation: 'Conversation',
  Message: 'Message',
  NotificationPreference: 'NotificationPreference',
  Subscription: 'Subscription',
  PaymentHistory: 'PaymentHistory',
  ContactMessage: 'ContactMessage'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
