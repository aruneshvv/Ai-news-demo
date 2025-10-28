export interface WebSource {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web: WebSource;
}

export interface NewsItem {
  title: string;
  summary: string;
}

export interface NewsData {
  newsItems: NewsItem[];
  sources: GroundingChunk[];
}
