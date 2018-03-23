insert into stories (user_id, story_title)
values ($1, $2);

select story_id
from stories
where user_id = $1 and story_title = $2;