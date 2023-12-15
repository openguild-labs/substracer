module default {
  type Node extending TimeRecord {
    name: str {
      constraint exclusive;
    };
    dns: str {
      constraint exclusive;
    };
    required address: str {
      constraint exclusive;
    };
    multi link keystore: Pair {
        on target delete allow;
    }
  }
};