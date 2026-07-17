-- TEKSHIRUV: schema.sql to'g'ri loyihada ishlaganini bilish uchun.
-- SQL Editor'ga shuni qo'yib "Run" bosing.

-- 1) Qaysi loyihadamiz? Natija "uihcuwgwtshchzzgyowt" bo'lishi kerak.
select current_setting('request.jwt.claim.ref', true) as loyiha_ref,
       current_database()                              as baza,
       current_user                                    as foydalanuvchi;

-- 2) public sxemasida qanday jadvallar bor?
--    Ro'yxatda quyidagi 5 tasi bo'lishi kerak:
--    content_overrides, leads, media_overrides, news, team_members
select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;
