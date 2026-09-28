EXPLAIN ANALYZE SELECT id,title,"applicationDeadline" FROM "Internship" WHERE "isActive"=true AND "applicationDeadline">NOW() ORDER BY "applicationDeadline" ASC LIMIT 20;
