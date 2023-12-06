CREATE MIGRATION m17ze3jadk5upwzqsrqeoemxo232mjr6lohgnynokrltb6yu3ruq4q
    ONTO m1t2cgrqyizaitqgmz7mkcqtevspnhm7cj5xa3rjkhsl6p5cw7xzrq
{
  ALTER TYPE default::Node {
      DROP LINK keystore;
  };
  ALTER TYPE default::Node {
      CREATE PROPERTY keystore: array<std::str>;
  };
};
