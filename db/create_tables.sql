CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    auth0_id TEXT,
    fs_code TEXT
);

CREATE TABLE stories (
    story_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    story_title VARCHAR(200)
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

INSERT INTO users (auth0_id)
VALUES ('google-oauth2|114780314401547437272');

INSERT INTO stories (user_id, story_title)
VALUES (1, 'My Proposal'), (1, 'Mary Cook, Handcart Pioneer');

INSERT INTO tags (story_id, tag_str)
VALUES (1, 'Stuart Harper'), 
        (1, 'Summer Harper'),
        (1, 'Provo, Utah'),
        (1, 'Orem, Utah'),
        (2, 'Mary Cook'),
        (2, 'Convert'),
        (2, 'Pioneer'),
        (2, 'Scotland');