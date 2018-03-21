CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    auth0_id TEXT,
    fs_code TEXT
);

CREATE TABLE stories (
    story_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id)
);

CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    story_id INT REFERENCES stories(story_id),
    tag_str TEXT
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    story_id INT REFERENCES stories(story_id),
    event_num INT,
    event_title VARCHAR(100),
    date TEXT,
    lat TEXT,
    long TEXT,
    event_txt VARCHAR(2000)
);

CREATE TABLE media (
    media_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id),
    media_ref TEXT,
    media_type TEXT
);