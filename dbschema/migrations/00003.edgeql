CREATE MIGRATION m1t2cgrqyizaitqgmz7mkcqtevspnhm7cj5xa3rjkhsl6p5cw7xzrq
    ONTO m15gtrzg326j2gmecor5z7p6idxeqgccq6tl6cocgbsxtfpwhqhrwq
{
  CREATE TYPE default::Pair {
      CREATE REQUIRED PROPERTY account_id: std::str;
      CREATE PROPERTY key_password: std::str;
      CREATE REQUIRED PROPERTY network_id: std::str;
      CREATE REQUIRED PROPERTY public_key: std::str;
      CREATE REQUIRED PROPERTY public_key_ss58: std::str;
      CREATE PROPERTY public_key_uri: std::str;
      CREATE PROPERTY secret_key_uri: std::str;
      CREATE PROPERTY secret_phrase: std::str;
      CREATE PROPERTY secret_seed: std::str;
      CREATE REQUIRED PROPERTY ss58_address: std::str;
  };
  ALTER TYPE default::Node {
      CREATE MULTI LINK keystore: default::Pair;
  };
};
