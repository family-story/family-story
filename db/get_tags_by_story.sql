SELECT tag_id, tag_str
FROM tags
WHERE story_id = $1;