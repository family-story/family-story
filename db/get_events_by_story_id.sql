SELECT event_id, event_num, event_title, date, location, event_txt
FROM events
WHERE story_id = $1
ORDER BY event_num ASC;