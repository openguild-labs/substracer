CREATE MIGRATION m1b5s723ylentdzp7jbdautcvjtjiyl7o6rkkjcvufbhp5asaxxgeq
    ONTO m1hd4fnhttm77g6db5mgkedr6ix46ztrth45qfbipbtre33hdmzzsq
{
  ALTER TYPE default::Node {
      ALTER LINK keystore {
          ON TARGET DELETE ALLOW;
      };
      ALTER PROPERTY address {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      ALTER PROPERTY dns {
          CREATE CONSTRAINT std::exclusive;
      };
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
