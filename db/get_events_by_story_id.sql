SELECT event_id, event_num, event_title, date, lat, long, event_txt
FROM events
WHERE story_id = $1;