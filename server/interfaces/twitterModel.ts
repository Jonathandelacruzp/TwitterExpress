export interface UserTimeline {
    created_at: string;
    id: number;
    id_str: string;
    text: string;
    truncated: boolean;
    entities: TwitterModelEntities;
    extended_entities?: TwitterModelExtendedEntities;
    source: string;
    in_reply_to_status_id: null;
    in_reply_to_status_id_str: null;
    in_reply_to_user_id: null;
    in_reply_to_user_id_str: null;
    in_reply_to_screen_name: null;
    user: TwitterModelUser;
    geo: null;
    coordinates: null;
    place: Place | null;
    contributors: null;
    is_quote_status: boolean;
    retweet_count: number;
    favorite_count: number;
    favorited: boolean;
    retweeted: boolean;
    possibly_sensitive?: boolean;
    possibly_sensitive_appealable?: boolean;
    lang: string;
    quoted_status_id?: number;
    quoted_status_id_str?: string;
    quoted_status?: QuotedStatus;
    retweeted_status?: RetweetedStatus;
}

export interface TwitterModelEntities {
    hashtags: Hashtag[];
    symbols: any[];
    user_mentions: UserMention[];
    urls: URL[];
    media?: EntitiesMedia[];
}

export interface Hashtag {
    text: string;
    indices: number[];
}

export interface EntitiesMedia {
    id: number;
    id_str: string;
    indices: number[];
    media_url: string;
    media_url_https: string;
    url: string;
    display_url: string;
    expanded_url: string;
    type: string;
    sizes: Sizes;
    source_status_id?: number;
    source_status_id_str?: string;
    source_user_id?: number;
    source_user_id_str?: string;
}

export interface Sizes {
    thumb: Large;
    medium: Large;
    small: Large;
    large: Large;
}

export interface Large {
    w: number;
    h: number;
    resize: string;
}

export interface URL {
    url: string;
    expanded_url: string;
    display_url: string;
    indices: number[];
}

export interface UserMention {
    screen_name: string;
    name: string;
    id: number;
    id_str: string;
    indices: number[];
}

export interface TwitterModelExtendedEntities {
    media: PurpleMedia[];
}

export interface PurpleMedia {
    id: number;
    id_str: string;
    indices: number[];
    media_url: string;
    media_url_https: string;
    url: string;
    display_url: string;
    expanded_url: string;
    type: string;
    sizes: Sizes;
    source_status_id?: number;
    source_status_id_str?: string;
    source_user_id?: number;
    source_user_id_str?: string;
    video_info?: VideoInfo;
    additional_media_info?: AdditionalMediaInfo;
}

export interface AdditionalMediaInfo {
    title: string;
    description: string;
    call_to_actions: CallToActions;
    embeddable: boolean;
    monetizable: boolean;
}

export interface CallToActions {
    watch_now: WatchNow;
}

export interface WatchNow {
    url: string;
}

export interface VideoInfo {
    aspect_ratio: number[];
    duration_millis: number;
    variants: Variant[];
}

export interface Variant {
    bitrate?: number;
    content_type: string;
    url: string;
}


export interface Place {
    id: string;
    url: string;
    place_type: string;
    name: string;
    full_name: string;
    country_code: string;
    country: string;
    contained_within: any[];
    bounding_box: BoundingBox;
    attributes: Attributes;
}

export interface Attributes {
}

export interface BoundingBox {
    type: string;
    coordinates: Array<Array<number[]>>;
}

export interface QuotedStatus {
    created_at: string;
    id: number;
    id_str: string;
    text: string;
    truncated: boolean;
    entities: TwitterModelEntities;
    source: string;
    in_reply_to_status_id: number | null;
    in_reply_to_status_id_str: null | string;
    in_reply_to_user_id: number;
    in_reply_to_user_id_str: string;
    in_reply_to_screen_name: string;
    user: QuotedStatusUser;
    geo: null;
    coordinates: null;
    place: null;
    contributors: null;
    is_quote_status: boolean;
    retweet_count: number;
    favorite_count: number;
    favorited: boolean;
    retweeted: boolean;
    lang: string;
    possibly_sensitive?: boolean;
    possibly_sensitive_appealable?: boolean;
}

export interface QuotedStatusUser {
    id: number;
    id_str: string;
    name: string;
    screen_name: string;
    location: string;
    description: string;
    url: null;
    entities: PurpleEntities;
    protected: boolean;
    followers_count: number;
    friends_count: number;
    listed_count: number;
    created_at: string;
    favourites_count: number;
    utc_offset: null;
    time_zone: null;
    geo_enabled: boolean;
    verified: boolean;
    statuses_count: number;
    lang: null;
    contributors_enabled: boolean;
    is_translator: boolean;
    is_translation_enabled: boolean;
    profile_background_color: string;
    profile_background_image_url: null | string;
    profile_background_image_url_https: null | string;
    profile_background_tile: boolean;
    profile_image_url: string;
    profile_image_url_https: string;
    profile_banner_url?: string;
    profile_link_color: string;
    profile_sidebar_border_color: string;
    profile_sidebar_fill_color: string;
    profile_text_color: string;
    profile_use_background_image: boolean;
    has_extended_profile: boolean;
    default_profile: boolean;
    default_profile_image: boolean;
    following: boolean;
    follow_request_sent: boolean;
    notifications: boolean;
    translator_type: string;
}

export interface PurpleEntities {
    description: Description;
}

export interface Description {
    urls: URL[];
}

export interface RetweetedStatus {
    created_at: string;
    id: number;
    id_str: string;
    text: string;
    truncated: boolean;
    entities: TwitterModelEntities;
    extended_entities: RetweetedStatusExtendedEntities;
    source: string;
    in_reply_to_status_id: null;
    in_reply_to_status_id_str: null;
    in_reply_to_user_id: null;
    in_reply_to_user_id_str: null;
    in_reply_to_screen_name: null;
    user: QuotedStatusUser;
    geo: null;
    coordinates: null;
    place: null;
    contributors: null;
    is_quote_status: boolean;
    retweet_count: number;
    favorite_count: number;
    favorited: boolean;
    retweeted: boolean;
    possibly_sensitive: boolean;
    possibly_sensitive_appealable: boolean;
    lang: string;
}

export interface RetweetedStatusExtendedEntities {
    media: FluffyMedia[];
}

export interface FluffyMedia {
    id: number;
    id_str: string;
    indices: number[];
    media_url: string;
    media_url_https: string;
    url: string;
    display_url: string;
    expanded_url: string;
    type: string;
    sizes: Sizes;
}

export interface TwitterModelUser {
    id: number;
    id_str: string;
    name: string;
    screen_name: string;
    location: string;
    description: string;
    url: null | string;
    entities: FluffyEntities;
    protected: boolean;
    followers_count: number;
    friends_count: number;
    listed_count: number;
    created_at: string;
    favourites_count: number;
    utc_offset: null;
    time_zone: null;
    geo_enabled: boolean;
    verified: boolean;
    statuses_count: number;
    lang: null;
    contributors_enabled: boolean;
    is_translator: boolean;
    is_translation_enabled: boolean;
    profile_background_color: string;
    profile_background_image_url: null | string;
    profile_background_image_url_https: null | string;
    profile_background_tile: boolean;
    profile_image_url: string;
    profile_image_url_https: string;
    profile_banner_url?: string;
    profile_link_color: string;
    profile_sidebar_border_color: string;
    profile_sidebar_fill_color: string;
    profile_text_color: string;
    profile_use_background_image: boolean;
    has_extended_profile: boolean;
    default_profile: boolean;
    default_profile_image: boolean;
    following: boolean;
    follow_request_sent: boolean;
    notifications: boolean;
    translator_type: string;
}

export interface FluffyEntities {
    url?: Description;
    description: Description;
}
