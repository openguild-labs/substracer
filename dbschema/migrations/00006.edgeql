CREATE MIGRATION m1hd4fnhttm77g6db5mgkedr6ix46ztrth45qfbipbtre33hdmzzsq
    ONTO m1dkx3pd2jckciuoiflcu72bme6tp3vuslx52c2iyrmhc7afvowima
{
  CREATE ABSTRACT TYPE default::PublicKey {
      CREATE REQUIRED PROPERTY account_id: std::str;
      CREATE REQUIRED PROPERTY network_id: std::str;
      CREATE REQUIRED PROPERTY public_key: std::str;
      CREATE REQUIRED PROPERTY public_key_ss58: std::str;
      CREATE REQUIRED PROPERTY ss58_address: std::str;
  };
  ALTER TYPE default::Pair {
      EXTENDING default::PublicKey LAST;
      ALTER PROPERTY account_id {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY network_id {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY public_key {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY public_key_ss58 {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY ss58_address {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
