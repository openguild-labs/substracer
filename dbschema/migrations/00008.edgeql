CREATE MIGRATION m12uvle2svg3mgrr57hpydyooipeirvqzam4hbms7syh27ppq6kfkq
    ONTO m1b5s723ylentdzp7jbdautcvjtjiyl7o6rkkjcvufbhp5asaxxgeq
{
  CREATE ABSTRACT TYPE default::TimeRecord {
      CREATE PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY updated_at: std::datetime {
          SET default := (std::datetime_current());
          CREATE REWRITE
              UPDATE 
              USING ((std::datetime_of_statement() IF NOT (__specified__.updated_at) ELSE .updated_at));
      };
  };
  ALTER TYPE default::Node {
      EXTENDING default::TimeRecord LAST;
      ALTER PROPERTY created_at {
          DROP OWNED;
          RESET TYPE;
      };
  };
};
