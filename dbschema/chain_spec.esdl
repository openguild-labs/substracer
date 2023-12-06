module default {
  type ChainSpecification {
    required name: str;
    overloaded id: str;
    required chainType: str;
    multi bootNodes: str;
    protocolId: str;
  }
};