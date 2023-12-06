CREATE MIGRATION m15gtrzg326j2gmecor5z7p6idxeqgccq6tl6cocgbsxtfpwhqhrwq
    ONTO m1uwekrn4ni4qs7ul7hfar4xemm5kkxlpswolcoyqj3xdhweomwjrq
{
  CREATE TYPE default::ChainSpecification {
      ALTER PROPERTY id {
          SET OWNED;
      };
      CREATE MULTI PROPERTY bootNodes: std::str;
      CREATE REQUIRED PROPERTY chainType: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY protocolId: std::str;
  };
  ALTER TYPE default::Movie {
      DROP PROPERTY title;
  };
  ALTER TYPE default::Movie RENAME TO default::Network;
  ALTER TYPE default::Person {
      ALTER PROPERTY name {
          RENAME TO address;
      };
  };
  ALTER TYPE default::Person RENAME TO default::Node;
  ALTER TYPE default::Network {
      ALTER LINK actors {
          RENAME TO nodes;
      };
  };
  ALTER TYPE default::Node {
      CREATE PROPERTY dns: std::str;
      CREATE PROPERTY name: std::str;
  };
};
