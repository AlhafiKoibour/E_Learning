-- Create the web_anon role for PostgREST
CREATE ROLE web_anon NOLOGIN;

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO web_anon;

-- Note: Tables will be created by the Spring Boot application
-- After tables are created, you may need to grant SELECT, INSERT, UPDATE, DELETE on tables to web_anon
-- For example:
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO web_anon;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO web_anon;