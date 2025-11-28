
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model MusicianProfile
 * 
 */
export type MusicianProfile = $Result.DefaultSelection<Prisma.$MusicianProfilePayload>
/**
 * Model PortfolioItem
 * 
 */
export type PortfolioItem = $Result.DefaultSelection<Prisma.$PortfolioItemPayload>
/**
 * Model Genre
 * 
 */
export type Genre = $Result.DefaultSelection<Prisma.$GenrePayload>
/**
 * Model Instrument
 * 
 */
export type Instrument = $Result.DefaultSelection<Prisma.$InstrumentPayload>
/**
 * Model MusicianGenre
 * 
 */
export type MusicianGenre = $Result.DefaultSelection<Prisma.$MusicianGenrePayload>
/**
 * Model MusicianInstrument
 * 
 */
export type MusicianInstrument = $Result.DefaultSelection<Prisma.$MusicianInstrumentPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>
/**
 * Model Plan
 * 
 */
export type Plan = $Result.DefaultSelection<Prisma.$PlanPayload>
/**
 * Model PlanFeature
 * 
 */
export type PlanFeature = $Result.DefaultSelection<Prisma.$PlanFeaturePayload>
/**
 * Model FAQItem
 * 
 */
export type FAQItem = $Result.DefaultSelection<Prisma.$FAQItemPayload>
/**
 * Model ContactMessage
 * 
 */
export type ContactMessage = $Result.DefaultSelection<Prisma.$ContactMessagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserType: {
  CLIENT: 'CLIENT',
  MUSICIAN: 'MUSICIAN'
};

export type UserType = (typeof UserType)[keyof typeof UserType]


export const PortfolioItemType: {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO'
};

export type PortfolioItemType = (typeof PortfolioItemType)[keyof typeof PortfolioItemType]

}

export type UserType = $Enums.UserType

export const UserType: typeof $Enums.UserType

export type PortfolioItemType = $Enums.PortfolioItemType

export const PortfolioItemType: typeof $Enums.PortfolioItemType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.musicianProfile`: Exposes CRUD operations for the **MusicianProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MusicianProfiles
    * const musicianProfiles = await prisma.musicianProfile.findMany()
    * ```
    */
  get musicianProfile(): Prisma.MusicianProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portfolioItem`: Exposes CRUD operations for the **PortfolioItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PortfolioItems
    * const portfolioItems = await prisma.portfolioItem.findMany()
    * ```
    */
  get portfolioItem(): Prisma.PortfolioItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.genre`: Exposes CRUD operations for the **Genre** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Genres
    * const genres = await prisma.genre.findMany()
    * ```
    */
  get genre(): Prisma.GenreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.instrument`: Exposes CRUD operations for the **Instrument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Instruments
    * const instruments = await prisma.instrument.findMany()
    * ```
    */
  get instrument(): Prisma.InstrumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.musicianGenre`: Exposes CRUD operations for the **MusicianGenre** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MusicianGenres
    * const musicianGenres = await prisma.musicianGenre.findMany()
    * ```
    */
  get musicianGenre(): Prisma.MusicianGenreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.musicianInstrument`: Exposes CRUD operations for the **MusicianInstrument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MusicianInstruments
    * const musicianInstruments = await prisma.musicianInstrument.findMany()
    * ```
    */
  get musicianInstrument(): Prisma.MusicianInstrumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.plan`: Exposes CRUD operations for the **Plan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plans
    * const plans = await prisma.plan.findMany()
    * ```
    */
  get plan(): Prisma.PlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.planFeature`: Exposes CRUD operations for the **PlanFeature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlanFeatures
    * const planFeatures = await prisma.planFeature.findMany()
    * ```
    */
  get planFeature(): Prisma.PlanFeatureDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fAQItem`: Exposes CRUD operations for the **FAQItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FAQItems
    * const fAQItems = await prisma.fAQItem.findMany()
    * ```
    */
  get fAQItem(): Prisma.FAQItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contactMessage`: Exposes CRUD operations for the **ContactMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactMessages
    * const contactMessages = await prisma.contactMessage.findMany()
    * ```
    */
  get contactMessage(): Prisma.ContactMessageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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
    ContactMessage: 'ContactMessage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "musicianProfile" | "portfolioItem" | "genre" | "instrument" | "musicianGenre" | "musicianInstrument" | "review" | "booking" | "plan" | "planFeature" | "fAQItem" | "contactMessage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      MusicianProfile: {
        payload: Prisma.$MusicianProfilePayload<ExtArgs>
        fields: Prisma.MusicianProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MusicianProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MusicianProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianProfilePayload>
          }
          findFirst: {
            args: Prisma.MusicianProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MusicianProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianProfilePayload>
          }
          findMany: {
            args: Prisma.MusicianProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianProfilePayload>[]
          }
          create: {
            args: Prisma.MusicianProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianProfilePayload>
          }
          createMany: {
            args: Prisma.MusicianProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MusicianProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianProfilePayload>
          }
          update: {
            args: Prisma.MusicianProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianProfilePayload>
          }
          deleteMany: {
            args: Prisma.MusicianProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MusicianProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MusicianProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianProfilePayload>
          }
          aggregate: {
            args: Prisma.MusicianProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMusicianProfile>
          }
          groupBy: {
            args: Prisma.MusicianProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<MusicianProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.MusicianProfileCountArgs<ExtArgs>
            result: $Utils.Optional<MusicianProfileCountAggregateOutputType> | number
          }
        }
      }
      PortfolioItem: {
        payload: Prisma.$PortfolioItemPayload<ExtArgs>
        fields: Prisma.PortfolioItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>
          }
          findFirst: {
            args: Prisma.PortfolioItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>
          }
          findMany: {
            args: Prisma.PortfolioItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>[]
          }
          create: {
            args: Prisma.PortfolioItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>
          }
          createMany: {
            args: Prisma.PortfolioItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PortfolioItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>
          }
          update: {
            args: Prisma.PortfolioItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PortfolioItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>
          }
          aggregate: {
            args: Prisma.PortfolioItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolioItem>
          }
          groupBy: {
            args: Prisma.PortfolioItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortfolioItemCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioItemCountAggregateOutputType> | number
          }
        }
      }
      Genre: {
        payload: Prisma.$GenrePayload<ExtArgs>
        fields: Prisma.GenreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GenreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GenreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          findFirst: {
            args: Prisma.GenreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GenreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          findMany: {
            args: Prisma.GenreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>[]
          }
          create: {
            args: Prisma.GenreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          createMany: {
            args: Prisma.GenreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GenreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          update: {
            args: Prisma.GenreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          deleteMany: {
            args: Prisma.GenreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GenreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GenreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          aggregate: {
            args: Prisma.GenreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGenre>
          }
          groupBy: {
            args: Prisma.GenreGroupByArgs<ExtArgs>
            result: $Utils.Optional<GenreGroupByOutputType>[]
          }
          count: {
            args: Prisma.GenreCountArgs<ExtArgs>
            result: $Utils.Optional<GenreCountAggregateOutputType> | number
          }
        }
      }
      Instrument: {
        payload: Prisma.$InstrumentPayload<ExtArgs>
        fields: Prisma.InstrumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstrumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstrumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          findFirst: {
            args: Prisma.InstrumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstrumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          findMany: {
            args: Prisma.InstrumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>[]
          }
          create: {
            args: Prisma.InstrumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          createMany: {
            args: Prisma.InstrumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.InstrumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          update: {
            args: Prisma.InstrumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          deleteMany: {
            args: Prisma.InstrumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstrumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InstrumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          aggregate: {
            args: Prisma.InstrumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstrument>
          }
          groupBy: {
            args: Prisma.InstrumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstrumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstrumentCountArgs<ExtArgs>
            result: $Utils.Optional<InstrumentCountAggregateOutputType> | number
          }
        }
      }
      MusicianGenre: {
        payload: Prisma.$MusicianGenrePayload<ExtArgs>
        fields: Prisma.MusicianGenreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MusicianGenreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianGenrePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MusicianGenreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianGenrePayload>
          }
          findFirst: {
            args: Prisma.MusicianGenreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianGenrePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MusicianGenreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianGenrePayload>
          }
          findMany: {
            args: Prisma.MusicianGenreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianGenrePayload>[]
          }
          create: {
            args: Prisma.MusicianGenreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianGenrePayload>
          }
          createMany: {
            args: Prisma.MusicianGenreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MusicianGenreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianGenrePayload>
          }
          update: {
            args: Prisma.MusicianGenreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianGenrePayload>
          }
          deleteMany: {
            args: Prisma.MusicianGenreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MusicianGenreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MusicianGenreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianGenrePayload>
          }
          aggregate: {
            args: Prisma.MusicianGenreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMusicianGenre>
          }
          groupBy: {
            args: Prisma.MusicianGenreGroupByArgs<ExtArgs>
            result: $Utils.Optional<MusicianGenreGroupByOutputType>[]
          }
          count: {
            args: Prisma.MusicianGenreCountArgs<ExtArgs>
            result: $Utils.Optional<MusicianGenreCountAggregateOutputType> | number
          }
        }
      }
      MusicianInstrument: {
        payload: Prisma.$MusicianInstrumentPayload<ExtArgs>
        fields: Prisma.MusicianInstrumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MusicianInstrumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianInstrumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MusicianInstrumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianInstrumentPayload>
          }
          findFirst: {
            args: Prisma.MusicianInstrumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianInstrumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MusicianInstrumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianInstrumentPayload>
          }
          findMany: {
            args: Prisma.MusicianInstrumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianInstrumentPayload>[]
          }
          create: {
            args: Prisma.MusicianInstrumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianInstrumentPayload>
          }
          createMany: {
            args: Prisma.MusicianInstrumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MusicianInstrumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianInstrumentPayload>
          }
          update: {
            args: Prisma.MusicianInstrumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianInstrumentPayload>
          }
          deleteMany: {
            args: Prisma.MusicianInstrumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MusicianInstrumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MusicianInstrumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicianInstrumentPayload>
          }
          aggregate: {
            args: Prisma.MusicianInstrumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMusicianInstrument>
          }
          groupBy: {
            args: Prisma.MusicianInstrumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<MusicianInstrumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.MusicianInstrumentCountArgs<ExtArgs>
            result: $Utils.Optional<MusicianInstrumentCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
          }
        }
      }
      Plan: {
        payload: Prisma.$PlanPayload<ExtArgs>
        fields: Prisma.PlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findFirst: {
            args: Prisma.PlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findMany: {
            args: Prisma.PlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          create: {
            args: Prisma.PlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          createMany: {
            args: Prisma.PlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          update: {
            args: Prisma.PlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          deleteMany: {
            args: Prisma.PlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          aggregate: {
            args: Prisma.PlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlan>
          }
          groupBy: {
            args: Prisma.PlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCountAggregateOutputType> | number
          }
        }
      }
      PlanFeature: {
        payload: Prisma.$PlanFeaturePayload<ExtArgs>
        fields: Prisma.PlanFeatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFeatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFeatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          findFirst: {
            args: Prisma.PlanFeatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFeatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          findMany: {
            args: Prisma.PlanFeatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>[]
          }
          create: {
            args: Prisma.PlanFeatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          createMany: {
            args: Prisma.PlanFeatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PlanFeatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          update: {
            args: Prisma.PlanFeatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          deleteMany: {
            args: Prisma.PlanFeatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanFeatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlanFeatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          aggregate: {
            args: Prisma.PlanFeatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlanFeature>
          }
          groupBy: {
            args: Prisma.PlanFeatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanFeatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanFeatureCountArgs<ExtArgs>
            result: $Utils.Optional<PlanFeatureCountAggregateOutputType> | number
          }
        }
      }
      FAQItem: {
        payload: Prisma.$FAQItemPayload<ExtArgs>
        fields: Prisma.FAQItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FAQItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FAQItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FAQItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FAQItemPayload>
          }
          findFirst: {
            args: Prisma.FAQItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FAQItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FAQItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FAQItemPayload>
          }
          findMany: {
            args: Prisma.FAQItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FAQItemPayload>[]
          }
          create: {
            args: Prisma.FAQItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FAQItemPayload>
          }
          createMany: {
            args: Prisma.FAQItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FAQItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FAQItemPayload>
          }
          update: {
            args: Prisma.FAQItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FAQItemPayload>
          }
          deleteMany: {
            args: Prisma.FAQItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FAQItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FAQItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FAQItemPayload>
          }
          aggregate: {
            args: Prisma.FAQItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFAQItem>
          }
          groupBy: {
            args: Prisma.FAQItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<FAQItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.FAQItemCountArgs<ExtArgs>
            result: $Utils.Optional<FAQItemCountAggregateOutputType> | number
          }
        }
      }
      ContactMessage: {
        payload: Prisma.$ContactMessagePayload<ExtArgs>
        fields: Prisma.ContactMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          findFirst: {
            args: Prisma.ContactMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          findMany: {
            args: Prisma.ContactMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>[]
          }
          create: {
            args: Prisma.ContactMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          createMany: {
            args: Prisma.ContactMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ContactMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          update: {
            args: Prisma.ContactMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          deleteMany: {
            args: Prisma.ContactMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContactMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          aggregate: {
            args: Prisma.ContactMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactMessage>
          }
          groupBy: {
            args: Prisma.ContactMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ContactMessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    musicianProfile?: MusicianProfileOmit
    portfolioItem?: PortfolioItemOmit
    genre?: GenreOmit
    instrument?: InstrumentOmit
    musicianGenre?: MusicianGenreOmit
    musicianInstrument?: MusicianInstrumentOmit
    review?: ReviewOmit
    booking?: BookingOmit
    plan?: PlanOmit
    planFeature?: PlanFeatureOmit
    fAQItem?: FAQItemOmit
    contactMessage?: ContactMessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    reviewsGiven: number
    bookings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviewsGiven?: boolean | UserCountOutputTypeCountReviewsGivenArgs
    bookings?: boolean | UserCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type MusicianProfileCountOutputType
   */

  export type MusicianProfileCountOutputType = {
    portfolio: number
    reviewsReceived: number
    musicianGenres: number
    musicianInstruments: number
    bookings: number
  }

  export type MusicianProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    portfolio?: boolean | MusicianProfileCountOutputTypeCountPortfolioArgs
    reviewsReceived?: boolean | MusicianProfileCountOutputTypeCountReviewsReceivedArgs
    musicianGenres?: boolean | MusicianProfileCountOutputTypeCountMusicianGenresArgs
    musicianInstruments?: boolean | MusicianProfileCountOutputTypeCountMusicianInstrumentsArgs
    bookings?: boolean | MusicianProfileCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * MusicianProfileCountOutputType without action
   */
  export type MusicianProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianProfileCountOutputType
     */
    select?: MusicianProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MusicianProfileCountOutputType without action
   */
  export type MusicianProfileCountOutputTypeCountPortfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioItemWhereInput
  }

  /**
   * MusicianProfileCountOutputType without action
   */
  export type MusicianProfileCountOutputTypeCountReviewsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * MusicianProfileCountOutputType without action
   */
  export type MusicianProfileCountOutputTypeCountMusicianGenresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MusicianGenreWhereInput
  }

  /**
   * MusicianProfileCountOutputType without action
   */
  export type MusicianProfileCountOutputTypeCountMusicianInstrumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MusicianInstrumentWhereInput
  }

  /**
   * MusicianProfileCountOutputType without action
   */
  export type MusicianProfileCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type GenreCountOutputType
   */

  export type GenreCountOutputType = {
    musicianGenres: number
  }

  export type GenreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    musicianGenres?: boolean | GenreCountOutputTypeCountMusicianGenresArgs
  }

  // Custom InputTypes
  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GenreCountOutputType
     */
    select?: GenreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeCountMusicianGenresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MusicianGenreWhereInput
  }


  /**
   * Count Type InstrumentCountOutputType
   */

  export type InstrumentCountOutputType = {
    musicianInstruments: number
  }

  export type InstrumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    musicianInstruments?: boolean | InstrumentCountOutputTypeCountMusicianInstrumentsArgs
  }

  // Custom InputTypes
  /**
   * InstrumentCountOutputType without action
   */
  export type InstrumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstrumentCountOutputType
     */
    select?: InstrumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InstrumentCountOutputType without action
   */
  export type InstrumentCountOutputTypeCountMusicianInstrumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MusicianInstrumentWhereInput
  }


  /**
   * Count Type PlanCountOutputType
   */

  export type PlanCountOutputType = {
    features: number
  }

  export type PlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    features?: boolean | PlanCountOutputTypeCountFeaturesArgs
  }

  // Custom InputTypes
  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCountOutputType
     */
    select?: PlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountFeaturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanFeatureWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    city: string | null
    state: string | null
    userType: $Enums.UserType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    city: string | null
    state: string | null
    userType: $Enums.UserType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    firstName: number
    lastName: number
    phone: number
    city: number
    state: number
    userType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    firstName?: true
    lastName?: true
    phone?: true
    city?: true
    state?: true
    userType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    firstName?: true
    lastName?: true
    phone?: true
    city?: true
    state?: true
    userType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    firstName?: true
    lastName?: true
    phone?: true
    city?: true
    state?: true
    userType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    phone: string | null
    city: string | null
    state: string | null
    userType: $Enums.UserType
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    city?: boolean
    state?: boolean
    userType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    musicianProfile?: boolean | User$musicianProfileArgs<ExtArgs>
    reviewsGiven?: boolean | User$reviewsGivenArgs<ExtArgs>
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    city?: boolean
    state?: boolean
    userType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "firstName" | "lastName" | "phone" | "city" | "state" | "userType" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    musicianProfile?: boolean | User$musicianProfileArgs<ExtArgs>
    reviewsGiven?: boolean | User$reviewsGivenArgs<ExtArgs>
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      musicianProfile: Prisma.$MusicianProfilePayload<ExtArgs> | null
      reviewsGiven: Prisma.$ReviewPayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      passwordHash: string
      firstName: string
      lastName: string
      phone: string | null
      city: string | null
      state: string | null
      userType: $Enums.UserType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    musicianProfile<T extends User$musicianProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$musicianProfileArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    reviewsGiven<T extends User$reviewsGivenArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsGivenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookings<T extends User$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, User$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly city: FieldRef<"User", 'String'>
    readonly state: FieldRef<"User", 'String'>
    readonly userType: FieldRef<"User", 'UserType'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.musicianProfile
   */
  export type User$musicianProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianProfile
     */
    select?: MusicianProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianProfile
     */
    omit?: MusicianProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianProfileInclude<ExtArgs> | null
    where?: MusicianProfileWhereInput
  }

  /**
   * User.reviewsGiven
   */
  export type User$reviewsGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.bookings
   */
  export type User$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model MusicianProfile
   */

  export type AggregateMusicianProfile = {
    _count: MusicianProfileCountAggregateOutputType | null
    _avg: MusicianProfileAvgAggregateOutputType | null
    _sum: MusicianProfileSumAggregateOutputType | null
    _min: MusicianProfileMinAggregateOutputType | null
    _max: MusicianProfileMaxAggregateOutputType | null
  }

  export type MusicianProfileAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    priceFrom: number | null
    rating: number | null
    ratingCount: number | null
    eventsCount: number | null
    satisfactionRate: number | null
  }

  export type MusicianProfileSumAggregateOutputType = {
    id: number | null
    userId: number | null
    priceFrom: number | null
    rating: number | null
    ratingCount: number | null
    eventsCount: number | null
    satisfactionRate: number | null
  }

  export type MusicianProfileMinAggregateOutputType = {
    id: number | null
    userId: number | null
    category: string | null
    bio: string | null
    location: string | null
    priceFrom: number | null
    experience: string | null
    equipment: string | null
    availability: string | null
    rating: number | null
    ratingCount: number | null
    eventsCount: number | null
    satisfactionRate: number | null
    responseTime: string | null
    isFeatured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MusicianProfileMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    category: string | null
    bio: string | null
    location: string | null
    priceFrom: number | null
    experience: string | null
    equipment: string | null
    availability: string | null
    rating: number | null
    ratingCount: number | null
    eventsCount: number | null
    satisfactionRate: number | null
    responseTime: string | null
    isFeatured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MusicianProfileCountAggregateOutputType = {
    id: number
    userId: number
    category: number
    bio: number
    location: number
    priceFrom: number
    experience: number
    equipment: number
    availability: number
    rating: number
    ratingCount: number
    eventsCount: number
    satisfactionRate: number
    responseTime: number
    isFeatured: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MusicianProfileAvgAggregateInputType = {
    id?: true
    userId?: true
    priceFrom?: true
    rating?: true
    ratingCount?: true
    eventsCount?: true
    satisfactionRate?: true
  }

  export type MusicianProfileSumAggregateInputType = {
    id?: true
    userId?: true
    priceFrom?: true
    rating?: true
    ratingCount?: true
    eventsCount?: true
    satisfactionRate?: true
  }

  export type MusicianProfileMinAggregateInputType = {
    id?: true
    userId?: true
    category?: true
    bio?: true
    location?: true
    priceFrom?: true
    experience?: true
    equipment?: true
    availability?: true
    rating?: true
    ratingCount?: true
    eventsCount?: true
    satisfactionRate?: true
    responseTime?: true
    isFeatured?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MusicianProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    category?: true
    bio?: true
    location?: true
    priceFrom?: true
    experience?: true
    equipment?: true
    availability?: true
    rating?: true
    ratingCount?: true
    eventsCount?: true
    satisfactionRate?: true
    responseTime?: true
    isFeatured?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MusicianProfileCountAggregateInputType = {
    id?: true
    userId?: true
    category?: true
    bio?: true
    location?: true
    priceFrom?: true
    experience?: true
    equipment?: true
    availability?: true
    rating?: true
    ratingCount?: true
    eventsCount?: true
    satisfactionRate?: true
    responseTime?: true
    isFeatured?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MusicianProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MusicianProfile to aggregate.
     */
    where?: MusicianProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicianProfiles to fetch.
     */
    orderBy?: MusicianProfileOrderByWithRelationInput | MusicianProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MusicianProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicianProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicianProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MusicianProfiles
    **/
    _count?: true | MusicianProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MusicianProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MusicianProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MusicianProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MusicianProfileMaxAggregateInputType
  }

  export type GetMusicianProfileAggregateType<T extends MusicianProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateMusicianProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMusicianProfile[P]>
      : GetScalarType<T[P], AggregateMusicianProfile[P]>
  }




  export type MusicianProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MusicianProfileWhereInput
    orderBy?: MusicianProfileOrderByWithAggregationInput | MusicianProfileOrderByWithAggregationInput[]
    by: MusicianProfileScalarFieldEnum[] | MusicianProfileScalarFieldEnum
    having?: MusicianProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MusicianProfileCountAggregateInputType | true
    _avg?: MusicianProfileAvgAggregateInputType
    _sum?: MusicianProfileSumAggregateInputType
    _min?: MusicianProfileMinAggregateInputType
    _max?: MusicianProfileMaxAggregateInputType
  }

  export type MusicianProfileGroupByOutputType = {
    id: number
    userId: number
    category: string | null
    bio: string | null
    location: string | null
    priceFrom: number | null
    experience: string | null
    equipment: string | null
    availability: string | null
    rating: number
    ratingCount: number
    eventsCount: number
    satisfactionRate: number | null
    responseTime: string | null
    isFeatured: boolean
    createdAt: Date
    updatedAt: Date
    _count: MusicianProfileCountAggregateOutputType | null
    _avg: MusicianProfileAvgAggregateOutputType | null
    _sum: MusicianProfileSumAggregateOutputType | null
    _min: MusicianProfileMinAggregateOutputType | null
    _max: MusicianProfileMaxAggregateOutputType | null
  }

  type GetMusicianProfileGroupByPayload<T extends MusicianProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MusicianProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MusicianProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MusicianProfileGroupByOutputType[P]>
            : GetScalarType<T[P], MusicianProfileGroupByOutputType[P]>
        }
      >
    >


  export type MusicianProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    category?: boolean
    bio?: boolean
    location?: boolean
    priceFrom?: boolean
    experience?: boolean
    equipment?: boolean
    availability?: boolean
    rating?: boolean
    ratingCount?: boolean
    eventsCount?: boolean
    satisfactionRate?: boolean
    responseTime?: boolean
    isFeatured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    portfolio?: boolean | MusicianProfile$portfolioArgs<ExtArgs>
    reviewsReceived?: boolean | MusicianProfile$reviewsReceivedArgs<ExtArgs>
    musicianGenres?: boolean | MusicianProfile$musicianGenresArgs<ExtArgs>
    musicianInstruments?: boolean | MusicianProfile$musicianInstrumentsArgs<ExtArgs>
    bookings?: boolean | MusicianProfile$bookingsArgs<ExtArgs>
    _count?: boolean | MusicianProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["musicianProfile"]>



  export type MusicianProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    category?: boolean
    bio?: boolean
    location?: boolean
    priceFrom?: boolean
    experience?: boolean
    equipment?: boolean
    availability?: boolean
    rating?: boolean
    ratingCount?: boolean
    eventsCount?: boolean
    satisfactionRate?: boolean
    responseTime?: boolean
    isFeatured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MusicianProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "category" | "bio" | "location" | "priceFrom" | "experience" | "equipment" | "availability" | "rating" | "ratingCount" | "eventsCount" | "satisfactionRate" | "responseTime" | "isFeatured" | "createdAt" | "updatedAt", ExtArgs["result"]["musicianProfile"]>
  export type MusicianProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    portfolio?: boolean | MusicianProfile$portfolioArgs<ExtArgs>
    reviewsReceived?: boolean | MusicianProfile$reviewsReceivedArgs<ExtArgs>
    musicianGenres?: boolean | MusicianProfile$musicianGenresArgs<ExtArgs>
    musicianInstruments?: boolean | MusicianProfile$musicianInstrumentsArgs<ExtArgs>
    bookings?: boolean | MusicianProfile$bookingsArgs<ExtArgs>
    _count?: boolean | MusicianProfileCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MusicianProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MusicianProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      portfolio: Prisma.$PortfolioItemPayload<ExtArgs>[]
      reviewsReceived: Prisma.$ReviewPayload<ExtArgs>[]
      musicianGenres: Prisma.$MusicianGenrePayload<ExtArgs>[]
      musicianInstruments: Prisma.$MusicianInstrumentPayload<ExtArgs>[]
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      category: string | null
      bio: string | null
      location: string | null
      priceFrom: number | null
      experience: string | null
      equipment: string | null
      availability: string | null
      rating: number
      ratingCount: number
      eventsCount: number
      satisfactionRate: number | null
      responseTime: string | null
      isFeatured: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["musicianProfile"]>
    composites: {}
  }

  type MusicianProfileGetPayload<S extends boolean | null | undefined | MusicianProfileDefaultArgs> = $Result.GetResult<Prisma.$MusicianProfilePayload, S>

  type MusicianProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MusicianProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MusicianProfileCountAggregateInputType | true
    }

  export interface MusicianProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MusicianProfile'], meta: { name: 'MusicianProfile' } }
    /**
     * Find zero or one MusicianProfile that matches the filter.
     * @param {MusicianProfileFindUniqueArgs} args - Arguments to find a MusicianProfile
     * @example
     * // Get one MusicianProfile
     * const musicianProfile = await prisma.musicianProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MusicianProfileFindUniqueArgs>(args: SelectSubset<T, MusicianProfileFindUniqueArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MusicianProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MusicianProfileFindUniqueOrThrowArgs} args - Arguments to find a MusicianProfile
     * @example
     * // Get one MusicianProfile
     * const musicianProfile = await prisma.musicianProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MusicianProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, MusicianProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MusicianProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianProfileFindFirstArgs} args - Arguments to find a MusicianProfile
     * @example
     * // Get one MusicianProfile
     * const musicianProfile = await prisma.musicianProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MusicianProfileFindFirstArgs>(args?: SelectSubset<T, MusicianProfileFindFirstArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MusicianProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianProfileFindFirstOrThrowArgs} args - Arguments to find a MusicianProfile
     * @example
     * // Get one MusicianProfile
     * const musicianProfile = await prisma.musicianProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MusicianProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, MusicianProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MusicianProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MusicianProfiles
     * const musicianProfiles = await prisma.musicianProfile.findMany()
     * 
     * // Get first 10 MusicianProfiles
     * const musicianProfiles = await prisma.musicianProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const musicianProfileWithIdOnly = await prisma.musicianProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MusicianProfileFindManyArgs>(args?: SelectSubset<T, MusicianProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MusicianProfile.
     * @param {MusicianProfileCreateArgs} args - Arguments to create a MusicianProfile.
     * @example
     * // Create one MusicianProfile
     * const MusicianProfile = await prisma.musicianProfile.create({
     *   data: {
     *     // ... data to create a MusicianProfile
     *   }
     * })
     * 
     */
    create<T extends MusicianProfileCreateArgs>(args: SelectSubset<T, MusicianProfileCreateArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MusicianProfiles.
     * @param {MusicianProfileCreateManyArgs} args - Arguments to create many MusicianProfiles.
     * @example
     * // Create many MusicianProfiles
     * const musicianProfile = await prisma.musicianProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MusicianProfileCreateManyArgs>(args?: SelectSubset<T, MusicianProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MusicianProfile.
     * @param {MusicianProfileDeleteArgs} args - Arguments to delete one MusicianProfile.
     * @example
     * // Delete one MusicianProfile
     * const MusicianProfile = await prisma.musicianProfile.delete({
     *   where: {
     *     // ... filter to delete one MusicianProfile
     *   }
     * })
     * 
     */
    delete<T extends MusicianProfileDeleteArgs>(args: SelectSubset<T, MusicianProfileDeleteArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MusicianProfile.
     * @param {MusicianProfileUpdateArgs} args - Arguments to update one MusicianProfile.
     * @example
     * // Update one MusicianProfile
     * const musicianProfile = await prisma.musicianProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MusicianProfileUpdateArgs>(args: SelectSubset<T, MusicianProfileUpdateArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MusicianProfiles.
     * @param {MusicianProfileDeleteManyArgs} args - Arguments to filter MusicianProfiles to delete.
     * @example
     * // Delete a few MusicianProfiles
     * const { count } = await prisma.musicianProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MusicianProfileDeleteManyArgs>(args?: SelectSubset<T, MusicianProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MusicianProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MusicianProfiles
     * const musicianProfile = await prisma.musicianProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MusicianProfileUpdateManyArgs>(args: SelectSubset<T, MusicianProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MusicianProfile.
     * @param {MusicianProfileUpsertArgs} args - Arguments to update or create a MusicianProfile.
     * @example
     * // Update or create a MusicianProfile
     * const musicianProfile = await prisma.musicianProfile.upsert({
     *   create: {
     *     // ... data to create a MusicianProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MusicianProfile we want to update
     *   }
     * })
     */
    upsert<T extends MusicianProfileUpsertArgs>(args: SelectSubset<T, MusicianProfileUpsertArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MusicianProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianProfileCountArgs} args - Arguments to filter MusicianProfiles to count.
     * @example
     * // Count the number of MusicianProfiles
     * const count = await prisma.musicianProfile.count({
     *   where: {
     *     // ... the filter for the MusicianProfiles we want to count
     *   }
     * })
    **/
    count<T extends MusicianProfileCountArgs>(
      args?: Subset<T, MusicianProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MusicianProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MusicianProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MusicianProfileAggregateArgs>(args: Subset<T, MusicianProfileAggregateArgs>): Prisma.PrismaPromise<GetMusicianProfileAggregateType<T>>

    /**
     * Group by MusicianProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MusicianProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MusicianProfileGroupByArgs['orderBy'] }
        : { orderBy?: MusicianProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MusicianProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMusicianProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MusicianProfile model
   */
  readonly fields: MusicianProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MusicianProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MusicianProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    portfolio<T extends MusicianProfile$portfolioArgs<ExtArgs> = {}>(args?: Subset<T, MusicianProfile$portfolioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviewsReceived<T extends MusicianProfile$reviewsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, MusicianProfile$reviewsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    musicianGenres<T extends MusicianProfile$musicianGenresArgs<ExtArgs> = {}>(args?: Subset<T, MusicianProfile$musicianGenresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicianGenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    musicianInstruments<T extends MusicianProfile$musicianInstrumentsArgs<ExtArgs> = {}>(args?: Subset<T, MusicianProfile$musicianInstrumentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicianInstrumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookings<T extends MusicianProfile$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, MusicianProfile$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MusicianProfile model
   */
  interface MusicianProfileFieldRefs {
    readonly id: FieldRef<"MusicianProfile", 'Int'>
    readonly userId: FieldRef<"MusicianProfile", 'Int'>
    readonly category: FieldRef<"MusicianProfile", 'String'>
    readonly bio: FieldRef<"MusicianProfile", 'String'>
    readonly location: FieldRef<"MusicianProfile", 'String'>
    readonly priceFrom: FieldRef<"MusicianProfile", 'Int'>
    readonly experience: FieldRef<"MusicianProfile", 'String'>
    readonly equipment: FieldRef<"MusicianProfile", 'String'>
    readonly availability: FieldRef<"MusicianProfile", 'String'>
    readonly rating: FieldRef<"MusicianProfile", 'Float'>
    readonly ratingCount: FieldRef<"MusicianProfile", 'Int'>
    readonly eventsCount: FieldRef<"MusicianProfile", 'Int'>
    readonly satisfactionRate: FieldRef<"MusicianProfile", 'Int'>
    readonly responseTime: FieldRef<"MusicianProfile", 'String'>
    readonly isFeatured: FieldRef<"MusicianProfile", 'Boolean'>
    readonly createdAt: FieldRef<"MusicianProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"MusicianProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MusicianProfile findUnique
   */
  export type MusicianProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianProfile
     */
    select?: MusicianProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianProfile
     */
    omit?: MusicianProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianProfileInclude<ExtArgs> | null
    /**
     * Filter, which MusicianProfile to fetch.
     */
    where: MusicianProfileWhereUniqueInput
  }

  /**
   * MusicianProfile findUniqueOrThrow
   */
  export type MusicianProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianProfile
     */
    select?: MusicianProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianProfile
     */
    omit?: MusicianProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianProfileInclude<ExtArgs> | null
    /**
     * Filter, which MusicianProfile to fetch.
     */
    where: MusicianProfileWhereUniqueInput
  }

  /**
   * MusicianProfile findFirst
   */
  export type MusicianProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianProfile
     */
    select?: MusicianProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianProfile
     */
    omit?: MusicianProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianProfileInclude<ExtArgs> | null
    /**
     * Filter, which MusicianProfile to fetch.
     */
    where?: MusicianProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicianProfiles to fetch.
     */
    orderBy?: MusicianProfileOrderByWithRelationInput | MusicianProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MusicianProfiles.
     */
    cursor?: MusicianProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicianProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicianProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MusicianProfiles.
     */
    distinct?: MusicianProfileScalarFieldEnum | MusicianProfileScalarFieldEnum[]
  }

  /**
   * MusicianProfile findFirstOrThrow
   */
  export type MusicianProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianProfile
     */
    select?: MusicianProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianProfile
     */
    omit?: MusicianProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianProfileInclude<ExtArgs> | null
    /**
     * Filter, which MusicianProfile to fetch.
     */
    where?: MusicianProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicianProfiles to fetch.
     */
    orderBy?: MusicianProfileOrderByWithRelationInput | MusicianProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MusicianProfiles.
     */
    cursor?: MusicianProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicianProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicianProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MusicianProfiles.
     */
    distinct?: MusicianProfileScalarFieldEnum | MusicianProfileScalarFieldEnum[]
  }

  /**
   * MusicianProfile findMany
   */
  export type MusicianProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianProfile
     */
    select?: MusicianProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianProfile
     */
    omit?: MusicianProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianProfileInclude<ExtArgs> | null
    /**
     * Filter, which MusicianProfiles to fetch.
     */
    where?: MusicianProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicianProfiles to fetch.
     */
    orderBy?: MusicianProfileOrderByWithRelationInput | MusicianProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MusicianProfiles.
     */
    cursor?: MusicianProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicianProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicianProfiles.
     */
    skip?: number
    distinct?: MusicianProfileScalarFieldEnum | MusicianProfileScalarFieldEnum[]
  }

  /**
   * MusicianProfile create
   */
  export type MusicianProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianProfile
     */
    select?: MusicianProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianProfile
     */
    omit?: MusicianProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a MusicianProfile.
     */
    data: XOR<MusicianProfileCreateInput, MusicianProfileUncheckedCreateInput>
  }

  /**
   * MusicianProfile createMany
   */
  export type MusicianProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MusicianProfiles.
     */
    data: MusicianProfileCreateManyInput | MusicianProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MusicianProfile update
   */
  export type MusicianProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianProfile
     */
    select?: MusicianProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianProfile
     */
    omit?: MusicianProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a MusicianProfile.
     */
    data: XOR<MusicianProfileUpdateInput, MusicianProfileUncheckedUpdateInput>
    /**
     * Choose, which MusicianProfile to update.
     */
    where: MusicianProfileWhereUniqueInput
  }

  /**
   * MusicianProfile updateMany
   */
  export type MusicianProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MusicianProfiles.
     */
    data: XOR<MusicianProfileUpdateManyMutationInput, MusicianProfileUncheckedUpdateManyInput>
    /**
     * Filter which MusicianProfiles to update
     */
    where?: MusicianProfileWhereInput
    /**
     * Limit how many MusicianProfiles to update.
     */
    limit?: number
  }

  /**
   * MusicianProfile upsert
   */
  export type MusicianProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianProfile
     */
    select?: MusicianProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianProfile
     */
    omit?: MusicianProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the MusicianProfile to update in case it exists.
     */
    where: MusicianProfileWhereUniqueInput
    /**
     * In case the MusicianProfile found by the `where` argument doesn't exist, create a new MusicianProfile with this data.
     */
    create: XOR<MusicianProfileCreateInput, MusicianProfileUncheckedCreateInput>
    /**
     * In case the MusicianProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MusicianProfileUpdateInput, MusicianProfileUncheckedUpdateInput>
  }

  /**
   * MusicianProfile delete
   */
  export type MusicianProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianProfile
     */
    select?: MusicianProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianProfile
     */
    omit?: MusicianProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianProfileInclude<ExtArgs> | null
    /**
     * Filter which MusicianProfile to delete.
     */
    where: MusicianProfileWhereUniqueInput
  }

  /**
   * MusicianProfile deleteMany
   */
  export type MusicianProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MusicianProfiles to delete
     */
    where?: MusicianProfileWhereInput
    /**
     * Limit how many MusicianProfiles to delete.
     */
    limit?: number
  }

  /**
   * MusicianProfile.portfolio
   */
  export type MusicianProfile$portfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    where?: PortfolioItemWhereInput
    orderBy?: PortfolioItemOrderByWithRelationInput | PortfolioItemOrderByWithRelationInput[]
    cursor?: PortfolioItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioItemScalarFieldEnum | PortfolioItemScalarFieldEnum[]
  }

  /**
   * MusicianProfile.reviewsReceived
   */
  export type MusicianProfile$reviewsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * MusicianProfile.musicianGenres
   */
  export type MusicianProfile$musicianGenresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianGenre
     */
    select?: MusicianGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianGenre
     */
    omit?: MusicianGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianGenreInclude<ExtArgs> | null
    where?: MusicianGenreWhereInput
    orderBy?: MusicianGenreOrderByWithRelationInput | MusicianGenreOrderByWithRelationInput[]
    cursor?: MusicianGenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MusicianGenreScalarFieldEnum | MusicianGenreScalarFieldEnum[]
  }

  /**
   * MusicianProfile.musicianInstruments
   */
  export type MusicianProfile$musicianInstrumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianInstrument
     */
    select?: MusicianInstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianInstrument
     */
    omit?: MusicianInstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianInstrumentInclude<ExtArgs> | null
    where?: MusicianInstrumentWhereInput
    orderBy?: MusicianInstrumentOrderByWithRelationInput | MusicianInstrumentOrderByWithRelationInput[]
    cursor?: MusicianInstrumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MusicianInstrumentScalarFieldEnum | MusicianInstrumentScalarFieldEnum[]
  }

  /**
   * MusicianProfile.bookings
   */
  export type MusicianProfile$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * MusicianProfile without action
   */
  export type MusicianProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianProfile
     */
    select?: MusicianProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianProfile
     */
    omit?: MusicianProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianProfileInclude<ExtArgs> | null
  }


  /**
   * Model PortfolioItem
   */

  export type AggregatePortfolioItem = {
    _count: PortfolioItemCountAggregateOutputType | null
    _avg: PortfolioItemAvgAggregateOutputType | null
    _sum: PortfolioItemSumAggregateOutputType | null
    _min: PortfolioItemMinAggregateOutputType | null
    _max: PortfolioItemMaxAggregateOutputType | null
  }

  export type PortfolioItemAvgAggregateOutputType = {
    id: number | null
    musicianProfileId: number | null
  }

  export type PortfolioItemSumAggregateOutputType = {
    id: number | null
    musicianProfileId: number | null
  }

  export type PortfolioItemMinAggregateOutputType = {
    id: number | null
    musicianProfileId: number | null
    type: $Enums.PortfolioItemType | null
    url: string | null
    title: string | null
    description: string | null
    date: string | null
    location: string | null
    genre: string | null
    createdAt: Date | null
  }

  export type PortfolioItemMaxAggregateOutputType = {
    id: number | null
    musicianProfileId: number | null
    type: $Enums.PortfolioItemType | null
    url: string | null
    title: string | null
    description: string | null
    date: string | null
    location: string | null
    genre: string | null
    createdAt: Date | null
  }

  export type PortfolioItemCountAggregateOutputType = {
    id: number
    musicianProfileId: number
    type: number
    url: number
    title: number
    description: number
    date: number
    location: number
    genre: number
    createdAt: number
    _all: number
  }


  export type PortfolioItemAvgAggregateInputType = {
    id?: true
    musicianProfileId?: true
  }

  export type PortfolioItemSumAggregateInputType = {
    id?: true
    musicianProfileId?: true
  }

  export type PortfolioItemMinAggregateInputType = {
    id?: true
    musicianProfileId?: true
    type?: true
    url?: true
    title?: true
    description?: true
    date?: true
    location?: true
    genre?: true
    createdAt?: true
  }

  export type PortfolioItemMaxAggregateInputType = {
    id?: true
    musicianProfileId?: true
    type?: true
    url?: true
    title?: true
    description?: true
    date?: true
    location?: true
    genre?: true
    createdAt?: true
  }

  export type PortfolioItemCountAggregateInputType = {
    id?: true
    musicianProfileId?: true
    type?: true
    url?: true
    title?: true
    description?: true
    date?: true
    location?: true
    genre?: true
    createdAt?: true
    _all?: true
  }

  export type PortfolioItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortfolioItem to aggregate.
     */
    where?: PortfolioItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioItems to fetch.
     */
    orderBy?: PortfolioItemOrderByWithRelationInput | PortfolioItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PortfolioItems
    **/
    _count?: true | PortfolioItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortfolioItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortfolioItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioItemMaxAggregateInputType
  }

  export type GetPortfolioItemAggregateType<T extends PortfolioItemAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolioItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolioItem[P]>
      : GetScalarType<T[P], AggregatePortfolioItem[P]>
  }




  export type PortfolioItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioItemWhereInput
    orderBy?: PortfolioItemOrderByWithAggregationInput | PortfolioItemOrderByWithAggregationInput[]
    by: PortfolioItemScalarFieldEnum[] | PortfolioItemScalarFieldEnum
    having?: PortfolioItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioItemCountAggregateInputType | true
    _avg?: PortfolioItemAvgAggregateInputType
    _sum?: PortfolioItemSumAggregateInputType
    _min?: PortfolioItemMinAggregateInputType
    _max?: PortfolioItemMaxAggregateInputType
  }

  export type PortfolioItemGroupByOutputType = {
    id: number
    musicianProfileId: number
    type: $Enums.PortfolioItemType
    url: string
    title: string
    description: string | null
    date: string | null
    location: string | null
    genre: string | null
    createdAt: Date
    _count: PortfolioItemCountAggregateOutputType | null
    _avg: PortfolioItemAvgAggregateOutputType | null
    _sum: PortfolioItemSumAggregateOutputType | null
    _min: PortfolioItemMinAggregateOutputType | null
    _max: PortfolioItemMaxAggregateOutputType | null
  }

  type GetPortfolioItemGroupByPayload<T extends PortfolioItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioItemGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioItemGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    musicianProfileId?: boolean
    type?: boolean
    url?: boolean
    title?: boolean
    description?: boolean
    date?: boolean
    location?: boolean
    genre?: boolean
    createdAt?: boolean
    musicianProfile?: boolean | MusicianProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["portfolioItem"]>



  export type PortfolioItemSelectScalar = {
    id?: boolean
    musicianProfileId?: boolean
    type?: boolean
    url?: boolean
    title?: boolean
    description?: boolean
    date?: boolean
    location?: boolean
    genre?: boolean
    createdAt?: boolean
  }

  export type PortfolioItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "musicianProfileId" | "type" | "url" | "title" | "description" | "date" | "location" | "genre" | "createdAt", ExtArgs["result"]["portfolioItem"]>
  export type PortfolioItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    musicianProfile?: boolean | MusicianProfileDefaultArgs<ExtArgs>
  }

  export type $PortfolioItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PortfolioItem"
    objects: {
      musicianProfile: Prisma.$MusicianProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      musicianProfileId: number
      type: $Enums.PortfolioItemType
      url: string
      title: string
      description: string | null
      date: string | null
      location: string | null
      genre: string | null
      createdAt: Date
    }, ExtArgs["result"]["portfolioItem"]>
    composites: {}
  }

  type PortfolioItemGetPayload<S extends boolean | null | undefined | PortfolioItemDefaultArgs> = $Result.GetResult<Prisma.$PortfolioItemPayload, S>

  type PortfolioItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortfolioItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortfolioItemCountAggregateInputType | true
    }

  export interface PortfolioItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PortfolioItem'], meta: { name: 'PortfolioItem' } }
    /**
     * Find zero or one PortfolioItem that matches the filter.
     * @param {PortfolioItemFindUniqueArgs} args - Arguments to find a PortfolioItem
     * @example
     * // Get one PortfolioItem
     * const portfolioItem = await prisma.portfolioItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioItemFindUniqueArgs>(args: SelectSubset<T, PortfolioItemFindUniqueArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PortfolioItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortfolioItemFindUniqueOrThrowArgs} args - Arguments to find a PortfolioItem
     * @example
     * // Get one PortfolioItem
     * const portfolioItem = await prisma.portfolioItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioItemFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortfolioItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemFindFirstArgs} args - Arguments to find a PortfolioItem
     * @example
     * // Get one PortfolioItem
     * const portfolioItem = await prisma.portfolioItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioItemFindFirstArgs>(args?: SelectSubset<T, PortfolioItemFindFirstArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortfolioItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemFindFirstOrThrowArgs} args - Arguments to find a PortfolioItem
     * @example
     * // Get one PortfolioItem
     * const portfolioItem = await prisma.portfolioItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioItemFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PortfolioItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PortfolioItems
     * const portfolioItems = await prisma.portfolioItem.findMany()
     * 
     * // Get first 10 PortfolioItems
     * const portfolioItems = await prisma.portfolioItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioItemWithIdOnly = await prisma.portfolioItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioItemFindManyArgs>(args?: SelectSubset<T, PortfolioItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PortfolioItem.
     * @param {PortfolioItemCreateArgs} args - Arguments to create a PortfolioItem.
     * @example
     * // Create one PortfolioItem
     * const PortfolioItem = await prisma.portfolioItem.create({
     *   data: {
     *     // ... data to create a PortfolioItem
     *   }
     * })
     * 
     */
    create<T extends PortfolioItemCreateArgs>(args: SelectSubset<T, PortfolioItemCreateArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PortfolioItems.
     * @param {PortfolioItemCreateManyArgs} args - Arguments to create many PortfolioItems.
     * @example
     * // Create many PortfolioItems
     * const portfolioItem = await prisma.portfolioItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioItemCreateManyArgs>(args?: SelectSubset<T, PortfolioItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PortfolioItem.
     * @param {PortfolioItemDeleteArgs} args - Arguments to delete one PortfolioItem.
     * @example
     * // Delete one PortfolioItem
     * const PortfolioItem = await prisma.portfolioItem.delete({
     *   where: {
     *     // ... filter to delete one PortfolioItem
     *   }
     * })
     * 
     */
    delete<T extends PortfolioItemDeleteArgs>(args: SelectSubset<T, PortfolioItemDeleteArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PortfolioItem.
     * @param {PortfolioItemUpdateArgs} args - Arguments to update one PortfolioItem.
     * @example
     * // Update one PortfolioItem
     * const portfolioItem = await prisma.portfolioItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioItemUpdateArgs>(args: SelectSubset<T, PortfolioItemUpdateArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PortfolioItems.
     * @param {PortfolioItemDeleteManyArgs} args - Arguments to filter PortfolioItems to delete.
     * @example
     * // Delete a few PortfolioItems
     * const { count } = await prisma.portfolioItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioItemDeleteManyArgs>(args?: SelectSubset<T, PortfolioItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortfolioItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PortfolioItems
     * const portfolioItem = await prisma.portfolioItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioItemUpdateManyArgs>(args: SelectSubset<T, PortfolioItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PortfolioItem.
     * @param {PortfolioItemUpsertArgs} args - Arguments to update or create a PortfolioItem.
     * @example
     * // Update or create a PortfolioItem
     * const portfolioItem = await prisma.portfolioItem.upsert({
     *   create: {
     *     // ... data to create a PortfolioItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PortfolioItem we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioItemUpsertArgs>(args: SelectSubset<T, PortfolioItemUpsertArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PortfolioItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemCountArgs} args - Arguments to filter PortfolioItems to count.
     * @example
     * // Count the number of PortfolioItems
     * const count = await prisma.portfolioItem.count({
     *   where: {
     *     // ... the filter for the PortfolioItems we want to count
     *   }
     * })
    **/
    count<T extends PortfolioItemCountArgs>(
      args?: Subset<T, PortfolioItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PortfolioItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortfolioItemAggregateArgs>(args: Subset<T, PortfolioItemAggregateArgs>): Prisma.PrismaPromise<GetPortfolioItemAggregateType<T>>

    /**
     * Group by PortfolioItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortfolioItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioItemGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortfolioItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PortfolioItem model
   */
  readonly fields: PortfolioItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PortfolioItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    musicianProfile<T extends MusicianProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MusicianProfileDefaultArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PortfolioItem model
   */
  interface PortfolioItemFieldRefs {
    readonly id: FieldRef<"PortfolioItem", 'Int'>
    readonly musicianProfileId: FieldRef<"PortfolioItem", 'Int'>
    readonly type: FieldRef<"PortfolioItem", 'PortfolioItemType'>
    readonly url: FieldRef<"PortfolioItem", 'String'>
    readonly title: FieldRef<"PortfolioItem", 'String'>
    readonly description: FieldRef<"PortfolioItem", 'String'>
    readonly date: FieldRef<"PortfolioItem", 'String'>
    readonly location: FieldRef<"PortfolioItem", 'String'>
    readonly genre: FieldRef<"PortfolioItem", 'String'>
    readonly createdAt: FieldRef<"PortfolioItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PortfolioItem findUnique
   */
  export type PortfolioItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioItem to fetch.
     */
    where: PortfolioItemWhereUniqueInput
  }

  /**
   * PortfolioItem findUniqueOrThrow
   */
  export type PortfolioItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioItem to fetch.
     */
    where: PortfolioItemWhereUniqueInput
  }

  /**
   * PortfolioItem findFirst
   */
  export type PortfolioItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioItem to fetch.
     */
    where?: PortfolioItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioItems to fetch.
     */
    orderBy?: PortfolioItemOrderByWithRelationInput | PortfolioItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortfolioItems.
     */
    cursor?: PortfolioItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortfolioItems.
     */
    distinct?: PortfolioItemScalarFieldEnum | PortfolioItemScalarFieldEnum[]
  }

  /**
   * PortfolioItem findFirstOrThrow
   */
  export type PortfolioItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioItem to fetch.
     */
    where?: PortfolioItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioItems to fetch.
     */
    orderBy?: PortfolioItemOrderByWithRelationInput | PortfolioItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortfolioItems.
     */
    cursor?: PortfolioItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortfolioItems.
     */
    distinct?: PortfolioItemScalarFieldEnum | PortfolioItemScalarFieldEnum[]
  }

  /**
   * PortfolioItem findMany
   */
  export type PortfolioItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioItems to fetch.
     */
    where?: PortfolioItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioItems to fetch.
     */
    orderBy?: PortfolioItemOrderByWithRelationInput | PortfolioItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PortfolioItems.
     */
    cursor?: PortfolioItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioItems.
     */
    skip?: number
    distinct?: PortfolioItemScalarFieldEnum | PortfolioItemScalarFieldEnum[]
  }

  /**
   * PortfolioItem create
   */
  export type PortfolioItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * The data needed to create a PortfolioItem.
     */
    data: XOR<PortfolioItemCreateInput, PortfolioItemUncheckedCreateInput>
  }

  /**
   * PortfolioItem createMany
   */
  export type PortfolioItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PortfolioItems.
     */
    data: PortfolioItemCreateManyInput | PortfolioItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortfolioItem update
   */
  export type PortfolioItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * The data needed to update a PortfolioItem.
     */
    data: XOR<PortfolioItemUpdateInput, PortfolioItemUncheckedUpdateInput>
    /**
     * Choose, which PortfolioItem to update.
     */
    where: PortfolioItemWhereUniqueInput
  }

  /**
   * PortfolioItem updateMany
   */
  export type PortfolioItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PortfolioItems.
     */
    data: XOR<PortfolioItemUpdateManyMutationInput, PortfolioItemUncheckedUpdateManyInput>
    /**
     * Filter which PortfolioItems to update
     */
    where?: PortfolioItemWhereInput
    /**
     * Limit how many PortfolioItems to update.
     */
    limit?: number
  }

  /**
   * PortfolioItem upsert
   */
  export type PortfolioItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * The filter to search for the PortfolioItem to update in case it exists.
     */
    where: PortfolioItemWhereUniqueInput
    /**
     * In case the PortfolioItem found by the `where` argument doesn't exist, create a new PortfolioItem with this data.
     */
    create: XOR<PortfolioItemCreateInput, PortfolioItemUncheckedCreateInput>
    /**
     * In case the PortfolioItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioItemUpdateInput, PortfolioItemUncheckedUpdateInput>
  }

  /**
   * PortfolioItem delete
   */
  export type PortfolioItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * Filter which PortfolioItem to delete.
     */
    where: PortfolioItemWhereUniqueInput
  }

  /**
   * PortfolioItem deleteMany
   */
  export type PortfolioItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortfolioItems to delete
     */
    where?: PortfolioItemWhereInput
    /**
     * Limit how many PortfolioItems to delete.
     */
    limit?: number
  }

  /**
   * PortfolioItem without action
   */
  export type PortfolioItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
  }


  /**
   * Model Genre
   */

  export type AggregateGenre = {
    _count: GenreCountAggregateOutputType | null
    _avg: GenreAvgAggregateOutputType | null
    _sum: GenreSumAggregateOutputType | null
    _min: GenreMinAggregateOutputType | null
    _max: GenreMaxAggregateOutputType | null
  }

  export type GenreAvgAggregateOutputType = {
    id: number | null
  }

  export type GenreSumAggregateOutputType = {
    id: number | null
  }

  export type GenreMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
  }

  export type GenreMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
  }

  export type GenreCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    _all: number
  }


  export type GenreAvgAggregateInputType = {
    id?: true
  }

  export type GenreSumAggregateInputType = {
    id?: true
  }

  export type GenreMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type GenreMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type GenreCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    _all?: true
  }

  export type GenreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Genre to aggregate.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Genres
    **/
    _count?: true | GenreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GenreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GenreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GenreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GenreMaxAggregateInputType
  }

  export type GetGenreAggregateType<T extends GenreAggregateArgs> = {
        [P in keyof T & keyof AggregateGenre]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGenre[P]>
      : GetScalarType<T[P], AggregateGenre[P]>
  }




  export type GenreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenreWhereInput
    orderBy?: GenreOrderByWithAggregationInput | GenreOrderByWithAggregationInput[]
    by: GenreScalarFieldEnum[] | GenreScalarFieldEnum
    having?: GenreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GenreCountAggregateInputType | true
    _avg?: GenreAvgAggregateInputType
    _sum?: GenreSumAggregateInputType
    _min?: GenreMinAggregateInputType
    _max?: GenreMaxAggregateInputType
  }

  export type GenreGroupByOutputType = {
    id: number
    name: string
    slug: string
    _count: GenreCountAggregateOutputType | null
    _avg: GenreAvgAggregateOutputType | null
    _sum: GenreSumAggregateOutputType | null
    _min: GenreMinAggregateOutputType | null
    _max: GenreMaxAggregateOutputType | null
  }

  type GetGenreGroupByPayload<T extends GenreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GenreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GenreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GenreGroupByOutputType[P]>
            : GetScalarType<T[P], GenreGroupByOutputType[P]>
        }
      >
    >


  export type GenreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    musicianGenres?: boolean | Genre$musicianGenresArgs<ExtArgs>
    _count?: boolean | GenreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["genre"]>



  export type GenreSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
  }

  export type GenreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug", ExtArgs["result"]["genre"]>
  export type GenreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    musicianGenres?: boolean | Genre$musicianGenresArgs<ExtArgs>
    _count?: boolean | GenreCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $GenrePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Genre"
    objects: {
      musicianGenres: Prisma.$MusicianGenrePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
    }, ExtArgs["result"]["genre"]>
    composites: {}
  }

  type GenreGetPayload<S extends boolean | null | undefined | GenreDefaultArgs> = $Result.GetResult<Prisma.$GenrePayload, S>

  type GenreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GenreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GenreCountAggregateInputType | true
    }

  export interface GenreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Genre'], meta: { name: 'Genre' } }
    /**
     * Find zero or one Genre that matches the filter.
     * @param {GenreFindUniqueArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GenreFindUniqueArgs>(args: SelectSubset<T, GenreFindUniqueArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Genre that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GenreFindUniqueOrThrowArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GenreFindUniqueOrThrowArgs>(args: SelectSubset<T, GenreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Genre that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindFirstArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GenreFindFirstArgs>(args?: SelectSubset<T, GenreFindFirstArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Genre that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindFirstOrThrowArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GenreFindFirstOrThrowArgs>(args?: SelectSubset<T, GenreFindFirstOrThrowArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Genres that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Genres
     * const genres = await prisma.genre.findMany()
     * 
     * // Get first 10 Genres
     * const genres = await prisma.genre.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const genreWithIdOnly = await prisma.genre.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GenreFindManyArgs>(args?: SelectSubset<T, GenreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Genre.
     * @param {GenreCreateArgs} args - Arguments to create a Genre.
     * @example
     * // Create one Genre
     * const Genre = await prisma.genre.create({
     *   data: {
     *     // ... data to create a Genre
     *   }
     * })
     * 
     */
    create<T extends GenreCreateArgs>(args: SelectSubset<T, GenreCreateArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Genres.
     * @param {GenreCreateManyArgs} args - Arguments to create many Genres.
     * @example
     * // Create many Genres
     * const genre = await prisma.genre.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GenreCreateManyArgs>(args?: SelectSubset<T, GenreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Genre.
     * @param {GenreDeleteArgs} args - Arguments to delete one Genre.
     * @example
     * // Delete one Genre
     * const Genre = await prisma.genre.delete({
     *   where: {
     *     // ... filter to delete one Genre
     *   }
     * })
     * 
     */
    delete<T extends GenreDeleteArgs>(args: SelectSubset<T, GenreDeleteArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Genre.
     * @param {GenreUpdateArgs} args - Arguments to update one Genre.
     * @example
     * // Update one Genre
     * const genre = await prisma.genre.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GenreUpdateArgs>(args: SelectSubset<T, GenreUpdateArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Genres.
     * @param {GenreDeleteManyArgs} args - Arguments to filter Genres to delete.
     * @example
     * // Delete a few Genres
     * const { count } = await prisma.genre.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GenreDeleteManyArgs>(args?: SelectSubset<T, GenreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Genres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Genres
     * const genre = await prisma.genre.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GenreUpdateManyArgs>(args: SelectSubset<T, GenreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Genre.
     * @param {GenreUpsertArgs} args - Arguments to update or create a Genre.
     * @example
     * // Update or create a Genre
     * const genre = await prisma.genre.upsert({
     *   create: {
     *     // ... data to create a Genre
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Genre we want to update
     *   }
     * })
     */
    upsert<T extends GenreUpsertArgs>(args: SelectSubset<T, GenreUpsertArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Genres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreCountArgs} args - Arguments to filter Genres to count.
     * @example
     * // Count the number of Genres
     * const count = await prisma.genre.count({
     *   where: {
     *     // ... the filter for the Genres we want to count
     *   }
     * })
    **/
    count<T extends GenreCountArgs>(
      args?: Subset<T, GenreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GenreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Genre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GenreAggregateArgs>(args: Subset<T, GenreAggregateArgs>): Prisma.PrismaPromise<GetGenreAggregateType<T>>

    /**
     * Group by Genre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GenreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GenreGroupByArgs['orderBy'] }
        : { orderBy?: GenreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GenreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGenreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Genre model
   */
  readonly fields: GenreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Genre.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GenreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    musicianGenres<T extends Genre$musicianGenresArgs<ExtArgs> = {}>(args?: Subset<T, Genre$musicianGenresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicianGenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Genre model
   */
  interface GenreFieldRefs {
    readonly id: FieldRef<"Genre", 'Int'>
    readonly name: FieldRef<"Genre", 'String'>
    readonly slug: FieldRef<"Genre", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Genre findUnique
   */
  export type GenreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre findUniqueOrThrow
   */
  export type GenreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre findFirst
   */
  export type GenreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre findFirstOrThrow
   */
  export type GenreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre findMany
   */
  export type GenreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genres to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre create
   */
  export type GenreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The data needed to create a Genre.
     */
    data: XOR<GenreCreateInput, GenreUncheckedCreateInput>
  }

  /**
   * Genre createMany
   */
  export type GenreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Genres.
     */
    data: GenreCreateManyInput | GenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Genre update
   */
  export type GenreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The data needed to update a Genre.
     */
    data: XOR<GenreUpdateInput, GenreUncheckedUpdateInput>
    /**
     * Choose, which Genre to update.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre updateMany
   */
  export type GenreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Genres.
     */
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyInput>
    /**
     * Filter which Genres to update
     */
    where?: GenreWhereInput
    /**
     * Limit how many Genres to update.
     */
    limit?: number
  }

  /**
   * Genre upsert
   */
  export type GenreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The filter to search for the Genre to update in case it exists.
     */
    where: GenreWhereUniqueInput
    /**
     * In case the Genre found by the `where` argument doesn't exist, create a new Genre with this data.
     */
    create: XOR<GenreCreateInput, GenreUncheckedCreateInput>
    /**
     * In case the Genre was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GenreUpdateInput, GenreUncheckedUpdateInput>
  }

  /**
   * Genre delete
   */
  export type GenreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter which Genre to delete.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre deleteMany
   */
  export type GenreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Genres to delete
     */
    where?: GenreWhereInput
    /**
     * Limit how many Genres to delete.
     */
    limit?: number
  }

  /**
   * Genre.musicianGenres
   */
  export type Genre$musicianGenresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianGenre
     */
    select?: MusicianGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianGenre
     */
    omit?: MusicianGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianGenreInclude<ExtArgs> | null
    where?: MusicianGenreWhereInput
    orderBy?: MusicianGenreOrderByWithRelationInput | MusicianGenreOrderByWithRelationInput[]
    cursor?: MusicianGenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MusicianGenreScalarFieldEnum | MusicianGenreScalarFieldEnum[]
  }

  /**
   * Genre without action
   */
  export type GenreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
  }


  /**
   * Model Instrument
   */

  export type AggregateInstrument = {
    _count: InstrumentCountAggregateOutputType | null
    _avg: InstrumentAvgAggregateOutputType | null
    _sum: InstrumentSumAggregateOutputType | null
    _min: InstrumentMinAggregateOutputType | null
    _max: InstrumentMaxAggregateOutputType | null
  }

  export type InstrumentAvgAggregateOutputType = {
    id: number | null
  }

  export type InstrumentSumAggregateOutputType = {
    id: number | null
  }

  export type InstrumentMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
  }

  export type InstrumentMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
  }

  export type InstrumentCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    _all: number
  }


  export type InstrumentAvgAggregateInputType = {
    id?: true
  }

  export type InstrumentSumAggregateInputType = {
    id?: true
  }

  export type InstrumentMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type InstrumentMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type InstrumentCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    _all?: true
  }

  export type InstrumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Instrument to aggregate.
     */
    where?: InstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instruments to fetch.
     */
    orderBy?: InstrumentOrderByWithRelationInput | InstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instruments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Instruments
    **/
    _count?: true | InstrumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstrumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstrumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstrumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstrumentMaxAggregateInputType
  }

  export type GetInstrumentAggregateType<T extends InstrumentAggregateArgs> = {
        [P in keyof T & keyof AggregateInstrument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstrument[P]>
      : GetScalarType<T[P], AggregateInstrument[P]>
  }




  export type InstrumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstrumentWhereInput
    orderBy?: InstrumentOrderByWithAggregationInput | InstrumentOrderByWithAggregationInput[]
    by: InstrumentScalarFieldEnum[] | InstrumentScalarFieldEnum
    having?: InstrumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstrumentCountAggregateInputType | true
    _avg?: InstrumentAvgAggregateInputType
    _sum?: InstrumentSumAggregateInputType
    _min?: InstrumentMinAggregateInputType
    _max?: InstrumentMaxAggregateInputType
  }

  export type InstrumentGroupByOutputType = {
    id: number
    name: string
    slug: string
    _count: InstrumentCountAggregateOutputType | null
    _avg: InstrumentAvgAggregateOutputType | null
    _sum: InstrumentSumAggregateOutputType | null
    _min: InstrumentMinAggregateOutputType | null
    _max: InstrumentMaxAggregateOutputType | null
  }

  type GetInstrumentGroupByPayload<T extends InstrumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstrumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstrumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstrumentGroupByOutputType[P]>
            : GetScalarType<T[P], InstrumentGroupByOutputType[P]>
        }
      >
    >


  export type InstrumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    musicianInstruments?: boolean | Instrument$musicianInstrumentsArgs<ExtArgs>
    _count?: boolean | InstrumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["instrument"]>



  export type InstrumentSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
  }

  export type InstrumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug", ExtArgs["result"]["instrument"]>
  export type InstrumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    musicianInstruments?: boolean | Instrument$musicianInstrumentsArgs<ExtArgs>
    _count?: boolean | InstrumentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $InstrumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Instrument"
    objects: {
      musicianInstruments: Prisma.$MusicianInstrumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
    }, ExtArgs["result"]["instrument"]>
    composites: {}
  }

  type InstrumentGetPayload<S extends boolean | null | undefined | InstrumentDefaultArgs> = $Result.GetResult<Prisma.$InstrumentPayload, S>

  type InstrumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InstrumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InstrumentCountAggregateInputType | true
    }

  export interface InstrumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Instrument'], meta: { name: 'Instrument' } }
    /**
     * Find zero or one Instrument that matches the filter.
     * @param {InstrumentFindUniqueArgs} args - Arguments to find a Instrument
     * @example
     * // Get one Instrument
     * const instrument = await prisma.instrument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstrumentFindUniqueArgs>(args: SelectSubset<T, InstrumentFindUniqueArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Instrument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InstrumentFindUniqueOrThrowArgs} args - Arguments to find a Instrument
     * @example
     * // Get one Instrument
     * const instrument = await prisma.instrument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstrumentFindUniqueOrThrowArgs>(args: SelectSubset<T, InstrumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Instrument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentFindFirstArgs} args - Arguments to find a Instrument
     * @example
     * // Get one Instrument
     * const instrument = await prisma.instrument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstrumentFindFirstArgs>(args?: SelectSubset<T, InstrumentFindFirstArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Instrument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentFindFirstOrThrowArgs} args - Arguments to find a Instrument
     * @example
     * // Get one Instrument
     * const instrument = await prisma.instrument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstrumentFindFirstOrThrowArgs>(args?: SelectSubset<T, InstrumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Instruments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Instruments
     * const instruments = await prisma.instrument.findMany()
     * 
     * // Get first 10 Instruments
     * const instruments = await prisma.instrument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const instrumentWithIdOnly = await prisma.instrument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstrumentFindManyArgs>(args?: SelectSubset<T, InstrumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Instrument.
     * @param {InstrumentCreateArgs} args - Arguments to create a Instrument.
     * @example
     * // Create one Instrument
     * const Instrument = await prisma.instrument.create({
     *   data: {
     *     // ... data to create a Instrument
     *   }
     * })
     * 
     */
    create<T extends InstrumentCreateArgs>(args: SelectSubset<T, InstrumentCreateArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Instruments.
     * @param {InstrumentCreateManyArgs} args - Arguments to create many Instruments.
     * @example
     * // Create many Instruments
     * const instrument = await prisma.instrument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstrumentCreateManyArgs>(args?: SelectSubset<T, InstrumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Instrument.
     * @param {InstrumentDeleteArgs} args - Arguments to delete one Instrument.
     * @example
     * // Delete one Instrument
     * const Instrument = await prisma.instrument.delete({
     *   where: {
     *     // ... filter to delete one Instrument
     *   }
     * })
     * 
     */
    delete<T extends InstrumentDeleteArgs>(args: SelectSubset<T, InstrumentDeleteArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Instrument.
     * @param {InstrumentUpdateArgs} args - Arguments to update one Instrument.
     * @example
     * // Update one Instrument
     * const instrument = await prisma.instrument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstrumentUpdateArgs>(args: SelectSubset<T, InstrumentUpdateArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Instruments.
     * @param {InstrumentDeleteManyArgs} args - Arguments to filter Instruments to delete.
     * @example
     * // Delete a few Instruments
     * const { count } = await prisma.instrument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstrumentDeleteManyArgs>(args?: SelectSubset<T, InstrumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Instruments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Instruments
     * const instrument = await prisma.instrument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstrumentUpdateManyArgs>(args: SelectSubset<T, InstrumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Instrument.
     * @param {InstrumentUpsertArgs} args - Arguments to update or create a Instrument.
     * @example
     * // Update or create a Instrument
     * const instrument = await prisma.instrument.upsert({
     *   create: {
     *     // ... data to create a Instrument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Instrument we want to update
     *   }
     * })
     */
    upsert<T extends InstrumentUpsertArgs>(args: SelectSubset<T, InstrumentUpsertArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Instruments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentCountArgs} args - Arguments to filter Instruments to count.
     * @example
     * // Count the number of Instruments
     * const count = await prisma.instrument.count({
     *   where: {
     *     // ... the filter for the Instruments we want to count
     *   }
     * })
    **/
    count<T extends InstrumentCountArgs>(
      args?: Subset<T, InstrumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstrumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Instrument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstrumentAggregateArgs>(args: Subset<T, InstrumentAggregateArgs>): Prisma.PrismaPromise<GetInstrumentAggregateType<T>>

    /**
     * Group by Instrument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstrumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstrumentGroupByArgs['orderBy'] }
        : { orderBy?: InstrumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstrumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstrumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Instrument model
   */
  readonly fields: InstrumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Instrument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstrumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    musicianInstruments<T extends Instrument$musicianInstrumentsArgs<ExtArgs> = {}>(args?: Subset<T, Instrument$musicianInstrumentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicianInstrumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Instrument model
   */
  interface InstrumentFieldRefs {
    readonly id: FieldRef<"Instrument", 'Int'>
    readonly name: FieldRef<"Instrument", 'String'>
    readonly slug: FieldRef<"Instrument", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Instrument findUnique
   */
  export type InstrumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instrument
     */
    omit?: InstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instrument to fetch.
     */
    where: InstrumentWhereUniqueInput
  }

  /**
   * Instrument findUniqueOrThrow
   */
  export type InstrumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instrument
     */
    omit?: InstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instrument to fetch.
     */
    where: InstrumentWhereUniqueInput
  }

  /**
   * Instrument findFirst
   */
  export type InstrumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instrument
     */
    omit?: InstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instrument to fetch.
     */
    where?: InstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instruments to fetch.
     */
    orderBy?: InstrumentOrderByWithRelationInput | InstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instruments.
     */
    cursor?: InstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instruments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instruments.
     */
    distinct?: InstrumentScalarFieldEnum | InstrumentScalarFieldEnum[]
  }

  /**
   * Instrument findFirstOrThrow
   */
  export type InstrumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instrument
     */
    omit?: InstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instrument to fetch.
     */
    where?: InstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instruments to fetch.
     */
    orderBy?: InstrumentOrderByWithRelationInput | InstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instruments.
     */
    cursor?: InstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instruments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instruments.
     */
    distinct?: InstrumentScalarFieldEnum | InstrumentScalarFieldEnum[]
  }

  /**
   * Instrument findMany
   */
  export type InstrumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instrument
     */
    omit?: InstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instruments to fetch.
     */
    where?: InstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instruments to fetch.
     */
    orderBy?: InstrumentOrderByWithRelationInput | InstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Instruments.
     */
    cursor?: InstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instruments.
     */
    skip?: number
    distinct?: InstrumentScalarFieldEnum | InstrumentScalarFieldEnum[]
  }

  /**
   * Instrument create
   */
  export type InstrumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instrument
     */
    omit?: InstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Instrument.
     */
    data: XOR<InstrumentCreateInput, InstrumentUncheckedCreateInput>
  }

  /**
   * Instrument createMany
   */
  export type InstrumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Instruments.
     */
    data: InstrumentCreateManyInput | InstrumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Instrument update
   */
  export type InstrumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instrument
     */
    omit?: InstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Instrument.
     */
    data: XOR<InstrumentUpdateInput, InstrumentUncheckedUpdateInput>
    /**
     * Choose, which Instrument to update.
     */
    where: InstrumentWhereUniqueInput
  }

  /**
   * Instrument updateMany
   */
  export type InstrumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Instruments.
     */
    data: XOR<InstrumentUpdateManyMutationInput, InstrumentUncheckedUpdateManyInput>
    /**
     * Filter which Instruments to update
     */
    where?: InstrumentWhereInput
    /**
     * Limit how many Instruments to update.
     */
    limit?: number
  }

  /**
   * Instrument upsert
   */
  export type InstrumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instrument
     */
    omit?: InstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Instrument to update in case it exists.
     */
    where: InstrumentWhereUniqueInput
    /**
     * In case the Instrument found by the `where` argument doesn't exist, create a new Instrument with this data.
     */
    create: XOR<InstrumentCreateInput, InstrumentUncheckedCreateInput>
    /**
     * In case the Instrument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstrumentUpdateInput, InstrumentUncheckedUpdateInput>
  }

  /**
   * Instrument delete
   */
  export type InstrumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instrument
     */
    omit?: InstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter which Instrument to delete.
     */
    where: InstrumentWhereUniqueInput
  }

  /**
   * Instrument deleteMany
   */
  export type InstrumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Instruments to delete
     */
    where?: InstrumentWhereInput
    /**
     * Limit how many Instruments to delete.
     */
    limit?: number
  }

  /**
   * Instrument.musicianInstruments
   */
  export type Instrument$musicianInstrumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianInstrument
     */
    select?: MusicianInstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianInstrument
     */
    omit?: MusicianInstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianInstrumentInclude<ExtArgs> | null
    where?: MusicianInstrumentWhereInput
    orderBy?: MusicianInstrumentOrderByWithRelationInput | MusicianInstrumentOrderByWithRelationInput[]
    cursor?: MusicianInstrumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MusicianInstrumentScalarFieldEnum | MusicianInstrumentScalarFieldEnum[]
  }

  /**
   * Instrument without action
   */
  export type InstrumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instrument
     */
    omit?: InstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
  }


  /**
   * Model MusicianGenre
   */

  export type AggregateMusicianGenre = {
    _count: MusicianGenreCountAggregateOutputType | null
    _avg: MusicianGenreAvgAggregateOutputType | null
    _sum: MusicianGenreSumAggregateOutputType | null
    _min: MusicianGenreMinAggregateOutputType | null
    _max: MusicianGenreMaxAggregateOutputType | null
  }

  export type MusicianGenreAvgAggregateOutputType = {
    musicianProfileId: number | null
    genreId: number | null
  }

  export type MusicianGenreSumAggregateOutputType = {
    musicianProfileId: number | null
    genreId: number | null
  }

  export type MusicianGenreMinAggregateOutputType = {
    musicianProfileId: number | null
    genreId: number | null
  }

  export type MusicianGenreMaxAggregateOutputType = {
    musicianProfileId: number | null
    genreId: number | null
  }

  export type MusicianGenreCountAggregateOutputType = {
    musicianProfileId: number
    genreId: number
    _all: number
  }


  export type MusicianGenreAvgAggregateInputType = {
    musicianProfileId?: true
    genreId?: true
  }

  export type MusicianGenreSumAggregateInputType = {
    musicianProfileId?: true
    genreId?: true
  }

  export type MusicianGenreMinAggregateInputType = {
    musicianProfileId?: true
    genreId?: true
  }

  export type MusicianGenreMaxAggregateInputType = {
    musicianProfileId?: true
    genreId?: true
  }

  export type MusicianGenreCountAggregateInputType = {
    musicianProfileId?: true
    genreId?: true
    _all?: true
  }

  export type MusicianGenreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MusicianGenre to aggregate.
     */
    where?: MusicianGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicianGenres to fetch.
     */
    orderBy?: MusicianGenreOrderByWithRelationInput | MusicianGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MusicianGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicianGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicianGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MusicianGenres
    **/
    _count?: true | MusicianGenreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MusicianGenreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MusicianGenreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MusicianGenreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MusicianGenreMaxAggregateInputType
  }

  export type GetMusicianGenreAggregateType<T extends MusicianGenreAggregateArgs> = {
        [P in keyof T & keyof AggregateMusicianGenre]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMusicianGenre[P]>
      : GetScalarType<T[P], AggregateMusicianGenre[P]>
  }




  export type MusicianGenreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MusicianGenreWhereInput
    orderBy?: MusicianGenreOrderByWithAggregationInput | MusicianGenreOrderByWithAggregationInput[]
    by: MusicianGenreScalarFieldEnum[] | MusicianGenreScalarFieldEnum
    having?: MusicianGenreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MusicianGenreCountAggregateInputType | true
    _avg?: MusicianGenreAvgAggregateInputType
    _sum?: MusicianGenreSumAggregateInputType
    _min?: MusicianGenreMinAggregateInputType
    _max?: MusicianGenreMaxAggregateInputType
  }

  export type MusicianGenreGroupByOutputType = {
    musicianProfileId: number
    genreId: number
    _count: MusicianGenreCountAggregateOutputType | null
    _avg: MusicianGenreAvgAggregateOutputType | null
    _sum: MusicianGenreSumAggregateOutputType | null
    _min: MusicianGenreMinAggregateOutputType | null
    _max: MusicianGenreMaxAggregateOutputType | null
  }

  type GetMusicianGenreGroupByPayload<T extends MusicianGenreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MusicianGenreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MusicianGenreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MusicianGenreGroupByOutputType[P]>
            : GetScalarType<T[P], MusicianGenreGroupByOutputType[P]>
        }
      >
    >


  export type MusicianGenreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    musicianProfileId?: boolean
    genreId?: boolean
    musicianProfile?: boolean | MusicianProfileDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["musicianGenre"]>



  export type MusicianGenreSelectScalar = {
    musicianProfileId?: boolean
    genreId?: boolean
  }

  export type MusicianGenreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"musicianProfileId" | "genreId", ExtArgs["result"]["musicianGenre"]>
  export type MusicianGenreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    musicianProfile?: boolean | MusicianProfileDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }

  export type $MusicianGenrePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MusicianGenre"
    objects: {
      musicianProfile: Prisma.$MusicianProfilePayload<ExtArgs>
      genre: Prisma.$GenrePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      musicianProfileId: number
      genreId: number
    }, ExtArgs["result"]["musicianGenre"]>
    composites: {}
  }

  type MusicianGenreGetPayload<S extends boolean | null | undefined | MusicianGenreDefaultArgs> = $Result.GetResult<Prisma.$MusicianGenrePayload, S>

  type MusicianGenreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MusicianGenreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MusicianGenreCountAggregateInputType | true
    }

  export interface MusicianGenreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MusicianGenre'], meta: { name: 'MusicianGenre' } }
    /**
     * Find zero or one MusicianGenre that matches the filter.
     * @param {MusicianGenreFindUniqueArgs} args - Arguments to find a MusicianGenre
     * @example
     * // Get one MusicianGenre
     * const musicianGenre = await prisma.musicianGenre.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MusicianGenreFindUniqueArgs>(args: SelectSubset<T, MusicianGenreFindUniqueArgs<ExtArgs>>): Prisma__MusicianGenreClient<$Result.GetResult<Prisma.$MusicianGenrePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MusicianGenre that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MusicianGenreFindUniqueOrThrowArgs} args - Arguments to find a MusicianGenre
     * @example
     * // Get one MusicianGenre
     * const musicianGenre = await prisma.musicianGenre.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MusicianGenreFindUniqueOrThrowArgs>(args: SelectSubset<T, MusicianGenreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MusicianGenreClient<$Result.GetResult<Prisma.$MusicianGenrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MusicianGenre that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianGenreFindFirstArgs} args - Arguments to find a MusicianGenre
     * @example
     * // Get one MusicianGenre
     * const musicianGenre = await prisma.musicianGenre.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MusicianGenreFindFirstArgs>(args?: SelectSubset<T, MusicianGenreFindFirstArgs<ExtArgs>>): Prisma__MusicianGenreClient<$Result.GetResult<Prisma.$MusicianGenrePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MusicianGenre that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianGenreFindFirstOrThrowArgs} args - Arguments to find a MusicianGenre
     * @example
     * // Get one MusicianGenre
     * const musicianGenre = await prisma.musicianGenre.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MusicianGenreFindFirstOrThrowArgs>(args?: SelectSubset<T, MusicianGenreFindFirstOrThrowArgs<ExtArgs>>): Prisma__MusicianGenreClient<$Result.GetResult<Prisma.$MusicianGenrePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MusicianGenres that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianGenreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MusicianGenres
     * const musicianGenres = await prisma.musicianGenre.findMany()
     * 
     * // Get first 10 MusicianGenres
     * const musicianGenres = await prisma.musicianGenre.findMany({ take: 10 })
     * 
     * // Only select the `musicianProfileId`
     * const musicianGenreWithMusicianProfileIdOnly = await prisma.musicianGenre.findMany({ select: { musicianProfileId: true } })
     * 
     */
    findMany<T extends MusicianGenreFindManyArgs>(args?: SelectSubset<T, MusicianGenreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicianGenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MusicianGenre.
     * @param {MusicianGenreCreateArgs} args - Arguments to create a MusicianGenre.
     * @example
     * // Create one MusicianGenre
     * const MusicianGenre = await prisma.musicianGenre.create({
     *   data: {
     *     // ... data to create a MusicianGenre
     *   }
     * })
     * 
     */
    create<T extends MusicianGenreCreateArgs>(args: SelectSubset<T, MusicianGenreCreateArgs<ExtArgs>>): Prisma__MusicianGenreClient<$Result.GetResult<Prisma.$MusicianGenrePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MusicianGenres.
     * @param {MusicianGenreCreateManyArgs} args - Arguments to create many MusicianGenres.
     * @example
     * // Create many MusicianGenres
     * const musicianGenre = await prisma.musicianGenre.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MusicianGenreCreateManyArgs>(args?: SelectSubset<T, MusicianGenreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MusicianGenre.
     * @param {MusicianGenreDeleteArgs} args - Arguments to delete one MusicianGenre.
     * @example
     * // Delete one MusicianGenre
     * const MusicianGenre = await prisma.musicianGenre.delete({
     *   where: {
     *     // ... filter to delete one MusicianGenre
     *   }
     * })
     * 
     */
    delete<T extends MusicianGenreDeleteArgs>(args: SelectSubset<T, MusicianGenreDeleteArgs<ExtArgs>>): Prisma__MusicianGenreClient<$Result.GetResult<Prisma.$MusicianGenrePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MusicianGenre.
     * @param {MusicianGenreUpdateArgs} args - Arguments to update one MusicianGenre.
     * @example
     * // Update one MusicianGenre
     * const musicianGenre = await prisma.musicianGenre.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MusicianGenreUpdateArgs>(args: SelectSubset<T, MusicianGenreUpdateArgs<ExtArgs>>): Prisma__MusicianGenreClient<$Result.GetResult<Prisma.$MusicianGenrePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MusicianGenres.
     * @param {MusicianGenreDeleteManyArgs} args - Arguments to filter MusicianGenres to delete.
     * @example
     * // Delete a few MusicianGenres
     * const { count } = await prisma.musicianGenre.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MusicianGenreDeleteManyArgs>(args?: SelectSubset<T, MusicianGenreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MusicianGenres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianGenreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MusicianGenres
     * const musicianGenre = await prisma.musicianGenre.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MusicianGenreUpdateManyArgs>(args: SelectSubset<T, MusicianGenreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MusicianGenre.
     * @param {MusicianGenreUpsertArgs} args - Arguments to update or create a MusicianGenre.
     * @example
     * // Update or create a MusicianGenre
     * const musicianGenre = await prisma.musicianGenre.upsert({
     *   create: {
     *     // ... data to create a MusicianGenre
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MusicianGenre we want to update
     *   }
     * })
     */
    upsert<T extends MusicianGenreUpsertArgs>(args: SelectSubset<T, MusicianGenreUpsertArgs<ExtArgs>>): Prisma__MusicianGenreClient<$Result.GetResult<Prisma.$MusicianGenrePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MusicianGenres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianGenreCountArgs} args - Arguments to filter MusicianGenres to count.
     * @example
     * // Count the number of MusicianGenres
     * const count = await prisma.musicianGenre.count({
     *   where: {
     *     // ... the filter for the MusicianGenres we want to count
     *   }
     * })
    **/
    count<T extends MusicianGenreCountArgs>(
      args?: Subset<T, MusicianGenreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MusicianGenreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MusicianGenre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianGenreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MusicianGenreAggregateArgs>(args: Subset<T, MusicianGenreAggregateArgs>): Prisma.PrismaPromise<GetMusicianGenreAggregateType<T>>

    /**
     * Group by MusicianGenre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianGenreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MusicianGenreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MusicianGenreGroupByArgs['orderBy'] }
        : { orderBy?: MusicianGenreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MusicianGenreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMusicianGenreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MusicianGenre model
   */
  readonly fields: MusicianGenreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MusicianGenre.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MusicianGenreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    musicianProfile<T extends MusicianProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MusicianProfileDefaultArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    genre<T extends GenreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GenreDefaultArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MusicianGenre model
   */
  interface MusicianGenreFieldRefs {
    readonly musicianProfileId: FieldRef<"MusicianGenre", 'Int'>
    readonly genreId: FieldRef<"MusicianGenre", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MusicianGenre findUnique
   */
  export type MusicianGenreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianGenre
     */
    select?: MusicianGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianGenre
     */
    omit?: MusicianGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianGenreInclude<ExtArgs> | null
    /**
     * Filter, which MusicianGenre to fetch.
     */
    where: MusicianGenreWhereUniqueInput
  }

  /**
   * MusicianGenre findUniqueOrThrow
   */
  export type MusicianGenreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianGenre
     */
    select?: MusicianGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianGenre
     */
    omit?: MusicianGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianGenreInclude<ExtArgs> | null
    /**
     * Filter, which MusicianGenre to fetch.
     */
    where: MusicianGenreWhereUniqueInput
  }

  /**
   * MusicianGenre findFirst
   */
  export type MusicianGenreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianGenre
     */
    select?: MusicianGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianGenre
     */
    omit?: MusicianGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianGenreInclude<ExtArgs> | null
    /**
     * Filter, which MusicianGenre to fetch.
     */
    where?: MusicianGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicianGenres to fetch.
     */
    orderBy?: MusicianGenreOrderByWithRelationInput | MusicianGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MusicianGenres.
     */
    cursor?: MusicianGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicianGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicianGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MusicianGenres.
     */
    distinct?: MusicianGenreScalarFieldEnum | MusicianGenreScalarFieldEnum[]
  }

  /**
   * MusicianGenre findFirstOrThrow
   */
  export type MusicianGenreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianGenre
     */
    select?: MusicianGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianGenre
     */
    omit?: MusicianGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianGenreInclude<ExtArgs> | null
    /**
     * Filter, which MusicianGenre to fetch.
     */
    where?: MusicianGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicianGenres to fetch.
     */
    orderBy?: MusicianGenreOrderByWithRelationInput | MusicianGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MusicianGenres.
     */
    cursor?: MusicianGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicianGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicianGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MusicianGenres.
     */
    distinct?: MusicianGenreScalarFieldEnum | MusicianGenreScalarFieldEnum[]
  }

  /**
   * MusicianGenre findMany
   */
  export type MusicianGenreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianGenre
     */
    select?: MusicianGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianGenre
     */
    omit?: MusicianGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianGenreInclude<ExtArgs> | null
    /**
     * Filter, which MusicianGenres to fetch.
     */
    where?: MusicianGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicianGenres to fetch.
     */
    orderBy?: MusicianGenreOrderByWithRelationInput | MusicianGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MusicianGenres.
     */
    cursor?: MusicianGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicianGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicianGenres.
     */
    skip?: number
    distinct?: MusicianGenreScalarFieldEnum | MusicianGenreScalarFieldEnum[]
  }

  /**
   * MusicianGenre create
   */
  export type MusicianGenreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianGenre
     */
    select?: MusicianGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianGenre
     */
    omit?: MusicianGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianGenreInclude<ExtArgs> | null
    /**
     * The data needed to create a MusicianGenre.
     */
    data: XOR<MusicianGenreCreateInput, MusicianGenreUncheckedCreateInput>
  }

  /**
   * MusicianGenre createMany
   */
  export type MusicianGenreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MusicianGenres.
     */
    data: MusicianGenreCreateManyInput | MusicianGenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MusicianGenre update
   */
  export type MusicianGenreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianGenre
     */
    select?: MusicianGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianGenre
     */
    omit?: MusicianGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianGenreInclude<ExtArgs> | null
    /**
     * The data needed to update a MusicianGenre.
     */
    data: XOR<MusicianGenreUpdateInput, MusicianGenreUncheckedUpdateInput>
    /**
     * Choose, which MusicianGenre to update.
     */
    where: MusicianGenreWhereUniqueInput
  }

  /**
   * MusicianGenre updateMany
   */
  export type MusicianGenreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MusicianGenres.
     */
    data: XOR<MusicianGenreUpdateManyMutationInput, MusicianGenreUncheckedUpdateManyInput>
    /**
     * Filter which MusicianGenres to update
     */
    where?: MusicianGenreWhereInput
    /**
     * Limit how many MusicianGenres to update.
     */
    limit?: number
  }

  /**
   * MusicianGenre upsert
   */
  export type MusicianGenreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianGenre
     */
    select?: MusicianGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianGenre
     */
    omit?: MusicianGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianGenreInclude<ExtArgs> | null
    /**
     * The filter to search for the MusicianGenre to update in case it exists.
     */
    where: MusicianGenreWhereUniqueInput
    /**
     * In case the MusicianGenre found by the `where` argument doesn't exist, create a new MusicianGenre with this data.
     */
    create: XOR<MusicianGenreCreateInput, MusicianGenreUncheckedCreateInput>
    /**
     * In case the MusicianGenre was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MusicianGenreUpdateInput, MusicianGenreUncheckedUpdateInput>
  }

  /**
   * MusicianGenre delete
   */
  export type MusicianGenreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianGenre
     */
    select?: MusicianGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianGenre
     */
    omit?: MusicianGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianGenreInclude<ExtArgs> | null
    /**
     * Filter which MusicianGenre to delete.
     */
    where: MusicianGenreWhereUniqueInput
  }

  /**
   * MusicianGenre deleteMany
   */
  export type MusicianGenreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MusicianGenres to delete
     */
    where?: MusicianGenreWhereInput
    /**
     * Limit how many MusicianGenres to delete.
     */
    limit?: number
  }

  /**
   * MusicianGenre without action
   */
  export type MusicianGenreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianGenre
     */
    select?: MusicianGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianGenre
     */
    omit?: MusicianGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianGenreInclude<ExtArgs> | null
  }


  /**
   * Model MusicianInstrument
   */

  export type AggregateMusicianInstrument = {
    _count: MusicianInstrumentCountAggregateOutputType | null
    _avg: MusicianInstrumentAvgAggregateOutputType | null
    _sum: MusicianInstrumentSumAggregateOutputType | null
    _min: MusicianInstrumentMinAggregateOutputType | null
    _max: MusicianInstrumentMaxAggregateOutputType | null
  }

  export type MusicianInstrumentAvgAggregateOutputType = {
    musicianProfileId: number | null
    instrumentId: number | null
  }

  export type MusicianInstrumentSumAggregateOutputType = {
    musicianProfileId: number | null
    instrumentId: number | null
  }

  export type MusicianInstrumentMinAggregateOutputType = {
    musicianProfileId: number | null
    instrumentId: number | null
  }

  export type MusicianInstrumentMaxAggregateOutputType = {
    musicianProfileId: number | null
    instrumentId: number | null
  }

  export type MusicianInstrumentCountAggregateOutputType = {
    musicianProfileId: number
    instrumentId: number
    _all: number
  }


  export type MusicianInstrumentAvgAggregateInputType = {
    musicianProfileId?: true
    instrumentId?: true
  }

  export type MusicianInstrumentSumAggregateInputType = {
    musicianProfileId?: true
    instrumentId?: true
  }

  export type MusicianInstrumentMinAggregateInputType = {
    musicianProfileId?: true
    instrumentId?: true
  }

  export type MusicianInstrumentMaxAggregateInputType = {
    musicianProfileId?: true
    instrumentId?: true
  }

  export type MusicianInstrumentCountAggregateInputType = {
    musicianProfileId?: true
    instrumentId?: true
    _all?: true
  }

  export type MusicianInstrumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MusicianInstrument to aggregate.
     */
    where?: MusicianInstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicianInstruments to fetch.
     */
    orderBy?: MusicianInstrumentOrderByWithRelationInput | MusicianInstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MusicianInstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicianInstruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicianInstruments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MusicianInstruments
    **/
    _count?: true | MusicianInstrumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MusicianInstrumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MusicianInstrumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MusicianInstrumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MusicianInstrumentMaxAggregateInputType
  }

  export type GetMusicianInstrumentAggregateType<T extends MusicianInstrumentAggregateArgs> = {
        [P in keyof T & keyof AggregateMusicianInstrument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMusicianInstrument[P]>
      : GetScalarType<T[P], AggregateMusicianInstrument[P]>
  }




  export type MusicianInstrumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MusicianInstrumentWhereInput
    orderBy?: MusicianInstrumentOrderByWithAggregationInput | MusicianInstrumentOrderByWithAggregationInput[]
    by: MusicianInstrumentScalarFieldEnum[] | MusicianInstrumentScalarFieldEnum
    having?: MusicianInstrumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MusicianInstrumentCountAggregateInputType | true
    _avg?: MusicianInstrumentAvgAggregateInputType
    _sum?: MusicianInstrumentSumAggregateInputType
    _min?: MusicianInstrumentMinAggregateInputType
    _max?: MusicianInstrumentMaxAggregateInputType
  }

  export type MusicianInstrumentGroupByOutputType = {
    musicianProfileId: number
    instrumentId: number
    _count: MusicianInstrumentCountAggregateOutputType | null
    _avg: MusicianInstrumentAvgAggregateOutputType | null
    _sum: MusicianInstrumentSumAggregateOutputType | null
    _min: MusicianInstrumentMinAggregateOutputType | null
    _max: MusicianInstrumentMaxAggregateOutputType | null
  }

  type GetMusicianInstrumentGroupByPayload<T extends MusicianInstrumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MusicianInstrumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MusicianInstrumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MusicianInstrumentGroupByOutputType[P]>
            : GetScalarType<T[P], MusicianInstrumentGroupByOutputType[P]>
        }
      >
    >


  export type MusicianInstrumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    musicianProfileId?: boolean
    instrumentId?: boolean
    musicianProfile?: boolean | MusicianProfileDefaultArgs<ExtArgs>
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["musicianInstrument"]>



  export type MusicianInstrumentSelectScalar = {
    musicianProfileId?: boolean
    instrumentId?: boolean
  }

  export type MusicianInstrumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"musicianProfileId" | "instrumentId", ExtArgs["result"]["musicianInstrument"]>
  export type MusicianInstrumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    musicianProfile?: boolean | MusicianProfileDefaultArgs<ExtArgs>
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }

  export type $MusicianInstrumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MusicianInstrument"
    objects: {
      musicianProfile: Prisma.$MusicianProfilePayload<ExtArgs>
      instrument: Prisma.$InstrumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      musicianProfileId: number
      instrumentId: number
    }, ExtArgs["result"]["musicianInstrument"]>
    composites: {}
  }

  type MusicianInstrumentGetPayload<S extends boolean | null | undefined | MusicianInstrumentDefaultArgs> = $Result.GetResult<Prisma.$MusicianInstrumentPayload, S>

  type MusicianInstrumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MusicianInstrumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MusicianInstrumentCountAggregateInputType | true
    }

  export interface MusicianInstrumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MusicianInstrument'], meta: { name: 'MusicianInstrument' } }
    /**
     * Find zero or one MusicianInstrument that matches the filter.
     * @param {MusicianInstrumentFindUniqueArgs} args - Arguments to find a MusicianInstrument
     * @example
     * // Get one MusicianInstrument
     * const musicianInstrument = await prisma.musicianInstrument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MusicianInstrumentFindUniqueArgs>(args: SelectSubset<T, MusicianInstrumentFindUniqueArgs<ExtArgs>>): Prisma__MusicianInstrumentClient<$Result.GetResult<Prisma.$MusicianInstrumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MusicianInstrument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MusicianInstrumentFindUniqueOrThrowArgs} args - Arguments to find a MusicianInstrument
     * @example
     * // Get one MusicianInstrument
     * const musicianInstrument = await prisma.musicianInstrument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MusicianInstrumentFindUniqueOrThrowArgs>(args: SelectSubset<T, MusicianInstrumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MusicianInstrumentClient<$Result.GetResult<Prisma.$MusicianInstrumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MusicianInstrument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianInstrumentFindFirstArgs} args - Arguments to find a MusicianInstrument
     * @example
     * // Get one MusicianInstrument
     * const musicianInstrument = await prisma.musicianInstrument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MusicianInstrumentFindFirstArgs>(args?: SelectSubset<T, MusicianInstrumentFindFirstArgs<ExtArgs>>): Prisma__MusicianInstrumentClient<$Result.GetResult<Prisma.$MusicianInstrumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MusicianInstrument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianInstrumentFindFirstOrThrowArgs} args - Arguments to find a MusicianInstrument
     * @example
     * // Get one MusicianInstrument
     * const musicianInstrument = await prisma.musicianInstrument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MusicianInstrumentFindFirstOrThrowArgs>(args?: SelectSubset<T, MusicianInstrumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__MusicianInstrumentClient<$Result.GetResult<Prisma.$MusicianInstrumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MusicianInstruments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianInstrumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MusicianInstruments
     * const musicianInstruments = await prisma.musicianInstrument.findMany()
     * 
     * // Get first 10 MusicianInstruments
     * const musicianInstruments = await prisma.musicianInstrument.findMany({ take: 10 })
     * 
     * // Only select the `musicianProfileId`
     * const musicianInstrumentWithMusicianProfileIdOnly = await prisma.musicianInstrument.findMany({ select: { musicianProfileId: true } })
     * 
     */
    findMany<T extends MusicianInstrumentFindManyArgs>(args?: SelectSubset<T, MusicianInstrumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicianInstrumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MusicianInstrument.
     * @param {MusicianInstrumentCreateArgs} args - Arguments to create a MusicianInstrument.
     * @example
     * // Create one MusicianInstrument
     * const MusicianInstrument = await prisma.musicianInstrument.create({
     *   data: {
     *     // ... data to create a MusicianInstrument
     *   }
     * })
     * 
     */
    create<T extends MusicianInstrumentCreateArgs>(args: SelectSubset<T, MusicianInstrumentCreateArgs<ExtArgs>>): Prisma__MusicianInstrumentClient<$Result.GetResult<Prisma.$MusicianInstrumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MusicianInstruments.
     * @param {MusicianInstrumentCreateManyArgs} args - Arguments to create many MusicianInstruments.
     * @example
     * // Create many MusicianInstruments
     * const musicianInstrument = await prisma.musicianInstrument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MusicianInstrumentCreateManyArgs>(args?: SelectSubset<T, MusicianInstrumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MusicianInstrument.
     * @param {MusicianInstrumentDeleteArgs} args - Arguments to delete one MusicianInstrument.
     * @example
     * // Delete one MusicianInstrument
     * const MusicianInstrument = await prisma.musicianInstrument.delete({
     *   where: {
     *     // ... filter to delete one MusicianInstrument
     *   }
     * })
     * 
     */
    delete<T extends MusicianInstrumentDeleteArgs>(args: SelectSubset<T, MusicianInstrumentDeleteArgs<ExtArgs>>): Prisma__MusicianInstrumentClient<$Result.GetResult<Prisma.$MusicianInstrumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MusicianInstrument.
     * @param {MusicianInstrumentUpdateArgs} args - Arguments to update one MusicianInstrument.
     * @example
     * // Update one MusicianInstrument
     * const musicianInstrument = await prisma.musicianInstrument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MusicianInstrumentUpdateArgs>(args: SelectSubset<T, MusicianInstrumentUpdateArgs<ExtArgs>>): Prisma__MusicianInstrumentClient<$Result.GetResult<Prisma.$MusicianInstrumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MusicianInstruments.
     * @param {MusicianInstrumentDeleteManyArgs} args - Arguments to filter MusicianInstruments to delete.
     * @example
     * // Delete a few MusicianInstruments
     * const { count } = await prisma.musicianInstrument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MusicianInstrumentDeleteManyArgs>(args?: SelectSubset<T, MusicianInstrumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MusicianInstruments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianInstrumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MusicianInstruments
     * const musicianInstrument = await prisma.musicianInstrument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MusicianInstrumentUpdateManyArgs>(args: SelectSubset<T, MusicianInstrumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MusicianInstrument.
     * @param {MusicianInstrumentUpsertArgs} args - Arguments to update or create a MusicianInstrument.
     * @example
     * // Update or create a MusicianInstrument
     * const musicianInstrument = await prisma.musicianInstrument.upsert({
     *   create: {
     *     // ... data to create a MusicianInstrument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MusicianInstrument we want to update
     *   }
     * })
     */
    upsert<T extends MusicianInstrumentUpsertArgs>(args: SelectSubset<T, MusicianInstrumentUpsertArgs<ExtArgs>>): Prisma__MusicianInstrumentClient<$Result.GetResult<Prisma.$MusicianInstrumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MusicianInstruments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianInstrumentCountArgs} args - Arguments to filter MusicianInstruments to count.
     * @example
     * // Count the number of MusicianInstruments
     * const count = await prisma.musicianInstrument.count({
     *   where: {
     *     // ... the filter for the MusicianInstruments we want to count
     *   }
     * })
    **/
    count<T extends MusicianInstrumentCountArgs>(
      args?: Subset<T, MusicianInstrumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MusicianInstrumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MusicianInstrument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianInstrumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MusicianInstrumentAggregateArgs>(args: Subset<T, MusicianInstrumentAggregateArgs>): Prisma.PrismaPromise<GetMusicianInstrumentAggregateType<T>>

    /**
     * Group by MusicianInstrument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicianInstrumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MusicianInstrumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MusicianInstrumentGroupByArgs['orderBy'] }
        : { orderBy?: MusicianInstrumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MusicianInstrumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMusicianInstrumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MusicianInstrument model
   */
  readonly fields: MusicianInstrumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MusicianInstrument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MusicianInstrumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    musicianProfile<T extends MusicianProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MusicianProfileDefaultArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    instrument<T extends InstrumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstrumentDefaultArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MusicianInstrument model
   */
  interface MusicianInstrumentFieldRefs {
    readonly musicianProfileId: FieldRef<"MusicianInstrument", 'Int'>
    readonly instrumentId: FieldRef<"MusicianInstrument", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MusicianInstrument findUnique
   */
  export type MusicianInstrumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianInstrument
     */
    select?: MusicianInstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianInstrument
     */
    omit?: MusicianInstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianInstrumentInclude<ExtArgs> | null
    /**
     * Filter, which MusicianInstrument to fetch.
     */
    where: MusicianInstrumentWhereUniqueInput
  }

  /**
   * MusicianInstrument findUniqueOrThrow
   */
  export type MusicianInstrumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianInstrument
     */
    select?: MusicianInstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianInstrument
     */
    omit?: MusicianInstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianInstrumentInclude<ExtArgs> | null
    /**
     * Filter, which MusicianInstrument to fetch.
     */
    where: MusicianInstrumentWhereUniqueInput
  }

  /**
   * MusicianInstrument findFirst
   */
  export type MusicianInstrumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianInstrument
     */
    select?: MusicianInstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianInstrument
     */
    omit?: MusicianInstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianInstrumentInclude<ExtArgs> | null
    /**
     * Filter, which MusicianInstrument to fetch.
     */
    where?: MusicianInstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicianInstruments to fetch.
     */
    orderBy?: MusicianInstrumentOrderByWithRelationInput | MusicianInstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MusicianInstruments.
     */
    cursor?: MusicianInstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicianInstruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicianInstruments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MusicianInstruments.
     */
    distinct?: MusicianInstrumentScalarFieldEnum | MusicianInstrumentScalarFieldEnum[]
  }

  /**
   * MusicianInstrument findFirstOrThrow
   */
  export type MusicianInstrumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianInstrument
     */
    select?: MusicianInstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianInstrument
     */
    omit?: MusicianInstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianInstrumentInclude<ExtArgs> | null
    /**
     * Filter, which MusicianInstrument to fetch.
     */
    where?: MusicianInstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicianInstruments to fetch.
     */
    orderBy?: MusicianInstrumentOrderByWithRelationInput | MusicianInstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MusicianInstruments.
     */
    cursor?: MusicianInstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicianInstruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicianInstruments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MusicianInstruments.
     */
    distinct?: MusicianInstrumentScalarFieldEnum | MusicianInstrumentScalarFieldEnum[]
  }

  /**
   * MusicianInstrument findMany
   */
  export type MusicianInstrumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianInstrument
     */
    select?: MusicianInstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianInstrument
     */
    omit?: MusicianInstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianInstrumentInclude<ExtArgs> | null
    /**
     * Filter, which MusicianInstruments to fetch.
     */
    where?: MusicianInstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicianInstruments to fetch.
     */
    orderBy?: MusicianInstrumentOrderByWithRelationInput | MusicianInstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MusicianInstruments.
     */
    cursor?: MusicianInstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicianInstruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicianInstruments.
     */
    skip?: number
    distinct?: MusicianInstrumentScalarFieldEnum | MusicianInstrumentScalarFieldEnum[]
  }

  /**
   * MusicianInstrument create
   */
  export type MusicianInstrumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianInstrument
     */
    select?: MusicianInstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianInstrument
     */
    omit?: MusicianInstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianInstrumentInclude<ExtArgs> | null
    /**
     * The data needed to create a MusicianInstrument.
     */
    data: XOR<MusicianInstrumentCreateInput, MusicianInstrumentUncheckedCreateInput>
  }

  /**
   * MusicianInstrument createMany
   */
  export type MusicianInstrumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MusicianInstruments.
     */
    data: MusicianInstrumentCreateManyInput | MusicianInstrumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MusicianInstrument update
   */
  export type MusicianInstrumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianInstrument
     */
    select?: MusicianInstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianInstrument
     */
    omit?: MusicianInstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianInstrumentInclude<ExtArgs> | null
    /**
     * The data needed to update a MusicianInstrument.
     */
    data: XOR<MusicianInstrumentUpdateInput, MusicianInstrumentUncheckedUpdateInput>
    /**
     * Choose, which MusicianInstrument to update.
     */
    where: MusicianInstrumentWhereUniqueInput
  }

  /**
   * MusicianInstrument updateMany
   */
  export type MusicianInstrumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MusicianInstruments.
     */
    data: XOR<MusicianInstrumentUpdateManyMutationInput, MusicianInstrumentUncheckedUpdateManyInput>
    /**
     * Filter which MusicianInstruments to update
     */
    where?: MusicianInstrumentWhereInput
    /**
     * Limit how many MusicianInstruments to update.
     */
    limit?: number
  }

  /**
   * MusicianInstrument upsert
   */
  export type MusicianInstrumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianInstrument
     */
    select?: MusicianInstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianInstrument
     */
    omit?: MusicianInstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianInstrumentInclude<ExtArgs> | null
    /**
     * The filter to search for the MusicianInstrument to update in case it exists.
     */
    where: MusicianInstrumentWhereUniqueInput
    /**
     * In case the MusicianInstrument found by the `where` argument doesn't exist, create a new MusicianInstrument with this data.
     */
    create: XOR<MusicianInstrumentCreateInput, MusicianInstrumentUncheckedCreateInput>
    /**
     * In case the MusicianInstrument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MusicianInstrumentUpdateInput, MusicianInstrumentUncheckedUpdateInput>
  }

  /**
   * MusicianInstrument delete
   */
  export type MusicianInstrumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianInstrument
     */
    select?: MusicianInstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianInstrument
     */
    omit?: MusicianInstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianInstrumentInclude<ExtArgs> | null
    /**
     * Filter which MusicianInstrument to delete.
     */
    where: MusicianInstrumentWhereUniqueInput
  }

  /**
   * MusicianInstrument deleteMany
   */
  export type MusicianInstrumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MusicianInstruments to delete
     */
    where?: MusicianInstrumentWhereInput
    /**
     * Limit how many MusicianInstruments to delete.
     */
    limit?: number
  }

  /**
   * MusicianInstrument without action
   */
  export type MusicianInstrumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicianInstrument
     */
    select?: MusicianInstrumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MusicianInstrument
     */
    omit?: MusicianInstrumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicianInstrumentInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    id: number | null
    musicianProfileId: number | null
    clientId: number | null
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    id: number | null
    musicianProfileId: number | null
    clientId: number | null
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: number | null
    musicianProfileId: number | null
    clientId: number | null
    rating: number | null
    content: string | null
    date: string | null
    event: string | null
    createdAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: number | null
    musicianProfileId: number | null
    clientId: number | null
    rating: number | null
    content: string | null
    date: string | null
    event: string | null
    createdAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    musicianProfileId: number
    clientId: number
    rating: number
    content: number
    date: number
    event: number
    createdAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    id?: true
    musicianProfileId?: true
    clientId?: true
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    id?: true
    musicianProfileId?: true
    clientId?: true
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    musicianProfileId?: true
    clientId?: true
    rating?: true
    content?: true
    date?: true
    event?: true
    createdAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    musicianProfileId?: true
    clientId?: true
    rating?: true
    content?: true
    date?: true
    event?: true
    createdAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    musicianProfileId?: true
    clientId?: true
    rating?: true
    content?: true
    date?: true
    event?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: number
    musicianProfileId: number
    clientId: number
    rating: number
    content: string
    date: string
    event: string
    createdAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    musicianProfileId?: boolean
    clientId?: boolean
    rating?: boolean
    content?: boolean
    date?: boolean
    event?: boolean
    createdAt?: boolean
    musicianProfile?: boolean | MusicianProfileDefaultArgs<ExtArgs>
    client?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>



  export type ReviewSelectScalar = {
    id?: boolean
    musicianProfileId?: boolean
    clientId?: boolean
    rating?: boolean
    content?: boolean
    date?: boolean
    event?: boolean
    createdAt?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "musicianProfileId" | "clientId" | "rating" | "content" | "date" | "event" | "createdAt", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    musicianProfile?: boolean | MusicianProfileDefaultArgs<ExtArgs>
    client?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      musicianProfile: Prisma.$MusicianProfilePayload<ExtArgs>
      client: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      musicianProfileId: number
      clientId: number
      rating: number
      content: string
      date: string
      event: string
      createdAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    musicianProfile<T extends MusicianProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MusicianProfileDefaultArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    client<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'Int'>
    readonly musicianProfileId: FieldRef<"Review", 'Int'>
    readonly clientId: FieldRef<"Review", 'Int'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly content: FieldRef<"Review", 'String'>
    readonly date: FieldRef<"Review", 'String'>
    readonly event: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingAvgAggregateOutputType = {
    id: number | null
    musicianProfileId: number | null
    clientId: number | null
  }

  export type BookingSumAggregateOutputType = {
    id: number | null
    musicianProfileId: number | null
    clientId: number | null
  }

  export type BookingMinAggregateOutputType = {
    id: number | null
    musicianProfileId: number | null
    clientId: number | null
    eventDate: Date | null
    eventType: string | null
    message: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: number | null
    musicianProfileId: number | null
    clientId: number | null
    eventDate: Date | null
    eventType: string | null
    message: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    musicianProfileId: number
    clientId: number
    eventDate: number
    eventType: number
    message: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookingAvgAggregateInputType = {
    id?: true
    musicianProfileId?: true
    clientId?: true
  }

  export type BookingSumAggregateInputType = {
    id?: true
    musicianProfileId?: true
    clientId?: true
  }

  export type BookingMinAggregateInputType = {
    id?: true
    musicianProfileId?: true
    clientId?: true
    eventDate?: true
    eventType?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    musicianProfileId?: true
    clientId?: true
    eventDate?: true
    eventType?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    musicianProfileId?: true
    clientId?: true
    eventDate?: true
    eventType?: true
    message?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _avg?: BookingAvgAggregateInputType
    _sum?: BookingSumAggregateInputType
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: number
    musicianProfileId: number
    clientId: number | null
    eventDate: Date
    eventType: string
    message: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: BookingCountAggregateOutputType | null
    _avg: BookingAvgAggregateOutputType | null
    _sum: BookingSumAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    musicianProfileId?: boolean
    clientId?: boolean
    eventDate?: boolean
    eventType?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    musicianProfile?: boolean | MusicianProfileDefaultArgs<ExtArgs>
    client?: boolean | Booking$clientArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>



  export type BookingSelectScalar = {
    id?: boolean
    musicianProfileId?: boolean
    clientId?: boolean
    eventDate?: boolean
    eventType?: boolean
    message?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "musicianProfileId" | "clientId" | "eventDate" | "eventType" | "message" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["booking"]>
  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    musicianProfile?: boolean | MusicianProfileDefaultArgs<ExtArgs>
    client?: boolean | Booking$clientArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      musicianProfile: Prisma.$MusicianProfilePayload<ExtArgs>
      client: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      musicianProfileId: number
      clientId: number | null
      eventDate: Date
      eventType: string
      message: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    musicianProfile<T extends MusicianProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MusicianProfileDefaultArgs<ExtArgs>>): Prisma__MusicianProfileClient<$Result.GetResult<Prisma.$MusicianProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    client<T extends Booking$clientArgs<ExtArgs> = {}>(args?: Subset<T, Booking$clientArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Booking model
   */
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'Int'>
    readonly musicianProfileId: FieldRef<"Booking", 'Int'>
    readonly clientId: FieldRef<"Booking", 'Int'>
    readonly eventDate: FieldRef<"Booking", 'DateTime'>
    readonly eventType: FieldRef<"Booking", 'String'>
    readonly message: FieldRef<"Booking", 'String'>
    readonly status: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
    readonly updatedAt: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to update.
     */
    limit?: number
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number
  }

  /**
   * Booking.client
   */
  export type Booking$clientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Booking
     */
    omit?: BookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
  }


  /**
   * Model Plan
   */

  export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  export type PlanAvgAggregateOutputType = {
    id: number | null
    monthlyPrice: number | null
    yearlyPrice: number | null
  }

  export type PlanSumAggregateOutputType = {
    id: number | null
    monthlyPrice: number | null
    yearlyPrice: number | null
  }

  export type PlanMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    monthlyPrice: number | null
    yearlyPrice: number | null
    badge: string | null
    isMusicianPlan: boolean | null
    isClientPlan: boolean | null
    createdAt: Date | null
  }

  export type PlanMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    monthlyPrice: number | null
    yearlyPrice: number | null
    badge: string | null
    isMusicianPlan: boolean | null
    isClientPlan: boolean | null
    createdAt: Date | null
  }

  export type PlanCountAggregateOutputType = {
    id: number
    title: number
    description: number
    monthlyPrice: number
    yearlyPrice: number
    badge: number
    isMusicianPlan: number
    isClientPlan: number
    createdAt: number
    _all: number
  }


  export type PlanAvgAggregateInputType = {
    id?: true
    monthlyPrice?: true
    yearlyPrice?: true
  }

  export type PlanSumAggregateInputType = {
    id?: true
    monthlyPrice?: true
    yearlyPrice?: true
  }

  export type PlanMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    monthlyPrice?: true
    yearlyPrice?: true
    badge?: true
    isMusicianPlan?: true
    isClientPlan?: true
    createdAt?: true
  }

  export type PlanMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    monthlyPrice?: true
    yearlyPrice?: true
    badge?: true
    isMusicianPlan?: true
    isClientPlan?: true
    createdAt?: true
  }

  export type PlanCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    monthlyPrice?: true
    yearlyPrice?: true
    badge?: true
    isMusicianPlan?: true
    isClientPlan?: true
    createdAt?: true
    _all?: true
  }

  export type PlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plan to aggregate.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plans
    **/
    _count?: true | PlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanMaxAggregateInputType
  }

  export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlan[P]>
      : GetScalarType<T[P], AggregatePlan[P]>
  }




  export type PlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithAggregationInput | PlanOrderByWithAggregationInput[]
    by: PlanScalarFieldEnum[] | PlanScalarFieldEnum
    having?: PlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCountAggregateInputType | true
    _avg?: PlanAvgAggregateInputType
    _sum?: PlanSumAggregateInputType
    _min?: PlanMinAggregateInputType
    _max?: PlanMaxAggregateInputType
  }

  export type PlanGroupByOutputType = {
    id: number
    title: string
    description: string | null
    monthlyPrice: number
    yearlyPrice: number
    badge: string | null
    isMusicianPlan: boolean
    isClientPlan: boolean
    createdAt: Date
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanGroupByOutputType[P]>
            : GetScalarType<T[P], PlanGroupByOutputType[P]>
        }
      >
    >


  export type PlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    monthlyPrice?: boolean
    yearlyPrice?: boolean
    badge?: boolean
    isMusicianPlan?: boolean
    isClientPlan?: boolean
    createdAt?: boolean
    features?: boolean | Plan$featuresArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>



  export type PlanSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    monthlyPrice?: boolean
    yearlyPrice?: boolean
    badge?: boolean
    isMusicianPlan?: boolean
    isClientPlan?: boolean
    createdAt?: boolean
  }

  export type PlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "monthlyPrice" | "yearlyPrice" | "badge" | "isMusicianPlan" | "isClientPlan" | "createdAt", ExtArgs["result"]["plan"]>
  export type PlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    features?: boolean | Plan$featuresArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plan"
    objects: {
      features: Prisma.$PlanFeaturePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      monthlyPrice: number
      yearlyPrice: number
      badge: string | null
      isMusicianPlan: boolean
      isClientPlan: boolean
      createdAt: Date
    }, ExtArgs["result"]["plan"]>
    composites: {}
  }

  type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = $Result.GetResult<Prisma.$PlanPayload, S>

  type PlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanCountAggregateInputType | true
    }

  export interface PlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plan'], meta: { name: 'Plan' } }
    /**
     * Find zero or one Plan that matches the filter.
     * @param {PlanFindUniqueArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFindUniqueArgs>(args: SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFindUniqueOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFindFirstArgs>(args?: SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plans
     * const plans = await prisma.plan.findMany()
     * 
     * // Get first 10 Plans
     * const plans = await prisma.plan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWithIdOnly = await prisma.plan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFindManyArgs>(args?: SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plan.
     * @param {PlanCreateArgs} args - Arguments to create a Plan.
     * @example
     * // Create one Plan
     * const Plan = await prisma.plan.create({
     *   data: {
     *     // ... data to create a Plan
     *   }
     * })
     * 
     */
    create<T extends PlanCreateArgs>(args: SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Plans.
     * @param {PlanCreateManyArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCreateManyArgs>(args?: SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Plan.
     * @param {PlanDeleteArgs} args - Arguments to delete one Plan.
     * @example
     * // Delete one Plan
     * const Plan = await prisma.plan.delete({
     *   where: {
     *     // ... filter to delete one Plan
     *   }
     * })
     * 
     */
    delete<T extends PlanDeleteArgs>(args: SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plan.
     * @param {PlanUpdateArgs} args - Arguments to update one Plan.
     * @example
     * // Update one Plan
     * const plan = await prisma.plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanUpdateArgs>(args: SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Plans.
     * @param {PlanDeleteManyArgs} args - Arguments to filter Plans to delete.
     * @example
     * // Delete a few Plans
     * const { count } = await prisma.plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanDeleteManyArgs>(args?: SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanUpdateManyArgs>(args: SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Plan.
     * @param {PlanUpsertArgs} args - Arguments to update or create a Plan.
     * @example
     * // Update or create a Plan
     * const plan = await prisma.plan.upsert({
     *   create: {
     *     // ... data to create a Plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plan we want to update
     *   }
     * })
     */
    upsert<T extends PlanUpsertArgs>(args: SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCountArgs} args - Arguments to filter Plans to count.
     * @example
     * // Count the number of Plans
     * const count = await prisma.plan.count({
     *   where: {
     *     // ... the filter for the Plans we want to count
     *   }
     * })
    **/
    count<T extends PlanCountArgs>(
      args?: Subset<T, PlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanAggregateArgs>(args: Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>

    /**
     * Group by Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanGroupByArgs['orderBy'] }
        : { orderBy?: PlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plan model
   */
  readonly fields: PlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    features<T extends Plan$featuresArgs<ExtArgs> = {}>(args?: Subset<T, Plan$featuresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plan model
   */
  interface PlanFieldRefs {
    readonly id: FieldRef<"Plan", 'Int'>
    readonly title: FieldRef<"Plan", 'String'>
    readonly description: FieldRef<"Plan", 'String'>
    readonly monthlyPrice: FieldRef<"Plan", 'Int'>
    readonly yearlyPrice: FieldRef<"Plan", 'Int'>
    readonly badge: FieldRef<"Plan", 'String'>
    readonly isMusicianPlan: FieldRef<"Plan", 'Boolean'>
    readonly isClientPlan: FieldRef<"Plan", 'Boolean'>
    readonly createdAt: FieldRef<"Plan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Plan findUnique
   */
  export type PlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findUniqueOrThrow
   */
  export type PlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findFirst
   */
  export type PlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findFirstOrThrow
   */
  export type PlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findMany
   */
  export type PlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plans to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan create
   */
  export type PlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to create a Plan.
     */
    data: XOR<PlanCreateInput, PlanUncheckedCreateInput>
  }

  /**
   * Plan createMany
   */
  export type PlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan update
   */
  export type PlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to update a Plan.
     */
    data: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    /**
     * Choose, which Plan to update.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan updateMany
   */
  export type PlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan upsert
   */
  export type PlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The filter to search for the Plan to update in case it exists.
     */
    where: PlanWhereUniqueInput
    /**
     * In case the Plan found by the `where` argument doesn't exist, create a new Plan with this data.
     */
    create: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    /**
     * In case the Plan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
  }

  /**
   * Plan delete
   */
  export type PlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter which Plan to delete.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan deleteMany
   */
  export type PlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plans to delete
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to delete.
     */
    limit?: number
  }

  /**
   * Plan.features
   */
  export type Plan$featuresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    where?: PlanFeatureWhereInput
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    cursor?: PlanFeatureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanFeatureScalarFieldEnum | PlanFeatureScalarFieldEnum[]
  }

  /**
   * Plan without action
   */
  export type PlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
  }


  /**
   * Model PlanFeature
   */

  export type AggregatePlanFeature = {
    _count: PlanFeatureCountAggregateOutputType | null
    _avg: PlanFeatureAvgAggregateOutputType | null
    _sum: PlanFeatureSumAggregateOutputType | null
    _min: PlanFeatureMinAggregateOutputType | null
    _max: PlanFeatureMaxAggregateOutputType | null
  }

  export type PlanFeatureAvgAggregateOutputType = {
    id: number | null
    planId: number | null
  }

  export type PlanFeatureSumAggregateOutputType = {
    id: number | null
    planId: number | null
  }

  export type PlanFeatureMinAggregateOutputType = {
    id: number | null
    planId: number | null
    text: string | null
    available: boolean | null
    highlight: boolean | null
  }

  export type PlanFeatureMaxAggregateOutputType = {
    id: number | null
    planId: number | null
    text: string | null
    available: boolean | null
    highlight: boolean | null
  }

  export type PlanFeatureCountAggregateOutputType = {
    id: number
    planId: number
    text: number
    available: number
    highlight: number
    _all: number
  }


  export type PlanFeatureAvgAggregateInputType = {
    id?: true
    planId?: true
  }

  export type PlanFeatureSumAggregateInputType = {
    id?: true
    planId?: true
  }

  export type PlanFeatureMinAggregateInputType = {
    id?: true
    planId?: true
    text?: true
    available?: true
    highlight?: true
  }

  export type PlanFeatureMaxAggregateInputType = {
    id?: true
    planId?: true
    text?: true
    available?: true
    highlight?: true
  }

  export type PlanFeatureCountAggregateInputType = {
    id?: true
    planId?: true
    text?: true
    available?: true
    highlight?: true
    _all?: true
  }

  export type PlanFeatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanFeature to aggregate.
     */
    where?: PlanFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFeatures to fetch.
     */
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlanFeatures
    **/
    _count?: true | PlanFeatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanFeatureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanFeatureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanFeatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanFeatureMaxAggregateInputType
  }

  export type GetPlanFeatureAggregateType<T extends PlanFeatureAggregateArgs> = {
        [P in keyof T & keyof AggregatePlanFeature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlanFeature[P]>
      : GetScalarType<T[P], AggregatePlanFeature[P]>
  }




  export type PlanFeatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanFeatureWhereInput
    orderBy?: PlanFeatureOrderByWithAggregationInput | PlanFeatureOrderByWithAggregationInput[]
    by: PlanFeatureScalarFieldEnum[] | PlanFeatureScalarFieldEnum
    having?: PlanFeatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanFeatureCountAggregateInputType | true
    _avg?: PlanFeatureAvgAggregateInputType
    _sum?: PlanFeatureSumAggregateInputType
    _min?: PlanFeatureMinAggregateInputType
    _max?: PlanFeatureMaxAggregateInputType
  }

  export type PlanFeatureGroupByOutputType = {
    id: number
    planId: number
    text: string
    available: boolean
    highlight: boolean
    _count: PlanFeatureCountAggregateOutputType | null
    _avg: PlanFeatureAvgAggregateOutputType | null
    _sum: PlanFeatureSumAggregateOutputType | null
    _min: PlanFeatureMinAggregateOutputType | null
    _max: PlanFeatureMaxAggregateOutputType | null
  }

  type GetPlanFeatureGroupByPayload<T extends PlanFeatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanFeatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanFeatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanFeatureGroupByOutputType[P]>
            : GetScalarType<T[P], PlanFeatureGroupByOutputType[P]>
        }
      >
    >


  export type PlanFeatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    text?: boolean
    available?: boolean
    highlight?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planFeature"]>



  export type PlanFeatureSelectScalar = {
    id?: boolean
    planId?: boolean
    text?: boolean
    available?: boolean
    highlight?: boolean
  }

  export type PlanFeatureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "planId" | "text" | "available" | "highlight", ExtArgs["result"]["planFeature"]>
  export type PlanFeatureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }

  export type $PlanFeaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlanFeature"
    objects: {
      plan: Prisma.$PlanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      planId: number
      text: string
      available: boolean
      highlight: boolean
    }, ExtArgs["result"]["planFeature"]>
    composites: {}
  }

  type PlanFeatureGetPayload<S extends boolean | null | undefined | PlanFeatureDefaultArgs> = $Result.GetResult<Prisma.$PlanFeaturePayload, S>

  type PlanFeatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFeatureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanFeatureCountAggregateInputType | true
    }

  export interface PlanFeatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlanFeature'], meta: { name: 'PlanFeature' } }
    /**
     * Find zero or one PlanFeature that matches the filter.
     * @param {PlanFeatureFindUniqueArgs} args - Arguments to find a PlanFeature
     * @example
     * // Get one PlanFeature
     * const planFeature = await prisma.planFeature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFeatureFindUniqueArgs>(args: SelectSubset<T, PlanFeatureFindUniqueArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlanFeature that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFeatureFindUniqueOrThrowArgs} args - Arguments to find a PlanFeature
     * @example
     * // Get one PlanFeature
     * const planFeature = await prisma.planFeature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFeatureFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFeatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanFeature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureFindFirstArgs} args - Arguments to find a PlanFeature
     * @example
     * // Get one PlanFeature
     * const planFeature = await prisma.planFeature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFeatureFindFirstArgs>(args?: SelectSubset<T, PlanFeatureFindFirstArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanFeature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureFindFirstOrThrowArgs} args - Arguments to find a PlanFeature
     * @example
     * // Get one PlanFeature
     * const planFeature = await prisma.planFeature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFeatureFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFeatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlanFeatures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlanFeatures
     * const planFeatures = await prisma.planFeature.findMany()
     * 
     * // Get first 10 PlanFeatures
     * const planFeatures = await prisma.planFeature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planFeatureWithIdOnly = await prisma.planFeature.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFeatureFindManyArgs>(args?: SelectSubset<T, PlanFeatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlanFeature.
     * @param {PlanFeatureCreateArgs} args - Arguments to create a PlanFeature.
     * @example
     * // Create one PlanFeature
     * const PlanFeature = await prisma.planFeature.create({
     *   data: {
     *     // ... data to create a PlanFeature
     *   }
     * })
     * 
     */
    create<T extends PlanFeatureCreateArgs>(args: SelectSubset<T, PlanFeatureCreateArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlanFeatures.
     * @param {PlanFeatureCreateManyArgs} args - Arguments to create many PlanFeatures.
     * @example
     * // Create many PlanFeatures
     * const planFeature = await prisma.planFeature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanFeatureCreateManyArgs>(args?: SelectSubset<T, PlanFeatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PlanFeature.
     * @param {PlanFeatureDeleteArgs} args - Arguments to delete one PlanFeature.
     * @example
     * // Delete one PlanFeature
     * const PlanFeature = await prisma.planFeature.delete({
     *   where: {
     *     // ... filter to delete one PlanFeature
     *   }
     * })
     * 
     */
    delete<T extends PlanFeatureDeleteArgs>(args: SelectSubset<T, PlanFeatureDeleteArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlanFeature.
     * @param {PlanFeatureUpdateArgs} args - Arguments to update one PlanFeature.
     * @example
     * // Update one PlanFeature
     * const planFeature = await prisma.planFeature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanFeatureUpdateArgs>(args: SelectSubset<T, PlanFeatureUpdateArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlanFeatures.
     * @param {PlanFeatureDeleteManyArgs} args - Arguments to filter PlanFeatures to delete.
     * @example
     * // Delete a few PlanFeatures
     * const { count } = await prisma.planFeature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanFeatureDeleteManyArgs>(args?: SelectSubset<T, PlanFeatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlanFeatures
     * const planFeature = await prisma.planFeature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanFeatureUpdateManyArgs>(args: SelectSubset<T, PlanFeatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlanFeature.
     * @param {PlanFeatureUpsertArgs} args - Arguments to update or create a PlanFeature.
     * @example
     * // Update or create a PlanFeature
     * const planFeature = await prisma.planFeature.upsert({
     *   create: {
     *     // ... data to create a PlanFeature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlanFeature we want to update
     *   }
     * })
     */
    upsert<T extends PlanFeatureUpsertArgs>(args: SelectSubset<T, PlanFeatureUpsertArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlanFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureCountArgs} args - Arguments to filter PlanFeatures to count.
     * @example
     * // Count the number of PlanFeatures
     * const count = await prisma.planFeature.count({
     *   where: {
     *     // ... the filter for the PlanFeatures we want to count
     *   }
     * })
    **/
    count<T extends PlanFeatureCountArgs>(
      args?: Subset<T, PlanFeatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanFeatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlanFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanFeatureAggregateArgs>(args: Subset<T, PlanFeatureAggregateArgs>): Prisma.PrismaPromise<GetPlanFeatureAggregateType<T>>

    /**
     * Group by PlanFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanFeatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanFeatureGroupByArgs['orderBy'] }
        : { orderBy?: PlanFeatureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanFeatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanFeatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlanFeature model
   */
  readonly fields: PlanFeatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlanFeature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanFeatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlanFeature model
   */
  interface PlanFeatureFieldRefs {
    readonly id: FieldRef<"PlanFeature", 'Int'>
    readonly planId: FieldRef<"PlanFeature", 'Int'>
    readonly text: FieldRef<"PlanFeature", 'String'>
    readonly available: FieldRef<"PlanFeature", 'Boolean'>
    readonly highlight: FieldRef<"PlanFeature", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * PlanFeature findUnique
   */
  export type PlanFeatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeature to fetch.
     */
    where: PlanFeatureWhereUniqueInput
  }

  /**
   * PlanFeature findUniqueOrThrow
   */
  export type PlanFeatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeature to fetch.
     */
    where: PlanFeatureWhereUniqueInput
  }

  /**
   * PlanFeature findFirst
   */
  export type PlanFeatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeature to fetch.
     */
    where?: PlanFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFeatures to fetch.
     */
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanFeatures.
     */
    cursor?: PlanFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanFeatures.
     */
    distinct?: PlanFeatureScalarFieldEnum | PlanFeatureScalarFieldEnum[]
  }

  /**
   * PlanFeature findFirstOrThrow
   */
  export type PlanFeatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeature to fetch.
     */
    where?: PlanFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFeatures to fetch.
     */
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanFeatures.
     */
    cursor?: PlanFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanFeatures.
     */
    distinct?: PlanFeatureScalarFieldEnum | PlanFeatureScalarFieldEnum[]
  }

  /**
   * PlanFeature findMany
   */
  export type PlanFeatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeatures to fetch.
     */
    where?: PlanFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFeatures to fetch.
     */
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlanFeatures.
     */
    cursor?: PlanFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFeatures.
     */
    skip?: number
    distinct?: PlanFeatureScalarFieldEnum | PlanFeatureScalarFieldEnum[]
  }

  /**
   * PlanFeature create
   */
  export type PlanFeatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * The data needed to create a PlanFeature.
     */
    data: XOR<PlanFeatureCreateInput, PlanFeatureUncheckedCreateInput>
  }

  /**
   * PlanFeature createMany
   */
  export type PlanFeatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlanFeatures.
     */
    data: PlanFeatureCreateManyInput | PlanFeatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlanFeature update
   */
  export type PlanFeatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * The data needed to update a PlanFeature.
     */
    data: XOR<PlanFeatureUpdateInput, PlanFeatureUncheckedUpdateInput>
    /**
     * Choose, which PlanFeature to update.
     */
    where: PlanFeatureWhereUniqueInput
  }

  /**
   * PlanFeature updateMany
   */
  export type PlanFeatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlanFeatures.
     */
    data: XOR<PlanFeatureUpdateManyMutationInput, PlanFeatureUncheckedUpdateManyInput>
    /**
     * Filter which PlanFeatures to update
     */
    where?: PlanFeatureWhereInput
    /**
     * Limit how many PlanFeatures to update.
     */
    limit?: number
  }

  /**
   * PlanFeature upsert
   */
  export type PlanFeatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * The filter to search for the PlanFeature to update in case it exists.
     */
    where: PlanFeatureWhereUniqueInput
    /**
     * In case the PlanFeature found by the `where` argument doesn't exist, create a new PlanFeature with this data.
     */
    create: XOR<PlanFeatureCreateInput, PlanFeatureUncheckedCreateInput>
    /**
     * In case the PlanFeature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanFeatureUpdateInput, PlanFeatureUncheckedUpdateInput>
  }

  /**
   * PlanFeature delete
   */
  export type PlanFeatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter which PlanFeature to delete.
     */
    where: PlanFeatureWhereUniqueInput
  }

  /**
   * PlanFeature deleteMany
   */
  export type PlanFeatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanFeatures to delete
     */
    where?: PlanFeatureWhereInput
    /**
     * Limit how many PlanFeatures to delete.
     */
    limit?: number
  }

  /**
   * PlanFeature without action
   */
  export type PlanFeatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
  }


  /**
   * Model FAQItem
   */

  export type AggregateFAQItem = {
    _count: FAQItemCountAggregateOutputType | null
    _avg: FAQItemAvgAggregateOutputType | null
    _sum: FAQItemSumAggregateOutputType | null
    _min: FAQItemMinAggregateOutputType | null
    _max: FAQItemMaxAggregateOutputType | null
  }

  export type FAQItemAvgAggregateOutputType = {
    id: number | null
  }

  export type FAQItemSumAggregateOutputType = {
    id: number | null
  }

  export type FAQItemMinAggregateOutputType = {
    id: number | null
    question: string | null
    answer: string | null
    category: string | null
    createdAt: Date | null
  }

  export type FAQItemMaxAggregateOutputType = {
    id: number | null
    question: string | null
    answer: string | null
    category: string | null
    createdAt: Date | null
  }

  export type FAQItemCountAggregateOutputType = {
    id: number
    question: number
    answer: number
    category: number
    createdAt: number
    _all: number
  }


  export type FAQItemAvgAggregateInputType = {
    id?: true
  }

  export type FAQItemSumAggregateInputType = {
    id?: true
  }

  export type FAQItemMinAggregateInputType = {
    id?: true
    question?: true
    answer?: true
    category?: true
    createdAt?: true
  }

  export type FAQItemMaxAggregateInputType = {
    id?: true
    question?: true
    answer?: true
    category?: true
    createdAt?: true
  }

  export type FAQItemCountAggregateInputType = {
    id?: true
    question?: true
    answer?: true
    category?: true
    createdAt?: true
    _all?: true
  }

  export type FAQItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FAQItem to aggregate.
     */
    where?: FAQItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FAQItems to fetch.
     */
    orderBy?: FAQItemOrderByWithRelationInput | FAQItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FAQItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FAQItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FAQItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FAQItems
    **/
    _count?: true | FAQItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FAQItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FAQItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FAQItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FAQItemMaxAggregateInputType
  }

  export type GetFAQItemAggregateType<T extends FAQItemAggregateArgs> = {
        [P in keyof T & keyof AggregateFAQItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFAQItem[P]>
      : GetScalarType<T[P], AggregateFAQItem[P]>
  }




  export type FAQItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FAQItemWhereInput
    orderBy?: FAQItemOrderByWithAggregationInput | FAQItemOrderByWithAggregationInput[]
    by: FAQItemScalarFieldEnum[] | FAQItemScalarFieldEnum
    having?: FAQItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FAQItemCountAggregateInputType | true
    _avg?: FAQItemAvgAggregateInputType
    _sum?: FAQItemSumAggregateInputType
    _min?: FAQItemMinAggregateInputType
    _max?: FAQItemMaxAggregateInputType
  }

  export type FAQItemGroupByOutputType = {
    id: number
    question: string
    answer: string
    category: string | null
    createdAt: Date
    _count: FAQItemCountAggregateOutputType | null
    _avg: FAQItemAvgAggregateOutputType | null
    _sum: FAQItemSumAggregateOutputType | null
    _min: FAQItemMinAggregateOutputType | null
    _max: FAQItemMaxAggregateOutputType | null
  }

  type GetFAQItemGroupByPayload<T extends FAQItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FAQItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FAQItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FAQItemGroupByOutputType[P]>
            : GetScalarType<T[P], FAQItemGroupByOutputType[P]>
        }
      >
    >


  export type FAQItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean
    answer?: boolean
    category?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["fAQItem"]>



  export type FAQItemSelectScalar = {
    id?: boolean
    question?: boolean
    answer?: boolean
    category?: boolean
    createdAt?: boolean
  }

  export type FAQItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "question" | "answer" | "category" | "createdAt", ExtArgs["result"]["fAQItem"]>

  export type $FAQItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FAQItem"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      question: string
      answer: string
      category: string | null
      createdAt: Date
    }, ExtArgs["result"]["fAQItem"]>
    composites: {}
  }

  type FAQItemGetPayload<S extends boolean | null | undefined | FAQItemDefaultArgs> = $Result.GetResult<Prisma.$FAQItemPayload, S>

  type FAQItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FAQItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FAQItemCountAggregateInputType | true
    }

  export interface FAQItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FAQItem'], meta: { name: 'FAQItem' } }
    /**
     * Find zero or one FAQItem that matches the filter.
     * @param {FAQItemFindUniqueArgs} args - Arguments to find a FAQItem
     * @example
     * // Get one FAQItem
     * const fAQItem = await prisma.fAQItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FAQItemFindUniqueArgs>(args: SelectSubset<T, FAQItemFindUniqueArgs<ExtArgs>>): Prisma__FAQItemClient<$Result.GetResult<Prisma.$FAQItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FAQItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FAQItemFindUniqueOrThrowArgs} args - Arguments to find a FAQItem
     * @example
     * // Get one FAQItem
     * const fAQItem = await prisma.fAQItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FAQItemFindUniqueOrThrowArgs>(args: SelectSubset<T, FAQItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FAQItemClient<$Result.GetResult<Prisma.$FAQItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FAQItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FAQItemFindFirstArgs} args - Arguments to find a FAQItem
     * @example
     * // Get one FAQItem
     * const fAQItem = await prisma.fAQItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FAQItemFindFirstArgs>(args?: SelectSubset<T, FAQItemFindFirstArgs<ExtArgs>>): Prisma__FAQItemClient<$Result.GetResult<Prisma.$FAQItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FAQItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FAQItemFindFirstOrThrowArgs} args - Arguments to find a FAQItem
     * @example
     * // Get one FAQItem
     * const fAQItem = await prisma.fAQItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FAQItemFindFirstOrThrowArgs>(args?: SelectSubset<T, FAQItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__FAQItemClient<$Result.GetResult<Prisma.$FAQItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FAQItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FAQItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FAQItems
     * const fAQItems = await prisma.fAQItem.findMany()
     * 
     * // Get first 10 FAQItems
     * const fAQItems = await prisma.fAQItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fAQItemWithIdOnly = await prisma.fAQItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FAQItemFindManyArgs>(args?: SelectSubset<T, FAQItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FAQItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FAQItem.
     * @param {FAQItemCreateArgs} args - Arguments to create a FAQItem.
     * @example
     * // Create one FAQItem
     * const FAQItem = await prisma.fAQItem.create({
     *   data: {
     *     // ... data to create a FAQItem
     *   }
     * })
     * 
     */
    create<T extends FAQItemCreateArgs>(args: SelectSubset<T, FAQItemCreateArgs<ExtArgs>>): Prisma__FAQItemClient<$Result.GetResult<Prisma.$FAQItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FAQItems.
     * @param {FAQItemCreateManyArgs} args - Arguments to create many FAQItems.
     * @example
     * // Create many FAQItems
     * const fAQItem = await prisma.fAQItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FAQItemCreateManyArgs>(args?: SelectSubset<T, FAQItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FAQItem.
     * @param {FAQItemDeleteArgs} args - Arguments to delete one FAQItem.
     * @example
     * // Delete one FAQItem
     * const FAQItem = await prisma.fAQItem.delete({
     *   where: {
     *     // ... filter to delete one FAQItem
     *   }
     * })
     * 
     */
    delete<T extends FAQItemDeleteArgs>(args: SelectSubset<T, FAQItemDeleteArgs<ExtArgs>>): Prisma__FAQItemClient<$Result.GetResult<Prisma.$FAQItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FAQItem.
     * @param {FAQItemUpdateArgs} args - Arguments to update one FAQItem.
     * @example
     * // Update one FAQItem
     * const fAQItem = await prisma.fAQItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FAQItemUpdateArgs>(args: SelectSubset<T, FAQItemUpdateArgs<ExtArgs>>): Prisma__FAQItemClient<$Result.GetResult<Prisma.$FAQItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FAQItems.
     * @param {FAQItemDeleteManyArgs} args - Arguments to filter FAQItems to delete.
     * @example
     * // Delete a few FAQItems
     * const { count } = await prisma.fAQItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FAQItemDeleteManyArgs>(args?: SelectSubset<T, FAQItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FAQItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FAQItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FAQItems
     * const fAQItem = await prisma.fAQItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FAQItemUpdateManyArgs>(args: SelectSubset<T, FAQItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FAQItem.
     * @param {FAQItemUpsertArgs} args - Arguments to update or create a FAQItem.
     * @example
     * // Update or create a FAQItem
     * const fAQItem = await prisma.fAQItem.upsert({
     *   create: {
     *     // ... data to create a FAQItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FAQItem we want to update
     *   }
     * })
     */
    upsert<T extends FAQItemUpsertArgs>(args: SelectSubset<T, FAQItemUpsertArgs<ExtArgs>>): Prisma__FAQItemClient<$Result.GetResult<Prisma.$FAQItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FAQItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FAQItemCountArgs} args - Arguments to filter FAQItems to count.
     * @example
     * // Count the number of FAQItems
     * const count = await prisma.fAQItem.count({
     *   where: {
     *     // ... the filter for the FAQItems we want to count
     *   }
     * })
    **/
    count<T extends FAQItemCountArgs>(
      args?: Subset<T, FAQItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FAQItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FAQItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FAQItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FAQItemAggregateArgs>(args: Subset<T, FAQItemAggregateArgs>): Prisma.PrismaPromise<GetFAQItemAggregateType<T>>

    /**
     * Group by FAQItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FAQItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FAQItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FAQItemGroupByArgs['orderBy'] }
        : { orderBy?: FAQItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FAQItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFAQItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FAQItem model
   */
  readonly fields: FAQItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FAQItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FAQItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FAQItem model
   */
  interface FAQItemFieldRefs {
    readonly id: FieldRef<"FAQItem", 'Int'>
    readonly question: FieldRef<"FAQItem", 'String'>
    readonly answer: FieldRef<"FAQItem", 'String'>
    readonly category: FieldRef<"FAQItem", 'String'>
    readonly createdAt: FieldRef<"FAQItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FAQItem findUnique
   */
  export type FAQItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FAQItem
     */
    select?: FAQItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FAQItem
     */
    omit?: FAQItemOmit<ExtArgs> | null
    /**
     * Filter, which FAQItem to fetch.
     */
    where: FAQItemWhereUniqueInput
  }

  /**
   * FAQItem findUniqueOrThrow
   */
  export type FAQItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FAQItem
     */
    select?: FAQItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FAQItem
     */
    omit?: FAQItemOmit<ExtArgs> | null
    /**
     * Filter, which FAQItem to fetch.
     */
    where: FAQItemWhereUniqueInput
  }

  /**
   * FAQItem findFirst
   */
  export type FAQItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FAQItem
     */
    select?: FAQItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FAQItem
     */
    omit?: FAQItemOmit<ExtArgs> | null
    /**
     * Filter, which FAQItem to fetch.
     */
    where?: FAQItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FAQItems to fetch.
     */
    orderBy?: FAQItemOrderByWithRelationInput | FAQItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FAQItems.
     */
    cursor?: FAQItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FAQItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FAQItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FAQItems.
     */
    distinct?: FAQItemScalarFieldEnum | FAQItemScalarFieldEnum[]
  }

  /**
   * FAQItem findFirstOrThrow
   */
  export type FAQItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FAQItem
     */
    select?: FAQItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FAQItem
     */
    omit?: FAQItemOmit<ExtArgs> | null
    /**
     * Filter, which FAQItem to fetch.
     */
    where?: FAQItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FAQItems to fetch.
     */
    orderBy?: FAQItemOrderByWithRelationInput | FAQItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FAQItems.
     */
    cursor?: FAQItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FAQItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FAQItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FAQItems.
     */
    distinct?: FAQItemScalarFieldEnum | FAQItemScalarFieldEnum[]
  }

  /**
   * FAQItem findMany
   */
  export type FAQItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FAQItem
     */
    select?: FAQItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FAQItem
     */
    omit?: FAQItemOmit<ExtArgs> | null
    /**
     * Filter, which FAQItems to fetch.
     */
    where?: FAQItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FAQItems to fetch.
     */
    orderBy?: FAQItemOrderByWithRelationInput | FAQItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FAQItems.
     */
    cursor?: FAQItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FAQItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FAQItems.
     */
    skip?: number
    distinct?: FAQItemScalarFieldEnum | FAQItemScalarFieldEnum[]
  }

  /**
   * FAQItem create
   */
  export type FAQItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FAQItem
     */
    select?: FAQItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FAQItem
     */
    omit?: FAQItemOmit<ExtArgs> | null
    /**
     * The data needed to create a FAQItem.
     */
    data: XOR<FAQItemCreateInput, FAQItemUncheckedCreateInput>
  }

  /**
   * FAQItem createMany
   */
  export type FAQItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FAQItems.
     */
    data: FAQItemCreateManyInput | FAQItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FAQItem update
   */
  export type FAQItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FAQItem
     */
    select?: FAQItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FAQItem
     */
    omit?: FAQItemOmit<ExtArgs> | null
    /**
     * The data needed to update a FAQItem.
     */
    data: XOR<FAQItemUpdateInput, FAQItemUncheckedUpdateInput>
    /**
     * Choose, which FAQItem to update.
     */
    where: FAQItemWhereUniqueInput
  }

  /**
   * FAQItem updateMany
   */
  export type FAQItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FAQItems.
     */
    data: XOR<FAQItemUpdateManyMutationInput, FAQItemUncheckedUpdateManyInput>
    /**
     * Filter which FAQItems to update
     */
    where?: FAQItemWhereInput
    /**
     * Limit how many FAQItems to update.
     */
    limit?: number
  }

  /**
   * FAQItem upsert
   */
  export type FAQItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FAQItem
     */
    select?: FAQItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FAQItem
     */
    omit?: FAQItemOmit<ExtArgs> | null
    /**
     * The filter to search for the FAQItem to update in case it exists.
     */
    where: FAQItemWhereUniqueInput
    /**
     * In case the FAQItem found by the `where` argument doesn't exist, create a new FAQItem with this data.
     */
    create: XOR<FAQItemCreateInput, FAQItemUncheckedCreateInput>
    /**
     * In case the FAQItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FAQItemUpdateInput, FAQItemUncheckedUpdateInput>
  }

  /**
   * FAQItem delete
   */
  export type FAQItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FAQItem
     */
    select?: FAQItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FAQItem
     */
    omit?: FAQItemOmit<ExtArgs> | null
    /**
     * Filter which FAQItem to delete.
     */
    where: FAQItemWhereUniqueInput
  }

  /**
   * FAQItem deleteMany
   */
  export type FAQItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FAQItems to delete
     */
    where?: FAQItemWhereInput
    /**
     * Limit how many FAQItems to delete.
     */
    limit?: number
  }

  /**
   * FAQItem without action
   */
  export type FAQItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FAQItem
     */
    select?: FAQItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FAQItem
     */
    omit?: FAQItemOmit<ExtArgs> | null
  }


  /**
   * Model ContactMessage
   */

  export type AggregateContactMessage = {
    _count: ContactMessageCountAggregateOutputType | null
    _avg: ContactMessageAvgAggregateOutputType | null
    _sum: ContactMessageSumAggregateOutputType | null
    _min: ContactMessageMinAggregateOutputType | null
    _max: ContactMessageMaxAggregateOutputType | null
  }

  export type ContactMessageAvgAggregateOutputType = {
    id: number | null
  }

  export type ContactMessageSumAggregateOutputType = {
    id: number | null
  }

  export type ContactMessageMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    subject: string | null
    message: string | null
    createdAt: Date | null
  }

  export type ContactMessageMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phone: string | null
    subject: string | null
    message: string | null
    createdAt: Date | null
  }

  export type ContactMessageCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    phone: number
    subject: number
    message: number
    createdAt: number
    _all: number
  }


  export type ContactMessageAvgAggregateInputType = {
    id?: true
  }

  export type ContactMessageSumAggregateInputType = {
    id?: true
  }

  export type ContactMessageMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    subject?: true
    message?: true
    createdAt?: true
  }

  export type ContactMessageMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    subject?: true
    message?: true
    createdAt?: true
  }

  export type ContactMessageCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phone?: true
    subject?: true
    message?: true
    createdAt?: true
    _all?: true
  }

  export type ContactMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactMessage to aggregate.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactMessages
    **/
    _count?: true | ContactMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContactMessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContactMessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMessageMaxAggregateInputType
  }

  export type GetContactMessageAggregateType<T extends ContactMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateContactMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactMessage[P]>
      : GetScalarType<T[P], AggregateContactMessage[P]>
  }




  export type ContactMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactMessageWhereInput
    orderBy?: ContactMessageOrderByWithAggregationInput | ContactMessageOrderByWithAggregationInput[]
    by: ContactMessageScalarFieldEnum[] | ContactMessageScalarFieldEnum
    having?: ContactMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactMessageCountAggregateInputType | true
    _avg?: ContactMessageAvgAggregateInputType
    _sum?: ContactMessageSumAggregateInputType
    _min?: ContactMessageMinAggregateInputType
    _max?: ContactMessageMaxAggregateInputType
  }

  export type ContactMessageGroupByOutputType = {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string | null
    subject: string
    message: string
    createdAt: Date
    _count: ContactMessageCountAggregateOutputType | null
    _avg: ContactMessageAvgAggregateOutputType | null
    _sum: ContactMessageSumAggregateOutputType | null
    _min: ContactMessageMinAggregateOutputType | null
    _max: ContactMessageMaxAggregateOutputType | null
  }

  type GetContactMessageGroupByPayload<T extends ContactMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ContactMessageGroupByOutputType[P]>
        }
      >
    >


  export type ContactMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    subject?: boolean
    message?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["contactMessage"]>



  export type ContactMessageSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phone?: boolean
    subject?: boolean
    message?: boolean
    createdAt?: boolean
  }

  export type ContactMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "phone" | "subject" | "message" | "createdAt", ExtArgs["result"]["contactMessage"]>

  export type $ContactMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string
      lastName: string
      email: string
      phone: string | null
      subject: string
      message: string
      createdAt: Date
    }, ExtArgs["result"]["contactMessage"]>
    composites: {}
  }

  type ContactMessageGetPayload<S extends boolean | null | undefined | ContactMessageDefaultArgs> = $Result.GetResult<Prisma.$ContactMessagePayload, S>

  type ContactMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactMessageCountAggregateInputType | true
    }

  export interface ContactMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactMessage'], meta: { name: 'ContactMessage' } }
    /**
     * Find zero or one ContactMessage that matches the filter.
     * @param {ContactMessageFindUniqueArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactMessageFindUniqueArgs>(args: SelectSubset<T, ContactMessageFindUniqueArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContactMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactMessageFindUniqueOrThrowArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindFirstArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactMessageFindFirstArgs>(args?: SelectSubset<T, ContactMessageFindFirstArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindFirstOrThrowArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContactMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactMessages
     * const contactMessages = await prisma.contactMessage.findMany()
     * 
     * // Get first 10 ContactMessages
     * const contactMessages = await prisma.contactMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactMessageWithIdOnly = await prisma.contactMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactMessageFindManyArgs>(args?: SelectSubset<T, ContactMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContactMessage.
     * @param {ContactMessageCreateArgs} args - Arguments to create a ContactMessage.
     * @example
     * // Create one ContactMessage
     * const ContactMessage = await prisma.contactMessage.create({
     *   data: {
     *     // ... data to create a ContactMessage
     *   }
     * })
     * 
     */
    create<T extends ContactMessageCreateArgs>(args: SelectSubset<T, ContactMessageCreateArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContactMessages.
     * @param {ContactMessageCreateManyArgs} args - Arguments to create many ContactMessages.
     * @example
     * // Create many ContactMessages
     * const contactMessage = await prisma.contactMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactMessageCreateManyArgs>(args?: SelectSubset<T, ContactMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ContactMessage.
     * @param {ContactMessageDeleteArgs} args - Arguments to delete one ContactMessage.
     * @example
     * // Delete one ContactMessage
     * const ContactMessage = await prisma.contactMessage.delete({
     *   where: {
     *     // ... filter to delete one ContactMessage
     *   }
     * })
     * 
     */
    delete<T extends ContactMessageDeleteArgs>(args: SelectSubset<T, ContactMessageDeleteArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContactMessage.
     * @param {ContactMessageUpdateArgs} args - Arguments to update one ContactMessage.
     * @example
     * // Update one ContactMessage
     * const contactMessage = await prisma.contactMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactMessageUpdateArgs>(args: SelectSubset<T, ContactMessageUpdateArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContactMessages.
     * @param {ContactMessageDeleteManyArgs} args - Arguments to filter ContactMessages to delete.
     * @example
     * // Delete a few ContactMessages
     * const { count } = await prisma.contactMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactMessageDeleteManyArgs>(args?: SelectSubset<T, ContactMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactMessages
     * const contactMessage = await prisma.contactMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactMessageUpdateManyArgs>(args: SelectSubset<T, ContactMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContactMessage.
     * @param {ContactMessageUpsertArgs} args - Arguments to update or create a ContactMessage.
     * @example
     * // Update or create a ContactMessage
     * const contactMessage = await prisma.contactMessage.upsert({
     *   create: {
     *     // ... data to create a ContactMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactMessage we want to update
     *   }
     * })
     */
    upsert<T extends ContactMessageUpsertArgs>(args: SelectSubset<T, ContactMessageUpsertArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContactMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageCountArgs} args - Arguments to filter ContactMessages to count.
     * @example
     * // Count the number of ContactMessages
     * const count = await prisma.contactMessage.count({
     *   where: {
     *     // ... the filter for the ContactMessages we want to count
     *   }
     * })
    **/
    count<T extends ContactMessageCountArgs>(
      args?: Subset<T, ContactMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactMessageAggregateArgs>(args: Subset<T, ContactMessageAggregateArgs>): Prisma.PrismaPromise<GetContactMessageAggregateType<T>>

    /**
     * Group by ContactMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactMessageGroupByArgs['orderBy'] }
        : { orderBy?: ContactMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactMessage model
   */
  readonly fields: ContactMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContactMessage model
   */
  interface ContactMessageFieldRefs {
    readonly id: FieldRef<"ContactMessage", 'Int'>
    readonly firstName: FieldRef<"ContactMessage", 'String'>
    readonly lastName: FieldRef<"ContactMessage", 'String'>
    readonly email: FieldRef<"ContactMessage", 'String'>
    readonly phone: FieldRef<"ContactMessage", 'String'>
    readonly subject: FieldRef<"ContactMessage", 'String'>
    readonly message: FieldRef<"ContactMessage", 'String'>
    readonly createdAt: FieldRef<"ContactMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContactMessage findUnique
   */
  export type ContactMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage findUniqueOrThrow
   */
  export type ContactMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage findFirst
   */
  export type ContactMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage findFirstOrThrow
   */
  export type ContactMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage findMany
   */
  export type ContactMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessages to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage create
   */
  export type ContactMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a ContactMessage.
     */
    data: XOR<ContactMessageCreateInput, ContactMessageUncheckedCreateInput>
  }

  /**
   * ContactMessage createMany
   */
  export type ContactMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactMessages.
     */
    data: ContactMessageCreateManyInput | ContactMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactMessage update
   */
  export type ContactMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a ContactMessage.
     */
    data: XOR<ContactMessageUpdateInput, ContactMessageUncheckedUpdateInput>
    /**
     * Choose, which ContactMessage to update.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage updateMany
   */
  export type ContactMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactMessages.
     */
    data: XOR<ContactMessageUpdateManyMutationInput, ContactMessageUncheckedUpdateManyInput>
    /**
     * Filter which ContactMessages to update
     */
    where?: ContactMessageWhereInput
    /**
     * Limit how many ContactMessages to update.
     */
    limit?: number
  }

  /**
   * ContactMessage upsert
   */
  export type ContactMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the ContactMessage to update in case it exists.
     */
    where: ContactMessageWhereUniqueInput
    /**
     * In case the ContactMessage found by the `where` argument doesn't exist, create a new ContactMessage with this data.
     */
    create: XOR<ContactMessageCreateInput, ContactMessageUncheckedCreateInput>
    /**
     * In case the ContactMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactMessageUpdateInput, ContactMessageUncheckedUpdateInput>
  }

  /**
   * ContactMessage delete
   */
  export type ContactMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter which ContactMessage to delete.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage deleteMany
   */
  export type ContactMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactMessages to delete
     */
    where?: ContactMessageWhereInput
    /**
     * Limit how many ContactMessages to delete.
     */
    limit?: number
  }

  /**
   * ContactMessage without action
   */
  export type ContactMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: 'phone',
    city: 'city',
    state: 'state',
    userType: 'userType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MusicianProfileScalarFieldEnum: {
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

  export type MusicianProfileScalarFieldEnum = (typeof MusicianProfileScalarFieldEnum)[keyof typeof MusicianProfileScalarFieldEnum]


  export const PortfolioItemScalarFieldEnum: {
    id: 'id',
    musicianProfileId: 'musicianProfileId',
    type: 'type',
    url: 'url',
    title: 'title',
    description: 'description',
    date: 'date',
    location: 'location',
    genre: 'genre',
    createdAt: 'createdAt'
  };

  export type PortfolioItemScalarFieldEnum = (typeof PortfolioItemScalarFieldEnum)[keyof typeof PortfolioItemScalarFieldEnum]


  export const GenreScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug'
  };

  export type GenreScalarFieldEnum = (typeof GenreScalarFieldEnum)[keyof typeof GenreScalarFieldEnum]


  export const InstrumentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug'
  };

  export type InstrumentScalarFieldEnum = (typeof InstrumentScalarFieldEnum)[keyof typeof InstrumentScalarFieldEnum]


  export const MusicianGenreScalarFieldEnum: {
    musicianProfileId: 'musicianProfileId',
    genreId: 'genreId'
  };

  export type MusicianGenreScalarFieldEnum = (typeof MusicianGenreScalarFieldEnum)[keyof typeof MusicianGenreScalarFieldEnum]


  export const MusicianInstrumentScalarFieldEnum: {
    musicianProfileId: 'musicianProfileId',
    instrumentId: 'instrumentId'
  };

  export type MusicianInstrumentScalarFieldEnum = (typeof MusicianInstrumentScalarFieldEnum)[keyof typeof MusicianInstrumentScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    musicianProfileId: 'musicianProfileId',
    clientId: 'clientId',
    rating: 'rating',
    content: 'content',
    date: 'date',
    event: 'event',
    createdAt: 'createdAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const BookingScalarFieldEnum: {
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

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


  export const PlanScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    monthlyPrice: 'monthlyPrice',
    yearlyPrice: 'yearlyPrice',
    badge: 'badge',
    isMusicianPlan: 'isMusicianPlan',
    isClientPlan: 'isClientPlan',
    createdAt: 'createdAt'
  };

  export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum]


  export const PlanFeatureScalarFieldEnum: {
    id: 'id',
    planId: 'planId',
    text: 'text',
    available: 'available',
    highlight: 'highlight'
  };

  export type PlanFeatureScalarFieldEnum = (typeof PlanFeatureScalarFieldEnum)[keyof typeof PlanFeatureScalarFieldEnum]


  export const FAQItemScalarFieldEnum: {
    id: 'id',
    question: 'question',
    answer: 'answer',
    category: 'category',
    createdAt: 'createdAt'
  };

  export type FAQItemScalarFieldEnum = (typeof FAQItemScalarFieldEnum)[keyof typeof FAQItemScalarFieldEnum]


  export const ContactMessageScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    subject: 'subject',
    message: 'message',
    createdAt: 'createdAt'
  };

  export type ContactMessageScalarFieldEnum = (typeof ContactMessageScalarFieldEnum)[keyof typeof ContactMessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    email: 'email',
    passwordHash: 'passwordHash',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: 'phone',
    city: 'city',
    state: 'state'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const MusicianProfileOrderByRelevanceFieldEnum: {
    category: 'category',
    bio: 'bio',
    location: 'location',
    experience: 'experience',
    equipment: 'equipment',
    availability: 'availability',
    responseTime: 'responseTime'
  };

  export type MusicianProfileOrderByRelevanceFieldEnum = (typeof MusicianProfileOrderByRelevanceFieldEnum)[keyof typeof MusicianProfileOrderByRelevanceFieldEnum]


  export const PortfolioItemOrderByRelevanceFieldEnum: {
    url: 'url',
    title: 'title',
    description: 'description',
    date: 'date',
    location: 'location',
    genre: 'genre'
  };

  export type PortfolioItemOrderByRelevanceFieldEnum = (typeof PortfolioItemOrderByRelevanceFieldEnum)[keyof typeof PortfolioItemOrderByRelevanceFieldEnum]


  export const GenreOrderByRelevanceFieldEnum: {
    name: 'name',
    slug: 'slug'
  };

  export type GenreOrderByRelevanceFieldEnum = (typeof GenreOrderByRelevanceFieldEnum)[keyof typeof GenreOrderByRelevanceFieldEnum]


  export const InstrumentOrderByRelevanceFieldEnum: {
    name: 'name',
    slug: 'slug'
  };

  export type InstrumentOrderByRelevanceFieldEnum = (typeof InstrumentOrderByRelevanceFieldEnum)[keyof typeof InstrumentOrderByRelevanceFieldEnum]


  export const ReviewOrderByRelevanceFieldEnum: {
    content: 'content',
    date: 'date',
    event: 'event'
  };

  export type ReviewOrderByRelevanceFieldEnum = (typeof ReviewOrderByRelevanceFieldEnum)[keyof typeof ReviewOrderByRelevanceFieldEnum]


  export const BookingOrderByRelevanceFieldEnum: {
    eventType: 'eventType',
    message: 'message',
    status: 'status'
  };

  export type BookingOrderByRelevanceFieldEnum = (typeof BookingOrderByRelevanceFieldEnum)[keyof typeof BookingOrderByRelevanceFieldEnum]


  export const PlanOrderByRelevanceFieldEnum: {
    title: 'title',
    description: 'description',
    badge: 'badge'
  };

  export type PlanOrderByRelevanceFieldEnum = (typeof PlanOrderByRelevanceFieldEnum)[keyof typeof PlanOrderByRelevanceFieldEnum]


  export const PlanFeatureOrderByRelevanceFieldEnum: {
    text: 'text'
  };

  export type PlanFeatureOrderByRelevanceFieldEnum = (typeof PlanFeatureOrderByRelevanceFieldEnum)[keyof typeof PlanFeatureOrderByRelevanceFieldEnum]


  export const FAQItemOrderByRelevanceFieldEnum: {
    question: 'question',
    answer: 'answer',
    category: 'category'
  };

  export type FAQItemOrderByRelevanceFieldEnum = (typeof FAQItemOrderByRelevanceFieldEnum)[keyof typeof FAQItemOrderByRelevanceFieldEnum]


  export const ContactMessageOrderByRelevanceFieldEnum: {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    subject: 'subject',
    message: 'message'
  };

  export type ContactMessageOrderByRelevanceFieldEnum = (typeof ContactMessageOrderByRelevanceFieldEnum)[keyof typeof ContactMessageOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'UserType'
   */
  export type EnumUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserType'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PortfolioItemType'
   */
  export type EnumPortfolioItemTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PortfolioItemType'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    state?: StringNullableFilter<"User"> | string | null
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    musicianProfile?: XOR<MusicianProfileNullableScalarRelationFilter, MusicianProfileWhereInput> | null
    reviewsGiven?: ReviewListRelationFilter
    bookings?: BookingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    userType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    musicianProfile?: MusicianProfileOrderByWithRelationInput
    reviewsGiven?: ReviewOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    city?: StringNullableFilter<"User"> | string | null
    state?: StringNullableFilter<"User"> | string | null
    userType?: EnumUserTypeFilter<"User"> | $Enums.UserType
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    musicianProfile?: XOR<MusicianProfileNullableScalarRelationFilter, MusicianProfileWhereInput> | null
    reviewsGiven?: ReviewListRelationFilter
    bookings?: BookingListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    userType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    city?: StringNullableWithAggregatesFilter<"User"> | string | null
    state?: StringNullableWithAggregatesFilter<"User"> | string | null
    userType?: EnumUserTypeWithAggregatesFilter<"User"> | $Enums.UserType
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MusicianProfileWhereInput = {
    AND?: MusicianProfileWhereInput | MusicianProfileWhereInput[]
    OR?: MusicianProfileWhereInput[]
    NOT?: MusicianProfileWhereInput | MusicianProfileWhereInput[]
    id?: IntFilter<"MusicianProfile"> | number
    userId?: IntFilter<"MusicianProfile"> | number
    category?: StringNullableFilter<"MusicianProfile"> | string | null
    bio?: StringNullableFilter<"MusicianProfile"> | string | null
    location?: StringNullableFilter<"MusicianProfile"> | string | null
    priceFrom?: IntNullableFilter<"MusicianProfile"> | number | null
    experience?: StringNullableFilter<"MusicianProfile"> | string | null
    equipment?: StringNullableFilter<"MusicianProfile"> | string | null
    availability?: StringNullableFilter<"MusicianProfile"> | string | null
    rating?: FloatFilter<"MusicianProfile"> | number
    ratingCount?: IntFilter<"MusicianProfile"> | number
    eventsCount?: IntFilter<"MusicianProfile"> | number
    satisfactionRate?: IntNullableFilter<"MusicianProfile"> | number | null
    responseTime?: StringNullableFilter<"MusicianProfile"> | string | null
    isFeatured?: BoolFilter<"MusicianProfile"> | boolean
    createdAt?: DateTimeFilter<"MusicianProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MusicianProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    portfolio?: PortfolioItemListRelationFilter
    reviewsReceived?: ReviewListRelationFilter
    musicianGenres?: MusicianGenreListRelationFilter
    musicianInstruments?: MusicianInstrumentListRelationFilter
    bookings?: BookingListRelationFilter
  }

  export type MusicianProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    category?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    priceFrom?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    equipment?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    eventsCount?: SortOrder
    satisfactionRate?: SortOrderInput | SortOrder
    responseTime?: SortOrderInput | SortOrder
    isFeatured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    portfolio?: PortfolioItemOrderByRelationAggregateInput
    reviewsReceived?: ReviewOrderByRelationAggregateInput
    musicianGenres?: MusicianGenreOrderByRelationAggregateInput
    musicianInstruments?: MusicianInstrumentOrderByRelationAggregateInput
    bookings?: BookingOrderByRelationAggregateInput
    _relevance?: MusicianProfileOrderByRelevanceInput
  }

  export type MusicianProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: MusicianProfileWhereInput | MusicianProfileWhereInput[]
    OR?: MusicianProfileWhereInput[]
    NOT?: MusicianProfileWhereInput | MusicianProfileWhereInput[]
    category?: StringNullableFilter<"MusicianProfile"> | string | null
    bio?: StringNullableFilter<"MusicianProfile"> | string | null
    location?: StringNullableFilter<"MusicianProfile"> | string | null
    priceFrom?: IntNullableFilter<"MusicianProfile"> | number | null
    experience?: StringNullableFilter<"MusicianProfile"> | string | null
    equipment?: StringNullableFilter<"MusicianProfile"> | string | null
    availability?: StringNullableFilter<"MusicianProfile"> | string | null
    rating?: FloatFilter<"MusicianProfile"> | number
    ratingCount?: IntFilter<"MusicianProfile"> | number
    eventsCount?: IntFilter<"MusicianProfile"> | number
    satisfactionRate?: IntNullableFilter<"MusicianProfile"> | number | null
    responseTime?: StringNullableFilter<"MusicianProfile"> | string | null
    isFeatured?: BoolFilter<"MusicianProfile"> | boolean
    createdAt?: DateTimeFilter<"MusicianProfile"> | Date | string
    updatedAt?: DateTimeFilter<"MusicianProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    portfolio?: PortfolioItemListRelationFilter
    reviewsReceived?: ReviewListRelationFilter
    musicianGenres?: MusicianGenreListRelationFilter
    musicianInstruments?: MusicianInstrumentListRelationFilter
    bookings?: BookingListRelationFilter
  }, "id" | "userId">

  export type MusicianProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    category?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    priceFrom?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    equipment?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    eventsCount?: SortOrder
    satisfactionRate?: SortOrderInput | SortOrder
    responseTime?: SortOrderInput | SortOrder
    isFeatured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MusicianProfileCountOrderByAggregateInput
    _avg?: MusicianProfileAvgOrderByAggregateInput
    _max?: MusicianProfileMaxOrderByAggregateInput
    _min?: MusicianProfileMinOrderByAggregateInput
    _sum?: MusicianProfileSumOrderByAggregateInput
  }

  export type MusicianProfileScalarWhereWithAggregatesInput = {
    AND?: MusicianProfileScalarWhereWithAggregatesInput | MusicianProfileScalarWhereWithAggregatesInput[]
    OR?: MusicianProfileScalarWhereWithAggregatesInput[]
    NOT?: MusicianProfileScalarWhereWithAggregatesInput | MusicianProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MusicianProfile"> | number
    userId?: IntWithAggregatesFilter<"MusicianProfile"> | number
    category?: StringNullableWithAggregatesFilter<"MusicianProfile"> | string | null
    bio?: StringNullableWithAggregatesFilter<"MusicianProfile"> | string | null
    location?: StringNullableWithAggregatesFilter<"MusicianProfile"> | string | null
    priceFrom?: IntNullableWithAggregatesFilter<"MusicianProfile"> | number | null
    experience?: StringNullableWithAggregatesFilter<"MusicianProfile"> | string | null
    equipment?: StringNullableWithAggregatesFilter<"MusicianProfile"> | string | null
    availability?: StringNullableWithAggregatesFilter<"MusicianProfile"> | string | null
    rating?: FloatWithAggregatesFilter<"MusicianProfile"> | number
    ratingCount?: IntWithAggregatesFilter<"MusicianProfile"> | number
    eventsCount?: IntWithAggregatesFilter<"MusicianProfile"> | number
    satisfactionRate?: IntNullableWithAggregatesFilter<"MusicianProfile"> | number | null
    responseTime?: StringNullableWithAggregatesFilter<"MusicianProfile"> | string | null
    isFeatured?: BoolWithAggregatesFilter<"MusicianProfile"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MusicianProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MusicianProfile"> | Date | string
  }

  export type PortfolioItemWhereInput = {
    AND?: PortfolioItemWhereInput | PortfolioItemWhereInput[]
    OR?: PortfolioItemWhereInput[]
    NOT?: PortfolioItemWhereInput | PortfolioItemWhereInput[]
    id?: IntFilter<"PortfolioItem"> | number
    musicianProfileId?: IntFilter<"PortfolioItem"> | number
    type?: EnumPortfolioItemTypeFilter<"PortfolioItem"> | $Enums.PortfolioItemType
    url?: StringFilter<"PortfolioItem"> | string
    title?: StringFilter<"PortfolioItem"> | string
    description?: StringNullableFilter<"PortfolioItem"> | string | null
    date?: StringNullableFilter<"PortfolioItem"> | string | null
    location?: StringNullableFilter<"PortfolioItem"> | string | null
    genre?: StringNullableFilter<"PortfolioItem"> | string | null
    createdAt?: DateTimeFilter<"PortfolioItem"> | Date | string
    musicianProfile?: XOR<MusicianProfileScalarRelationFilter, MusicianProfileWhereInput>
  }

  export type PortfolioItemOrderByWithRelationInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    type?: SortOrder
    url?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    musicianProfile?: MusicianProfileOrderByWithRelationInput
    _relevance?: PortfolioItemOrderByRelevanceInput
  }

  export type PortfolioItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PortfolioItemWhereInput | PortfolioItemWhereInput[]
    OR?: PortfolioItemWhereInput[]
    NOT?: PortfolioItemWhereInput | PortfolioItemWhereInput[]
    musicianProfileId?: IntFilter<"PortfolioItem"> | number
    type?: EnumPortfolioItemTypeFilter<"PortfolioItem"> | $Enums.PortfolioItemType
    url?: StringFilter<"PortfolioItem"> | string
    title?: StringFilter<"PortfolioItem"> | string
    description?: StringNullableFilter<"PortfolioItem"> | string | null
    date?: StringNullableFilter<"PortfolioItem"> | string | null
    location?: StringNullableFilter<"PortfolioItem"> | string | null
    genre?: StringNullableFilter<"PortfolioItem"> | string | null
    createdAt?: DateTimeFilter<"PortfolioItem"> | Date | string
    musicianProfile?: XOR<MusicianProfileScalarRelationFilter, MusicianProfileWhereInput>
  }, "id">

  export type PortfolioItemOrderByWithAggregationInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    type?: SortOrder
    url?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PortfolioItemCountOrderByAggregateInput
    _avg?: PortfolioItemAvgOrderByAggregateInput
    _max?: PortfolioItemMaxOrderByAggregateInput
    _min?: PortfolioItemMinOrderByAggregateInput
    _sum?: PortfolioItemSumOrderByAggregateInput
  }

  export type PortfolioItemScalarWhereWithAggregatesInput = {
    AND?: PortfolioItemScalarWhereWithAggregatesInput | PortfolioItemScalarWhereWithAggregatesInput[]
    OR?: PortfolioItemScalarWhereWithAggregatesInput[]
    NOT?: PortfolioItemScalarWhereWithAggregatesInput | PortfolioItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PortfolioItem"> | number
    musicianProfileId?: IntWithAggregatesFilter<"PortfolioItem"> | number
    type?: EnumPortfolioItemTypeWithAggregatesFilter<"PortfolioItem"> | $Enums.PortfolioItemType
    url?: StringWithAggregatesFilter<"PortfolioItem"> | string
    title?: StringWithAggregatesFilter<"PortfolioItem"> | string
    description?: StringNullableWithAggregatesFilter<"PortfolioItem"> | string | null
    date?: StringNullableWithAggregatesFilter<"PortfolioItem"> | string | null
    location?: StringNullableWithAggregatesFilter<"PortfolioItem"> | string | null
    genre?: StringNullableWithAggregatesFilter<"PortfolioItem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PortfolioItem"> | Date | string
  }

  export type GenreWhereInput = {
    AND?: GenreWhereInput | GenreWhereInput[]
    OR?: GenreWhereInput[]
    NOT?: GenreWhereInput | GenreWhereInput[]
    id?: IntFilter<"Genre"> | number
    name?: StringFilter<"Genre"> | string
    slug?: StringFilter<"Genre"> | string
    musicianGenres?: MusicianGenreListRelationFilter
  }

  export type GenreOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    musicianGenres?: MusicianGenreOrderByRelationAggregateInput
    _relevance?: GenreOrderByRelevanceInput
  }

  export type GenreWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    AND?: GenreWhereInput | GenreWhereInput[]
    OR?: GenreWhereInput[]
    NOT?: GenreWhereInput | GenreWhereInput[]
    musicianGenres?: MusicianGenreListRelationFilter
  }, "id" | "name" | "slug">

  export type GenreOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    _count?: GenreCountOrderByAggregateInput
    _avg?: GenreAvgOrderByAggregateInput
    _max?: GenreMaxOrderByAggregateInput
    _min?: GenreMinOrderByAggregateInput
    _sum?: GenreSumOrderByAggregateInput
  }

  export type GenreScalarWhereWithAggregatesInput = {
    AND?: GenreScalarWhereWithAggregatesInput | GenreScalarWhereWithAggregatesInput[]
    OR?: GenreScalarWhereWithAggregatesInput[]
    NOT?: GenreScalarWhereWithAggregatesInput | GenreScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Genre"> | number
    name?: StringWithAggregatesFilter<"Genre"> | string
    slug?: StringWithAggregatesFilter<"Genre"> | string
  }

  export type InstrumentWhereInput = {
    AND?: InstrumentWhereInput | InstrumentWhereInput[]
    OR?: InstrumentWhereInput[]
    NOT?: InstrumentWhereInput | InstrumentWhereInput[]
    id?: IntFilter<"Instrument"> | number
    name?: StringFilter<"Instrument"> | string
    slug?: StringFilter<"Instrument"> | string
    musicianInstruments?: MusicianInstrumentListRelationFilter
  }

  export type InstrumentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    musicianInstruments?: MusicianInstrumentOrderByRelationAggregateInput
    _relevance?: InstrumentOrderByRelevanceInput
  }

  export type InstrumentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    AND?: InstrumentWhereInput | InstrumentWhereInput[]
    OR?: InstrumentWhereInput[]
    NOT?: InstrumentWhereInput | InstrumentWhereInput[]
    musicianInstruments?: MusicianInstrumentListRelationFilter
  }, "id" | "name" | "slug">

  export type InstrumentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    _count?: InstrumentCountOrderByAggregateInput
    _avg?: InstrumentAvgOrderByAggregateInput
    _max?: InstrumentMaxOrderByAggregateInput
    _min?: InstrumentMinOrderByAggregateInput
    _sum?: InstrumentSumOrderByAggregateInput
  }

  export type InstrumentScalarWhereWithAggregatesInput = {
    AND?: InstrumentScalarWhereWithAggregatesInput | InstrumentScalarWhereWithAggregatesInput[]
    OR?: InstrumentScalarWhereWithAggregatesInput[]
    NOT?: InstrumentScalarWhereWithAggregatesInput | InstrumentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Instrument"> | number
    name?: StringWithAggregatesFilter<"Instrument"> | string
    slug?: StringWithAggregatesFilter<"Instrument"> | string
  }

  export type MusicianGenreWhereInput = {
    AND?: MusicianGenreWhereInput | MusicianGenreWhereInput[]
    OR?: MusicianGenreWhereInput[]
    NOT?: MusicianGenreWhereInput | MusicianGenreWhereInput[]
    musicianProfileId?: IntFilter<"MusicianGenre"> | number
    genreId?: IntFilter<"MusicianGenre"> | number
    musicianProfile?: XOR<MusicianProfileScalarRelationFilter, MusicianProfileWhereInput>
    genre?: XOR<GenreScalarRelationFilter, GenreWhereInput>
  }

  export type MusicianGenreOrderByWithRelationInput = {
    musicianProfileId?: SortOrder
    genreId?: SortOrder
    musicianProfile?: MusicianProfileOrderByWithRelationInput
    genre?: GenreOrderByWithRelationInput
  }

  export type MusicianGenreWhereUniqueInput = Prisma.AtLeast<{
    musicianProfileId_genreId?: MusicianGenreMusicianProfileIdGenreIdCompoundUniqueInput
    AND?: MusicianGenreWhereInput | MusicianGenreWhereInput[]
    OR?: MusicianGenreWhereInput[]
    NOT?: MusicianGenreWhereInput | MusicianGenreWhereInput[]
    musicianProfileId?: IntFilter<"MusicianGenre"> | number
    genreId?: IntFilter<"MusicianGenre"> | number
    musicianProfile?: XOR<MusicianProfileScalarRelationFilter, MusicianProfileWhereInput>
    genre?: XOR<GenreScalarRelationFilter, GenreWhereInput>
  }, "musicianProfileId_genreId">

  export type MusicianGenreOrderByWithAggregationInput = {
    musicianProfileId?: SortOrder
    genreId?: SortOrder
    _count?: MusicianGenreCountOrderByAggregateInput
    _avg?: MusicianGenreAvgOrderByAggregateInput
    _max?: MusicianGenreMaxOrderByAggregateInput
    _min?: MusicianGenreMinOrderByAggregateInput
    _sum?: MusicianGenreSumOrderByAggregateInput
  }

  export type MusicianGenreScalarWhereWithAggregatesInput = {
    AND?: MusicianGenreScalarWhereWithAggregatesInput | MusicianGenreScalarWhereWithAggregatesInput[]
    OR?: MusicianGenreScalarWhereWithAggregatesInput[]
    NOT?: MusicianGenreScalarWhereWithAggregatesInput | MusicianGenreScalarWhereWithAggregatesInput[]
    musicianProfileId?: IntWithAggregatesFilter<"MusicianGenre"> | number
    genreId?: IntWithAggregatesFilter<"MusicianGenre"> | number
  }

  export type MusicianInstrumentWhereInput = {
    AND?: MusicianInstrumentWhereInput | MusicianInstrumentWhereInput[]
    OR?: MusicianInstrumentWhereInput[]
    NOT?: MusicianInstrumentWhereInput | MusicianInstrumentWhereInput[]
    musicianProfileId?: IntFilter<"MusicianInstrument"> | number
    instrumentId?: IntFilter<"MusicianInstrument"> | number
    musicianProfile?: XOR<MusicianProfileScalarRelationFilter, MusicianProfileWhereInput>
    instrument?: XOR<InstrumentScalarRelationFilter, InstrumentWhereInput>
  }

  export type MusicianInstrumentOrderByWithRelationInput = {
    musicianProfileId?: SortOrder
    instrumentId?: SortOrder
    musicianProfile?: MusicianProfileOrderByWithRelationInput
    instrument?: InstrumentOrderByWithRelationInput
  }

  export type MusicianInstrumentWhereUniqueInput = Prisma.AtLeast<{
    musicianProfileId_instrumentId?: MusicianInstrumentMusicianProfileIdInstrumentIdCompoundUniqueInput
    AND?: MusicianInstrumentWhereInput | MusicianInstrumentWhereInput[]
    OR?: MusicianInstrumentWhereInput[]
    NOT?: MusicianInstrumentWhereInput | MusicianInstrumentWhereInput[]
    musicianProfileId?: IntFilter<"MusicianInstrument"> | number
    instrumentId?: IntFilter<"MusicianInstrument"> | number
    musicianProfile?: XOR<MusicianProfileScalarRelationFilter, MusicianProfileWhereInput>
    instrument?: XOR<InstrumentScalarRelationFilter, InstrumentWhereInput>
  }, "musicianProfileId_instrumentId">

  export type MusicianInstrumentOrderByWithAggregationInput = {
    musicianProfileId?: SortOrder
    instrumentId?: SortOrder
    _count?: MusicianInstrumentCountOrderByAggregateInput
    _avg?: MusicianInstrumentAvgOrderByAggregateInput
    _max?: MusicianInstrumentMaxOrderByAggregateInput
    _min?: MusicianInstrumentMinOrderByAggregateInput
    _sum?: MusicianInstrumentSumOrderByAggregateInput
  }

  export type MusicianInstrumentScalarWhereWithAggregatesInput = {
    AND?: MusicianInstrumentScalarWhereWithAggregatesInput | MusicianInstrumentScalarWhereWithAggregatesInput[]
    OR?: MusicianInstrumentScalarWhereWithAggregatesInput[]
    NOT?: MusicianInstrumentScalarWhereWithAggregatesInput | MusicianInstrumentScalarWhereWithAggregatesInput[]
    musicianProfileId?: IntWithAggregatesFilter<"MusicianInstrument"> | number
    instrumentId?: IntWithAggregatesFilter<"MusicianInstrument"> | number
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: IntFilter<"Review"> | number
    musicianProfileId?: IntFilter<"Review"> | number
    clientId?: IntFilter<"Review"> | number
    rating?: IntFilter<"Review"> | number
    content?: StringFilter<"Review"> | string
    date?: StringFilter<"Review"> | string
    event?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    musicianProfile?: XOR<MusicianProfileScalarRelationFilter, MusicianProfileWhereInput>
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    date?: SortOrder
    event?: SortOrder
    createdAt?: SortOrder
    musicianProfile?: MusicianProfileOrderByWithRelationInput
    client?: UserOrderByWithRelationInput
    _relevance?: ReviewOrderByRelevanceInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    musicianProfileId?: IntFilter<"Review"> | number
    clientId?: IntFilter<"Review"> | number
    rating?: IntFilter<"Review"> | number
    content?: StringFilter<"Review"> | string
    date?: StringFilter<"Review"> | string
    event?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    musicianProfile?: XOR<MusicianProfileScalarRelationFilter, MusicianProfileWhereInput>
    client?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    date?: SortOrder
    event?: SortOrder
    createdAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Review"> | number
    musicianProfileId?: IntWithAggregatesFilter<"Review"> | number
    clientId?: IntWithAggregatesFilter<"Review"> | number
    rating?: IntWithAggregatesFilter<"Review"> | number
    content?: StringWithAggregatesFilter<"Review"> | string
    date?: StringWithAggregatesFilter<"Review"> | string
    event?: StringWithAggregatesFilter<"Review"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: IntFilter<"Booking"> | number
    musicianProfileId?: IntFilter<"Booking"> | number
    clientId?: IntNullableFilter<"Booking"> | number | null
    eventDate?: DateTimeFilter<"Booking"> | Date | string
    eventType?: StringFilter<"Booking"> | string
    message?: StringFilter<"Booking"> | string
    status?: StringFilter<"Booking"> | string
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    musicianProfile?: XOR<MusicianProfileScalarRelationFilter, MusicianProfileWhereInput>
    client?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrderInput | SortOrder
    eventDate?: SortOrder
    eventType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    musicianProfile?: MusicianProfileOrderByWithRelationInput
    client?: UserOrderByWithRelationInput
    _relevance?: BookingOrderByRelevanceInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    musicianProfileId?: IntFilter<"Booking"> | number
    clientId?: IntNullableFilter<"Booking"> | number | null
    eventDate?: DateTimeFilter<"Booking"> | Date | string
    eventType?: StringFilter<"Booking"> | string
    message?: StringFilter<"Booking"> | string
    status?: StringFilter<"Booking"> | string
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
    musicianProfile?: XOR<MusicianProfileScalarRelationFilter, MusicianProfileWhereInput>
    client?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrderInput | SortOrder
    eventDate?: SortOrder
    eventType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _avg?: BookingAvgOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
    _sum?: BookingSumOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Booking"> | number
    musicianProfileId?: IntWithAggregatesFilter<"Booking"> | number
    clientId?: IntNullableWithAggregatesFilter<"Booking"> | number | null
    eventDate?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    eventType?: StringWithAggregatesFilter<"Booking"> | string
    message?: StringWithAggregatesFilter<"Booking"> | string
    status?: StringWithAggregatesFilter<"Booking"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
  }

  export type PlanWhereInput = {
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    id?: IntFilter<"Plan"> | number
    title?: StringFilter<"Plan"> | string
    description?: StringNullableFilter<"Plan"> | string | null
    monthlyPrice?: IntFilter<"Plan"> | number
    yearlyPrice?: IntFilter<"Plan"> | number
    badge?: StringNullableFilter<"Plan"> | string | null
    isMusicianPlan?: BoolFilter<"Plan"> | boolean
    isClientPlan?: BoolFilter<"Plan"> | boolean
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    features?: PlanFeatureListRelationFilter
  }

  export type PlanOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    monthlyPrice?: SortOrder
    yearlyPrice?: SortOrder
    badge?: SortOrderInput | SortOrder
    isMusicianPlan?: SortOrder
    isClientPlan?: SortOrder
    createdAt?: SortOrder
    features?: PlanFeatureOrderByRelationAggregateInput
    _relevance?: PlanOrderByRelevanceInput
  }

  export type PlanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    title?: string
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    description?: StringNullableFilter<"Plan"> | string | null
    monthlyPrice?: IntFilter<"Plan"> | number
    yearlyPrice?: IntFilter<"Plan"> | number
    badge?: StringNullableFilter<"Plan"> | string | null
    isMusicianPlan?: BoolFilter<"Plan"> | boolean
    isClientPlan?: BoolFilter<"Plan"> | boolean
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    features?: PlanFeatureListRelationFilter
  }, "id" | "title">

  export type PlanOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    monthlyPrice?: SortOrder
    yearlyPrice?: SortOrder
    badge?: SortOrderInput | SortOrder
    isMusicianPlan?: SortOrder
    isClientPlan?: SortOrder
    createdAt?: SortOrder
    _count?: PlanCountOrderByAggregateInput
    _avg?: PlanAvgOrderByAggregateInput
    _max?: PlanMaxOrderByAggregateInput
    _min?: PlanMinOrderByAggregateInput
    _sum?: PlanSumOrderByAggregateInput
  }

  export type PlanScalarWhereWithAggregatesInput = {
    AND?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    OR?: PlanScalarWhereWithAggregatesInput[]
    NOT?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Plan"> | number
    title?: StringWithAggregatesFilter<"Plan"> | string
    description?: StringNullableWithAggregatesFilter<"Plan"> | string | null
    monthlyPrice?: IntWithAggregatesFilter<"Plan"> | number
    yearlyPrice?: IntWithAggregatesFilter<"Plan"> | number
    badge?: StringNullableWithAggregatesFilter<"Plan"> | string | null
    isMusicianPlan?: BoolWithAggregatesFilter<"Plan"> | boolean
    isClientPlan?: BoolWithAggregatesFilter<"Plan"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
  }

  export type PlanFeatureWhereInput = {
    AND?: PlanFeatureWhereInput | PlanFeatureWhereInput[]
    OR?: PlanFeatureWhereInput[]
    NOT?: PlanFeatureWhereInput | PlanFeatureWhereInput[]
    id?: IntFilter<"PlanFeature"> | number
    planId?: IntFilter<"PlanFeature"> | number
    text?: StringFilter<"PlanFeature"> | string
    available?: BoolFilter<"PlanFeature"> | boolean
    highlight?: BoolFilter<"PlanFeature"> | boolean
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
  }

  export type PlanFeatureOrderByWithRelationInput = {
    id?: SortOrder
    planId?: SortOrder
    text?: SortOrder
    available?: SortOrder
    highlight?: SortOrder
    plan?: PlanOrderByWithRelationInput
    _relevance?: PlanFeatureOrderByRelevanceInput
  }

  export type PlanFeatureWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PlanFeatureWhereInput | PlanFeatureWhereInput[]
    OR?: PlanFeatureWhereInput[]
    NOT?: PlanFeatureWhereInput | PlanFeatureWhereInput[]
    planId?: IntFilter<"PlanFeature"> | number
    text?: StringFilter<"PlanFeature"> | string
    available?: BoolFilter<"PlanFeature"> | boolean
    highlight?: BoolFilter<"PlanFeature"> | boolean
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
  }, "id">

  export type PlanFeatureOrderByWithAggregationInput = {
    id?: SortOrder
    planId?: SortOrder
    text?: SortOrder
    available?: SortOrder
    highlight?: SortOrder
    _count?: PlanFeatureCountOrderByAggregateInput
    _avg?: PlanFeatureAvgOrderByAggregateInput
    _max?: PlanFeatureMaxOrderByAggregateInput
    _min?: PlanFeatureMinOrderByAggregateInput
    _sum?: PlanFeatureSumOrderByAggregateInput
  }

  export type PlanFeatureScalarWhereWithAggregatesInput = {
    AND?: PlanFeatureScalarWhereWithAggregatesInput | PlanFeatureScalarWhereWithAggregatesInput[]
    OR?: PlanFeatureScalarWhereWithAggregatesInput[]
    NOT?: PlanFeatureScalarWhereWithAggregatesInput | PlanFeatureScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PlanFeature"> | number
    planId?: IntWithAggregatesFilter<"PlanFeature"> | number
    text?: StringWithAggregatesFilter<"PlanFeature"> | string
    available?: BoolWithAggregatesFilter<"PlanFeature"> | boolean
    highlight?: BoolWithAggregatesFilter<"PlanFeature"> | boolean
  }

  export type FAQItemWhereInput = {
    AND?: FAQItemWhereInput | FAQItemWhereInput[]
    OR?: FAQItemWhereInput[]
    NOT?: FAQItemWhereInput | FAQItemWhereInput[]
    id?: IntFilter<"FAQItem"> | number
    question?: StringFilter<"FAQItem"> | string
    answer?: StringFilter<"FAQItem"> | string
    category?: StringNullableFilter<"FAQItem"> | string | null
    createdAt?: DateTimeFilter<"FAQItem"> | Date | string
  }

  export type FAQItemOrderByWithRelationInput = {
    id?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    category?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _relevance?: FAQItemOrderByRelevanceInput
  }

  export type FAQItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FAQItemWhereInput | FAQItemWhereInput[]
    OR?: FAQItemWhereInput[]
    NOT?: FAQItemWhereInput | FAQItemWhereInput[]
    question?: StringFilter<"FAQItem"> | string
    answer?: StringFilter<"FAQItem"> | string
    category?: StringNullableFilter<"FAQItem"> | string | null
    createdAt?: DateTimeFilter<"FAQItem"> | Date | string
  }, "id">

  export type FAQItemOrderByWithAggregationInput = {
    id?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    category?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FAQItemCountOrderByAggregateInput
    _avg?: FAQItemAvgOrderByAggregateInput
    _max?: FAQItemMaxOrderByAggregateInput
    _min?: FAQItemMinOrderByAggregateInput
    _sum?: FAQItemSumOrderByAggregateInput
  }

  export type FAQItemScalarWhereWithAggregatesInput = {
    AND?: FAQItemScalarWhereWithAggregatesInput | FAQItemScalarWhereWithAggregatesInput[]
    OR?: FAQItemScalarWhereWithAggregatesInput[]
    NOT?: FAQItemScalarWhereWithAggregatesInput | FAQItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FAQItem"> | number
    question?: StringWithAggregatesFilter<"FAQItem"> | string
    answer?: StringWithAggregatesFilter<"FAQItem"> | string
    category?: StringNullableWithAggregatesFilter<"FAQItem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FAQItem"> | Date | string
  }

  export type ContactMessageWhereInput = {
    AND?: ContactMessageWhereInput | ContactMessageWhereInput[]
    OR?: ContactMessageWhereInput[]
    NOT?: ContactMessageWhereInput | ContactMessageWhereInput[]
    id?: IntFilter<"ContactMessage"> | number
    firstName?: StringFilter<"ContactMessage"> | string
    lastName?: StringFilter<"ContactMessage"> | string
    email?: StringFilter<"ContactMessage"> | string
    phone?: StringNullableFilter<"ContactMessage"> | string | null
    subject?: StringFilter<"ContactMessage"> | string
    message?: StringFilter<"ContactMessage"> | string
    createdAt?: DateTimeFilter<"ContactMessage"> | Date | string
  }

  export type ContactMessageOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    _relevance?: ContactMessageOrderByRelevanceInput
  }

  export type ContactMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ContactMessageWhereInput | ContactMessageWhereInput[]
    OR?: ContactMessageWhereInput[]
    NOT?: ContactMessageWhereInput | ContactMessageWhereInput[]
    firstName?: StringFilter<"ContactMessage"> | string
    lastName?: StringFilter<"ContactMessage"> | string
    email?: StringFilter<"ContactMessage"> | string
    phone?: StringNullableFilter<"ContactMessage"> | string | null
    subject?: StringFilter<"ContactMessage"> | string
    message?: StringFilter<"ContactMessage"> | string
    createdAt?: DateTimeFilter<"ContactMessage"> | Date | string
  }, "id">

  export type ContactMessageOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    _count?: ContactMessageCountOrderByAggregateInput
    _avg?: ContactMessageAvgOrderByAggregateInput
    _max?: ContactMessageMaxOrderByAggregateInput
    _min?: ContactMessageMinOrderByAggregateInput
    _sum?: ContactMessageSumOrderByAggregateInput
  }

  export type ContactMessageScalarWhereWithAggregatesInput = {
    AND?: ContactMessageScalarWhereWithAggregatesInput | ContactMessageScalarWhereWithAggregatesInput[]
    OR?: ContactMessageScalarWhereWithAggregatesInput[]
    NOT?: ContactMessageScalarWhereWithAggregatesInput | ContactMessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ContactMessage"> | number
    firstName?: StringWithAggregatesFilter<"ContactMessage"> | string
    lastName?: StringWithAggregatesFilter<"ContactMessage"> | string
    email?: StringWithAggregatesFilter<"ContactMessage"> | string
    phone?: StringNullableWithAggregatesFilter<"ContactMessage"> | string | null
    subject?: StringWithAggregatesFilter<"ContactMessage"> | string
    message?: StringWithAggregatesFilter<"ContactMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ContactMessage"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    phone?: string | null
    city?: string | null
    state?: string | null
    userType: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    musicianProfile?: MusicianProfileCreateNestedOneWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutClientInput
    bookings?: BookingCreateNestedManyWithoutClientInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    phone?: string | null
    city?: string | null
    state?: string | null
    userType: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    musicianProfile?: MusicianProfileUncheckedCreateNestedOneWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutClientInput
    bookings?: BookingUncheckedCreateNestedManyWithoutClientInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    musicianProfile?: MusicianProfileUpdateOneWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutClientNestedInput
    bookings?: BookingUpdateManyWithoutClientNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    musicianProfile?: MusicianProfileUncheckedUpdateOneWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutClientNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    phone?: string | null
    city?: string | null
    state?: string | null
    userType: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MusicianProfileCreateInput = {
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMusicianProfileInput
    portfolio?: PortfolioItemCreateNestedManyWithoutMusicianProfileInput
    reviewsReceived?: ReviewCreateNestedManyWithoutMusicianProfileInput
    musicianGenres?: MusicianGenreCreateNestedManyWithoutMusicianProfileInput
    musicianInstruments?: MusicianInstrumentCreateNestedManyWithoutMusicianProfileInput
    bookings?: BookingCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileUncheckedCreateInput = {
    id?: number
    userId: number
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutMusicianProfileInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutMusicianProfileInput
    musicianGenres?: MusicianGenreUncheckedCreateNestedManyWithoutMusicianProfileInput
    musicianInstruments?: MusicianInstrumentUncheckedCreateNestedManyWithoutMusicianProfileInput
    bookings?: BookingUncheckedCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileUpdateInput = {
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMusicianProfileNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutMusicianProfileNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutMusicianProfileNestedInput
    musicianGenres?: MusicianGenreUpdateManyWithoutMusicianProfileNestedInput
    musicianInstruments?: MusicianInstrumentUpdateManyWithoutMusicianProfileNestedInput
    bookings?: BookingUpdateManyWithoutMusicianProfileNestedInput
  }

  export type MusicianProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutMusicianProfileNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutMusicianProfileNestedInput
    musicianGenres?: MusicianGenreUncheckedUpdateManyWithoutMusicianProfileNestedInput
    musicianInstruments?: MusicianInstrumentUncheckedUpdateManyWithoutMusicianProfileNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutMusicianProfileNestedInput
  }

  export type MusicianProfileCreateManyInput = {
    id?: number
    userId: number
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MusicianProfileUpdateManyMutationInput = {
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MusicianProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemCreateInput = {
    type: $Enums.PortfolioItemType
    url: string
    title: string
    description?: string | null
    date?: string | null
    location?: string | null
    genre?: string | null
    createdAt?: Date | string
    musicianProfile: MusicianProfileCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioItemUncheckedCreateInput = {
    id?: number
    musicianProfileId: number
    type: $Enums.PortfolioItemType
    url: string
    title: string
    description?: string | null
    date?: string | null
    location?: string | null
    genre?: string | null
    createdAt?: Date | string
  }

  export type PortfolioItemUpdateInput = {
    type?: EnumPortfolioItemTypeFieldUpdateOperationsInput | $Enums.PortfolioItemType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    musicianProfile?: MusicianProfileUpdateOneRequiredWithoutPortfolioNestedInput
  }

  export type PortfolioItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    type?: EnumPortfolioItemTypeFieldUpdateOperationsInput | $Enums.PortfolioItemType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemCreateManyInput = {
    id?: number
    musicianProfileId: number
    type: $Enums.PortfolioItemType
    url: string
    title: string
    description?: string | null
    date?: string | null
    location?: string | null
    genre?: string | null
    createdAt?: Date | string
  }

  export type PortfolioItemUpdateManyMutationInput = {
    type?: EnumPortfolioItemTypeFieldUpdateOperationsInput | $Enums.PortfolioItemType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    type?: EnumPortfolioItemTypeFieldUpdateOperationsInput | $Enums.PortfolioItemType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GenreCreateInput = {
    name: string
    slug: string
    musicianGenres?: MusicianGenreCreateNestedManyWithoutGenreInput
  }

  export type GenreUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    musicianGenres?: MusicianGenreUncheckedCreateNestedManyWithoutGenreInput
  }

  export type GenreUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    musicianGenres?: MusicianGenreUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    musicianGenres?: MusicianGenreUncheckedUpdateManyWithoutGenreNestedInput
  }

  export type GenreCreateManyInput = {
    id?: number
    name: string
    slug: string
  }

  export type GenreUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type GenreUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type InstrumentCreateInput = {
    name: string
    slug: string
    musicianInstruments?: MusicianInstrumentCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    musicianInstruments?: MusicianInstrumentUncheckedCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    musicianInstruments?: MusicianInstrumentUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    musicianInstruments?: MusicianInstrumentUncheckedUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentCreateManyInput = {
    id?: number
    name: string
    slug: string
  }

  export type InstrumentUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type InstrumentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type MusicianGenreCreateInput = {
    musicianProfile: MusicianProfileCreateNestedOneWithoutMusicianGenresInput
    genre: GenreCreateNestedOneWithoutMusicianGenresInput
  }

  export type MusicianGenreUncheckedCreateInput = {
    musicianProfileId: number
    genreId: number
  }

  export type MusicianGenreUpdateInput = {
    musicianProfile?: MusicianProfileUpdateOneRequiredWithoutMusicianGenresNestedInput
    genre?: GenreUpdateOneRequiredWithoutMusicianGenresNestedInput
  }

  export type MusicianGenreUncheckedUpdateInput = {
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    genreId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicianGenreCreateManyInput = {
    musicianProfileId: number
    genreId: number
  }

  export type MusicianGenreUpdateManyMutationInput = {

  }

  export type MusicianGenreUncheckedUpdateManyInput = {
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    genreId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicianInstrumentCreateInput = {
    musicianProfile: MusicianProfileCreateNestedOneWithoutMusicianInstrumentsInput
    instrument: InstrumentCreateNestedOneWithoutMusicianInstrumentsInput
  }

  export type MusicianInstrumentUncheckedCreateInput = {
    musicianProfileId: number
    instrumentId: number
  }

  export type MusicianInstrumentUpdateInput = {
    musicianProfile?: MusicianProfileUpdateOneRequiredWithoutMusicianInstrumentsNestedInput
    instrument?: InstrumentUpdateOneRequiredWithoutMusicianInstrumentsNestedInput
  }

  export type MusicianInstrumentUncheckedUpdateInput = {
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    instrumentId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicianInstrumentCreateManyInput = {
    musicianProfileId: number
    instrumentId: number
  }

  export type MusicianInstrumentUpdateManyMutationInput = {

  }

  export type MusicianInstrumentUncheckedUpdateManyInput = {
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    instrumentId?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewCreateInput = {
    rating: number
    content: string
    date: string
    event: string
    createdAt?: Date | string
    musicianProfile: MusicianProfileCreateNestedOneWithoutReviewsReceivedInput
    client: UserCreateNestedOneWithoutReviewsGivenInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: number
    musicianProfileId: number
    clientId: number
    rating: number
    content: string
    date: string
    event: string
    createdAt?: Date | string
  }

  export type ReviewUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    musicianProfile?: MusicianProfileUpdateOneRequiredWithoutReviewsReceivedNestedInput
    client?: UserUpdateOneRequiredWithoutReviewsGivenNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: number
    musicianProfileId: number
    clientId: number
    rating: number
    content: string
    date: string
    event: string
    createdAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    eventDate: Date | string
    eventType: string
    message: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    musicianProfile: MusicianProfileCreateNestedOneWithoutBookingsInput
    client?: UserCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateInput = {
    id?: number
    musicianProfileId: number
    clientId?: number | null
    eventDate: Date | string
    eventType: string
    message: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateInput = {
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    musicianProfile?: MusicianProfileUpdateOneRequiredWithoutBookingsNestedInput
    client?: UserUpdateOneWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyInput = {
    id?: number
    musicianProfileId: number
    clientId?: number | null
    eventDate: Date | string
    eventType: string
    message: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCreateInput = {
    title: string
    description?: string | null
    monthlyPrice: number
    yearlyPrice: number
    badge?: string | null
    isMusicianPlan: boolean
    isClientPlan: boolean
    createdAt?: Date | string
    features?: PlanFeatureCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    monthlyPrice: number
    yearlyPrice: number
    badge?: string | null
    isMusicianPlan: boolean
    isClientPlan: boolean
    createdAt?: Date | string
    features?: PlanFeatureUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    yearlyPrice?: IntFieldUpdateOperationsInput | number
    badge?: NullableStringFieldUpdateOperationsInput | string | null
    isMusicianPlan?: BoolFieldUpdateOperationsInput | boolean
    isClientPlan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    features?: PlanFeatureUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    yearlyPrice?: IntFieldUpdateOperationsInput | number
    badge?: NullableStringFieldUpdateOperationsInput | string | null
    isMusicianPlan?: BoolFieldUpdateOperationsInput | boolean
    isClientPlan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    features?: PlanFeatureUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    monthlyPrice: number
    yearlyPrice: number
    badge?: string | null
    isMusicianPlan: boolean
    isClientPlan: boolean
    createdAt?: Date | string
  }

  export type PlanUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    yearlyPrice?: IntFieldUpdateOperationsInput | number
    badge?: NullableStringFieldUpdateOperationsInput | string | null
    isMusicianPlan?: BoolFieldUpdateOperationsInput | boolean
    isClientPlan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    yearlyPrice?: IntFieldUpdateOperationsInput | number
    badge?: NullableStringFieldUpdateOperationsInput | string | null
    isMusicianPlan?: BoolFieldUpdateOperationsInput | boolean
    isClientPlan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFeatureCreateInput = {
    text: string
    available: boolean
    highlight: boolean
    plan: PlanCreateNestedOneWithoutFeaturesInput
  }

  export type PlanFeatureUncheckedCreateInput = {
    id?: number
    planId: number
    text: string
    available: boolean
    highlight: boolean
  }

  export type PlanFeatureUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    highlight?: BoolFieldUpdateOperationsInput | boolean
    plan?: PlanUpdateOneRequiredWithoutFeaturesNestedInput
  }

  export type PlanFeatureUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    planId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    highlight?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PlanFeatureCreateManyInput = {
    id?: number
    planId: number
    text: string
    available: boolean
    highlight: boolean
  }

  export type PlanFeatureUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    highlight?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PlanFeatureUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    planId?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    highlight?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FAQItemCreateInput = {
    question: string
    answer: string
    category?: string | null
    createdAt?: Date | string
  }

  export type FAQItemUncheckedCreateInput = {
    id?: number
    question: string
    answer: string
    category?: string | null
    createdAt?: Date | string
  }

  export type FAQItemUpdateInput = {
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FAQItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FAQItemCreateManyInput = {
    id?: number
    question: string
    answer: string
    category?: string | null
    createdAt?: Date | string
  }

  export type FAQItemUpdateManyMutationInput = {
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FAQItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageCreateInput = {
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    subject: string
    message: string
    createdAt?: Date | string
  }

  export type ContactMessageUncheckedCreateInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    subject: string
    message: string
    createdAt?: Date | string
  }

  export type ContactMessageUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageCreateManyInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    subject: string
    message: string
    createdAt?: Date | string
  }

  export type ContactMessageUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[]
    notIn?: $Enums.UserType[]
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MusicianProfileNullableScalarRelationFilter = {
    is?: MusicianProfileWhereInput | null
    isNot?: MusicianProfileWhereInput | null
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    city?: SortOrder
    state?: SortOrder
    userType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    city?: SortOrder
    state?: SortOrder
    userType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    city?: SortOrder
    state?: SortOrder
    userType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[]
    notIn?: $Enums.UserType[]
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PortfolioItemListRelationFilter = {
    every?: PortfolioItemWhereInput
    some?: PortfolioItemWhereInput
    none?: PortfolioItemWhereInput
  }

  export type MusicianGenreListRelationFilter = {
    every?: MusicianGenreWhereInput
    some?: MusicianGenreWhereInput
    none?: MusicianGenreWhereInput
  }

  export type MusicianInstrumentListRelationFilter = {
    every?: MusicianInstrumentWhereInput
    some?: MusicianInstrumentWhereInput
    none?: MusicianInstrumentWhereInput
  }

  export type PortfolioItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MusicianGenreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MusicianInstrumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MusicianProfileOrderByRelevanceInput = {
    fields: MusicianProfileOrderByRelevanceFieldEnum | MusicianProfileOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MusicianProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    priceFrom?: SortOrder
    experience?: SortOrder
    equipment?: SortOrder
    availability?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    eventsCount?: SortOrder
    satisfactionRate?: SortOrder
    responseTime?: SortOrder
    isFeatured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MusicianProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    priceFrom?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    eventsCount?: SortOrder
    satisfactionRate?: SortOrder
  }

  export type MusicianProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    priceFrom?: SortOrder
    experience?: SortOrder
    equipment?: SortOrder
    availability?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    eventsCount?: SortOrder
    satisfactionRate?: SortOrder
    responseTime?: SortOrder
    isFeatured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MusicianProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    category?: SortOrder
    bio?: SortOrder
    location?: SortOrder
    priceFrom?: SortOrder
    experience?: SortOrder
    equipment?: SortOrder
    availability?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    eventsCount?: SortOrder
    satisfactionRate?: SortOrder
    responseTime?: SortOrder
    isFeatured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MusicianProfileSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    priceFrom?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    eventsCount?: SortOrder
    satisfactionRate?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumPortfolioItemTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PortfolioItemType | EnumPortfolioItemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PortfolioItemType[]
    notIn?: $Enums.PortfolioItemType[]
    not?: NestedEnumPortfolioItemTypeFilter<$PrismaModel> | $Enums.PortfolioItemType
  }

  export type MusicianProfileScalarRelationFilter = {
    is?: MusicianProfileWhereInput
    isNot?: MusicianProfileWhereInput
  }

  export type PortfolioItemOrderByRelevanceInput = {
    fields: PortfolioItemOrderByRelevanceFieldEnum | PortfolioItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PortfolioItemCountOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    type?: SortOrder
    url?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    location?: SortOrder
    genre?: SortOrder
    createdAt?: SortOrder
  }

  export type PortfolioItemAvgOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
  }

  export type PortfolioItemMaxOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    type?: SortOrder
    url?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    location?: SortOrder
    genre?: SortOrder
    createdAt?: SortOrder
  }

  export type PortfolioItemMinOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    type?: SortOrder
    url?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    location?: SortOrder
    genre?: SortOrder
    createdAt?: SortOrder
  }

  export type PortfolioItemSumOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
  }

  export type EnumPortfolioItemTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PortfolioItemType | EnumPortfolioItemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PortfolioItemType[]
    notIn?: $Enums.PortfolioItemType[]
    not?: NestedEnumPortfolioItemTypeWithAggregatesFilter<$PrismaModel> | $Enums.PortfolioItemType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPortfolioItemTypeFilter<$PrismaModel>
    _max?: NestedEnumPortfolioItemTypeFilter<$PrismaModel>
  }

  export type GenreOrderByRelevanceInput = {
    fields: GenreOrderByRelevanceFieldEnum | GenreOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type GenreCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type GenreAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GenreMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type GenreMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type GenreSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type InstrumentOrderByRelevanceInput = {
    fields: InstrumentOrderByRelevanceFieldEnum | InstrumentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type InstrumentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type InstrumentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type InstrumentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type InstrumentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type InstrumentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GenreScalarRelationFilter = {
    is?: GenreWhereInput
    isNot?: GenreWhereInput
  }

  export type MusicianGenreMusicianProfileIdGenreIdCompoundUniqueInput = {
    musicianProfileId: number
    genreId: number
  }

  export type MusicianGenreCountOrderByAggregateInput = {
    musicianProfileId?: SortOrder
    genreId?: SortOrder
  }

  export type MusicianGenreAvgOrderByAggregateInput = {
    musicianProfileId?: SortOrder
    genreId?: SortOrder
  }

  export type MusicianGenreMaxOrderByAggregateInput = {
    musicianProfileId?: SortOrder
    genreId?: SortOrder
  }

  export type MusicianGenreMinOrderByAggregateInput = {
    musicianProfileId?: SortOrder
    genreId?: SortOrder
  }

  export type MusicianGenreSumOrderByAggregateInput = {
    musicianProfileId?: SortOrder
    genreId?: SortOrder
  }

  export type InstrumentScalarRelationFilter = {
    is?: InstrumentWhereInput
    isNot?: InstrumentWhereInput
  }

  export type MusicianInstrumentMusicianProfileIdInstrumentIdCompoundUniqueInput = {
    musicianProfileId: number
    instrumentId: number
  }

  export type MusicianInstrumentCountOrderByAggregateInput = {
    musicianProfileId?: SortOrder
    instrumentId?: SortOrder
  }

  export type MusicianInstrumentAvgOrderByAggregateInput = {
    musicianProfileId?: SortOrder
    instrumentId?: SortOrder
  }

  export type MusicianInstrumentMaxOrderByAggregateInput = {
    musicianProfileId?: SortOrder
    instrumentId?: SortOrder
  }

  export type MusicianInstrumentMinOrderByAggregateInput = {
    musicianProfileId?: SortOrder
    instrumentId?: SortOrder
  }

  export type MusicianInstrumentSumOrderByAggregateInput = {
    musicianProfileId?: SortOrder
    instrumentId?: SortOrder
  }

  export type ReviewOrderByRelevanceInput = {
    fields: ReviewOrderByRelevanceFieldEnum | ReviewOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    date?: SortOrder
    event?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrder
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    date?: SortOrder
    event?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    date?: SortOrder
    event?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrder
    rating?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type BookingOrderByRelevanceInput = {
    fields: BookingOrderByRelevanceFieldEnum | BookingOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrder
    eventDate?: SortOrder
    eventType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingAvgOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrder
    eventDate?: SortOrder
    eventType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrder
    eventDate?: SortOrder
    eventType?: SortOrder
    message?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookingSumOrderByAggregateInput = {
    id?: SortOrder
    musicianProfileId?: SortOrder
    clientId?: SortOrder
  }

  export type PlanFeatureListRelationFilter = {
    every?: PlanFeatureWhereInput
    some?: PlanFeatureWhereInput
    none?: PlanFeatureWhereInput
  }

  export type PlanFeatureOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanOrderByRelevanceInput = {
    fields: PlanOrderByRelevanceFieldEnum | PlanOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PlanCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    monthlyPrice?: SortOrder
    yearlyPrice?: SortOrder
    badge?: SortOrder
    isMusicianPlan?: SortOrder
    isClientPlan?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanAvgOrderByAggregateInput = {
    id?: SortOrder
    monthlyPrice?: SortOrder
    yearlyPrice?: SortOrder
  }

  export type PlanMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    monthlyPrice?: SortOrder
    yearlyPrice?: SortOrder
    badge?: SortOrder
    isMusicianPlan?: SortOrder
    isClientPlan?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    monthlyPrice?: SortOrder
    yearlyPrice?: SortOrder
    badge?: SortOrder
    isMusicianPlan?: SortOrder
    isClientPlan?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanSumOrderByAggregateInput = {
    id?: SortOrder
    monthlyPrice?: SortOrder
    yearlyPrice?: SortOrder
  }

  export type PlanScalarRelationFilter = {
    is?: PlanWhereInput
    isNot?: PlanWhereInput
  }

  export type PlanFeatureOrderByRelevanceInput = {
    fields: PlanFeatureOrderByRelevanceFieldEnum | PlanFeatureOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PlanFeatureCountOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    text?: SortOrder
    available?: SortOrder
    highlight?: SortOrder
  }

  export type PlanFeatureAvgOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
  }

  export type PlanFeatureMaxOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    text?: SortOrder
    available?: SortOrder
    highlight?: SortOrder
  }

  export type PlanFeatureMinOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    text?: SortOrder
    available?: SortOrder
    highlight?: SortOrder
  }

  export type PlanFeatureSumOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
  }

  export type FAQItemOrderByRelevanceInput = {
    fields: FAQItemOrderByRelevanceFieldEnum | FAQItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FAQItemCountOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type FAQItemAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FAQItemMaxOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type FAQItemMinOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
  }

  export type FAQItemSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ContactMessageOrderByRelevanceInput = {
    fields: ContactMessageOrderByRelevanceFieldEnum | ContactMessageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ContactMessageCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactMessageAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ContactMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactMessageMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactMessageSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MusicianProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<MusicianProfileCreateWithoutUserInput, MusicianProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutUserInput
    connect?: MusicianProfileWhereUniqueInput
  }

  export type ReviewCreateNestedManyWithoutClientInput = {
    create?: XOR<ReviewCreateWithoutClientInput, ReviewUncheckedCreateWithoutClientInput> | ReviewCreateWithoutClientInput[] | ReviewUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutClientInput | ReviewCreateOrConnectWithoutClientInput[]
    createMany?: ReviewCreateManyClientInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutClientInput = {
    create?: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput> | BookingCreateWithoutClientInput[] | BookingUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutClientInput | BookingCreateOrConnectWithoutClientInput[]
    createMany?: BookingCreateManyClientInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type MusicianProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<MusicianProfileCreateWithoutUserInput, MusicianProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutUserInput
    connect?: MusicianProfileWhereUniqueInput
  }

  export type ReviewUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<ReviewCreateWithoutClientInput, ReviewUncheckedCreateWithoutClientInput> | ReviewCreateWithoutClientInput[] | ReviewUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutClientInput | ReviewCreateOrConnectWithoutClientInput[]
    createMany?: ReviewCreateManyClientInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput> | BookingCreateWithoutClientInput[] | BookingUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutClientInput | BookingCreateOrConnectWithoutClientInput[]
    createMany?: BookingCreateManyClientInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserType
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MusicianProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<MusicianProfileCreateWithoutUserInput, MusicianProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutUserInput
    upsert?: MusicianProfileUpsertWithoutUserInput
    disconnect?: MusicianProfileWhereInput | boolean
    delete?: MusicianProfileWhereInput | boolean
    connect?: MusicianProfileWhereUniqueInput
    update?: XOR<XOR<MusicianProfileUpdateToOneWithWhereWithoutUserInput, MusicianProfileUpdateWithoutUserInput>, MusicianProfileUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUpdateManyWithoutClientNestedInput = {
    create?: XOR<ReviewCreateWithoutClientInput, ReviewUncheckedCreateWithoutClientInput> | ReviewCreateWithoutClientInput[] | ReviewUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutClientInput | ReviewCreateOrConnectWithoutClientInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutClientInput | ReviewUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ReviewCreateManyClientInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutClientInput | ReviewUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutClientInput | ReviewUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutClientNestedInput = {
    create?: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput> | BookingCreateWithoutClientInput[] | BookingUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutClientInput | BookingCreateOrConnectWithoutClientInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutClientInput | BookingUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: BookingCreateManyClientInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutClientInput | BookingUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutClientInput | BookingUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MusicianProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<MusicianProfileCreateWithoutUserInput, MusicianProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutUserInput
    upsert?: MusicianProfileUpsertWithoutUserInput
    disconnect?: MusicianProfileWhereInput | boolean
    delete?: MusicianProfileWhereInput | boolean
    connect?: MusicianProfileWhereUniqueInput
    update?: XOR<XOR<MusicianProfileUpdateToOneWithWhereWithoutUserInput, MusicianProfileUpdateWithoutUserInput>, MusicianProfileUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<ReviewCreateWithoutClientInput, ReviewUncheckedCreateWithoutClientInput> | ReviewCreateWithoutClientInput[] | ReviewUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutClientInput | ReviewCreateOrConnectWithoutClientInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutClientInput | ReviewUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ReviewCreateManyClientInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutClientInput | ReviewUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutClientInput | ReviewUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput> | BookingCreateWithoutClientInput[] | BookingUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutClientInput | BookingCreateOrConnectWithoutClientInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutClientInput | BookingUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: BookingCreateManyClientInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutClientInput | BookingUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutClientInput | BookingUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMusicianProfileInput = {
    create?: XOR<UserCreateWithoutMusicianProfileInput, UserUncheckedCreateWithoutMusicianProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMusicianProfileInput
    connect?: UserWhereUniqueInput
  }

  export type PortfolioItemCreateNestedManyWithoutMusicianProfileInput = {
    create?: XOR<PortfolioItemCreateWithoutMusicianProfileInput, PortfolioItemUncheckedCreateWithoutMusicianProfileInput> | PortfolioItemCreateWithoutMusicianProfileInput[] | PortfolioItemUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: PortfolioItemCreateOrConnectWithoutMusicianProfileInput | PortfolioItemCreateOrConnectWithoutMusicianProfileInput[]
    createMany?: PortfolioItemCreateManyMusicianProfileInputEnvelope
    connect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutMusicianProfileInput = {
    create?: XOR<ReviewCreateWithoutMusicianProfileInput, ReviewUncheckedCreateWithoutMusicianProfileInput> | ReviewCreateWithoutMusicianProfileInput[] | ReviewUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMusicianProfileInput | ReviewCreateOrConnectWithoutMusicianProfileInput[]
    createMany?: ReviewCreateManyMusicianProfileInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type MusicianGenreCreateNestedManyWithoutMusicianProfileInput = {
    create?: XOR<MusicianGenreCreateWithoutMusicianProfileInput, MusicianGenreUncheckedCreateWithoutMusicianProfileInput> | MusicianGenreCreateWithoutMusicianProfileInput[] | MusicianGenreUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: MusicianGenreCreateOrConnectWithoutMusicianProfileInput | MusicianGenreCreateOrConnectWithoutMusicianProfileInput[]
    createMany?: MusicianGenreCreateManyMusicianProfileInputEnvelope
    connect?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
  }

  export type MusicianInstrumentCreateNestedManyWithoutMusicianProfileInput = {
    create?: XOR<MusicianInstrumentCreateWithoutMusicianProfileInput, MusicianInstrumentUncheckedCreateWithoutMusicianProfileInput> | MusicianInstrumentCreateWithoutMusicianProfileInput[] | MusicianInstrumentUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: MusicianInstrumentCreateOrConnectWithoutMusicianProfileInput | MusicianInstrumentCreateOrConnectWithoutMusicianProfileInput[]
    createMany?: MusicianInstrumentCreateManyMusicianProfileInputEnvelope
    connect?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
  }

  export type BookingCreateNestedManyWithoutMusicianProfileInput = {
    create?: XOR<BookingCreateWithoutMusicianProfileInput, BookingUncheckedCreateWithoutMusicianProfileInput> | BookingCreateWithoutMusicianProfileInput[] | BookingUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMusicianProfileInput | BookingCreateOrConnectWithoutMusicianProfileInput[]
    createMany?: BookingCreateManyMusicianProfileInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type PortfolioItemUncheckedCreateNestedManyWithoutMusicianProfileInput = {
    create?: XOR<PortfolioItemCreateWithoutMusicianProfileInput, PortfolioItemUncheckedCreateWithoutMusicianProfileInput> | PortfolioItemCreateWithoutMusicianProfileInput[] | PortfolioItemUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: PortfolioItemCreateOrConnectWithoutMusicianProfileInput | PortfolioItemCreateOrConnectWithoutMusicianProfileInput[]
    createMany?: PortfolioItemCreateManyMusicianProfileInputEnvelope
    connect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutMusicianProfileInput = {
    create?: XOR<ReviewCreateWithoutMusicianProfileInput, ReviewUncheckedCreateWithoutMusicianProfileInput> | ReviewCreateWithoutMusicianProfileInput[] | ReviewUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMusicianProfileInput | ReviewCreateOrConnectWithoutMusicianProfileInput[]
    createMany?: ReviewCreateManyMusicianProfileInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type MusicianGenreUncheckedCreateNestedManyWithoutMusicianProfileInput = {
    create?: XOR<MusicianGenreCreateWithoutMusicianProfileInput, MusicianGenreUncheckedCreateWithoutMusicianProfileInput> | MusicianGenreCreateWithoutMusicianProfileInput[] | MusicianGenreUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: MusicianGenreCreateOrConnectWithoutMusicianProfileInput | MusicianGenreCreateOrConnectWithoutMusicianProfileInput[]
    createMany?: MusicianGenreCreateManyMusicianProfileInputEnvelope
    connect?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
  }

  export type MusicianInstrumentUncheckedCreateNestedManyWithoutMusicianProfileInput = {
    create?: XOR<MusicianInstrumentCreateWithoutMusicianProfileInput, MusicianInstrumentUncheckedCreateWithoutMusicianProfileInput> | MusicianInstrumentCreateWithoutMusicianProfileInput[] | MusicianInstrumentUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: MusicianInstrumentCreateOrConnectWithoutMusicianProfileInput | MusicianInstrumentCreateOrConnectWithoutMusicianProfileInput[]
    createMany?: MusicianInstrumentCreateManyMusicianProfileInputEnvelope
    connect?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
  }

  export type BookingUncheckedCreateNestedManyWithoutMusicianProfileInput = {
    create?: XOR<BookingCreateWithoutMusicianProfileInput, BookingUncheckedCreateWithoutMusicianProfileInput> | BookingCreateWithoutMusicianProfileInput[] | BookingUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMusicianProfileInput | BookingCreateOrConnectWithoutMusicianProfileInput[]
    createMany?: BookingCreateManyMusicianProfileInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutMusicianProfileNestedInput = {
    create?: XOR<UserCreateWithoutMusicianProfileInput, UserUncheckedCreateWithoutMusicianProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutMusicianProfileInput
    upsert?: UserUpsertWithoutMusicianProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMusicianProfileInput, UserUpdateWithoutMusicianProfileInput>, UserUncheckedUpdateWithoutMusicianProfileInput>
  }

  export type PortfolioItemUpdateManyWithoutMusicianProfileNestedInput = {
    create?: XOR<PortfolioItemCreateWithoutMusicianProfileInput, PortfolioItemUncheckedCreateWithoutMusicianProfileInput> | PortfolioItemCreateWithoutMusicianProfileInput[] | PortfolioItemUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: PortfolioItemCreateOrConnectWithoutMusicianProfileInput | PortfolioItemCreateOrConnectWithoutMusicianProfileInput[]
    upsert?: PortfolioItemUpsertWithWhereUniqueWithoutMusicianProfileInput | PortfolioItemUpsertWithWhereUniqueWithoutMusicianProfileInput[]
    createMany?: PortfolioItemCreateManyMusicianProfileInputEnvelope
    set?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    disconnect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    delete?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    connect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    update?: PortfolioItemUpdateWithWhereUniqueWithoutMusicianProfileInput | PortfolioItemUpdateWithWhereUniqueWithoutMusicianProfileInput[]
    updateMany?: PortfolioItemUpdateManyWithWhereWithoutMusicianProfileInput | PortfolioItemUpdateManyWithWhereWithoutMusicianProfileInput[]
    deleteMany?: PortfolioItemScalarWhereInput | PortfolioItemScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutMusicianProfileNestedInput = {
    create?: XOR<ReviewCreateWithoutMusicianProfileInput, ReviewUncheckedCreateWithoutMusicianProfileInput> | ReviewCreateWithoutMusicianProfileInput[] | ReviewUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMusicianProfileInput | ReviewCreateOrConnectWithoutMusicianProfileInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutMusicianProfileInput | ReviewUpsertWithWhereUniqueWithoutMusicianProfileInput[]
    createMany?: ReviewCreateManyMusicianProfileInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutMusicianProfileInput | ReviewUpdateWithWhereUniqueWithoutMusicianProfileInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutMusicianProfileInput | ReviewUpdateManyWithWhereWithoutMusicianProfileInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type MusicianGenreUpdateManyWithoutMusicianProfileNestedInput = {
    create?: XOR<MusicianGenreCreateWithoutMusicianProfileInput, MusicianGenreUncheckedCreateWithoutMusicianProfileInput> | MusicianGenreCreateWithoutMusicianProfileInput[] | MusicianGenreUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: MusicianGenreCreateOrConnectWithoutMusicianProfileInput | MusicianGenreCreateOrConnectWithoutMusicianProfileInput[]
    upsert?: MusicianGenreUpsertWithWhereUniqueWithoutMusicianProfileInput | MusicianGenreUpsertWithWhereUniqueWithoutMusicianProfileInput[]
    createMany?: MusicianGenreCreateManyMusicianProfileInputEnvelope
    set?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    disconnect?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    delete?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    connect?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    update?: MusicianGenreUpdateWithWhereUniqueWithoutMusicianProfileInput | MusicianGenreUpdateWithWhereUniqueWithoutMusicianProfileInput[]
    updateMany?: MusicianGenreUpdateManyWithWhereWithoutMusicianProfileInput | MusicianGenreUpdateManyWithWhereWithoutMusicianProfileInput[]
    deleteMany?: MusicianGenreScalarWhereInput | MusicianGenreScalarWhereInput[]
  }

  export type MusicianInstrumentUpdateManyWithoutMusicianProfileNestedInput = {
    create?: XOR<MusicianInstrumentCreateWithoutMusicianProfileInput, MusicianInstrumentUncheckedCreateWithoutMusicianProfileInput> | MusicianInstrumentCreateWithoutMusicianProfileInput[] | MusicianInstrumentUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: MusicianInstrumentCreateOrConnectWithoutMusicianProfileInput | MusicianInstrumentCreateOrConnectWithoutMusicianProfileInput[]
    upsert?: MusicianInstrumentUpsertWithWhereUniqueWithoutMusicianProfileInput | MusicianInstrumentUpsertWithWhereUniqueWithoutMusicianProfileInput[]
    createMany?: MusicianInstrumentCreateManyMusicianProfileInputEnvelope
    set?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    disconnect?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    delete?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    connect?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    update?: MusicianInstrumentUpdateWithWhereUniqueWithoutMusicianProfileInput | MusicianInstrumentUpdateWithWhereUniqueWithoutMusicianProfileInput[]
    updateMany?: MusicianInstrumentUpdateManyWithWhereWithoutMusicianProfileInput | MusicianInstrumentUpdateManyWithWhereWithoutMusicianProfileInput[]
    deleteMany?: MusicianInstrumentScalarWhereInput | MusicianInstrumentScalarWhereInput[]
  }

  export type BookingUpdateManyWithoutMusicianProfileNestedInput = {
    create?: XOR<BookingCreateWithoutMusicianProfileInput, BookingUncheckedCreateWithoutMusicianProfileInput> | BookingCreateWithoutMusicianProfileInput[] | BookingUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMusicianProfileInput | BookingCreateOrConnectWithoutMusicianProfileInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutMusicianProfileInput | BookingUpsertWithWhereUniqueWithoutMusicianProfileInput[]
    createMany?: BookingCreateManyMusicianProfileInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutMusicianProfileInput | BookingUpdateWithWhereUniqueWithoutMusicianProfileInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutMusicianProfileInput | BookingUpdateManyWithWhereWithoutMusicianProfileInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type PortfolioItemUncheckedUpdateManyWithoutMusicianProfileNestedInput = {
    create?: XOR<PortfolioItemCreateWithoutMusicianProfileInput, PortfolioItemUncheckedCreateWithoutMusicianProfileInput> | PortfolioItemCreateWithoutMusicianProfileInput[] | PortfolioItemUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: PortfolioItemCreateOrConnectWithoutMusicianProfileInput | PortfolioItemCreateOrConnectWithoutMusicianProfileInput[]
    upsert?: PortfolioItemUpsertWithWhereUniqueWithoutMusicianProfileInput | PortfolioItemUpsertWithWhereUniqueWithoutMusicianProfileInput[]
    createMany?: PortfolioItemCreateManyMusicianProfileInputEnvelope
    set?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    disconnect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    delete?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    connect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    update?: PortfolioItemUpdateWithWhereUniqueWithoutMusicianProfileInput | PortfolioItemUpdateWithWhereUniqueWithoutMusicianProfileInput[]
    updateMany?: PortfolioItemUpdateManyWithWhereWithoutMusicianProfileInput | PortfolioItemUpdateManyWithWhereWithoutMusicianProfileInput[]
    deleteMany?: PortfolioItemScalarWhereInput | PortfolioItemScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutMusicianProfileNestedInput = {
    create?: XOR<ReviewCreateWithoutMusicianProfileInput, ReviewUncheckedCreateWithoutMusicianProfileInput> | ReviewCreateWithoutMusicianProfileInput[] | ReviewUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMusicianProfileInput | ReviewCreateOrConnectWithoutMusicianProfileInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutMusicianProfileInput | ReviewUpsertWithWhereUniqueWithoutMusicianProfileInput[]
    createMany?: ReviewCreateManyMusicianProfileInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutMusicianProfileInput | ReviewUpdateWithWhereUniqueWithoutMusicianProfileInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutMusicianProfileInput | ReviewUpdateManyWithWhereWithoutMusicianProfileInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type MusicianGenreUncheckedUpdateManyWithoutMusicianProfileNestedInput = {
    create?: XOR<MusicianGenreCreateWithoutMusicianProfileInput, MusicianGenreUncheckedCreateWithoutMusicianProfileInput> | MusicianGenreCreateWithoutMusicianProfileInput[] | MusicianGenreUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: MusicianGenreCreateOrConnectWithoutMusicianProfileInput | MusicianGenreCreateOrConnectWithoutMusicianProfileInput[]
    upsert?: MusicianGenreUpsertWithWhereUniqueWithoutMusicianProfileInput | MusicianGenreUpsertWithWhereUniqueWithoutMusicianProfileInput[]
    createMany?: MusicianGenreCreateManyMusicianProfileInputEnvelope
    set?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    disconnect?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    delete?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    connect?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    update?: MusicianGenreUpdateWithWhereUniqueWithoutMusicianProfileInput | MusicianGenreUpdateWithWhereUniqueWithoutMusicianProfileInput[]
    updateMany?: MusicianGenreUpdateManyWithWhereWithoutMusicianProfileInput | MusicianGenreUpdateManyWithWhereWithoutMusicianProfileInput[]
    deleteMany?: MusicianGenreScalarWhereInput | MusicianGenreScalarWhereInput[]
  }

  export type MusicianInstrumentUncheckedUpdateManyWithoutMusicianProfileNestedInput = {
    create?: XOR<MusicianInstrumentCreateWithoutMusicianProfileInput, MusicianInstrumentUncheckedCreateWithoutMusicianProfileInput> | MusicianInstrumentCreateWithoutMusicianProfileInput[] | MusicianInstrumentUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: MusicianInstrumentCreateOrConnectWithoutMusicianProfileInput | MusicianInstrumentCreateOrConnectWithoutMusicianProfileInput[]
    upsert?: MusicianInstrumentUpsertWithWhereUniqueWithoutMusicianProfileInput | MusicianInstrumentUpsertWithWhereUniqueWithoutMusicianProfileInput[]
    createMany?: MusicianInstrumentCreateManyMusicianProfileInputEnvelope
    set?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    disconnect?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    delete?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    connect?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    update?: MusicianInstrumentUpdateWithWhereUniqueWithoutMusicianProfileInput | MusicianInstrumentUpdateWithWhereUniqueWithoutMusicianProfileInput[]
    updateMany?: MusicianInstrumentUpdateManyWithWhereWithoutMusicianProfileInput | MusicianInstrumentUpdateManyWithWhereWithoutMusicianProfileInput[]
    deleteMany?: MusicianInstrumentScalarWhereInput | MusicianInstrumentScalarWhereInput[]
  }

  export type BookingUncheckedUpdateManyWithoutMusicianProfileNestedInput = {
    create?: XOR<BookingCreateWithoutMusicianProfileInput, BookingUncheckedCreateWithoutMusicianProfileInput> | BookingCreateWithoutMusicianProfileInput[] | BookingUncheckedCreateWithoutMusicianProfileInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutMusicianProfileInput | BookingCreateOrConnectWithoutMusicianProfileInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutMusicianProfileInput | BookingUpsertWithWhereUniqueWithoutMusicianProfileInput[]
    createMany?: BookingCreateManyMusicianProfileInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutMusicianProfileInput | BookingUpdateWithWhereUniqueWithoutMusicianProfileInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutMusicianProfileInput | BookingUpdateManyWithWhereWithoutMusicianProfileInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type MusicianProfileCreateNestedOneWithoutPortfolioInput = {
    create?: XOR<MusicianProfileCreateWithoutPortfolioInput, MusicianProfileUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutPortfolioInput
    connect?: MusicianProfileWhereUniqueInput
  }

  export type EnumPortfolioItemTypeFieldUpdateOperationsInput = {
    set?: $Enums.PortfolioItemType
  }

  export type MusicianProfileUpdateOneRequiredWithoutPortfolioNestedInput = {
    create?: XOR<MusicianProfileCreateWithoutPortfolioInput, MusicianProfileUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutPortfolioInput
    upsert?: MusicianProfileUpsertWithoutPortfolioInput
    connect?: MusicianProfileWhereUniqueInput
    update?: XOR<XOR<MusicianProfileUpdateToOneWithWhereWithoutPortfolioInput, MusicianProfileUpdateWithoutPortfolioInput>, MusicianProfileUncheckedUpdateWithoutPortfolioInput>
  }

  export type MusicianGenreCreateNestedManyWithoutGenreInput = {
    create?: XOR<MusicianGenreCreateWithoutGenreInput, MusicianGenreUncheckedCreateWithoutGenreInput> | MusicianGenreCreateWithoutGenreInput[] | MusicianGenreUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: MusicianGenreCreateOrConnectWithoutGenreInput | MusicianGenreCreateOrConnectWithoutGenreInput[]
    createMany?: MusicianGenreCreateManyGenreInputEnvelope
    connect?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
  }

  export type MusicianGenreUncheckedCreateNestedManyWithoutGenreInput = {
    create?: XOR<MusicianGenreCreateWithoutGenreInput, MusicianGenreUncheckedCreateWithoutGenreInput> | MusicianGenreCreateWithoutGenreInput[] | MusicianGenreUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: MusicianGenreCreateOrConnectWithoutGenreInput | MusicianGenreCreateOrConnectWithoutGenreInput[]
    createMany?: MusicianGenreCreateManyGenreInputEnvelope
    connect?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
  }

  export type MusicianGenreUpdateManyWithoutGenreNestedInput = {
    create?: XOR<MusicianGenreCreateWithoutGenreInput, MusicianGenreUncheckedCreateWithoutGenreInput> | MusicianGenreCreateWithoutGenreInput[] | MusicianGenreUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: MusicianGenreCreateOrConnectWithoutGenreInput | MusicianGenreCreateOrConnectWithoutGenreInput[]
    upsert?: MusicianGenreUpsertWithWhereUniqueWithoutGenreInput | MusicianGenreUpsertWithWhereUniqueWithoutGenreInput[]
    createMany?: MusicianGenreCreateManyGenreInputEnvelope
    set?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    disconnect?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    delete?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    connect?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    update?: MusicianGenreUpdateWithWhereUniqueWithoutGenreInput | MusicianGenreUpdateWithWhereUniqueWithoutGenreInput[]
    updateMany?: MusicianGenreUpdateManyWithWhereWithoutGenreInput | MusicianGenreUpdateManyWithWhereWithoutGenreInput[]
    deleteMany?: MusicianGenreScalarWhereInput | MusicianGenreScalarWhereInput[]
  }

  export type MusicianGenreUncheckedUpdateManyWithoutGenreNestedInput = {
    create?: XOR<MusicianGenreCreateWithoutGenreInput, MusicianGenreUncheckedCreateWithoutGenreInput> | MusicianGenreCreateWithoutGenreInput[] | MusicianGenreUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: MusicianGenreCreateOrConnectWithoutGenreInput | MusicianGenreCreateOrConnectWithoutGenreInput[]
    upsert?: MusicianGenreUpsertWithWhereUniqueWithoutGenreInput | MusicianGenreUpsertWithWhereUniqueWithoutGenreInput[]
    createMany?: MusicianGenreCreateManyGenreInputEnvelope
    set?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    disconnect?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    delete?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    connect?: MusicianGenreWhereUniqueInput | MusicianGenreWhereUniqueInput[]
    update?: MusicianGenreUpdateWithWhereUniqueWithoutGenreInput | MusicianGenreUpdateWithWhereUniqueWithoutGenreInput[]
    updateMany?: MusicianGenreUpdateManyWithWhereWithoutGenreInput | MusicianGenreUpdateManyWithWhereWithoutGenreInput[]
    deleteMany?: MusicianGenreScalarWhereInput | MusicianGenreScalarWhereInput[]
  }

  export type MusicianInstrumentCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<MusicianInstrumentCreateWithoutInstrumentInput, MusicianInstrumentUncheckedCreateWithoutInstrumentInput> | MusicianInstrumentCreateWithoutInstrumentInput[] | MusicianInstrumentUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: MusicianInstrumentCreateOrConnectWithoutInstrumentInput | MusicianInstrumentCreateOrConnectWithoutInstrumentInput[]
    createMany?: MusicianInstrumentCreateManyInstrumentInputEnvelope
    connect?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
  }

  export type MusicianInstrumentUncheckedCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<MusicianInstrumentCreateWithoutInstrumentInput, MusicianInstrumentUncheckedCreateWithoutInstrumentInput> | MusicianInstrumentCreateWithoutInstrumentInput[] | MusicianInstrumentUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: MusicianInstrumentCreateOrConnectWithoutInstrumentInput | MusicianInstrumentCreateOrConnectWithoutInstrumentInput[]
    createMany?: MusicianInstrumentCreateManyInstrumentInputEnvelope
    connect?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
  }

  export type MusicianInstrumentUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<MusicianInstrumentCreateWithoutInstrumentInput, MusicianInstrumentUncheckedCreateWithoutInstrumentInput> | MusicianInstrumentCreateWithoutInstrumentInput[] | MusicianInstrumentUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: MusicianInstrumentCreateOrConnectWithoutInstrumentInput | MusicianInstrumentCreateOrConnectWithoutInstrumentInput[]
    upsert?: MusicianInstrumentUpsertWithWhereUniqueWithoutInstrumentInput | MusicianInstrumentUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: MusicianInstrumentCreateManyInstrumentInputEnvelope
    set?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    disconnect?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    delete?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    connect?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    update?: MusicianInstrumentUpdateWithWhereUniqueWithoutInstrumentInput | MusicianInstrumentUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: MusicianInstrumentUpdateManyWithWhereWithoutInstrumentInput | MusicianInstrumentUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: MusicianInstrumentScalarWhereInput | MusicianInstrumentScalarWhereInput[]
  }

  export type MusicianInstrumentUncheckedUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<MusicianInstrumentCreateWithoutInstrumentInput, MusicianInstrumentUncheckedCreateWithoutInstrumentInput> | MusicianInstrumentCreateWithoutInstrumentInput[] | MusicianInstrumentUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: MusicianInstrumentCreateOrConnectWithoutInstrumentInput | MusicianInstrumentCreateOrConnectWithoutInstrumentInput[]
    upsert?: MusicianInstrumentUpsertWithWhereUniqueWithoutInstrumentInput | MusicianInstrumentUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: MusicianInstrumentCreateManyInstrumentInputEnvelope
    set?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    disconnect?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    delete?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    connect?: MusicianInstrumentWhereUniqueInput | MusicianInstrumentWhereUniqueInput[]
    update?: MusicianInstrumentUpdateWithWhereUniqueWithoutInstrumentInput | MusicianInstrumentUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: MusicianInstrumentUpdateManyWithWhereWithoutInstrumentInput | MusicianInstrumentUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: MusicianInstrumentScalarWhereInput | MusicianInstrumentScalarWhereInput[]
  }

  export type MusicianProfileCreateNestedOneWithoutMusicianGenresInput = {
    create?: XOR<MusicianProfileCreateWithoutMusicianGenresInput, MusicianProfileUncheckedCreateWithoutMusicianGenresInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutMusicianGenresInput
    connect?: MusicianProfileWhereUniqueInput
  }

  export type GenreCreateNestedOneWithoutMusicianGenresInput = {
    create?: XOR<GenreCreateWithoutMusicianGenresInput, GenreUncheckedCreateWithoutMusicianGenresInput>
    connectOrCreate?: GenreCreateOrConnectWithoutMusicianGenresInput
    connect?: GenreWhereUniqueInput
  }

  export type MusicianProfileUpdateOneRequiredWithoutMusicianGenresNestedInput = {
    create?: XOR<MusicianProfileCreateWithoutMusicianGenresInput, MusicianProfileUncheckedCreateWithoutMusicianGenresInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutMusicianGenresInput
    upsert?: MusicianProfileUpsertWithoutMusicianGenresInput
    connect?: MusicianProfileWhereUniqueInput
    update?: XOR<XOR<MusicianProfileUpdateToOneWithWhereWithoutMusicianGenresInput, MusicianProfileUpdateWithoutMusicianGenresInput>, MusicianProfileUncheckedUpdateWithoutMusicianGenresInput>
  }

  export type GenreUpdateOneRequiredWithoutMusicianGenresNestedInput = {
    create?: XOR<GenreCreateWithoutMusicianGenresInput, GenreUncheckedCreateWithoutMusicianGenresInput>
    connectOrCreate?: GenreCreateOrConnectWithoutMusicianGenresInput
    upsert?: GenreUpsertWithoutMusicianGenresInput
    connect?: GenreWhereUniqueInput
    update?: XOR<XOR<GenreUpdateToOneWithWhereWithoutMusicianGenresInput, GenreUpdateWithoutMusicianGenresInput>, GenreUncheckedUpdateWithoutMusicianGenresInput>
  }

  export type MusicianProfileCreateNestedOneWithoutMusicianInstrumentsInput = {
    create?: XOR<MusicianProfileCreateWithoutMusicianInstrumentsInput, MusicianProfileUncheckedCreateWithoutMusicianInstrumentsInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutMusicianInstrumentsInput
    connect?: MusicianProfileWhereUniqueInput
  }

  export type InstrumentCreateNestedOneWithoutMusicianInstrumentsInput = {
    create?: XOR<InstrumentCreateWithoutMusicianInstrumentsInput, InstrumentUncheckedCreateWithoutMusicianInstrumentsInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutMusicianInstrumentsInput
    connect?: InstrumentWhereUniqueInput
  }

  export type MusicianProfileUpdateOneRequiredWithoutMusicianInstrumentsNestedInput = {
    create?: XOR<MusicianProfileCreateWithoutMusicianInstrumentsInput, MusicianProfileUncheckedCreateWithoutMusicianInstrumentsInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutMusicianInstrumentsInput
    upsert?: MusicianProfileUpsertWithoutMusicianInstrumentsInput
    connect?: MusicianProfileWhereUniqueInput
    update?: XOR<XOR<MusicianProfileUpdateToOneWithWhereWithoutMusicianInstrumentsInput, MusicianProfileUpdateWithoutMusicianInstrumentsInput>, MusicianProfileUncheckedUpdateWithoutMusicianInstrumentsInput>
  }

  export type InstrumentUpdateOneRequiredWithoutMusicianInstrumentsNestedInput = {
    create?: XOR<InstrumentCreateWithoutMusicianInstrumentsInput, InstrumentUncheckedCreateWithoutMusicianInstrumentsInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutMusicianInstrumentsInput
    upsert?: InstrumentUpsertWithoutMusicianInstrumentsInput
    connect?: InstrumentWhereUniqueInput
    update?: XOR<XOR<InstrumentUpdateToOneWithWhereWithoutMusicianInstrumentsInput, InstrumentUpdateWithoutMusicianInstrumentsInput>, InstrumentUncheckedUpdateWithoutMusicianInstrumentsInput>
  }

  export type MusicianProfileCreateNestedOneWithoutReviewsReceivedInput = {
    create?: XOR<MusicianProfileCreateWithoutReviewsReceivedInput, MusicianProfileUncheckedCreateWithoutReviewsReceivedInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutReviewsReceivedInput
    connect?: MusicianProfileWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsGivenInput = {
    create?: XOR<UserCreateWithoutReviewsGivenInput, UserUncheckedCreateWithoutReviewsGivenInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsGivenInput
    connect?: UserWhereUniqueInput
  }

  export type MusicianProfileUpdateOneRequiredWithoutReviewsReceivedNestedInput = {
    create?: XOR<MusicianProfileCreateWithoutReviewsReceivedInput, MusicianProfileUncheckedCreateWithoutReviewsReceivedInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutReviewsReceivedInput
    upsert?: MusicianProfileUpsertWithoutReviewsReceivedInput
    connect?: MusicianProfileWhereUniqueInput
    update?: XOR<XOR<MusicianProfileUpdateToOneWithWhereWithoutReviewsReceivedInput, MusicianProfileUpdateWithoutReviewsReceivedInput>, MusicianProfileUncheckedUpdateWithoutReviewsReceivedInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsGivenNestedInput = {
    create?: XOR<UserCreateWithoutReviewsGivenInput, UserUncheckedCreateWithoutReviewsGivenInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsGivenInput
    upsert?: UserUpsertWithoutReviewsGivenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsGivenInput, UserUpdateWithoutReviewsGivenInput>, UserUncheckedUpdateWithoutReviewsGivenInput>
  }

  export type MusicianProfileCreateNestedOneWithoutBookingsInput = {
    create?: XOR<MusicianProfileCreateWithoutBookingsInput, MusicianProfileUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutBookingsInput
    connect?: MusicianProfileWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBookingsInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type MusicianProfileUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<MusicianProfileCreateWithoutBookingsInput, MusicianProfileUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: MusicianProfileCreateOrConnectWithoutBookingsInput
    upsert?: MusicianProfileUpsertWithoutBookingsInput
    connect?: MusicianProfileWhereUniqueInput
    update?: XOR<XOR<MusicianProfileUpdateToOneWithWhereWithoutBookingsInput, MusicianProfileUpdateWithoutBookingsInput>, MusicianProfileUncheckedUpdateWithoutBookingsInput>
  }

  export type UserUpdateOneWithoutBookingsNestedInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    upsert?: UserUpsertWithoutBookingsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookingsInput, UserUpdateWithoutBookingsInput>, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type PlanFeatureCreateNestedManyWithoutPlanInput = {
    create?: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput> | PlanFeatureCreateWithoutPlanInput[] | PlanFeatureUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanFeatureCreateOrConnectWithoutPlanInput | PlanFeatureCreateOrConnectWithoutPlanInput[]
    createMany?: PlanFeatureCreateManyPlanInputEnvelope
    connect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
  }

  export type PlanFeatureUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput> | PlanFeatureCreateWithoutPlanInput[] | PlanFeatureUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanFeatureCreateOrConnectWithoutPlanInput | PlanFeatureCreateOrConnectWithoutPlanInput[]
    createMany?: PlanFeatureCreateManyPlanInputEnvelope
    connect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
  }

  export type PlanFeatureUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput> | PlanFeatureCreateWithoutPlanInput[] | PlanFeatureUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanFeatureCreateOrConnectWithoutPlanInput | PlanFeatureCreateOrConnectWithoutPlanInput[]
    upsert?: PlanFeatureUpsertWithWhereUniqueWithoutPlanInput | PlanFeatureUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PlanFeatureCreateManyPlanInputEnvelope
    set?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    disconnect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    delete?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    connect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    update?: PlanFeatureUpdateWithWhereUniqueWithoutPlanInput | PlanFeatureUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PlanFeatureUpdateManyWithWhereWithoutPlanInput | PlanFeatureUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PlanFeatureScalarWhereInput | PlanFeatureScalarWhereInput[]
  }

  export type PlanFeatureUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput> | PlanFeatureCreateWithoutPlanInput[] | PlanFeatureUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanFeatureCreateOrConnectWithoutPlanInput | PlanFeatureCreateOrConnectWithoutPlanInput[]
    upsert?: PlanFeatureUpsertWithWhereUniqueWithoutPlanInput | PlanFeatureUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PlanFeatureCreateManyPlanInputEnvelope
    set?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    disconnect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    delete?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    connect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    update?: PlanFeatureUpdateWithWhereUniqueWithoutPlanInput | PlanFeatureUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PlanFeatureUpdateManyWithWhereWithoutPlanInput | PlanFeatureUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PlanFeatureScalarWhereInput | PlanFeatureScalarWhereInput[]
  }

  export type PlanCreateNestedOneWithoutFeaturesInput = {
    create?: XOR<PlanCreateWithoutFeaturesInput, PlanUncheckedCreateWithoutFeaturesInput>
    connectOrCreate?: PlanCreateOrConnectWithoutFeaturesInput
    connect?: PlanWhereUniqueInput
  }

  export type PlanUpdateOneRequiredWithoutFeaturesNestedInput = {
    create?: XOR<PlanCreateWithoutFeaturesInput, PlanUncheckedCreateWithoutFeaturesInput>
    connectOrCreate?: PlanCreateOrConnectWithoutFeaturesInput
    upsert?: PlanUpsertWithoutFeaturesInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutFeaturesInput, PlanUpdateWithoutFeaturesInput>, PlanUncheckedUpdateWithoutFeaturesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[]
    notIn?: $Enums.UserType[]
    not?: NestedEnumUserTypeFilter<$PrismaModel> | $Enums.UserType
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserType | EnumUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserType[]
    notIn?: $Enums.UserType[]
    not?: NestedEnumUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserTypeFilter<$PrismaModel>
    _max?: NestedEnumUserTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPortfolioItemTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PortfolioItemType | EnumPortfolioItemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PortfolioItemType[]
    notIn?: $Enums.PortfolioItemType[]
    not?: NestedEnumPortfolioItemTypeFilter<$PrismaModel> | $Enums.PortfolioItemType
  }

  export type NestedEnumPortfolioItemTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PortfolioItemType | EnumPortfolioItemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PortfolioItemType[]
    notIn?: $Enums.PortfolioItemType[]
    not?: NestedEnumPortfolioItemTypeWithAggregatesFilter<$PrismaModel> | $Enums.PortfolioItemType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPortfolioItemTypeFilter<$PrismaModel>
    _max?: NestedEnumPortfolioItemTypeFilter<$PrismaModel>
  }

  export type MusicianProfileCreateWithoutUserInput = {
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio?: PortfolioItemCreateNestedManyWithoutMusicianProfileInput
    reviewsReceived?: ReviewCreateNestedManyWithoutMusicianProfileInput
    musicianGenres?: MusicianGenreCreateNestedManyWithoutMusicianProfileInput
    musicianInstruments?: MusicianInstrumentCreateNestedManyWithoutMusicianProfileInput
    bookings?: BookingCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileUncheckedCreateWithoutUserInput = {
    id?: number
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutMusicianProfileInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutMusicianProfileInput
    musicianGenres?: MusicianGenreUncheckedCreateNestedManyWithoutMusicianProfileInput
    musicianInstruments?: MusicianInstrumentUncheckedCreateNestedManyWithoutMusicianProfileInput
    bookings?: BookingUncheckedCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileCreateOrConnectWithoutUserInput = {
    where: MusicianProfileWhereUniqueInput
    create: XOR<MusicianProfileCreateWithoutUserInput, MusicianProfileUncheckedCreateWithoutUserInput>
  }

  export type ReviewCreateWithoutClientInput = {
    rating: number
    content: string
    date: string
    event: string
    createdAt?: Date | string
    musicianProfile: MusicianProfileCreateNestedOneWithoutReviewsReceivedInput
  }

  export type ReviewUncheckedCreateWithoutClientInput = {
    id?: number
    musicianProfileId: number
    rating: number
    content: string
    date: string
    event: string
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutClientInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutClientInput, ReviewUncheckedCreateWithoutClientInput>
  }

  export type ReviewCreateManyClientInputEnvelope = {
    data: ReviewCreateManyClientInput | ReviewCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutClientInput = {
    eventDate: Date | string
    eventType: string
    message: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    musicianProfile: MusicianProfileCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutClientInput = {
    id?: number
    musicianProfileId: number
    eventDate: Date | string
    eventType: string
    message: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutClientInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput>
  }

  export type BookingCreateManyClientInputEnvelope = {
    data: BookingCreateManyClientInput | BookingCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type MusicianProfileUpsertWithoutUserInput = {
    update: XOR<MusicianProfileUpdateWithoutUserInput, MusicianProfileUncheckedUpdateWithoutUserInput>
    create: XOR<MusicianProfileCreateWithoutUserInput, MusicianProfileUncheckedCreateWithoutUserInput>
    where?: MusicianProfileWhereInput
  }

  export type MusicianProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: MusicianProfileWhereInput
    data: XOR<MusicianProfileUpdateWithoutUserInput, MusicianProfileUncheckedUpdateWithoutUserInput>
  }

  export type MusicianProfileUpdateWithoutUserInput = {
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioItemUpdateManyWithoutMusicianProfileNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutMusicianProfileNestedInput
    musicianGenres?: MusicianGenreUpdateManyWithoutMusicianProfileNestedInput
    musicianInstruments?: MusicianInstrumentUpdateManyWithoutMusicianProfileNestedInput
    bookings?: BookingUpdateManyWithoutMusicianProfileNestedInput
  }

  export type MusicianProfileUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutMusicianProfileNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutMusicianProfileNestedInput
    musicianGenres?: MusicianGenreUncheckedUpdateManyWithoutMusicianProfileNestedInput
    musicianInstruments?: MusicianInstrumentUncheckedUpdateManyWithoutMusicianProfileNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutMusicianProfileNestedInput
  }

  export type ReviewUpsertWithWhereUniqueWithoutClientInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutClientInput, ReviewUncheckedUpdateWithoutClientInput>
    create: XOR<ReviewCreateWithoutClientInput, ReviewUncheckedCreateWithoutClientInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutClientInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutClientInput, ReviewUncheckedUpdateWithoutClientInput>
  }

  export type ReviewUpdateManyWithWhereWithoutClientInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutClientInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: IntFilter<"Review"> | number
    musicianProfileId?: IntFilter<"Review"> | number
    clientId?: IntFilter<"Review"> | number
    rating?: IntFilter<"Review"> | number
    content?: StringFilter<"Review"> | string
    date?: StringFilter<"Review"> | string
    event?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type BookingUpsertWithWhereUniqueWithoutClientInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutClientInput, BookingUncheckedUpdateWithoutClientInput>
    create: XOR<BookingCreateWithoutClientInput, BookingUncheckedCreateWithoutClientInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutClientInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutClientInput, BookingUncheckedUpdateWithoutClientInput>
  }

  export type BookingUpdateManyWithWhereWithoutClientInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutClientInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: IntFilter<"Booking"> | number
    musicianProfileId?: IntFilter<"Booking"> | number
    clientId?: IntNullableFilter<"Booking"> | number | null
    eventDate?: DateTimeFilter<"Booking"> | Date | string
    eventType?: StringFilter<"Booking"> | string
    message?: StringFilter<"Booking"> | string
    status?: StringFilter<"Booking"> | string
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    updatedAt?: DateTimeFilter<"Booking"> | Date | string
  }

  export type UserCreateWithoutMusicianProfileInput = {
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    phone?: string | null
    city?: string | null
    state?: string | null
    userType: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    reviewsGiven?: ReviewCreateNestedManyWithoutClientInput
    bookings?: BookingCreateNestedManyWithoutClientInput
  }

  export type UserUncheckedCreateWithoutMusicianProfileInput = {
    id?: number
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    phone?: string | null
    city?: string | null
    state?: string | null
    userType: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutClientInput
    bookings?: BookingUncheckedCreateNestedManyWithoutClientInput
  }

  export type UserCreateOrConnectWithoutMusicianProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMusicianProfileInput, UserUncheckedCreateWithoutMusicianProfileInput>
  }

  export type PortfolioItemCreateWithoutMusicianProfileInput = {
    type: $Enums.PortfolioItemType
    url: string
    title: string
    description?: string | null
    date?: string | null
    location?: string | null
    genre?: string | null
    createdAt?: Date | string
  }

  export type PortfolioItemUncheckedCreateWithoutMusicianProfileInput = {
    id?: number
    type: $Enums.PortfolioItemType
    url: string
    title: string
    description?: string | null
    date?: string | null
    location?: string | null
    genre?: string | null
    createdAt?: Date | string
  }

  export type PortfolioItemCreateOrConnectWithoutMusicianProfileInput = {
    where: PortfolioItemWhereUniqueInput
    create: XOR<PortfolioItemCreateWithoutMusicianProfileInput, PortfolioItemUncheckedCreateWithoutMusicianProfileInput>
  }

  export type PortfolioItemCreateManyMusicianProfileInputEnvelope = {
    data: PortfolioItemCreateManyMusicianProfileInput | PortfolioItemCreateManyMusicianProfileInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutMusicianProfileInput = {
    rating: number
    content: string
    date: string
    event: string
    createdAt?: Date | string
    client: UserCreateNestedOneWithoutReviewsGivenInput
  }

  export type ReviewUncheckedCreateWithoutMusicianProfileInput = {
    id?: number
    clientId: number
    rating: number
    content: string
    date: string
    event: string
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutMusicianProfileInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutMusicianProfileInput, ReviewUncheckedCreateWithoutMusicianProfileInput>
  }

  export type ReviewCreateManyMusicianProfileInputEnvelope = {
    data: ReviewCreateManyMusicianProfileInput | ReviewCreateManyMusicianProfileInput[]
    skipDuplicates?: boolean
  }

  export type MusicianGenreCreateWithoutMusicianProfileInput = {
    genre: GenreCreateNestedOneWithoutMusicianGenresInput
  }

  export type MusicianGenreUncheckedCreateWithoutMusicianProfileInput = {
    genreId: number
  }

  export type MusicianGenreCreateOrConnectWithoutMusicianProfileInput = {
    where: MusicianGenreWhereUniqueInput
    create: XOR<MusicianGenreCreateWithoutMusicianProfileInput, MusicianGenreUncheckedCreateWithoutMusicianProfileInput>
  }

  export type MusicianGenreCreateManyMusicianProfileInputEnvelope = {
    data: MusicianGenreCreateManyMusicianProfileInput | MusicianGenreCreateManyMusicianProfileInput[]
    skipDuplicates?: boolean
  }

  export type MusicianInstrumentCreateWithoutMusicianProfileInput = {
    instrument: InstrumentCreateNestedOneWithoutMusicianInstrumentsInput
  }

  export type MusicianInstrumentUncheckedCreateWithoutMusicianProfileInput = {
    instrumentId: number
  }

  export type MusicianInstrumentCreateOrConnectWithoutMusicianProfileInput = {
    where: MusicianInstrumentWhereUniqueInput
    create: XOR<MusicianInstrumentCreateWithoutMusicianProfileInput, MusicianInstrumentUncheckedCreateWithoutMusicianProfileInput>
  }

  export type MusicianInstrumentCreateManyMusicianProfileInputEnvelope = {
    data: MusicianInstrumentCreateManyMusicianProfileInput | MusicianInstrumentCreateManyMusicianProfileInput[]
    skipDuplicates?: boolean
  }

  export type BookingCreateWithoutMusicianProfileInput = {
    eventDate: Date | string
    eventType: string
    message: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    client?: UserCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateWithoutMusicianProfileInput = {
    id?: number
    clientId?: number | null
    eventDate: Date | string
    eventType: string
    message: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutMusicianProfileInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutMusicianProfileInput, BookingUncheckedCreateWithoutMusicianProfileInput>
  }

  export type BookingCreateManyMusicianProfileInputEnvelope = {
    data: BookingCreateManyMusicianProfileInput | BookingCreateManyMusicianProfileInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMusicianProfileInput = {
    update: XOR<UserUpdateWithoutMusicianProfileInput, UserUncheckedUpdateWithoutMusicianProfileInput>
    create: XOR<UserCreateWithoutMusicianProfileInput, UserUncheckedCreateWithoutMusicianProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMusicianProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMusicianProfileInput, UserUncheckedUpdateWithoutMusicianProfileInput>
  }

  export type UserUpdateWithoutMusicianProfileInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewsGiven?: ReviewUpdateManyWithoutClientNestedInput
    bookings?: BookingUpdateManyWithoutClientNestedInput
  }

  export type UserUncheckedUpdateWithoutMusicianProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutClientNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutClientNestedInput
  }

  export type PortfolioItemUpsertWithWhereUniqueWithoutMusicianProfileInput = {
    where: PortfolioItemWhereUniqueInput
    update: XOR<PortfolioItemUpdateWithoutMusicianProfileInput, PortfolioItemUncheckedUpdateWithoutMusicianProfileInput>
    create: XOR<PortfolioItemCreateWithoutMusicianProfileInput, PortfolioItemUncheckedCreateWithoutMusicianProfileInput>
  }

  export type PortfolioItemUpdateWithWhereUniqueWithoutMusicianProfileInput = {
    where: PortfolioItemWhereUniqueInput
    data: XOR<PortfolioItemUpdateWithoutMusicianProfileInput, PortfolioItemUncheckedUpdateWithoutMusicianProfileInput>
  }

  export type PortfolioItemUpdateManyWithWhereWithoutMusicianProfileInput = {
    where: PortfolioItemScalarWhereInput
    data: XOR<PortfolioItemUpdateManyMutationInput, PortfolioItemUncheckedUpdateManyWithoutMusicianProfileInput>
  }

  export type PortfolioItemScalarWhereInput = {
    AND?: PortfolioItemScalarWhereInput | PortfolioItemScalarWhereInput[]
    OR?: PortfolioItemScalarWhereInput[]
    NOT?: PortfolioItemScalarWhereInput | PortfolioItemScalarWhereInput[]
    id?: IntFilter<"PortfolioItem"> | number
    musicianProfileId?: IntFilter<"PortfolioItem"> | number
    type?: EnumPortfolioItemTypeFilter<"PortfolioItem"> | $Enums.PortfolioItemType
    url?: StringFilter<"PortfolioItem"> | string
    title?: StringFilter<"PortfolioItem"> | string
    description?: StringNullableFilter<"PortfolioItem"> | string | null
    date?: StringNullableFilter<"PortfolioItem"> | string | null
    location?: StringNullableFilter<"PortfolioItem"> | string | null
    genre?: StringNullableFilter<"PortfolioItem"> | string | null
    createdAt?: DateTimeFilter<"PortfolioItem"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutMusicianProfileInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutMusicianProfileInput, ReviewUncheckedUpdateWithoutMusicianProfileInput>
    create: XOR<ReviewCreateWithoutMusicianProfileInput, ReviewUncheckedCreateWithoutMusicianProfileInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutMusicianProfileInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutMusicianProfileInput, ReviewUncheckedUpdateWithoutMusicianProfileInput>
  }

  export type ReviewUpdateManyWithWhereWithoutMusicianProfileInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutMusicianProfileInput>
  }

  export type MusicianGenreUpsertWithWhereUniqueWithoutMusicianProfileInput = {
    where: MusicianGenreWhereUniqueInput
    update: XOR<MusicianGenreUpdateWithoutMusicianProfileInput, MusicianGenreUncheckedUpdateWithoutMusicianProfileInput>
    create: XOR<MusicianGenreCreateWithoutMusicianProfileInput, MusicianGenreUncheckedCreateWithoutMusicianProfileInput>
  }

  export type MusicianGenreUpdateWithWhereUniqueWithoutMusicianProfileInput = {
    where: MusicianGenreWhereUniqueInput
    data: XOR<MusicianGenreUpdateWithoutMusicianProfileInput, MusicianGenreUncheckedUpdateWithoutMusicianProfileInput>
  }

  export type MusicianGenreUpdateManyWithWhereWithoutMusicianProfileInput = {
    where: MusicianGenreScalarWhereInput
    data: XOR<MusicianGenreUpdateManyMutationInput, MusicianGenreUncheckedUpdateManyWithoutMusicianProfileInput>
  }

  export type MusicianGenreScalarWhereInput = {
    AND?: MusicianGenreScalarWhereInput | MusicianGenreScalarWhereInput[]
    OR?: MusicianGenreScalarWhereInput[]
    NOT?: MusicianGenreScalarWhereInput | MusicianGenreScalarWhereInput[]
    musicianProfileId?: IntFilter<"MusicianGenre"> | number
    genreId?: IntFilter<"MusicianGenre"> | number
  }

  export type MusicianInstrumentUpsertWithWhereUniqueWithoutMusicianProfileInput = {
    where: MusicianInstrumentWhereUniqueInput
    update: XOR<MusicianInstrumentUpdateWithoutMusicianProfileInput, MusicianInstrumentUncheckedUpdateWithoutMusicianProfileInput>
    create: XOR<MusicianInstrumentCreateWithoutMusicianProfileInput, MusicianInstrumentUncheckedCreateWithoutMusicianProfileInput>
  }

  export type MusicianInstrumentUpdateWithWhereUniqueWithoutMusicianProfileInput = {
    where: MusicianInstrumentWhereUniqueInput
    data: XOR<MusicianInstrumentUpdateWithoutMusicianProfileInput, MusicianInstrumentUncheckedUpdateWithoutMusicianProfileInput>
  }

  export type MusicianInstrumentUpdateManyWithWhereWithoutMusicianProfileInput = {
    where: MusicianInstrumentScalarWhereInput
    data: XOR<MusicianInstrumentUpdateManyMutationInput, MusicianInstrumentUncheckedUpdateManyWithoutMusicianProfileInput>
  }

  export type MusicianInstrumentScalarWhereInput = {
    AND?: MusicianInstrumentScalarWhereInput | MusicianInstrumentScalarWhereInput[]
    OR?: MusicianInstrumentScalarWhereInput[]
    NOT?: MusicianInstrumentScalarWhereInput | MusicianInstrumentScalarWhereInput[]
    musicianProfileId?: IntFilter<"MusicianInstrument"> | number
    instrumentId?: IntFilter<"MusicianInstrument"> | number
  }

  export type BookingUpsertWithWhereUniqueWithoutMusicianProfileInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutMusicianProfileInput, BookingUncheckedUpdateWithoutMusicianProfileInput>
    create: XOR<BookingCreateWithoutMusicianProfileInput, BookingUncheckedCreateWithoutMusicianProfileInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutMusicianProfileInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutMusicianProfileInput, BookingUncheckedUpdateWithoutMusicianProfileInput>
  }

  export type BookingUpdateManyWithWhereWithoutMusicianProfileInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutMusicianProfileInput>
  }

  export type MusicianProfileCreateWithoutPortfolioInput = {
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMusicianProfileInput
    reviewsReceived?: ReviewCreateNestedManyWithoutMusicianProfileInput
    musicianGenres?: MusicianGenreCreateNestedManyWithoutMusicianProfileInput
    musicianInstruments?: MusicianInstrumentCreateNestedManyWithoutMusicianProfileInput
    bookings?: BookingCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileUncheckedCreateWithoutPortfolioInput = {
    id?: number
    userId: number
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutMusicianProfileInput
    musicianGenres?: MusicianGenreUncheckedCreateNestedManyWithoutMusicianProfileInput
    musicianInstruments?: MusicianInstrumentUncheckedCreateNestedManyWithoutMusicianProfileInput
    bookings?: BookingUncheckedCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileCreateOrConnectWithoutPortfolioInput = {
    where: MusicianProfileWhereUniqueInput
    create: XOR<MusicianProfileCreateWithoutPortfolioInput, MusicianProfileUncheckedCreateWithoutPortfolioInput>
  }

  export type MusicianProfileUpsertWithoutPortfolioInput = {
    update: XOR<MusicianProfileUpdateWithoutPortfolioInput, MusicianProfileUncheckedUpdateWithoutPortfolioInput>
    create: XOR<MusicianProfileCreateWithoutPortfolioInput, MusicianProfileUncheckedCreateWithoutPortfolioInput>
    where?: MusicianProfileWhereInput
  }

  export type MusicianProfileUpdateToOneWithWhereWithoutPortfolioInput = {
    where?: MusicianProfileWhereInput
    data: XOR<MusicianProfileUpdateWithoutPortfolioInput, MusicianProfileUncheckedUpdateWithoutPortfolioInput>
  }

  export type MusicianProfileUpdateWithoutPortfolioInput = {
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMusicianProfileNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutMusicianProfileNestedInput
    musicianGenres?: MusicianGenreUpdateManyWithoutMusicianProfileNestedInput
    musicianInstruments?: MusicianInstrumentUpdateManyWithoutMusicianProfileNestedInput
    bookings?: BookingUpdateManyWithoutMusicianProfileNestedInput
  }

  export type MusicianProfileUncheckedUpdateWithoutPortfolioInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutMusicianProfileNestedInput
    musicianGenres?: MusicianGenreUncheckedUpdateManyWithoutMusicianProfileNestedInput
    musicianInstruments?: MusicianInstrumentUncheckedUpdateManyWithoutMusicianProfileNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutMusicianProfileNestedInput
  }

  export type MusicianGenreCreateWithoutGenreInput = {
    musicianProfile: MusicianProfileCreateNestedOneWithoutMusicianGenresInput
  }

  export type MusicianGenreUncheckedCreateWithoutGenreInput = {
    musicianProfileId: number
  }

  export type MusicianGenreCreateOrConnectWithoutGenreInput = {
    where: MusicianGenreWhereUniqueInput
    create: XOR<MusicianGenreCreateWithoutGenreInput, MusicianGenreUncheckedCreateWithoutGenreInput>
  }

  export type MusicianGenreCreateManyGenreInputEnvelope = {
    data: MusicianGenreCreateManyGenreInput | MusicianGenreCreateManyGenreInput[]
    skipDuplicates?: boolean
  }

  export type MusicianGenreUpsertWithWhereUniqueWithoutGenreInput = {
    where: MusicianGenreWhereUniqueInput
    update: XOR<MusicianGenreUpdateWithoutGenreInput, MusicianGenreUncheckedUpdateWithoutGenreInput>
    create: XOR<MusicianGenreCreateWithoutGenreInput, MusicianGenreUncheckedCreateWithoutGenreInput>
  }

  export type MusicianGenreUpdateWithWhereUniqueWithoutGenreInput = {
    where: MusicianGenreWhereUniqueInput
    data: XOR<MusicianGenreUpdateWithoutGenreInput, MusicianGenreUncheckedUpdateWithoutGenreInput>
  }

  export type MusicianGenreUpdateManyWithWhereWithoutGenreInput = {
    where: MusicianGenreScalarWhereInput
    data: XOR<MusicianGenreUpdateManyMutationInput, MusicianGenreUncheckedUpdateManyWithoutGenreInput>
  }

  export type MusicianInstrumentCreateWithoutInstrumentInput = {
    musicianProfile: MusicianProfileCreateNestedOneWithoutMusicianInstrumentsInput
  }

  export type MusicianInstrumentUncheckedCreateWithoutInstrumentInput = {
    musicianProfileId: number
  }

  export type MusicianInstrumentCreateOrConnectWithoutInstrumentInput = {
    where: MusicianInstrumentWhereUniqueInput
    create: XOR<MusicianInstrumentCreateWithoutInstrumentInput, MusicianInstrumentUncheckedCreateWithoutInstrumentInput>
  }

  export type MusicianInstrumentCreateManyInstrumentInputEnvelope = {
    data: MusicianInstrumentCreateManyInstrumentInput | MusicianInstrumentCreateManyInstrumentInput[]
    skipDuplicates?: boolean
  }

  export type MusicianInstrumentUpsertWithWhereUniqueWithoutInstrumentInput = {
    where: MusicianInstrumentWhereUniqueInput
    update: XOR<MusicianInstrumentUpdateWithoutInstrumentInput, MusicianInstrumentUncheckedUpdateWithoutInstrumentInput>
    create: XOR<MusicianInstrumentCreateWithoutInstrumentInput, MusicianInstrumentUncheckedCreateWithoutInstrumentInput>
  }

  export type MusicianInstrumentUpdateWithWhereUniqueWithoutInstrumentInput = {
    where: MusicianInstrumentWhereUniqueInput
    data: XOR<MusicianInstrumentUpdateWithoutInstrumentInput, MusicianInstrumentUncheckedUpdateWithoutInstrumentInput>
  }

  export type MusicianInstrumentUpdateManyWithWhereWithoutInstrumentInput = {
    where: MusicianInstrumentScalarWhereInput
    data: XOR<MusicianInstrumentUpdateManyMutationInput, MusicianInstrumentUncheckedUpdateManyWithoutInstrumentInput>
  }

  export type MusicianProfileCreateWithoutMusicianGenresInput = {
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMusicianProfileInput
    portfolio?: PortfolioItemCreateNestedManyWithoutMusicianProfileInput
    reviewsReceived?: ReviewCreateNestedManyWithoutMusicianProfileInput
    musicianInstruments?: MusicianInstrumentCreateNestedManyWithoutMusicianProfileInput
    bookings?: BookingCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileUncheckedCreateWithoutMusicianGenresInput = {
    id?: number
    userId: number
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutMusicianProfileInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutMusicianProfileInput
    musicianInstruments?: MusicianInstrumentUncheckedCreateNestedManyWithoutMusicianProfileInput
    bookings?: BookingUncheckedCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileCreateOrConnectWithoutMusicianGenresInput = {
    where: MusicianProfileWhereUniqueInput
    create: XOR<MusicianProfileCreateWithoutMusicianGenresInput, MusicianProfileUncheckedCreateWithoutMusicianGenresInput>
  }

  export type GenreCreateWithoutMusicianGenresInput = {
    name: string
    slug: string
  }

  export type GenreUncheckedCreateWithoutMusicianGenresInput = {
    id?: number
    name: string
    slug: string
  }

  export type GenreCreateOrConnectWithoutMusicianGenresInput = {
    where: GenreWhereUniqueInput
    create: XOR<GenreCreateWithoutMusicianGenresInput, GenreUncheckedCreateWithoutMusicianGenresInput>
  }

  export type MusicianProfileUpsertWithoutMusicianGenresInput = {
    update: XOR<MusicianProfileUpdateWithoutMusicianGenresInput, MusicianProfileUncheckedUpdateWithoutMusicianGenresInput>
    create: XOR<MusicianProfileCreateWithoutMusicianGenresInput, MusicianProfileUncheckedCreateWithoutMusicianGenresInput>
    where?: MusicianProfileWhereInput
  }

  export type MusicianProfileUpdateToOneWithWhereWithoutMusicianGenresInput = {
    where?: MusicianProfileWhereInput
    data: XOR<MusicianProfileUpdateWithoutMusicianGenresInput, MusicianProfileUncheckedUpdateWithoutMusicianGenresInput>
  }

  export type MusicianProfileUpdateWithoutMusicianGenresInput = {
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMusicianProfileNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutMusicianProfileNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutMusicianProfileNestedInput
    musicianInstruments?: MusicianInstrumentUpdateManyWithoutMusicianProfileNestedInput
    bookings?: BookingUpdateManyWithoutMusicianProfileNestedInput
  }

  export type MusicianProfileUncheckedUpdateWithoutMusicianGenresInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutMusicianProfileNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutMusicianProfileNestedInput
    musicianInstruments?: MusicianInstrumentUncheckedUpdateManyWithoutMusicianProfileNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutMusicianProfileNestedInput
  }

  export type GenreUpsertWithoutMusicianGenresInput = {
    update: XOR<GenreUpdateWithoutMusicianGenresInput, GenreUncheckedUpdateWithoutMusicianGenresInput>
    create: XOR<GenreCreateWithoutMusicianGenresInput, GenreUncheckedCreateWithoutMusicianGenresInput>
    where?: GenreWhereInput
  }

  export type GenreUpdateToOneWithWhereWithoutMusicianGenresInput = {
    where?: GenreWhereInput
    data: XOR<GenreUpdateWithoutMusicianGenresInput, GenreUncheckedUpdateWithoutMusicianGenresInput>
  }

  export type GenreUpdateWithoutMusicianGenresInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type GenreUncheckedUpdateWithoutMusicianGenresInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type MusicianProfileCreateWithoutMusicianInstrumentsInput = {
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMusicianProfileInput
    portfolio?: PortfolioItemCreateNestedManyWithoutMusicianProfileInput
    reviewsReceived?: ReviewCreateNestedManyWithoutMusicianProfileInput
    musicianGenres?: MusicianGenreCreateNestedManyWithoutMusicianProfileInput
    bookings?: BookingCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileUncheckedCreateWithoutMusicianInstrumentsInput = {
    id?: number
    userId: number
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutMusicianProfileInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutMusicianProfileInput
    musicianGenres?: MusicianGenreUncheckedCreateNestedManyWithoutMusicianProfileInput
    bookings?: BookingUncheckedCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileCreateOrConnectWithoutMusicianInstrumentsInput = {
    where: MusicianProfileWhereUniqueInput
    create: XOR<MusicianProfileCreateWithoutMusicianInstrumentsInput, MusicianProfileUncheckedCreateWithoutMusicianInstrumentsInput>
  }

  export type InstrumentCreateWithoutMusicianInstrumentsInput = {
    name: string
    slug: string
  }

  export type InstrumentUncheckedCreateWithoutMusicianInstrumentsInput = {
    id?: number
    name: string
    slug: string
  }

  export type InstrumentCreateOrConnectWithoutMusicianInstrumentsInput = {
    where: InstrumentWhereUniqueInput
    create: XOR<InstrumentCreateWithoutMusicianInstrumentsInput, InstrumentUncheckedCreateWithoutMusicianInstrumentsInput>
  }

  export type MusicianProfileUpsertWithoutMusicianInstrumentsInput = {
    update: XOR<MusicianProfileUpdateWithoutMusicianInstrumentsInput, MusicianProfileUncheckedUpdateWithoutMusicianInstrumentsInput>
    create: XOR<MusicianProfileCreateWithoutMusicianInstrumentsInput, MusicianProfileUncheckedCreateWithoutMusicianInstrumentsInput>
    where?: MusicianProfileWhereInput
  }

  export type MusicianProfileUpdateToOneWithWhereWithoutMusicianInstrumentsInput = {
    where?: MusicianProfileWhereInput
    data: XOR<MusicianProfileUpdateWithoutMusicianInstrumentsInput, MusicianProfileUncheckedUpdateWithoutMusicianInstrumentsInput>
  }

  export type MusicianProfileUpdateWithoutMusicianInstrumentsInput = {
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMusicianProfileNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutMusicianProfileNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutMusicianProfileNestedInput
    musicianGenres?: MusicianGenreUpdateManyWithoutMusicianProfileNestedInput
    bookings?: BookingUpdateManyWithoutMusicianProfileNestedInput
  }

  export type MusicianProfileUncheckedUpdateWithoutMusicianInstrumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutMusicianProfileNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutMusicianProfileNestedInput
    musicianGenres?: MusicianGenreUncheckedUpdateManyWithoutMusicianProfileNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutMusicianProfileNestedInput
  }

  export type InstrumentUpsertWithoutMusicianInstrumentsInput = {
    update: XOR<InstrumentUpdateWithoutMusicianInstrumentsInput, InstrumentUncheckedUpdateWithoutMusicianInstrumentsInput>
    create: XOR<InstrumentCreateWithoutMusicianInstrumentsInput, InstrumentUncheckedCreateWithoutMusicianInstrumentsInput>
    where?: InstrumentWhereInput
  }

  export type InstrumentUpdateToOneWithWhereWithoutMusicianInstrumentsInput = {
    where?: InstrumentWhereInput
    data: XOR<InstrumentUpdateWithoutMusicianInstrumentsInput, InstrumentUncheckedUpdateWithoutMusicianInstrumentsInput>
  }

  export type InstrumentUpdateWithoutMusicianInstrumentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type InstrumentUncheckedUpdateWithoutMusicianInstrumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type MusicianProfileCreateWithoutReviewsReceivedInput = {
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMusicianProfileInput
    portfolio?: PortfolioItemCreateNestedManyWithoutMusicianProfileInput
    musicianGenres?: MusicianGenreCreateNestedManyWithoutMusicianProfileInput
    musicianInstruments?: MusicianInstrumentCreateNestedManyWithoutMusicianProfileInput
    bookings?: BookingCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileUncheckedCreateWithoutReviewsReceivedInput = {
    id?: number
    userId: number
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutMusicianProfileInput
    musicianGenres?: MusicianGenreUncheckedCreateNestedManyWithoutMusicianProfileInput
    musicianInstruments?: MusicianInstrumentUncheckedCreateNestedManyWithoutMusicianProfileInput
    bookings?: BookingUncheckedCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileCreateOrConnectWithoutReviewsReceivedInput = {
    where: MusicianProfileWhereUniqueInput
    create: XOR<MusicianProfileCreateWithoutReviewsReceivedInput, MusicianProfileUncheckedCreateWithoutReviewsReceivedInput>
  }

  export type UserCreateWithoutReviewsGivenInput = {
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    phone?: string | null
    city?: string | null
    state?: string | null
    userType: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    musicianProfile?: MusicianProfileCreateNestedOneWithoutUserInput
    bookings?: BookingCreateNestedManyWithoutClientInput
  }

  export type UserUncheckedCreateWithoutReviewsGivenInput = {
    id?: number
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    phone?: string | null
    city?: string | null
    state?: string | null
    userType: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    musicianProfile?: MusicianProfileUncheckedCreateNestedOneWithoutUserInput
    bookings?: BookingUncheckedCreateNestedManyWithoutClientInput
  }

  export type UserCreateOrConnectWithoutReviewsGivenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsGivenInput, UserUncheckedCreateWithoutReviewsGivenInput>
  }

  export type MusicianProfileUpsertWithoutReviewsReceivedInput = {
    update: XOR<MusicianProfileUpdateWithoutReviewsReceivedInput, MusicianProfileUncheckedUpdateWithoutReviewsReceivedInput>
    create: XOR<MusicianProfileCreateWithoutReviewsReceivedInput, MusicianProfileUncheckedCreateWithoutReviewsReceivedInput>
    where?: MusicianProfileWhereInput
  }

  export type MusicianProfileUpdateToOneWithWhereWithoutReviewsReceivedInput = {
    where?: MusicianProfileWhereInput
    data: XOR<MusicianProfileUpdateWithoutReviewsReceivedInput, MusicianProfileUncheckedUpdateWithoutReviewsReceivedInput>
  }

  export type MusicianProfileUpdateWithoutReviewsReceivedInput = {
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMusicianProfileNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutMusicianProfileNestedInput
    musicianGenres?: MusicianGenreUpdateManyWithoutMusicianProfileNestedInput
    musicianInstruments?: MusicianInstrumentUpdateManyWithoutMusicianProfileNestedInput
    bookings?: BookingUpdateManyWithoutMusicianProfileNestedInput
  }

  export type MusicianProfileUncheckedUpdateWithoutReviewsReceivedInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutMusicianProfileNestedInput
    musicianGenres?: MusicianGenreUncheckedUpdateManyWithoutMusicianProfileNestedInput
    musicianInstruments?: MusicianInstrumentUncheckedUpdateManyWithoutMusicianProfileNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutMusicianProfileNestedInput
  }

  export type UserUpsertWithoutReviewsGivenInput = {
    update: XOR<UserUpdateWithoutReviewsGivenInput, UserUncheckedUpdateWithoutReviewsGivenInput>
    create: XOR<UserCreateWithoutReviewsGivenInput, UserUncheckedCreateWithoutReviewsGivenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsGivenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsGivenInput, UserUncheckedUpdateWithoutReviewsGivenInput>
  }

  export type UserUpdateWithoutReviewsGivenInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    musicianProfile?: MusicianProfileUpdateOneWithoutUserNestedInput
    bookings?: BookingUpdateManyWithoutClientNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsGivenInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    musicianProfile?: MusicianProfileUncheckedUpdateOneWithoutUserNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutClientNestedInput
  }

  export type MusicianProfileCreateWithoutBookingsInput = {
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMusicianProfileInput
    portfolio?: PortfolioItemCreateNestedManyWithoutMusicianProfileInput
    reviewsReceived?: ReviewCreateNestedManyWithoutMusicianProfileInput
    musicianGenres?: MusicianGenreCreateNestedManyWithoutMusicianProfileInput
    musicianInstruments?: MusicianInstrumentCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileUncheckedCreateWithoutBookingsInput = {
    id?: number
    userId: number
    category?: string | null
    bio?: string | null
    location?: string | null
    priceFrom?: number | null
    experience?: string | null
    equipment?: string | null
    availability?: string | null
    rating?: number
    ratingCount?: number
    eventsCount?: number
    satisfactionRate?: number | null
    responseTime?: string | null
    isFeatured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutMusicianProfileInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutMusicianProfileInput
    musicianGenres?: MusicianGenreUncheckedCreateNestedManyWithoutMusicianProfileInput
    musicianInstruments?: MusicianInstrumentUncheckedCreateNestedManyWithoutMusicianProfileInput
  }

  export type MusicianProfileCreateOrConnectWithoutBookingsInput = {
    where: MusicianProfileWhereUniqueInput
    create: XOR<MusicianProfileCreateWithoutBookingsInput, MusicianProfileUncheckedCreateWithoutBookingsInput>
  }

  export type UserCreateWithoutBookingsInput = {
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    phone?: string | null
    city?: string | null
    state?: string | null
    userType: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    musicianProfile?: MusicianProfileCreateNestedOneWithoutUserInput
    reviewsGiven?: ReviewCreateNestedManyWithoutClientInput
  }

  export type UserUncheckedCreateWithoutBookingsInput = {
    id?: number
    email: string
    passwordHash: string
    firstName: string
    lastName: string
    phone?: string | null
    city?: string | null
    state?: string | null
    userType: $Enums.UserType
    createdAt?: Date | string
    updatedAt?: Date | string
    musicianProfile?: MusicianProfileUncheckedCreateNestedOneWithoutUserInput
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutClientInput
  }

  export type UserCreateOrConnectWithoutBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
  }

  export type MusicianProfileUpsertWithoutBookingsInput = {
    update: XOR<MusicianProfileUpdateWithoutBookingsInput, MusicianProfileUncheckedUpdateWithoutBookingsInput>
    create: XOR<MusicianProfileCreateWithoutBookingsInput, MusicianProfileUncheckedCreateWithoutBookingsInput>
    where?: MusicianProfileWhereInput
  }

  export type MusicianProfileUpdateToOneWithWhereWithoutBookingsInput = {
    where?: MusicianProfileWhereInput
    data: XOR<MusicianProfileUpdateWithoutBookingsInput, MusicianProfileUncheckedUpdateWithoutBookingsInput>
  }

  export type MusicianProfileUpdateWithoutBookingsInput = {
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMusicianProfileNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutMusicianProfileNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutMusicianProfileNestedInput
    musicianGenres?: MusicianGenreUpdateManyWithoutMusicianProfileNestedInput
    musicianInstruments?: MusicianInstrumentUpdateManyWithoutMusicianProfileNestedInput
  }

  export type MusicianProfileUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    priceFrom?: NullableIntFieldUpdateOperationsInput | number | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    equipment?: NullableStringFieldUpdateOperationsInput | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    eventsCount?: IntFieldUpdateOperationsInput | number
    satisfactionRate?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableStringFieldUpdateOperationsInput | string | null
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutMusicianProfileNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutMusicianProfileNestedInput
    musicianGenres?: MusicianGenreUncheckedUpdateManyWithoutMusicianProfileNestedInput
    musicianInstruments?: MusicianInstrumentUncheckedUpdateManyWithoutMusicianProfileNestedInput
  }

  export type UserUpsertWithoutBookingsInput = {
    update: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type UserUpdateWithoutBookingsInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    musicianProfile?: MusicianProfileUpdateOneWithoutUserNestedInput
    reviewsGiven?: ReviewUpdateManyWithoutClientNestedInput
  }

  export type UserUncheckedUpdateWithoutBookingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumUserTypeFieldUpdateOperationsInput | $Enums.UserType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    musicianProfile?: MusicianProfileUncheckedUpdateOneWithoutUserNestedInput
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutClientNestedInput
  }

  export type PlanFeatureCreateWithoutPlanInput = {
    text: string
    available: boolean
    highlight: boolean
  }

  export type PlanFeatureUncheckedCreateWithoutPlanInput = {
    id?: number
    text: string
    available: boolean
    highlight: boolean
  }

  export type PlanFeatureCreateOrConnectWithoutPlanInput = {
    where: PlanFeatureWhereUniqueInput
    create: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput>
  }

  export type PlanFeatureCreateManyPlanInputEnvelope = {
    data: PlanFeatureCreateManyPlanInput | PlanFeatureCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type PlanFeatureUpsertWithWhereUniqueWithoutPlanInput = {
    where: PlanFeatureWhereUniqueInput
    update: XOR<PlanFeatureUpdateWithoutPlanInput, PlanFeatureUncheckedUpdateWithoutPlanInput>
    create: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput>
  }

  export type PlanFeatureUpdateWithWhereUniqueWithoutPlanInput = {
    where: PlanFeatureWhereUniqueInput
    data: XOR<PlanFeatureUpdateWithoutPlanInput, PlanFeatureUncheckedUpdateWithoutPlanInput>
  }

  export type PlanFeatureUpdateManyWithWhereWithoutPlanInput = {
    where: PlanFeatureScalarWhereInput
    data: XOR<PlanFeatureUpdateManyMutationInput, PlanFeatureUncheckedUpdateManyWithoutPlanInput>
  }

  export type PlanFeatureScalarWhereInput = {
    AND?: PlanFeatureScalarWhereInput | PlanFeatureScalarWhereInput[]
    OR?: PlanFeatureScalarWhereInput[]
    NOT?: PlanFeatureScalarWhereInput | PlanFeatureScalarWhereInput[]
    id?: IntFilter<"PlanFeature"> | number
    planId?: IntFilter<"PlanFeature"> | number
    text?: StringFilter<"PlanFeature"> | string
    available?: BoolFilter<"PlanFeature"> | boolean
    highlight?: BoolFilter<"PlanFeature"> | boolean
  }

  export type PlanCreateWithoutFeaturesInput = {
    title: string
    description?: string | null
    monthlyPrice: number
    yearlyPrice: number
    badge?: string | null
    isMusicianPlan: boolean
    isClientPlan: boolean
    createdAt?: Date | string
  }

  export type PlanUncheckedCreateWithoutFeaturesInput = {
    id?: number
    title: string
    description?: string | null
    monthlyPrice: number
    yearlyPrice: number
    badge?: string | null
    isMusicianPlan: boolean
    isClientPlan: boolean
    createdAt?: Date | string
  }

  export type PlanCreateOrConnectWithoutFeaturesInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutFeaturesInput, PlanUncheckedCreateWithoutFeaturesInput>
  }

  export type PlanUpsertWithoutFeaturesInput = {
    update: XOR<PlanUpdateWithoutFeaturesInput, PlanUncheckedUpdateWithoutFeaturesInput>
    create: XOR<PlanCreateWithoutFeaturesInput, PlanUncheckedCreateWithoutFeaturesInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutFeaturesInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutFeaturesInput, PlanUncheckedUpdateWithoutFeaturesInput>
  }

  export type PlanUpdateWithoutFeaturesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    yearlyPrice?: IntFieldUpdateOperationsInput | number
    badge?: NullableStringFieldUpdateOperationsInput | string | null
    isMusicianPlan?: BoolFieldUpdateOperationsInput | boolean
    isClientPlan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateWithoutFeaturesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    monthlyPrice?: IntFieldUpdateOperationsInput | number
    yearlyPrice?: IntFieldUpdateOperationsInput | number
    badge?: NullableStringFieldUpdateOperationsInput | string | null
    isMusicianPlan?: BoolFieldUpdateOperationsInput | boolean
    isClientPlan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyClientInput = {
    id?: number
    musicianProfileId: number
    rating: number
    content: string
    date: string
    event: string
    createdAt?: Date | string
  }

  export type BookingCreateManyClientInput = {
    id?: number
    musicianProfileId: number
    eventDate: Date | string
    eventType: string
    message: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateWithoutClientInput = {
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    musicianProfile?: MusicianProfileUpdateOneRequiredWithoutReviewsReceivedNestedInput
  }

  export type ReviewUncheckedUpdateWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUpdateWithoutClientInput = {
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    musicianProfile?: MusicianProfileUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    musicianProfileId?: IntFieldUpdateOperationsInput | number
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemCreateManyMusicianProfileInput = {
    id?: number
    type: $Enums.PortfolioItemType
    url: string
    title: string
    description?: string | null
    date?: string | null
    location?: string | null
    genre?: string | null
    createdAt?: Date | string
  }

  export type ReviewCreateManyMusicianProfileInput = {
    id?: number
    clientId: number
    rating: number
    content: string
    date: string
    event: string
    createdAt?: Date | string
  }

  export type MusicianGenreCreateManyMusicianProfileInput = {
    genreId: number
  }

  export type MusicianInstrumentCreateManyMusicianProfileInput = {
    instrumentId: number
  }

  export type BookingCreateManyMusicianProfileInput = {
    id?: number
    clientId?: number | null
    eventDate: Date | string
    eventType: string
    message: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioItemUpdateWithoutMusicianProfileInput = {
    type?: EnumPortfolioItemTypeFieldUpdateOperationsInput | $Enums.PortfolioItemType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemUncheckedUpdateWithoutMusicianProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumPortfolioItemTypeFieldUpdateOperationsInput | $Enums.PortfolioItemType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemUncheckedUpdateManyWithoutMusicianProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumPortfolioItemTypeFieldUpdateOperationsInput | $Enums.PortfolioItemType
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutMusicianProfileInput = {
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: UserUpdateOneRequiredWithoutReviewsGivenNestedInput
  }

  export type ReviewUncheckedUpdateWithoutMusicianProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutMusicianProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MusicianGenreUpdateWithoutMusicianProfileInput = {
    genre?: GenreUpdateOneRequiredWithoutMusicianGenresNestedInput
  }

  export type MusicianGenreUncheckedUpdateWithoutMusicianProfileInput = {
    genreId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicianGenreUncheckedUpdateManyWithoutMusicianProfileInput = {
    genreId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicianInstrumentUpdateWithoutMusicianProfileInput = {
    instrument?: InstrumentUpdateOneRequiredWithoutMusicianInstrumentsNestedInput
  }

  export type MusicianInstrumentUncheckedUpdateWithoutMusicianProfileInput = {
    instrumentId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicianInstrumentUncheckedUpdateManyWithoutMusicianProfileInput = {
    instrumentId?: IntFieldUpdateOperationsInput | number
  }

  export type BookingUpdateWithoutMusicianProfileInput = {
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: UserUpdateOneWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateWithoutMusicianProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyWithoutMusicianProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: NullableIntFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eventType?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MusicianGenreCreateManyGenreInput = {
    musicianProfileId: number
  }

  export type MusicianGenreUpdateWithoutGenreInput = {
    musicianProfile?: MusicianProfileUpdateOneRequiredWithoutMusicianGenresNestedInput
  }

  export type MusicianGenreUncheckedUpdateWithoutGenreInput = {
    musicianProfileId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicianGenreUncheckedUpdateManyWithoutGenreInput = {
    musicianProfileId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicianInstrumentCreateManyInstrumentInput = {
    musicianProfileId: number
  }

  export type MusicianInstrumentUpdateWithoutInstrumentInput = {
    musicianProfile?: MusicianProfileUpdateOneRequiredWithoutMusicianInstrumentsNestedInput
  }

  export type MusicianInstrumentUncheckedUpdateWithoutInstrumentInput = {
    musicianProfileId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicianInstrumentUncheckedUpdateManyWithoutInstrumentInput = {
    musicianProfileId?: IntFieldUpdateOperationsInput | number
  }

  export type PlanFeatureCreateManyPlanInput = {
    id?: number
    text: string
    available: boolean
    highlight: boolean
  }

  export type PlanFeatureUpdateWithoutPlanInput = {
    text?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    highlight?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PlanFeatureUncheckedUpdateWithoutPlanInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    highlight?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PlanFeatureUncheckedUpdateManyWithoutPlanInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    available?: BoolFieldUpdateOperationsInput | boolean
    highlight?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}