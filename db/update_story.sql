update stories 
set story_title = $3
where user_id = $1
and story_id = $2
