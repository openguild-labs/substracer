CREATE MIGRATION m1dkx3pd2jckciuoiflcu72bme6tp3vuslx52c2iyrmhc7afvowima
    ONTO m17ze3jadk5upwzqsrqeoemxo232mjr6lohgnynokrltb6yu3ruq4q
{
  ALTER TYPE default::Node {
      DROP PROPERTY keystore;
  };
  ALTER TYPE default::Node {
      CREATE MULTI LINK keystore: default::Pair;
  };
};
