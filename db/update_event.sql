update events 
set event_num = $3, event_title = $4, date = $5, location = $6, event_txt = $7
from events as e 
join stories as s on s.story_id = e.story_id
where e.story_id = $2
and s.user_id = $1