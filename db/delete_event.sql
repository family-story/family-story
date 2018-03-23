delete from media
where event_id = $2;

delete from events
where event_id = $2
and story_id = $1;