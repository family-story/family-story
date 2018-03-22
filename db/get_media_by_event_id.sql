SELECT media_id, media_type, media_ref
FROM media
WHERE event_id = $1;