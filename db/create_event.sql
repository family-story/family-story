insert into events (story_id, event_num, event_title, date, location, event_txt)
values ($1, $2, $3, $4, $5, $6);

select event_id
from events
where story_id = $1 and event_num = $2;
