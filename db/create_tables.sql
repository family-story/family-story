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
    location TEXT,
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

INSERT INTO events (story_id, event_num, event_title, date, location, event_txt)
VALUES (2, 0, 'Mary Cook is Born', '25 February 1823', 'Shettleston, Lanarkshire, Scotland', 'Mary cook was born in Shettleston, Lanarkshire, Scotland to Adam Cook and Elisabeth Gilmour. She was the 7th of 11 children. Her father apparently was in the military , and had received a medal for his service in the Battle of Waterloo.'),
        (2, 1, 'Mary Cook is Married to John Brown', '8 April 1843', 'Baillieston, Old Monkland, Lanark, Scotland', 'Mary and John were married at Baillieston, Old Monkland, Lanark, Scotland. Not much is known of their relationship except they had four children.'),
        (2, 2, 'Mary Cook converts to "Mormonism"', '13 November 1848', 'Baillieston, Old Monkland, Lanark, Scotland', 'While in Scotland, a missionary from The Church of Jesus Christ of Latter-day Saints (aka Mormon) named Elder John Shields taught her the restored gospel. She and her children came to believe it was true. Though her husband objected, she was baptized into the church. Sometime after 1851, her husband in a rage abandoned her and her four children when she expressed her desire to go to America to be with the other Latter-day Saints.'),
        (2, 3, 'Mary Cook and her children leave Scotland ', '28 March 1857', 'Trafalgar Dock', 'After having lost all her belongings when her husband left her it took her years for her to save up the money for passage for her and her four children (William age 13, Walter age 10, Adam age 8, and David age 5). They left liverpool on the "George Washington".'),
        (2, 4, 'Mary Cook arrives in America', '20 April 1857', 'Boston Harbor Shipyard & Marina', 'After almost a month at sea on a very difficult journey, Mary and her children arrive in Boston. They immediately begin working towards heading west to be with the Saints.'),
        (2, 5, 'Mary Cook joins a handcart company', '1857', 'Iowa City', 'She joins a handcart company in Iowa City, and begins the long trek west to Salt Lake City. "The trip was a hard one in all respects." She had her four children to care for also with no husband to help. "but hers was a spirit that was a stranger to complaint and proud indeed she was to accomplish the task."'),
        (2, 6, 'Mary Cook arrives in Salt Lake City', 'before september 1857', 'Salt Lake City', 'After the long journey west she finally arrives in Salt Lake City with her family, grateful to be finally united with the people of her faith.'),
        (2, 7, 'Mary Cook Marries Alexander Gellespie', '20 September 1857', 'Salt Lake City', 'Mary Cook Marries Alexander Gellespie. They are married by the Prophet and president of the church Brigham Young in his office, since the temple, and its predecessor the endowment house had not yet been built. She was Alexanders third wife.'),
        (2, 8, 'Mary Cook moves to provo', '1858', 'Provo, Utah', 'Mary cook with her family was called to help settle in the Provo settlement there she had her fifth child Mary.'),
        (2, 9, 'Mary Cook moves back to Salt Lake', '1860', 'Salt Lake City', 'After two years Mary and her family moved back to Salt Lake City. There she had her sixth child, Agnes.'),
        (2, 10, 'Mary Cook moves to Saint George', '1862', 'Saint George', 'Mary cook with her family was called to help settle in Saint George, also known as the Dixie Mission. There she had her seventh child Alexander. There she would stay for five more years.'),
        (2, 11, 'Mary Cook returns to her beloved Salt Lake City', '1867', 'Salt Lake City', 'Mary Cook and her husband had fulfilled their missions and assignments to help settle Provo and Saint George, and having been released, moved back to Salt Lake City. At this time she was 44-45, and she would remain in Salt Lake for the rest of her life. It was noted that she had many friends and performed much service in the area.'),
        (2, 12, 'Mary Cook dies and is buried', '7 June 1903', 'Salt Lake City Cemetery', 'Mary Cook dies at the age of 80. She was buried in the Salt Lake City Cemetery. She left behind an immense legacy of faith to her children and grandchildren. She was willing, time and time again to sacrifice all she had and all she knew for what she believed was true. I am honored to be her great, great, great, great, grandchild');

     
INSERT INTO media (event_id, media_type, media_ref)
VALUES (1, 'pic', 'https://www.familysearch.org/dzpatron/v1/TH-301-41540-135-27/scale?width=800&ctx=ArtCtxPublic&angle=0'),
        (1, 'pic', 'https://www.familysearch.org/dzpatron/v1/TH-303-45428-574-53/scale?width=800&ctx=ArtCtxPublic&angle=0'),
        (1, 'pic', 'https://www.familysearch.org/dzpatron/v1/TH-300-45428-733-1/scale?width=800&ctx=ArtCtxPublic&angle=0'),
        (1, 'pic', 'https://www.familysearch.org/dzpatron/v1/TH-300-48239-1135-19/scale?width=800&ctx=ArtCtxPublic&angle=0'),
        (3, 'pic', 'https://images.findagrave.com/photos/2013/59/18326820_136220556820.jpg'),
        (4, 'pic', 'https://www.familysearch.org/dzpatron/v1/TH-301-48239-247-32/scale?width=800&ctx=ArtCtxPublic&angle=0'),
        (4, 'pic', 'http://gordon.buttars.me/familyhistory/Davis,%20Esther/Sailing%20Ship.jpg'),
        (5, 'pic', 'http://gordon.buttars.me/familyhistory/Davis,%20Esther/CentralWharfBostonHarbor.jpg'),
        (6, 'pic', 'https://www.familysearch.org/dzpatron/v1/TH-301-48239-247-32/scale?width=800&ctx=ArtCtxPublic&angle=0'),
        (6, 'pic', 'http://mediad.publicbroadcasting.net/p/kuer/files/styles/x_large/public/201407/handcarts.jpg'),
        (7, 'pic', 'https://www.familysearch.org/dzpatron/v1/TH-301-48239-247-32/scale?width=800&ctx=ArtCtxPublic&angle=0'),
        (7, 'pic', 'http://c8.alamy.com/comp/A0WCYJ/salt-lake-city-utah-usa-mormon-settlement-wide-angle-panorama-vista-A0WCYJ.jpg'),
        (8, 'pic', 'https://www.familysearch.org/dzpatron/v1/TH-301-41540-135-27/scale?width=800&ctx=ArtCtxPublic&angle=0'),
        (8, 'pic', 'https://www.familysearch.org/dzpatron/v1/TH-303-45428-574-53/scale?width=800&ctx=ArtCtxPublic&angle=0'),
        (8, 'pic', 'https://www.mormonnewsroom.org/media/orig/brigham-young.jpg'),
        (9, 'pic', 'https://images.prod.meredith.com/product/bd471cc6c77e9b539854a4cdc639999a/1513729424077/l/mormon-encampment-1858-nthe-mormon-encampment-at-provo-city-utah-colored-wood-engraving-1858-rolled-canvas-art-24-x-36'),
        (11, 'pic', 'https://history.lds.org/bc/content/images/library/exhibits/st-george-tabernacle/st-george-1890-uhs.jpg'),
        (12, 'pic', 'http://teachingamericanhistory.org/files/2016/09/getty.jpg'),
        (13, 'pic', 'https://www.familysearch.org/dzpatron/v1/TH-303-48239-97-22/scale?width=800&ctx=ArtCtxPublic&angle=0');