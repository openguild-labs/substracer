export interface PageInfo {
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface Thumbnail {
  url: string;
}

export interface Media {
  url: string;
}

export interface VotesPageInfo {
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface VotesNode {
  createdAt: string; // Assuming this is a date string
}

export interface Node {
  id: string;
  name: string;
  website: string;
  thumbnail: Thumbnail;
  media: Media[];
  tagline: string;
  votesCount: number;
  votes: {
    pageInfo: PageInfo;
    edges: {
      cursor: string;
      node: VotesNode;
    }[];
  };
}

export interface Edge {
  node: Node;
}

export interface PostsData {
  posts: {
    pageInfo: PageInfo;
    totalCount: number;
    edges: Edge[];
  };
}
