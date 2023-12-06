module default {
  type Node {
    name: str;
    dns: str;
    required address: str;
    multi keystore: Pair;
  }
};