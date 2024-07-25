--npx wrangler d1 execute prod-d1-veejr  --file migrations/update.sql

update users set role = 'Architect/Developer' where id = 1;
