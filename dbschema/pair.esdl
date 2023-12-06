module default {
 abstract type PublicKey {
  required network_id: str;
  required public_key: str;
  required account_id: str;
  required public_key_ss58: str;
  required ss58_address: str;
 }

 type Pair extending PublicKey {
  key_password: str;
  secret_phrase: str;
  secret_key_uri: str;
  public_key_uri: str;
  secret_seed: str;
 }
}